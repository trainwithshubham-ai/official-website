# CLAUDE.md

Operating manual for this repository. Read this first, every session. It points
to **BRAND.md** (identity) and **ARCHITECTURE.md** (structure). When in doubt,
those two files win over your instincts.

---

## Project

A single-page, dark-theme, conversion-focused **sales page** for one product:
**DevOps: Zero to Hero (AI Powered)** — a cohort batch that starts
**26 Jul 2026**. The page's only job: convert a motivated learner — anyone from
a complete beginner to a working engineer — into an enrolled student before the
early-bird window closes (**3 Jul 2026, 23:59 IST**). The course is **zero to
hero**: welcoming, no prior experience required.

- Hosted on **GitHub Pages**, apex `trainwithshubham.ai`. Static. No backend.
- Courses live on **Learnyst** (separate). This page only sells and links out.
- Positioning, in three words: **production-grade, not demos.** Filter every
  word and pixel through it.

## Stack

- **Astro 7** (static output) + **Tailwind CSS v4** (CSS-first, no config file) +
  **TypeScript**.
- Tailwind v4 is wired via `@tailwindcss/vite`; design tokens live in
  `src/styles/tokens.css` under an `@theme` block — there is **no
  `tailwind.config` file**.
- Fonts self-hosted via `@fontsource` (Space Grotesk, Inter, JetBrains Mono),
  imported in `BaseLayout.astro`.
- Deploy: **GitHub Actions** → GitHub Pages.
- The only runtime JS that ships is the **Countdown** (+ the tiny inline
  UTM-capture helper in `BaseLayout`, ARCHITECTURE.md §6). Nothing else.
- See **§ Modern stack & web-platform baseline** below for the trends/best
  practices this project commits to.

## Commands

```bash
npm install          # install
npm run dev          # local dev (localhost:4321)
npm run build        # static build → ./dist
npm run preview      # preview the build
# deploy = push to main; the Actions workflow builds & publishes
```

---

## Golden rules

1. **Single source of truth.** Every price, date, deadline, URL, count, and email
   lives in `src/config/site.ts`. **Never hardcode these in a component.** If you
   need a volatile value, import it from `site.ts`. If it's missing, add it there.
2. **No backend, no database, no client framework.** Don't reach for React/Vue.
   Astro components are static HTML. Interactivity budget is the countdown only
   (see ARCHITECTURE.md §5). Accordions use native `<details>`.
3. **Content lives in JSON** under `src/content/`, validated by zod at build
   (`reviews` via its content collection; the rest via `src/content/data.ts`,
   which components import instead of the raw JSON — a malformed edit fails the
   build). Components map over data; they don't carry hardcoded copy lists.
4. **Never fabricate proof.** Do not invent reviews, student names, companies,
   salary numbers, or stats. Use only real values: `10,000+` trained, the real
   social counts, and the **real Google reviews seeded in `reviews.json`**
   (4.9 ★ · 232). Show review cards as trimmed excerpts that link to the full
   review on Google; never edit a reviewer's words into something they didn't say.
   If content is missing, omit it — don't invent.
5. **Yellow (`--cta`) is for the Enroll CTA only.** Purple (`--primary`) is
   structural; use light `--primary` (#A78BFA) for text/icons and deep
   `--primary-deep` (#7C3AED) only for fills/gradients. Amber (`--signal`) is
   urgency. See BRAND.md §3. Don't introduce colors outside the palette.
6. **Honest scarcity.** The early-bird countdown is real (ties to
   `earlyBirdEndsISO`). When it expires, it flips to "early-bird ended · full
   price live" — it does not reset or fake new urgency. No "X seats left" unless
   it's literally true. The **daily bonus timer** (`Countdown mode="daily"`,
   `BonusBar`) is allowed because it is real: a genuinely repeatable bonus
   (`site.bonus`) with the timer counting to **tonight's midnight IST**, which
   then truly rolls to the next day — a real end-of-day deadline, NOT a fake
   per-visit 24h reset. If the bonus stops being offered, set `bonus.enabled:false`.
7. **TODO placeholders are explicit.** Where a real value is missing
   (`checkoutUrl`, `ga4Id`, `metaPixelId`, class days/time, refund terms), wire a
   clearly-named placeholder and leave a `// TODO:` so Shubham can swap it. Don't
   guess and don't silently omit.
8. **The repo is the only data the page renders.** External sheets/docs/APIs
   (e.g. the team's "Batch N live classes" Google Sheet) are **references for
   authoring only** — never embedded, iframed, or fetched at build or runtime.
   Schedule + class times live in `site.ts`; curriculum topics (a curated
   marketing view, not a raw dump of the ops sheet) in `curriculum.json`. To
   change them, edit the repo and push — Actions redeploys. (See ARCHITECTURE.md
   §2.) Why: an embed breaks the brand/perf/a11y budget and can silently break a
   conversion page; repo data is versioned, validated and revertable.

## Brand non-negotiables (see BRAND.md)

- Dark only. Deep blue-black base, not pure black.
- Signature = the **CI/CD pipeline** motif: curriculum as deploy stages
  (`commit → … → production`), mono `❯` eyebrows, observability status colors.
  Spend boldness here; keep everything else quiet.
- Type: Space Grotesk (display), Inter (body), JetBrains Mono (eyebrows/tags/
  data). Sentence case headlines. No ALL-CAPS billboards.
- Voice: peer-to-peer and welcoming to all levels — respect the learner's
  intelligence, never condescend, never gatekeep. Specific over clever. Active-voice
  CTAs ("Enroll now"). **No hype words** ("supercharge", "10x", "unlock", "in
  just X days"). Keep **"Hello Dosto"** as the human note in the instructor section.
  The warm sign-off tagline is **"Happy Learning"** (in `site.tagline`); it
  replaced "Production-grade DevOps. Not demos." as the on-page line. "Production-
  grade, not demos" remains the *internal build ethos*, not a displayed tagline.

## Structure (see ARCHITECTURE.md)

- `src/config/site.ts` — single source of truth.
- `src/content/*.json` — data. `src/content/config.ts` — zod schemas.
- `src/styles/tokens.css` — CSS variables (BRAND.md §3–4); Tailwind reads them.
- `src/layouts/BaseLayout.astro` — head, meta/OG, fonts, GA4 + Meta Pixel, UTM
  capture.
- `src/components/` — one component per IA section + `primitives/`. Each
  component reads only `site.ts` and its own JSON file. No cross-component
  coupling.
- `src/pages/index.astro` — thin; stacks sections in IA order (ARCHITECTURE.md §4).

## Build order

Follow ARCHITECTURE.md §8. Build and present **one section at a time** for review
(Shubham reviews iteratively). Don't dump the whole page at once.

---

## Quality floor (must pass before deploy)

- Responsive and excellent at **380px**. Pipeline rail collapses to vertical.
- Visible keyboard focus (purple ring). `prefers-reduced-motion` kills animations.
- Lighthouse **Performance ≥ 95, Accessibility ≥ 95**. Near-zero JS.
- Body-text contrast ≥ 4.5:1 (palette passes on `--ink`/`--surface`).
- Semantic landmarks (`header`/`main`/`section`/`footer`), real heading order.
- OG image (1200×630) + favicon present. `<title>` and meta description set for
  the search-first audience.
- Every Enroll CTA forwards incoming UTM params to `checkoutUrl` and fires one
  `enroll_click` analytics event (ARCHITECTURE.md §6).

## Skills (installed for this project)

Use these specialized skills instead of working from memory. Installed in
`~/.claude/skills/` — invoke by name.

| Skill | Use it when |
| --- | --- |
| `astro` | Building/configuring anything Astro — components, content collections, the `@tailwindcss/vite` setup, static build, CLI. Defers to docs.astro.build for current API. |
| `tailwind-design-system` | Tailwind **v4** work — `@theme` tokens, the brand→semantic→component token hierarchy, responsive patterns. Pair with `tokens.css`. |
| `web-design-guidelines` *(pre-installed)* | Reviewing any UI against the Web Interface Guidelines (accessibility, UX, interaction). Run on each section before sign-off. |
| `frontend-design` *(pre-installed)* | Designing a distinctive, premium, non-generic UI — use while building each section so it doesn't read as AI-generated (BRAND.md §9). |
| `accessibility` | WCAG 2.2 audit — focus order, keyboard nav, screen-reader, contrast. Gates the A11y ≥ 95 floor. |
| `performance` + `core-web-vitals` | LCP / INP / CLS and load-time optimization. Gates the Performance ≥ 95 floor. |
| `seo` | Meta tags, structured data, sitemap — for the search-first audience. |
| `best-practices` | Security/compatibility/code-quality review of shipped code. |
| `web-quality-audit` | **Pre-deploy gate.** One comprehensive pass (perf + a11y + SEO + best-practices) against the § Quality floor before any deploy. |

**Workflow rule:** consult `astro` / `tailwind-design-system` before
scaffolding or config work; build each section with `frontend-design` +
`web-design-guidelines` in mind; before deploy, run `web-quality-audit` (and the
focused `accessibility` / `performance` / `core-web-vitals` skills as needed) to
prove the § Quality floor.

## Modern stack & web-platform baseline

This project commits to current best practices, with **graceful degradation** as
the hard rule — every modern feature must fall back cleanly and never threaten
the near-zero-JS + Lighthouse ≥ 95 floor.

- **Astro 7**, static output, Content Layer (zod-validated collections in
  `src/content.config.ts`).
- **Tailwind v4** — CSS-first `@theme` in `tokens.css`, native CSS custom
  properties, OKLCH-capable color. No JS config file.
- **Modern CSS, used with fallbacks:** fluid `clamp()` type scale, container
  queries for component-level responsiveness, `:has()` for stateful styling, CSS
  nesting, `light-dark()`/OKLCH where it earns its keep. `dvh` units for mobile
  viewport correctness.
- **Motion stays restrained** (BRAND.md §9): CSS-only, always gated behind
  `prefers-reduced-motion` (handled globally in `tokens.css`).
- **View Transitions:** this is a single page, so navigation transitions add JS
  for little gain — skip the router; the **Countdown stays the one JS island**.
  Use native CSS `view-transition` only for in-page state flips if it clearly
  helps and degrades to no-op.
- The bar: if a "latest trend" costs JS, layout shift, or accessibility, it does
  not ship. Capability and polish over novelty.

## Do NOT

- ...add a database, API routes, server functions, or a CMS.
- ...use `localStorage`/`sessionStorage` for anything except the UTM-forwarding
  helper.
- ...introduce a UI framework, component library, or icon megapack. Hand-build
  small; inline SVGs for the few icons needed.
- ...recolor or hotlink the logo; download it to `public/` and serve locally.
- ...invent content, stats, testimonials, or a refund guarantee.
- ...hardcode prices/dates/URLs anywhere but `site.ts`.
- ...overload the page with motion or effects — it reads as AI-generated and
  cheapens a premium, technical brand.

---

## Key facts (mirror of `site.ts` — edit there, not here)

- Product: DevOps: Zero to Hero (AI Powered) · cohort batch · starts 26 Jul 2026
  · open to all levels (beginners welcome, no prior experience required)
- Early bird ends: 3 Jul 2026, 23:59 IST
- Price (dual currency, no IP geo-switch): India ~~₹25,000~~ → early bird
  **₹14,999**; rest of world ~~$249~~ → early bird **$199**. Page leads with the
  India price; the world price lives in the SR breakdown + at checkout. Region pay
  buttons are price-free (flag / globe).
- Proof: 10,000+ engineers trained; 4.9 ★ · 232 Google reviews (real, seeded in
  reviews.json); YouTube 1.5L+, LinkedIn 1L+, Instagram 10k+
- Site should be **live ~30 Jun** to give an early-bird selling runway — 26 Jul
  is the batch start, not the site launch.
