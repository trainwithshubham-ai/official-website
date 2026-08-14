// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// Draft course routes (a free course whose Learnyst enrolment URL isn't wired yet). They
// build so they can be reviewed locally, but they must not be advertised to search.
import { draftSlugs } from "./src/config/courses.ts";

// Static output, deployed to the apex domain via GitHub Actions.
// Tailwind v4 is wired through its Vite plugin — there is NO tailwind.config file;
// the design tokens live in src/styles/tokens.css via the @theme block.
export default defineConfig({
  site: "https://trainwithshubham.ai",
  output: "static",
  // Vanity URLs. The canonical route stays the descriptive one, because that is what
  // people actually search for ("claude code course", not "claude course") and what the
  // course is called on Learnyst. These short aliases exist purely to be SAID OUT LOUD in
  // a video or a reel, where "/claude" is much easier to land than "/claude-code".
  // Static output emits a small meta-refresh page per alias. Astro gives each one
  // `robots: noindex` and a canonical pointing at the real route, and @astrojs/sitemap
  // skips redirect routes automatically, so the two URLs never compete for the keyword.
  redirects: {
    "/claude": "/claude-code",
  },
  build: {
    // Single page → inline all CSS into the HTML to remove the render-blocking
    // stylesheet request (improves FCP/LCP). Gzips well; nothing to cache across
    // pages since there's only one.
    inlineStylesheets: "always",
  },
  // Sitemap is generated from the real route list at build time, so a new course
  // page can never be left out (the hand-written public/sitemap.xml it replaced had
  // only ever listed the homepage). Emits sitemap-index.xml + sitemap-0.xml —
  // robots.txt points at the index.
  integrations: [
    sitemap({
      changefreq: "weekly",
      // Keep draft course routes out. A page carrying `noindex` should not also be
      // submitted for indexing — the two signals would contradict each other.
      filter: (page) =>
        !draftSlugs.some((slug) => page.endsWith(`/${slug}/`)),
      // No `lastmod`: the option stamps EVERY entry with the same build timestamp,
      // which would claim every page changed on every deploy. Omitting it is more
      // honest than asserting a date we don't actually track per page.
      serialize: (item) => ({
        ...item,
        // Keep the homepage the primary URL, as the old hand-written file did.
        priority: item.url === "https://trainwithshubham.ai/" ? 1.0 : 0.7,
      }),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
