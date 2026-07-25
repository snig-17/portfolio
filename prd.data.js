// prd.data.js — content model for the PRD portfolio.
// Decision logs are REAL forks Snigdha faced. Triage Queue is a self-directed teardown
// (kind: "teardown"), not a competition fork. Draft copy marked TODO(snigdha) to confirm.

export const COPY = {
  title: ["Snigdha builds", "products that <u>think</u>."],
  version: "v2026.1",
  meta: { owner: "Snigdha Tiwari", role: "product-minded engineer", base: "London", updated: "Jul 2026" },
  statusFrom: "Draft",
  statusTo: "Open to 2027 grad roles",
  thesis:
    "UCL Computer Science &amp; Economics. I design, build, and ship AI products — and I can show you " +
    "<em>the decisions</em>, not just the outcomes. This page is my spec: problem, evidence, judgement, roadmap.",
  // One-paragraph summary — the whole page in 10 seconds.
  tldr:
    "Snigdha Tiwari — UCL Computer Science &amp; Economics, graduating 2027. A product-minded engineer who " +
    "designs, builds, and ships AI products end to end, and can walk you through <em>the decisions</em>, not just " +
    "the demos. Shipping July 2026: an AI Innovations internship at Cloudflare. Open to 2027 graduate roles at the " +
    "edge of applied AI.",
  // TODO(snigdha): confirm wording.
  problem:
    "Most “AI products” stall at the demo. The interesting work starts after — the judgement calls under real " +
    "constraints: what to build, what to cut, and what a model can and can't be trusted to do. That's the work " +
    "I want to own, and the work this page documents.",
  // What this document argues / explicitly does not claim.
  goals: [
    "Show product <em>judgement</em> under real constraints — the calls, not just the outcomes.",
    "Prove end-to-end delivery: I design, build, and ship — not just prototype.",
    "Demonstrate the CS × Economics lens — build the thing <em>and</em> reason about its impact.",
  ],
  nonGoals: [
    "Not a research / PhD-track profile — I optimise for shipped product over publications.",
    "Not a pure front-end or pure back-end specialist — I work across the stack.",
    "Not claiming production scale yet — the evidence here is hackathon, internship, and self-directed work, shown honestly.",
  ],
  // TODO(snigdha): confirm wording.
  context:
    "Computer Science and Economics at UCL taught me to hold two lenses at once: how systems are built, and why " +
    "people and markets behave the way they do. It's the throughline from a fintech app to a tutoring model to " +
    "quantitative network research — I build the thing and reason about its impact.",
  // Lead line above the metrics grid.
  metricsLead:
    "What I'd want someone in my seat to move — and the evidence I've already moved it.",
  // Roles / domains I'm targeting, and what I'm not looking for.
  scopeIn: [
    "2027 graduate / new-grad roles in applied AI, product engineering, or AI product.",
    "Teams where I can <em>own product decisions and ship the code behind them</em>.",
    "London-based or hybrid.",
  ],
  scopeOut: [
    "Roles with no product ownership or spec-to-ship autonomy.",
    "Pure research positions with no shipping.",
    "Non-technical PM roles with no build component.",
  ],
  // TODO(snigdha): confirm wording.
  roadmap:
    "Next: a 2027 graduate role where I can <em>own product decisions and ship the code behind them</em> — ideally " +
    "at the edge of applied AI. Shipping July 2026: an AI Innovations internship at Cloudflare.",
  // Honest open questions — the real-draft-PRD signal.
  openQuestions: [
    "Where does AI genuinely <em>earn</em> its place in a product — and where is a chatbot just the easy answer? (Working thesis from Triage Queue.)",
    "How do you keep product judgement sharp at production scale, not just at hackathon speed?",
    "What's the right balance between owning product decisions and going deep as an engineer — and does it have to be a tradeoff?",
  ],
};

export const METRICS = [
  { value: 9500, suffix: "+", label: "people reached\nfinancial-literacy programme", kind: "impact" },
  { value: 2, suffix: "×", label: "hackathon wins\nGoogle & Starling", kind: "impact" },
  { value: 19, suffix: "", label: "countries\nvolunteer network built", kind: "impact" },
  { value: 800, prefix: "₹", suffix: "K+", label: "funding raised\nITC · Christ · Goonj", kind: "impact" },
  // TODO(snigdha): confirm these two engineering figures.
  { value: 3, suffix: "", label: "builds shipped in <24h\nall placed (26 / 20 teams)", kind: "eng" },
  { value: 6, suffix: "", label: "languages shipped\nPython · TS · Swift · SQL · Cypher…", kind: "eng" },
];

export const PROJECTS = [
  {
    id: "gemma",
    name: "Gemma",
    date: "Mar 2026",
    sub: "AI personalised tutoring · Gemini API · Cloud TTS",
    tags: ["Product lead", "Gemini API", "Multimodal", "26 teams"],
    built:
      "How it's built: a multimodal input pipeline (text, image, whiteboard) into the Gemini API, Google Cloud TTS " +
      "for audio, and a persistent session store so a learner's progress carries across sessions.",
    decision: {
      constraint: "Hour 20 of 24. Judges score in four hours. The build is stable but plain.",
      prompt: "Do you polish the live demo, or ship multimodal whiteboard input?",
      options: [
        { id: "A", text: "Polish the demo — safe, clean, judged well on presentation." },
        { id: "B", text: "Ship multimodal whiteboard — riskier, but a real differentiator.", mine: true },
      ],
      readerSplit: { A: 61, B: 39 },
      verdict: {
        headline: "I shipped B.",
        reasoning:
          "“Best Use of Gemini” is judged on <em>how deeply you use the API</em>, not demo gloss. Multimodal input " +
          "(text, image, whiteboard) was the one thing a polished-but-shallow build couldn't fake. I bet the four " +
          "hours on differentiation over safety — and briefed the pitch to lead with it.",
        badges: [{ text: "🏆 2nd place · 26 projects", win: true }, { text: "Google — Best Use of Gemini" }],
      },
    },
  },
  {
    id: "splitstar",
    name: "SplitStar",
    date: "Oct 2025",
    sub: "Gamified debt-repayment · Next.js · TypeScript · Supabase",
    tags: ["Full-stack", "Product", "5-person team", "20 teams"],
    built:
      "How it's built: Next.js + TypeScript front end on Supabase, REST-driven smart-settlement logic, a real-time " +
      "leaderboard, and a mascot-led nudge system. I designed the rewards economy — points redeemable for vouchers, " +
      "cashback, and fractional stocks.",
    decision: {
      constraint:
        "The brief was gamify expense-splitting. We went deep on the splitting engine and looked back at that brief " +
        "too late — bolting real gamification on now would be rushed and sloppy.",
      prompt: "Cram gamification in before the buzzer, or reframe it?",
      options: [
        { id: "A", text: "Force the gamification features in now — it literally matches the brief." },
        {
          id: "B",
          text: "Don't ship it half-baked. Reframe gamification as a loyalty feature, and back the rest with a phased GTM plan.",
          mine: true,
        },
      ],
      readerSplit: { A: 58, B: 42 },
      verdict: {
        headline: "I shipped B.",
        reasoning:
          "A half-baked feature reads worse than a deliberate one — judges can smell rushed. I reframed gamification " +
          "as a <em>loyal-user retention layer</em> (modelled on Beli), built from prior knowledge, and turned the gap " +
          "into a phased GTM rollout showing exactly what ships and when. A scope miss became a product-maturity story.",
        badges: [{ text: "🏆 Overall Winner · £1,000 · 20 teams", win: true }, { text: "Starling Bank Prize" }],
      },
    },
  },
  {
    id: "triage-queue",
    name: "Triage Queue",
    date: "Feb 2026",
    sub: "AI ticket triage · Cloudflare Workers AI · Llama 3.1",
    tags: ["Cloudflare", "Self-directed", "LLM pipeline", "UX teardown"],
    kind: "teardown",
    built:
      "How it's built: an async LLM pipeline on Cloudflare Workers AI + D1 that runs sentiment analysis, severity " +
      "scoring, and business-risk classification on ingested tickets, with prompt engineering to make Llama 3.1 " +
      "emit reliable structured output — tried across multiple employee interfaces (dashboard, chatbot).",
    brief:
      "Self-initiated: build on Cloudflare's own stack to learn the product before joining — and pressure-test its " +
      "UX. A ticket-triage tool that sorts incoming customer tickets with AI, tested across several employee " +
      "interfaces to see which one people actually want.",
    finding: {
      headline: "Use AI with intention.",
      reasoning:
        "A chatbot is too easy to reach for — the sharper question is whether AI is needed <em>at all</em>. Watching " +
        "how people actually triage, they don't want a conversation; they want the <em>whole queue at a glance with " +
        "what's urgent surfaced</em>. AI earns its place in the sorting and prioritisation, not the interface.",
      badges: [{ text: "Self-directed teardown", win: true }, { text: "Cloudflare Workers AI · Llama 3.1" }],
    },
  },
];

export const CHANGELOG = [
  { ver: "v2026.3", date: "Jul 2026", upcoming: true, org: "Cloudflare", role: "AI Innovations & Operations Intern", loc: "London", note: "Incoming — applied AI meets product operations." },
  { ver: "v2026.2", date: "Jun 2026 – Present", org: "The Ditchley Foundation", role: "Networks Research Intern", loc: "Remote, UK", note: "Quantitative network research on a global stakeholder graph — Neo4j / Cypher, Salesforce CRM." },
  { ver: "v2025.2", date: "Apr 2025", org: "EY-Parthenon", role: "Transaction Strategy & Execution Intern", loc: "Bangalore", note: "Buy-side operational + tech due diligence. EY NextGen UK Finalist 2025." },
  { ver: "v2024.1", date: "Aug 2022 – May 2024", org: "Ladki Padhao", role: "Head of Design & Scaling", loc: "Bangalore", note: "Financial-literacy programme: 9,500+ reached, ₹800K+ raised, Diana Award." },
  { ver: "edu", date: "Sep 2024 – Jul 2027", org: "University College London", role: "BASc Computer Science & Economics", loc: "London", note: "Year 1: First Class Honours." },
];

// TODO(snigdha): confirm which photographs map where.
export const FIGURES = [
  { after: "context", src: "assets/8C911BC3-FE84-4AC2-B462-EFB439B15FAA_1_105_c.jpeg", caption: "Fig 1 — Aerial. Shot by S. Tiwari." },
  { after: "roadmap", src: "assets/D213B68B-B8D2-4269-AA4F-341FA1EFDCC3_1_105_c.jpeg", caption: "Fig 2 — Coastline. Shot by S. Tiwari." },
];
