// src/config/courses.ts
// Per-course data for the standalone course landing pages (/python, future /aws…).
// SINGLE SOURCE OF TRUTH for course-specific fields. Brand/social/LMS/analytics stay
// global in site.ts. Add a course = add one entry here + a 3-line page:
//   src/pages/<slug>.astro → <CourseLanding course={courses.<slug>} />
// Look & feel comes from tokens.css + shared primitives (same across the whole site);
// an optional `theme` re-tints ONLY the accent — never the CTA yellow or the dark base.
// General string-typed shapes (NOT `typeof site`, which is `as const` → the DevOps
// course's literal values, so any other price/URL would fail the contract). site.price
// / site.checkout still satisfy these, and EnrollButtons/StructuredData accept them.
import { site } from "./site";

export interface CoursePrice {
  /** `now` = the price you pay; `list` = the struck-through original beside it
   *  (a standing discount, never an early-bird window — no expiry, no price flip). */
  india: { now: string; list: string };
  world: { now: string; list: string };
}
export interface CourseCheckout {
  india: string;
  world: string;
}

export interface Course {
  slug: string;
  title: string;
  /** One-line outcome / pain-point subtitle under the hero headline. */
  tagline: string;
  /** SEO meta description for this page. */
  description: string;
  /** Per-course OG image under /public; falls back to the site default. */
  ogImage?: string;
  /** Actual pixel dimensions of `ogImage` (declared to social platforms). Set these
   *  whenever `ogImage` is set so the share-card preview isn't cropped/misrendered. */
  ogImageWidth?: number;
  ogImageHeight?: number;
  /** Poster/banner image under /public (e.g. /posters/python.png). Unset → a
   *  branded placeholder frame renders in its place (swap in the real art later). */
  poster?: string;
  /** When true, the page renders as a "coming soon" teaser — no price/pay/dates,
   *  a repo/notify CTA instead of Enroll. Leave off for a live, purchasable course. */
  comingSoon?: boolean;
  /** When true, this course is bundled FREE with the flagship DevOps enrolment.
   *  Surfaces the "free bonus" strip on the homepage + a cross-link on this page. */
  bonus?: boolean;
  /** Live-day count — used in the hero badge ("live N-day cohort"). Optional: a
   *  coming-soon course has no schedule yet. */
  format?: { days: number };
  /** Optional: absent on a coming-soon course (not for sale yet). */
  price?: CoursePrice;
  /** Optional: absent on a coming-soon course (no checkout yet). */
  checkout?: CourseCheckout;
  faq?: { q: string; a: string }[];
  /** Public code repo — featured as "the code we build live". */
  repo?: string;
  /** Real repo fork count (proof); shown with the repo callout. */
  repoForks?: string;
  /** Tech chips for the "what you'll use" strip (ToolIcon names + free text). */
  techStack?: string[];
  /** "What's included" perks — rendered as a checkmark list inside the enroll card. */
  includes?: string[];
  /** Scannable "at a glance" facts (label + value) shown just under the hero. */
  atAGlance?: { label: string; value: string }[];
  /** Live cohort schedule — surfaced in the enroll card ("when it runs"). */
  schedule?: { dates: string; time: string };
  /** Topic-based syllabus, split live (weekend) vs recorded (self-study). */
  curriculum?: { module: string; mode: "live" | "recorded"; desc?: string }[];
  /** Optional cohort start (ISO). */
  batchStartISO?: string;
  /** Optional per-course accent (text-safe on dark). Unset → brand purple. */
  theme?: { primary: string; primaryDeep: string; accent: string };
}

export const courses = {
  python: {
    slug: "python",
    title: "Python for DevOps",
    poster: "/posters/python.jpg",
    ogImage: "/posters/python.jpg",
    ogImageWidth: 1280,
    ogImageHeight: 720,
    tagline: "Automate real DevOps work in Python — live, in one weekend.",
    description:
      "Python for DevOps — a 2-day live cohort (3 hrs/day, recordings included). From Python setup and your first scripts to automating AWS with boto3 and building APIs with FastAPI.",
    format: { days: 2 },
    // Also bundled free with the flagship DevOps enrolment.
    bonus: true,
    price: {
      india: { now: "₹1,999", list: "₹4,999" },
      world: { now: "$19", list: "$49" },
    },
    checkout: {
      // Region-specific Learnyst fast-checkout (same course 281058, region priceId):
      // India → ₹ priceId 285234, rest-of-world → $ priceId 285227.
      india:
        "https://courses.trainwithshubham.ai/learn/fast-checkout/281058?priceId=285234",
      world:
        "https://courses.trainwithshubham.ai/learn/fast-checkout/281058?priceId=285227",
    },
    repo: "https://github.com/TrainWithShubham/python-for-devops",
    repoForks: "750+", // real: 752 forks (snapshot)
    techStack: [
      "Python",
      "Linux",
      "AWS",
      "boto3",
      "AWS CDK",
      "FastAPI",
      "argparse",
      "LangChain",
      "Ollama",
      "GitHub",
    ],
    // What's included — all real (live weekend + recorded self-study + open-source repo).
    includes: [
      "Recordings of every live session",
      "4 years of access + future updates",
      "Live weekend sessions with Shubham",
      "Certificate of completion",
      "Open-source repo — the code is yours to keep",
      "Beginner-friendly — no prior Python needed",
      "Interview prep with the STAR method",
    ],
    // Scannable facts under the hero (concise; the full copy lives in the sections below).
    atAGlance: [
      { label: "Live dates", value: "18–19 Jul" },
      { label: "Time", value: "7–10 PM IST" },
      { label: "Level", value: "Beginner-friendly" },
      { label: "Language", value: "English" },
      { label: "Access", value: "4 years + updates" },
      { label: "Certificate", value: "On completion" },
    ],
    // Live cohort schedule (single source; shown prominently in the enroll card).
    schedule: { dates: "18–19 July 2026 (Sat–Sun)", time: "7–10 PM IST" },
    // Machine-readable cohort start (Day 1, 7 PM IST) → Course JSON-LD startDate.
    batchStartISO: "2026-07-18T19:00:00+05:30",
    // Topic-based syllabus (derived from the python-for-devops repo, curated — golden
    // rule 8, the repo is a reference, never embedded). Live weekend covers the
    // flagship hands-on arc; the rest is recorded, self-study, lifetime access.
    curriculum: [
      {
        module: "Python foundations for DevOps",
        mode: "live",
        desc: "Setup, the syntax that actually matters, and your first automation scripts.",
      },
      {
        module: "Automating system tasks with Python",
        mode: "live",
        desc: "Script real system and ops tasks — system health with psutil, the way DevOps engineers do.",
      },
      {
        module: "AWS automation with Python (boto3 + CDK)",
        mode: "live",
        desc: "Automate AWS with boto3, plus a first taste of infra-as-code with CDK.",
      },
      {
        module: "DevOps API with FastAPI — capstone",
        mode: "live",
        desc: "Build and serve an internal DevOps utilities API end to end.",
      },
      {
        module: "AI log-analysis agent — live demo",
        mode: "live",
        desc: "Watch a local AI agent (LangGraph + Ollama) read logs and suggest fixes — no API keys (full build is recorded).",
      },
      {
        module: "Python fundamentals deep-dive",
        mode: "recorded",
        desc: "Strengthen the core at your own pace.",
      },
      {
        module: "Working with APIs & JSON (requests)",
        mode: "recorded",
        desc: "Call real APIs, parse JSON, and keep secrets in env vars.",
      },
      {
        module: "File handling & log analysis",
        mode: "recorded",
        desc: "Parse logs, count errors and warnings, filter by keyword.",
      },
      { module: "Object-oriented Python (basics)", mode: "recorded" },
      {
        module: "CLI tools with argparse",
        mode: "recorded",
        desc: "Turn your scripts into real command-line tools.",
      },
      { module: "DevOps thinking & problem-solving", mode: "recorded" },
      {
        module: "Local log-analysis agent — full build",
        mode: "recorded",
        desc: "Build the agent end to end with LangGraph, LangChain and Ollama — runs locally, step by step.",
      },
      {
        module: "Capstone completion + interview prep (STAR)",
        mode: "recorded",
        desc: "Finish your project and learn to present it in interviews.",
      },
    ],
    faq: [
      {
        q: "Do I need to know Python already?",
        a: "No — it's beginner-friendly. We start from setup and your first scripts, then build up to boto3 and FastAPI.",
      },
      {
        q: "What if I miss a live session?",
        a: "Every live session is recorded and shared, so you can catch up or revisit anytime. You keep access for 4 years, including future updates.",
      },
      {
        q: "How much time is it?",
        a: "A 2-day live weekend (3 hours each), plus recorded self-study modules — go as deep as you want at your own pace.",
      },
      {
        q: "Do I get a certificate?",
        a: "Yes — finish the course and you'll get a certificate of completion you can add to your LinkedIn and résumé.",
      },
      {
        q: "Will this help me in interviews?",
        a: "You'll leave with a real project to talk about and interview prep using the STAR method, so you can explain your work with confidence.",
      },
    ],
    // Python-flavoured blue accent (text-safe on the dark surface; NOT yellow —
    // that stays reserved for the Enroll CTA across the whole site).
    theme: {
      primary: "#5eb0ef",
      primaryDeep: "#2f74c0",
      accent: "#7cc4ff",
    },
  },

  "agentic-ai": {
    slug: "agentic-ai",
    title: "Agentic AI for DevOps",
    poster: "/posters/agentic-ai.jpg",
    ogImage: "/posters/agentic-ai.jpg",
    ogImageWidth: 1280,
    ogImageHeight: 720,
    tagline: "Build AI agents that operate real DevOps workflows.",
    description:
      "Agentic AI for DevOps — a new live cohort from TrainWithShubham. Build AI agents that automate and operate real DevOps workflows. Coming soon.",
    // Coming soon — no price/checkout/format/schedule/curriculum yet. The page renders
    // as a teaser and the code is being built in the open (see repo).
    comingSoon: true,
    // Also bundled free with the flagship DevOps enrolment.
    bonus: true,
    repo: "https://github.com/TrainWithShubham/agentic-ai-for-devops",
    // Green accent (text-safe on the dark surface; NOT yellow — Enroll CTA only).
    theme: {
      primary: "#4ade80",
      primaryDeep: "#16a34a",
      accent: "#86efac",
    },
  },
} satisfies Record<string, Course>;

// --- Course catalog (the internal /courses index) -------------------------------
// A card per landing page: the DevOps flagship (lives at "/") + every standalone
// course page (derived from `courses`, so future courses appear automatically).
// Price-light on purpose — the price lives on each landing page. Enrollment catalog
// stays on Learnyst (site.lms.explore); this is the marketing index of our pages.
export interface CatalogCard {
  href: string;
  title: string;
  blurb: string;
  /** Short format line, e.g. "2-day live cohort". */
  meta: string;
  /** 1280×720 poster thumbnail under /public/posters. */
  poster?: string;
  /** The purple flagship (DevOps) gets the anchor-card treatment. */
  flagship?: boolean;
  /** Not launched yet — the card shows a "Coming soon" pill + "Preview →". */
  comingSoon?: boolean;
  /** Per-course accent (re-tints the card's stripe). Unset → brand purple. */
  theme?: { primary: string; primaryDeep: string; accent: string };
}

export const catalog: CatalogCard[] = [
  {
    href: "/",
    title: site.product,
    blurb:
      "Our flagship live cohort — from the fundamentals to shipping production-grade systems, with AI in your workflow throughout.",
    meta: `${site.programLength} live cohort`,
    poster: "/posters/devops.jpg",
    flagship: true,
  },
  ...Object.values(courses).map((c: Course) => ({
    href: `/${c.slug}`,
    title: c.title,
    blurb: c.tagline,
    meta: c.comingSoon
      ? "Coming soon"
      : c.format
        ? `${c.format.days}-day live cohort`
        : "Live cohort",
    poster: c.poster,
    comingSoon: c.comingSoon,
    theme: c.theme,
  })),
];

// --- Flagship free bonuses -------------------------------------------------------
// The courses bundled free with the flagship DevOps enrolment (bonus: true). Drives
// the homepage "free bonuses" strip. `value` = the real standalone India price (the
// "normally ₹X, yours free" hook); coming-soon bonuses have no price yet.
export interface BonusCourse {
  href: string;
  title: string;
  poster?: string;
  value?: string;
  comingSoon?: boolean;
  theme?: { primary: string; primaryDeep: string; accent: string };
}

export const flagshipBonuses: BonusCourse[] = Object.values(courses)
  .filter((c: Course) => c.bonus)
  .map((c: Course) => ({
    href: `/${c.slug}`,
    title: c.title,
    // "Normally ₹X" = the LIST standalone price (matches the course page's struck
    // "regularly" figure), so the bonus reflects full value, not the discounted price.
    value: c.price?.india.list,
    poster: c.poster,
    comingSoon: c.comingSoon,
    theme: c.theme,
  }));

// Per-course accent as inline CSS custom properties (re-tints --color-* on a wrapper).
// Single source for CourseLanding / CoursesIndex / BonusCourses / CourseCard, so the
// accent-string logic isn't maintained in several places. Unset theme → brand purple.
export type CourseTheme = { primary: string; primaryDeep: string; accent: string };
export const themeVars = (theme?: CourseTheme) =>
  theme
    ? `--color-primary:${theme.primary};--color-primary-deep:${theme.primaryDeep};--color-accent:${theme.accent};`
    : undefined;
