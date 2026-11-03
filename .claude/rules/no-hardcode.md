---
paths:
  - "src/components/**"
  - "src/layouts/**"
  - "src/pages/**"
---

# No hardcoded prices/dates/URLs (rule 1) or off-palette colors (rule 5)

Every price, date, deadline, URL, count, and email lives in
`src/config/site.ts` (and `src/config/courses.ts` for per-course pages).
Never write one directly into a component, layout, or page — import it.

Why: this is a static site with no backend. `site.ts` is the only place a
value can be changed and have every place it's shown update together (hero,
sale countdown, FAQ, JSON-LD, nav). A hardcoded duplicate silently drifts out of
sync with the config the next time the real value changes — e.g. a sale
ending, a price changing, or a coupon being retired — and the page starts
contradicting checkout or itself.

Separately, every color lives in `src/styles/tokens.css` as a `--color-*`
token. Yellow (`--color-cta`) is reserved for the Enroll CTA only; purple
(`--color-primary`/`--color-primary-deep`) is structural; amber
(`--color-signal`) is urgency (golden rule 5, BRAND.md §3). Don't reach for a
raw hex code or a Tailwind arbitrary-value color utility (`bg-[#...]`) in a
component — use the token so a future palette change only touches one file.

Mechanical backstop: `.claude/hooks/validate-no-hardcode.sh` runs on every
Edit/Write to files under these paths and warns (does not block) on currency
literals, ISO-8601 date/time literals, raw URLs, and hex/arbitrary-value
colors. Treat a warning as a prompt to double-check, not noise to dismiss —
legitimate exceptions exist and are fine to keep: a testimonial quoting a
price, the flag SVG's tricolor (`FlagIndia.astro`), the `theme-color` meta
value in `BaseLayout.astro`, and mask-gradient `#000`/`#fff` stops
(`LogoMarquee.astro`) are all real, reviewed exceptions, not violations.

If a value is genuinely missing (checkout URL, analytics ID, schedule), do
not guess: add a clearly-named placeholder in `site.ts` and leave a
`// TODO:` (golden rule 7).
