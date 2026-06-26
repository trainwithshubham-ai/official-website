// Rasterize public/og-image.svg → public/og-image.png at 1200×630.
// Run: node scripts/generate-og.mjs
// (Placeholder pipeline; later this can template the SVG from src/config/site.ts
//  so the OG card stays in sync with the single source of truth.)
import { readFileSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const svg = readFileSync(new URL("../public/og-image.svg", import.meta.url));
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: true },
  background: "#0A0E12",
});
const png = resvg.render().asPng();
writeFileSync(new URL("../public/og-image.png", import.meta.url), png);
console.log(`og-image.png written (${(png.length / 1024).toFixed(1)} KB)`);
