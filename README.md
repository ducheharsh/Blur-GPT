# Blur GPT - Chrome Extension

https://github.com/user-attachments/assets/4d1f5063-4ecb-4677-9299-eb382d08af27

A comprehensive Chrome extension that provides privacy-focused features for ChatGPT, allowing you to blur chat names and content for distraction-free and private browsing.

## Features

### 🔐 **Privacy Controls**
- **Blur Chat Names**: Blurs all chat names in the ChatGPT sidebar while keeping them hover-accessible
- **Hide Chat Content**: Blurs conversation messages and content for complete privacy
- **Show on Hover**: Optional feature to make content visible when hovering (configurable)
- **Real-time Effects**: All privacy effects apply instantly as you type or scroll

### ⚡ **Smart Automation**
- **Auto Apply**: Automatically applies your privacy settings when opening new ChatGPT tabs
- **Dynamic Loading**: Automatically applies effects to new content as it loads
- **Persistent Settings**: All preferences are saved and synced across your Chrome devices
- **Content Script Integration**: Seamless background operation without manual activation

### 🎨 **Modern UI & Themes**
- **Dark/Light/System Themes**: Full theme support with automatic system detection
- **Responsive Design**: Popup UI adapts to content and fits perfectly
- **Smooth Animations**: Elegant transitions for all state changes
- **Toggle Switches**: Modern, accessible toggle controls for all features

### 🔧 **Advanced Controls**
- **Apply Settings**: Manually apply current settings to active ChatGPT tabs
- **Clear All Effects**: Instantly remove all privacy effects and reset toggles
- **Status Display**: Real-time status showing active effects and auto-apply state
- **GitHub Integration**: Direct link to source code and updates

## Installation

### Development Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/ducheharsh/Blur-GPT.git
   cd blur-gpt
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the extension:
   ```bash
   pnpm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `dist` folder from this project

### Production Installation

1. Download the latest release from the releases page
2. Extract the ZIP file
3. Follow steps 4-6 from the development installation above

## Usage

### 🚀 **Quick Start**
1. Navigate to [ChatGPT](https://chat.openai.com/) or [ChatGPT.com](https://chatgpt.com/)
2. Click the Blur GPT extension icon in your Chrome toolbar
3. Configure your privacy preferences using the toggle switches:
   - **Blur Chat Names**: Toggle to blur/unblur chat names in sidebar
   - **Hide Chat Content**: Toggle to blur/unblur conversation content
   - **Show on Hover**: Enable to reveal content when hovering (appears when Hide Chat Content is on)
   - **Auto Apply**: Enable to automatically apply settings on new tabs

### 💡 **Pro Tips**
- **Auto Apply**: Enable this once and your settings will automatically work on all ChatGPT tabs
- **Theme Switching**: Use the theme toggle (☀️💻🌙) in the header for your preferred appearance
- **Quick Actions**: Use "Apply Settings" to immediately apply current settings, or "Clear All Effects" to reset
- **Status Monitoring**: Check the bottom of the popup to see which effects are currently active

### 🎯 **Use Cases**
- **Public Spaces**: Hide sensitive chat names when using ChatGPT in public
- **Screen Sharing**: Blur content during presentations or video calls
- **Focus Mode**: Hide distracting chat history while working
- **Privacy**: Keep conversations private from shoulder surfers

## How It Works

### 🎯 **Targeting System**
The extension intelligently targets multiple selectors to ensure compatibility:

```html
<!-- Chat Names -->
<aside>
  <a class="__menu-item">
    <div class="truncate">
      <span>Chat Name Here</span>  <!-- Gets blurred -->
    </div>
  </a>
</aside>

<!-- Chat Content -->
<article data-testid="conversation-turn">
  <div>Conversation content here</div>  <!-- Gets blurred -->
</article>
```

### ⚙️ **Technical Implementation**
- **CSS Filters**: Applies `blur(5px)` for chat names, `blur(10px)` for content
- **Hover Effects**: CSS `:hover` pseudo-selectors for reveal functionality
- **MutationObserver**: Watches for dynamically loaded content (real-time)
- **Chrome Storage API**: Syncs preferences across devices and sessions
- **Content Scripts**: Background operation with automatic injection
- **Modular Architecture**: Clean, maintainable React components with TypeScript

### 🔄 **Smart Detection**
- **Multiple Selectors**: Fallback system for different ChatGPT layouts
- **Real-time Monitoring**: Detects new content as you scroll or navigate
- **State Persistence**: Remembers your settings across browser sessions
- **Cross-tab Sync**: Settings apply instantly across all ChatGPT tabs

## Development

### Project Structure

```
blur-gpt/
├── src/
│   ├── App.tsx                    # Main extension popup component
│   ├── components/                # Reusable UI components
│   │   ├── Header.tsx            # Header with logo and theme toggle
│   │   ├── PrivacyOption.tsx     # Privacy toggle components
│   │   ├── SubOption.tsx         # Sub-option components
│   │   ├── ToggleSwitch.tsx      # Toggle switch component
│   │   ├── ActionButtons.tsx     # Apply/Clear action buttons
│   │   ├── StatusDisplay.tsx     # Status and GitHub link
│   │   └── index.ts              # Component exports
│   ├── hooks/                    # Custom React hooks
│   │   ├── usePreferences.ts     # Preferences management
│   │   └── useTheme.ts           # Theme management
│   ├── utils/                    # Utility functions
│   │   └── chromeExtension.ts    # Chrome extension utilities
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # Shared interfaces
│   ├── lib/                      # Helper libraries
│   │   └── utils.ts              # Utility functions (cn)
│   └── main.tsx                  # React entry point
├── public/
│   ├── manifest.json             # Chrome extension manifest
│   ├── content-script.js         # Content script for auto-apply
│   └── icon.png                  # Extension icon
├── dist/                         # Built extension (after pnpm run build)
└── package.json                  # Dependencies and scripts
```

### Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build the extension for production
- `pnpm run lint` - Run ESLint with TypeScript support
- `pnpm run preview` - Preview the built extension

### Technologies Used

- **React 19** - Modern UI framework with latest features
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework with custom theme support
- **Chrome Extensions API** - Native browser integration (Manifest V3)
- **Vite** - Fast build tool with hot reload
- **pnpm** - Fast, disk space efficient package manager
- **clsx + tailwind-merge** - Dynamic CSS class management
- **ESLint** - Code quality and consistency

## Permissions

The extension requires the following permissions:

- `scripting` - To inject scripts and apply effects to ChatGPT pages
- `activeTab` - To interact with the currently active ChatGPT tab
- `storage` - To save and sync your preferences across devices
- `https://chat.openai.com/*` - To access the original ChatGPT website
- `https://chatgpt.com/*` - To access the new ChatGPT domain

### Privacy & Security
- **No Data Collection**: Extension doesn't collect, store, or transmit any personal data
- **Local Processing**: All effects are applied locally in your browser
- **No External Requests**: No communication with external servers
- **Open Source**: Full source code available for transparency

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Privacy

This extension:
- Only runs on ChatGPT pages
- Does not collect or transmit any data
- Only modifies the visual appearance of chat names
- Does not access chat content or personal information

## Troubleshooting

### Extension not working?
1. **Check URL**: Make sure you're on `https://chat.openai.com/*` or `https://chatgpt.com/*`
2. **Extension Status**: Verify the extension is enabled in `chrome://extensions/`
3. **Refresh Page**: Try refreshing the ChatGPT page after installation
4. **Auto Apply**: Enable "Auto Apply" in the extension popup for automatic operation
5. **Browser Console**: Check for errors in DevTools (F12) → Console tab

### Effects not applying?
1. **Manual Apply**: Try clicking "Apply Settings" in the extension popup
2. **Toggle Reset**: Use "Clear All Effects" then re-enable your preferred settings
3. **Content Loading**: Wait for ChatGPT to fully load before applying effects
4. **Multiple Tabs**: Check if effects are working in other ChatGPT tabs

### Build errors?
1. **Dependencies**: Ensure all dependencies are installed: `pnpm install`
2. **TypeScript**: Check for errors: `pnpm run lint`
3. **Node Version**: Use Node.js 18+ and pnpm 8+
4. **Clean Build**: Delete `dist/` folder and rebuild: `pnpm run build`

### Theme not working?
1. **System Theme**: Check your OS theme settings for "System" mode
2. **Browser Cache**: Clear browser cache and reload the extension
3. **Theme Toggle**: Try manually switching between Light/Dark modes

## Changelog

### v2.0.0 (Latest)
- ✨ **Hide Chat Content**: New feature to blur conversation messages
- ✨ **Show on Hover**: Optional hover reveal for blurred content
- ✨ **Auto Apply**: Automatic settings application on new tabs
- ✨ **Theme Support**: Light/Dark/System theme with automatic detection
- ✨ **Modular Architecture**: Complete code refactor with React components
- ✨ **Status Display**: Real-time status and GitHub integration
- ✨ **Enhanced UI**: Modern toggle switches and responsive design
- ✨ **Storage Sync**: Cross-device preference synchronization
- ✨ **Content Scripts**: Background operation with seamless integration
- 🔧 **Performance**: Faster loading and improved reliability
- 🔧 **ChatGPT.com Support**: Added support for new ChatGPT domain
- 🔧 **TypeScript**: Full type safety and better development experience

### v1.0.0
- 🎉 Initial release
- ⭐ Basic blur/unblur functionality for chat names
- ⭐ Dynamic chat name detection with MutationObserver
- ⭐ Smooth CSS transitions
- ⭐ Chrome Extension Manifest V3 support
