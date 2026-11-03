---
description: Pre-deploy quality gate against CLAUDE.md's § Quality floor
---

Run the pre-deploy gate before any deploy, per CLAUDE.md's Skills table:

1. Run the `web-quality-audit` skill — one comprehensive pass covering
   performance, accessibility, SEO, and best-practices.
2. Cross-check the result against CLAUDE.md's § Quality floor specifically:
   - Responsive and excellent at 380px; pipeline rail collapses to vertical.
   - Visible keyboard focus (purple ring); `prefers-reduced-motion` kills
     animation.
   - Lighthouse Performance ≥ 95, Accessibility ≥ 95; near-zero JS.
   - Body-text contrast ≥ 4.5:1.
   - Semantic landmarks, real heading order.
   - OG/social image (per-course poster in `public/posters/`) + favicon present; `<title>`/meta description set.
   - Discovery: `dist/robots.txt` allows AI bots and lists the sitemap; `dist/llms.txt`,
     `llms-full.txt` and each `*.md` exist, every URL in `llms.txt` resolves in `dist/`;
     JSON-LD `@id` references resolve; draft and `/brand` pages absent from the sitemap.
   - Every Enroll CTA forwards incoming UTM params to `checkoutUrl` and fires
     one `enroll_click` event (ARCHITECTURE.md §6).
3. If any focused area needs a deeper look, run `accessibility`,
   `performance`, or `core-web-vitals` directly.
4. Report pass/fail per item — don't just say "looks good."
