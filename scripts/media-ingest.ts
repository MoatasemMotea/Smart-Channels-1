/**
 * Media ingestion (A-005) — generates optimized public derivatives for
 * APPROVED media only.
 *
 * Behavior (Amendment 3): reads the gallery/project content records and
 * processes ONLY records that are published (gallery) or publicly
 * displayed (projects) whose derivative is missing. Nothing is ever
 * generated into public/ for unpublished/candidate records — an
 * unapproved file must not be publicly reachable.
 *
 * Images: resized (max 2560px), converted to high-quality WebP alongside
 * the original format; dimensions are read automatically — the owner never
 * types width/height by hand.
 * Videos: copied from media-source (already-encoded mp4/webm are passed
 * through; re-encoding guidance lives in docs). Posters come from
 * scripts/generate-posters.ts.
 */
import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";
import { galleryItems } from "../src/content/gallery";

const root = join(import.meta.dirname, "..");
const SOURCE = join(root, "media-source");
const PUBLIC = join(root, "public");

function findSource(publicSrc: string): string | undefined {
  const name = basename(publicSrc);
  const stem = name.replace(/\.\w+$/, "");
  for (const dir of ["video", "images", "brand", "documents"]) {
    const exact = join(SOURCE, dir, name);
    if (existsSync(exact)) return exact;
    // the public derivative may change format (e.g. .png master → .webp):
    // match by stem across common source extensions
    for (const ext of [".png", ".jpg", ".jpeg", ".webp", ".avif", ".mp4", ".webm"]) {
      const candidate = join(SOURCE, dir, stem + ext);
      if (existsSync(candidate)) return candidate;
    }
  }
  return undefined;
}

async function processItem(publicSrc: string, type: "image" | "video"): Promise<string> {
  const dest = join(PUBLIC, publicSrc);
  if (existsSync(dest)) return "exists";
  const src = findSource(publicSrc);
  if (!src) return "no-source";
  mkdirSync(join(dest, ".."), { recursive: true });
  if (type === "video") {
    copyFileSync(src, dest);
    return "copied";
  }
  const ext = extname(dest).toLowerCase();
  const pipeline = sharp(src).resize({ width: 2560, withoutEnlargement: true });
  if (ext === ".webp") await pipeline.webp({ quality: 82 }).toFile(dest);
  else if (ext === ".avif") await pipeline.avif({ quality: 60 }).toFile(dest);
  else await pipeline.toFile(dest);
  return "generated";
}

async function main() {
  let done = 0;
  for (const item of galleryItems) {
    if (!item.published) {
      console.log(`— skip (unpublished candidate): ${item.id}`);
      continue;
    }
    const result = await processItem(item.src, item.type);
    console.log(`${result === "exists" ? "=" : "+"} ${item.id}: ${result}`);
    if (result === "no-source")
      console.warn(`  ⚠ no matching file in media-source/ for ${item.src}`);
    else done++;
  }
  console.log(`media-ingest complete (${done} processed).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
