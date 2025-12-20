const videos = [
    'bg-videos/140733-775596128_medium.mp4',
    'bg-videos/186201-877345289_medium.mp4',
    'bg-videos/214592_small.mp4',
];

let currentVideoIndex = 0;
let activeVideo = 1;
const video1 = document.getElementById('bg-video1');
const video2 = document.getElementById('bg-video2');

if (!video1 || !video2) {
    console.error('Video elements not found');
} else {
    video1.addEventListener('ended', playNextVideo);
    video2.addEventListener('ended', playNextVideo);
    video1.addEventListener('error', () => console.error('Video1 error'));
    video2.addEventListener('error', () => console.error('Video2 error'));
    preloadNextVideo();
}

function preloadNextVideo() {
    if (!video1 || !video2) return;
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    const nextVideo = activeVideo === 1 ? video2 : video1;
    nextVideo.src = videos[nextIndex];
    nextVideo.load();
}

function playNextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    const nextVideo = activeVideo === 1 ? video2 : video1;
    const currentVideo = activeVideo === 1 ? video1 : video2;
    
    nextVideo.classList.add('active');
    currentVideo.classList.remove('active');
    nextVideo.play().catch(e => console.error('Play failed:', e));
    
    activeVideo = activeVideo === 1 ? 2 : 1;
    setTimeout(preloadNextVideo, 1000);
}



let playlist = [];
let currentAudio = null;
let currentSongIndex = 0;
let isPlaying = false;
let isRepeat = false;
let input = document.getElementById("file-input");
let list = document.getElementById("song-list");

function processAudio(file) {
    const audioData = {
        name: file.name.replace(/\.[^/.]+$/, ""),
        artist: "Unknown Artist",
        album: "Unknown Album",
        url: URL.createObjectURL(file),
        id: Date.now() + Math.random()
    };

    jsmediatags.read(file, {
        onSuccess: function(tag) {
            if (tag.tags.title) audioData.name = tag.tags.title;
            if (tag.tags.artist) audioData.artist = tag.tags.artist;
            if (tag.tags.album) audioData.album = tag.tags.album;
            updateSidebarItem(audioData);
        },
        onError: function() {
            console.log('No metadata found');
        }
    });

    return audioData;
}

function addToSidebar(audioData) {
    const item = document.createElement('li');
    item.className = 'song-item';
    item.id = `song-${audioData.id}`;
    item.innerHTML = `
        <img src="./music-img.jpg" alt="Cover" class="song-cover">
        <div class="song-details">
            <div class="song-title">${audioData.name}</div>
            <div class="song-artist">${audioData.artist}</div>
        </div>
        <div class="song-actions">
            <button class="song-btn play-btn" onclick="playSong('${audioData.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            </button>
            <button class="song-btn menu-btn" onclick="toggleMenu('${audioData.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                </svg>
            </button>
            <div class="song-menu" id="menu-${audioData.id}">
                <div class="menu-option" onclick="deleteSong('${audioData.id}')">Delete</div>
            </div>
        </div>
    `;
    list.appendChild(item);
}

function toggleMenu(songId) {
    const menu = document.getElementById(`menu-${songId}`);
    const allMenus = document.querySelectorAll('.song-menu');
    allMenus.forEach(m => m.classList.remove('show'));
    menu.classList.toggle('show');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.song-actions')) {
        document.querySelectorAll('.song-menu').forEach(m => m.classList.remove('show'));
    }
});

function deleteSong(songId) {
    const index = playlist.findIndex(s => s.id == songId);
    if (index > -1) {
        URL.revokeObjectURL(playlist[index].url);
        playlist.splice(index, 1);
        document.getElementById(`song-${songId}`).remove();
        
        if (playlist.length === 0) {
            document.querySelector('.welcome-container').style.display = 'flex';
            document.querySelector('.player-container').style.display = 'none';
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
        }
    }
}

function updateSidebarItem(audioData) {
    const item = document.getElementById(`song-${audioData.id}`);
    if (item) {
        const details = item.querySelector('.song-details');
        details.innerHTML = `
            <div class="song-title">${audioData.name}</div>
            <div class="song-artist">${audioData.artist}</div>
        `;
    }
}

input.addEventListener("change", function() {
    const files = Array.from(input.files);
    if (files.length > 0) {
        document.querySelector('.welcome-container').style.display = 'none';
        document.querySelector('.player-container').style.display = 'flex';
    }
    files.forEach(file => {
        if (file.type.startsWith("audio/")) {
            const audioData = processAudio(file);
            playlist.push(audioData);
            addToSidebar(audioData);
        } else {
            console.warn(`${file.name} is not a valid audio file.`);
        }
    });
});

function playSong(songId) {
    const song = playlist.find(s => s.id == songId);
    if (!song) return;

    currentSongIndex = playlist.findIndex(s => s.id == songId);
    
    if (currentAudio) currentAudio.pause();
    
    currentAudio = new Audio(song.url);
    currentAudio.play();
    isPlaying = true;
    updatePlayButton();

    document.querySelector('.welcome-container').style.display = 'none';
    document.querySelector('.player-container').style.display = 'flex';
    
    document.getElementById('song-title').textContent = song.name;
    document.getElementById('song-artist').textContent = song.artist;
    
    currentAudio.addEventListener('loadedmetadata', () => {
        document.getElementById('total-duration').textContent = formatTime(currentAudio.duration);
    });
    
    currentAudio.addEventListener('timeupdate', () => {
        document.getElementById('current-time').textContent = formatTime(currentAudio.currentTime);
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        document.getElementById('progress-bar').value = progress;
    });
    
    currentAudio.addEventListener('ended', () => {
        if (isRepeat) {
            currentAudio.currentTime = 0;
            currentAudio.play();
        } else {
            playNext();
        }
    });
}

function togglePlay() {
    if (!currentAudio) return;
    
    if (isPlaying) {
        currentAudio.pause();
        isPlaying = false;
    } else {
        currentAudio.play();
        isPlaying = true;
    }
    updatePlayButton();
}

function updatePlayButton() {
    const playBtn = document.getElementById('play-btn');
    playBtn.innerHTML = isPlaying ? 
        '<i class="fa-solid fa-pause"></i>' : 
        '<i class="fa-solid fa-play"></i>';
}

function playNext() {
    if (playlist.length === 0) return;
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playSong(playlist[currentSongIndex].id);
}

function playPrev() {
    if (playlist.length === 0) return;
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[currentSongIndex].id);
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    const repeatBtn = document.getElementById('repeat-btn');
    repeatBtn.style.color = isRepeat ? '#1DB954' : 'white';
}

function seekTo(value) {
    if (!currentAudio) return;
    const time = (value / 100) * currentAudio.duration;
    currentAudio.currentTime = time;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

window.addEventListener('beforeunload', () => {
    playlist.forEach(song => URL.revokeObjectURL(song.url));
});
