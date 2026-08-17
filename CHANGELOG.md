# CHANGELOG

Build history for the **DevOps: Zero to Hero (AI Powered)** sales page.
Dates are when the work landed. The repo is the single source of truth; this file
records *what* changed and *why* so future sessions have context.

---

## 2026-08-17 — /claude-code: live session becomes a recorded course

The session ran on Sunday 16 Aug at 09:00 IST. With the recording confirmed available,
the page flips to recorded self-paced.

The live-only fields (`batchStartISO`, `schedule`, `formatLabel`) were **removed rather
than commented out**, which is what deletes the hero countdown, the date line and the
"free live session" badge — each is conditional on its field existing. `selfPaced` plus an
`availability` line replace them, and the template does the rest on its own: `isLiveSession`
goes false, so the curriculum intro, the free price note ("Sign in and start") and the enrol
heading ("Start it free, right now") all revert without being touched. Only per-course copy
in `courses.ts` was hand edited: tagline, meta description, includes, trust, atAGlance and
two FAQ answers.

Verified in the build: all ten live-framing strings gone ("free live session", "Live with
Shubham", "Save your spot", "join us live", "covered live", "16 August", "live session
starts in" and the rest), zero countdown mounts on the page, and the JSON-LD no longer
advertises a past `startDate` while claiming `InStock` — the CourseInstance is now just an
online course with a free offer.

Still no access-term claim anywhere, per the owner: how long free learners keep access is
unconfirmed on Learnyst, so both free pages say nothing about it rather than guessing.

## 2026-08-16 — Independence Day sale ended; one header timer at every width

The sale ran out at 15 Aug 23:59 IST. Because the site is static, expiry alone only
hid the *claim*: `:has([data-expired])` dropped the offer line and the sale chip, but the
price and the coupon hint are build-time values, so the live page was still showing
**₹14,999** and "Apply coupon AUGUST15" with an already-expired `priceValidUntil` in its
JSON-LD. Fixed by the rebuild.

`sale.enabled: false`. India returns to the standing **₹19,999**, which matches Learnyst
`281722`. World stays **$249** on the page, and the owner dropped `280727` from $299 back
to $249 and deactivated the coupon at the same time, so page and checkout agree in both
regions. Verified in the build: no sale name, no coupon, no offer row, no
`priceValidUntil`, JSON-LD offers now 19999 INR / 249 USD, and the pay-button SR labels
read the standing prices.

**Header timer unified.** Turning the sale off used to expose a gap: the next-session
timer was `lg:hidden`, and desktop instead got a bare `<Countdown variant="chip" />` that
defaulted to `batchStartISO` (25 Jul 2026, long past) and so rendered a stale "batch is
live" chip rather than a timer. The stale chip is deleted and `.nav-urgency` now shows at
every width, so the computed next-session countdown is the header's single urgency
element. It rolls itself over each weekend from `site.session`, so it can never go stale.
The change only touches `≥lg`, so sub-`lg` rendering is byte-identical.

CLAUDE.md's key-facts block said "SALE LIVE" and is read at the start of every session;
it now records that no sale is running, and carries the three-step teardown as general
guidance for the next one rather than as Independence-Day specifics.

## 2026-08-14 — Video teaser, phased curriculum, real /claude-code content

Prompted by a comparison against kubecraft.dev/linux, a competing free Linux course page.
Their page beats ours on proof volume (2,582 Trustpilot reviews vs our 260 Google), a
video teaser, and a much sharper instructor origin story. Ours wins on substance: they
show no curriculum at all, and their stated runtime contradicts itself (16 hours in one
place, "a full 8-hour course" in another). The response is to keep our substance and
close the two gaps that actually matter.

**`VideoTeaser.astro` — the one sanctioned second JS island.** A click-to-load YouTube
facade: local poster plus a play button, and nothing loads from YouTube until the visitor
clicks. No third-party request, no cookie, no LCP cost on load, and a fixed 16:9 box so
the player swap causes zero layout shift. It ships as a real link, so with JS blocked the
teaser still plays, it just opens in a new tab. Uses `youtube-nocookie.com`, and is
tree-shaken entirely on pages with no video. On a course with a video the teaser TAKES
the hero poster's slot rather than stacking below it, since two large visuals would only
push the price and CTA toward the fold. This deliberately breaks "the Countdown is the
only island", so CLAUDE.md and ARCHITECTURE.md §5 both now record the exception and the
bar a future island would have to clear. Owner decision: linking out to YouTube is a real
conversion leak, because it hands the viewer a sidebar full of competitors.

**Phased curriculum.** `curriculum` entries gain optional `phase` and `deepDive`. When a
phase is present the rail groups by CONSECUTIVE runs (so source order is display order and
two same-named phases can never silently merge) and renders one stacked rail per phase.
Stacked, not columns: a phase list is a progression, and side-by-side would break the
reading order that makes it a journey. Phase headings are `h3` and modules `h4`, keeping
the outline correct.

**/claude-code now has its real content**: 13 modules across three named phases (zero to
comfortable, comfortable to productive, productive to advanced), five marked deep dive, a
tech strip, six grounded FAQ answers, and a headline that claims the real arc
("from first prompt to multi-agent workflows") rather than the entry point. The meta
description is now specific, which retires an earlier review finding about asserting a
syllabus the repo called unconfirmed.

**/claude-code is a LIVE SESSION, not a recorded course.** Corrected before launch: the
page had been built as "free course · self-paced" and stated, in five separate places,
that it was fully recorded with instant access on enrolment. It is a single live session
on **Saturday 16 Aug 2026, 09:00 IST**. Every one of those claims was false and is gone:
the badge, the format and start facts, the includes list, the trust row, the curriculum
intro, and an FAQ answer that literally read "Fully recorded. Every module is already
there." The hero now carries the date, time and a **real countdown** to the session start
(honest scarcity under golden rule 6: a real event at a real time, and the Countdown flips
itself to a calm ended state). New `formatLabel` field, because a one-off session is
neither self-paced nor an N-day cohort and the derived badge would mis-describe it either
way. JSON-LD gains a real `startDate`.

**➡️ AFTER 16 AUG:** recordings are expected to follow once the session ends, but that is
deliberately **not** stated anywhere on the page — announcing it up front removes the
reason to attend live (owner's call). Once the session is done, flip the entry back to
`selfPaced` with an `availability` line, drop `batchStartISO`/`schedule`/`formatLabel`,
and restore recorded framing in `includes`, `trust`, `atAGlance` and the FAQ. The countdown
removes itself when `batchStartISO` goes.

**/claude-code is out of draft.** Its Learnyst enrolment URL
(`/learn/claude-code`) is wired, which releases all seven draft gates at once: indexed,
in the sitemap, a card on `/courses`, six CTAs, and a zero-price JSON-LD offer. Its
`title` also changed to **"Claude Code: Zero To Hero"** to match the course's real name on
Learnyst — someone clicking Start free should land on a page titled what they just read.
Real 1280×720 poster shipped. `/linux` remains a draft.

**Poster pipeline fixed.** `generate-posters.mjs` now normalises the source JPG to
1280×720 as well as emitting the WebP variants. Art arrives from design tools at full
size, and the JPG is the `<img>` fallback: claude-code.jpg came in at 4096×2302 and
1401 KB, which would have been the LCP image for every non-WebP visitor. Now 96 KB, in
line with the other posters.

Also: the curriculum intro copy hardcoded "yours for 4 years, including future updates" in
the shared template, asserting an access term for every course including free ones whose
term nobody has confirmed. Removed; access is stated per course in `includes`. And the
hero size line now derives phase count alongside module count, so the at-a-glance strip
dropped its hand-typed "13, in 3 phases" cell rather than risk drifting from it.

## 2026-08-14 — Two free course pages: /claude-code and /linux

Both courses are recorded and live on Learnyst. The pages are built on the shared
`CourseLanding` template, so they inherit the whole conversion rebuild below for free.
Each is a `courses.ts` entry plus a three-line page file.

**What free changes on the page:** hero badge "free course · self-paced", a big **Free**
in place of the dual-currency price, one "Start free" CTA with no region split (free is
free everywhere), a trust row of No payment / Instant access / Certificate on completion,
and the flagship upgrade card doing the monetisation work below the enrol card. Free
signups still forward UTM into Learnyst, and fire `enroll_click` with `kind: "free"` plus
Meta `Lead` rather than `InitiateCheckout`. JSON-LD emits `isAccessibleForFree` with a
zero Offer at `category: "Free"`, which is real search leverage for two brand-new pages
with no backlinks. `/courses` shows an amber **Free** pill.

**Placeholders cannot ship (golden rule 7).** The Learnyst enrolment URLs are not wired
yet, so both carry `TODO_*_FREE_ENROL_URL`. A first pass only stopped the placeholder
reaching an `href`, which was not enough: these are real routes, so the build still
published a live-looking yellow "Start free" CTA that scrolled to a card containing
internal repo instructions, listed in the sitemap for Google to crawl. Now a free course
with an unwired URL is a **draft** (`isDraftCourse`, `courses.ts`) and is gated everywhere
it would reach the public:

- **no catalog card** — `/courses` omits it, so nothing links into a dead end
- **no sitemap entry** — `astro.config.mjs` filters `draftSlugs`
- **`noindex,nofollow`** — new `noindex` prop on `BaseLayout`
- **no CTA** — header, hero and footer `#enroll` links all gate on `canEnrol`
- **no enrol section at all in a production build** — it would otherwise headline "Start
  it free, right now" above no control
- **no JSON-LD offer** — an `InStock` offer with an enrol URL is a machine-readable
  promise that a searcher can act there
- **the TODO note renders in `astro dev` only** (`import.meta.env.DEV`), because it is a
  message to whoever maintains this repo, not to a visitor

Verified in the production build: zero `TODO_` strings, zero draft routes in the sitemap,
`noindex` on both, no enrol section, no offers. Verified in dev: both pages render in full
with the TODO note, so they stay reviewable on localhost.

**What was deliberately NOT written:** no curriculum, no module list, no hours, no lesson
count, no FAQ. Inventing those is fabricated proof (golden rule 4), so the sections simply
don't render until the real data arrives, at which point they drop into existing fields.
Access term is omitted for the same reason (unknown for free courses); the certificate IS
claimed because it is confirmed. Free learners are **not** promised Discord: `site.ts` now
scopes that perk to paid enrolments only.

**Accents:** Claude Code uses the clay `#d97757`, verified 6.2:1 on `--ink` so it is
text-safe, nominative use for the tool being taught and not an endorsement. Linux keeps
brand purple: green belongs to `/agentic-ai`, blue to `/python`, and Tux yellow is off
limits because yellow is the Enroll CTA sitewide. (Poster since shipped for /claude-code;
/linux still renders the template's branded placeholder frame.)

**Also from the review of this phase:**
- `/python`'s trial button said "Watch lesson 1 free (25 min)", which contradicted a
  *verified* note in the same file recording that Learnyst gates the preview behind a
  "Start a free trial" button. Now "Start the free trial (25 min)". The runtime stays: it
  is real (25m 33s, from that same note) and a named time cost converts better than an
  unquantified "trial".
- The `/linux` meta description enumerated "files, processes, permissions, networking and
  shell scripting" while the entry directly below declared the syllabus a TODO. Both free
  descriptions were rewritten to stop asserting module content that isn't confirmed.
- `aria-label="Start this course free…"` did not contain its own visible label "Start
  free", breaking WCAG 2.5.3, so voice control could not target it.
- `.enrol-pending` used flex, which split its sentence into separately-wrapping chunks
  because the message mixes text nodes with inline `<code>`.
- `volume.projects` was documented but never read; it now takes precedence over the count
  derived from `builds`.
- The hero price was gated on `canEnrol`, which hid "Free" on a course whose link wasn't
  wired. What a course costs is a fact about the course, so it is gated on having a price.
- The announced price string produced a double full stop when a note already ended in one.

Verified: 6 pages build, **0 JS bundles**, both routes in the sitemap, free JSON-LD
correct, one `<h1>` per page, `Free` pills render on `/courses`.

## 2026-08-14 — Course-page conversion rebuild + free-course foundations

`/python` was built with the flagship cohort's page structure on a ₹1,999 impulse
product: price eight sections down, a category-name h1, the strongest proof (752 repo
forks) after the FAQ, and the flagship cross-sell at position 2 where it read as an exit.
Fixed in the SHARED template, so the two free course pages coming next inherit all of it.

**New order** (hero → glance → what you'll build → tech → curriculum → nudge →
instructor → reviews → repo → enrol → upgrade → FAQ):
- **Hero** now carries the promise, the size and the price. `heroHeadline` gives the h1
  an outcome while `<title>` / meta / JSON-LD keep the product name for search. A volume
  line ("12 modules · 4 projects") is DERIVED from `curriculum.length` and `builds.length`
  so it can never disagree with the page; `volume.hours`/`.lessons` render only once real.
- **"What you'll build"** (new): the four real artifacts (FastAPI DevOps API, local
  log-analysis agent, boto3/CDK automation, argparse CLIs) lifted out of a flat 12-item
  rail where they were weighted the same as "Object-oriented Python (basics)".
- **Mid-page nudge** (new) right after the curriculum. Desktop previously had no CTA in
  the flow at all between the hero and the enrol card.
- **Repo callout moved** from after the FAQ to immediately before the price.
- **Flagship cross-sell moved** from position 2 to below the enrol card and rebuilt as a
  real upgrade card. Before the offer it was a reason to leave; after it, it's an upsell.
- Poster capped at 38rem so it stops pushing the CTA cluster toward the fold.

**Pricing honesty:** dropped the permanent ₹4,999 / $49 strike-through. A standing
"60% off" with no reason and no end date reads as a fake anchor. `CoursePrice.list` is now
optional. The homepage bonus strip switched to the `now` price ("Normally ₹1,999"), so it
can't overstate a bonus the course page sells for less.

**Risk reversal** (no refund policy exists): the trial is now the explicit risk reducer.
"Start a free trial" became "Watch lesson 1 free (25 min)" via a new `trialLabel`, weighted
in the hero and restated under the pay buttons.

**Free-course support** (data model ready, pages next): `free` + `enrollUrl` on `Course`
give a single no-region CTA; `RegionPrice` gained a `free` mode; `data-enroll-kind="free"`
makes Meta fire `Lead` instead of `InitiateCheckout` and adds a `kind` param to the GA4
`enroll_click`, so a ₹0 signup and a ₹14,999 purchase stop averaging into one number;
JSON-LD emits `isAccessibleForFree` + a zero Offer with `category: "Free"`.

**Refactor:** the region-adaptive price existed in four places (deferred review item #5).
The three inside `CourseLanding` are now one `RegionPrice` with `hero`/`card`/`bar`
variants. `Pricing.astro` on the homepage was deliberately left alone: it is live and
converting, and folding it in adds risk for no gain.

**Fixes:** `CourseLanding` fell back to `/og-image.png`, which does not exist (only
`og-image.svg`), so any future course without its own poster shipped a 404 social card.
Also added `scripts/generate-posters.mjs` (sharp) to make the `.webp` + `-640.webp` poster
variants reproducible.

**Content:** Discord added to the `/python` includes (paid courses get it now), plus four
FAQ entries covering support, machine setup, expensing, and whether this is the same
Python that's bundled in Zero to Hero.

**Fixed from the code review of this diff:**
- **SR price was announced 3×.** Unifying the price into one component meant its
  `sr-only` breakdown shipped on all three mounts, twice telling a listener to "choose
  your region" where no region control exists. Added an `announce` prop, set on the enrol
  card only. The announcing mount now also carries `priceNote`, since every visible copy
  is `aria-hidden` as a duplicate.
- **Product claims were hardcoded in the shared template.** "one-time · 4 years of
  access" and the trust row were asserted for every course by `CourseLanding`. Moved to
  `priceNote` / `trust` in `courses.ts` (golden rule 1) — a future course with a
  different access term would have silently inherited a false one.
- **Stale `sizes` hint.** Capping the poster at 38rem left `sizes="…720px"`, so DPR-1
  desktop kept fetching the 1280w WebP for a 608px slot, on the LCP element. Now 608px.
- **`hasList` required both currencies**, so a course setting `list` on one side only
  would silently drop it. Now handled per currency.
- **Upgrade card** wrapped an h2 plus a 60-word paragraph in one `<a>`, making the whole
  block a single link name. Anchor now wraps only the CTA, with a stretched-link hit
  area (the pattern `CourseCard` already uses). It also used a hand-rolled eyebrow and a
  third `grad-border`; now uses `Eyebrow` and a plain surface, so the gradient hairline
  still means "anchor card".
- **`free` + `price` were mutually exclusive by comment only.** Added the `!isFree` guard
  so a mis-set course can't render "Free" above a row of pay buttons.
- `pick()` in `StructuredData` still annotated `list` as required; wired the `Free` pill
  on `/courses` that `CatalogCard.free` had promised but nothing rendered.
- Docs: README and ARCHITECTURE still pointed at `public/og-image.png`, the file this
  diff proved does not exist.

**Flagged, needs your confirmation:** the new Discord claim on `/python` is authorised but
its delivery mechanism is not verified — `site.ts` now carries a scope note and a TODO.
The "invoice for expensing" FAQ answer is copied from the flagship FAQ and inherits the
same unverified assumption about Learnyst.

Verified: build clean, **0 JS bundles**, one `<h1>` per page and no heading skips, JSON-LD
valid (1999 INR / 19 USD, no aggregateRating), region flip confirmed under
`TZ=America/New_York` in both new price consumers, SR price announced exactly once, no
dangling refs to the removed CSS. Known gap: headless Chrome lays out at a ~500px minimum
here, so 380px was verified by CSS review rather than screenshot.

## 2026-06-29 — Enrollment-easing UX: currency cue, mobile urgency, FAQ

From a conversion-funnel audit; owner-selected scope:
- **Currency cue on Pay buttons** — `Pay · India · ₹` / `Pay · Global · $` (symbol
  only, faint separator). aria-labels still carry the full price; region ring +
  geo note unchanged.
- **Mobile/tablet urgency** — slim `lg:hidden` strip in the sticky header with
  "❯ early-bird ends in" + the Countdown chip, so phone users feel the deadline
  before Pricing. Seconds hidden + chip compacted to fit 380–412px; label hides on
  expiry (chip flips to "ended" itself). Reuses the shared countdown island — no
  new JS. Desktop nav chip unchanged.
- **FAQ +3** — "What if I miss a live class?", "How long do I have access?" (4 yrs,
  matches inclusions), "Can I expense this with my employer?" (invoice, owner-confirmed).
- Verified: build clean, 0 JS bundles, one h1, mobile Lighthouse 98/100/100/100,
  CLS 0.002; code-review clean.

Deferred (need owner data): refund/guarantee line, GA4 + Meta Pixel IDs, EMI /
payment methods — left as clearly-marked TODOs.

## 2026-06-29 — Daily bonus timer (honest "evergreen") + #90DaysOfDevOps ebook

To stop learners waiting for the last day, added a **real, repeatable daily bonus**
instead of a fake evergreen reset:
- `site.bonus` — "Enroll today → free **#90DaysOfDevOps ebook**." (`enabled` toggle;
  TODO: confirm delivery.)
- `Countdown` gains `mode="daily"` + a slim `bonus` variant. Daily mode counts to
  **tonight's midnight IST** and genuinely rolls to the next day — a real
  end-of-day deadline, NOT a per-visit 24h reset (a DevOps audience would catch a
  fake one on refresh; golden rule 6 stays intact). One shared `setInterval` now
  drives both fixed (early-bird) and daily nodes.
- New `BonusBar` (slim `grad-border` strip) in the Pricing box, above the Enroll
  buttons. The early-bird countdown to 11 Jul is unchanged as the macro deadline.
- Verified: build clean, **0 JS bundles**, IST-midnight math exact (targets 00:00,
  0–24h), DOM dump shows digits populate (bonus 13:38:32, early-bird 12d…) and
  fixed countdowns unaffected, Lighthouse 98/100/100, CLS 0.002.

## 2026-06-29 — Geo-aware Enroll buttons (fix wrong-region checkout break)

The two Learnyst checkouts are geo-restricted (India `priceId` only works in
India, Global only outside) — a wrong-region click hit a broken page AND replaced
the sales page. Subtle client-side fix (no backend, no IP):
- **New tab:** enroll checkouts open in a new tab (`Button.astro`), so a wrong
  click is recoverable — the sales page stays open.
- **Timezone region guess (never IP):** inline script in `BaseLayout` sets
  `data-region-guess` (`Asia/Kolkata` → india, else world) on each
  `[data-enroll-group]`. CSS subtly rings the likely-correct button (paint-only)
  and personalises a welcoming geo-pricing note (`EnrollButtons`, Pricing box).
- Both prices stay fully visible; nothing switched (golden rule 6). Graceful with
  JS off (both equal, neutral note, new tab still works).
- Note variants stacked in one grid cell (sizes to tallest) → **CLS 0.002** even
  at 380px. Verified: build clean, 0 JS bundles, DOM dump flips india/world under
  `TZ=Asia/Kolkata` vs `America/New_York`, Lighthouse 99/100/100, code-review clean.

## 2026-06-27 — Curriculum + projects content refresh

Owner content edits (zod-validated, 0 JS):
- Curriculum: stage 06 "AWS cloud (Solutions Architect)" → "AWS cloud
  Fundamentals"; Agentic AI stage gains a "Production Ready Agent Harness" bullet
  + tags (LangChain, Amazon Bedrock AgentCore); capstone gains an "AI Ready" tag.
- Projects: "Infrastructure as Code" → "Multi-Environment Infrastructure as Code"
  (+ Ansible); "AI-assisted DevOps workflow" → "AIOps workflow" (AI Agents,
  Python). New tags without a ToolIcon glyph stay text-only by design.

## 2026-06-27 — Palette rebrand: royal purple + yellow (shipped to main)

Moved off the teal/coral identity to **royal purple (primary) + yellow (Enroll
CTA)**. Built on `feat/theme-purple-yellow`, reviewed locally, **merged to main
and deployed**.

- **Tokens renamed to role-based names** in `tokens.css` (no more misleading
  names holding other colors): `teal→primary`, `teal-deep→primary-deep`,
  `cyan→accent`, `coral→cta`, `coral-deep→cta-deep`; `signal` (amber urgency) kept.
- **Palette:** `--primary #A78BFA` (light royal violet, text-safe ~7:1) ·
  `--primary-deep #7C3AED` (royal purple, fills/gradients only) · `--accent
  #C084FC` (luminous violet, gradients + rail sweep only) · `--cta #FACC15` /
  `--cta-deep #EAB308` (vivid yellow Enroll, ink text ~12.6:1). Coral retired.
- **Mechanical rename** of all utility usages (`text-teal`→`text-primary`, etc.)
  across ~16 components + `var()` refs in keyframes (pulse-ring, cta-pulse,
  grad-pipeline, grad-border, focus ring).
- **Pipeline label:** stage 1 `commit → code` (code·build·test·deploy·production);
  curriculum heading → "From code to production". (Curriculum module label
  "commit" kept — it tags the Git module, contextually correct.)
- **Curriculum accordion** now expands/collapses **smoothly** (`::details-content`
  + `interpolate-size`, graceful fallback to instant snap, reduced-motion-safe);
  chevron eases + turns purple when open. Still 0 JS.
- **PipelineAnim** kept the **original main-branch motion** (simple symmetric
  sweep + sequential node light-up, 3s), just recolored — glow/comet/swell
  variants were trialled and reverted to the cleaner original.
- Verified: build clean · 0 JS · grep gate (zero teal/coral/cyan in src) ·
  contrast (text-primary 7.1:1, CTA ink-on-yellow 12.6:1, all pass) · desktop +
  380px screenshots · code-review subagent (no critical/should-fix).
- Docs synced: BRAND.md §3 table + rules, CLAUDE.md golden rule 5 + quality floor.
- **Known cosmetic note:** amber `--signal` (countdown) sits adjacent to the
  yellow CTA in the nav + pricing card (close hues) — accepted as-is for now.

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
