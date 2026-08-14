// Generate the WebP siblings every course poster needs.
//
//   node scripts/generate-posters.mjs              # every .jpg in public/posters
//   node scripts/generate-posters.mjs linux        # just public/posters/linux.jpg
//
// CourseLanding serves the poster as <picture> with a 1280w WebP, a 640w WebP for
// phones, and the .jpg as the fallback. The poster is the LCP element on a course page,
// so shipping only the 1280w JPG into a ~360px slot costs real load time on mobile.
// This script makes the two WebP variants reproducible instead of hand-made.
import { readdirSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const dir = fileURLToPath(new URL("../public/posters", import.meta.url));
const only = process.argv.slice(2).map((a) => basename(a, extname(a)));

const sources = readdirSync(dir)
  .filter((f) => /\.jpe?g$/i.test(f))
  .filter((f) => !only.length || only.includes(basename(f, extname(f))));

if (!sources.length) {
  console.error(
    only.length
      ? `No matching .jpg in public/posters for: ${only.join(", ")}`
      : "No .jpg posters found in public/posters.",
  );
  process.exit(1);
}

for (const file of sources) {
  const name = basename(file, extname(file));
  const src = join(dir, file);

  // Normalise the JPG itself to 1280×720 first. Art usually arrives straight from a
  // design tool at 4096px and well over a megabyte; that file is the <img> fallback, so
  // shipping it unresized would hand every non-WebP visitor a multi-megabyte LCP image.
  // Done in place, so keep your full-resolution master outside public/.
  const meta = await sharp(src).metadata();
  if (meta.width !== 1280 || meta.height !== 720) {
    const normalised = await sharp(src)
      .resize(1280, 720, { fit: "cover" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    writeFileSync(src, normalised);
    console.log(
      `${name}: normalised jpg ${meta.width}x${meta.height} -> 1280x720`,
    );
  }

  // 1280w: the full-width poster on desktop. Quality 82 is the point where the dark,
  // flat course art stops showing banding but the file stays well under the JPG.
  await sharp(src)
    .resize(1280, 720, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(join(dir, `${name}.webp`));

  // 640w: phones. The slot is ~360 CSS px, so 640 covers a 2x screen.
  await sharp(src)
    .resize(640, 360, { fit: "cover" })
    .webp({ quality: 80 })
    .toFile(join(dir, `${name}-640.webp`));

  console.log(`${name}: wrote ${name}.webp + ${name}-640.webp`);
}
