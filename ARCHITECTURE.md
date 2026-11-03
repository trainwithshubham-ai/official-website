# ARCHITECTURE.md — Modular Build Plan

How the site is structured so that (a) Claude Code can build it section-by-section
without re-reading the whole repo, and (b) Shubham can update prices, dates, and
the checkout URL by editing **one file**, never markup.

Stack: **Astro 7 + Tailwind v4**, static output, deployed to apex
`trainwithshubham.ai` via **GitHub Actions**. No backend, no database, no client
framework. The only JavaScript that ships is the countdown, the VideoTeaser
facade and the UTM helper (see §5). Tailwind v4 is
CSS-first: configured via `@tailwindcss/vite` with tokens in `tokens.css` — there
is no `tailwind.config` file.

---

## 1. The one rule: single source of truth

Every value that changes — price, the sale deadline, course format figures, the
checkout link, social counts, contact email — lives in **`src/config/site.ts`**. Components
import from it. **Nothing volatile is ever hardcoded in a component.**

```ts
// src/config/site.ts
export const site = {
  domain: "https://trainwithshubham.ai",
  brand: "TrainWithShubham",
  product: "DevOps: Zero to Hero (AI Powered)",
  tagline: "Happy Learning",

  // --- course format (self-paced, recorded) ---
  videoHours: "150+",
  access: "4 years",

  // --- sale (the only timer on the default page; enabled:false = no timer) ---
  sale: { enabled: false, name: "…", endsISO: "…", price: { … }, coupon: "…" },

  // --- pricing (pre-formatted display strings, India + world) ---
  price: {
    india: { now: "₹19,999", list: "₹25,000" },
    world: { now: "$249", list: "$299" },
  },

  // --- conversion ---
  checkout: { india: "…", world: "…" }, // two Learnyst checkout URLs (per region)
  refundPolicy: "TODO — confirm money-back terms",

  // --- proof (established TWS brand) ---
  studentsTrained: "10,000+",
  googleRating: 4.9,
  googleReviewCount: 260,
  googleReviewUrl:  "https://g.page/r/CdJiTEIAtbNpEAI/review", // "Rate us on Google" CTA
  googleProfileUrl: "TODO_PUBLIC_GOOGLE_PROFILE_URL",         // badge → "read all reviews"
  social: {
    youtube:  { url: "https://www.youtube.com/@TrainWithShubham",        label: "1.5 Lakh+" },
    linkedin: { url: "https://www.linkedin.com/in/shubhamlondhe1996",    label: "1 Lakh+"   },
    instagram:{ url: "https://www.instagram.com/trainwithshubham__",     label: "10,000+"   },
  },
  // English-venture handles for "follow our English content" CTAs
  englishSocial: {
    youtube:   "https://www.youtube.com/@TrainWithShubhamAI",
    instagram: "https://www.instagram.com/trainwithshubham.ai",
  },

  contactEmail: "trainwithshubham.ai@gmail.com",

  // --- analytics ---
  ga4Id: "TODO_GA4_ID",
  metaPixelId: "TODO_META_PIXEL_ID",
} as const;
```

When the checkout URL changes, it's a one-line change. When a sale's end moves,
it's one timestamp (`sale.endsISO`).

---

## 2. Content lives in data, not markup

All repeating content is JSON in `src/content/`, validated by zod at build.
Shubham edits JSON; components map over it.

- `reviews.json` is an **Astro content collection** (zod schema in
  `src/content.config.ts`, the Astro 5+ Content Layer location).
- The other JSON files are validated in **`src/content/data.ts`**, which parses
  each through its exported zod schema at build and re-exports typed data.
  Components import from `content/data` (not the raw JSON). A malformed edit
  fails the build with a clear error instead of shipping broken.
- FAQ answers are plain text with no tokens; `FAQ.astro` renders `faq.json` as is.

```
src/content/
  curriculum.json    # [{ stage, label, title, bullets[], tags[] }]
  outcomes.json      # [{ title, body }]              (3–4 cards)
  projects.json      # [{ title, desc, tools[] }]     (6+ projects)
  tools.json         # [{ name, logo }]               (tool wall)
  inclusions.json    # ["4-yr access", "150+ hrs of recordings", ...]
  faq.json           # [{ q, a }]
  reviews.json       # [{ name, rating, dateLabel, text, url }]  ← REAL Google reviews (seeded)
  audience.json      # { forYou[], notForYou[] }
```

**Content integrity:** `reviews.json` is seeded with **real Google reviews**
(4.9 ★ · 260 total) — name, rating, date, text, and the reviewer's Google
contributor link. Never invent or edit reviews; cards show a trimmed excerpt
that links to the full review on Google. If a review field is ever blank, the
component omits that card rather than fabricating content.

### Curriculum and format — source of truth

The page renders **only from data committed to this repo** — never from an
external sheet or doc at build or runtime:

- **Curriculum (topics/modules)** → `src/content/curriculum.json`. A *curated
  marketing view* of the course, not a raw dump of the ops timetable.
- **Course format shown on the page** (recorded hours, access term, sale
  deadline) → `src/config/site.ts`.
- **Lesson-level detail** is operational. It stays on Learnyst, **not** on this
  sales page.

Any external planning spreadsheet or doc is an **internal reference only**. We do
**not** embed, iframe, or fetch it:

- No backend/JS budget for a live embed; an iframe breaks the dark/premium brand,
  the 380px layout, Lighthouse ≥95 and accessibility.
- A public sheet would expose other tabs/columns and can silently break
  (sharing changes, format drift, rate limits) on a conversion page.
- Repo data is versioned, diffed, zod-validated on build, reviewable and
  instantly revertable.

To update: edit the repo JSON / `site.ts` and push to `main`; the Actions
workflow redeploys. **Author/plan in the spreadsheet; publish from the repo.**
We deliberately avoid an auto-sync: an ops sheet's shape doesn't map cleanly to
the curated page model, so a parser would be brittle.

---

## 3. Folder structure

```
trainwithshubham-ai/
├─ public/
│  ├─ logo.png                 # downloaded TWS mark
│  ├─ favicon.ico, favicon-32.png, favicon-192.png, apple-touch-icon.png
│  ├─ posters/<slug>.jpg       # 1280×720 course poster = the OG/social card
│  │                           # (+ .webp and -640.webp via scripts/generate-posters.mjs)
│  └─ CNAME                    # "trainwithshubham.ai"
├─ src/
│  ├─ config/site.ts           # SINGLE SOURCE OF TRUTH
│  ├─ content/                 # JSON data files (reviews.json, …)
│  ├─ content.config.ts        # zod content-collection schemas (Astro 5+ location)
│  ├─ styles/tokens.css        # CSS vars + Tailwind v4 @theme (BRAND.md §3–4)
│  ├─ layouts/BaseLayout.astro # <head>, meta/OG, fonts, GA4 + Pixel, UTM capture
│  ├─ components/
│  │  ├─ primitives/
│  │  │  ├─ Button.astro       # variants: primary(yellow CTA) | ghost(purple)
│  │  │  ├─ Section.astro      # consistent vertical rhythm + eyebrow slot
│  │  │  ├─ Eyebrow.astro      # mono "❯ label"
│  │  │  └─ StatusDot.astro
│  │  ├─ Countdown.astro       # the ONLY interactive island (see §5)
│  │  ├─ Nav.astro
│  │  ├─ Hero.astro
│  │  ├─ TrustBar.astro
│  │  ├─ Audience.astro
│  │  ├─ Outcomes.astro
│  │  ├─ Curriculum.astro      # the pipeline (see BRAND.md §2)
│  │  ├─ Projects.astro
│  │  ├─ ToolWall.astro
│  │  ├─ Instructor.astro
│  │  ├─ Pricing.astro
│  │  ├─ Reviews.astro         # Google reviews + 4.9★ badge (see BRAND.md)
│  │  ├─ FAQ.astro
│  │  ├─ FinalCTA.astro
│  │  └─ Footer.astro
│  └─ pages/index.astro        # composes the sections in IA order
├─ .github/workflows/deploy.yml
├─ astro.config.mjs            # site: site.domain + @tailwindcss/vite plugin
│                              # (Tailwind v4 is CSS-first — NO tailwind.config file;
│                              #  theme tokens live in src/styles/tokens.css @theme)
├─ CLAUDE.md
├─ BRAND.md
└─ ARCHITECTURE.md
```

---

## 4. Page composition (IA order)

`index.astro` is a thin file that imports and stacks these, in order:

1. `Nav` — sticky, scroll-aware. Carries a sale row with a compact `Countdown`
   only while `site.sale.enabled`; otherwise no timer.
2. `Hero` — badge (DevOps · Zero to Hero), H1, subhead, self-paced line
   (`videoHours`, `access`), animated pipeline, dual CTA (`Button` yellow CTA + ghost). No price line.
3. `TrustBar` — `studentsTrained` (10,000+) + **4.9 ★ · 260 Google reviews**
   badge + social counts.
4. `LogoMarquee` — "our learners now work at" CSS-only auto-scrolling wordmark
   strip from `companies.json` (real alumni employers only); pauses on hover,
   static row under `prefers-reduced-motion`. Zero JS. Sits between TrustBar and
   Reviews so proof escalates: stats → logos → testimonials.
5. `Reviews` — **learner testimonials** from `reviews.json` (real photo +
   role/company + the student's own quote; honest monogram fallback). Headed by a
   standalone **4.9 ★ · 260 reviews on Google →** link-out badge (kept separate so
   it doesn't imply the cards are Google reviews). **Proof leads — testimonials
   before price.**
6. `Curriculum` — the pipeline. Stages from `curriculum.json` (with per-stage tool
   logos). Accordion via native `<details>` (zero JS).
7. `EnrollNudge` — slim payoff CTA right after the curriculum: a gently pulsing
   "Enroll now" → `#pricing` (`.pulse-cta`, reduced-motion-safe). Zero JS.
8. `Projects` — 6+ project cards.
9. `ToolWall` — `tools.json` tile grid (monochrome logos).
10. `Credential` — the verifiable DevOps Engineer (Associate) badge, linked to its
    public verification page.
11. `Instructor` — Shubham (real photo), "Hello Dosto" note, socials.
12. `Audience` — "this is for you / not for you" two-column. **Placed right before
    Pricing — last qualifier before the price.**
13. `Pricing` — **centered/symmetric** card: leads with the India price ("now
    ₹19,999 · list ₹2̶5̶,̶0̶0̶0̶"), one currency on screen (no competing numbers).
    The world price ($249) lives in the screen-reader breakdown + at
    checkout (golden rule 6 transparency). Sale `Countdown` only while a sale runs;
    `inclusions.json`,
    trust row, and two **price-free** region CTAs (`EnrollButtons` → flag/globe →
    `site.checkout.india` / `site.checkout.world`, UTM-appended). **Late.**
14. `FAQ` — `faq.json`, native `<details>`.
15. `FinalCTA` — closing band + `EnrollButtons` (no separate price
    line).
16. `Footer` — legal, socials, contact, "Made in India 🇮🇳 for the world 🌐".

> `Outcomes` (capability cards) was removed from the page to cut text density /
> redundancy with Curriculum + Projects. `Outcomes.astro` + `outcomes.json` are
> kept dormant (not composed) for easy re-add.

**Conversion order:** hook (Hero) → proof (TrustBar + logos + Reviews) → value
(Curriculum → mid-page Enroll nudge → Projects/Tools/Credential/Instructor) →
qualify (Audience) → price (Pricing) → objections (FAQ) → final push (FinalCTA).
Proof leads, price comes after value is built.

Each component is independently buildable and reads only `site.ts` + its own
JSON file. That's the modularity contract: **one component, one data source,
no cross-talk.**

---

## 5. Interactivity budget (almost none)

- **`Countdown.astro`** is the single client island. Vanilla TS, no framework.
  - Fixed-deadline only. The required `deadline` prop is an ISO string from
    `site.ts` (e.g. `site.sale.endsISO`); there is no default deadline and no
    daily or session mode. Variants: `full`, `chip`, `marker`.
  - Ticks once/sec, renders `dd hh mm ss` in mono. The script ticks all
    `[data-countdown]` nodes from one `setInterval`.
  - On expiry it toggles `data-expired` on a root element and the label flips to a
    calm ended state. CSS handles the visual swap so there is no layout shift and
    it works even if JS is slow. It never resets or invents a new deadline.
  - On the default page the only mount is the sale marker. With
    `site.sale.enabled:false` there is no timer at all.
- **`VideoTeaser.astro`** is the ONE sanctioned exception (owner decision, 14 Aug 2026).
  A course page lives or dies on "show me the teaching before I sign up", and the
  alternative — linking out to YouTube — hands the viewer a sidebar full of competitors
  at the moment we are trying to convert them. It is a **click-to-load facade**: a local
  poster image plus a play button, and *nothing* loads from YouTube until the visitor
  clicks. So it costs no third-party request, no cookie and no LCP on load, and the fixed
  16:9 box means the player swap causes zero layout shift. It ships as a real link
  (`fallbackHref`), so with JS blocked the teaser still plays — it just opens YouTube in
  a new tab. Uses `youtube-nocookie.com`. Roughly fifteen lines, delegated, emitted once
  per page and tree-shaken entirely when no course on the page has a video.
  **Do not add a third island without the same level of justification.**
- **Accordions** (Curriculum, FAQ) use native `<details>/<summary>` — zero JS.
- **Scroll reveals** (optional): CSS-only or a 1–2KB IntersectionObserver, gated
  behind `prefers-reduced-motion`. Skippable for v1.

If a section seems to "need React," it doesn't. Push back to static.

---

## 6. Attribution without a backend

The page has no database, but attribution still works:

- `BaseLayout` reads incoming `utm_*` params on load and stores them in
  `sessionStorage`.
- Every `[data-enroll]` CTA appends those params (plus a `src=site` marker) to the
  region checkout URL at click time — preserving the existing `?priceId` — so the
  UTM carries into Learnyst's checkout and shows up in Learnyst/GA reporting.
- GA4 + Meta Pixel fire from `BaseLayout`; an `enroll_click` event (with a
  `region` of `india`/`world`) is sent on CTA click for funnel tracking and Pixel
  retargeting of reel traffic. Generic top CTAs (Nav/Hero) jump to `#pricing`
  rather than checkout, since the price tier is chosen there.
- **Region guess (timezone, never IP).** A third tiny inline script reads the
  browser timezone (`Asia/Kolkata|Asia/Calcutta` → `india`, else `world`) and sets
  `data-region-guess` on each `[data-enroll-group]`. CSS then *only* emphasises the
  likely-correct Enroll button and personalises the welcoming geo-pricing note —
  both prices stay fully visible and are never switched (golden rule 6). The
  geo-restricted Learnyst checkouts (India `priceId` ≠ world) open in a **new tab**
  so a wrong-region click is recoverable (the sales page stays put). Degrades
  silently: no JS → both buttons equal, neutral note, new tab still works.

---

## 6b. Agent and search discovery (AEO)

Everything an answer engine or agent reads is generated from the same data as the pages:

- `src/lib/markdown.ts` is the single builder. `src/pages/llms.txt.ts`, `llms-full.txt.ts`,
  `index.md.ts`, `courses.md.ts` and `[slug].md.ts` are thin endpoints over it, so the
  markdown can never disagree with the page. Draft courses are excluded (`isDraftCourse`).
- `BaseLayout.astro` links each page to its `.md` twin only when one exists.
- `StructuredData.astro` emits one `@graph` per page type (Organization/EducationalOrganization,
  Person, WebSite, Course, FAQPage, BreadcrumbList, ItemList) with stable `@id`s.
- `public/robots.txt` allows all crawlers on purpose; `@astrojs/sitemap` lists indexable
  routes only (no `/brand`, no drafts).
- `trainwithshubham.com` (Hindi) is related via `sameAs` only. No hreflang until real
  page-to-page pairs exist.

## 7. Deploy module

- `public/CNAME` = `trainwithshubham.ai`. `astro.config.mjs` sets
  `site: "https://trainwithshubham.ai"`.
- `.github/workflows/deploy.yml`: on push to `main` → `npm ci` → `astro build`
  → `actions/upload-pages-artifact` → `actions/deploy-pages`. GitHub Pages set to
  "GitHub Actions" source.
- **GoDaddy DNS** (documented in README): apex A-records → GitHub Pages IPs
  (`185.199.108–111.153`); `www` CNAME → `<user>.github.io`. Enable "Enforce HTTPS"
  after DNS propagates.

---

## 8. Build order for Claude Code

Ship and review in this sequence (matches Shubham's "one section at a time"):

1. Scaffold: Astro 7 + Tailwind v4 (via `@tailwindcss/vite`, no config file) +
   `tokens.css` (`@theme`) + `site.ts` + `content.config.ts` + `BaseLayout` +
   self-hosted fonts. ✅ done — `npm run dev` boots a clean shell at :4321.
2. `primitives/*` + `Nav` + `Hero` + `Countdown` — the design system made real.
3. `Pricing` (it's the conversion core; build it early, wire the placeholder CTA).
4. `Curriculum` (the signature pipeline).
5. `TrustBar`, `Audience`, `Outcomes`, `Projects`, `ToolWall`, `Instructor`.
6. `Reviews` (seeded from `reviews.json`), `FAQ`, `FinalCTA`, `Footer`.
7. Analytics + UTM forwarding + OG image + favicon.
8. Lighthouse pass against the §9 quality floor in BRAND.md, then deploy.
