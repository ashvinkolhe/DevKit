# Ã°Å¸Â§Â° DevKit Ã¢â‚¬â€ React Edition

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)

A free, open-source collection of 15+ essential developer tools built with React + Vite.
No login. No signup. No tracking. Everything runs in your browser.

---

## Ã¢Å“Â¨ Features

- **15 built-in tools** Ã¢â‚¬â€ JSON, Diff, Regex, Hash, JWT, Color, and more
- **React 18 + Vite 5** Ã¢â‚¬â€ Fast builds, HMR, lazy-loaded routes
- **CSS Modules** Ã¢â‚¬â€ Scoped styles, no clashes, no CSS-in-JS bloat
- **Privacy first** Ã¢â‚¬â€ Zero server requests for tool processing
- **MIT licensed** Ã¢â‚¬â€ Fork, self-host, modify freely

---

## Ã°Å¸â€ºÂ  Tools Included

| Tool | Description |
|------|-------------|
| Ã°Å¸â€œâ€¹ JSON Formatter  | Format, validate, minify JSON |
| Ã°Å¸â€â‚¬ Diff Viewer     | Line-by-line text comparison |
| Ã°Å¸â€Â Regex Tester    | Live match highlighting |
| Ã°Å¸â€œÅ  Text Analyzer   | Char, word, reading time stats |
| Ã¢Å“ÂÃ¯Â¸Â Markdown Preview | Live Markdown rendering |
| Ã°Å¸â€â€™ Base64 Coder    | Encode/decode Base64 |
| Ã°Å¸â€â€” URL Encoder     | Percent-encode/decode URLs |
| Ã°Å¸ÂÂ·Ã¯Â¸Â HTML Entities   | Encode/decode HTML chars |
| Ã°Å¸â€Â Hash Generator  | SHA-1/256/384/512 via Web Crypto |
| Ã°Å¸Å½Â« JWT Decoder     | Decode tokens, check expiry |
| Ã¢ÂÂ±Ã¯Â¸Â Unix Timestamp  | Convert epochs & dates |
| Ã°Å¸Å½Â¨ Color Picker    | HEX / RGB / HSL converter |
| Ã°Å¸â€Â¢ Base Converter  | DEC / BIN / OCT / HEX |
| Ã¢Å“Â¨ CSS Shadow Gen  | Visual box-shadow builder |
| Ã°Å¸â€œÂ Lorem Ipsum     | Generate placeholder text |

---

## Ã°Å¸Å¡â‚¬ Quick Start

### Prerequisites

- **Node.js 18+** Ã¢â‚¬â€ [Download here](https://nodejs.org)
- **npm 9+** (comes with Node.js)

---

### 1. Clone the Repository

```bash
git clone https://github.com/ashvinkolhe.git
cd DevKit
```

---

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `react` + `react-dom`
- `react-router-dom` (for SPA routing)
- `vite` + `@vitejs/plugin-react` (build tool)

---

### 3. Start Development Server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

Hot module replacement (HMR) is enabled Ã¢â‚¬â€ changes appear instantly without losing state.

---

### 4. Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Preview it locally:

```bash
npm run preview
# Opens at http://localhost:4173
```

---

## Ã°Å¸Å’Â Deployment Guide

### Ã¢â€“Â¶ Option 1: Netlify (Recommended Ã¢â‚¬â€ Free tier)

**One-click deploy (no CLI needed):**
1. Push your code to GitHub
2. Go to [netlify.com](https://app.netlify.com) Ã¢â€ â€™ "Add new site" Ã¢â€ â€™ "Import from Git"
3. Select your repo
4. Netlify auto-detects the `netlify.toml` config:
   - Build command: `npm run build`
   - Publish dir: `dist`
5. Click **Deploy** Ã¢â‚¬â€ live in ~60 seconds

**Or via CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

### Ã¢â€“Â¶ Option 2: Vercel (Free tier)

**One-click deploy:**
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) Ã¢â€ â€™ "New Project" Ã¢â€ â€™ Import your repo
3. Vercel reads `vercel.json` automatically
4. Click **Deploy**

**Or via CLI:**
```bash
npm install -g vercel
vercel --prod
```

---

### Ã¢â€“Â¶ Option 3: GitHub Pages (Free)

GitHub Pages serves static files, so you need to build first:

```bash
# Install the deploy tool
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

Then in your repo: **Settings Ã¢â€ â€™ Pages Ã¢â€ â€™ Source: gh-pages branch**

> Ã¢Å¡Â Ã¯Â¸Â For GitHub Pages, set `base` in `vite.config.js`:
> ```js
> export default defineConfig({ base: '/your-repo-name/' })
> ```

---

### Ã¢â€“Â¶ Option 4: Cloudflare Pages (Free, global CDN)

1. Push to GitHub
2. [Cloudflare Pages](https://pages.cloudflare.com/) Ã¢â€ â€™ "Create a project"
3. Connect your repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Deploy

---

### Ã¢â€“Â¶ Option 5: Self-Host (VPS / Server)

```bash
# Build
npm run build

# Copy dist/ to your server
scp -r dist/ user@yourserver.com:/var/www/DevKit

# Example nginx config:
# server {
#   listen 80;
#   server_name yourdomain.com;
#   root /var/www/DevKit;
#   index index.html;
#   location / { try_files $uri $uri/ /index.html; }
# }
```

---

## Ã°Å¸â€œÂ Project Structure

```
DevKit/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ public/                   # Static assets
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ src/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Sidebar.jsx       # Navigation sidebar
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Sidebar.module.css
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ToolShell.jsx     # Shared tool layout wrapper
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ ToolShell.module.css
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ constants/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ tools.js          # Tool registry / metadata
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ hooks/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ useCopy.js        # Clipboard hook
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pages/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Landing.jsx       # Marketing landing page
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Landing.module.css
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ToolsApp.jsx      # Main app shell with lazy routes
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ ToolsApp.module.css
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ styles/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ globals.css       # Design system / CSS variables
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ tools/                # One file per tool
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Dashboard.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ JsonFormatter.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ DiffViewer.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ RegexTester.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ TextAnalyzer.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ MarkdownPreview.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Base64.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ UrlEncoder.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ HtmlEntity.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ HashGenerator.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ JwtDecoder.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Timestamp.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ColorPicker.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ BaseConverter.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ShadowGenerator.jsx
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ LoremIpsum.jsx
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ App.jsx               # Route definitions
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ main.jsx              # React entry point
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ index.html                # HTML shell
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ vite.config.js            # Vite config
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ package.json
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ netlify.toml              # Netlify deploy config
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ vercel.json               # Vercel deploy config
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ .github/workflows/        # GitHub Actions CI
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ deploy.yml
```

---

## Ã°Å¸â€Â§ Adding a New Tool

1. **Create the component** in `src/tools/MyTool.jsx`:

```jsx
import { ToolShell, ControlsBar } from '../components/ToolShell'

export default function MyTool() {
  return (
    <ToolShell icon="Ã°Å¸â€Â§" title="My Tool" desc="What it does.">
      <ControlsBar>
        {/* your buttons */}
      </ControlsBar>
      {/* your tool UI */}
    </ToolShell>
  )
}
```

2. **Register it** in `src/constants/tools.js`:

```js
// Add to the appropriate group:
MyGroup: [
  { id: 'my-tool', label: 'My Tool', icon: 'Ã°Å¸â€Â§', desc: 'Short description' },
]
```

3. **Add the route** in `src/pages/ToolsApp.jsx`:

```js
const MyTool = lazy(() => import('../tools/MyTool'))

// Add to TOOL_COMPONENTS:
'my-tool': MyTool,
```

That's it Ã¢â‚¬â€ the sidebar, navigation, and routing all update automatically.

---

## Ã°Å¸Â¤Â Contributing

PRs are welcome! Please:
- Keep tools self-contained in a single `.jsx` file
- Use the shared `ToolShell`, `ControlsBar`, `StatusBadge` components
- Add your tool to `constants/tools.js` and `ToolsApp.jsx`
- All processing must be client-side (no API calls)

---

## Ã°Å¸â€œÅ“ License

MIT License Ã¢â‚¬â€ See [LICENSE](LICENSE). Free for personal and commercial use.

---

**Ã¢Â­Â If this helped you, give it a star on GitHub!**
