# Deployment Guide - CCAD19 Pomodoro Timer

This guide will help you host your Pomodoro timer online for free. Choose the option that works best for you!

## 🚀 Quick Start: GitHub Pages (Easiest)

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it: `pomodoro-timer` (or any name you like)
4. Make it **Public** (required for free hosting)
5. Click "Create repository"

### Step 2: Upload Your Files
**Option A: Using GitHub Web Interface**
1. In your new repository, click "uploading an existing file"
2. Drag and drop these files:
   - `index.html`
   - `script.js`
   - `styles.css`
   - `README.md`
3. Add a commit message like "Initial commit"
4. Click "Commit changes"

**Option B: Using Git (if you have Git installed)**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pomodoro-timer.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Click "Save"
7. Wait 2-3 minutes for deployment

### Step 4: Your Site is Live!
Your timer will be available at:
`https://YOUR_USERNAME.github.io/pomodoro-timer`

## 🌐 Alternative Hosting Options

### Netlify (Drag & Drop)
1. Go to [Netlify.com](https://netlify.com)
2. Drag your entire project folder to the deploy area
3. Get a random URL instantly (e.g., `https://amazing-timer-123.netlify.app`)
4. Optional: Add a custom domain

### Vercel (GitHub Integration)
1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Deploy automatically

### Surge.sh (Command Line)
```bash
# Install Surge globally
npm install --global surge

# Navigate to your project folder
cd path/to/your/pomodoro-timer

# Deploy
surge

# Follow the prompts to create an account and choose a domain
```

## 🔧 Troubleshooting

### Common Issues:

**GitHub Pages not showing:**
- Make sure repository is **public**
- Check that `index.html` is in the root directory
- Wait 5-10 minutes for deployment

**Files not loading:**
- Check that all file names match exactly (case-sensitive)
- Ensure `index.html` references `script.js` and `styles.css` correctly

**Timer not working:**
- Open browser developer tools (F12) to check for JavaScript errors
- Make sure you're using a modern browser

## 📱 Testing Your Deployment

After deployment, test these features:
- ✅ Timer starts and counts down
- ✅ Pause/Resume works
- ✅ Reset button works
- ✅ Mode switching (Focus/Short Break/Long Break)
- ✅ Settings modal opens and saves
- ✅ Keyboard shortcuts (Spacebar, R key)
- ✅ Mobile responsiveness

## 🎯 Next Steps

Once your timer is live:
1. Share the URL with friends and colleagues
2. Add it to your bookmarks
3. Consider adding analytics (Google Analytics, etc.)
4. Customize the design further if desired

## 💡 Pro Tips

- **Custom Domain**: Most hosting services allow you to add your own domain name
- **HTTPS**: All these services provide free SSL certificates
- **Updates**: Push changes to GitHub to automatically update your live site
- **Backup**: Keep a local copy of your files

---

**Need help?** Check the hosting service's documentation or ask in their community forums! 