# VeraPlayzz 🎵

**[Live Demo](#)** *(Add your demo link here)*

---

## 📖 About

VeraPlayzz is a modern, feature-rich web-based music player that allows users to upload and play their favorite audio files directly in the browser. With a sleek glassmorphism design and dynamic video backgrounds, it provides an immersive music listening experience.

### ✨ Key Features

- **Upload & Play**: Upload multiple audio files (MP3, WAV, OGG, M4A, etc.)
- **Metadata Extraction**: Automatically extracts song title, artist, and album information from audio files
- **Full Playback Controls**: Play, pause, next, previous, repeat, and seek functionality
- **Playlist Management**: Create and manage your playlist with easy delete options
- **Dynamic Backgrounds**: Smooth transitions between background videos
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Glassmorphism UI**: Modern, translucent design with blur effects
- **Browser Storage**: Songs persist in browser memory during the session

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with glassmorphism effects and responsive design
- **JavaScript (ES6+)** - Core functionality and interactivity

### Libraries & APIs
- **jsmediatags** - Audio metadata extraction (ID3 tags)
- **Font Awesome 7.0.1** - Icons for UI elements
- **Google Fonts (Rubik)** - Typography
- **Web Audio API** - Audio playback and control
- **FileReader API** - File upload and processing
- **URL.createObjectURL** - Efficient file handling

---

## 🚀 How It Works

1. **Upload**: Click "Upload Music" button and select audio files from your device
2. **Metadata Processing**: The app extracts song information (title, artist) using jsmediatags
3. **Playlist Display**: Songs appear in the sidebar with album art, title, and artist
4. **Playback**: Click play button on any song to start listening
5. **Controls**: Use player controls for play/pause, skip, repeat, and seek
6. **Management**: Delete songs using the 3-dot menu on each song card

### Background Video System
- Automatically cycles through 5 background videos
- Smooth fade transitions between videos
- Preloads next video for seamless playback

---

## 📦 Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/VeraPlayzz.git
   cd VeraPlayzz
   ```

2. **Project Structure**
   ```
   VeraPlayzz/
   ├── index.html
   ├── style.css
   ├── script.js
   ├── logo.png
   ├── music-img.jpg
   └── bg-videos/
       ├── 140733-775596128_medium.mp4
       ├── 186201-877345289_medium.mp4
       ├── 214592_small.mp4
       ├── 232561_small.mp4
       └── 2619-865412755_medium.mp4
   ```

3. **Add Background Videos**
   - Create a `bg-videos` folder in the project root
   - Add 5 video files (or update the video paths in `script.js`)

4. **Add Images**
   - Add `logo.png` for the app logo
   - Add `music-img.jpg` for default album art

5. **Run the Application**

   **Option A: Using Live Server (VS Code)**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

   **Option B: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open http://localhost:8000
   ```

   **Option C: Direct File**
   - Simply open `index.html` in your browser
   - Note: Some features may be limited without a server

---

## 🎮 Usage Guide

### Uploading Songs
1. Click the "Upload Music" button in the sidebar
2. Select one or multiple audio files
3. Songs will appear in the playlist automatically

### Playing Music
- Click the play button (▶) on any song card
- Music player appears on the right side
- Use player controls to manage playback

### Player Controls
- **Play/Pause**: Toggle playback
- **Previous**: Go to previous song
- **Next**: Skip to next song
- **Repeat**: Loop current song (turns green when active)
- **Progress Bar**: Click or drag to seek

### Managing Playlist
- Click the 3-dot menu (⋮) on any song
- Select "Delete" to remove from playlist
- Songs are automatically removed when all are deleted

---

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (Full layout)
- **Tablet**: ≤ 1024px (Stacked layout)
- **Mobile**: ≤ 768px (Compact design)
- **Small Mobile**: ≤ 480px (Minimal layout)

---

## 🎨 Design Features

- **Glassmorphism**: Translucent containers with backdrop blur
- **Smooth Animations**: Transitions and hover effects
- **Dark Theme**: Easy on the eyes with white text
- **Custom Scrollbar**: Hidden scrollbar for clean look
- **Responsive Typography**: Scales with screen size

---

## 🔧 Customization

### Change Background Videos
Edit the `videos` array in `script.js`:
```javascript
const videos = [
    'path/to/video1.mp4',
    'path/to/video2.mp4',
    // Add more videos
];
```

### Modify Colors
Update CSS variables or colors in `style.css`:
```css
background: rgba(255, 255, 255, 0.1); /* Glassmorphism */
color: #1DB954; /* Accent color */
```

### Change Fonts
Update the Google Fonts import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

---

## 🐛 Known Limitations

- Songs are stored in browser memory (not persistent across sessions)
- Large files may cause performance issues
- Some audio formats may not be supported in all browsers
- Metadata extraction depends on file having ID3 tags

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Background videos from [Pexels](https://www.pexels.com)
- Icons from [Font Awesome](https://fontawesome.com)
- Fonts from [Google Fonts](https://fonts.google.com)
- Metadata extraction by [jsmediatags](https://github.com/aadsm/jsmediatags)

---

**Made with ❤️ and JavaScript**
