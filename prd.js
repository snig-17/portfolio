import { COPY, METRICS, PROJECTS, CHANGELOG, FIGURES } from "./prd.data.js";
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
  renderMetrics();
  renderProjects();
  renderChangelog();
  renderAppendix();
  renderFigures();
  requestAnimationFrame(() => document.body.classList.add("in"));
}
function renderFigures() {
  FIGURES.forEach(f => {
    const sec = document.getElementById(f.after);
    if (!sec) return;
    const fig = el("figure", "figure rise");
    fig.innerHTML = `<img src="${f.src}" alt="${f.caption}" loading="lazy"><figcaption>${f.caption}</figcaption>`;
    sec.after(fig);
  });
}
function renderProjects() {
  const mount = document.getElementById("projectMounts");
  PROJECTS.forEach((p, i) => {
    const d = p.decision;
    const card = el("section", "ship");
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
      if (ch.dataset.mine) ch.classList.add("mine");
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
function renderChangelog() {
  const mount = document.getElementById("changelogMount");
  CHANGELOG.forEach(c => {
    const row = el("div", `rel ${c.upcoming ? "upcoming" : ""}`);
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
      <span class="pill"><span class="led"></span>Format: living spec</span>
      <span class="pill"><span class="led"></span>Last review: Jul 2026</span>
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
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href")); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  }));
}
document.addEventListener("DOMContentLoaded", boot);
