// prd.data.js — content model for the PRD portfolio.
// Real content from Snigdha's CV. Two decision stories (SplitStar, Triage Queue)
// are PLAUSIBLE RECONSTRUCTIONS marked TODO(snigdha) — replace with the real forks.
// Draft copy (problem/context/roadmap) marked TODO(snigdha) — confirm wording.

export const COPY = {
  title: ["Snigdha builds", "products that <u>think</u>."],
  version: "v2026.1",
  meta: { owner: "Snigdha Tiwari", role: "product-minded engineer", base: "London", updated: "Jul 2026" },
  statusFrom: "Draft",
  statusTo: "Open to 2027 grad roles",
  thesis:
    "UCL Computer Science &amp; Economics. I design, build, and ship AI products — and I can show you " +
    "<em>the decisions</em>, not just the outcomes. This page is my spec: problem, evidence, judgement, roadmap.",
  // TODO(snigdha): confirm wording.
  problem:
    "Most “AI products” stall at the demo. The interesting work starts after — the judgement calls under real " +
    "constraints: what to build, what to cut, and what a model can and can't be trusted to do. That's the work " +
    "I want to own, and the work this page documents.",
  // TODO(snigdha): confirm wording.
  context:
    "Computer Science and Economics at UCL taught me to hold two lenses at once: how systems are built, and why " +
    "people and markets behave the way they do. It's the throughline from a fintech app to a tutoring model to " +
    "quantitative network research — I build the thing and reason about its impact.",
  // TODO(snigdha): confirm wording.
  roadmap:
    "Next: a 2027 graduate role where I can <em>own product decisions and ship the code behind them</em> — ideally " +
    "at the edge of applied AI. Shipping July 2026: an AI Innovations internship at Cloudflare.",
  resumeUrl: "assets/Snigdha-Tiwari-CV.pdf", // TODO(snigdha): add the PDF to assets/
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
    // TODO(snigdha): replace with the REAL fork you faced at SplitStar.
    decision: {
      constraint: "5-person team, hackathon clock. The settlement math works but the app is flat.",
      prompt: "Do you harden the settlement engine, or build the gamified rewards loop?",
      options: [
        { id: "A", text: "Harden settlement — correctness is table stakes for a finance app." },
        { id: "B", text: "Build the rewards loop + mascot nudges — the thing that actually wins.", mine: true },
      ],
      readerSplit: { A: 55, B: 45 },
      verdict: {
        headline: "I shipped B.",
        reasoning:
          "Settlement was already correct enough to demo; judges reward a product people <em>want to keep using</em>. " +
          "I put the hours into the rewards economy and nudge loop, kept settlement minimal-but-right, and built the " +
          "pitch around the behaviour-change story.",
        badges: [{ text: "🏆 Overall Winner · 20 projects", win: true }, { text: "Starling Bank Prize" }],
      },
    },
  },
  {
    id: "triage-queue",
    name: "Triage Queue",
    date: "Feb 2026",
    sub: "AI feedback triage · Cloudflare Workers AI · Llama 3.1",
    tags: ["Cloudflare", "LLM pipeline", "PM eval", "prompt eng"],
    built:
      "How it's built: an async LLM pipeline on Cloudflare Workers AI + D1 that runs sentiment analysis, severity " +
      "scoring, and business-risk classification on ingested feedback, with prompt engineering to make Llama 3.1 " +
      "emit reliable structured output.",
    // TODO(snigdha): replace with the REAL fork you faced at Triage Queue.
    decision: {
      constraint: "The happy-path demo works. Real ingested data hasn't been tried, and the clock is short.",
      prompt: "Do you ship the clean demo, or stress-test with real data and surface what breaks?",
      options: [
        { id: "A", text: "Ship the demo — it works, it looks finished." },
        { id: "B", text: "Seed real data, break it on purpose, and document the failures.", mine: true },
      ],
      readerSplit: { A: 48, B: 52 },
      verdict: {
        headline: "I shipped B.",
        reasoning:
          "A demo that only survives ideal input isn't a product. I seeded real feedback, debugged the async failures, " +
          "and surfaced <em>three architectural failure points</em> — each written up as a clear problem statement and " +
          "an actionable feature recommendation, PM-style.",
        badges: [{ text: "3 failure points → feature specs", win: true }, { text: "github.com/snig-17/triage-queue" }],
      },
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
