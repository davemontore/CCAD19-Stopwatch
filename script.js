<<<<<<< HEAD
class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.timer = null;
        this.sessionCount = 0;
        this.currentMode = 'focus';
        
        // Settings
        this.settings = {
            focusTime: 25,
            shortBreak: 5,
            longBreak: 15,
            autoStartBreaks: false,
            autoStartFocus: false
        };
        
        this.loadSettings();
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }
    
    initializeElements() {
        // Timer elements
        this.timeDisplay = document.getElementById('time');
        this.timerLabel = document.getElementById('timer-label');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.sessionCountDisplay = document.getElementById('session-count');
        this.progressFill = document.getElementById('progress-fill');
        
        // Mode buttons
        this.modeButtons = document.querySelectorAll('.mode-btn');
        
        // Settings modal
        this.settingsModal = document.getElementById('settings-modal');
        this.settingsBtn = document.getElementById('settings-btn');
        this.closeSettingsBtn = document.getElementById('close-settings');
        this.saveSettingsBtn = document.getElementById('save-settings');
        
        // Settings inputs
        this.focusTimeInput = document.getElementById('focus-time');
        this.shortBreakInput = document.getElementById('short-break');
        this.longBreakInput = document.getElementById('long-break');
        this.autoStartBreaksInput = document.getElementById('auto-start-breaks');
        this.autoStartFocusInput = document.getElementById('auto-start-focus');
    }
    
    bindEvents() {
        // Timer controls
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Mode buttons
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn));
        });
        
        // Settings
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        
        // Close modal when clicking outside
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isRunning) {
                    this.pause();
                } else {
                    this.start();
                }
            } else if (e.code === 'KeyR') {
                this.reset();
            }
        });
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.completeSession();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.timer);
        }
    }
    
    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
    }
    
    switchMode(button) {
        // Update active button
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Get mode settings
        const time = parseInt(button.dataset.time);
        const label = button.dataset.label;
        
        // Update timer
        this.totalTime = time * 60;
        this.timeLeft = this.totalTime;
        this.currentMode = label.toLowerCase().replace(' ', '');
        
        // Update display
        this.timerLabel.textContent = label;
        this.updateDisplay();
        
        // Reset session count if switching to focus mode
        if (this.currentMode === 'focus') {
            this.sessionCount = 0;
            this.sessionCountDisplay.textContent = this.sessionCount;
        }
    }
    
    completeSession() {
        this.pause();
        this.timeLeft = 0;
        this.updateDisplay();
        
        // Add completion animation
        this.timeDisplay.classList.add('timer-complete');
        setTimeout(() => {
            this.timeDisplay.classList.remove('timer-complete');
        }, 500);
        
        // Play notification sound (if supported)
        this.playNotification();
        
        // Show notification
        this.showNotification();
        
        // Update session count for focus sessions
        if (this.currentMode === 'focus') {
            this.sessionCount++;
            this.sessionCountDisplay.textContent = this.sessionCount;
        }
        
        // Auto-switch modes if enabled
        this.autoSwitchMode();
    }
    
    autoSwitchMode() {
        if (this.currentMode === 'focus') {
            // Switch to break
            if (this.sessionCount % 4 === 0) {
                // Long break every 4 sessions
                this.switchToMode('longbreak');
            } else {
                // Short break
                this.switchToMode('shortbreak');
            }
            
            if (this.settings.autoStartBreaks) {
                setTimeout(() => this.start(), 1000);
            }
        } else {
            // Switch back to focus
            this.switchToMode('focus');
            
            if (this.settings.autoStartFocus) {
                setTimeout(() => this.start(), 1000);
            }
        }
    }
    
    switchToMode(mode) {
        let button;
        switch (mode) {
            case 'focus':
                button = document.querySelector('[data-label="Focus"]');
                break;
            case 'shortbreak':
                button = document.querySelector('[data-label="Short Break"]');
                break;
            case 'longbreak':
                button = document.querySelector('[data-label="Long Break"]');
                break;
        }
        
        if (button) {
            this.switchMode(button);
        }
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar
        const progress = ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
    
    playNotification() {
        // Create a simple notification sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            const title = this.currentMode === 'focus' ? 'Focus Session Complete!' : 'Break Time!';
            const body = this.currentMode === 'focus' 
                ? 'Great job! Time for a break.' 
                : 'Break is over. Ready to focus?';
            
            new Notification(title, { body });
        } else if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showNotification();
                }
            });
        }
    }
    
    openSettings() {
        // Populate settings form
        this.focusTimeInput.value = this.settings.focusTime;
        this.shortBreakInput.value = this.settings.shortBreak;
        this.longBreakInput.value = this.settings.longBreak;
        this.autoStartBreaksInput.checked = this.settings.autoStartBreaks;
        this.autoStartFocusInput.checked = this.settings.autoStartFocus;
        
        this.settingsModal.classList.add('show');
    }
    
    closeSettings() {
        this.settingsModal.classList.remove('show');
    }
    
    saveSettings() {
        // Update settings
        this.settings.focusTime = parseInt(this.focusTimeInput.value);
        this.settings.shortBreak = parseInt(this.shortBreakInput.value);
        this.settings.longBreak = parseInt(this.longBreakInput.value);
        this.settings.autoStartBreaks = this.autoStartBreaksInput.checked;
        this.settings.autoStartFocus = this.autoStartFocusInput.checked;
        
        // Update mode buttons
        const focusBtn = document.querySelector('[data-label="Focus"]');
        const shortBreakBtn = document.querySelector('[data-label="Short Break"]');
        const longBreakBtn = document.querySelector('[data-label="Long Break"]');
        
        focusBtn.dataset.time = this.settings.focusTime;
        shortBreakBtn.dataset.time = this.settings.shortBreak;
        longBreakBtn.dataset.time = this.settings.longBreak;
        
        // Update current timer if in focus mode
        if (this.currentMode === 'focus') {
            this.totalTime = this.settings.focusTime * 60;
            if (!this.isRunning) {
                this.timeLeft = this.totalTime;
                this.updateDisplay();
            }
        }
        
        this.saveSettingsToStorage();
        this.closeSettings();
    }
    
    loadSettings() {
        const saved = localStorage.getItem('pomodoroSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }
    
    saveSettingsToStorage() {
        localStorage.setItem('pomodoroSettings', JSON.stringify(this.settings));
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
=======
class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.timer = null;
        this.sessionCount = 0;
        this.currentMode = 'focus';
        
        // Settings
        this.settings = {
            focusTime: 25,
            shortBreak: 5,
            longBreak: 15,
            autoStartBreaks: false,
            autoStartFocus: false
        };
        
        this.loadSettings();
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }
    
    initializeElements() {
        // Timer elements
        this.timeDisplay = document.getElementById('time');
        this.timerLabel = document.getElementById('timer-label');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.sessionCountDisplay = document.getElementById('session-count');
        this.progressFill = document.getElementById('progress-fill');
        
        // Mode buttons
        this.modeButtons = document.querySelectorAll('.mode-btn');
        
        // Settings modal
        this.settingsModal = document.getElementById('settings-modal');
        this.settingsBtn = document.getElementById('settings-btn');
        this.closeSettingsBtn = document.getElementById('close-settings');
        this.saveSettingsBtn = document.getElementById('save-settings');
        
        // Settings inputs
        this.focusTimeInput = document.getElementById('focus-time');
        this.shortBreakInput = document.getElementById('short-break');
        this.longBreakInput = document.getElementById('long-break');
        this.autoStartBreaksInput = document.getElementById('auto-start-breaks');
        this.autoStartFocusInput = document.getElementById('auto-start-focus');
    }
    
    bindEvents() {
        // Timer controls
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Mode buttons
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn));
        });
        
        // Settings
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        
        // Close modal when clicking outside
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isRunning) {
                    this.pause();
                } else {
                    this.start();
                }
            } else if (e.code === 'KeyR') {
                this.reset();
            }
        });
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.completeSession();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.timer);
        }
    }
    
    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
    }
    
    switchMode(button) {
        // Update active button
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Get mode settings
        const time = parseInt(button.dataset.time);
        const label = button.dataset.label;
        
        // Update timer
        this.totalTime = time * 60;
        this.timeLeft = this.totalTime;
        this.currentMode = label.toLowerCase().replace(' ', '');
        
        // Update display
        this.timerLabel.textContent = label;
        this.updateDisplay();
        
        // Reset session count if switching to focus mode
        if (this.currentMode === 'focus') {
            this.sessionCount = 0;
            this.sessionCountDisplay.textContent = this.sessionCount;
        }
    }
    
    completeSession() {
        this.pause();
        this.timeLeft = 0;
        this.updateDisplay();
        
        // Add completion animation
        this.timeDisplay.classList.add('timer-complete');
        setTimeout(() => {
            this.timeDisplay.classList.remove('timer-complete');
        }, 500);
        
        // Play notification sound (if supported)
        this.playNotification();
        
        // Show notification
        this.showNotification();
        
        // Update session count for focus sessions
        if (this.currentMode === 'focus') {
            this.sessionCount++;
            this.sessionCountDisplay.textContent = this.sessionCount;
        }
        
        // Auto-switch modes if enabled
        this.autoSwitchMode();
    }
    
    autoSwitchMode() {
        if (this.currentMode === 'focus') {
            // Switch to break
            if (this.sessionCount % 4 === 0) {
                // Long break every 4 sessions
                this.switchToMode('longbreak');
            } else {
                // Short break
                this.switchToMode('shortbreak');
            }
            
            if (this.settings.autoStartBreaks) {
                setTimeout(() => this.start(), 1000);
            }
        } else {
            // Switch back to focus
            this.switchToMode('focus');
            
            if (this.settings.autoStartFocus) {
                setTimeout(() => this.start(), 1000);
            }
        }
    }
    
    switchToMode(mode) {
        let button;
        switch (mode) {
            case 'focus':
                button = document.querySelector('[data-label="Focus"]');
                break;
            case 'shortbreak':
                button = document.querySelector('[data-label="Short Break"]');
                break;
            case 'longbreak':
                button = document.querySelector('[data-label="Long Break"]');
                break;
        }
        
        if (button) {
            this.switchMode(button);
        }
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar
        const progress = ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
    
    playNotification() {
        // Create a simple notification sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            const title = this.currentMode === 'focus' ? 'Focus Session Complete!' : 'Break Time!';
            const body = this.currentMode === 'focus' 
                ? 'Great job! Time for a break.' 
                : 'Break is over. Ready to focus?';
            
            new Notification(title, { body });
        } else if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showNotification();
                }
            });
        }
    }
    
    openSettings() {
        // Populate settings form
        this.focusTimeInput.value = this.settings.focusTime;
        this.shortBreakInput.value = this.settings.shortBreak;
        this.longBreakInput.value = this.settings.longBreak;
        this.autoStartBreaksInput.checked = this.settings.autoStartBreaks;
        this.autoStartFocusInput.checked = this.settings.autoStartFocus;
        
        this.settingsModal.classList.add('show');
    }
    
    closeSettings() {
        this.settingsModal.classList.remove('show');
    }
    
    saveSettings() {
        // Update settings
        this.settings.focusTime = parseInt(this.focusTimeInput.value);
        this.settings.shortBreak = parseInt(this.shortBreakInput.value);
        this.settings.longBreak = parseInt(this.longBreakInput.value);
        this.settings.autoStartBreaks = this.autoStartBreaksInput.checked;
        this.settings.autoStartFocus = this.autoStartFocusInput.checked;
        
        // Update mode buttons
        const focusBtn = document.querySelector('[data-label="Focus"]');
        const shortBreakBtn = document.querySelector('[data-label="Short Break"]');
        const longBreakBtn = document.querySelector('[data-label="Long Break"]');
        
        focusBtn.dataset.time = this.settings.focusTime;
        shortBreakBtn.dataset.time = this.settings.shortBreak;
        longBreakBtn.dataset.time = this.settings.longBreak;
        
        // Update current timer if in focus mode
        if (this.currentMode === 'focus') {
            this.totalTime = this.settings.focusTime * 60;
            if (!this.isRunning) {
                this.timeLeft = this.totalTime;
                this.updateDisplay();
            }
        }
        
        this.saveSettingsToStorage();
        this.closeSettings();
    }
    
    loadSettings() {
        const saved = localStorage.getItem('pomodoroSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }
    
    saveSettingsToStorage() {
        localStorage.setItem('pomodoroSettings', JSON.stringify(this.settings));
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
>>>>>>> faac7be5af30895aa810ded0e0b218399f2c6825
}); 