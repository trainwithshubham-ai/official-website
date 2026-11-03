// src/config/site.ts
// SINGLE SOURCE OF TRUTH. Every price, date, deadline, URL, count, and email
// lives here. Never hardcode these in a component — import from this file.
// TODO_* placeholders are intentional: Shubham swaps them for real values.
export const site = {
  domain: "https://trainwithshubham.ai",
  brand: "TrainWithShubham",
  product: "DevOps: Zero to Hero (AI Powered)",
  tagline: "Happy Learning", // warm sign-off (footer / instructor / closing CTA)

  // --- course format ---
  // Self-paced since the live cohort ended. Recorded runtime and access term are real,
  // owner-confirmed figures; components read them from here, never retype them.
  videoHours: "150+", // hours of recorded lessons
  access: "4 years", // access to every recording, resource and the community

  // --- ebook perk (optional) ---
  // Off since the free bonus became the two bundled courses. No timer is attached to it
  // (golden rule 6: no deadline unless it is real). Set enabled:true to show it in Community.
  bonus: {
    // Retired: the free bonus is now the two bundled courses (Python for DevOps +
    // Agentic AI for DevOps), promoted via BonusBar + the homepage BonusCourses strip.
    // Set enabled:true to bring the ebook back as an additional community perk.
    enabled: false,
    name: "#90DaysOfDevOps ebook",
  },

  // --- sale (a REAL time-boxed offer; golden rule 6) ---
  // Teachers' Day sale: ₹5,000 / $50 off the standing price, ending on the date
  // below. `list` anchors to the STANDING price (₹19,999 / $249) — NOT the ₹25,000
  // original — so "₹5,000 off" is literally true and the page can't imply a bigger
  // discount than is being given.
  //
  // The discount is applied by a COUPON at checkout, not by a repriced product. That
  // means Learnyst still shows the standing ₹19,999 / $249 until the code is entered,
  // so the page MUST state the code wherever it states the sale price — otherwise the
  // number on the page and the number at checkout disagree (golden rule 6).
  //
  // Learnyst pre-coupon amounts during this sale: India 281722 = ₹19,999 (→ ₹14,999),
  // world 280727 = $249 (→ $199). Both priceIds sit at the STANDING price, so nothing
  // was temporarily raised and nothing has to be lowered again afterwards.
  //
  // ENDING IT — two steps this time, both required:
  //   1. set enabled:false and push;
  //   2. deactivate the OFFER5000 coupon in Learnyst.
  // (The August sale had a third step — dropping a temporarily-raised world price back
  // down. Not needed here: neither priceId was moved. If you DO raise a price for a
  // future sale, that third step comes back and it bites.)
  // The site is static, so the countdown expiring only flips the urgency copy to
  // "sale ended" — the PRICE does not revert on its own.
  sale: {
    // ENDED 7 Sep 2026, 23:59 IST. Torn down 9 Sep: enabled:false + push (step 1).
    // Step 2 (deactivate OFFER5000 coupon in Learnyst) is manual — do it in Learnyst.
    enabled: false,
    name: "Teachers' Day sale",
    endsISO: "2026-09-07T23:59:59+05:30",
    price: {
      india: { now: "₹14,999", list: "₹19,999" },
      world: { now: "$199", list: "$249" },
    },
    off: { india: "₹5,000 off", world: "$50 off" },
    // Entered by the learner at Learnyst checkout. Set to null if a future sale is
    // done by repricing the product instead — the hint then disappears on its own.
    coupon: "OFFER5000",
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
  // flagship. /python's `includes` and FAQ promise Discord access to a ₹2,999 buyer, and
  // the owner confirmed the invite reaches non-flagship buyers. Free-course learners
  // (/claude-code, /linux) are NOT included, so no free course page claims it.
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

  // --- entity links (AEO / SEO) ---
  // Related properties, used for JSON-LD `sameAs` and llms.txt. The .com site is the
  // separate Hindi/Hinglish main site: related, NOT a canonical or a duplicate.
  altSites: {
    hindi: "https://trainwithshubham.com",
  },
  github: "https://github.com/TrainWithShubham",
  // TODO: add the real X/Twitter handle (e.g. "@handle") to emit twitter:site.
  twitterHandle: "TODO_TWITTER_HANDLE",
  // One factual sentence, reused by meta description, JSON-LD and llms.txt so they never
  // drift. Every figure must stay true (golden rule 4); numbers come from this file.
  summary:
    "DevOps: Zero to Hero (AI Powered) is a self-paced, recorded course by Shubham Londhe that takes beginners to production-grade DevOps: Linux, Docker, Kubernetes, Terraform, AWS, CI/CD, observability and Agentic AI.",

  contactEmail: "trainwithshubham.ai@gmail.com",
  // Low-friction secondary CTA (alongside Enroll, never replacing it) — a real
  // number, not a placeholder. Opens WhatsApp in a new tab; no message
  // prefill, so it reads as "talk to a human" rather than a scripted funnel.
  contact: {
    whatsapp: "https://wa.me/918151956340",
  },

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
