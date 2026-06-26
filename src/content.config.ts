// Content collections (Astro 5 Content Layer) + zod schemas — ARCHITECTURE.md §2.
// Shubham edits JSON in src/content/; components map over validated data.
//
// Only `reviews` is registered now because reviews.json is the only seeded data
// file. The remaining schemas are exported and ready: when a section is built,
// drop its JSON into src/content/ and register the collection here.
import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

/* ---- schemas (ARCHITECTURE.md §2) ---- */

// REAL, consented reviews/testimonials (Google reviews and/or student
// testimonials) — never invent or misquote a reviewer's words (golden rule 4).
export const reviewSchema = z.object({
  name: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string(),
  // Optional: Google reviews carry dateLabel + url; student testimonials carry
  // photo/role/company/outcome instead.
  dateLabel: z.string().optional(),
  url: z.string().url().optional(),
  localGuide: z.boolean().optional(),
  // Optional enrichment — render only when present and REAL/consented
  // (golden rule 4). Lets cards show faces + roles like aiengg without
  // fabricating anything: omit cleanly when absent.
  photo: z.string().optional(), // path under /public, e.g. /students/x.jpg
  role: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  outcome: z.string().optional(),
});

export const curriculumSchema = z.object({
  stage: z.string(),
  label: z.string(),
  title: z.string(),
  bullets: z.array(z.string()),
  tags: z.array(z.string()),
});

export const outcomeSchema = z.object({ title: z.string(), body: z.string() });
export const projectSchema = z.object({
  title: z.string(),
  desc: z.string(),
  tools: z.array(z.string()),
});
export const toolSchema = z.object({ name: z.string(), logo: z.string() });
export const faqSchema = z.object({ q: z.string(), a: z.string() });
export const audienceSchema = z.object({
  forYou: z.array(z.string()),
  notForYou: z.array(z.string()),
});

/* ---- registered collections ---- */

const reviews = defineCollection({
  // reviews.json is a bare array with no id field; derive a stable id by index
  // so the file loader is happy without mutating the seeded data on disk.
  loader: file("src/content/reviews.json", {
    parser: (text) =>
      JSON.parse(text).map((r: unknown, i: number) => ({ id: String(i), ...(r as object) })),
  }),
  schema: reviewSchema,
});

export const collections = { reviews };
