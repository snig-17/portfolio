import { COPY, METRICS } from "./prd.data.js";
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
