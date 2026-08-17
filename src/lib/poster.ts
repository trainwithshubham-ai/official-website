// Poster helpers. Runs at BUILD time only (static output), so touching the filesystem
// here is safe and nothing ships to the browser.
//
// Why this exists: a <source> whose file 404s does NOT fall back to the <img> beside it.
// The browser picks the source, fails, and renders a broken image. So emitting
// `poster.replace(".jpg", ".webp")` unconditionally means the day someone adds a course
// with a JPG-only poster, the thumbnail silently breaks on /courses and on the upsell
// card — worse than never having had WebP at all. Checking the file exists turns that
// into a clean, automatic fallback to the JPG.
import { existsSync } from "node:fs";
import { join } from "node:path";

// Resolved from the working directory, NOT from import.meta.url. Astro bundles this
// module into dist/.prerender/ before running it, so import.meta.url points at the build
// output and every existsSync check silently failed — which looked exactly like "no WebP
// exists" and quietly dropped every <source> on the site.
const PUBLIC_DIR = join(process.cwd(), "public");

const swapExt = (src: string, suffix: string) =>
  /\.(jpg|jpeg|png)$/i.test(src)
    ? src.replace(/\.(jpg|jpeg|png)$/i, suffix)
    : null;

/**
 * WebP siblings for a poster, or null when they aren't on disk.
 * Returns null for a non-raster source too, so a `.webp` or `.svg` poster never gets a
 * `type="image/webp"` source pointing at an unchanged path.
 */
export function posterWebpSources(poster?: string): {
  webp: string;
  webp640: string;
} | null {
  if (!poster) return null;
  const webp = swapExt(poster, ".webp");
  const webp640 = swapExt(poster, "-640.webp");
  if (!webp || !webp640) return null;
  if (
    !existsSync(join(PUBLIC_DIR, webp)) ||
    !existsSync(join(PUBLIC_DIR, webp640))
  ) {
    return null;
  }
  return { webp, webp640 };
}
