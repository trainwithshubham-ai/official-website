// @ts-check
import { defineConfig } from "astro/config";
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
  vite: {
    plugins: [tailwindcss()],
  },
});
