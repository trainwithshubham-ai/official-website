# trainwithshubham.ai

Dark-theme sales site for **DevOps: Zero to Hero (AI Powered)**, a self-paced,
recorded course, plus standalone course pages (`/python`, `/claude-code`, `/linux`,
`/agentic-ai`) and a `/courses` index. Static **Astro 7 + Tailwind v4**, deployed to
**GitHub Pages** at the apex `trainwithshubham.ai` (the English edition; the Hindi site is
`trainwithshubham.com`). No backend. Shipping JavaScript is limited to the sale countdown
(only when a sale runs), the video teaser facade and a small UTM helper.

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
| Prices, sale, course format (`videoHours`, `access`), checkout URL, emails, social and sibling-site links, analytics IDs | `src/config/site.ts` |
| Standalone course pages | `src/config/courses.ts` |
| Curriculum stages | `src/content/curriculum.json` |
| What's included (pricing) | `src/content/inclusions.json` |
| "For you / not for you" | `src/content/audience.json` |
| Outcome cards | `src/content/outcomes.json` |
| Projects | `src/content/projects.json` |
| Tools wall | `src/content/tools.json` |
| FAQ (may use `{videoHours}`, `{access}`, `{hindiSite}`) | `src/content/faq.json` |
| Google reviews (real only) | `src/content/reviews.json` |

JSON shapes are validated on `npm run build` (zod schemas in
`src/content.config.ts`), so a malformed edit fails the build with a clear error
instead of shipping broken.

### Still-needed real values (currently `TODO_` placeholders in `site.ts`)

`refundPolicy` · `metaPixelId` · `googleProfileUrl` · `twitterHandle`. Each stays hidden
until its real value is set. (`ga4Id` and both checkout URLs are set.)

The seeded **curriculum / inclusions / audience / outcomes / projects / tools /
faq** content is a sensible draft — confirm/replace it with the real specifics.

## Deploy

Push to `main`. The GitHub Actions workflow (`.github/workflows/deploy.yml`)
runs `npm ci` → `astro build` → uploads `./dist` → publishes to GitHub Pages.

One-time GitHub setup: **Settings → Pages → Build and deployment → Source =
GitHub Actions**.

## Search, AEO and agents

Everything an answer engine reads is generated at build from the same data as the pages:

- `public/robots.txt` allows all crawlers, including AI bots, and lists the sitemap.
- `@astrojs/sitemap` writes `sitemap-index.xml` (no drafts, no `/brand`).
- `/llms.txt`, `/llms-full.txt` and a `.md` twin of every public page (`/index.md`,
  `/python.md`, ...) come from `src/lib/markdown.ts`. Add facts to the data files, never to
  the endpoints.
- JSON-LD lives in `src/components/StructuredData.astro` (Organization, Person, WebSite,
  Course, FAQPage, BreadcrumbList, ItemList).

After a deploy, submit the sitemap in Google Search Console and Bing Webmaster Tools.

## Running a sale / ending one

`.claude/commands/sale-start.md` and `sale-end.md` hold the checklists. With no sale
running the site shows no countdown at all.

Social cards use the real course posters in `public/posters/`, not a generated card.
`BaseLayout` defaults to `/posters/devops.jpg`; each course page passes its own via
`ogImage` in `src/config/courses.ts`.

After adding a new poster JPG, generate its WebP variants (the poster is the LCP element
on a course page):

```bash
node scripts/generate-posters.mjs linux   # or with no argument, for all posters
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
