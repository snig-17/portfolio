// fx.js — effects layer: spec-boot loader, ambient network canvas, scroll rail, 3D card tilt.
// All effects are performance-conscious (capped nodes, offscreen pause, rAF-throttled)
// and fully disabled under prefers-reduced-motion.
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const accentOf = () =>
  getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#007AFF";

/* ---------------- spec-boot loading screen ---------------- */
function bootLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  const close = () => {
    loader.classList.add("done");
    setTimeout(() => loader.remove(), 650);
  };
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
  // safety: never trap the user behind the loader
  setTimeout(() => { if (document.body.contains(loader)) close(); }, 4500);
}

/* ---------------- ambient network canvas ---------------- */
function networkCanvas() {
  const canvas = document.getElementById("netbg");
  if (!canvas) return;
  if (reduce) { canvas.style.display = "none"; return; }
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, DPR = Math.min(devicePixelRatio || 1, 2);
  const nodes = [];
  const mouse = { x: -9999, y: -9999 };
  let raf = null, running = true;

  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function seed() {
    nodes.length = 0;
    const count = Math.max(24, Math.min(72, Math.floor((W * H) / 15000)));
    for (let k = 0; k < count; k++) {
      nodes.push({
        x: Math.random() * W, y: Math.random() * H, z: Math.random(),
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
      });
    }
  }
  function draw() {
    const accent = accentOf();
    const ox = (mouse.x - W / 2) * 0.012, oy = (mouse.y - H / 2) * 0.012;
    ctx.clearRect(0, 0, W, H);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }
    for (let a = 0; a < nodes.length; a++) {
      const na = nodes[a];
      for (let b = a + 1; b < nodes.length; b++) {
        const nb = nodes[b];
        const dx = na.x - nb.x, dy = na.y - nb.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 132) {
          const depth = (na.z + nb.z) / 2;
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - dist / 132) * 0.16 * (0.4 + depth * 0.6);
          ctx.lineWidth = 0.6 * (0.5 + depth);
          ctx.beginPath();
          ctx.moveTo(na.x + ox * na.z, na.y + oy * na.z);
          ctx.lineTo(nb.x + ox * nb.z, nb.y + oy * nb.z);
          ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.globalAlpha = 0.22 + n.z * 0.5;
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(n.x + ox * n.z, n.y + oy * n.z, 0.8 + n.z * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (running) raf = requestAnimationFrame(draw);
  }
  function start() { if (!raf) { running = true; raf = requestAnimationFrame(draw); } }
  function stop() { running = false; if (raf) { cancelAnimationFrame(raf); raf = null; } }

  resize(); seed(); start();
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  addEventListener("resize", () => { DPR = Math.min(devicePixelRatio || 1, 2); resize(); seed(); }, { passive: true });
  // pause the animation once the hero has scrolled out of view (perf)
  const cover = document.getElementById("cover");
  if (cover && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 }).observe(cover);
  }
}

/* ---------------- scroll-progress rail ---------------- */
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

/* ---------------- 3D tilt on decision cards ---------------- */
function cardTilt() {
  if (reduce) return;
  document.querySelectorAll(".ship").forEach((card) => {
    let rid = 0;
    card.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(rid);
      rid = requestAnimationFrame(() => {
        card.style.transform =
          `perspective(1000px) rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg) translateY(-2px)`;
      });
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

// Loader + canvas can start as soon as this module runs — they don't need prd.js's
// rendered content. Tilt + rail wait for `load`, by which point prd.js has rendered the
// .ship cards and the final page height is known.
bootLoader();
networkCanvas();
addEventListener("load", () => { scrollRail(); cardTilt(); });
