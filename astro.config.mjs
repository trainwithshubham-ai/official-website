// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Static output, deployed to the apex domain via GitHub Actions.
// Tailwind v4 is wired through its Vite plugin — there is NO tailwind.config file;
// the design tokens live in src/styles/tokens.css via the @theme block.
export default defineConfig({
  site: "https://trainwithshubham.ai",
  output: "static",
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
