# Spec — PRD authenticity + honest decision logs

Date: 2026-07-25
Owner: Snigdha Tiwari
Status: approved (design), implementing

## Goal

Make the portfolio read like a **real, senior product requirements document** so
technical/product readers trust it, and replace the two *reconstructed* decision logs
with the true stories so every claim is defensible in an interview.

## Non-Goals

- No redesign of the visual system (editorial ink-on-paper stays).
- No new framework/build step — still data-driven vanilla ESM.
- No fabricated content anywhere. If a fact isn't verified, it doesn't ship.

## Part A — Full PRD structure

New section order (⭐ = added). Sections render from the data model in `prd.data.js`.

| # | Section | Change |
|---|---------|--------|
| — | Cover | keep |
| ⭐ | TL;DR | new — one-paragraph summary right after cover |
| §1 | Problem | keep |
| ⭐ §2 | Goals & Non-Goals | new — two-column list |
| §3 | Context | keep (renumber) |
| §4 | Success metrics · what good looks like | reframed label + lead line; existing tiles |
| §5 | Shipped · decision log | keep; 3 cards rewritten |
| ⭐ §6 | Scope (in / out) | new — two-column list |
| §7 | Changelog | keep |
| §8 | Roadmap | keep |
| ⭐ §9 | Open questions | new — genuine forward-looking questions |
| §10 | Appendix | keep; **résumé link removed (no CV on site)** |

Design note: Non-Goals (claims not made) and Scope-out (roles not sought) are kept
**distinct** so it doesn't read as template padding.

## Part B — Decision logs (§5)

1. **Gemma** — unchanged (already real).

2. **SplitStar** — rewritten to the true story. Team focused on the splitting engine and
   looked back at the "gamify" brief too late; shipping gamification then would be sloppy.
   Call: reframe gamification as a **loyalty/retention feature** (Beli-style) + a **phased
   GTM rollout plan** rather than cram it in. Outcome: **Overall Winner, £1,000** (20 teams),
   Starling Bank Prize.

3. **Triage Queue** — reframed from a fake fork to a **self-directed teardown**: built on
   Cloudflare's own stack to learn the product before joining and pressure-test its UX
   (ticket triage, AI routing, multiple employee interfaces). Finding: *use AI with
   intention* — a chatbot is too easy to reach for; people triaging want the whole queue
   at a glance with urgency surfaced, so AI belongs in the sorting, not the interface.
   Rendered as a new `kind: "teardown"` card (no vote mechanic; brief → finding → badges).

## Open questions (to resolve with Snigdha, not shipped as-is)

- Confirm the two engineering metrics ("3 builds shipped <24h", "6 languages").
- Confirm whether the `triage-queue` GitHub repo is public before linking it.

## Files touched

- `prd.data.js` — content model: add `tldr`, `goals`, `nonGoals`, `scopeIn`, `scopeOut`,
  `openQuestions`, `metricsLead`; rewrite SplitStar; reframe Triage Queue (`kind: "teardown"`);
  remove `resumeUrl`.
- `index.html` — add TL;DR, Goals, Scope, Open-questions scaffolds; renumber sections.
- `prd.js` — render TL;DR/goals/scope/open-questions; teardown-card branch; drop résumé link.
- `prd.css` — styles for `.tldr`, `.twocol`/`.speclist`, `.openq`, `.finding`.
