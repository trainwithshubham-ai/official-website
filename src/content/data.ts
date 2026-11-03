// Validated content access (ARCHITECTURE.md §2, golden rule 3).
// Every JSON content file is parsed through its zod schema at BUILD time here, so
// a malformed edit fails the build with a clear error instead of shipping broken.
// Components import typed data from this module (not the raw JSON).
// (reviews.json is validated separately via its Astro content collection.)
import { z } from "astro:content";
import { site } from "../config/site";
import {
  curriculumSchema,
  outcomeSchema,
  projectSchema,
  faqSchema,
  audienceSchema,
} from "../content.config";

import curriculumRaw from "./curriculum.json";
import outcomesRaw from "./outcomes.json";
import projectsRaw from "./projects.json";
import faqRaw from "./faq.json";
import audienceRaw from "./audience.json";
import toolsRaw from "./tools.json";
import inclusionsRaw from "./inclusions.json";
import companiesRaw from "./companies.json";

export const curriculum = z.array(curriculumSchema).parse(curriculumRaw);
export const outcomes = z.array(outcomeSchema).parse(outcomesRaw);
export const projects = z.array(projectSchema).parse(projectsRaw);
// Copy may use {videoHours} and {access}; they resolve from site.ts HERE, once, so the
// FAQ component, the FAQPage JSON-LD, Pricing and the markdown/llms.txt outputs all read
// the same already-resolved text and a retyped figure can't drift (golden rule 1).
// An unknown {token} fails the build instead of shipping literal braces.
const fill = (s: string): string => {
  const out = s
    .replaceAll("{videoHours}", site.videoHours)
    .replaceAll("{access}", site.access)
    .replaceAll("{hindiSite}", site.altSites.hindi);
  const bad = out.match(/\{[a-zA-Z]+\}/);
  if (bad) throw new Error(`Unresolved content token ${bad[0]} in: "${s}". Known: {videoHours} {access} {hindiSite}.`);
  return out;
};

export const faq = z
  .array(faqSchema)
  .parse(faqRaw)
  .map((f) => ({ ...f, a: fill(f.a) }));
export const audience = audienceSchema.parse(audienceRaw);
export const tools = z.array(z.string()).parse(toolsRaw);
export const inclusions = z.array(z.string()).parse(inclusionsRaw).map(fill);
export const companies = z.array(z.string()).parse(companiesRaw);
