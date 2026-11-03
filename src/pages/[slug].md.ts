import type { APIRoute, GetStaticPaths } from "astro";
import { courseMarkdown, publicCourses } from "../lib/markdown";

// Markdown twin of each public course page (/python.md, /linux.md, ...). Draft courses
// are excluded by `publicCourses`, same rule as the sitemap and the catalog.
export const getStaticPaths = (() =>
  publicCourses.map((c) => ({
    params: { slug: c.slug },
    props: { course: c },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(courseMarkdown(props.course), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
