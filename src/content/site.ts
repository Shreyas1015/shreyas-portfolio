/*
 * Every word on the site lives here. Update this file when the resume changes.
 * Never add the dispatch planner's open-order value: it is confidential.
 */

export const person = {
  name: "Shreyas Gurav",
  role: "Software Engineer",
  focus: "Full-stack, cloud & AI systems",
  city: "Mumbai, India",
  email: "shreyasss15.10@gmail.com",
  github: "https://github.com/Shreyas1015",
  linkedin: "https://linkedin.com/in/shreyasgurav1015",
  resume: "/Shreyas_Gurav_Software_Engineer.pdf",
  photo: "/me.jpeg",
  photoAlt: "Shreyas Gurav in a maroon hoodie, standing in an office",
  description:
    "Shreyas Gurav is a software engineer in Mumbai who builds production full-stack systems for fintech and marketplace products with Node.js, Next.js, FastAPI, PostgreSQL, AWS and LLM/RAG.",
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Open source" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export const about = {
  // `hot` phrases get the hand-drawn marks; keep them short.
  statement: {
    lead: "I build and run production full-stack systems for fintech and marketplace products. Backends that",
    hot1: "stay up,",
    mid: "and tools that keep AI coding agents",
    hot2: "honest.",
  },
  intro:
    "I’m a software engineer at Aerem, a solar-financing marketplace in Mumbai, building the tools ops, finance and sales use every day. Before that I built RAG and LLM backends on AWS at Schbang.",
  principlesTitle: "How I work",
  principles: [
    {
      title: "Measure before I fix",
      body: "I profile before I change anything, and the new result has to match the old one before it ships.",
    },
    {
      title: "Make failure boring",
      body: "I design the retry, the idempotency key and the dead-letter queue before the happy path. Payments and background jobs will fail in production, and that should cost nobody a night.",
    },
    {
      title: "Leave a trail",
      body: "I want every outage to start from a trace ID. That’s why I built Aerem’s observability platform and its telemetry SDK.",
    },
    {
      title: "Give agents rails",
      body: "I ship with AI coding agents and hold their code to the same bar as mine. codeloom and create-rigel are the tools I built to do it.",
    },
  ],
};

export const openSource = {
  say: "Two npm packages, both MIT. Built for people who ship with AI coding agents.",
  codeloom: {
    name: "codeloom",
    version: "v0.3.1 · MIT",
    desc: "Feature maps for engineers and AI agents. It traces each page to the API route, code and database tables behind it, across repos.",
    points: ["Works across frontend and backend repos", "Built without AI", "Code never leaves your machine"],
    why: [
      {
        k: "Problem",
        v: "In apps split across repos, no one can quickly answer “what happens when a user clicks this?”, and AI coding agents guess.",
      },
      {
        k: "In use",
        v: "Engineers open the map in a local dashboard. Claude Code or any MCP agent reads it to name features, give a new engineer a guided tour and quiz, and flag features with no spec.",
      },
      {
        k: "Trust",
        v: "Every link is marked exact or a guess. CI checks the map against hand-labelled apps and blocks a release below 95% precision / 80% recall.",
      },
    ],
    cmd: "npx codeloom init",
    repo: "https://github.com/Shreyas1015/codeloom",
    npm: "https://www.npmjs.com/package/codeloom",
  },
  rigel: {
    name: "create-rigel",
    version: "v0.30.0 · MIT",
    desc: "Guardrails for AI-written code. It starts a new Next.js, Express, NestJS or FastAPI project with gates that block any commit that breaks the team’s rules.",
    points: ["Next.js, Express, NestJS or FastAPI", "Rules for the agent", "A gate on every commit"],
    why: [
      {
        k: "Problem",
        v: "Code written by AI agents drifts from a team’s architecture and quality bar.",
      },
      {
        k: "In use",
        v: "It has 5.8k+ npm downloads and is the basis of Aerem’s internal AI delivery harness, where each change goes from spec to a gated build before review.",
      },
    ],
    gate: [
      { name: "typecheck", note: "" },
      { name: "lint", note: "zero warnings" },
      { name: "circular imports", note: "check" },
      { name: "layering", note: "architecture rules" },
      { name: "coverage", note: "thresholds" },
    ],
    cmd: "npm create rigel@latest my-app",
    repo: "https://github.com/Shreyas1015/create-rigel",
    npm: "https://www.npmjs.com/package/create-rigel",
  },
};

export type Job = { co: string; coFull: string; role: string; when: string; owned: string };

/* Who I was at each company. The numbers that prove it live in `impact`, below. */
export const work: { intro: string; jobs: Job[] } = {
  intro: "Two teams, both in production. Where I’ve worked, then what changed because of it.",
  jobs: [
    {
      co: "Schbang",
      coFull: "Schbang (Schbang Labs)",
      role: "Software Engineer – Full Stack",
      when: "Jun 2025 – Jul 2026",
      owned:
        "I built RAG and LLM backends on AWS, from the pipeline that answers questions over a client’s brand assets to resume screening and meeting summaries. I owned each feature end to end, through to production.",
    },
    {
      co: "Aerem",
      coFull: "Aerem Solutions",
      role: "Software Engineer",
      when: "Jul 2026 – Present",
      owned:
        "I own the internal tools ops, finance and sales run on every day. That covers dispatch planning, payments and collections, the Zoho ERP sync, and the tracing that tells us when any of it breaks.",
    },
  ],
};

export type Bar = { before: string; after: string; ratio: number };
export type ImpactItem = {
  fig: string;
  count?: { to: number; decimals: number; from?: number; prefix?: string; suffix?: string };
  label: string;
  ctx: string;
  where: "Aerem" | "Schbang";
  bar?: Bar;
};

/* The sideways reel inside Experience. The only place on the site the numbers appear. */
export const impact: { items: ImpactItem[] } = {
  items: [
    {
      fig: "8.5ms",
      count: { from: 455, to: 8.5, decimals: 1, suffix: "ms" },
      label: "Dispatch Planner report query",
      ctx: "Built from scratch to replace a hand-run spreadsheet, then tuned.",
      where: "Aerem",
      bar: { before: "455ms", after: "8.5ms", ratio: 8.5 / 455 },
    },
    {
      fig: "10–69×",
      label: "faster production Postgres queries",
      ctx: "pg_stat_statements and 8 new indexes, with identical results across 48 scenarios.",
      where: "Aerem",
    },
    {
      fig: "₹2.13 Cr",
      count: { to: 2.13, decimals: 2, prefix: "₹", suffix: " Cr" },
      label: "of duplicated credit notes removed",
      ctx: "Caused by a race condition. Stale balances fixed on 73 of 235 vendors too.",
      where: "Aerem",
    },
    {
      fig: "₹49.1 lakh",
      count: { to: 49.1, decimals: 1, prefix: "₹", suffix: " lakh" },
      label: "of payments auto-matched",
      ctx: "Collections made double-post-proof with idempotency keys and retries.",
      where: "Aerem",
    },
    {
      fig: "298",
      count: { to: 298, decimals: 0 },
      label: "false alerts, ended",
      ctx: "With Aerem’s first distributed tracing, on OpenTelemetry and Grafana.",
      where: "Aerem",
    },
    {
      fig: "150",
      count: { to: 150, decimals: 0 },
      label: "leaked Chromium processes, contained",
      ctx: "A pooled browser, a Redis concurrency cap, backoff and a dead-letter queue ended the outage.",
      where: "Aerem",
    },
    {
      fig: "2–3 days",
      label: "client onboarding, down from weeks",
      ctx: "A RAG pipeline over 200+ brand assets for Second Brain.",
      where: "Schbang",
      bar: { before: "2–3 weeks", after: "2–3 days", ratio: 2.5 / 17.5 },
    },
    {
      fig: "500+",
      label: "candidates screened per cycle",
      ctx: "LLM scoring at 92% accuracy, with an ElevenLabs voice interview.",
      where: "Schbang",
      bar: { before: "21 days", after: "2–3 days", ratio: 2.5 / 21 },
    },
    {
      fig: "<5 min",
      label: "per meeting transcript, down from hours",
      ctx: "Whisper ASR, dedup and LLM summaries on SQS, SNS and Lambda.",
      where: "Schbang",
      bar: { before: "2 hours", after: "<5 min", ratio: 5 / 120 },
    },
    {
      fig: "<200ms",
      label: "LLM-serving API latency",
      ctx: "Redis on ElastiCache and RDS read replicas, with AWS spend down about 20%.",
      where: "Schbang",
      bar: { before: "500–800ms", after: "<200ms", ratio: 200 / 650 },
    },
  ],
};

export const stack = {
  intro: "What the work runs on, from the database up to the agent.",
  rowA: ["TypeScript", "Node.js", "AdonisJS", "FastAPI", "PostgreSQL", "Redis", "RabbitMQ", "OpenTelemetry", "AWS"],
  rowB: ["Next.js", "React", "RAG", "MCP servers", "Pinecone", "Docker", "GitHub Actions", "Grafana", "Playwright"],
  groups: [
    { k: "Languages", v: "TypeScript, JavaScript (ES6+), Python, SQL" },
    { k: "Backend", v: "Node.js, AdonisJS, Express, FastAPI, REST, HMAC webhooks, RabbitMQ, event-driven systems" },
    { k: "Frontend", v: "Next.js (App Router), React, TanStack Query, Zod, Tailwind, shadcn/ui" },
    { k: "Data", v: "PostgreSQL (indexing, EXPLAIN, pg_stat_statements), MongoDB, Redis, Pinecone" },
    { k: "AI", v: "RAG, LLM APIs, semantic search, MCP servers, Claude Code and agentic tooling" },
    { k: "Cloud", v: "AWS (EC2, RDS, S3, SQS, SNS, Lambda, ElastiCache, CloudWatch), GCP Cloud SQL, Vercel, Docker" },
    { k: "Observe", v: "OpenTelemetry, Grafana, Prometheus, Loki, Tempo, GitHub Actions" },
    { k: "Integrate", v: "Zoho Books & Inventory, Microsoft Entra, Axis & ICICI bank APIs, IDfy, Google Cloud Vision" },
    { k: "Test", v: "Vitest, Playwright, MSW" },
  ],
};

export const aws = {
  title: "AWS Certified Developer – Associate",
  issuer: "Amazon Web Services",
  from: "Feb 2026",
  to: "Feb 2029",
  fromDate: "2026-02-13",
  toDate: "2029-02-13",
  credentialId: "5e4985ab20b34a8e9c20337eeb4edd6d",
  verifyUrl: "https://cp.certmetrics.com/amazon/en/public/verify/credential/5e4985ab20b34a8e9c20337eeb4edd6d",
  ring: "AWS CERTIFIED · DEVELOPER · ASSOCIATE · ",
  desc: "Validates production cloud development: serverless architectures, CI/CD automation, IAM security and AWS service integration.",
  covers: ["Lambda & API Gateway", "CI/CD automation", "IAM security", "Service integration"],
};

export const education = {
  degree: "B.E. Computer Engineering",
  school: "Vasantdada Patil College of Engineering, Mumbai University",
  grade: "CGPA 7.75 / 10",
  when: "2021 – 2025",
};
