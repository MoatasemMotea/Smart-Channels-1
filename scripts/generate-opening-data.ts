/**
 * Opening-data generator (D-018 / A-2 — owner-approved method).
 *
 * Produces src/generated/opening-data.ts from:
 *  1. the authoritative logo master (media-source/brand/) — RASTER
 *     SAMPLING of the SC mark region into a particle point-cloud. The
 *     readable identity in the sequence is always the untouched raster
 *     asset (crossfade at coherence); these points only drive motion.
 *     If an official vector is supplied later, replace the sampling
 *     source here — the animation system is unchanged (D-018).
 *  2. the stylized Saudi outline (src/lib/map/geo.ts) — a depth-layered
 *     geographic point-cloud with coastline/contour emphasis (B-3).
 *
 * Deterministic (seeded) → identical committed output on re-runs.
 * Regenerate with: npm run generate:opening
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { GEO_BOUNDS, distanceToOutline, mapAspect, pointInSaudi, project } from "../src/lib/map/geo";

const root = join(import.meta.dirname, "..");
const LOGO = join(root, "media-source/brand/logo-master-extracted.png");
const OUT = join(root, "src/generated/opening-data.ts");

// Mark region inside the 1147x939 master (the SC blob + particle dots;
// the wordmark is delivered by the raster crossfade, not by particles).
const MARK = { left: 290, top: 20, width: 610, height: 660 };
// per-class particle budget: the magenta blob is the dominant mass,
// purple satellite dots and white SC letterforms are supporting cues.
const LOGO_TARGET = { magenta: 900, purple: 280, white: 420 };
const MAP_POINT_TARGET = 2600;

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = { x: number; y: number; c: 0 | 1 | 2; d: 0 | 1 | 2 };
// c: 0 neutral/white · 1 magenta · 2 purple    d: depth layer (0 far … 2 near)

async function sampleLogo(): Promise<Pt[]> {
  const rnd = mulberry32(20260827);
  const img = sharp(LOGO).extract(MARK).raw().ensureAlpha();
  const { data, info } = await img.toBuffer({ resolveWithObject: true });
  const pts: Pt[] = [];
  const step = 3; // dense grid; thinned below
  for (let y = 0; y < info.height; y += step) {
    for (let x = 0; x < info.width; x += step) {
      const i = (y * info.width + x) * 4;
      const a = data[i + 3]!;
      if (a < 140) continue;
      const r = data[i]!;
      const g = data[i + 1]!;
      const b = data[i + 2]!;
      let c: Pt["c"];
      if (r > 200 && g < 110 && b > 110) c = 1; // magenta blob
      else if (r > 100 && r < 190 && b > 100 && g < 90) c = 2; // purple dots
      else if (r > 225 && g > 225 && b > 225) c = 0; // white SC letters
      else continue;
      pts.push({
        x: (x + (rnd() - 0.5) * step) / MARK.width,
        y: (y + (rnd() - 0.5) * step) / MARK.height,
        c,
        d: (rnd() < 0.2 ? 0 : rnd() < 0.5 ? 1 : 2) as Pt["d"],
      });
    }
  }
  // seeded random thinning to per-class targets (no stride banding)
  const thinned: Pt[] = [];
  const classes: Array<[Pt["c"], number]> = [
    [1, LOGO_TARGET.magenta],
    [2, LOGO_TARGET.purple],
    [0, LOGO_TARGET.white],
  ];
  for (const [c, target] of classes) {
    const pool = pts.filter((p) => p.c === c);
    const prob = Math.min(1, target / Math.max(1, pool.length));
    for (const pt of pool) if (rnd() < prob) thinned.push(pt);
  }
  return thinned;
}

function sampleMap(): Pt[] {
  const rnd = mulberry32(19320923);
  const { minLon, maxLon, minLat, maxLat } = GEO_BOUNDS;
  const pts: Pt[] = [];
  // Interior fill with jitter + coastline/contour emphasis (B-3):
  // near-outline points are denser and biased to the near layer so the
  // silhouette reads immediately without a drawn border.
  const grid = 0.34;
  for (let lon = minLon; lon <= maxLon; lon += grid) {
    for (let lat = minLat; lat <= maxLat; lat += grid) {
      const jLon = lon + (rnd() - 0.5) * grid * 0.9;
      const jLat = lat + (rnd() - 0.5) * grid * 0.9;
      if (!pointInSaudi(jLon, jLat)) continue;
      const edge = distanceToOutline(jLon, jLat);
      const nearEdge = edge < 0.55;
      if (!nearEdge && rnd() < 0.18) continue; // airy but present
      const p = project(jLat, jLon);
      pts.push({
        x: p.x,
        y: p.y,
        c: 0,
        // Depth 2 (near layer) is RESERVED for the contour pass so the
        // silhouette reads instantly; interior recedes on layers 0/1.
        d: (rnd() < 0.45 ? 1 : 0) as Pt["d"],
      });
    }
  }
  // Contour pass: dense, near-layer, tight to the outline so the Saudi
  // silhouette reads immediately (owner amendment to B-3) while staying
  // particle-built rather than a drawn border.
  for (let t = 0; t < 1; t += 1 / 900) {
    if (rnd() < 0.08) continue;
    const outline = samplePolyline(t);
    const wobble = 0.02 + rnd() * 0.05;
    const lon = outline.lon + (rnd() - 0.5) * wobble;
    const lat = outline.lat + (rnd() - 0.5) * wobble;
    const p = project(lat, lon);
    pts.push({ x: p.x, y: p.y, c: 0, d: 2 });
  }
  // Interleave contour and interior points so ANY prefix/stride of the
  // array still describes the full silhouette (critical for LITE).
  const shuffled = pts.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const tmp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = tmp;
  }
  return shuffled.slice(0, MAP_POINT_TARGET);
}

import { SAUDI_OUTLINE } from "../src/lib/map/geo";
function samplePolyline(t: number): { lon: number; lat: number } {
  const segs: number[] = [];
  let total = 0;
  for (let i = 0; i < SAUDI_OUTLINE.length; i++) {
    const a = SAUDI_OUTLINE[i]!;
    const b = SAUDI_OUTLINE[(i + 1) % SAUDI_OUTLINE.length]!;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    segs.push(len);
    total += len;
  }
  let dist = t * total;
  for (let i = 0; i < segs.length; i++) {
    if (dist <= segs[i]!) {
      const a = SAUDI_OUTLINE[i]!;
      const b = SAUDI_OUTLINE[(i + 1) % SAUDI_OUTLINE.length]!;
      const u = segs[i] === 0 ? 0 : dist / segs[i]!;
      return { lon: a[0] + (b[0] - a[0]) * u, lat: a[1] + (b[1] - a[1]) * u };
    }
    dist -= segs[i]!;
  }
  const last = SAUDI_OUTLINE[0]!;
  return { lon: last[0], lat: last[1] };
}

function encode(pts: Pt[]): string {
  // compact tuples keep the generated module small
  return `[${pts.map((p) => `[${p.x.toFixed(4)},${p.y.toFixed(4)},${p.c},${p.d}]`).join(",")}]`;
}

async function main() {
  const logoPts = await sampleLogo();
  const mapPts = sampleMap();
  const body = `/**
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: npm run generate:opening
 * Source: authoritative logo master (D-018 raster sampling) + stylized
 * Saudi outline (src/lib/map/geo.ts). Deterministic seeds.
 */
export type OpeningPoint = [x: number, y: number, color: 0 | 1 | 2, depth: 0 | 1 | 2];
export const LOGO_POINTS: OpeningPoint[] = ${encode(logoPts)};
export const MAP_POINTS: OpeningPoint[] = ${encode(mapPts)};
export const MAP_ASPECT = ${mapAspect().toFixed(4)};
`;
  writeFileSync(OUT, body);
  console.log(`generated: ${logoPts.length} logo points, ${mapPts.length} map points → src/generated/opening-data.ts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
