# 📝 Smart Offline Todo App

A powerful, fully offline-capable Progressive Web App (PWA) for managing your tasks with smart notifications and local storage.

## ✨ Features

### 🔒 **100% Offline Capability**
- Works completely offline - no internet connection required
- All data stored locally in your browser
- No user accounts or login needed
- Privacy-focused - your data never leaves your device

### 📱 **Progressive Web App (PWA)**
- Install on any device (desktop, mobile, tablet)
- Native app-like experience
- Responsive design that works on all screen sizes
- Works in standalone mode when installed

### ✅ **Task Management**
- Add tasks with title, description, due date/time, and priority
- Mark tasks as complete with checkboxes
- Delete tasks you no longer need
- Filter tasks by status (all, pending, completed, today, high priority)
- Clear all completed tasks at once

### 🔔 **Smart Notifications**
- Browser notifications at the exact time you set
- Works even when the app is closed (if supported by your browser)
- Test notifications to make sure they work
- No external services required

### 📊 **Progress Tracking**
- Visual progress bar showing completion percentage
- Statistics dashboard showing:
  - Total tasks
  - Completed tasks
  - Pending tasks
  - Tasks due today

### 🎨 **Modern Design**
- Clean, intuitive interface
- Dark/light mode support (follows system preference)
- Priority color coding (high=red, medium=yellow, low=green)
- Smooth animations and transitions

## 🚀 How to Use

### 1. **Installation**
You can use this app in several ways:

#### Option A: Direct Usage
- Open `index.html` in any modern web browser
- Bookmark it for easy access

#### Option B: Local Server (Recommended)
- Open terminal/command prompt in the project folder
- Run a simple HTTP server:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Python 2
  python -m SimpleHTTPServer 8000
  
  # Node.js (if you have http-server installed)
  npx http-server
  
  # PHP
  php -S localhost:8000
  ```
- Open your browser to `http://localhost:8000`

#### Option C: Install as PWA
- Open the app in your browser
- Look for "Install App" prompt or click the install icon in the address bar
- The app will be installed on your device like a native app

### 2. **Adding Tasks**
1. Fill in the task title (required)
2. Optionally add a description
3. Set a due date and time for notifications
4. Choose priority level (low, medium, high)
5. Click "Add Task"

### 3. **Managing Tasks**
- **Complete**: Click the checkbox next to any task
- **Delete**: Click the 🗑️ trash icon
- **Test Notification**: Click the 🔔 bell icon
- **Filter**: Use the dropdown to show specific task types
- **Clear Completed**: Remove all completed tasks at once

### 4. **Notifications**
1. Click "Enable Notifications" when prompted
2. Allow notifications in your browser
3. Set due dates/times on your tasks
4. Receive automatic reminders at the scheduled time

## 🔧 Technical Details

### **Technologies Used**
- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Storage**: localStorage (browser-based)
- **PWA**: Service Worker, Web App Manifest
- **Notifications**: Web Notifications API
- **Styling**: CSS Grid, Flexbox, CSS Variables

### **Browser Compatibility**
- ✅ Chrome/Chromium (desktop & mobile)
- ✅ Firefox (desktop & mobile)
- ✅ Safari (desktop & mobile)
- ✅ Edge (desktop & mobile)
- ⚠️ IE: Not supported

### **PWA Features**
- **Offline-first**: All functionality works without internet
- **Installable**: Can be added to home screen/desktop
- **Responsive**: Adapts to any screen size
- **App-like**: Standalone window when installed

### **Data Storage**
- Uses browser's localStorage
- Data persists until you clear browser data
- No cloud sync (by design for privacy)
- Export/backup feature can be added if needed

## 🛠️ Customization

### **Changing Colors**
Edit the CSS variables in `index.html`:
```css
:root {
    --primary-color: #4285f4;    /* Main brand color */
    --success-color: #34a853;    /* Success/completion color */
    --warning-color: #fbbc04;    /* Warning/medium priority */
    --danger-color: #ea4335;     /* Danger/high priority */
}
```

### **Adding Features**
The code is well-structured and commented. Key areas:
- **Task Management**: `TodoApp` class in the `<script>` section
- **Storage**: `loadTasks()` and `saveTasks()` methods
- **UI Updates**: `renderTasks()` and `updateUI()` methods
- **Notifications**: `scheduleNotification()` and related methods

## 🔒 Privacy & Security

- **No Data Collection**: Your data never leaves your device
- **No User Accounts**: No registration or login required
- **No External Services**: No third-party analytics or tracking
- **Local Storage**: All data stored in your browser only
- **No Network Requests**: Works completely offline

## 🐛 Troubleshooting

### **Notifications Not Working**
1. Make sure you clicked "Allow" when prompted for notifications
2. Check browser notification settings
3. Try the test notification button (🔔)
4. Some browsers require HTTPS for notifications

### **App Not Installing**
1. Make sure you're using HTTPS or localhost
2. Try refreshing the page
3. Check if your browser supports PWA installation
4. Look for install prompts in the address bar

### **Data Lost**
- Data is stored in browser's localStorage
- Clearing browser data will delete all tasks
- Consider exporting important tasks (feature can be added)

### **Performance Issues**
- The app is lightweight and should run smoothly
- If you have many tasks, consider archiving completed ones
- Clear completed tasks regularly

## 📋 Todo for Future Versions

- [ ] Import/Export tasks to JSON/CSV
- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Task attachments
- [ ] Multiple lists/projects
- [ ] Task search functionality
- [ ] Cloud sync option (optional)
- [ ] Voice input for tasks
- [ ] Task templates

## 🤝 Contributing

Feel free to suggest improvements or report issues. The code is designed to be:
- Easy to understand
- Well-commented
- Modular and extensible
- Standards-compliant

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy staying organized! 📝✨**
