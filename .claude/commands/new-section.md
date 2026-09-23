---
description: Build the next IA section following CLAUDE.md's build-order workflow
argument-hint: [section name]
---

Follow CLAUDE.md's § Build order and ARCHITECTURE.md §8:

1. Identify the next section in IA order that hasn't been built yet (or use
   the section named in the argument, if given).
2. Before writing markup, consult the `astro` and `tailwind-design-system`
   skills for anything scaffolding/config-shaped.
3. Build only this one section — read its contract in ARCHITECTURE.md
   (§4.x), reusing `site.ts` / `src/content/data.ts` for any data, never
   hardcoded copy (golden rules 1 and 3).
4. While building, keep `frontend-design` and `web-design-guidelines` in mind
   so it reads as distinctive and accessible, not generic or AI-generated
   (BRAND.md §9).
5. Stop and present this one section for review. Do not continue to the next
   section in the same turn — Shubham reviews iteratively, one section at a
   time.
