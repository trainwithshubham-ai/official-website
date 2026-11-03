import type { APIRoute } from "astro";
import { coursesMarkdown } from "../lib/markdown";

export const GET: APIRoute = () =>
  new Response(coursesMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
