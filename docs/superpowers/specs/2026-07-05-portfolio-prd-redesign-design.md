# Design Spec — Portfolio Redesign: "The Animated PRD"

- **Date:** 2026-07-05
- **Owner:** Snigdha Tiwari
- **Status:** Approved → ready for implementation plan

### Review decisions (2026-07-05)

1. Metrics strip **balances impact + engineering** proof points (not impact-only).
2. Incoming Cloudflare role **kept**, framed as the upcoming/next release in the changelog.
3. **One** signature interaction (Decision Room). Graph-hero stays parked.
4. Hosting: this build **prepares the repo**; Snigdha connects it to Cloudflare Pages herself.
5. `v2026.1` version stamp confirmed.
- **Supersedes:** current glass-morphism portfolio (kept as source; this is a rebuild of content + interaction, same stack)

---

## 1. Goal & positioning

Rebuild the portfolio as a **living product spec** — a page that presents Snigdha as "the product," structured and styled like a real PRD, that **writes itself as you scroll** and lets the reader *experience* her product judgement through interactive Decision Rooms.

**Positioning:** *product-minded engineer.* No single company or role is named. The PRD framing + Decision Rooms carry the **PM** signal; the real stacks, shipped systems, and "How it's built" notes carry the **FDE / SWE** signal. The same page must land for all three.

**Status line on the page:** `Open to 2027 grad roles` (graduates UCL, July 2027).

## 2. Audience & success criteria

- **Primary audience:** PM / APM recruiters and hiring managers (grad 2027 cycle).
- **Secondary audience:** Forward-deployed engineer and SWE screeners.
- **Success:** in ~30 seconds a reader concludes "this person has product judgement *and* ships real things." The Decision Room is the moment they remember and share.

Non-goals: being the flashiest site; winning on visual novelty alone. Cleverness must always serve the "shows how she thinks / what she ships" read.

## 3. The concept

Two ideas fused:
- **Portfolio-as-PRD** — information architecture and chrome of a product spec (version stamp, status pills, `§` sections, metadata, changelog, roadmap).
- **The Decision Room** — the signature interaction. Each shipped project presents a **real fork** Snigdha faced; the reader makes the call, sees the reader split, then her *actual* decision, reasoning, and outcome.

"Animated" is the connective tissue: sections assemble on scroll, underlines draw, status pills flip `Draft → Open`, metrics count up, decision reveals choreograph.

## 4. Information architecture (single page, scroll-driven)

1. **Cover / TL;DR** — spec header assembles: title (`Snigdha builds products that think`), version `v2026.1`, metadata (owner/role/base/updated), status pills, one-line thesis. The 30-second hook.
2. **§1 Problem** — thesis: what she builds and why (AI products at tech × policy × ethics).
3. **§2 Context** — the throughline connecting a fintech app, a tutoring AI, and network research; UCL CS + Economics.
4. **§3 Shipped · Decision Log** ← **the heart.** One spec entry per flagship project, each with a **Decision Room** and real stack tags:
   - **Gemma** — AI tutoring, Gemini API + Cloud TTS (2nd place + Best Use of Gemini)
   - **SplitStar** — gamified debt-repayment, Next.js/TS/Supabase (Overall Winner + Starling Prize)
   - **Triage Queue** — AI feedback triage, Cloudflare Workers/D1/Workers AI (Llama 3.1)
5. **§4 Metrics · Evidence** — animated stat strip **balancing impact + engineering**:
   - *Impact/leadership:* 9,500+ reached, 2× hackathon wins, 19 countries, ₹800K+ raised.
   - *Engineering:* e.g. 3 builds shipped in <24h (all placed, 26 / 20-team fields), languages/stack breadth (Python, TS, Swift, SQL, Cypher…), systems shipped on Cloudflare Workers AI / Neo4j. Exact tiles finalized in build.
6. **§5 Changelog** — experience as release history, newest first. **Incoming Cloudflare role kept and clearly marked as the upcoming/next release** (`v2026.3 — shipping July · upcoming`), read as momentum, not padding. Sources: Cloudflare (incoming), Ditchley, EY-Parthenon, Ladki Padhao, UCL.
7. **§6 Roadmap** — where she's headed, role-agnostic (product + engineering, 2027). Confident close.
8. **§7 Appendix** — résumé link, contact (LinkedIn `@snigdha-tiwari`, GitHub `@snig-17`, email `snigdha.tiwari.24@ucl.ac.uk`), photography credit.

## 5. Signature mechanic — the Decision Room

Each `§3` project entry contains a `Key Decision` block. Data model per decision:

```
{
  project, date, tags[], stack[],
  constraint: "the situation + clock",
  prompt: "the fork question",
  options: [ {id:'A', text}, {id:'B', text, mine:true} ],
  readerSplit: { A: n, B: n },   // illustrative
  verdict: { headline, reasoning, outcomeBadges[] }
}
```

Interaction: reader clicks A/B → card locks → reader-split bars animate → the reader's pick and Snigdha's pick are tagged → the verdict panel reveals (reasoning + outcome badges). Headline adapts ("Same call I made" vs "I went the other way").

**Content still needed (open item):** the *real* fork for each of the three projects. The mockup uses a plausible reconstruction for Gemma (polish demo vs. ship multimodal). To fill in conversation.

## 6. The FDE / SWE hook — "How it's built"

Each shipped project has a small **`How it's built`** expandable: the actual architecture and stack decisions (e.g. Triage Queue = async LLM pipeline on Cloudflare Workers AI + D1; SplitStar = REST-driven settlement logic on Next.js + Supabase). PMs read the Decision Room; engineers pop the build notes. One card, two audiences.

## 7. Design system

Extends the existing `.claude/skills/portfolio-design/SKILL.md`, adding "spec chrome."

- **Type:** Playfair Display (display/headings), Poppins (body), **Fira Code (spec metadata — the document voice)**. Webfonts kept in production.
- **Color:** iOS gradient accents (`#007AFF · #5856D6 · #AF52DE · #FF2D92 · #FF6B35`) on a cool-biased neutral ground; glass panels; both light and dark themes fully designed (token-level, not inverted).
- **Photography:** pulled back from full-bleed — used as the **cover** and as captioned section **figures** ("exhibits"), keeping the document canvas calm.
- **Spec chrome:** version stamp, `Status:` pills with status LEDs, `§n` section labels, mono metadata rows, dashed `CONSTRAINT` callouts, `DECISION LOGGED ✓` verdict.
- **Playfulness level:** *committed but tasteful* — enough doc metaphor to be memorable (version, status flips, ticked checkboxes, "3 reviewers approved"), not gimmicky.

## 8. Motion language

Framer Motion (vanilla DOM API, already installed and self-hosted). Reuses shared constants `EASE = [0.25,0.46,0.45,0.94]`, `SPRING = {stiffness:300, damping:22, mass:0.6}`.
- Load: cover assembles (staggered rise, underline draw, status flip).
- Scroll: each section builds as it enters; metrics count up.
- Decision Room: choice → split → reveal choreography.
- Hover springs on interactive elements.
- Full `prefers-reduced-motion` support (skip motion, hide nothing).

## 9. Technical approach

- **Stack unchanged:** vanilla HTML/CSS/JS, no build step, no React. Framer Motion via the self-hosted vanilla-DOM bundle (`assets/framer-motion.dom.js`). See `[[framer-motion-vanilla]]` memory.
- **Structure:** single `index.html`, one section per `§`. Decision Rooms driven by a small JS data array (section 5 model) rendered into templated cards, so adding/editing a decision is a data edit, not markup surgery.
- **Separation:** `animations.js` owns all motion; a new `decisions.js` (or inline data + render) owns Decision Room state; content stays declarative.
- **Accessibility:** keyboard-operable choices/toggles, visible focus, tabular-nums for figures, both themes legible, reduced-motion path.

## 10. Hosting & deployment

- Target host: **Cloudflare Pages** (Git-connected deploys, free, edge CDN, fits the Cloudflare-intern narrative, leaves room to add a Worker/AI feature later).
- **Division of labour:** this build **prepares the repo** to be Cloudflare-Pages-ready (clean static output, no GitHub-Pages-specific assumptions like `.nojekyll` dependence). **Snigdha connects the repo to Cloudflare Pages herself** (she has the account as an incoming intern).
- **Custom domain: later** (candidate: `snigdhatiwari.com` / `snigdha.dev`). Not blocking launch.

## 11. Out of scope (YAGNI, for now)

- No CMS / backend / database.
- No AI "ask me anything" concierge yet (possible later via Cloudflare Workers AI — the hosting choice keeps this open).
- No graph-hero (Concept #2) — parked; could return as a small signature element post-launch.

## 12. Open items to resolve during build

1. Real Decision Room stories for Gemma, SplitStar, Triage Queue.
2. Which photographs map to cover + each section figure.
3. Final copy for Problem / Context / Roadmap sections.
4. Résumé PDF to link in the Appendix.

## 13. Rough build phases (detailed in the implementation plan)

1. Design-system tokens + spec chrome + both themes.
2. Cover + section scaffolding + scroll-build motion.
3. Decision Room component (data model, render, interaction) + real content.
4. Metrics, Changelog, Roadmap, Appendix.
5. Photography integration as figures.
6. Accessibility + reduced-motion + responsive pass.
7. Cloudflare Pages deploy.
