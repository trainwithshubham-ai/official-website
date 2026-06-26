# BRAND.md — TrainWithShubham (English) · DevOps Sales Page

The visual + verbal identity for the single-product landing page that sells
**DevOps: Zero to Hero (AI Powered)**. This is the source of truth for every
design decision. If the code and this file disagree, this file wins.

---

## 1. What we're building

A one-page, dark-theme, conversion-focused sales page for a **DevOps cohort
batch** that starts **18 Jul 2026**. The page has exactly one job: turn a
motivated learner into an enrolled student before the early-bird window closes
(**11 Jul 2026, 23:59 IST**).

- **Audience:** anyone who wants to become an AI-powered DevOps engineer — from
  complete beginners to working Cloud / Platform engineers. This is a **zero to
  hero** course: welcoming, no prior experience required. The audience is still
  smart and allergic to hype, so we stay specific and honest — we just never
  gatekeep on experience.
- **Positioning anchor:** *Production-grade, not demos.* Every word and pixel is
  filtered through this. We are not selling motivation; we are selling capability.
- **Strategic analog:** aiengg.dev architecture (single product, premium dark,
  conversion-first) — with our own DevOps identity layered on top.

---

## 2. The signature: the pipeline

The one thing this page is remembered by. The DevOps world's own vernacular —
the CI/CD pipeline — is the spine of the design.

- The **curriculum** is presented as a deploy pipeline: each module is a *stage*
  that moves from `commit` (week 1 fundamentals) to `production` (final
  project). Stages connect along a vertical/horizontal **rail** with status dots.
- **Eyebrows** (section labels) use a mono terminal prompt: `❯ curriculum`,
  `❯ who this is for`. Lowercase, monospace, deliberate.
- The **countdown** is framed as a **deploy window** — the window to ship your
  enrollment at early-bird price.
- Status semantics from observability tooling carry meaning, not decoration:
  **teal = healthy/done**, **coral = the action to take**, **amber = urgency**.

Spend the boldness here. Everything around the pipeline stays quiet and
disciplined.

---

## 3. Color

Dark only. A deep blue-black base (not pure `#000`), one elevated surface, and
three functional accents whose meaning comes from dashboards engineers already
read every day.

| Token            | Hex        | Role                                              |
| ---------------- | ---------- | ------------------------------------------------- |
| `--ink`          | `#0A0E12`  | Page background (deep blue-black)                 |
| `--surface`      | `#12181F`  | Cards, sections, elevated panels                  |
| `--surface-2`    | `#1A222C`  | Higher elevation, inputs, hover states            |
| `--line`         | `#243240`  | Hairline borders, pipeline rails                  |
| `--teal`         | `#21D4B4`  | Primary brand / healthy / completed-stage         |
| `--teal-deep`    | `#0E9384`  | Teal gradients, pressed states                    |
| `--cyan`         | `#38E0E8`  | Energy accent — Hero/pipeline gradients ONLY      |
| `--coral`        | `#FF6B57`  | **CTA only** — Enroll / primary action            |
| `--coral-deep`   | `#E2503C`  | Coral hover / pressed                             |
| `--signal`       | `#F5A524`  | Urgency — countdown, "early bird ends", scarcity  |
| `--text`         | `#E8EEF2`  | Primary text (off-white)                          |
| `--muted`        | `#8A97A6`  | Secondary text, captions, mono labels             |

**Rules**
- **Coral is sacred.** It means "the thing to click." Reserve it for the primary
  Enroll CTA and nothing else. If everything is coral, nothing is.
- Teal is the *structural* brand color — rails, completed status dots, links,
  underlines, icon strokes. It is not a button color.
- Amber (`--signal`) appears only where time pressure is real: the countdown and
  the early-bird messaging. Don't sprinkle it.
- No gradients on text. Tasteful gradients are allowed in the **pipeline
  (teal→cyan)**, the hero glow, and the **gradient hairline border on the two
  anchor cards** (Pricing, Credential); everywhere else, flat.
- **Cyan (`--cyan`) is the energy accent** — used only in Hero / pipeline
  gradients to add vibrancy. Never as text, never as a button, never a third
  "brand" color. It rides with teal, not against it.
- Never introduce a color outside this table. No purple, no blue-link blue.

---

## 4. Typography

Deliberately dev-native. A geometric technical display face, a neutral
workhorse body, and a real monospace that does actual semantic work.

| Role     | Typeface          | Weights      | Used for                                        |
| -------- | ----------------- | ------------ | ----------------------------------------------- |
| Display  | **Space Grotesk** | 500, 700     | H1–H3, big numbers, the price                   |
| Body     | **Inter**         | 400, 500, 600| Paragraphs, list items, UI text                 |
| Mono     | **JetBrains Mono**| 500          | Eyebrows (`❯`), stage labels, tags, code, dates |

> Acceptable swap if you want a more "infra-native" feel: **Geist** (display+body)
> + **Geist Mono**. Pick one system and commit; do not mix.

**Type scale** (clamp for fluid sizing):
- H1 `clamp(2.5rem, 6vw, 4.25rem)`, weight 700, tight tracking (`-0.02em`)
- H2 `clamp(1.75rem, 4vw, 2.75rem)`, weight 700
- H3 `1.25rem`, weight 500
- Body `1.0625rem`/`1.7` line-height
- Eyebrow / tags `0.8rem`, mono, `letter-spacing: 0.08em`, lowercase, `--muted`
- Self-host fonts (via `@fontsource`) — do **not** rely on Google's CDN at runtime
  (keeps the page fast and GH-Pages-resilient).

**Rules**
- Headlines are sentence case, not Title Case, not ALL CAPS (except short mono
  tags). We talk like an engineer, not a billboard.
- The price is a display-weight number, never bold-Inter.
- Monospace is for things that are literally code-adjacent or are
  labels/data — never for body prose.

---

## 5. Layout & space

- Max content width `1120px`; generous section padding
  (`clamp(4rem, 9vw, 7rem)` vertical). Let it breathe — premium reads as space.
- 12-col mental grid; most sections are single-column centered or a 2-col
  (content + visual) split.
- Border radius: `12px` cards, `8px` buttons, `999px` pills/tags. Consistent.
- Hairline borders (`--line`) over heavy shadows — but surfaces carry subtle
  **depth**: a 1px top sheen + soft shadow (`.surface-card`), and a faint page
  **grain** for tactility (kills flat-black cheapness; Linear/Vercel/Stripe feel).
- Behind the hero: a **dual ambient glow** (teal + a faint amber) over a masked
  **pipeline grid**. Subtle, premium — depth, not flash.
- **Motion budget:** the **animated "deploying" pipeline** in the hero is the one
  bold moment (BRAND §2). Quiet supporting motion is allowed — scroll-reveal
  fade-ins, card hover lifts, and a single "live" pulse on the production node —
  all CSS-only and gated behind `prefers-reduced-motion`. Nothing more.
- Mobile-first. Everything must be excellent at 380px. The pipeline rail
  collapses to a vertical stack on mobile.

---

## 6. Components — visual rules

- **Primary CTA button:** coral fill, ink text, `8px` radius, weight 600,
  subtle lift on hover (translateY -1px + coral-deep). Label is a verb:
  "Enroll now", "Get the early-bird seat". Never "Submit", never "Click here".
- **Secondary button:** transparent, `--teal` 1px border, teal text. For
  "See the curriculum".
- **Countdown:** mono digits, amber accent, labeled `❯ early-bird window closes`.
  When it expires it does **not** disappear — it flips to a calm "Early-bird
  ended · full price now live" state and pricing updates. Honesty over fake urgency.
- **Stage card (curriculum):** surface bg, left status dot (teal = the arc is
  real), mono stage label (`stage 03 · containers`), title, 3–4 outcome bullets.
- **Status dot:** 8px teal circle = a real, sequential stage. Only use numbered
  / sequential markers here, because the curriculum genuinely **is** a sequence.
- **Tool wall:** monochrome/teal-tinted logos on surface tiles, evenly spaced,
  no rainbow brand colors fighting the palette.
- **Tool logos (`ToolIcon.astro`):** the shared icon system — hand-vendored
  single-path SVGs (Simple Icons, CC0 paths; AWS uses a neutral cloud since
  Amazon's mark isn't available), rendered `fill="currentColor"` and tinted
  **teal**. Used as icon + label chips in the curriculum tags, the tool wall, and
  project tags. Monochrome only (BRAND §3); conceptual tags with no tool logo
  stay text. Trademarks belong to their owners — monochrome, nominative use to
  denote what's taught.
- **Reviews:** the aggregate badge reads `4.9 ★ · 232 Google reviews` — stars in
  `--signal` (amber), the rest muted, with the Google mark for trust. Review
  cards sit on `--surface` with a teal left-rule, show name + relative date +
  five amber stars + a trimmed excerpt, and link out to the full review. The
  "Verified on Google" link is the proof a skeptic clicks — make it obvious.

---

## 7. Voice & copy

We write peer-to-peer and welcoming to all levels — confident, specific, zero
hype, and never condescending or gatekeeping. Beginners and pros both feel at home.

**Do**
- Be concrete: "Build and ship a GitOps pipeline with ArgoCD," not "Master
  cutting-edge DevOps."
- Use active voice and verbs people recognize: Enroll, Build, Ship, Deploy.
- Lead with capability and outcomes. Name real tools (Docker, K8s, Terraform,
  ArgoCD, AWS, Grafana) — this audience trusts specifics.
- Keep the human signature: **"Hello Dosto"** belongs in the instructor /
  personal-note moment. It's the warmth that the rest of the page earns the
  right to deliver.
- The warm sign-off tagline is **"Happy Learning"** (`site.tagline`) — used in the
  footer, instructor, and final CTA. It replaced the page's earlier
  "Production-grade, not demos." line, which now lives on only as the internal
  build ethos (§ Positioning anchor), not as displayed copy.

**Don't**
- No "supercharge", "10x", "revolutionize", "unlock your potential", "in just
  X days". This audience punishes hype.
- No fake countdowns, no fake "3 seats left" unless it is literally true.
- No exclamation-mark stacking. One confident sentence beats three excited ones.

**Microcopy**
- Errors/empty states (e.g. form): plain and directive — "Enter a work email so
  we can send your batch details." Errors don't apologize.
- A button's label and the result match: "Enroll now" → leads to checkout, not
  to a newsletter.

---

## 8. Logo

- Asset: the existing TrainWithShubham mark
  (`https://d502jbuhuh9wk.cloudfront.net/logos/62cd128e0cf2e6a1694683bb.png?v=21`)
  — download once into `public/` and serve locally; do not hotlink in production.
- Use on dark backgrounds only. Maintain clear space ≥ the mark's height around it.
- Do not recolor, stretch, add shadows, or place on busy backgrounds.
- Min display height 28px (nav) / never below 20px.
- Provide a favicon + a 1200×630 OG image (dark, pipeline motif, batch + date +
  price) — both live in `public/`.

---

## 9. Quality floor (non-negotiable)

- Responsive to 380px, visible keyboard focus rings (teal), `prefers-reduced-motion`
  respected (kill the hero glow animation + scroll reveals).
- Lighthouse: Performance ≥ 95, Accessibility ≥ 95. Near-zero runtime JS.
- Contrast ≥ 4.5:1 for body text on `--ink`/`--surface` (the palette above passes).
- One memorable thing (the pipeline). Everything else quiet. Before shipping a
  section, remove one decorative element that isn't doing a job.
