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
   - OG image (1200×630) + favicon present; `<title>`/meta description set.
   - Every Enroll CTA forwards incoming UTM params to `checkoutUrl` and fires
     one `enroll_click` event (ARCHITECTURE.md §6).
3. If any focused area needs a deeper look, run `accessibility`,
   `performance`, or `core-web-vitals` directly.
4. Report pass/fail per item — don't just say "looks good."
