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
    /** Tool/topic chips under the module title, rendered with a ToolIcon where one is
     *  vendored and as plain text otherwise. Prefer these over `desc` on a free page:
     *  three scannable chips carry the same "here is what's actually in it" signal as a
     *  sentence, at a fraction of the reading cost. */
    tags?: string[];
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
    // No heroHeadline: the h1 is the course name, matching /linux and /claude-code. The
    // outcome it used to carry ("automate AWS, logs and pipelines") moved into the
    // subhead, so the name lands at full display size instead of trailing a colon.
    tagline:
      "Stop doing the same ops work by hand. Automate AWS, logs and pipelines instead.",
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
      { label: "Length", value: "10+ hours" },
      { label: "Start", value: "Instantly, on enrolment" },
      { label: "Level", value: "Beginner-friendly" },
      { label: "Language", value: "English" },
      { label: "Access", value: "4 years + updates" },
      { label: "Certificate", value: "On completion" },
    ],
    // Runtime as Shubham gave it: "more than 10 hours". Stated as a floor rather than a
    // made-up exact figure (golden rule 4). Feeds the hero size line and courseWorkload.
    // The "10+ hours" in atAGlance above is hand-typed and must change with it.
    volume: { hours: "10+" },
    // Topic-based syllabus (derived from the python-for-devops repo, curated — golden
    // rule 8, the repo is a reference, never embedded). Every module is recorded:
    // watch straight through or jump to the topic you need.
    // Ordered as a path you can follow top to bottom: language first, then files and
    // APIs, then automation, then AWS, then the two builds and interview prep.
    // Chips, not sentences, same treatment as /linux and /claude-code. What actually
    // sells (the log-analysis agent, the FastAPI capstone) already lives in `builds`
    // below, so the descriptions here were repeating it at length.
    curriculum: [
      { module: "Python foundations for DevOps", mode: "recorded", tags: ["Python", "Setup"] },
      { module: "Python fundamentals deep-dive", mode: "recorded", tags: ["Python"] },
      { module: "Object-oriented Python (basics)", mode: "recorded", tags: ["Python", "OOP"] },
      { module: "File handling and log analysis", mode: "recorded", tags: ["Logs", "Parsing"] },
      { module: "Working with APIs and JSON", mode: "recorded", tags: ["requests", "JSON", "APIs"] },
      { module: "Automating system tasks with Python", mode: "recorded", tags: ["psutil", "Linux"] },
      { module: "CLI tools with argparse", mode: "recorded", tags: ["argparse", "CLI"] },
      { module: "AWS automation with Python", mode: "recorded", tags: ["boto3", "AWS", "AWS CDK"] },
      { module: "DevOps API with FastAPI (capstone)", mode: "recorded", tags: ["FastAPI", "APIs"] },
      { module: "Local log-analysis agent, full build", mode: "recorded", tags: ["LangChain", "LangGraph", "Ollama"] },
      { module: "DevOps thinking and problem-solving", mode: "recorded", tags: ["Python"] },
      { module: "Capstone completion and interview prep", mode: "recorded", tags: ["Capstone", "Interviews"] },
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
    // No heroHeadline: the h1 is the course name, which also matches Learnyst exactly.
    // The arc it used to carry moved into the subhead.
    tagline:
      "From your first prompt to multi-agent DevOps workflows. 4 hours, free, start today.",
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
      { label: "Level", value: "Starts from zero" },
      { label: "Length", value: "4 hours" },
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
        tags: ["LLMs", "Agents", "Claude"],
      },
      {
        phase: "Phase 1 · zero to comfortable",
        mode: "recorded",
        module: "Prompt engineering for agentic work",
        tags: ["Prompting", "Context"],
      },
      {
        phase: "Phase 1 · zero to comfortable",
        mode: "recorded",
        module: "Installing Claude Code everywhere",
        tags: ["macOS", "Windows", "Linux"],
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "The agentic loop and built-in tools",
        tags: ["Bash", "Grep", "Context window"],
        deepDive: true,
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "Permissions, memory and configuration",
        tags: ["CLAUDE.md", "settings.json"],
        deepDive: true,
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "Planning and executing a real project",
        tags: ["Plan mode", "Monorepo"],
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "Skills, commands and hooks",
        tags: ["SKILL.md", "Hooks", "Slash commands"],
        deepDive: true,
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "The plugin ecosystem",
        tags: ["Plugins", "Marketplace", "Security"],
      },
      {
        phase: "Phase 2 · comfortable to productive",
        mode: "recorded",
        module: "MCP",
        tags: ["MCP", "Tool search", "Channels"],
        deepDive: true,
      },
      {
        phase: "Phase 3 · productive to advanced",
        mode: "recorded",
        module: "Subagents and orchestration at scale",
        tags: ["Subagents", "Worktrees", "Agent teams"],
        deepDive: true,
      },
      {
        phase: "Phase 3 · productive to advanced",
        mode: "recorded",
        module: "Claude Code across every surface",
        tags: ["Desktop", "Mobile", "Slack", "Chrome"],
      },
      {
        phase: "Phase 3 · productive to advanced",
        mode: "recorded",
        module: "CI/CD, code review and security",
        tags: ["GitHub Actions", "GitLab CI", "Security"],
      },
      {
        phase: "Phase 3 · productive to advanced",
        mode: "recorded",
        module: "Infrastructure, cloud and enterprise",
        tags: ["Terraform", "AWS", "Bedrock"],
      },
    ],
    // Only answers grounded in the syllabus or in confirmed facts. No access term (not
    // confirmed for free courses) and no community claim (free learners don't get the
    // Discord — see the scope note in site.ts).
    faq: [
      {
        q: "Is it really free?",
        a: "Yes. No card, no payment, nothing to cancel.",
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
        a: "Yes, on completion. Add it to your LinkedIn and your resume.",
      },
    ],
    // Real runtime. Feeds the hero size line and courseWorkload. The "4 hours" in the
    // tagline and in atAGlance below are hand-typed and must be changed with it.
    volume: { hours: "4" },
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
    // No heroHeadline: "Linux for DevOps" IS the promise and the search term, so the h1
    // is the course name and the subhead carries the outcome. Shorter, and the name lands
    // at full display size instead of trailing a colon.
    tagline:
      "The command-line skills every DevOps job assumes you already have. 8 hours, free, start today.",
    // Names only what the detailed syllabus actually contains. An earlier version said
    // "systemd" and "LVM", carried over from a four-topic summary; neither appears as a
    // module in the full syllabus, so both are gone.
    description:
      "Free, recorded Linux course for DevOps and SRE. 13 modules: OS foundations, VMs, file system, permissions, shell scripting, networking and SSH. Start today.",
    poster: "/posters/linux.jpg",
    ogImage: "/posters/linux.jpg",
    ogImageWidth: 1280,
    ogImageHeight: 720,
    free: true,
    selfPaced: true,
    availability: "Available now. Start the moment you enrol.",
    // Real learner testimonials. Rendered under "about TrainWithShubham", so they never
    // imply these people took THIS course (golden rule 4). They still do real work here:
    // a free signup is a trust decision too, and it warms the flagship upsell below.
    reviews: 3,
    // The Learnyst course page, where a logged-out visitor enrols. Setting this takes the
    // page out of draft, so it gains CTAs, a catalog card, a sitemap entry, an index
    // directive and a zero-price JSON-LD offer all at once.
    enrollUrl: "https://courses.trainwithshubham.ai/learn/linux",
    // "Linux Full Course | Intro" on the English channel. Real runtime is 99 seconds;
    // labelled "under 2 min" instead of "2 min", which would overstate it, and the point
    // of naming the time cost is that it is genuinely small.
    // (Careful with wording in comments here: Tailwind v4 scans source files for class
    // candidates and does NOT skip comments, so a bare utility name written in prose
    // emits a real, unused CSS rule into every page on the site. Avoid writing bare
    // utility words like the border-radius one in these comments.)
    // The teaser replaces the hero poster and uses `poster` above as its thumbnail.
    video: { id: "kwFIkpZfHHI", duration: "under 2 min" },
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
      // Level is stated explicitly here because the poster art reads "Advanced Linux"
      // while the syllabus starts from what Linux is. The scannable strip is exactly
      // where someone checks whether a course is above them.
      { label: "Level", value: "Starts from scratch" },
      { label: "Length", value: "8 hours" },
      { label: "Certificate", value: "On completion" },
    ],
    // Tools and surfaces the syllabus covers. Names without a vendored ToolIcon render as
    // plain text, so conceptual entries are fine.
    techStack: [
      "Linux",
      "Bash",
      "Vim",
      "VirtualBox",
      "Ubuntu",
      "SSH",
      "cron",
      "iptables",
    ],
    // Chips, not sentences. Owner direction: less text, more value, more icons. Three
    // scannable chips carry the same "what's actually in it" signal as a one-line
    // description at a fraction of the reading cost, and they render with a real logo
    // wherever one is vendored in ToolIcon.
    curriculum: [
      {
        phase: "Session 1 · fundamentals",
        mode: "recorded",
        module: "Foundations of Linux and the OS",
        tags: ["Linux", "Kernel", "System calls"],
      },
      {
        phase: "Session 1 · fundamentals",
        mode: "recorded",
        module: "Virtualization and Linux VMs",
        tags: ["VirtualBox", "Ubuntu", "Hypervisors"],
      },
      {
        phase: "Session 1 · fundamentals",
        mode: "recorded",
        module: "Exploring the Linux file system",
        tags: ["/etc", "/var", "umask"],
      },
      {
        phase: "Session 1 · fundamentals",
        mode: "recorded",
        module: "Managing software on Linux",
        tags: ["APT", "YUM", "Repositories"],
      },
      {
        phase: "Session 2 · fundamentals",
        mode: "recorded",
        module: "Text editors: Nano and Vim",
        tags: ["Nano", "Vim"],
      },
      {
        phase: "Session 2 · fundamentals",
        mode: "recorded",
        module: "User and permission management",
        tags: ["chmod", "sudoers", "/etc/passwd"],
      },
      {
        phase: "Session 2 · fundamentals",
        mode: "recorded",
        module: "Mastering the command line",
        tags: ["grep", "Pipes", "Wildcards"],
      },
      {
        phase: "Session 3 · advanced",
        mode: "recorded",
        module: "Introduction to shell scripting",
        tags: ["Bash", "Loops", "cron"],
      },
      {
        phase: "Session 3 · advanced",
        mode: "recorded",
        module: "Environment variables",
        tags: ["Linux", "Deployment"],
      },
      {
        phase: "Session 3 · advanced",
        mode: "recorded",
        module: "Introduction to networking",
        tags: ["LAN", "Routers", "Gateways"],
      },
      {
        phase: "Session 3 · advanced",
        mode: "recorded",
        module: "IP addressing",
        tags: ["Subnetting", "CIDR"],
      },
      {
        phase: "Session 3 · advanced",
        mode: "recorded",
        module: "Essential networking commands",
        tags: ["ping", "curl", "tcpdump", "iptables"],
      },
      {
        phase: "Session 3 · advanced",
        mode: "recorded",
        module: "Secure Shell (SSH)",
        tags: ["SSH", "Key auth", "Automation"],
      },
    ],
    // Grounded in the syllabus and in confirmed facts only. No access-term claim (owner
    // instruction) and no community claim (free learners don't get the Discord).
    faq: [
      {
        q: "Is it really free?",
        a: "Yes. No card, no payment, nothing to cancel.",
      },
      {
        q: "Is it live or recorded?",
        a: "Fully recorded. Start the moment you enrol, go at your own speed.",
      },
      {
        q: "Do I need any Linux experience?",
        a: "None. Module 1 starts from what an operating system actually is.",
      },
      {
        q: "Do I need a Linux machine?",
        // VirtualBox is x86-only in practice: on Apple Silicon it is a developer preview
      // that will not boot the x86-64 Ubuntu guests this course uses, and that is every
      // Mac sold since Nov 2020. This answer also goes into the FAQPage JSON-LD, so an
      // unqualified "macOS works fine" is a compatibility promise the course cannot keep.
      a: "No. Session 1 sets you up with a Linux VM. Windows and Intel Macs use VirtualBox; on an Apple Silicon Mac use UTM or Multipass, which give you the same Ubuntu to work in.",
      },
      {
        q: "Do I get a certificate?",
        a: "Yes, on completion. Add it to your LinkedIn and your resume.",
      },
    ],
    // Real runtime, supplied by the owner. Feeds the hero size line and the at-a-glance
    // strip. Module and phase counts stay DERIVED from the curriculum above.
    volume: { hours: "8" },
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
