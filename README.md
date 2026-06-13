# 🌙 MoonValley — Moon Valley Tours Web App

A modern, fast, mobile-first web application for **Moon Valley Tours**
(built with the brand's authorization, using content, programs and prices
published on [moonvalleytours.com](https://www.moonvalleytours.com)).

Pure **HTML5 + CSS3 + vanilla JavaScript** — no frameworks, no build step
required to run it.

---

## ✨ Features

- **30 tours / programs** across 10 destinations (Istanbul, Cappadocia, Bodrum,
  Fethiye, Pamukkale, Dubai, Abu Dhabi, London, Cairo, Buenos Aires) with
  prices, durations, itineraries, included services and photo galleries.
- **Bilingual**: English 🇬🇧 and Turkish 🇹🇷 (instant switch, saved in
  `localStorage`).
- **Search & filters** by destination and free text.
- **Booking system**: validated form with live price summary
  (children 3–7 get −30%, infants 0–2 free) that sends the request via
  **WhatsApp** or **email** — no backend needed.
- **Gallery** with destination filters and a keyboard-friendly lightbox.
- **Tour detail modal** with image thumbnails, itinerary, inclusions and
  **share buttons** (native share, WhatsApp, Facebook, X, copy link).
- **Floating WhatsApp button** on every page.
- **Google Maps** embed on the contact page.
- **SEO**: per-page meta, Open Graph, JSON-LD (`TravelAgency`, `ItemList`),
  `sitemap.xml`, `robots.txt`.
- **Performance**: lazy-loaded images, font preconnect, cache headers
  (Netlify), no JS/CSS dependencies.
- Fully **responsive**: iPhone, Android, tablets, desktop. Honors
  `prefers-reduced-motion`.

## 📁 Project structure

```
MOONVALLEY/
├── index.html               # Home: hero, destinations, featured tours
├── programs.html            # All tours + search + filters + detail modal
├── prices.html              # Full price table (EUR)
├── booking.html             # Booking form + live summary
├── gallery.html             # Photo gallery + lightbox
├── about.html               # Story, team, why us
├── contact.html             # Contact info, map, FAQ
├── single-file-version.html # Standalone one-file version (CDN images)
├── css/style.css            # Design system ("Celestial Premium")
├── js/app.js                # Data + i18n + all page logic
├── assets/
│   ├── logo/                # Official logo
│   ├── images/              # Tour & destination photos (from official site)
│   └── icons/               # Favicons / app icons
├── robots.txt · sitemap.xml · netlify.toml
└── README.md
```

## 🚀 Run locally

Any static server works:

```bash
cd MOONVALLEY
python3 -m http.server 8000
# open http://localhost:8000
```

Or simply open `single-file-version.html` directly in a browser — it is fully
standalone (images load from the original CDN).

## ⚙️ Configuration

All contact details live in **one place**: the `CONFIG` object at the top of
[`js/app.js`](js/app.js):

```js
const CONFIG = {
  email:    "info@moonvalleytours.com",
  whatsapp: "905334414242",   // ← digits only, international format
  phone:    "+90 212 234 7777",
  ...
};
```

> ⚠️ The WhatsApp/phone numbers come from the official 2026 rate sheet
> (operated by Plan Tours & Gray Line). Confirm/replace them before going
> live if Moon Valley Tours prefers a different line.

Tour data and translations are in the `TOURS` / `DESTS` / `I18N` constants in
the same file.

## 🌍 Deployment

### GitHub Pages

```bash
cd MOONVALLEY
git init && git add -A && git commit -m "MoonValley web app"
gh repo create moonvalley --public --source . --push
gh api repos/{owner}/moonvalley/pages -X POST \
  -f "source[branch]=main" -f "source[path]=/"
# → https://<owner>.github.io/moonvalley/
```

(or enable it in *Settings → Pages → Deploy from branch → main /(root)*).

### Netlify

`netlify.toml` is already included (publish dir = repo root, cache headers
for `/assets/*`). Either:

- **Drag & drop** the `MOONVALLEY` folder at <https://app.netlify.com/drop>, or
- ```bash
  npm i -g netlify-cli
  netlify deploy --dir . --prod
  ```

## 🗒️ Notes

- Tour photos are the same Pexels images used by the official site
  (Pexels license — free to use).
- Child pricing & pickup policy mirror the official 2026 brochure
  (0–2 free, 3–7 −30%).
- Prices shown are the public brochure rates published on the official site,
  in EUR per adult.

---

© 2026 Moon Valley Tours — site implementation crafted as a modern rebuild of
moonvalleytours.com.
