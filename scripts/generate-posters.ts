/**
 * Video poster generation (A-005): creates a poster JPG for every
 * PUBLISHED gallery/project video that lacks one. A manually supplied
 * `poster` value in the content record always wins (this script never
 * overwrites an existing file). Unpublished candidates are skipped
 * (Amendment 3).
 *
 * Requires ffmpeg on PATH (documented prerequisite for video processing
 * only — the site itself builds without it).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { basename, join } from "node:path";
import { galleryItems } from "../src/content/gallery";

const root = join(import.meta.dirname, "..");

function posterPathFor(videoSrc: string): string {
  return `/media/posters/${basename(videoSrc).replace(/\.\w+$/, "")}.jpg`;
}

function hasFfmpeg(): boolean {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function main() {
  const videos = galleryItems.filter((g) => g.type === "video" && g.published);
  if (videos.length === 0) {
    console.log("generate-posters: no published videos — nothing to do.");
    return;
  }
  if (!hasFfmpeg()) {
    console.error("generate-posters: ffmpeg not found on PATH. Install ffmpeg and re-run.");
    process.exit(1);
  }
  mkdirSync(join(root, "public/media/posters"), { recursive: true });
  for (const v of videos) {
    const poster = v.poster ?? posterPathFor(v.src);
    const dest = join(root, "public", poster);
    if (existsSync(dest)) {
      console.log(`= ${v.id}: poster exists (manual override respected)`);
      continue;
    }
    const source = join(root, "public", v.src);
    if (!existsSync(source)) {
      console.warn(`⚠ ${v.id}: video derivative missing — run media-ingest first`);
      continue;
    }
    execFileSync("ffmpeg", ["-v", "error", "-ss", "1", "-i", source, "-frames:v", "1", dest]);
    console.log(`+ ${v.id}: poster generated at ${poster}`);
  }
}

main();
