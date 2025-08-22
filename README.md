# Blur GPT - Chrome Extension

A Chrome extension that allows you to blur chat names in the ChatGPT interface for privacy and distraction-free browsing.

## Features

- **Blur Chat Names**: Blurs all chat names in the ChatGPT sidebar
- **Dynamic Loading**: Automatically blurs new chat names as they load when scrolling
- **Toggle Functionality**: Easy toggle between blurred and unblurred states
- **Smooth Transitions**: Smooth blur/unblur animations
- **Privacy Focused**: Helps maintain privacy when using ChatGPT in public spaces

## Installation

### Development Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd blur-gpt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
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

1. Navigate to [ChatGPT](https://chat.openai.com/)
2. Click the Blur GPT extension icon in your Chrome toolbar
3. Click "Blur Chat Names" to blur all chat names in the sidebar
4. Click "Unblur Chat Names" to restore visibility

## How It Works

The extension targets the specific HTML structure of ChatGPT's chat list:

```html
<aside>
  <a class="__menu-item">
    <div class="truncate">
      <span>Chat Name Here</span>  <!-- This gets blurred -->
    </div>
  </a>
</aside>
```

The extension uses:
- **CSS Filter**: Applies `blur(5px)` to chat name spans
- **MutationObserver**: Watches for dynamically loaded chat names
- **Chrome Scripting API**: Injects scripts into the ChatGPT page

## Development

### Project Structure

```
blur-gpt/
├── src/
│   ├── App.tsx          # Main extension popup component
│   ├── App.css          # Tailwind CSS imports
│   └── main.tsx         # React entry point
├── public/
│   ├── manifest.json    # Chrome extension manifest
│   └── icon.png         # Extension icon
├── dist/                # Built extension (after npm run build)
└── package.json         # Dependencies and scripts
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the extension for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the built extension

### Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Chrome Extensions API** - Browser integration
- **Vite** - Build tool

## Permissions

The extension requires the following permissions:

- `scripting` - To inject scripts into ChatGPT pages
- `https://chat.openai.com/*` - To access ChatGPT website

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
1. Make sure you're on a ChatGPT page (`https://chat.openai.com/*`)
2. Check that the extension is enabled in `chrome://extensions/`
3. Try refreshing the ChatGPT page
4. Check the browser console for any errors

### Build errors?
1. Make sure all dependencies are installed: `npm install`
2. Check TypeScript errors: `npm run lint`
3. Ensure you're using Node.js 18+ and npm 8+

## Changelog

### v1.0.0
- Initial release
- Basic blur/unblur functionality
- Dynamic chat name detection
- Smooth transitions
