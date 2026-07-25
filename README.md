# Portfolio — Snigdha Tiwari

A personal portfolio built as a **product requirements document (PRD)**: instead of a
conventional "about me" layout, the site specs Snigdha like a product — problem, context,
shipped work with decision logs, metrics, changelog, and roadmap.

## 🚀 Live Demo

**URL**: [https://snig-17.github.io/portfolio](https://snig-17.github.io/portfolio)

## 💡 Concept

The page reads as an internal draft spec (`PRD-2026-STIWARI`). Each section maps to a part
of a real PRD:

- **§1 Problem** — the thesis and the work worth owning
- **§2 Context** — background and throughline
- **§3 Shipped · decision log** — projects framed as decisions, with the constraint,
  the fork, a reader poll, and the verdict
- **§4 Metrics** — the evidence, as animated counters
- **§5 Changelog** — experience and education as versioned releases
- **§6 Roadmap** — what's next
- **§7 Appendix** — résumé and contact links

## 🛠️ Tech Stack

- **HTML5** — single-page semantic document (`index.html`)
- **CSS3** — editorial layout, light/dark theme toggle (`prd.css`)
- **JavaScript (ES modules)** — content rendered from a data model at runtime; no build step
  - `prd.data.js` — the content model (copy, metrics, projects, changelog, figures)
  - `prd.js` — renders each section from the data
  - `animations.js`, `fx.js` — scroll animations and effects
- **Framer Motion** — bundled locally (`assets/framer-motion.dom.js`)
- **Google Fonts** — Bricolage Grotesque, Newsreader, JetBrains Mono
- **GitHub Pages** — static hosting (`.nojekyll` disables Jekyll processing)

## 🎨 Features

- PRD/spec document aesthetic with a boot-log loader
- Light and dark theme toggle
- Project **decision logs**: constraint → prompt → reader split → verdict, with award badges
- Animated metric counters
- Versioned changelog for experience and education
- Scroll-linked animations and a scroll-progress rail
- Personal photography used as figures
- No framework build — edit the data model and reload

## 📂 Structure

```
├── index.html          # Page shell / section scaffold
├── prd.data.js         # Content model — edit copy, projects, metrics here
├── prd.js              # Renders sections from the data model
├── prd.css             # Styles + theme
├── animations.js       # Scroll animations
├── fx.js               # Visual effects
├── assets/             # Photography, résumé PDF, framer-motion bundle
├── .nojekyll           # Disables Jekyll processing on GitHub Pages
└── README.md           # Documentation
```

## ✍️ Editing content

All copy lives in `prd.data.js` — update `COPY`, `METRICS`, `PROJECTS`, `CHANGELOG`, and
`FIGURES` there and the page re-renders on reload. Items marked `TODO(snigdha)` are
placeholders to confirm or replace.

## 🔧 Development

```bash
# Clone repository
git clone https://github.com/snig-17/portfolio.git
cd portfolio

# Serve locally (ES modules need an HTTP server, not file://)
python3 -m http.server 3000
# or
npx serve .
```

### Deployment

- Hosted on GitHub Pages, served from `main`
- `.nojekyll` keeps GitHub Pages from processing the site through Jekyll

## 🔗 Links

- **LinkedIn**: [snigdha-tiwari](https://www.linkedin.com/in/snigdha-tiwari-0b6227251/)
- **GitHub**: [@snig-17](https://github.com/snig-17)
- **Email**: snigdha.tiwari.24@ucl.ac.uk

## 📄 License

MIT License — feel free to fork and customize.

---

Built with ❤️ by [Snigdha Tiwari](https://github.com/snig-17)
