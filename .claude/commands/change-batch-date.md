---
description: Move the cohort batch start date, following CLAUDE.md's checklist
---

Read CLAUDE.md's "Changing the batch date — checklist" (under § Key facts)
before touching anything, then:

1. Ask the user for the new batch start date/time if not already given.
2. Edit `batchStartISO` in `src/config/site.ts` (India Standard Time,
   `+05:30`). This is the only field to edit — the hero line, both
   countdowns, the FAQ, and the JSON-LD `startDate` all derive from it.
3. Commit and push. Confirm `npm run build` succeeds first.
4. Remind the user: **redeploy on the batch start day** (an empty commit or a
   manual workflow run) is a required second step. `batchStarted` is
   evaluated at build time and frozen — without a redeploy on the day, the
   Countdown island flips client-side to "batch is live" while the hero,
   the screen-reader sentence, and the FAQ still say "starts," contradicting
   the page's own timer.

Do not invent or guess a date — if the user hasn't given one, ask.
