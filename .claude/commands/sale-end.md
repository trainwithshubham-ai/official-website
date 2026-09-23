---
description: Tear down the current sale, following CLAUDE.md's teardown checklist
---

Read CLAUDE.md's "Ending a sale is three steps" section (under § Key facts)
before touching anything. The site is static, so nothing reverts on its own
when the countdown expires — all steps are manual:

1. Set `site.sale.enabled: false` in `src/config/site.ts`, commit, push, and
   confirm `npm run build` succeeds. (The countdown flips to "sale ended" and
   the CSS drops the now-false offer claim automatically once this deploys.)
2. Remind the user to deactivate the sale's coupon in Learnyst (this repo
   can't do that step — it's a Learnyst dashboard action).
3. Check `src/config/site.ts`'s current `sale.checkout`/priceId comments: if
   a Learnyst price was **temporarily raised** so a coupon could discount it
   back down (rather than the priceId already sitting at the standing
   price), remind the user to return that Learnyst price to the standing
   amount. Skip this step only if the sale used the standing-price priceIds
   unchanged (check the comment above `sale:` in site.ts for what actually
   happened last time).

Do not mark the sale torn down until you've confirmed with the user that the
Learnyst-side steps (2 and 3) are done — this repo can only complete step 1.
