# CHANGELOG

Build history for the **DevOps: Zero to Hero (AI Powered)** sales page.
Dates are when the work landed. The repo is the single source of truth; this file
records *what* changed and *why* so future sessions have context.

---

## 2026-06-26 — Palette rebrand: royal purple + yellow (branch `feat/theme-purple-yellow`)

Moved off the teal/coral identity to **royal purple (primary) + yellow (Enroll
CTA)**. On a branch for local review; **not merged/deployed** (live site stays
teal until approved).

- **Tokens renamed to role-based names** in `tokens.css` (no more misleading
  `teal`/`coral` holding other colors): `teal→primary`, `teal-deep→primary-deep`,
  `cyan→accent`, `coral→cta`, `coral-deep→cta-deep`; `signal` (amber) kept.
- **Palette:** `--primary #A78BFA` (light royal violet, text-safe ~7:1) +
  `--primary-deep #7C3AED` (royal purple, fills/gradients only) · `--accent
  #C4B5FD` (lavender, gradients only) · `--cta #FACC15` / `--cta-deep #EAB308`
  (vivid yellow Enroll). Coral fully retired.
- **Mechanical rename** of all utility usages (`text-teal`→`text-primary`, etc.)
  across ~16 components + `var()` refs in keyframes (pulse-ring, cta-pulse,
  grad-pipeline, grad-border, focus ring).
- Verified: build clean · 0 JS · grep gate (zero teal/coral/cyan in src) ·
  contrast (text-primary 7.1:1, CTA ink-on-yellow 12.6:1, all pass) · desktop +
  380px screenshots · code-review subagent (no critical/should-fix).
- Docs synced: BRAND.md §3 table + rules, CLAUDE.md golden rule 5 + quality floor.
- **Open note for review:** amber `--signal` (countdown) now sits adjacent to the
  yellow CTA in the nav + pricing card — close hues; eyeball before merge.

### Follow-up — motion polish (same branch)
- `--accent` brightened `#C4B5FD → #C084FC` (luminous violet) so the hero
  pipeline sweep pops like the old cyan did (the pale lavender had gone flat).
- `PipelineAnim`: sweep gained a soft glow; lit nodes now carry a `0 0 12px` glow
  → the "deploying" pulse reads as light travelling the rail again.
- `Curriculum`: native `<details>` now expand/collapse **smoothly**
  (`::details-content` + `interpolate-size`, graceful fallback to instant snap,
  auto-disabled under `prefers-reduced-motion`); chevron eases + turns purple when
  open. Still 0 JS.

---

## 2026-06-26 — Dual-currency pricing (INR for India)

India now bills in **INR**; rest of world stays **USD**. Restructured `site.ts`
pricing into a currency-aware `price.{india,world}.{early,regular}` object of
pre-formatted display strings (no math done on prices anywhere).

- **India:** early **₹14,999**, regular ~~₹25,000~~ (the struck-through anchor +
  the post-deadline full-price card).
- **World:** early **$199**, regular ~~$249~~ — kept in the screen-reader
  breakdown + at Learnyst checkout (golden rule 6 transparency); not shown
  visually, so the box leads with a single currency.
- **Buttons are now price-free:** "Pay · India" (flag) / "Pay · Global" (globe).
  Prices left the buttons per owner request; region is still explicit.
- SR price sentences built as frontmatter strings to dodge Astro's
  whitespace-trim-around-`{expr}` gotcha. Build clean, 0 JS.

---

## 2026-06-26 — Review pass (hero, nav, flow, pricing, voice)

Seven owner-requested refinements:
1. Hero: removed the "Early bird $149/$199 · $249" price line (price lives in the
   box) + dropped the tagline from the subhead.
2. Nav: bigger logo (44→56px), taller nav (h-16→h-20).
3. IA: Audience ("Is this you?") moved to **just before Pricing**.
4. New `EnrollNudge` — a gently pulsing "Enroll now" right after the Curriculum
   (`.pulse-cta`, reduced-motion-safe) → `#pricing`.
5. Pricing box **centered/symmetric** (eyebrow, "from $149" anchor, centered
   countdown, centered inclusions block w/ left-aligned items); inclusions add
   "20+ live sessions with the instructor" + "12+ doubt-clearing sessions (weekly,
   Wednesdays)"; buttons renamed **Pay · India** / **Pay · Global**.
6. Tagline → **"Happy Learning"** everywhere (footer/instructor/finalCTA);
   "Production-grade DevOps. Not demos." retired from the page.
7. Footer line → **"Made in India 🇮🇳 for the world 🌐"**.
Also: extracted `FlagIndia`/`Globe` primitives (reused in buttons + footer);
removed FinalCTA's now-redundant price recap. Lighthouse 100/100/100/100, 0 JS.

## 2026-06-26 — Region pay buttons + simplified price box

Reworked the pricing box so two prices don't compete/confuse (aiengg-inspired).
The price block now leads with one anchor ("from $149 · regularly $̶2̶4̶9̶") instead
of two side-by-side numbers; exact per-region prices live on the buttons. The two
Enroll CTAs are now clear region selectors: **🇮🇳 Pay for India · $149** (inline
tricolor flag chip) and **🌐 Pay · Rest of world · $199** (monochrome globe).
Flag is a small aria-hidden functional exception (real colors needed); globe is
`currentColor`. Each button has an explicit `aria-label` (clean SR name). Checkout
URLs/priceId/data-region unchanged. Code-review ship-ready; Lighthouse
100/100/100/100, 0 JS.

## 2026-06-26 — Live Learnyst checkout wired (dual region)

The Enroll path is live. `site.ts` now has `checkout: { india, world }` (two
Learnyst fast-checkout URLs with `priceId`s). New `EnrollButtons.astro` renders
two region CTAs ("Enroll · $149 India" / "$199 Outside India") — shown to
everyone, learner self-selects (no IP geo-switch, golden rule 6) — used in
Pricing + FinalCTA. Generic top CTAs (Nav/Hero) now jump to `#pricing`. The
BaseLayout handler preserves the existing `?priceId` while appending UTM + `src`,
and fires `enroll_click` with a `region` dimension (analytics-ready). Code-review:
ship-ready, priceId preserved, correct URL per region, `rel="noopener"`, 0 JS,
Lighthouse unaffected. `README`/`ARCHITECTURE` updated.

## 2026-06-26 — Company logos in the marquee (monochrome + wordmark fallback)

Upgraded the marquee from text wordmarks to real **monochrome** brand logos for
brand recall (Linear/Vercel/Stripe style — single-color, on-brand, not rainbow).
New `primitives/CompanyLogo.astro`: 6 hand-vendored single-path Simple-Icons logos
(Google, Mastercard, Red Hat, Accenture, Volkswagen, HSBC) rendered
`fill="currentColor"`; everything else (Amazon, Infosys, OpenText, TCS, HCL,
Coforge, Aditya Birla, Securonix, FarEye, 42Gears) falls back to a clean
wordmark. Infosys/OpenText deliberately use wordmarks (their detailed logos were
illegible at marquee size). Logos `role="img"` (suppressed under the aria-hidden
marquee; the sr-only list carries names). Lighthouse 100/100/100/100, CLS 0.001,
0 JS. **Open: trademark sign-off — monochrome nominative use is the defensible
posture, but Mastercard/VW/HSBC are aggressive enforcers; can drop any to its
wordmark fallback at zero cost.**

## 2026-06-26 — "Our learners now work at" marquee

Added `LogoMarquee.astro` — a CSS-only auto-scrolling **wordmark** strip of real
alumni employers (`companies.json`: Amazon, Google, Mastercard, Red Hat,
Accenture, Volkswagen, HSBC, Infosys, TCS, HCL, OpenText, Coforge, Aditya Birla,
Securonix, FarEye, 42Gears — owner-confirmed real). Placed right after Reviews.
Monochrome wordmarks (BRAND §6, trademark-safe nominative use); pauses on hover;
static wrapped row under `prefers-reduced-motion`; track decorative/`aria-hidden`
with one `sr-only` list for screen readers. Per-item spacing (not flex `gap`) so
the duplicated track loops seamlessly (no off-by-one-gap seam). Zero JS,
Lighthouse 100/100/100/100.

## 2026-06-26 — Student testimonials (Phase B)

Replaced the 5 text-only Google review cards with **6 real, consented learner
testimonials** (photo + role + company): Beethika Saini Thakur (Mastercard),
Muhammad Usman Arif (Inovio Tech), Priyanka Pardeshi (Red Hat), Debabrata Puhan
(Accenture), Mahesh Bagul (Volkswagen), Vaibhav Mane (Securonix).
- Photos pulled from the owner-shared, consented Drive folder; cropped to faces
  and optimized to 200² JPG via `sharp` (EXIF/GPS stripped) → `public/students/`.
- `reviewSchema`: `url` + `dateLabel` now optional; `Reviews.astro` shows the
  per-card "Read on Google" link only when a `url` exists.
- The aggregate **4.9★/232** rating stays as a standalone link-out badge,
  reworded ("reviews on Google →") so it doesn't imply the cards are Google
  reviews (golden rule 4). Section sits at #3 (proof leads); first-row avatars
  eager-loaded. Quotes are the students' own words (two non-native ones lightly
  grammar-tidied, meaning preserved). Lighthouse 100/100/100/100, 0 JS.

## 2026-06-24 — Tool logos (ToolIcon)

Added monochrome teal tool logos for scannability. New
`src/components/primitives/ToolIcon.astro` — ~19 hand-vendored single-path SVGs
(Simple Icons, CC0; AWS = neutral cloud since Amazon's mark was removed),
`fill="currentColor"`, tinted teal, `aria-hidden`; renders nothing for non-tool
tags (conceptual tags stay text). Wired as icon+label chips in **Curriculum**
tags, **ToolWall** tiles (replaced the dot), and **Projects** tags (44 instances).
No icon megapack — only the icons we use are inlined. Build clean, **0 JS**,
**Lighthouse 100/100/100/100** (47.9 KB gzip total, CLS 0.001). `BRAND.md §6`
documents the system + trademark/nominative-use stance.

## 2026-06-24 — Dropped Outcomes section

Removed the `Outcomes` capability-cards section from the page to reduce text
density (it overlapped Curriculum + Projects). `Outcomes.astro` + `outcomes.json`
kept dormant (not composed) for easy re-add; `ARCHITECTURE.md §4` updated.

## 2026-06-24 — Section resequence (conversion order)

Benchmarked section order vs aiengg.dev: testimonials belong early (proof), price
late. Moved **Reviews** from #12 (after Pricing) up to **#3, right after
TrustBar**, so the page now flows hook → proof (TrustBar + Reviews) → desire →
price → FAQ → final CTA. One reorder in `index.astro`; components unchanged.
`ARCHITECTURE.md §4` updated to the new IA (and Credential added to the list).

## 2026-06-24 — Vibrancy pass (Phase A)

Benchmarked against aiengg.dev; made the dark theme more vibrant/welcoming while
staying premium. Lighthouse held **100/100/100/100**, 0 JS bundles.

- **Depth/texture** (`tokens.css`): `.surface-card` (top sheen + soft shadow) on
  all content cards; teal `.grad-border` on the Pricing + Credential anchor cards
  (with surface-bg fallback for no-`color-mix`); a faint page `.grain` overlay
  (`BaseLayout`, z-index:-1 so it can't affect contrast; page bg moved to `html`).
- **Energy accent**: added `--cyan #38E0E8` + `--grad-pipeline` (teal→cyan), used
  only in the Hero/pipeline. Coral still CTA-only.
- **Hero**: dual ambient glow (teal + amber) over a masked pipeline grid; new
  `PipelineAnim.astro` — a CSS-only "deploying" pipeline (commit→production), the
  one bold motion moment. Reduced-motion → static; labels hidden ≤400px.
- **Human warmth (honest)**: review cards + instructor now show avatars — real
  `photo` when provided, else a monogram from the real name (no fake faces).
  `reviewSchema` gained optional `photo/role/company/location/outcome` (rendered
  only when present) — ready for real student data.
- **Phase B (instructor)**: wired Shubham's real headshot into the Instructor
  card (replaces the monogram). Optimized from the original HEIC via `sharp` →
  `public/instructor-shubham.{webp,jpg}` (600², ~27/39KB), `<picture>` webp+jpg,
  lazy, no CLS. Student photos still pending. (`sharp` added as a devDependency.)
- **Motion (reduced-motion-gated)**: CSS scroll-reveal on sections
  (`animation-timeline: view()`, never a content-trap), card hover lifts, a single
  "live" pulse on the production node.
- **Chrome/trust**: glassier sticky nav (`backdrop-blur-xl`, `@supports`
  fallback); Pricing trust row with confirmed signals only (4-yr recordings +
  verifiable credential — no invented guarantee).
- **Docs**: `BRAND.md` §3/§5 evolved to sanction cyan accent, dual glow, surface
  depth/grain, gradient borders, and the motion budget.

## 2026-06-24

### Skills & tooling
- Installed project skills (global `~/.claude/skills/`): `astro`,
  `tailwind-design-system`, and the `addyosmani/web-quality-skills` bundle
  (`accessibility`, `performance`, `core-web-vitals`, `seo`, `best-practices`,
  `web-quality-audit`). Pre-existing `frontend-design` + `web-design-guidelines`
  reused. Documented in `CLAUDE.md` § Skills.

### Stack decisions (latest, with graceful fallback)
- **Astro 7** (static) + **Tailwind v4** (CSS-first `@theme` in
  `src/styles/tokens.css`; no `tailwind.config` file, wired via
  `@tailwindcss/vite`). Documented in `CLAUDE.md` § Modern stack and
  `ARCHITECTURE.md`.
- Build hardening: `inlineStylesheets: "always"` (single page → no render-blocking
  CSS request); self-hosted fonts via `@fontsource` latin subsets; LCP headline
  font (Space Grotesk 700) preloaded.

### Scaffold
- `site.ts` (single source of truth), `tokens.css`, `content.config.ts`,
  `BaseLayout` (head/OG/meta, fonts, GA4 + Meta Pixel slots gated on real IDs,
  UTM capture + enroll-click attribution), thin `index.astro`. `reviews.json`
  moved to `src/content/`. `public/CNAME`, favicon, OG image + reusable
  `scripts/generate-og.mjs` (`@resvg/resvg-js`).

### Sections built (full IA, §8 steps 2–6), each via a code-review subagent pass
- Primitives (Eyebrow, StatusDot, Button, Section), **Countdown** (the only JS
  island — one inlined script drives all mounts; flips to full price on expiry),
  Nav, Hero, Pricing, Curriculum (the signature pipeline), TrustBar, Audience,
  Outcomes, Projects, ToolWall, Instructor, Reviews (real seeded Google reviews),
  FAQ, FinalCTA, Footer.

### Positioning (per Shubham)
- Removed the "one-off batch / never repeats" framing and the "2+ years"
  experience gate → welcoming, all-levels, zero-to-hero. Updated `CLAUDE.md`,
  `BRAND.md`, `ARCHITECTURE.md` voice/audience accordingly.
- Hero badge → `DevOps - Zero To Hero [AI Powered Live Classes]`.
- Logo enlarged (44px) and optimized (300px/24KB → 96px/11.5KB).

### Curriculum — cross-verified against Batch 11 schedule
- Rewrote `curriculum.json` from 8 → **11 stages** to mirror the real live-class
  schedule, adding a dedicated **Agentic AI for DevOps** stage, plus Introduction
  to DevOps, Networking & system design, DevSecOps, Ansible, and Capstone + job
  assistance.
- `inclusions.json` corrected: **4-year** recordings, "10+ mini-projects + a
  capstone", added Agentic AI and job assistance.

### Schedule
- `site.ts`: `classDays: "Sat & Sun"`, `classTime: "8–10 PM IST"` (weekends, 8–10
  PM IST). Hero schedule line and FAQ now render this; FAQ answers support
  `{classDays}`/`{classTime}`/`{batchStart}` tokens resolved from `site.ts` so the
  schedule stays single-source.

### Content validation (made real)
- Added `src/content/data.ts`: every content JSON is parsed through its zod schema
  at build (`curriculum`, `outcomes`, `projects`, `faq`, `audience`, `tools`,
  `inclusions`); `reviews` validated via its Astro content collection. A malformed
  edit now **fails the build** with a ZodError instead of shipping broken.

### Source-of-truth policy (ARCHITECTURE.md §2, CLAUDE.md golden rule 8)
- The page renders only from repo data. External sheets/docs (e.g. the team's
  "Batch N" Google Sheet) are authoring references — never embedded, iframed, or
  fetched at build/runtime.

### SEO / copy
- Meta description reworded to the new positioning (product + AI-powered live
  classes + key tools incl. Agentic AI), trimmed to ~153 chars; used for
  description + og:description + twitter:description.
- Hero badge shortened to `DevOps - Zero To Hero [Live]` (was the longer
  "[AI Powered Live Classes]" — too long, redundant with the H1).

### Credential section
- Added `Credential.astro` (between ToolWall and Instructor) featuring the
  **TrainWithShubham DevOps Engineer (Associate)** badge, served locally at
  `public/credential-devops-engineer.png`. Framed honestly as a TWS-issued,
  verifiable/shareable credential — not an external/vendor certification
  (golden rule 4). Reused the `Eyebrow` primitive.
- `inclusions.json` "Certificate of completion" → "Verifiable DevOps Engineer
  (Associate) credential"; FAQ "certificate" answer updated to match.
- Linked the badge to its public verification page —
  `credentialUrl` added to `site.ts` (single source of truth); badge wraps in an
  external link (`rel="noopener noreferrer"`) with a "verify this credential ↗"
  affordance, gated on the URL being set. Linked image uses empty alt (caption is
  the label) for a clean screen-reader name.

### Deploy & quality
- `.github/workflows/deploy.yml` (Actions → GitHub Pages) + `README.md`
  (edit/deploy/DNS notes).
- **Lighthouse (desktop, clean profile): Performance 100 · Accessibility 100 ·
  Best Practices 100 · SEO 100.** FCP 0.4s · LCP 0.4s · TBT 0ms · CLS 0.001.
  Zero external JS bundles.

### Still pending (owner-provided values, not code)
- `site.ts` TODOs: `checkoutUrl` (Learnyst), `ga4Id`, `metaPixelId`,
  `refundPolicy`, `googleProfileUrl`.
- Confirm seeded content (curriculum, inclusions, audience, outcomes, projects,
  tools, faq) against the real offering.
- Real designed OG image + favicon (on-brand placeholders in place).
