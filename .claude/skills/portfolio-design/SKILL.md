---
name: portfolio-design
description: Design system for Snigdha Tiwari's portfolio — a flat editorial "ink-on-paper spec". Hairline rules, disciplined grid, one deliberate editorial-red accent, Bricolage Grotesque + Newsreader + JetBrains Mono. Read this BEFORE building or restyling any UI so components stay consistent and DON'T drift back to the old glassy/AI look.
---

# Portfolio Design System — Editorial Spec

The portfolio is a **flat, editorial, ink-on-paper technical spec**. It should read like a beautifully typeset document (annual report / redlined PRD), not a glowing SaaS page. This system deliberately **replaced** an earlier glass-morphism version that read as AI-generated — do not reintroduce those patterns (see §7).

Tokens live in `:root` at the top of `prd.css`. Prefer the CSS variables over raw values. All colors below are WCAG-AA verified on their ground.

---

## 1. Color tokens

Flat. No gradients, no blur, no glow. One accent: **editorial red** (the "redline markup on a reviewed spec" idea). Used sparingly.

**Light (default):**
| Token | Value | Role |
|-------|-------|------|
| `--paper` | `#FAFAF8` | warm near-white ground |
| `--paper-2` | `#F1EFE9` | subtle raised fill (hover) |
| `--ink` | `#1A1815` | headings, primary |
| `--ink-2` | `#46433D` | body text |
| `--muted` | `#6B675F` | labels, captions |
| `--faint` | `#767268` | quietest text (still AA: 4.6:1) |
| `--rule` | `rgba(26,24,21,0.16)` | hairlines |
| `--rule-strong` | `rgba(26,24,21,0.32)` | borders |
| `--accent` | `#C6362A` | editorial red (5.1:1) |
| `--accent-soft` | `rgba(198,54,42,0.09)` | red tint fills |
| `--ok` | `#3B7A4B` | verdict/success |

**Dark:** `--paper #151412` · `--ink #ECEAE3` · `--ink-2 #B8B4AB` · `--muted #928D82` · `--faint #847F74` · `--accent #E5604D` (5.4:1) · `--ok #6BAF7A`. Defined at token level under `@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]` / `[data-theme="light"]`. Both themes get equal care; `color-scheme` is set per theme.

**Accent discipline:** red appears on the `think` word, §-numerals, the `CONSTRAINT` label, the author's-pick marker, `upcoming` tags, links-on-hover, and the win badge. Everything else is ink-on-paper. Do not spread it.

---

## 2. Typography

Three roles, three families. No Playfair, no Poppins, no Inter, no system-ui-as-display.

| Variable | Family | Use for |
|----------|--------|---------|
| `--display` | **Bricolage Grotesque** (700–800) | headlines, project names, §-numerals, metric numbers, prompts, verdicts, roadmap — the loud voice |
| `--body` | **Newsreader** (serif, 400–500) | running prose: thesis, problem/context, decision reasoning, notes — gives the document feel |
| `--mono` | **JetBrains Mono** | all spec chrome: metadata, labels, tags, constraints, section labels, dates, badges |

Rules:
- **Scale contrast is the energy.** Display goes big and tight (headline up to ~6.6rem, weight 800, `letter-spacing: -0.03em`, `line-height: ~0.9`). Don't make everything mid-sized — the drama is in the jump between huge display and calm serif body.
- **Body is a serif**, ~18px, `line-height: 1.6`, measure ≤ ~62ch. Reads like an article.
- **Mono is uppercase** for labels/chrome with `letter-spacing: ~0.05em`. Tabular-nums on figures.
- Emphasis in prose: `em` → a red-tint highlight (`box-shadow: inset 0 -0.5em 0 var(--accent-soft)`), not italic.

---

## 3. Layout & structure

- **Flat on paper.** No cards floating on blur. Blocks are separated by whitespace and **hairline rules** (`1px solid var(--rule)`), the core editorial device.
- **Disciplined single column**, `--maxw: 820px`, generous margins. Rhythm varies by section (huge cover, dense decision blocks, bold data band, sparse roadmap) — not uniform.
- **Sharp radius.** Blocks `3px`, tags/chips `2px`. **Never** the old bubbly 20px / 999px pills.
- **Section headers:** giant red `§N` display numeral + small mono label, over a heavy ink rule (`border-bottom: 2px solid var(--ink)`). This is the signature wayfinding device.
- **8px-ish spacing rhythm**, but editorial whitespace is generous — sections breathe (`margin: ~76px` between).

---

## 4. Component patterns

- **Chips/tags/status:** bordered rectangles (`1px var(--rule)`/`--rule-strong`, radius 2px), mono uppercase, no fill. A tiny rotated-square (`◆`) marker, not a round dot.
- **Constraint callout:** red left-border + `--accent-soft` tint + mono. The "redline" moment.
- **Decision choices:** a bordered grid of cells split by a hairline (not separate rounded cards). Author's pick = `--accent-soft` fill + red `I CHOSE THIS` chip. Reader-split bars are 2px rules.
- **Metrics = a ruled data band:** `repeat(3,1fr)` grid with hairline cell dividers, big display numbers (engineering figures in red), mono labels. No card fills.
- **Changelog = ruled release history:** `120px` mono version column + serif content, hairline row separators. `upcoming` appends a red `· upcoming`.
- **Figures:** hairline border, mono caption over a top rule, minimal radius.
- **Buttons/links:** border + color shift to red on hover/focus. Visible `:focus-visible` (2px red outline) on every interactive element.

---

## 5. Motion

Restrained. Purpose over flourish.
- **Subtle scroll reveals** (`.rise` fade+rise; `.ship`/`.rel` via Framer Motion `inView`). Framer Motion vanilla-DOM API only, self-hosted at `assets/framer-motion.dom.js` — see `[[framer-motion-vanilla]]`.
- **Spec-boot loader** (`fx.js`): a mono terminal sequence on flat paper, then a fade. On-concept.
- **Scroll-progress rule:** a thin solid red line at the top.
- **No** particle/network canvas, **no** 3D card tilt, **no** gradient sweeps — those were removed as flashy tells.
- Full `prefers-reduced-motion` support: skip motion, hide nothing (content is visible without JS/motion).

---

## 6. Voice / copy

Truthful spec language. No fabricated credentials (an earlier "Reviewers: 3 approved" pill was cut for reading as fake). No happy-talk. Mono metadata states facts (`OWNER:`, `STATUS: Open to 2027 grad roles`, `FORMAT: living spec`). Active voice.

---

## 7. Do NOT reintroduce (the old AI look)

This system exists *because* the previous one read as AI-generated. Never bring back:
- ❌ Glass morphism / `backdrop-filter: blur` panels
- ❌ Blue→indigo→purple→pink gradient accents (or gradient text)
- ❌ Particle / constellation / floating-dots backgrounds
- ❌ Radial mesh-gradient blobs behind content
- ❌ Uniform bubbly radius (20px cards, 999px pills)
- ❌ Playfair Display, Poppins, Inter, or system-ui as display/body
- ❌ Drop-shadow "elevation" stacks on flat content

**Do** lead with: flat paper, hairline rules, big grotesque display against calm serif body, one deliberate red accent, and scale contrast for energy. Related: `[[framer-motion-vanilla]]`, `[[portfolio-redesign-direction]]`.
