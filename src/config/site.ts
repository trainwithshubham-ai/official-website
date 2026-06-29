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
  batchStartISO: "2026-07-26T20:00:00+05:30",
  classDays: "Sat & Sun",
  classTime: "8–10 PM IST",

  // --- scarcity ---
  earlyBirdEndsISO: "2026-07-03T23:59:00+05:30", // real macro deadline (countdown target)

  // --- daily bonus (honest "evergreen") ---
  // A REAL, repeatable bonus: enroll on any given day (before midnight IST) and
  // get the ebook. The bonus timer counts to TONIGHT'S midnight IST and genuinely
  // rolls each day — a real end-of-day deadline, NOT a fake per-visit 24h reset
  // (golden rule 6). Set enabled:false to remove it instantly.
  bonus: {
    enabled: true,
    name: "#90DaysOfDevOps ebook",
    blurb: "Enroll today and get the #90DaysOfDevOps ebook — free.",
    // TODO: confirm delivery (Learnyst auto-grant on enrollment / emailed link).
  },

  // --- pricing ---
  // India bills in INR, rest of world in USD — shown transparently (no IP
  // geo-switch, golden rule 6). The page LEADS with the India price; the world
  // price stays in the screen-reader text and at Learnyst checkout. `regular` is
  // the pre-early-bird list price: the struck-through anchor now, and the
  // post-deadline full-price card after the window closes. Pre-formatted display
  // strings (currency symbol included) — no math is done on these anywhere.
  price: {
    india: { early: "₹14,999", regular: "₹25,000" },
    world: { early: "$199", regular: "$249" },
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

  // --- proof (established TWS brand) ---
  studentsTrained: "10,000+",
  googleRating: 4.9,
  googleReviewCount: 232,
  googleReviewUrl: "https://g.page/r/CdJiTEIAtbNpEAI/review", // "Rate us on Google" CTA
  googleProfileUrl: "TODO_PUBLIC_GOOGLE_PROFILE_URL", // badge → "read all reviews"
  // public verification page for the DevOps Engineer (Associate) credential
  credentialUrl: "https://credentials.certdirectory.io/o/trainwithshubham",
  social: {
    youtube: { url: "https://www.youtube.com/@TrainWithShubham", label: "1.5 Lakh+" },
    linkedin: { url: "https://www.linkedin.com/in/shubhamlondhe1996", label: "1 Lakh+" },
    instagram: { url: "https://www.instagram.com/trainwithshubham__", label: "10,000+" },
  },
  // English-venture handles for "follow our English content" CTAs
  englishSocial: {
    youtube: "https://www.youtube.com/@TrainWithShubhamAI",
    instagram: "https://www.instagram.com/trainwithshubham.ai",
  },

  contactEmail: "trainwithshubham.ai@gmail.com",

  // --- analytics ---
  ga4Id: "TODO_GA4_ID",
  metaPixelId: "TODO_META_PIXEL_ID",
} as const;
