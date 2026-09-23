---
paths:
  - "src/content/**"
---

# Content lives in validated JSON (golden rule 3)

Copy that varies by data (reviews, curriculum, FAQ, testimonials) lives in
JSON under `src/content/`, not as hardcoded lists inside a component.

- `reviews` is a zod-validated content collection (`src/content/config.ts`).
- Everything else is validated and re-exported through `src/content/data.ts` —
  components import from `data.ts`, never the raw JSON file directly, so a
  malformed edit fails the build instead of shipping broken or missing copy.
- Components map over the imported data; they don't carry their own
  hardcoded copy arrays.

Why: this keeps content edits (adding a review, a curriculum stage, an FAQ
entry) a data change instead of a code change, and zod catches a typo'd or
missing field at build time rather than at runtime on the live page.

Never invent an entry to fill a gap (golden rule 4) — if a field is missing,
omit it rather than guessing a value.
