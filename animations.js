// Framer Motion (vanilla DOM API) — scroll-triggered fades, staggered
// reveals, and smooth hover transitions. Self-hosted, pinned to the
// framer-motion@12.42.2 build installed via npm.
import {
  animate,
  inView,
  stagger,
  hover,
} from "./assets/framer-motion.dom.js";

const EASE = [0.25, 0.46, 0.45, 0.94]; // matches the site's CSS cubic-bezier
const SPRING = { type: "spring", stiffness: 300, damping: 22, mass: 0.6 };

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

document.addEventListener("DOMContentLoaded", () => {
  // Accessibility: skip motion entirely, but hide nothing.
  if (reduceMotion) return;

  const hide = (el, y = 24) => {
    el.style.opacity = "0";
    el.style.willChange = "transform, opacity";
  };

  // 1. Scroll-triggered fade — About section paragraph.
  document.querySelectorAll(".section-text").forEach((el) => {
    hide(el);
    inView(
      el,
      () => {
        animate(
          el,
          { opacity: [0, 1], y: [30, 0] },
          { duration: 0.9, ease: EASE }
        );
      },
      { amount: 0.3 }
    );
  });

  // 2. Staggered reveal — project glass cards.
  const cards = document.querySelectorAll(".glass-card");
  cards.forEach((c) => hide(c));
  const grid = document.querySelector(".glass-grid");
  if (grid && cards.length) {
    inView(
      grid,
      () => {
        animate(
          cards,
          { opacity: [0, 1], y: [50, 0], scale: [0.96, 1] },
          { duration: 0.6, delay: stagger(0.12), ease: "easeOut" }
        );
      },
      { amount: 0.1 }
    );
  }

  // 3. Staggered reveal — social/contact cards.
  const socials = document.querySelectorAll(".social-card");
  socials.forEach((c) => hide(c));
  const socialWrap = document.querySelector(".social-links");
  if (socialWrap && socials.length) {
    inView(
      socialWrap,
      () => {
        animate(
          socials,
          { opacity: [0, 1], y: [40, 0] },
          { duration: 0.6, delay: stagger(0.15), ease: "easeOut" }
        );
      },
      { amount: 0.2 }
    );
  }

  // 4. Scroll-triggered reveal — experience timeline items (each fires as it
  //    enters, giving a natural stagger as you scroll the timeline).
  document.querySelectorAll(".timeline-item").forEach((item) => {
    // CSS sets these to opacity:0 / translateY(50px) by default.
    inView(
      item,
      () => {
        animate(
          item,
          { opacity: [0, 1], y: [50, 0] },
          { duration: 0.8, ease: EASE }
        );
      },
      { amount: 0.25 }
    );
  });

  // 5. Smooth hover transitions on interactive elements. Framer Motion drives
  //    transform via a spring; the CSS :hover rules still handle the glass
  //    background/shadow shift, so the two compose.
  const lift = (selector, { y, scale }) =>
    hover(selector, (element) => {
      animate(element, { y, scale }, SPRING);
      return () => animate(element, { y: 0, scale: 1 }, SPRING);
    });

  lift(".glass-card", { y: -12, scale: 1.02 });
  lift(".social-card", { y: -10, scale: 1.05 });

  hover(".nav-link", (element) => {
    animate(element, { scale: 1.08 }, SPRING);
    return () => animate(element, { scale: 1 }, SPRING);
  });

  hover(".card-link", (element) => {
    animate(element, { scale: 1.06 }, SPRING);
    return () => animate(element, { scale: 1 }, SPRING);
  });
});
