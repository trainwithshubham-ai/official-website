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
  /** `now` = the price you pay. `list` is OPTIONAL: the struck-through original beside
   *  it (a standing discount, never an early-bird window — no expiry, no price flip).
   *  Omit `list` when the price is simply the price. A permanent strike-through with no
   *  reason and no end date reads as a fake anchor to a technical audience, so only set
   *  it when the original price is real and currently meaningful. */
  india: { now: string; list?: string };
  world: { now: string; list?: string };
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
  /** Teaser video. When set, it REPLACES the static poster as the hero visual rather
   *  than stacking a second large image beneath it. Rendered as a click-to-load facade
   *  (VideoTeaser): nothing loads from YouTube until the visitor presses play.
   *  `id` is the bare video ID, not the watch URL. `duration` is shown on the play
   *  button, so pass it whenever known — naming the time cost lifts play rate. */
  video?: { id: string; duration?: string };
  /** When true, the page renders as a "coming soon" teaser — no price/pay/dates,
   *  a repo/notify CTA instead of Enroll. Leave off for a live, purchasable course. */
  comingSoon?: boolean;
  /** When true, this course is recorded and on demand: no cohort, no dates. Flips
   *  the hero badge, the curriculum rail and the enroll card out of live framing.
   *  Mutually exclusive with `format`/`schedule`/`batchStartISO` in practice. */
  selfPaced?: boolean;
  /** When true, this course is bundled FREE with the flagship DevOps enrolment.
   *  Surfaces the "free bonus" strip on the homepage + a cross-link on this page. */
  bonus?: boolean;
  /** When true, the course itself costs nothing: no price, no region split, no pay
   *  buttons. One `enrollUrl` replaces `checkout`, and the page's monetisation beat is
   *  the flagship upgrade block below the enrol card. Mutually exclusive with
   *  `price`/`checkout` in practice. */
  free?: boolean;
  /** Where a free course's single CTA goes (the zero-cost Learnyst enrolment). Paid courses
   *  use `checkout` instead. Carries UTM forwarding like any other enrol CTA, so free
   *  signups keep their attribution. */
  enrollUrl?: string;
  /** Outcome headline for the hero, used INSTEAD of `title` as the h1. Must contain the
   *  course's primary search keyword: `<title>`, the meta description and the JSON-LD
   *  `name` all keep the plain course name, so the h1 is the only place the promise can
   *  live. Unset → the h1 falls back to `title`. */
  heroHeadline?: string;
  /** Real course size, shown in the hero size line (the at-a-glance strip is driven
   *  separately by `atAGlance`). Every field is
   *  optional and NOTHING is estimated: a value that isn't known simply doesn't render
   *  (golden rule 4). For a recorded course this is a top-three buying question. */
  volume?: { lessons?: number; hours?: string; projects?: number };
  /** The concrete artifacts a learner walks away with — the portfolio pieces, promoted
   *  out of the flat curriculum rail into their own block high on the page. These are
   *  the strongest thing a self-paced course has to sell, so they must be real builds
   *  from the syllabus, never aspirational. */
  builds?: { title: string; desc: string; tools?: string[] }[];
  /** Live-day count — used in the hero badge ("live N-day cohort"). Optional: a
   *  coming-soon course has no schedule yet. */
  format?: { days: number };
  /** Overrides the derived hero badge and catalog format line. Use when the derived
   *  wording would be wrong: a one-off live session is neither "self-paced" nor an
   *  "N-day cohort", and guessing between them would mis-describe the product. */
  formatLabel?: string;
  /** Optional: absent on a coming-soon course (not for sale yet). */
  price?: CoursePrice;
  /** Optional: absent on a coming-soon course (no checkout yet). */
  checkout?: CourseCheckout;
  faq?: { q: string; a: string }[];
  /** Free trial lesson on the LMS — lesson 1, marked TRIAL in Learnyst. Linked out in
   *  a new tab, NEVER embedded (golden rule 8). Logged-out visitors land on the lesson
   *  page with a "Start a free trial" button, so the on-page copy says "free trial",
   *  not "watch free, no signup". Verified 11 Aug 2026. */
  trialLesson?: string;
  /** Button label for `trialLesson`. Default "Watch lesson 1 free". Set it to name the
   *  runtime ("Watch lesson 1 free (25 min)") — on a page with no money-back guarantee
   *  this button is the risk reducer, and a reader decides to click it based on how much
   *  time it costs them. */
  trialLabel?: string;
  /** Public code repo — featured as "the code we build live". */
  repo?: string;
  /** Real repo fork count (proof); shown with the repo callout. */
  repoForks?: string;
  /** Tech chips for the "what you'll use" strip (ToolIcon names + free text). */
  techStack?: string[];
  /** "What's included" perks — rendered as a checkmark list inside the enroll card. */
  includes?: string[];
  /** Short line under the price, e.g. "one-time · 4 years of access". This is a PRODUCT
   *  CLAIM (access term, billing shape), so it lives per course rather than hardcoded in
   *  the shared template, where a future course with a different term would silently
   *  inherit a false one (golden rule 1). */
  priceNote?: string;
  /** The reassurance row under the pay button, e.g. Secure checkout / Instant access.
   *  Course-specific facts for the same reason as `priceNote` — a certificate or an
   *  access window is not something the template can assert on every course's behalf. */
  trust?: string[];
  /** Scannable "at a glance" facts (label + value) shown just under the hero. */
  atAGlance?: { label: string; value: string }[];
  /** Live cohort schedule — surfaced in the enroll card ("when it runs"). */
  schedule?: { dates: string; time: string };
  /** Self-paced courses have no dates, so this one-liner takes the schedule row's
   *  place in the enroll card ("when you can start"). Copy lives here, not in the
   *  component (golden rule 1). */
  availability?: string;
  /** How many real learner testimonials to show on this page (from reviews.json).
   *  Unset → no reviews section, so a coming-soon teaser stays clean. */
  reviews?: number;
  /** Topic-based syllabus, split live (weekend) vs recorded (self-study). A course
   *  with no "live" entries renders as one continuous rail.
   *
   *  `phase` groups consecutive modules under a heading and takes precedence over the
   *  live/recorded split. Use it when the course has a real progression worth showing:
   *  three named phases read as a journey, where thirteen flat modules read as a wall.
   *  Grouping is by CONSECUTIVE runs, so source order is the display order.
   *
   *  `deepDive` tags the heavier modules. It is a substance signal, so only set it where
   *  the module genuinely goes deeper than the ones around it. */
  curriculum?: {
    module: string;
    mode: "live" | "recorded";
    desc?: string;
    phase?: string;
    deepDive?: boolean;
  }[];
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
    // The h1. Keeps both search keywords ("Python", "DevOps") while stating the outcome,
    // because <title>, the meta description and the JSON-LD name all carry the plain
    // product name already.
    heroHeadline: "Python for DevOps: automate AWS, logs and pipelines",
    tagline:
      "Stop doing the same ops work by hand. Build the scripts, tools and agents that do it for you.",
    description:
      "A recorded, self-paced Python course for DevOps. From your first scripts to automating AWS with boto3 and building an internal API with FastAPI. Start today.",
    // Recorded course, no cohort. The live batch has run; the recordings are the product.
    selfPaced: true,
    availability: "Available now. Start the moment you enrol.",
    // Real learner testimonials (reviews.json) shown just before the price.
    reviews: 3,
    // Also bundled free with the flagship DevOps enrolment.
    bonus: true,
    // No `list`: the course costs ₹1,999, full stop. It used to carry a permanent
    // ₹4,999 strike-through with no reason and no end date, which reads as a fake anchor
    // to exactly the sceptical technical reader this site is written for.
    price: {
      india: { now: "₹1,999" },
      world: { now: "$19" },
    },
    checkout: {
      // Region-specific Learnyst fast-checkout (same course 281058, region priceId):
      // India → ₹ priceId 285234, rest-of-world → $ priceId 285227.
      india:
        "https://courses.trainwithshubham.ai/learn/fast-checkout/281058?priceId=285234",
      world:
        "https://courses.trainwithshubham.ai/learn/fast-checkout/281058?priceId=285227",
    },
    // Lesson 1, "Welcome & Setup Your Machine" (video, 25m 33s), marked TRIAL on
    // Learnyst. Same query params as site.lms.demoLesson: visitorFlow unlocks the page
    // for logged-out visitors, disableLessonChange keeps the preview to this lesson.
    trialLesson:
      "https://courses.trainwithshubham.ai/learn/home/Python-For-DevOps--AI-Powered-/section/789773/lesson/5088432?embedPlayer=1&disableLessonChange=true&visitorFlow=true",
    // Says "free trial", NOT "watch free": the verified note on `trialLesson` above
    // records that Learnyst gates the preview behind a "Start a free trial" button, so
    // promising a no-signup watch would be false. The 25 min is the real runtime from
    // that same note (25m 33s) and stays, because with no money-back guarantee this
    // button is the risk reducer and a named time cost is a much easier yes.
    trialLabel: "Start the free trial (25 min)",
    // The four artifacts a learner finishes with, lifted out of the module rail so they
    // aren't weighted the same as "Object-oriented Python (basics)". Every one of these
    // is a real module below, not a promise added for the sales page.
    builds: [
      {
        title: "A DevOps utilities API",
        desc: "Build and serve an internal API with FastAPI, end to end, the kind platform teams actually run.",
        tools: ["Python", "FastAPI"],
      },
      {
        title: "A local log-analysis agent",
        desc: "An agent that reads logs and suggests fixes, built with LangGraph, LangChain and Ollama. Runs on your machine, no API keys, no bill.",
        tools: ["LangChain", "Ollama"],
      },
      {
        title: "AWS automation with boto3",
        desc: "Script real AWS work with boto3, then take a first pass at infrastructure as code with AWS CDK.",
        tools: ["AWS", "Python"],
      },
      {
        title: "Your own command-line tools",
        desc: "Turn throwaway scripts into proper CLI tools with argparse, the ones your team ends up using every day.",
        tools: ["Python", "Linux"],
      },
    ],
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
    // What's included — all real (full recordings + open-source repo + certificate).
    includes: [
      "Every session recorded. Watch anytime, rewind anything",
      "4 years of access + future updates",
      "Taught by Shubham, start to finish",
      "Private learner community on Discord",
      "Certificate of completion",
      "Open-source repo: the code is yours to keep",
      "Beginner-friendly. No prior Python needed",
      "Interview prep with the STAR method",
    ],
    priceNote: "one-time · 4 years of access",
    trust: ["Secure checkout", "Instant access", "4 years + updates"],
    // Scannable facts under the hero (concise; the full copy lives in the sections below).
    atAGlance: [
      { label: "Format", value: "Recorded, self-paced" },
      { label: "Start", value: "Instantly, on enrolment" },
      { label: "Level", value: "Beginner-friendly" },
      { label: "Language", value: "English" },
      { label: "Access", value: "4 years + updates" },
      { label: "Certificate", value: "On completion" },
    ],
    // Topic-based syllabus (derived from the python-for-devops repo, curated — golden
    // rule 8, the repo is a reference, never embedded). Every module is recorded:
    // watch straight through or jump to the topic you need.
    // Ordered as a path you can follow top to bottom: language first, then files and
    // APIs, then automation, then AWS, then the two builds and interview prep.
    curriculum: [
      {
        module: "Python foundations for DevOps",
        mode: "recorded",
        desc: "Setup, the syntax that actually matters, and your first automation scripts.",
      },
      {
        module: "Python fundamentals deep-dive",
        mode: "recorded",
        desc: "Strengthen the core at your own pace before you automate anything real.",
      },
      { module: "Object-oriented Python (basics)", mode: "recorded" },
      {
        module: "File handling & log analysis",
        mode: "recorded",
        desc: "Parse logs, count errors and warnings, filter by keyword.",
      },
      {
        module: "Working with APIs & JSON (requests)",
        mode: "recorded",
        desc: "Call real APIs, parse JSON, and keep secrets in env vars.",
      },
      {
        module: "Automating system tasks with Python",
        mode: "recorded",
        desc: "Script real system and ops tasks, including system health with psutil, the way DevOps engineers do.",
      },
      {
        module: "CLI tools with argparse",
        mode: "recorded",
        desc: "Turn your scripts into real command-line tools.",
      },
      {
        module: "AWS automation with Python (boto3 + CDK)",
        mode: "recorded",
        desc: "Automate AWS with boto3, plus a first taste of infra-as-code with CDK.",
      },
      {
        module: "DevOps API with FastAPI (capstone)",
        mode: "recorded",
        desc: "Build and serve an internal DevOps utilities API end to end.",
      },
      {
        module: "Local log-analysis agent, full build",
        mode: "recorded",
        desc: "Build an agent that reads logs and suggests fixes, using LangGraph, LangChain and Ollama. Runs on your machine, no API keys.",
      },
      { module: "DevOps thinking & problem-solving", mode: "recorded" },
      {
        module: "Capstone completion + interview prep (STAR)",
        mode: "recorded",
        desc: "Finish your project and learn to present it in interviews.",
      },
    ],
    faq: [
      {
        q: "Do I need to know Python already?",
        a: "No. It's beginner-friendly. We start from setup and your first scripts, then build up to boto3 and FastAPI.",
      },
      {
        q: "Is this live or recorded?",
        a: "Fully recorded. Every module is already there, so you start the moment you enrol and go at your own speed. Rewind anything, as often as you want.",
      },
      {
        q: "Can I try it before I buy?",
        a: "Yes. Lesson 1, 'Welcome & Setup Your Machine', is 25 minutes and available as a free trial on the course player. Start the trial, watch it, and enrol once you know the teaching style suits you.",
      },
      {
        q: "When do I get access?",
        a: "Straight after payment. You'll land in the course and can watch module 1 the same minute.",
      },
      {
        q: "How much time will it take?",
        a: "That's up to you. Most people work through it over a couple of weekends, but you keep access for 4 years, so there's no clock on it.",
      },
      {
        q: "Do I get a certificate?",
        a: "Yes. Finish the course and you'll get a certificate of completion you can add to your LinkedIn and résumé.",
      },
      {
        q: "What if I get stuck?",
        a: "You get into the private Discord with your enrolment. Ask there and you'll get help from me and from other learners working through the same material.",
      },
      {
        q: "What do I need on my machine?",
        a: "A laptop and an internet connection. Lesson 1 walks through the setup from scratch on Windows, macOS or Linux, so you don't need anything installed before you start.",
      },
      {
        q: "Is this the same Python that's inside DevOps: Zero to Hero?",
        a: "This is the full standalone Python course, and it's also bundled free with a Zero to Hero enrolment. So if you're already planning to join the flagship, don't buy this separately, it's included.",
      },
      {
        q: "Can I expense this with my employer?",
        a: "Yes. You'll get an invoice after enrolment that you can submit to your company's L&D or reimbursement team.",
      },
      {
        q: "Will this help me in interviews?",
        a: "You'll finish with a real project to talk about and interview prep using the STAR method, so you can explain your work with confidence.",
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

  // --- FREE COURSES -------------------------------------------------------------------
  // Both are recorded and live on Learnyst. Everything below that is REAL is filled in;
  // everything that would be a guess is a TODO instead of an invention (golden rule 4).
  // Deliberately NOT `bonus: true` — a bonus is a paid course bundled free with the
  // flagship, and these cost nothing to begin with, so the badge would be meaningless.
  // Free learners do NOT get the Discord (site.ts community scope note), so no course
  // here claims it.
  "claude-code": {
    slug: "claude-code",
    // Matches the course's real name on Learnyst ("Claude Code: Zero To Hero"). A visitor
    // who clicks Start free should land on a page whose title is the one they just read;
    // a mismatch between the sales page and the checkout is the same class of trust
    // wobble as a price that doesn't match.
    title: "Claude Code: Zero To Hero",
    // The syllabus goes well past "code with an AI in your terminal" — subagents, MCP,
    // CI/CD, IaC, enterprise — so the headline claims the whole arc rather than the
    // entry point. Keeps "Claude Code" and "DevOps" as the search keywords.
    heroHeadline: "Claude Code for DevOps: from first prompt to multi-agent workflows",
    tagline:
      "Install it, learn to drive it properly, then put it to work in your pipelines, your cloud and your codebase. Free, recorded, start today.",
    // Kept under ~160 chars: Google truncates past that, and the first version ran to
    // 270, so the half that actually sold the course never got shown.
    description:
      "Free, recorded Claude Code course for DevOps, Cloud, SRE and Platform engineers. 13 modules, three phases, from your first prompt to multi-agent workflows.",
    poster: "/posters/claude-code.jpg",
    ogImage: "/posters/claude-code.jpg",
    ogImageWidth: 1280,
    ogImageHeight: 720,
    free: true,
    // Ran live on Sunday 16 Aug 2026, 09:00 IST; flipped to recorded on 17 Aug once the
    // recording was confirmed available. The live-only fields (batchStartISO, schedule,
    // formatLabel) are GONE rather than commented out, which is what removes the hero
    // countdown, the date line and the "free live session" badge — they are all
    // conditional on those fields existing.
    selfPaced: true,
    availability: "Available now. Start the moment you enrol.",
    // Real learner testimonials. Rendered under "about TrainWithShubham", so they never
    // imply these people took THIS course (golden rule 4). They still do real work here:
    // a free signup is a trust decision too, and it warms the flagship upsell below.
    reviews: 3,
    // The Learnyst course page, where a logged-out visitor enrols. Not a fast-checkout
    // link like the paid courses use — there is no payment step to skip. Setting this
    // takes the page OUT of draft: it gains CTAs, a catalog card, a sitemap entry, an
    // index directive and a zero-price JSON-LD offer, all at once.
    enrollUrl: "https://courses.trainwithshubham.ai/learn/claude-code",
    // Real, confirmed facts only. NO access-term claim anywhere: how long free learners
    // keep access is still unconfirmed, and the owner's instruction is not to state it.
    includes: [
      "Fully recorded. Watch anytime, rewind anything",
      "13 modules across three phases, start to finish",
      "Certificate of completion",
      "Free. No card, no payment",
    ],
    trust: ["No payment", "Instant access", "Certificate on completion"],
    atAGlance: [
      { label: "Price", value: "Free" },
      { label: "Format", value: "Recorded, self-paced" },
      { label: "Start", value: "Instantly, on enrolment" },
      { label: "Level", value: "Starts from zero" },
      // No "Modules" cell: the hero size line already derives "13 modules · 3 phases"
      // from the curriculum, and a hand-typed copy here could drift from it.
      { label: "Certificate", value: "On completion" },
    ],
    // Tools and surfaces the syllabus actually covers. Names without a vendored ToolIcon
    // simply render as text, so conceptual entries are fine here.
    techStack: [
      "Claude Code",
      "MCP",
      "Bash",
      "Git",
      "GitHub Actions",
      "GitLab CI",
      "Terraform",
      "AWS",
      "Slack",
    ],
    // Module titles only, no sub-topics: this is a free course and the page's job is a
    // fast, confident yes, not an evaluation exercise. The three phases carry the
    // progression story, which is the thing a flat list of thirteen would lose.
    curriculum: [
      {
        phase: "Phase 1 · zero to comfortable",
        mode: "recorded",
        module: "Welcome to the era of agentic coding",
      },
      {
        phase: "Phase 1 · zero to comfortable",
        mode: "recorded",
        module: "Prompt engineering for agentic work",
      },
      {
        phase: "Phase 1 · zero to comfortable",
        mode: "recorded",
        module: "Installing Claude Code everywhere",
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "The agentic loop and built-in tools",
        deepDive: true,
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "Permissions, memory and configuration",
        deepDive: true,
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "Planning and executing a real project",
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "Skills, commands and hooks",
        deepDive: true,
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "The plugin ecosystem",
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "MCP",
        deepDive: true,
      },
      {
        phase: "Phase 3 · productive to advanced",
        mode: "recorded",
        module: "Subagents and orchestration at scale",
        deepDive: true,
      },
      {
        phase: "Phase 3 · productive to advanced",
        mode: "recorded",
        module: "Claude Code across every surface",
      },
      {
        phase: "Phase 3 · productive to advanced",
        mode: "recorded",
        module: "CI/CD, code review and security",
      },
      {
        phase: "Phase 3 · productive to advanced",
        mode: "recorded",
        module: "Infrastructure, cloud and enterprise",
      },
    ],
    // Only answers grounded in the syllabus or in confirmed facts. No access term (not
    // confirmed for free courses) and no community claim (free learners don't get the
    // Discord — see the scope note in site.ts).
    faq: [
      {
        q: "Is it really free?",
        a: "Yes. No card, no payment, nothing to cancel. You sign in to the course platform and start watching.",
      },
      {
        q: "Do I need to know AI or agents already?",
        a: "No. Phase 1 starts from what a large language model actually is and what makes a system agentic, then walks you through installing Claude Code on macOS, Windows or Linux and running your first session.",
      },
      {
        q: "Is this for developers only?",
        a: "It's aimed at DevOps, Cloud, SRE and Platform engineers. That's why the later phases go into CI/CD, code review, infrastructure as code and running Claude Code on Bedrock, Google Cloud and Microsoft Foundry.",
      },
      {
        q: "How deep does it actually go?",
        a: "Past the basics. Five modules are marked deep dive, including the agentic loop and built-in tools, permissions and configuration, skills and hooks, MCP, and multi-agent orchestration with subagents and worktrees.",
      },
      {
        q: "Is it live or recorded?",
        a: "Fully recorded. Every module is already there, so you start the moment you enrol and go at your own speed. Rewind anything, as often as you want.",
      },
      {
        q: "What should I have ready?",
        a: "A laptop and an internet connection. We install Claude Code together on macOS, Windows or Linux in phase 1, so you don't need it set up beforehand.",
      },
      {
        q: "Do I get a certificate?",
        a: "Yes. Complete the course and you get a certificate of completion you can add to your LinkedIn and your resume.",
      },
    ],
    // TODO: `volume` — total runtime and lesson count. The hero size line already shows
    // "13 modules" (derived from the curriculum above); add hours when you have them.
    // Claude's clay accent. Verified 6.2:1 on --ink (#0A0E12), so it is text-safe.
    // Nominative use to denote the tool the course teaches, same basis as ToolIcon; this
    // is not an endorsement by Anthropic. The Enroll CTA on this page stays yellow.
    theme: {
      primary: "#d97757",
      primaryDeep: "#b4543a",
      accent: "#e89b80",
    },
  },

  linux: {
    slug: "linux",
    title: "Linux for DevOps",
    heroHeadline: "Get properly comfortable on the Linux command line",
    tagline:
      "The command-line skills every DevOps job assumes you already have. Free, recorded, start today.",
    // Deliberately does NOT enumerate modules: the syllabus is a TODO below, and listing
    // topics here would assert content this file says is unconfirmed (golden rule 4).
    // Rewrite this with the real topics once the curriculum lands.
    description:
      "A free, recorded Linux course for DevOps. Get properly comfortable on the command line, taught the way you actually use it on a server. Start today.",
    free: true,
    selfPaced: true,
    availability: "Available now. Start the moment you enrol.",
    // Real learner testimonials. Rendered under "about TrainWithShubham", so they never
    // imply these people took THIS course (golden rule 4). They still do real work here:
    // a free signup is a trust decision too, and it warms the flagship upsell below.
    reviews: 3,
    // TODO: replace with the real Learnyst free-enrolment URL (see note above).
    enrollUrl: "TODO_LINUX_FREE_ENROL_URL",
    // TODO: replace `id` with the real YouTube video ID (the bare id, e.g. dQw4w9WgXcQ,
    // not the full watch URL) and set the real `duration`. Until then the hero falls back
    // to the poster, exactly as it did before — a placeholder id never reaches an iframe.
    // The teaser uses `poster` as its thumbnail, so the poster art matters more now.
    video: { id: "TODO_LINUX_TEASER_VIDEO_ID", duration: "TODO" },
    includes: [
      "Fully recorded. Watch anytime, rewind anything",
      "Taught by Shubham, start to finish",
      "Certificate of completion",
      "Free. No card, no payment",
    ],
    trust: ["No payment", "Instant access", "Certificate on completion"],
    atAGlance: [
      { label: "Price", value: "Free" },
      { label: "Format", value: "Recorded, self-paced" },
      { label: "Start", value: "Instantly, on enrolment" },
      { label: "Certificate", value: "On completion" },
    ],
    // TODO: poster art + curriculum + volume + faq (see the note on claude-code above).
    // No `theme`: Linux keeps the brand purple. Green belongs to /agentic-ai, blue to
    // /python, and Tux yellow is off limits because yellow is the Enroll CTA sitewide.
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

// --- Draft courses -------------------------------------------------------------
// Declared BEFORE `catalog`, which calls isDraftCourse during module evaluation
// (const arrow functions are not hoisted, so defining these later is a TDZ error).

// A TODO_ string is a placeholder, not a value (same convention as site.ga4Id).
export const isPlaceholder = (v?: string) => !v || v.startsWith("TODO");

/** A free course whose Learnyst enrolment URL isn't wired yet. The page still BUILDS so
 *  it can be reviewed on localhost, but it is treated as a draft everywhere it would
 *  otherwise reach the public: no catalog card, no sitemap entry, `noindex`, no CTA, and
 *  no JSON-LD offer. Without this the route ships a dead "Start free" button and an
 *  internal TODO note straight to visitors and to Google. */
export const isDraftCourse = (c: Course) => !!c.free && isPlaceholder(c.enrollUrl);

/** Slugs excluded from the sitemap (read by astro.config.mjs). */
export const draftSlugs: string[] = Object.values(courses)
  .filter(isDraftCourse)
  .map((c: Course) => c.slug);

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
  /** Costs nothing — the card shows a "Free" pill. The strongest word on a catalog
   *  page, so it earns its own marker rather than hiding inside the blurb. */
  free?: boolean;
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
  // Draft courses are omitted: linking a card to a page with no enrolment path sends
  // real visitors into a dead end. They reappear automatically once `enrollUrl` is real.
  ...Object.values(courses)
    .filter((c: Course) => !isDraftCourse(c))
    .map((c: Course) => ({
    href: `/${c.slug}`,
    title: c.title,
    blurb: c.tagline,
    // Format line only. "Coming soon" is a separate pill on the card, so repeating
    // it here would print it twice.
    meta:
      c.formatLabel ??
      (c.selfPaced
        ? "Recorded, self-paced"
        : c.format
          ? `${c.format.days}-day live cohort`
          : "Live cohort"),
    poster: c.poster,
    comingSoon: c.comingSoon,
    free: c.free,
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
    // "Normally ₹X" = the price a visitor would ACTUALLY pay for this course today
    // (`now`), not an older list figure. If the course page charges ₹1,999, claiming the
    // bonus is worth ₹4,999 overstates it — and the two pages would contradict each
    // other one click apart (golden rule 4).
    value: c.price?.india.now,
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
