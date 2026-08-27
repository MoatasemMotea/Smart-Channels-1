/**
 * Stylized Saudi Arabia geography + projection (D-017/B-3, K-13).
 *
 * The polygon is a deliberately refined, stylized silhouette — immediately
 * recognizable as Saudi Arabia, artistically abstracted (no political-border
 * styling, no cartographic-accuracy claim). It is the single geometry
 * source for the opening scene, the P6 National Signal Field, and the
 * point-cloud generator.
 *
 * Owner-canonical coordinates are latitude/longitude (locations.ts);
 * project() derives normalized positions — never hand-maintained (K-13).
 */

/** [longitude, latitude] outline, clockwise. Stylized, not survey data. */
export const SAUDI_OUTLINE: ReadonlyArray<readonly [number, number]> = [
  [34.9, 29.3], [36.5, 29.2], [37.6, 30.4], [39.0, 32.1], [40.4, 31.9],
  [42.0, 31.1], [44.7, 29.2], [46.5, 29.1], [47.5, 28.9], [47.7, 28.5],
  [48.4, 28.1], [49.0, 27.6], [49.3, 27.0], [50.2, 26.6], [50.1, 25.9],
  [50.8, 25.0], [51.2, 24.6], [52.0, 23.0], [55.0, 22.7], [55.7, 22.0],
  [52.0, 19.0], [49.1, 18.6], [47.0, 17.4], [45.4, 17.3], [43.9, 17.4],
  [43.2, 16.7], [42.8, 16.4], [42.5, 17.1], [41.5, 18.0], [41.0, 19.5],
  /* Jeddah coast: keep the true 39.17E inside the stylized shoreline */
  [39.45, 20.75], [38.95, 22.0], [38.5, 23.4], [37.5, 24.6], [36.8, 25.7],
  [36.0, 26.6], [35.4, 27.6], [34.9, 28.2],
];

const lons = SAUDI_OUTLINE.map((p) => p[0]);
const lats = SAUDI_OUTLINE.map((p) => p[1]);
export const GEO_BOUNDS = {
  minLon: Math.min(...lons),
  maxLon: Math.max(...lons),
  minLat: Math.min(...lats),
  maxLat: Math.max(...lats),
};

/**
 * Equirectangular projection into normalized 0–1 space with a latitude
 * aspect correction so the silhouette keeps believable proportions.
 * y grows downward (screen space).
 */
export function project(latitude: number, longitude: number): { x: number; y: number } {
  const { minLon, maxLon, minLat, maxLat } = GEO_BOUNDS;
  const x = (longitude - minLon) / (maxLon - minLon);
  const y = (maxLat - latitude) / (maxLat - minLat);
  return { x, y };
}

/** Width/height ratio of the projected map region (for layout). */
export function mapAspect(): number {
  const { minLon, maxLon, minLat, maxLat } = GEO_BOUNDS;
  const midLat = ((minLat + maxLat) / 2) * (Math.PI / 180);
  return ((maxLon - minLon) * Math.cos(midLat)) / (maxLat - minLat);
}

export function pointInSaudi(longitude: number, latitude: number): boolean {
  let inside = false;
  const poly = SAUDI_OUTLINE;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const pi = poly[i]!;
    const pj = poly[j]!;
    const [xi, yi] = pi;
    const [xj, yj] = pj;
    if (yi > latitude !== yj > latitude && longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/** Distance (in degrees, approx) from a point to the outline — used for
 *  coastline/contour emphasis in the generated point cloud. */
export function distanceToOutline(longitude: number, latitude: number): number {
  let min = Infinity;
  const poly = SAUDI_OUTLINE;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const pi = poly[i]!;
    const pj = poly[j]!;
    const d = segmentDistance(longitude, latitude, pi[0], pi[1], pj[0], pj[1]);
    if (d < min) min = d;
  }
  return min;
}

function segmentDistance(
  px: number, py: number, ax: number, ay: number, bx: number, by: number,
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}
