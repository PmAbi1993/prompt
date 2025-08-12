# Prompt Builder

A fast, static web application for generating high-quality prompts through simple forms. Built with Vite, React, and TypeScript.

## 🚀 Features

- **Configuration-driven prompts** - Easy to add new prompt templates
- **One-click copy to clipboard** - Seamless workflow integration
- **Dark/light theme support** - Follows system preferences
- **Form draft auto-save** - Never lose your work
- **Mobile-friendly responsive design** - Works on all devices
- **Accessible keyboard navigation** - WCAG 2.1 AA compliant
- **Fast performance** - Optimized for speed and efficiency

## 🎯 Quick Start

### Development

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd prompt-builder
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📝 How to Use

1. **Choose a Template** - Browse the dashboard and select a prompt template
2. **Fill the Form** - Complete the form with your specific requirements
3. **Generate & Copy** - Click "Create Prompt" to generate and copy to clipboard

## 🔧 Adding New Prompts

To add new prompt templates, edit `src/config/prompts.config.json`:

```json
{
  "id": "unique-id",
  "title": "Display Name",
  "icon": "📝",
  "description": "Brief description",
  "template": "Your template with {{variables}}",
  "fields": [
    {
      "key": "variable",
      "label": "Field Label",
      "type": "text|textarea|select|number|checkbox|radio",
      "required": true,
      "placeholder": "Helper text"
    }
  ],
  "tags": ["category", "type"]
}
```

### Field Types

- **text** - Single line text input
- **textarea** - Multi-line text input
- **select** - Dropdown with predefined options
- **number** - Numeric input with min/max validation
- **checkbox** - Boolean checkbox
- **radio** - Radio button group

### Template Variables

Use `{{variable}}` syntax where `variable` matches a field's `key`. Variables are automatically sanitized and validated.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Field.tsx
│   ├── Toast.tsx
│   ├── Preview.tsx
│   ├── Card.tsx
│   └── Layout.tsx
├── pages/              # Route components
│   ├── Dashboard.tsx
│   ├── Builder.tsx
│   ├── Settings.tsx
│   ├── About.tsx
│   └── NotFound.tsx
├── lib/                # Utility functions
│   ├── clipboard.ts
│   ├── compileTemplate.ts
│   ├── validation.ts
│   └── storage.ts
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── config/             # Configuration files
│   └── prompts.config.json
├── types/              # TypeScript definitions
│   └── index.ts
└── main.tsx           # Application entry point
```

## 🚀 Deployment

### GitHub Pages (Automatic)

1. **Push to main branch** - GitHub Actions will automatically build and deploy
2. **Enable GitHub Pages** - Go to repository Settings > Pages > Source: gh-pages branch
3. **Access your app** - Visit `https://yourusername.github.io/repository-name`

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🎨 Customization

### Themes

The app supports light, dark, and system themes. Theme preference is automatically saved and restored.

### Styling

Built with Tailwind CSS. Customize colors, spacing, and components in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles and CSS variables

### Configuration

Key settings in `vite.config.ts`:
- `base` - Set to your repository name for GitHub Pages
- Build optimization settings

## 🧪 Testing

The app includes comprehensive validation and error handling:

- **Form validation** - Required fields and type checking
- **Clipboard fallbacks** - Manual copy instructions when clipboard access fails
- **Error boundaries** - Graceful error handling
- **Accessibility** - Screen reader support and keyboard navigation

## 📱 Browser Support

- **Modern browsers** - Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile browsers** - iOS Safari, Chrome Mobile
- **Clipboard API** - Requires HTTPS (automatically provided on GitHub Pages)

## 🔒 Privacy & Security

- **Client-side only** - No data sent to servers
- **Local storage** - Theme and draft preferences stored locally
- **Input sanitization** - All user inputs are sanitized before use
- **HTTPS required** - For clipboard functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

**Clipboard not working:**
- Ensure you're using HTTPS
- Check browser permissions
- Use the manual copy fallback

**Build errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version (18+ recommended)

**Routing issues on GitHub Pages:**
- Ensure `base` is set correctly in `vite.config.ts`
- Using hash-based routing to avoid 404s

## 🏷️ Version History

- **v1.0.0** - Initial release with core functionality
- Configuration-driven prompts
- Clipboard integration
- Theme support
- Mobile responsive design

---

Built with ❤️ using Vite, React, and TypeScript
