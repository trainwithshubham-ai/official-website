// Markdown builders for agents and answer engines (llms.txt, llms-full.txt and the
// per-page .md twins). ONE module, so the three outputs can never disagree with each
// other or with the page. Every fact is read from site.ts, courses.ts or src/content
// (golden rules 1, 3, 4): nothing is typed here that could drift or be invented.
import { site, activePrice, saleLive } from "../config/site";
import { courses, isDraftCourse, type Course } from "../config/courses";
import {
  curriculum,
  outcomes,
  inclusions,
  audience,
  projects,
  faq,
  tools,
} from "../content/data";

const home = `${site.domain}/`;
const abs = (path: string) => new URL(path, site.domain).href;

/** Courses that are public: drafts are excluded everywhere. */
export const publicCourses: Course[] = Object.values(courses).filter(
  (c: Course) => !isDraftCourse(c),
);

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

const faqMd = (items: { q: string; a: string }[]) =>
  items.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");

// --- flagship ---------------------------------------------------------------
export const flagshipUrl = home;
export const flagshipMdUrl = abs("/index.md");

export function flagshipMarkdown(): string {
  const p = activePrice;
  const saleLine = saleLive
    ? `\nSale: ${site.sale.name}, ends ${site.sale.endsISO}. Coupon: ${site.sale.coupon}.\n`
    : "";
  return `# ${site.product}

> ${site.summary}

- Provider: ${site.brand} (${home})
- Instructor: Shubham Londhe, Developer Advocate at Temporal and founder of ${site.brand}
- Format: self-paced, recorded. Start any day. ${site.videoHours} hours of lessons, ${site.access} of access.
- Level: complete beginners to working engineers. No prior experience required.
- Language: English
- Price: ${p.india.now} in India (list price ${p.india.list}), ${p.world.now} for the rest of the world (list price ${p.world.list}). One-time payment.${saleLine}
- Enroll: ${home}#pricing
- Rating: ${site.googleRating} out of 5 from ${site.googleReviewCount} Google reviews. ${site.studentsTrained} engineers trained.

## What you will be able to do

${outcomes.map((o) => `- **${o.title}**: ${o.body}`).join("\n")}

## Curriculum

${curriculum
  .map(
    (s) =>
      `### Stage ${s.stage}: ${s.title} (${s.label})\n\n${bullets(s.bullets)}\n\nTools: ${s.tags.join(", ")}`,
  )
  .join("\n\n")}

## Projects

${projects.map((pr) => `- **${pr.title}**: ${pr.desc}`).join("\n")}

## What is included

${bullets(inclusions)}

## Tools covered

${tools.join(", ")}

## Who it is for

${bullets(audience.forYou)}

## Who it is not for

${bullets(audience.notForYou)}

## FAQ

${faqMd(faq)}

## Links

- Course catalog: ${abs("/courses/")}
- YouTube: ${site.social.youtube.url}
- English YouTube: ${site.englishSocial.youtube}
- Hindi site: ${site.altSites.hindi}
`;
}

// --- standalone courses -----------------------------------------------------
export const courseMdUrl = (c: Course) => abs(`/${c.slug}.md`);
export const courseUrl = (c: Course) => abs(`/${c.slug}/`);

const priceLine = (c: Course): string => {
  if (c.comingSoon) return "Coming soon";
  if (c.free) return "Free";
  if (c.price)
    return `${c.price.india.now} in India, ${c.price.world.now} for the rest of the world (one-time payment)`;
  return "See the course page";
};

export function courseMarkdown(c: Course): string {
  const modules = c.curriculum ?? [];
  const lines: string[] = [];
  lines.push(`# ${c.title}`, "", `> ${c.description}`, "");
  lines.push(`- Provider: ${site.brand} (${home})`);
  lines.push(`- Instructor: Shubham Londhe`);
  lines.push(`- Price: ${priceLine(c)}`);
  if (c.availability) lines.push(`- Availability: ${c.availability}`);
  if (c.volume?.hours) lines.push(`- Length: ${c.volume.hours} hours`);
  // Price and Length are already stated above; skip duplicates from at-a-glance.
  for (const row of c.atAGlance ?? [])
    if (!["price", "length"].includes(row.label.toLowerCase()))
      lines.push(`- ${row.label}: ${row.value}`);
  lines.push(`- Page: ${courseUrl(c)}`);
  if (c.repo) lines.push(`- Source code: ${c.repo}`);
  lines.push("");
  if (c.includes?.length) lines.push("## What is included", "", bullets(c.includes), "");
  if (modules.length) {
    lines.push("## Curriculum", "");
    for (const m of modules) {
      const phase = m.phase ? ` (${m.phase})` : "";
      const tags = m.tags?.length ? ` Tools: ${m.tags.join(", ")}.` : "";
      lines.push(`- **${m.module}**${phase}${m.desc ? `: ${m.desc}` : "."}${tags}`);
    }
    lines.push("");
  }
  if (c.techStack?.length) lines.push("## Tech stack", "", c.techStack.join(", "), "");
  if (c.faq?.length) lines.push("## FAQ", "", faqMd(c.faq), "");
  return lines.join("\n");
}

// --- catalog ----------------------------------------------------------------
export function coursesMarkdown(): string {
  return `# Courses by ${site.brand}

> ${site.brand} teaches DevOps, Cloud, Python and AI engineering with hands-on, production-style projects. All courses are in English.

- [${site.product}](${home}): ${site.summary}
${publicCourses
  .map((c) => `- [${c.title}](${courseUrl(c)}): ${c.tagline}`)
  .join("\n")}
`;
}

// --- llms.txt (index) -------------------------------------------------------
export function llmsTxt(): string {
  return `# ${site.brand}

> ${site.summary}

${site.brand} is run by Shubham Londhe. This site is the English edition. Every page has a plain Markdown twin: append \`.md\` to the path (the home page is /index.md). Full text of everything: ${abs("/llms-full.txt")}.

## Courses

- [${site.product}](${flagshipMdUrl}): Flagship self-paced course, ${site.videoHours} hours of recorded lessons, ${site.access} of access, price and FAQ included.
${publicCourses
  .map((c) => `- [${c.title}](${courseMdUrl(c)}): ${c.tagline}`)
  .join("\n")}
- [All courses](${abs("/courses.md")}): Catalog of every course.

## Optional

- [Full text of all courses](${abs("/llms-full.txt")}): Single Markdown file.
- [Sitemap](${abs("/sitemap-index.xml")}): Every indexable URL.
- [YouTube](${site.social.youtube.url}): Free lessons.
- [English YouTube](${site.englishSocial.youtube})
- [GitHub](${site.github}): Open-source courses and the #90DaysOfDevOps challenge.
- [Hindi site](${site.altSites.hindi}): Hindi and Hinglish edition of TrainWithShubham.
- Contact: ${site.contactEmail}
`;
}

// --- llms-full.txt ----------------------------------------------------------
export function llmsFullTxt(): string {
  const parts = [
    `# ${site.brand}: full text\n\n> ${site.summary}\n`,
    flagshipMarkdown(),
    ...publicCourses.map(courseMarkdown),
  ];
  return parts.join("\n---\n\n");
}
