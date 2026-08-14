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
  batchStartISO: "2026-07-25T19:00:00+05:30",
  classDays: "Sat & Sun",
  classTime: "7–10 PM IST",
  // Machine-readable mirror of classDays/classTime, used by the "next live session"
  // countdown. The timer COMPUTES the next session from these and rolls itself over
  // each weekend — nothing here goes stale, so no weekly commit is needed on a static
  // site. Keep in sync with the two human-readable strings above.
  session: {
    days: [6, 0], // JS getDay() in IST — 6 = Saturday, 0 = Sunday
    hourIST: 19, // 19:00 IST = 7 PM, the start of each live session
  },
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

  // --- sale (a REAL time-boxed offer; golden rule 6) ---
  // Independence Day sale: ₹5,000 / $50 off the standing price, ending on the date
  // below. `list` anchors to the STANDING price (₹19,999 / $249) — NOT the ₹25,000
  // original — so "₹5,000 off" is literally true and the page can't imply a bigger
  // discount than is being given.
  //
  // The discount is applied by a COUPON at checkout, not by a repriced product. That
  // means Learnyst still shows the standing ₹19,999 / $249 until the code is entered,
  // so the page MUST state the code wherever it states the sale price — otherwise the
  // number on the page and the number at checkout disagree (golden rule 6).
  //
  // Learnyst pre-coupon amounts during the sale: India 281722 = ₹19,999 (→ ₹14,999),
  // world 280727 = $299 (→ $249).
  //
  // ENDING IT — THREE steps, all required:
  //   1. set enabled:false and push;
  //   2. deactivate the AUGUST15 coupon in Learnyst;
  //   3. drop world priceId 280727 back to $249.
  // Step 3 is easy to forget and it BITES: with the sale off, the page falls back to
  // the standing `price` below ($249 world) while checkout would still be at $299 —
  // the page and the checkout would disagree. (India needs no equivalent step: 281722
  // is already ₹19,999, which IS the standing price.) The site is static, so the
  // countdown expiring only flips the urgency copy to "sale ended" — the PRICE does
  // not revert on its own.
  sale: {
    enabled: true,
    name: "Independence Day sale",
    endsISO: "2026-08-15T23:59:59+05:30",
    price: {
      india: { now: "₹14,999", list: "₹19,999" },
      // $299 (not a round $300) — it's the real list price already in `price` below,
      // and it keeps "$50 off" exact rather than an approximation.
      world: { now: "$249", list: "$299" },
    },
    off: { india: "₹5,000 off", world: "$50 off" },
    // Entered by the learner at Learnyst checkout. Set to null if a future sale is
    // done by repricing the product instead — the hint then disappears on its own.
    coupon: "AUGUST15",
    // null → reuse `checkout` below. A coupon-based sale needs no separate links,
    // since the discount happens inside checkout. Replace with
    // { india: "...", world: "..." } only if you mint separate sale priceIds.
    checkout: null,
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
    // Learnyst store catalog. Linked from the bottom of our own /courses index only,
    // never from the footer — see the note in Footer.astro.
    explore: "https://courses.trainwithshubham.ai/learn",
    // Full DevOps syllabus on the LMS — the complete, module-by-module curriculum
    // (the on-page rail is a curated marketing view; this is the exhaustive list).
    devopsCurriculum:
      "https://courses.trainwithshubham.ai/learn/DevOps-Zero-To-Hero-AI-Powered-Curriculum",
    // Free demo — session 1 ("Introduction to DevOps"), meant to be watchable
    // WITHOUT enrolment (visitorFlow=true unlocks it for logged-out visitors;
    // disableLessonChange keeps the preview to just this lesson). Linked out in a
    // new tab, NEVER embedded (golden rule 8). Verify it plays logged-out before
    // promising "no signup"; if the embedPlayer chrome looks bare in a full tab,
    // drop the embedPlayer=1 param.
    demoLesson:
      "https://courses.trainwithshubham.ai/learn/home/devops-zero-to-hero/section/785198/lesson/5121342?embedPlayer=1&disableLessonChange=true&visitorFlow=true",
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
  //
  // SCOPE (changed 14 Aug 2026): "students" means ANY PAID enrolment, not just the
  // flagship. /python's `includes` and FAQ promise Discord access to a ₹1,999 buyer, and
  // the owner confirmed the invite reaches non-flagship buyers. Free-course learners are
  // NOT included, so no free course page claims it.
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
  googleReviewCount: 260,
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

// --- derived: what the page actually charges today -------------------------
// Components render THESE, not site.price/site.checkout, so a sale is a one-flag
// change in the block above and can never leave a displayed price out of step with
// the button beside it. (Course pages pass their own price/checkout explicitly, so
// the DevOps sale can't leak onto /python.)
export const saleLive: boolean = site.sale.enabled;
export const activePrice = saleLive ? site.sale.price : site.price;
export const activeCheckout =
  saleLive && site.sale.checkout ? site.sale.checkout : site.checkout;
