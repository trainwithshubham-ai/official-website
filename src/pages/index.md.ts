import type { APIRoute } from "astro";
import { flagshipMarkdown } from "../lib/markdown";

// Markdown twin of the home page (/index.md) for agents and answer engines.
export const GET: APIRoute = () =>
  new Response(flagshipMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
