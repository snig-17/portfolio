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
