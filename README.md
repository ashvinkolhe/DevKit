# DevKit

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)

A free, open-source collection of 15+ essential developer tools built with React + Vite.
No login. No signup. No tracking. Everything runs in your browser.

---

## Features

- **15 built-in tools** JSON, Diff, Regex, Hash, JWT, Color, and more
- **React 18 + Vite 5** Fast builds, HMR, lazy-loaded droutes
- **CSS Modules** Scoped styles, no clashes, no CSS-in-JS bloat
- **Privacy first** Zero server requests for tool processing
- **MIT licensed** Fork, self-host, modify freely

---

## Tools Included

| Tool | Description |
|------|-------------|
| JSON Formatter  | Format, validate, minify JSON |
| Diff Viewer     | Line-by-line text comparison |
| Regex Tester    | Live match highlighting |
| Text Analyzer   | Char, word, reading time stats |
| Markdown Preview | Live Markdown rendering |
| Base64 Coder    | Encode/decode Base64 |
| URL Encoder     | Percent-encode/decode URLs |
| HTML Entities   | Encode/decode HTML chars |
| Hash Generator  | SHA-1/256/384/512 via Web Crypto |
| JWT Decoder     | Decode tokens, check expiry |
| Unix Timestamp  | Convert epochs & dates |
| Color Picker    | HEX / RGB / HSL converter |
| Base Converter  | DEC / BIN / OCT / HEX |
| CSS Shadow Gen  | Visual box-shadow builder |
| Lorem Ipsum     | Generate placeholder text |

---

Quick Start
git clone https://github.com/ashvinkolhe.git
cd DevKit
npm install
npm run dev

Open: http://localhost:5173

Build
npm run build
npm run preview
Deployment Options

Deploy easily on:

Netlify (recommended)

Vercel

GitHub Pages

Cloudflare Pages

Self-host via VPS/Nginx

Adding a Tool

Create a component in src/tools/

Register it in constants/tools.js

Add route mapping in ToolsApp.jsx

License

MIT License — free for personal and commercial use.
