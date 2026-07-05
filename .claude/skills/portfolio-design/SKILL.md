---
name: portfolio-design
description: Design system for Snigdha Tiwari's portfolio — glass morphism over iOS-gradient palette, Playfair/Poppins type, 8px spacing grid, Framer Motion motion. Read this BEFORE building or restyling any UI (sections, cards, buttons, forms) so components stay consistent instead of drifting to generic defaults.
---

# Portfolio Design System

This is a **glass-morphism** portfolio: frosted translucent surfaces floating over
full-bleed personal photography, tinted with an iOS gradient accent palette. Every
new component must read as part of this system, not a bolted-on default.

Tokens live in `:root` at the top of `style.css`. Prefer the CSS variables below over
raw values. Never invent new hex codes, blur radii, or radii — reuse these.

---

## 1. Color tokens

**iOS accent gradient palette** (use for gradients, hovers, active states, dots — never large flat fills):

| Token | Hex | Role |
|-------|-----|------|
| Blue | `#007AFF` | primary accent, links, focus |
| Indigo | `#5856D6` | gradient mid-stop |
| Purple | `#AF52DE` | gradient stop |
| Pink | `#FF2D92` | active / hot accent |
| Orange | `#FF6B35` | active / warm accent |

Accent gradients run diagonally: `linear-gradient(135deg, #FF2D92 0%, #FF6B35 100%)`
for active states, or blue→purple for calmer ones.

**Glass surface scale** — translucent white over photography. Pick opacity by elevation:

| Use | Value |
|-----|-------|
| Resting card / panel | `rgba(255,255,255,0.15)` |
| Hover / raised card | `rgba(255,255,255,0.22)` |
| Border (resting) | `rgba(255,255,255,0.20)` |
| Border (hover) | `rgba(255,255,255,0.30)` |
| Inner top highlight | `inset 0 1px 0 rgba(255,255,255,0.3)` |

**Text** — this is a dark-photo theme, so text is white:
- `--text-primary: #ffffff` for everything on glass/photo.
- `--text-shadow: none` (the blur backing gives contrast; don't add drop shadows).
- Never use dark body text on the photo backgrounds.

---

## 2. Typography

Three families, already loaded via Google Fonts. Use the variables, not literal names.

| Variable | Family | Use for |
|----------|--------|---------|
| `--font-serif` | Playfair Display | Display headings, card titles, section headers — the editorial voice |
| `--font-sans` / `--font-display` | Poppins | Body copy, UI labels, buttons, nav |
| `--font-mono` | Fira Code | Timestamps, code, tech tags, anything "data" |

Rules:
- **Headings** → `--font-serif`, weight 500–700. Use `clamp()` for fluid sizing (e.g. `clamp(1.3rem, 3vw, 1.8rem)`), matching `.about-section .section-text`.
- **Body** → `--font-sans`, weight 300–400, `line-height: 1.8` for long text.
- **Metadata / tags** → `--font-mono`.
- Don't introduce a fourth typeface or use system-ui.

---

## 3. Spacing — 8px grid

Base unit is **8px**. Compose spacing from the scale; the existing layout leans on the
starred values, so prefer those when matching surrounding code:

`4 · 8 · 12 · 16 · 20★ · 24 · 30★ · 40★ · 60 · 80★ · 100`

- Card inner padding: `30px`. Grid gaps: `30px`. Section rhythm: `80px`.
- When in doubt, round to the nearest multiple of 8 rather than picking an arbitrary value.

---

## 4. The glass component recipe

Every card / panel / floating surface is built from this exact recipe. Copy it; don't
approximate:

```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);   /* always pair for Safari */
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 20px;
box-shadow:
  0 8px 32px rgba(0, 0, 0, 0.15),
  0 4px 16px rgba(0, 0, 0, 0.1),
  inset 0 1px 0 rgba(255, 255, 255, 0.3);  /* top highlight = the "glass" tell */
overflow: hidden;
position: relative;
```

**Blur scale:** `20px` for primary cards, `10px` for nav / smaller chrome. Don't go
above 20px (perf + it stops reading as glass).

**Radius scale:** `20px` cards · `12–16px` inner elements · `50%` dots/avatars. No sharp
0px corners on surfaces.

**Elevation on hover:** raise the surface (`translateY(-10px) scale(1.02)`), bump bg to
`0.22`, border to `0.30`, and deepen the shadow. See `.glass-card:hover`.

---

## 5. Motion — Framer Motion (vanilla DOM API)

All JS-driven animation goes through Framer Motion's vanilla API, self-hosted at
`assets/framer-motion.dom.js` and wired in `animations.js`. Do **not** add React or a
second animation library, and don't re-implement reveals with raw IntersectionObserver
(that job now belongs to `animations.js`).

- **Scroll reveals** → `inView(el, () => animate(el, { opacity:[0,1], y:[..,0] }, { ease: EASE }))`.
- **Staggered groups** → `animate(nodes, {...}, { delay: stagger(0.12) })`.
- **Hover** → `hover(sel, el => { animate(el, {y,scale}, SPRING); return () => animate(el,{y:0,scale:1}, SPRING) })`.
- **Shared constants:** `EASE = [0.25, 0.46, 0.45, 0.94]` (matches the CSS cubic-bezier);
  `SPRING = { type:"spring", stiffness:300, damping:22, mass:0.6 }`.
- CSS transitions use `--transition-smooth: 0.8s cubic-bezier(0.25,0.46,0.45,0.94)` — keep
  new CSS transitions on that same curve so motion feels uniform.
- Always guard with `prefers-reduced-motion` (skip motion, hide nothing).

---

## 6. Avoid the generic AI aesthetic

This site has a specific point of view. When adding UI, do **not** default to:

- ❌ Flat opaque cards with a hard 1px gray border and no blur — everything floating is glass.
- ❌ Purple-on-white SaaS gradients, or the default Tailwind indigo. Use the iOS palette above.
- ❌ System-ui / Inter for headings — headings are **Playfair Display**.
- ❌ Dark text on the photo backgrounds, or adding text-shadows to compensate.
- ❌ Uniform 16px everything — use the 8px scale with the section rhythm (30/80).
- ❌ Bouncy overshoot easing or 300ms "pop" everywhere — motion is slow and smooth (0.6–0.9s, the shared cubic-bezier / gentle spring).
- ❌ Sharp 0-radius corners on surfaces, or drop-shadowed icons.

**Do** lead with: full-bleed photography, frosted glass panels, the inset top highlight,
editorial serif headings, and calm scroll-triggered reveals.
