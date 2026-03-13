# 1UPGaming Website

Premium PS5 Rental Website for **1UPGaming** — serving Itanagar, Naharlagun & Nirjuli, Arunachal Pradesh, India.

🎮 **Level Up Your Gaming Experience!**

---

## Table of Contents

1. [How to Open / Preview the Website](#1-how-to-open--preview-the-website)
2. [How the Website is Built](#2-how-the-website-is-built)
3. [File Structure](#3-file-structure)
4. [How Each Page Works](#4-how-each-page-works)
5. [How to Install as a Chrome App (PWA)](#5-how-to-install-as-a-chrome-app-pwa)
6. [How to Save as PDF](#6-how-to-save-as-pdf)
7. [RAWG API Setup (Game Cover Images)](#7-rawg-api-setup-game-cover-images)
8. [How to Customise Content](#8-how-to-customise-content)
9. [Deploy to the Web (GitHub Pages)](#9-deploy-to-the-web-github-pages)
10. [Features](#10-features)
11. [Business Info](#11-business-info)

---

## 1. How to Open / Preview the Website

This is a **plain HTML/CSS/JS website** — no build step, no npm install, no frameworks. There are three ways to open it:

### Option A — Double-click (simplest)

1. Download or clone this repository to your computer
2. Open the project folder
3. Double-click **`index.html`**
4. It opens straight in your browser

> ⚠️ The PWA (installable Chrome app) and service worker features require a proper web server (Options B or C). For just browsing the site, double-click works fine.

---

### Option B — VS Code Live Server (recommended for development)

1. Install [VS Code](https://code.visualstudio.com/)
2. Open VS Code → **Extensions** (Ctrl+Shift+X) → search **"Live Server"** → Install
3. Open the project folder in VS Code (`File → Open Folder`)
4. Right-click **`index.html`** in the Explorer panel → **"Open with Live Server"**
5. The site opens at **`http://127.0.0.1:5500`** and auto-reloads when you save files

---

### Option C — Python built-in server (no install required)

Open a terminal in the project folder, then run:

```bash
# Python 3 (comes with macOS / most Linux)
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Then open **`http://localhost:8080`** in your browser.

---

### Option D — Node.js serve

```bash
npx serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

---

## 2. How the Website is Built

### Technology stack

| Layer | Technology |
|-------|-----------|
| **HTML** | Semantic HTML5 — 5 pages, no template engine |
| **CSS** | Plain CSS3 with custom properties (variables) — one stylesheet (`css/style.css`) + one print stylesheet (`css/print.css`) |
| **JavaScript** | Vanilla JS (ES2020) — one file (`js/main.js`), no frameworks, no jQuery |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) loaded from Google Fonts |
| **Game images** | Optional: RAWG.io REST API (free tier) for game cover photos |
| **Booking** | WhatsApp `wa.me` deep-link — builds a formatted message and opens WhatsApp |
| **PWA** | `manifest.json` + `sw.js` service worker (offline caching, Chrome install prompt) |
| **Build step** | **None** — open files directly in a browser |
| **Dependencies** | **None** — no npm, no node_modules, no bundler |

### How the dark theme works

All colours are defined as **CSS custom properties** at the top of `css/style.css`:

```css
:root {
  --bg-primary:   #0a0a0f;   /* page background */
  --neon-purple:  #a855f7;   /* primary accent */
  --neon-blue:    #3b82f6;   /* secondary accent */
  --neon-green:   #22c55e;   /* success / free badge */
  --text-primary: #ffffff;
  ...
}
```

Changing a single variable updates the colour everywhere on the site.

### How the JavaScript is organised

`js/main.js` is split into clearly labelled sections:

| Section | What it does |
|---------|-------------|
| `CONFIG` | Central config object — WhatsApp number, RAWG API key, service areas, rental plans |
| `GAMES` | Array of 50 game objects (title, genre, emoji, RAWG slug) |
| `GENRE_COLORS` | Maps genre names to accent colours |
| `fetchGameImage()` | Calls RAWG API to load cover images; falls back to emoji if no key |
| `initNavbar()` | Sticky nav, mobile hamburger toggle, active-link highlight |
| `initScrollReveal()` | IntersectionObserver — fades in sections as you scroll |
| `initParticles()` | Generates floating coloured dots in the hero background |
| `initGameLibrary()` | Renders game cards, search box, genre filter chips |
| `initBookingPage()` | Pre-fills selected game, shows rental plan cards |
| `submitBookingToWhatsApp()` | Validates the form, builds WhatsApp message, opens `wa.me` link |
| `initHomepage()` | Animated stat counters on the homepage |
| `animateCounters()` | Counts up numbers when they scroll into view |
| Service Worker reg | Registers `sw.js` for PWA/offline support |

### How the booking flow works

```
games.html  →  user clicks "Book This Game"
             →  game id saved to localStorage ("selectedGame")
             →  redirected to booking.html

booking.html →  reads selectedGame from localStorage
             →  user fills form (name, phone, ID, area, address)
             →  user ticks APST + age checkboxes
             →  "Book Now" builds a WhatsApp message string
             →  window.open("https://wa.me/918974740608?text=...") opens WhatsApp
```

---

## 3. File Structure

```
1UPGaming-website/
│
├── index.html          ← Homepage (hero, pricing cards, features, areas)
├── games.html          ← Game library (search + genre filter + 50 game cards)
├── booking.html        ← Rental booking form → WhatsApp
├── terms.html          ← Terms & Conditions
├── pricelist.html      ← Printable price list + full game catalogue (Save as PDF)
│
├── css/
│   ├── style.css       ← Main dark-theme stylesheet (1 900 lines)
│   └── print.css       ← Print / Save-as-PDF overrides (white A4 layout)
│
├── js/
│   └── main.js         ← All JavaScript (RAWG API, game library, booking, SW reg)
│
├── icons/
│   └── icon.svg        ← PWA app icon (PS5 controller, purple-blue gradient)
│
├── manifest.json       ← Web App Manifest (Chrome "Install App" support)
├── sw.js               ← Service Worker (offline caching)
└── README.md           ← This file
```

---

## 4. How Each Page Works

### `index.html` — Homepage

- **Hero section**: animated particle background, headline, two CTA buttons
- **Stats bar**: animated counters (50+ games, 3 areas, etc.)
- **Pricing section**: three plan cards (1 day / 3 days / 1 week) with "Book Now" links
- **Features section**: icon cards listing key benefits
- **Highlights**: FC 26 FREE banner, No Deposit banner
- **Terms preview**: key rules with a link to the full terms page
- **Footer**: brand, quick links, service areas, pricing

### `games.html` — Game Library

- Rendered entirely by JavaScript from the `GAMES` array in `main.js`
- Search box filters by title in real time
- Genre filter chips toggle to show one genre at a time
- Each card shows an emoji placeholder (or RAWG cover photo if API key is set)
- **"Book This Game"** button saves the game to `localStorage` and navigates to `booking.html`

### `booking.html` — Booking Form

- Reads `localStorage.selectedGame` and shows the chosen game at the top
- Three rental plan radio buttons with price and features
- Customer form: name, phone, ID type/number, area dropdown, address
- Two mandatory checkboxes: APST eligibility + age confirmation
- On submit: validates fields → constructs a formatted WhatsApp message → opens WhatsApp

### `terms.html` — Terms & Conditions

- Static HTML page with all rental rules, conditions, and policies

### `pricelist.html` — Price List & Game Catalogue

- Full pricing table + all 50 games grouped by genre
- "🖨️ Save as PDF" button triggers `window.print()` → use Chrome's **"Save as PDF"** destination
- Clean A4 white layout applied automatically by `css/print.css`

---

## 5. How to Install as a Chrome App (PWA)

When the site is served over HTTP/HTTPS (not `file://`), Chrome shows an **install button**:

1. Open the site in **Google Chrome** (using one of the server methods above)
2. Look for the **install icon** (⊕) in the address bar on the right, **or**  
   open Chrome menu (⋮) → **"Install 1UPGaming — PS5 Rental"**
3. Click **Install** — the site opens as a standalone window (no browser chrome)
4. A shortcut is added to your desktop / app launcher

The app works **offline** after first visit because the service worker (`sw.js`) caches all pages and assets.

---

## 6. How to Save as PDF

1. Open **`pricelist.html`** in Chrome (or any browser)
2. Click the **"🖨️ Save as PDF"** button (bottom-right corner), **or** press **Ctrl+P** / **Cmd+P**
3. In the print dialog, set **Destination → Save as PDF**
4. Click **Save** — you get a clean A4 white PDF of the price list and game catalogue

You can print any page this way. The `css/print.css` stylesheet automatically converts the dark theme to a clean white print layout on every page.

---

## 7. RAWG API Setup (Game Cover Images)

By default the game library uses emoji placeholder cards. To load real PS5 cover images:

1. Sign up for a free API key at [rawg.io/apidocs](https://rawg.io/apidocs) (no credit card needed)
2. Open `js/main.js`
3. Find line 15 and replace the placeholder:
   ```js
   // Before:
   RAWG_API_KEY: 'YOUR_RAWG_API_KEY',

   // After (example):
   RAWG_API_KEY: 'abc123youractualkey',
   ```
4. Save the file and refresh the browser — game cover images load automatically

> The free RAWG tier allows 20 000 API requests/month, which is more than enough for a rental website.

---

## 8. How to Customise Content

All editable content is in `js/main.js` inside the `CONFIG` object and `GAMES` array at the very top of the file.

### Change prices

```js
PLANS: [
  { id: '1day',  label: '1 Day',   price: 499,  icon: '⚡' },  // ← change 499
  { id: '3days', label: '3 Days',  price: 899,  icon: '🔥' },  // ← change 899
  { id: '1week', label: '1 Week',  price: 1399, icon: '🏆' },  // ← change 1399
]
```

### Change service areas

```js
AREAS: ['Itanagar', 'Naharlagun', 'Nirjuli'],  // ← add/remove areas
```

### Change WhatsApp number

```js
WHATSAPP_NUMBER: '918974740608',  // ← country code + number, no spaces or +
```

### Add a game

Add an object to the `GAMES` array:

```js
{ id: 51, title: 'Astro Bot', genre: 'Family', emoji: '🤖', rawgSlug: 'astro-bot' },
```

`rawgSlug` is the RAWG game slug (from the URL on rawg.io). It is only used for cover images; the game works without it.

### Change colours

Edit the CSS custom properties at the top of `css/style.css`:

```css
:root {
  --neon-purple: #a855f7;   /* ← change to any colour */
  --bg-primary:  #0a0a0f;   /* ← page background */
}
```

---

## 9. Deploy to the Web (GitHub Pages)

This site can be published for free using **GitHub Pages** in two steps:

1. Push this repository to a GitHub account (or fork it)
2. Go to **Settings → Pages → Source** → select the branch (`main`) and folder (`/ (root)`) → click **Save**

GitHub gives you a free URL: `https://yourusername.github.io/1UPGaming-website/`

The site will be live in ~60 seconds. The PWA and service worker work on the GitHub Pages URL because it is served over HTTPS.

---

## 10. Features

| Feature | Details |
|---------|---------|
| 🎮 **50 PS5 Games** | Search by title, filter by genre (Sports, Action, Racing, Fighting, Shooter, RPG, Family, Horror) |
| ⚽ **FC 26 FREE** | Included with every rental plan, highlighted throughout |
| 🚫 **No Security Deposit** | Zero upfront deposit |
| 🚚 **Free Home Delivery** | Itanagar, Naharlagun & Nirjuli |
| 💬 **WhatsApp Booking** | Form sends a formatted booking message to WhatsApp |
| 📱 **Fully Responsive** | Works on mobile, tablet, and desktop |
| 🌑 **Dark Gaming Theme** | Neon purple/blue/green accents |
| 📄 **PDF Price List** | `pricelist.html` — printable A4 brochure |
| 📲 **PWA / Chrome App** | Installable, works offline |
| 🖼️ **Game Cover Images** | Optional RAWG API integration |

## Pricing

| Plan | Duration | Price |
|------|----------|-------|
| ⚡ Quick Play | 1 Day | ₹499 |
| 🔥 Extended Play | 3 Days | ₹899 |
| 🏆 Weekly Champion | 1 Week | ₹1399 |

> ⚽ FC 26 included FREE with every rental! &nbsp; 🚫 No security deposit.

---

## 11. Business Info

| | |
|--|--|
| **WhatsApp** | [+91 89747 40608](https://wa.me/918974740608) |
| **Instagram** | [@1up_gaming31](https://instagram.com/1up_gaming31) |
| **Eligibility** | APST residents of Arunachal Pradesh, 18+ (or guardian) |
| **Areas** | Itanagar · Naharlagun · Nirjuli — Arunachal Pradesh, India |

---

*Game data & cover images powered by [RAWG Video Games Database](https://rawg.io)*
