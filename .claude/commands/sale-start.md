---
description: Start a new sale, following CLAUDE.md's "To run the next sale" checklist
---

Read CLAUDE.md's "To run the next sale" section (under § Key facts) before
touching anything, then:

1. Ask the user for whatever isn't already given: sale name, end date/time
   (IST), the India and world sale prices, the "off" amounts, and the coupon
   code (or confirm it's a repriced product instead — see step 3).
2. Fill in `site.sale` in `src/config/site.ts`:
   - `name`, `endsISO` (IST, ISO-8601)
   - `price.india`/`price.world` — anchor `list` to the STANDING price
     (`site.price`), never an older/original price, so an "₹X off" claim
     stays literally true
   - `off.india`/`off.world` — the exact discount phrasing shown on-page
   - `coupon` — the code, or `null` if the discount comes from repricing the
     product directly
3. If the discount is coupon-based: confirm the Pricing card states the code
   right above the pay buttons and in the SR breakdown (already wired via
   `Pricing.astro`'s `coupon`/`coupon-hint` — just confirm the data flows).
   If it's a repriced product, note which Learnyst priceId was raised, since
   that price will need to come back down when the sale ends (see
   `/sale-end`).
4. Set `sale.enabled: true`, commit, push, and confirm `npm run build`
   succeeds.

Never invent a discount, price, or coupon the user hasn't given you.
