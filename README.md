# trainwithshubham.ai

Single-page, dark-theme sales site for **DevOps: Zero to Hero (AI Powered)**.
Static **Astro 7 + Tailwind v4**, deployed to **GitHub Pages** at the apex
`trainwithshubham.ai`. No backend. The only shipping JavaScript is the countdown.

> Read `CLAUDE.md`, `BRAND.md`, and `ARCHITECTURE.md` before changing anything —
> they are the source of truth for how this site is built.

## Local development

```bash
npm install      # install dependencies
npm run dev      # local dev → http://localhost:4321
npm run build    # static build → ./dist
npm run preview  # preview the production build
```

## Editing content (no code required)

Everything volatile is **data**, not markup. You almost never touch `.astro`
files.

| To change… | Edit |
| --- | --- |
| Prices, dates, deadline, checkout URL, emails, social links, analytics IDs | `src/config/site.ts` |
| Curriculum stages | `src/content/curriculum.json` |
| What's included (pricing) | `src/content/inclusions.json` |
| "For you / not for you" | `src/content/audience.json` |
| Outcome cards | `src/content/outcomes.json` |
| Projects | `src/content/projects.json` |
| Tools wall | `src/content/tools.json` |
| FAQ | `src/content/faq.json` |
| Google reviews (real only) | `src/content/reviews.json` |

JSON shapes are validated on `npm run build` (zod schemas in
`src/content.config.ts`), so a malformed edit fails the build with a clear error
instead of shipping broken.

### Still-needed real values (currently `TODO_` placeholders in `site.ts`)

`refundPolicy` · `ga4Id` · `metaPixelId` · `googleProfileUrl`. Analytics and the
refund line stay hidden until their real values are set. (`checkout.india` /
`checkout.world`, `classDays`, `classTime` are now set.)

The seeded **curriculum / inclusions / audience / outcomes / projects / tools /
faq** content is a sensible draft — confirm/replace it with the real specifics.

## Deploy

Push to `main`. The GitHub Actions workflow (`.github/workflows/deploy.yml`)
runs `npm ci` → `astro build` → uploads `./dist` → publishes to GitHub Pages.

One-time GitHub setup: **Settings → Pages → Build and deployment → Source =
GitHub Actions**.

The OG image is committed to `public/og-image.png`. To regenerate it after
editing `public/og-image.svg`:

```bash
node scripts/generate-og.mjs
```

## Custom domain (DNS)

`public/CNAME` already pins `trainwithshubham.ai`. At your DNS provider, point
the apex + `www`:

**Apex `@` — four A records to GitHub Pages:**

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

(Optionally also the AAAA records for IPv6:
`2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`.)

**`www` — CNAME** → `<your-github-username>.github.io`

After DNS propagates, enable **Settings → Pages → Enforce HTTPS**.
