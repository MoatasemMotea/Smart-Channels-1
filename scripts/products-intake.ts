/**
 * PRODUCT MEDIA INTAKE (D-058).
 *
 * Derives the delivery assets for the owner's 2026 product photography.
 *
 *   READS   media-source/images/products-intake/   (18 owner originals)
 *   WRITES  public/media/products/<slug>-2026.webp
 *
 * The filename is the ONLY source of truth for a product name (D-058
 * §2); the two owner-confirmed spelling corrections are listed in
 * NAME_FIX and nothing else is renamed, guessed or translated.
 *
 * Every delivery path is NEW. D-053 is binding here: reusing an
 * existing path serves a stale cached variant, so a replaced image
 * always lands beside the old one rather than on top of it.
 *
 * Sixteen of the eighteen originals are cut-outs on a transparent
 * background, so their fully transparent margin is trimmed — empty
 * space only, no pixel of the product is touched — which is what makes
 * the products read at a consistent size inside the card. The two
 * opaque originals (a white-ground studio shot and a full-bleed scene)
 * are left framed exactly as supplied.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "media-source/images/products-intake";
const OUT = "public/media/products";
/** owner-confirmed spelling corrections (D-058 §2) */
const NAME_FIX: Record<string, string> = {
  "Acces Points": "Access Points",
  "Media Covertor": "Media Converter",
};
/** longest edge of a delivery asset; cards render ~321px, so this
 *  still covers a 2x display with room to spare */
const MAX_EDGE = 1200;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export interface IntakeRow {
  file: string;
  name: string;
  slug: string;
  out: string;
  width: number;
  height: number;
  /** transparent cut-out, white studio ground, or full-bleed scene */
  ground: "cutout" | "white" | "scene";
  trimmed: boolean;
  kb: number;
}

export async function run(): Promise<IntakeRow[]> {
  fs.mkdirSync(OUT, { recursive: true });
  const rows: IntakeRow[] = [];

  for (const file of fs.readdirSync(SRC).sort()) {
    if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
    const raw = path.basename(file, path.extname(file)).replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
    // Title Case (D-058 §2): capitalise each word's first letter and keep
    // the rest exactly as written, so NVR, UPS, HDMI, P2P and T60 survive
    const titled = raw.replace(/\b[a-z]/g, (c) => c.toUpperCase());
    const name = NAME_FIX[titled] ?? titled;
    const slug = slugify(name);

    const src = path.join(SRC, file);
    const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let transparent = 0;
    const total = info.width * info.height;
    for (let i = 0; i < total; i++) if (data[i * info.channels + 3]! < 16) transparent++;
    const cutout = transparent / total > 0.05;

    let pipeline = sharp(src);
    if (cutout) pipeline = pipeline.trim({ threshold: 0 }); // transparent margin only
    const buf = await pipeline
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 100, effort: 6 })
      .toBuffer();

    const outName = `${slug}-2026.webp`;
    const outPath = path.join(OUT, outName);
    if (fs.existsSync(outPath)) throw new Error(`refusing to overwrite an existing delivery path: ${outPath}`);
    fs.writeFileSync(outPath, buf);
    const m = await sharp(buf).metadata();

    rows.push({
      file,
      name,
      slug,
      out: `/media/products/${outName}`,
      width: m.width!,
      height: m.height!,
      ground: cutout ? "cutout" : info.channels === 4 && transparent === 0 && file.endsWith(".jpeg") ? "scene" : "white",
      trimmed: cutout,
      kb: Math.round(buf.length / 1024),
    });
  }
  fs.writeFileSync("/tmp/intake-rows.json", JSON.stringify(rows, null, 1));
  return rows;
}

const isMain = process.argv[1] && process.argv[1].endsWith("products-intake.ts");
if (isMain) {
  run().then((rows) => {
    console.log(`derived ${rows.length} delivery assets -> ${OUT}\n`);
    console.log("NAME".padEnd(18), "OUT".padEnd(28), "DIMENSIONS".padEnd(12), "GROUND".padEnd(8), "SIZE");
    for (const r of rows)
      console.log(
        r.name.padEnd(18),
        path.basename(r.out).padEnd(28),
        `${r.width}x${r.height}`.padEnd(12),
        r.ground.padEnd(8),
        `${r.kb} KB`,
      );
    console.log(`\ntotal: ${rows.reduce((s, r) => s + r.kb, 0)} KB`);
  });
}
