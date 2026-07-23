// src/config/site.ts
// SINGLE SOURCE OF TRUTH. Every price, date, deadline, URL, count, and email
// lives here. Never hardcode these in a component — import from this file.
// TODO_* placeholders are intentional: Shubham swaps them for real values.
export const site = {
  domain: "https://trainwithshubham.ai",
  brand: "TrainWithShubham",
  product: "DevOps: Zero to Hero (AI Powered)",
  tagline: "Happy Learning", // warm sign-off (footer / instructor / closing CTA)

  // --- batch ---
  batchStartISO: "2026-07-25T20:00:00+05:30",
  classDays: "Sat & Sun",
  classTime: "7–10 PM IST",
  // Live-schedule facts authored from the ops sheet (references only — the sheet
  // is NEVER embedded/fetched; golden rule 8). Update here if the batch changes.
  programLength: "3-month", // 25 Jul → late Oct 2026
  liveHours: "150+", // hours of live instruction across the batch (sheet total: 151)

  // --- daily bonus (honest "evergreen") ---
  // A REAL, repeatable bonus: enroll on any given day (before midnight IST) and
  // get the ebook. The bonus timer counts to TONIGHT'S midnight IST and genuinely
  // rolls each day — a real end-of-day deadline, NOT a fake per-visit 24h reset
  // (golden rule 6). Set enabled:false to remove it instantly.
  bonus: {
    // Retired: the free bonus is now the two bundled courses (Python for DevOps +
    // Agentic AI for DevOps), promoted via BonusBar + the homepage BonusCourses strip.
    // Set enabled:true to bring the ebook back as an additional community perk.
    enabled: false,
    name: "#90DaysOfDevOps ebook",
  },

  // --- pricing ---
  // India bills in INR, rest of world in USD — shown transparently (no IP
  // geo-switch, golden rule 6). The page LEADS with the India price; the world
  // price stays in the screen-reader text and at Learnyst checkout. `now` is the
  // price you pay; `list` is the struck-through original shown beside it — a
  // standing discount, NOT an early-bird window (there is no expiry or price flip).
  // Pre-formatted display strings (currency symbol included) — no math anywhere.
  price: {
    india: { now: "₹19,999", list: "₹25,000" },
    world: { now: "$249", list: "$299" },
  },

  // --- conversion ---
  // Two Learnyst checkout links — shown transparently, the learner picks their
  // region (no IP geo-switch, golden rule 6). Same course, two price tiers.
  checkout: {
    india:
      "https://courses.trainwithshubham.ai/learn/fast-checkout/278132?priceId=281722",
    world:
      "https://courses.trainwithshubham.ai/learn/fast-checkout/278132?priceId=280727",
  },
  refundPolicy: "TODO — confirm money-back terms",

  // --- LMS (Learnyst) ---
  // The student platform on a SEPARATE host. This page only links out to it; it
  // never embeds or fetches the LMS (golden rule 8). Add future destinations
  // (store, free masterclasses, ebooks) here and wire them into the footer array.
  lms: {
    base: "https://courses.trainwithshubham.ai",
    signIn: "https://courses.trainwithshubham.ai/learn/account/signin",
    explore: "https://courses.trainwithshubham.ai/learn", // catalog / "All courses"
    // Full DevOps syllabus on the LMS — the complete, module-by-module curriculum
    // (the on-page rail is a curated marketing view; this is the exhaustive list).
    devopsCurriculum:
      "https://courses.trainwithshubham.ai/learn/DevOps-Zero-To-Hero-AI-Powered-Curriculum",
    // TODO: add when live —
    // masterclasses: "https://courses.trainwithshubham.ai/...",
    // ebooks:        "https://courses.trainwithshubham.ai/...",
    // store:         "https://courses.trainwithshubham.ai/...",
  },

  // --- community ---
  // Two honest lanes (golden rules 4 & 6). PUBLIC: the #90DaysOfDevOps
  // open-source challenge — anyone can fork it; the GitHub metrics are REAL
  // snapshots (refresh if you feature them). STUDENT-ONLY: the Discord (the
  // invite is delivered on enrollment — there is deliberately NO public join
  // link) and the ebook bonus. So the Discord "join" path is Enroll, not a link.
  community: {
    challenge: {
      name: "#90DaysOfDevOps",
      repo: "https://github.com/TrainWithShubham/90DaysOfDevOps",
      forks: "8,000+", // 8,230 forks — engineers who forked to take the challenge
      stars: "1,300+", // 1,317 stars
    },
    discord: {
      members: "10,000+", // enrolled learners; invite comes with enrollment
      perks: [
        "Doubt-solving",
        "Daily job postings",
        "Peer-to-peer study groups",
        "Resource drops",
        "Community interactions",
      ],
    },
  },

  // --- proof (established TWS brand) ---
  studentsTrained: "10,000+",
  googleRating: 4.9,
  googleReviewCount: 232,
  googleReviewUrl: "https://g.page/r/CdJiTEIAtbNpEAI/review", // "Rate us on Google" CTA
  googleProfileUrl: "TODO_PUBLIC_GOOGLE_PROFILE_URL", // badge → "read all reviews"
  // public verification page for the DevOps Engineer (Associate) credential
  credentialUrl: "https://credentials.certdirectory.io/o/trainwithshubham",
  social: {
    youtube: { url: "https://www.youtube.com/@TrainWithShubham", label: "1.85 Lakh+" },
    linkedin: { url: "https://www.linkedin.com/in/shubhamlondhe1996", label: "1.15 Lakh+" },
    instagram: { url: "https://www.instagram.com/trainwithshubham__", label: "40,000+" },
  },
  // English-venture handles for "follow our English content" CTAs
  englishSocial: {
    youtube: "https://www.youtube.com/@TrainWithShubhamAI",
    instagram: "https://www.instagram.com/trainwithshubham.ai",
  },

  contactEmail: "trainwithshubham.ai@gmail.com",

  // --- analytics ---
  ga4Id: "G-H313D578QS",
  metaPixelId: "TODO_META_PIXEL_ID",
} as const;
