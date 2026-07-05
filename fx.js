// fx.js — spec-boot loader + scroll-progress rule. Editorial restraint:
// no particles, no 3D tilt. Fully disabled under prefers-reduced-motion.
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function bootLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  const close = () => { loader.classList.add("done"); setTimeout(() => loader.remove(), 550); };
  if (reduce) { close(); return; }
  const log = loader.querySelector(".bootlog");
  const lines = [
    { t: "> init PRD-2026-STIWARI", d: 250 },
    { t: "> loading modules ████████ 100%", d: 360 },
    { t: "> compiling decisions… <span class='ok'>ok</span>", d: 320 },
    { t: "> render <span class='accent'>ready ▸</span>", d: 300 },
  ];
  let i = 0;
  (function next() {
    if (i >= lines.length) { setTimeout(close, 340); return; }
    log.innerHTML += (i ? "\n" : "") + lines[i].t;
    setTimeout(next, lines[i++].d);
  })();
  setTimeout(() => { if (document.body.contains(loader)) close(); }, 4500);
}

function scrollRail() {
  const bar = document.querySelector("#scrollrail i");
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update, { passive: true });
  update();
}

bootLoader();
addEventListener("load", scrollRail);
