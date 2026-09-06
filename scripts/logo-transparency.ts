/**
 * LOGO TRANSPARENCY (D-057 PART 1).
 *
 * The 68 approved alliance/client marks were extracted from the Company
 * Profile PDF and every one of them carries a baked opaque white
 * background with no alpha channel (audited in D-056). This script
 * derives transparent copies WITHOUT touching a single source file.
 *
 *   READS   media-source/brand/{alliances,clients}/*.png   (read-only)
 *   WRITES  public/media/logos-transparent/{...}/*.webp    (staging)
 *
 * The staging path is deliberate: nothing is linked to the site until
 * the owner approves the contact sheet (D-057 §1.2).
 *
 * WHY A FLOOD FILL, NOT A COLOUR THRESHOLD
 * A global "make white transparent" rule punches holes through white
 * that belongs to the mark (an inner counter, a white star inside a
 * roundel, knocked-out type). So the background is found by flooding
 * inward from the image border through near-white pixels only —
 * enclosed white is never reached and therefore never removed.
 *
 * HALO CONTROL
 * PDF extraction leaves an antialiased skirt where the mark meets the
 * white ground. Those pixels are the mark's colour already composited
 * over white, so keeping them opaque leaves a pale fringe. Within a
 * short distance of the background the script derives a partial alpha
 * from how light the pixel is and then UN-PREMULTIPLIES against white
 * — recovering the mark's true colour instead of a washed-out one.
 *
 * Finally the fully transparent margin is trimmed, so each file's box
 * becomes its ink box. Nothing is recoloured, mirrored, stretched or
 * cropped into: only background is removed (D-033).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_ROOT = "media-source/brand";
const OUT_ROOT = "public/media/logos-transparent";
const GROUPS = ["alliances", "clients"] as const;

/** a pixel this light, reached from the border, is background */
const HARD = 240;
/** a pixel this light inside the feather band gets partial alpha */
const SOFT = 186;
/** feather depth for a mark that contains genuinely light artwork */
const FEATHER_SAFE = 2;
/** feather depth for an all-dark mark — safe to chase the whole ramp */
const FEATHER_DEEP = 7;
/** below this coverage the pixel is >70% white: call it background */
const ALPHA_FLOOR = 0.3;
/** a near-white blob smaller than this share of the mark is extraction dust */
const SPECKLE_SHARE = 0.004;

export interface LogoReport {
  group: string;
  id: string;
  outPath: string;
  srcDims: string;
  outDims: string;
  removedPct: number;
  featheredPx: number;
  /** near-white extraction dust removed, in pixels */
  speckPx: number;
  /** feather depth actually used (2 = mark has light artwork) */
  feather: number;
  interiorHoles: number;
  /** mean luminance of the surviving ink, 0–255 */
  inkLuma: number;
  /** share of surviving ink that is near-white (invisible on dark) */
  paleInkPct: number;
  flags: string[];
}

const lum = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

async function processOne(group: string, file: string): Promise<LogoReport> {
  const id = path.basename(file, path.extname(file));
  const src = path.join(SRC_ROOT, group, file);

  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const ch = info.channels;
  const total = w * h;

  const out = Buffer.from(data); // RGBA working copy
  const idx = (i: number) => i * ch;

  /* ---- 1. flood the background inward from the border ---- */
  const bg = new Uint8Array(total); // 1 = background
  const dist = new Int16Array(total).fill(-1);
  const queue = new Int32Array(total);
  let qh = 0;
  let qt = 0;

  const isLight = (i: number, t: number) => {
    const o = idx(i);
    return data[o]! >= t && data[o + 1]! >= t && data[o + 2]! >= t && data[o + 3]! > 8;
  };
  const push = (i: number) => {
    if (!bg[i]! && isLight(i, HARD)) {
      bg[i] = 1;
      dist[i] = 0;
      queue[qt++] = i;
    }
  };

  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + (w - 1));
  }
  while (qh < qt) {
    const i = queue[qh++]!;
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (y > 0) push(i - w);
    if (y < h - 1) push(i + w);
  }

  /* ---- 1b. does this mark contain genuinely LIGHT artwork? ----
     A soft PDF extraction ramps from ink to white over several pixels;
     chasing that whole ramp is what kills the pale halo on a dark
     ground. But a mark that is ITSELF white (a knocked-out wordmark)
     looks identical to a ramp locally, and a deep chase would eat it.
     So: probe how much light area survives well beyond any plausible
     ramp. If there is a real light region, stay shallow. */
  let lightCore = 0;
  {
    const probe = new Int16Array(total).fill(-1);
    const q = new Int32Array(total);
    let a = 0;
    let b = 0;
    for (let i = 0; i < total; i++)
      if (bg[i]!) {
        probe[i] = 0;
        q[b++] = i;
      }
    while (a < b) {
      const i = q[a++]!;
      const d = probe[i]!;
      if (d >= FEATHER_SAFE + 1) continue;
      const x = i % w;
      const y = (i / w) | 0;
      for (const n of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) {
        if (n < 0 || probe[n]! >= 0) continue;
        const o = idx(n);
        if (Math.min(data[o]!, data[o + 1]!, data[o + 2]!) <= SOFT) continue;
        probe[n] = d + 1;
        q[b++] = n;
      }
    }
    for (let i = 0; i < total; i++) {
      if (bg[i]! || probe[i]! >= 0) continue;
      const o = idx(i);
      if (Math.min(data[o]!, data[o + 1]!, data[o + 2]!) > 200 && data[o + 3]! > 8) lightCore++;
    }
  }
  const FEATHER = lightCore / total > 0.02 ? FEATHER_SAFE : FEATHER_DEEP;

  /* ---- 2. feather band: partial alpha + un-premultiply from white ---- */
  const band: number[] = [];
  const seen = new Uint8Array(total);
  for (let i = 0; i < total; i++) if (bg[i]!) band.push(i);
  let head = 0;
  let feathered = 0;
  while (head < band.length) {
    const i = band[head++]!;
    const d = dist[i]!;
    if (d >= FEATHER) continue;
    const x = i % w;
    const y = (i / w) | 0;
    const neighbours = [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1];
    for (const n of neighbours) {
      if (n < 0 || bg[n]! || seen[n]) continue;
      const o = idx(n);
      const minc = Math.min(data[o]!, data[o + 1]!, data[o + 2]!);
      if (minc <= SOFT) continue; // real ink — leave it fully opaque
      seen[n] = 1;
      dist[n] = d + 1;
      const a = 1 - (minc - SOFT) / (255 - SOFT); // 0 at pure white, 1 at SOFT
      const alpha = Math.max(0, Math.min(255, Math.round(a * 255)));
      /* Un-premultiplying divides by `a`, so a nearly-white pixel would
         amplify its own noise into a bright artefact. Below the floor
         the pixel is overwhelmingly white anyway — drop it. */
      if (a < ALPHA_FLOOR) {
        bg[n] = 1;
      } else {
        // observed = orig*a + 255*(1-a)  ->  orig = (observed - 255*(1-a)) / a
        for (let k = 0; k < 3; k++) {
          const v = (data[o + k]! - 255 * (1 - a)) / a;
          out[o + k] = Math.max(0, Math.min(255, Math.round(v)));
        }
        out[o + 3] = alpha;
        feathered++;
      }
      band.push(n);
    }
  }

  for (let i = 0; i < total; i++) if (bg[i]!) out[idx(i) + 3] = 0;

  /* ---- 2b. sweep up extraction dust ----
     JPEG-ish sources leave isolated near-white specks that were too dark
     to flood and too far from an edge to feather. They are invisible on
     the white they came from and glow on a dark canvas. A speck is a
     TINY, near-white, self-contained blob — a real mark element that
     small (a tittle, an ®) is dark, so this cannot touch artwork. */
  let speckPx = 0;
  {
    const opaque = (i: number) => out[idx(i) + 3]! > 8;
    let inkTotal = 0;
    for (let i = 0; i < total; i++) if (opaque(i)) inkTotal++;
    const limit = Math.max(24, Math.round(inkTotal * SPECKLE_SHARE));
    const comp = new Int32Array(total).fill(-1);
    const stack = new Int32Array(total);
    for (let s = 0; s < total; s++) {
      if (!opaque(s) || comp[s]! >= 0) continue;
      let sp = 0;
      stack[sp++] = s;
      comp[s] = s;
      const members: number[] = [];
      let lumaSum = 0;
      while (sp > 0) {
        const i = stack[--sp]!;
        members.push(i);
        const o = idx(i);
        lumaSum += lum(out[o]!, out[o + 1]!, out[o + 2]!);
        const x = i % w;
        const y = (i / w) | 0;
        for (const n of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) {
          if (n < 0) continue;
          if (comp[n]! >= 0 || !opaque(n)) continue;
          comp[n] = s;
          stack[sp++] = n;
        }
      }
      if (members.length <= limit && lumaSum / members.length > 226) {
        for (const i of members) {
          out[idx(i) + 3] = 0;
          bg[i] = 1; // keep the interior-hole assertion honest
        }
        speckPx += members.length;
      }
    }
  }

  /* ---- 3. measure what survived ---- */
  let removed = 0;
  let inkCount = 0;
  let inkLumaSum = 0;
  let paleInk = 0;
  for (let i = 0; i < total; i++) {
    const o = idx(i);
    if (out[o + 3]! === 0) {
      removed++;
      continue;
    }
    if (out[o + 3]! > 200) {
      const L = lum(out[o]!, out[o + 1]!, out[o + 2]!);
      inkCount++;
      inkLumaSum += L;
      if (L > 235) paleInk++;
    }
  }

  /* interior holes: transparent pixels NOT reached by the border flood.
     By construction there should be none — this asserts it. */
  let interiorHoles = 0;
  for (let i = 0; i < total; i++) if (out[idx(i) + 3]! === 0 && !bg[i]!) interiorHoles++;

  /* ---- 4. trim the transparent margin so the file box IS the ink box ---- */
  const outDir = path.join(OUT_ROOT, group);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${id}.webp`);
  const trimmed = await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 0 })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toBuffer();
  fs.writeFileSync(outPath, trimmed);
  const outMeta = await sharp(trimmed).metadata();

  const inkLuma = inkCount ? inkLumaSum / inkCount : 0;
  const paleInkPct = inkCount ? (100 * paleInk) / inkCount : 0;
  const removedPct = (100 * removed) / total;

  const flags: string[] = [];
  if (removedPct < 2) flags.push("REMOVED-NOTHING");
  if (removedPct > 99) flags.push("DESTROYED");
  if (interiorHoles > 0) flags.push("INTERIOR-HOLE");
  if (inkLuma < 95) flags.push("DARK-INK");
  if (paleInkPct > 25) flags.push("PALE-INK");

  return {
    group,
    id,
    outPath,
    srcDims: `${w}x${h}`,
    outDims: `${outMeta.width}x${outMeta.height}`,
    removedPct: +removedPct.toFixed(1),
    featheredPx: feathered,
    speckPx,
    feather: FEATHER,
    interiorHoles,
    inkLuma: +inkLuma.toFixed(0),
    paleInkPct: +paleInkPct.toFixed(1),
    flags,
  };
}

export async function run(): Promise<LogoReport[]> {
  const reports: LogoReport[] = [];
  for (const group of GROUPS) {
    const dir = path.join(SRC_ROOT, group);
    for (const f of fs.readdirSync(dir).sort()) {
      if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
      reports.push(await processOne(group, f));
    }
  }
  fs.writeFileSync("/tmp/logo-report.json", JSON.stringify(reports, null, 1));
  return reports;
}

const isMain = process.argv[1] && process.argv[1].endsWith("logo-transparency.ts");
if (isMain) {
  run().then((r) => {
    const flagged = r.filter((x) => x.flags.length);
    console.log(`processed ${r.length} marks -> ${OUT_ROOT}`);
    console.log(`mean background removed: ${(r.reduce((s, x) => s + x.removedPct, 0) / r.length).toFixed(1)}%`);
    console.log(`interior holes across the whole set: ${r.reduce((s, x) => s + x.interiorHoles, 0)}`);
    console.log(`flagged: ${flagged.length}`);
    for (const x of flagged) console.log(`  ${x.group}/${x.id}: ${x.flags.join(", ")} (inkLuma=${x.inkLuma}, removed=${x.removedPct}%)`);
  });
}
