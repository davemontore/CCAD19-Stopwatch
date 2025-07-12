# CCAD19 Pomodoro Timer

A beautiful, retro-futuristic Pomodoro timer built with vanilla JavaScript, HTML, and CSS. Features a cyberpunk-inspired design with smooth animations and customizable settings.

## Features

- ⏱️ **Pomodoro Technique**: 25-minute focus sessions with 5-minute short breaks and 15-minute long breaks
- 🎨 **Retro-Futuristic Design**: Cyberpunk-inspired UI with glowing effects and animations
- ⚙️ **Customizable Settings**: Adjust focus time, break durations, and auto-start preferences
- 🔔 **Notifications**: Audio alerts and browser notifications when sessions complete
- ⌨️ **Keyboard Shortcuts**: Spacebar to start/pause, R to reset
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 💾 **Local Storage**: Settings are saved between sessions

## How to Host Online

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it something like `pomodoro-timer`

2. **Upload your files**:
   - Upload `index.html`, `script.js`, `styles.css`, and `README.md` to the repository
   - Or use GitHub Desktop/Git commands to push your files

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch" and choose "main" branch
   - Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. **Drag & Drop**:
   - Go to [Netlify](https://netlify.com)
   - Drag your entire project folder to the deploy area
   - Get a random URL instantly

2. **Custom Domain** (Optional):
   - Add your own domain name
   - Enable HTTPS automatically

### Option 3: Vercel (Free)

1. **Connect Repository**:
   - Go to [Vercel](https://vercel.com)
   - Connect your GitHub repository
   - Deploy automatically on every push

### Option 4: Surge.sh (Free)

1. **Install Surge**:
   ```bash
   npm install --global surge
   ```

2. **Deploy**:
   ```bash
   cd your-project-folder
   surge
   ```

## Local Development

To run the timer locally:

1. Clone or download the project files
2. Open `index.html` in your web browser
3. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## Usage

- **Start/Pause**: Click the Start/Pause button or press Spacebar
- **Reset**: Click Reset button or press R
- **Switch Modes**: Click Focus, Short Break, or Long Break buttons
- **Settings**: Click the Settings button to customize timer durations
- **Keyboard Shortcuts**:
  - `Spacebar`: Start/Pause timer
  - `R`: Reset timer

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests! 