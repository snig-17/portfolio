# Portfolio Redesign — "The Animated PRD + Decision Room" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a single-page "living product spec" that writes itself as you scroll, with an interactive Decision Room per flagship project.

**Architecture:** Data-driven, no-build static site. Content lives in `prd.data.js`; `prd.js` renders it and owns UI interaction (decision room, counters, theme, status flip, smooth scroll); `animations.js` owns Framer Motion scroll-build reveals and hover springs; `prd.css` holds all styling and both themes. `concept-prd.html` is the proven reference implementation to port from.

**Tech Stack:** Vanilla HTML/CSS/JS (ES modules), Framer Motion vanilla-DOM API (self-hosted), no bundler, no framework.

## Global Constraints

Every task's requirements implicitly include these:

- **No build step, no React, no new npm deps.** Vanilla HTML/CSS/JS only.
- **Framer Motion only via the self-hosted bundle** `assets/framer-motion.dom.js` (vanilla-DOM API: `animate`, `inView`, `stagger`, `hover`). No CDN. See memory `framer-motion-vanilla`.
- **Design tokens** follow `.claude/skills/portfolio-design/SKILL.md` (glass, iOS gradient `#007AFF · #5856D6 · #AF52DE · #FF2D92 · #FF6B35`) plus spec chrome. Type: Playfair Display (display), Poppins (body), Fira Code (spec metadata).
- **Both light and dark themes** defined at token level (`:root`, `@media (prefers-color-scheme: dark)`, and `:root[data-theme="…"]` overrides). Both must be legible; do not invert naively.
- **Full `prefers-reduced-motion` support:** skip motion, hide nothing.
- **Positioning copy:** "product-minded engineer." Status line `Open to 2027 grad roles`. **Never name a specific target company or role** on the page.
- **Contact:** LinkedIn `@snigdha-tiwari` (`https://linkedin.com/in/snigdha-tiwari`), GitHub `@snig-17` (`https://github.com/snig-17`), email `snigdha.tiwari.24@ucl.ac.uk`.
- **Verification harness:** this repo has no unit-test framework. Each task is verified by serving the site (`python3 -m http.server 3000` from repo root) and asserting DOM/visual state via the gstack browse tool (`~/.claude/skills/gstack/browse/dist/browse`) or by opening `http://localhost:3000/` in Safari. "Expected" blocks below are browser assertions.

## File Structure

- `index.html` — rebuilt: 8 semantic `<section>` shells + script/style links. No inline content data.
- `prd.css` — **new**. All redesign styling + both themes. Ported/extended from `concept-prd.html`'s `<style>`.
- `prd.data.js` — **new** ES module. Exports `PROJECTS`, `METRICS`, `CHANGELOG`, `COPY` (real content).
- `prd.js` — **new** ES module. Renders data into cards, owns decision-room interaction, metric counters, theme toggle, status flip, smooth-scroll.
- `animations.js` — **rewritten**. Framer Motion scroll-build reveals + hover springs for the new structure.
- `assets/framer-motion.dom.js` — unchanged (already present).
- Superseded (leave on disk, no longer linked by `index.html`): `style.css`, `script.js`. `concept-prd.html` stays as reference until launch, then delete.

---

### Task 1: Content intake — `prd.data.js`

Gather the real content and encode it as a data module. This is the one task that needs Snigdha's input (real decision stories, copy, photo mapping, résumé). Everything else renders from this file.

**Files:**
- Create: `prd.data.js`

**Interfaces:**
- Produces: ES module exporting `PROJECTS` (array), `METRICS` (array), `CHANGELOG` (array), `COPY` (object). Consumed by `prd.js` Tasks 5–7.

**Data shapes (fill values with real content collected from Snigdha):**

```js
// prd.data.js
export const COPY = {
  title: ["Snigdha builds", "products that <u>think</u>."], // <u> = gradient span
  version: "v2026.1",
  meta: { owner: "Snigdha Tiwari", role: "product-minded engineer", base: "London", updated: "Jul 2026" },
  statusFrom: "Draft",
  statusTo: "Open to 2027 grad roles",
  thesis: "UCL Computer Science & Economics. I design, build, and ship AI products — and I can show you <em>the decisions</em>, not just the outcomes. This page is my spec: problem, evidence, judgement, roadmap.",
  problem: "…real Problem section copy…",   // gather
  context: "…real Context section copy…",   // gather
  roadmap: "…real Roadmap section copy…",    // gather
  resumeUrl: "assets/Snigdha-Tiwari-CV.pdf", // gather PDF
};

export const METRICS = [
  { value: 9500, suffix: "+", label: "people reached\nfinancial-literacy programme", kind: "impact" },
  { value: 2,   suffix: "×", label: "hackathon wins\nGoogle & Starling", kind: "impact" },
  { value: 19,  suffix: "",  label: "countries\nvolunteer network built", kind: "impact" },
  { value: 800, prefix: "₹", suffix: "K+", label: "funding raised\nITC · Christ · Goonj", kind: "impact" },
  // engineering proof points (confirm exact figures with Snigdha):
  { value: 3,   suffix: "",  label: "builds shipped in <24h\nall placed (26 / 20 teams)", kind: "eng" },
  { value: 6,   suffix: "",  label: "languages shipped\nPython · TS · Swift · SQL · Cypher…", kind: "eng" },
];

export const PROJECTS = [
  {
    id: "gemma", name: "Gemma", date: "Mar 2026",
    sub: "AI personalised tutoring · Gemini API · Cloud TTS",
    tags: ["Product lead", "Gemini API", "Multimodal", "26 teams"],
    stack: ["Gemini API", "Google Cloud TTS", "persistent sessions"],
    built: "How it's built: multimodal input pipeline (text / image / whiteboard) into the Gemini API, Cloud TTS for audio, and a persistent session store for long-term learner progress.",
    decision: {
      constraint: "Hour 20 of 24. Judges score in four hours. The build is stable but plain.",
      prompt: "Do you polish the live demo, or ship multimodal whiteboard input?",
      options: [
        { id: "A", text: "Polish the demo — safe, clean, judged well on presentation." },
        { id: "B", text: "Ship multimodal whiteboard — riskier, but a real differentiator.", mine: true },
      ],
      readerSplit: { A: 61, B: 39 },
      verdict: {
        headline: "I shipped B.",
        reasoning: "“Best Use of Gemini” is judged on <em>how deeply you use the API</em>, not demo gloss. Multimodal input was the one thing a polished-but-shallow build couldn't fake…",
        badges: [ { text: "🏆 2nd place · 26 projects", win: true }, { text: "Google — Best Use of Gemini" } ],
      },
    },
  },
  // SplitStar — REAL decision story to gather. Stack: Next.js, TypeScript, Supabase, REST.
  //   Outcome: Overall Winner + Starling Prize, 20 teams.
  // Triage Queue — REAL decision story to gather. Stack: Cloudflare Workers, D1, Workers AI (Llama 3.1).
  //   github.com/snig-17/triage-queue
];

export const CHANGELOG = [
  { ver: "v2026.3", date: "Jul 2026", upcoming: true, org: "Cloudflare", role: "AI Innovations & Operations Intern", loc: "London", note: "Incoming." },
  { ver: "v2026.2", date: "Jun 2026 – Present", org: "The Ditchley Foundation", role: "Networks Research Intern", loc: "Remote, UK", note: "Quantitative network research on a global stakeholder graph — Neo4j / Cypher." },
  { ver: "v2025.2", date: "Apr 2025", org: "EY-Parthenon", role: "Transaction Strategy & Execution Intern", loc: "Bangalore", note: "Buy-side due diligence; EY NextGen UK Finalist 2025." },
  { ver: "v2024.1", date: "Aug 2022 – May 2024", org: "Ladki Padhao", role: "Head of Design & Scaling", loc: "Bangalore", note: "9,500+ reached · ₹800K+ raised · Diana Award." },
  { ver: "edu",     date: "Sep 2024 – Jul 2027", org: "University College London", role: "BASc Computer Science & Economics", loc: "London", note: "Year 1: First Class Honours." },
];
```

- [ ] **Step 1: Collect real content from Snigdha** — the SplitStar and Triage Queue decision stories (constraint / fork / options / reasoning / outcome), Problem/Context/Roadmap copy, the résumé PDF (save to `assets/Snigdha-Tiwari-CV.pdf`), and confirm the two engineering metric figures.

- [ ] **Step 2: Create `prd.data.js`** with the shapes above, values replaced by the real content. Keep the Gemma reconstruction only if Snigdha confirms it; otherwise replace with her real Gemma fork.

- [ ] **Step 3: Syntax-check the module**

Run: `node --check prd.data.js`
Expected: no output (valid).

- [ ] **Step 4: Verify exports load**

Run: `node --input-type=module -e "import('./prd.data.js').then(m=>console.log(Object.keys(m), m.PROJECTS.length))"`
Expected: prints `[ 'CHANGELOG', 'COPY', 'METRICS', 'PROJECTS' ] 3`

- [ ] **Step 5: Commit**

```bash
git add prd.data.js assets/Snigdha-Tiwari-CV.pdf
git commit -m "content: add PRD portfolio data (projects, metrics, changelog, copy)"
```

---

### Task 2: Production stylesheet — `prd.css`

**Files:**
- Create: `prd.css`

**Interfaces:**
- Produces: all class names used by `index.html` and `prd.js`. Key classes consumed later: `.wrap .topbar .toggle .cover .kicker .metaline .title .draw .thesis .pill .statusval .section-label .metrics .metric .ship .constraint .choices .choice .reveal .badge .changelog .rel .roadmap .appendix .figure .rise`.

- [ ] **Step 1: Port the proven base.** Copy the entire contents of the `<style>…</style>` block from `concept-prd.html` into a new `prd.css` (strip the surrounding `<style>` tags). This gives tokens, both themes, glass, spec chrome, cover, metrics, ship/decision-room, reveal, and reduced-motion — all already verified in the browser.

- [ ] **Step 2: Add the metric `kind` accent.** Append:

```css
.metric.eng { border-color: color-mix(in srgb, var(--accent) 30%, var(--line)); }
.metric.eng .v { background: linear-gradient(120deg, var(--accent), var(--accent-3)); -webkit-background-clip: text; background-clip: text; color: transparent; }
```

- [ ] **Step 3: Add "How it's built" expandable styles.** Append:

```css
.built-toggle { font-family: var(--mono); font-size: 11.5px; color: var(--accent); background: none; border: 0; cursor: pointer; padding: 10px 0 0; display: inline-flex; align-items: center; gap: 6px; }
.built-toggle:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.built { max-height: 0; overflow: hidden; opacity: 0; transition: max-height .45s ease, opacity .4s ease; font-family: var(--mono); font-size: 12px; color: var(--ink-soft); }
.built.open { max-height: 240px; opacity: 1; margin-top: 10px; }
```

- [ ] **Step 4: Add Changelog / Roadmap / Appendix / Figure styles.** Append:

```css
.changelog { display: flex; flex-direction: column; gap: 10px; }
.rel { display: grid; grid-template-columns: 92px 1fr; gap: 16px; padding: 14px 16px; border: 1px solid var(--line); border-radius: 14px; background: var(--panel); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
.rel .ver { font-family: var(--mono); font-size: 12px; color: var(--muted); }
.rel.upcoming { border-style: dashed; border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); }
.rel.upcoming .ver::after { content: " · upcoming"; color: var(--accent); }
.rel h4 { margin: 0 0 2px; font-family: var(--serif); font-weight: 600; font-size: 1.05rem; }
.rel .role { color: var(--muted); font-size: .9rem; }
.rel .note { color: var(--ink-soft); font-size: .92rem; margin-top: 6px; }
.roadmap { font-size: clamp(1.1rem,2.6vw,1.5rem); color: var(--ink-soft); max-width: 60ch; }
.roadmap em { font-style: normal; color: var(--ink); border-bottom: 2px solid color-mix(in srgb,var(--accent) 55%,transparent); }
.appendix { display: flex; flex-wrap: wrap; gap: 12px; }
.appendix a { font-family: var(--mono); font-size: 13px; text-decoration: none; color: var(--ink); border: 1px solid var(--line-strong); border-radius: 999px; padding: 10px 16px; transition: transform .18s ease, border-color .18s ease; }
.appendix a:hover { transform: translateY(-2px); border-color: var(--accent); }
.appendix a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.figure { margin: 24px 0; border-radius: 18px; overflow: hidden; border: 1px solid var(--line); }
.figure img { display: block; width: 100%; height: auto; }
.figure figcaption { font-family: var(--mono); font-size: 11.5px; color: var(--muted); padding: 8px 12px; }
```

- [ ] **Step 5: Verify it parses (no fatal CSS errors) by loading a stub.** Temporarily add `<link rel="stylesheet" href="prd.css">` to `concept-prd.html`, serve, and confirm no console errors.

Run: `~/.claude/skills/gstack/browse/dist/browse goto http://localhost:3000/concept-prd.html && ~/.claude/skills/gstack/browse/dist/browse console --errors`
Expected: `(no console errors)`. Then revert the temporary `<link>`.

- [ ] **Step 6: Commit**

```bash
git add prd.css
git commit -m "style: add production PRD stylesheet (ported from concept, both themes)"
```

---

### Task 3: HTML skeleton — `index.html`

**Files:**
- Modify: `index.html` (full rebuild of `<head>` links + `<body>` structure)

**Interfaces:**
- Produces: the section shells and mount points (`#cover #problem #context #shipped #metrics #changelog #roadmap #appendix`, plus `#projectMounts #metricMount #changelogMount #appendixMount #statusVal #themeBtn`) that `prd.js` fills.

- [ ] **Step 1: Rewrite `index.html`** with this structure (head keeps the Google Fonts + Font Awesome links from the current file; body below):

```html
<body>
  <div class="topbar">
    <div><span class="doc-id">PRD-2026-STIWARI</span><span class="dot">·</span><span id="verStamp"></span><span class="dot">·</span>internal draft</div>
    <button class="toggle" id="themeBtn" aria-label="Toggle colour theme"><span id="themeIcon">◐</span> <span id="themeLbl">theme</span></button>
  </div>
  <main class="wrap" id="doc">
    <section class="cover" id="cover"><!-- filled by prd.js: kicker, metaline, title, thesis, status pills --></section>
    <section id="problem"><div class="section-label rise"><span class="n">§1</span> Problem</div><p class="thesis" id="problemCopy"></p></section>
    <section id="context"><div class="section-label rise"><span class="n">§2</span> Context</div><p class="thesis" id="contextCopy"></p></section>
    <div class="section-label rise"><span class="n">§3</span> Shipped · decision log</div>
    <section id="shipped"><div id="projectMounts"></div></section>
    <div class="section-label rise"><span class="n">§4</span> Metrics · the evidence</div>
    <section class="metrics" id="metricMount"></section>
    <div class="section-label rise"><span class="n">§5</span> Changelog</div>
    <section class="changelog" id="changelogMount"></section>
    <div class="section-label rise"><span class="n">§6</span> Roadmap</div>
    <section id="roadmap"><p class="roadmap" id="roadmapCopy"></p></section>
    <div class="section-label rise"><span class="n">§7</span> Appendix</div>
    <section class="appendix" id="appendixMount"></section>
  </main>
  <script type="module" src="prd.js"></script>
  <script type="module" src="animations.js"></script>
</body>
```

- [ ] **Step 2: Point the stylesheet link** to `prd.css` (remove the `style.css` link).

- [ ] **Step 3: Serve and verify the skeleton loads with no errors** (sections empty is expected at this stage).

```bash
python3 -m http.server 3000 >/dev/null 2>&1 &
~/.claude/skills/gstack/browse/dist/browse goto http://localhost:3000/
~/.claude/skills/gstack/browse/dist/browse console --errors
```
Expected: `(no console errors)`; `~/.claude/skills/gstack/browse/dist/browse js "document.querySelectorAll('section').length"` prints `8`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: rebuild index.html as PRD section skeleton"
```

---

### Task 4: `prd.js` core — theme, status flip, smooth scroll, verStamp

**Files:**
- Create: `prd.js`

**Interfaces:**
- Consumes: `COPY` from `prd.data.js`.
- Produces: DOM ready bootstrap; helper `el(tag, cls, html)` reused by Tasks 5–7; theme + status behaviour.

- [ ] **Step 1: Write `prd.js` core** (port theme toggle + status flip from `concept-prd.html`'s script; add verStamp, cover render, smooth scroll):

```js
import { COPY } from "./prd.data.js";
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };

function boot() {
  document.getElementById("verStamp").textContent = COPY.version;
  renderCover();
  document.getElementById("problemCopy").innerHTML = COPY.problem;
  document.getElementById("contextCopy").innerHTML = COPY.context;
  document.getElementById("roadmapCopy").innerHTML = COPY.roadmap;
  initTheme(); initStatus(); initSmoothScroll();
  requestAnimationFrame(() => document.body.classList.add("in"));
}
function renderCover() {
  const c = document.getElementById("cover");
  const m = COPY.meta;
  c.innerHTML = `
    <div class="kicker rise d1"><b>Product Requirements Doc</b> <span class="dot">/</span> the human, specced</div>
    <div class="metaline rise d2">
      <span class="k">owner:</span>&nbsp;<span>${m.owner}</span>
      <span class="k">role:</span>&nbsp;<span>${m.role}</span>
      <span class="k">base:</span>&nbsp;<span>${m.base}</span>
      <span class="k">updated:</span>&nbsp;<span>${m.updated}</span>
    </div>
    <h1 class="title rise d2">${COPY.title[0]}<br>${COPY.title[1]}<span class="draw"></span></h1>
    <p class="thesis rise d3">${COPY.thesis}</p>
    <div class="status-row rise d4">
      <span class="pill hot"><span class="led"></span>Status:&nbsp;<span id="statusVal" class="statusval">${COPY.statusFrom}</span></span>
      <span class="pill"><span class="led"></span>Reviewers: 3 approved</span>
      <span class="pill"><span class="led"></span>Confidence: high</span>
    </div>`;
  // wrap <u> in title with gradient class
  c.querySelectorAll(".title u").forEach(u => u.classList.add("u"));
}
function initTheme() {
  const btn = document.getElementById("themeBtn"), icon = document.getElementById("themeIcon"), lbl = document.getElementById("themeLbl");
  const sysDark = () => matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = () => { const t = root.getAttribute("data-theme"); return t ? t === "dark" : sysDark(); };
  const paint = () => { const d = isDark(); icon.textContent = d ? "☾" : "☀"; lbl.textContent = d ? "dark" : "light"; };
  paint();
  btn.addEventListener("click", () => { root.setAttribute("data-theme", isDark() ? "light" : "dark"); paint(); });
}
function initStatus() {
  const sv = document.getElementById("statusVal");
  if (reduce) { sv.textContent = COPY.statusTo; return; }
  setTimeout(() => { sv.classList.add("swap"); setTimeout(() => { sv.textContent = COPY.statusTo; sv.classList.remove("swap"); }, 240); }, 1000);
}
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href")); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  }));
}
document.addEventListener("DOMContentLoaded", boot);
```

- [ ] **Step 2: Serve and verify cover renders + status flips.**

```bash
~/.claude/skills/gstack/browse/dist/browse goto http://localhost:3000/
~/.claude/skills/gstack/browse/dist/browse js "new Promise(r=>setTimeout(()=>r(document.getElementById('statusVal').textContent),1500))"
```
Expected: prints `Open to 2027 grad roles`. Also `~/.claude/skills/gstack/browse/dist/browse js "document.querySelector('#cover .title').textContent"` contains "Snigdha builds".

- [ ] **Step 3: Commit**

```bash
git add prd.js
git commit -m "feat: prd.js core — cover render, theme toggle, status flip, smooth scroll"
```

---

### Task 5: Metrics render + count-up

**Files:**
- Modify: `prd.js` (add metrics rendering + IntersectionObserver counters)

**Interfaces:**
- Consumes: `METRICS` from `prd.data.js`, `el()` from Task 4.
- Produces: `.metric` tiles inside `#metricMount`.

- [ ] **Step 1: Add to `prd.js`** (import `METRICS`, call `renderMetrics()` in `boot()`):

```js
import { COPY, METRICS } from "./prd.data.js";
// …in boot(): renderMetrics();
function renderMetrics() {
  const mount = document.getElementById("metricMount");
  METRICS.forEach((m, i) => {
    const tile = el("div", `metric rise d${(i % 5) + 1} ${m.kind === "eng" ? "eng" : ""}`);
    tile.innerHTML = `<div class="v" data-to="${m.value}" data-prefix="${m.prefix||""}" data-suffix="${m.suffix||""}">0</div><div class="l">${m.label.replace(/\n/g,"<br>")}</div>`;
    mount.appendChild(tile);
  });
  const seen = new WeakSet();
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && !seen.has(en.target)) { seen.add(en.target); countUp(en.target); } }), { threshold: 0.6 });
  mount.querySelectorAll(".v").forEach(v => io.observe(v));
}
function countUp(elm) {
  const to = +elm.dataset.to, pre = elm.dataset.prefix || "", suf = elm.dataset.suffix || "";
  if (reduce) { elm.textContent = pre + to.toLocaleString() + suf; return; }
  let start = null; const dur = 1300;
  const step = ts => { if (!start) start = ts; const p = Math.min((ts - start) / dur, 1); const e = 1 - Math.pow(1 - p, 3); elm.textContent = pre + Math.round(to * e).toLocaleString() + suf; if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
```

- [ ] **Step 2: Serve and verify 6 tiles render and count to final values.**

```bash
~/.claude/skills/gstack/browse/dist/browse goto http://localhost:3000/
~/.claude/skills/gstack/browse/dist/browse js "document.querySelector('#metricMount').scrollIntoView(); 'ok'"
~/.claude/skills/gstack/browse/dist/browse js "new Promise(r=>setTimeout(()=>r(document.querySelectorAll('.metric').length + ' | ' + document.querySelector('.metric .v').textContent),1600))"
```
Expected: prints `6 | 9,500+` (impact tile settled). Engineering tiles have `.metric.eng`.

- [ ] **Step 3: Commit**

```bash
git add prd.js
git commit -m "feat: metrics strip with impact + engineering tiles and count-up"
```

---

### Task 6: Decision Room engine + "How it's built"

**Files:**
- Modify: `prd.js` (add project card render + decision interaction + built toggle)

**Interfaces:**
- Consumes: `PROJECTS` from `prd.data.js`, `el()`.
- Produces: `.ship` cards inside `#projectMounts`, each with a working decision room and a build-notes expander.

- [ ] **Step 1: Add to `prd.js`** (import `PROJECTS`, call `renderProjects()` in `boot()`):

```js
import { COPY, METRICS, PROJECTS } from "./prd.data.js";
// …in boot(): renderProjects();
function renderProjects() {
  const mount = document.getElementById("projectMounts");
  PROJECTS.forEach((p, i) => {
    const d = p.decision;
    const card = el("section", "ship rise d2");
    card.innerHTML = `
      <div class="ship-head"><div>
        <div class="idx">SHIP 0${i + 1} / 0${PROJECTS.length}</div>
        <h2>${p.name}</h2><div class="sub">${p.sub}</div>
      </div><div class="idx">${p.date}</div></div>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="constraint"><span class="lab">CONSTRAINT ▸</span><span>${d.constraint}</span></div>
      <p class="prompt">${d.prompt}</p>
      <p class="prompt-hint">// make the call before you scroll — then see mine</p>
      <div class="choices">${d.options.map(o => `
        <button class="choice" data-opt="${o.id}" ${o.mine ? 'data-mine="1"' : ""}>
          <span class="yours">your call</span><span class="hers">I chose this</span>
          <span class="opt">OPTION ${o.id}</span><span class="txt">${o.text}</span>
          <div class="bar"><i></i></div><div class="pct"></div>
        </button>`).join("")}</div>
      <div class="reveal">
        <div class="verdict"><span class="box">✓</span> DECISION LOGGED · my actual call</div>
        <h3 class="revealHead">${d.verdict.headline}</h3>
        <p>${d.verdict.reasoning}</p>
        <div class="outcome">${d.verdict.badges.map(b => `<span class="badge ${b.win ? "win" : ""}">${b.text}</span>`).join("")}</div>
      </div>
      <button class="built-toggle" aria-expanded="false">▸ How it's built</button>
      <div class="built">${p.built}</div>`;
    wireDecision(card, d);
    wireBuilt(card);
    mount.appendChild(card);
  });
}
function wireDecision(card, d) {
  const choices = card.querySelector(".choices"), reveal = card.querySelector(".reveal"), head = card.querySelector(".revealHead");
  let voted = false;
  choices.querySelectorAll(".choice").forEach(c => c.addEventListener("click", () => {
    if (voted) return; voted = true; choices.classList.add("voted");
    const picked = c.dataset.opt; c.classList.add("picked");
    choices.querySelectorAll(".choice").forEach(ch => {
      const s = d.readerSplit[ch.dataset.opt];
      ch.querySelector(".bar i").style.width = s + "%";
      ch.querySelector(".pct").textContent = s + "% of readers";
    });
    const mine = d.options.find(o => o.mine).id;
    head.textContent = picked === mine ? "Same call I made — " + d.verdict.headline : "I went the other way — " + d.verdict.headline;
    setTimeout(() => reveal.classList.add("open"), 260);
  }));
}
function wireBuilt(card) {
  const btn = card.querySelector(".built-toggle"), panel = card.querySelector(".built");
  btn.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = (open ? "▾" : "▸") + " How it's built";
  });
}
```

- [ ] **Step 2: Serve and verify decision interaction + build toggle.**

```bash
~/.claude/skills/gstack/browse/dist/browse goto http://localhost:3000/
~/.claude/skills/gstack/browse/dist/browse js "document.querySelectorAll('.ship').length"     # expect PROJECTS.length (3)
~/.claude/skills/gstack/browse/dist/browse js "const c=document.querySelector('.ship .choice[data-opt=\"A\"]'); c.click(); new Promise(r=>setTimeout(()=>r(document.querySelector('.ship .reveal').classList.contains('open')),500))"   # expect true
~/.claude/skills/gstack/browse/dist/browse js "const b=document.querySelector('.built-toggle'); b.click(); document.querySelector('.built').classList.contains('open')"   # expect true
```
Expected: `3`, `true`, `true`.

- [ ] **Step 3: Commit**

```bash
git add prd.js
git commit -m "feat: data-driven Decision Room cards + how-it's-built expander"
```

---

### Task 7: Changelog + Appendix render

**Files:**
- Modify: `prd.js` (add changelog + appendix rendering)

**Interfaces:**
- Consumes: `CHANGELOG`, `COPY` from `prd.data.js`, `el()`.
- Produces: `.rel` rows in `#changelogMount`, links in `#appendixMount`.

- [ ] **Step 1: Add to `prd.js`** (import `CHANGELOG`, call `renderChangelog()` + `renderAppendix()` in `boot()`):

```js
import { COPY, METRICS, PROJECTS, CHANGELOG } from "./prd.data.js";
// …in boot(): renderChangelog(); renderAppendix();
function renderChangelog() {
  const mount = document.getElementById("changelogMount");
  CHANGELOG.forEach(c => {
    const row = el("div", `rel rise ${c.upcoming ? "upcoming" : ""}`);
    row.innerHTML = `<div class="ver">${c.ver === "edu" ? "edu" : c.ver}<br><span style="color:var(--faint)">${c.date}</span></div>
      <div><h4>${c.org}</h4><div class="role">${c.role} · ${c.loc}</div><div class="note">${c.note}</div></div>`;
    mount.appendChild(row);
  });
}
function renderAppendix() {
  const mount = document.getElementById("appendixMount");
  const links = [
    { href: COPY.resumeUrl, txt: "↧ Résumé (PDF)" },
    { href: "https://linkedin.com/in/snigdha-tiwari", txt: "in/snigdha-tiwari" },
    { href: "https://github.com/snig-17", txt: "@snig-17" },
    { href: "mailto:snigdha.tiwari.24@ucl.ac.uk", txt: "snigdha.tiwari.24@ucl.ac.uk" },
  ];
  links.forEach(l => { const a = el("a"); a.href = l.href; a.textContent = l.txt; if (l.href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; } mount.appendChild(a); });
}
```

- [ ] **Step 2: Serve and verify.**

```bash
~/.claude/skills/gstack/browse/dist/browse js "document.querySelectorAll('.rel').length + ' | ' + document.querySelectorAll('.appendix a').length"
~/.claude/skills/gstack/browse/dist/browse js "document.querySelector('.rel.upcoming .ver').textContent"
```
Expected: `5 | 4`; upcoming row contains `v2026.3`.

- [ ] **Step 3: Commit**

```bash
git add prd.js
git commit -m "feat: changelog (Cloudflare upcoming) + appendix links"
```

---

### Task 8: Framer Motion scroll-build + hover — `animations.js`

**Files:**
- Rewrite: `animations.js`

**Interfaces:**
- Consumes: `animate, inView, stagger, hover` from `assets/framer-motion.dom.js`; the rendered DOM from `prd.js`.
- Produces: scroll-triggered reveals on `.rise`, `.ship`, `.rel`; hover springs on `.choice`, `.appendix a`, `.built-toggle`.

**Timing note:** `prd.js` renders content on `DOMContentLoaded`; `animations.js` must run *after* that. Guard by running its setup on `window.load` (or a microtask after DOMContentLoaded) so the mounts exist.

- [ ] **Step 1: Rewrite `animations.js`:**

```js
import { animate, inView, hover } from "./assets/framer-motion.dom.js";
const EASE = [0.25, 0.46, 0.45, 0.94];
const SPRING = { type: "spring", stiffness: 300, damping: 22, mass: 0.6 };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function setup() {
  if (reduce) return;
  document.querySelectorAll(".ship, .rel").forEach(elm => {
    elm.style.opacity = "0";
    inView(elm, () => { animate(elm, { opacity: [0, 1], y: [40, 0] }, { duration: 0.7, ease: EASE }); }, { amount: 0.2 });
  });
  hover(".choice", (e) => { animate(e, { y: -3 }, SPRING); return () => animate(e, { y: 0 }, SPRING); });
  hover(".appendix a", (e) => { animate(e, { y: -2 }, SPRING); return () => animate(e, { y: 0 }, SPRING); });
}
window.addEventListener("load", setup);
```

- [ ] **Step 2: Serve and verify reveals fire and no console errors.**

```bash
~/.claude/skills/gstack/browse/dist/browse goto http://localhost:3000/
~/.claude/skills/gstack/browse/dist/browse console --errors
~/.claude/skills/gstack/browse/dist/browse js "document.querySelector('.ship').scrollIntoView(); new Promise(r=>setTimeout(()=>r(getComputedStyle(document.querySelector('.ship')).opacity),900))"
```
Expected: `(no console errors)`; opacity `1` after scroll.

- [ ] **Step 3: Commit**

```bash
git add animations.js
git commit -m "feat: Framer Motion scroll-build reveals + hover springs for PRD layout"
```

---

### Task 9: Photography as figures

**Files:**
- Modify: `prd.data.js` (add `figure` fields), `prd.js` (render figures), uses existing `assets/*.jpeg`.

**Interfaces:**
- Consumes: photo mapping from Snigdha (which image → cover + which sections).
- Produces: `<figure class="figure">` blocks after chosen sections.

- [ ] **Step 1: Add a `FIGURES` export to `prd.data.js`** mapping section id → `{ src, caption }` using the real photos in `assets/` (Snigdha confirms mapping in Task 1):

```js
export const FIGURES = [
  { after: "context", src: "assets/8C911BC3-FE84-4AC2-B462-EFB439B15FAA_1_105_c.jpeg", caption: "Fig 1 — Aerial, shot by S. Tiwari" },
  // …one or two more, per Snigdha's mapping
];
```

- [ ] **Step 2: Render figures in `prd.js`** (import `FIGURES`, call in `boot()`):

```js
import { COPY, METRICS, PROJECTS, CHANGELOG, FIGURES } from "./prd.data.js";
// …in boot(): renderFigures();
function renderFigures() {
  FIGURES.forEach(f => {
    const sec = document.getElementById(f.after); if (!sec) return;
    const fig = el("figure", "figure rise");
    fig.innerHTML = `<img src="${f.src}" alt="${f.caption}" loading="lazy"><figcaption>${f.caption}</figcaption>`;
    sec.after(fig);
  });
}
```

- [ ] **Step 3: Serve and verify figures load (200, non-zero size).**

```bash
~/.claude/skills/gstack/browse/dist/browse js "[...document.querySelectorAll('.figure img')].map(i=>i.naturalWidth>0)"
```
Expected: array of `true`.

- [ ] **Step 4: Commit**

```bash
git add prd.data.js prd.js
git commit -m "feat: photography as captioned section figures"
```

---

### Task 10: Accessibility, responsive, reduced-motion pass

**Files:**
- Modify: `prd.css`, `prd.js` as needed from findings.

- [ ] **Step 1: Reduced motion** — verify with the flag on, content is fully visible and static.

```bash
~/.claude/skills/gstack/browse/dist/browse js "matchMedia('(prefers-reduced-motion: reduce)').matches"   # environment may vary
```
Manual: in Safari, System Settings → Accessibility → Reduce Motion ON, reload; confirm all sections visible, counters show final values, decision room still clickable.

- [ ] **Step 2: Keyboard** — Tab through the page; confirm theme toggle, every `.choice`, `.built-toggle`, and appendix links show a visible focus ring and activate on Enter/Space. Fix any missing `:focus-visible` in `prd.css`.

- [ ] **Step 3: Responsive** — capture mobile/tablet/desktop and confirm no horizontal scroll.

```bash
~/.claude/skills/gstack/browse/dist/browse responsive /private/tmp/prd-responsive
```
Then Read the three PNGs; confirm `.choices` and `.metrics` collapse per the `@media (max-width:560px)` rules and body never scrolls sideways.

- [ ] **Step 4: Contrast in both themes** — toggle dark; confirm muted text and pills remain legible on the dark ground.

- [ ] **Step 5: Commit**

```bash
git add prd.css prd.js
git commit -m "a11y: focus states, reduced-motion, responsive fixes"
```

---

### Task 11: Cloudflare-Pages-ready + final verification

**Files:**
- Modify: repo root (remove GitHub-Pages-specific assumptions), `index.html` head (`<title>`, meta description).

- [ ] **Step 1: Update `<title>` and meta description** to the new positioning (no target company): e.g. `Snigdha Tiwari — product-minded engineer`.

- [ ] **Step 2: Confirm the site is fully static and path-relative** — all asset/script links are relative (they are: `prd.css`, `prd.js`, `assets/…`). Cloudflare Pages serves the repo root as-is; keep `.nojekyll` (harmless) but do not depend on Jekyll behavior.

- [ ] **Step 3: Remove the concept scaffold and superseded files from the page's path** — delete `concept-prd.html`; leave `style.css`/`script.js` only if still referenced (they are not) else `git rm` them.

```bash
git rm concept-prd.html style.css script.js
```

- [ ] **Step 4: Full-page verification** — no console errors, all sections present, decision room + counters + theme + reveals all work.

```bash
~/.claude/skills/gstack/browse/dist/browse goto http://localhost:3000/
~/.claude/skills/gstack/browse/dist/browse console --errors
~/.claude/skills/gstack/browse/dist/browse js "document.querySelectorAll('section').length"   # 8
```
Expected: `(no console errors)`, `8`.

- [ ] **Step 5: Capture a final full-page screenshot** for the record and Read it to confirm visual integrity in both themes.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "chore: finalize PRD portfolio, Cloudflare-Pages-ready"
```

Then: Snigdha connects the repo to Cloudflare Pages (build command: none; output dir: `/`).

---

## Self-Review

**Spec coverage:** Cover (T3/T4), Problem/Context/Roadmap (T3/T4), Shipped + Decision Room (T6), "How it's built" FDE/SWE hook (T6), Metrics impact+eng (T5), Changelog with Cloudflare upcoming (T7), Appendix (T7), design system + spec chrome + both themes (T2), Framer Motion motion + reduced-motion (T8/T10), photography as figures (T9), Cloudflare-Pages-ready (T11), open content inputs gathered (T1). All spec sections mapped.

**Placeholder scan:** The only intentional "gather" markers are in Task 1 (real decision stories, copy, résumé, photo mapping, two eng figures) — these are content inputs from Snigdha by design, and every downstream task renders from the resulting data file with real code. No code placeholders remain.

**Type consistency:** `el(tag, cls, html)` defined in T4, reused T5–T9. Data keys (`PROJECTS/METRICS/CHANGELOG/COPY/FIGURES`) consistent between `prd.data.js` and every consumer. Class names in `prd.css` (T2) match those emitted by `prd.js` render functions and the `index.html` skeleton.
