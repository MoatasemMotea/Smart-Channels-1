/**
 * NETWORK MAP LAYOUT (D-081) — where a normalized map point lands on the
 * stage, shared by the canvas engine and the city-button overlay so the
 * buttons sit exactly on the drawn nodes.
 *
 * Canvas (FULL/LITE): the map is fitted into 70 % × 86 % of the stage
 * (92 % wide below 768 px), centred, and the settled frame keeps the
 * story's final camera push (scale 1.04, 4 px up).
 * Static SVG (STATIC/no-JS): an 86 % box inset 7 %, viewBox letterboxed
 * (preserveAspectRatio meet).
 */
export type Rect = { x: number; y: number; w: number; h: number };

export function canvasMapRect(width: number, height: number, aspect: number): Rect {
  const availW = width * (width < 768 ? 0.92 : 0.7);
  const availH = height * 0.86;
  let w = availW;
  let h = w / aspect;
  if (h > availH) {
    h = availH;
    w = h * aspect;
  }
  return { x: (width - w) / 2, y: (height - h) / 2, w, h };
}

/** final camera of the story (settled frame) */
export const FINAL_PUSH = { scale: 1.04, lift: 4 };

export function canvasPoint(nx: number, ny: number, width: number, height: number, aspect: number) {
  const r = canvasMapRect(width, height, aspect);
  const x = r.x + nx * r.w;
  const y = r.y + ny * r.h;
  return {
    x: (x - width / 2) * FINAL_PUSH.scale + width / 2,
    y: (y - height / 2 - FINAL_PUSH.lift) * FINAL_PUSH.scale + height / 2,
  };
}

export function staticPoint(nx: number, ny: number, width: number, height: number, aspect: number) {
  const bw = width * 0.86;
  const bh = height * 0.86;
  let w = bw;
  let h = w / aspect;
  if (h > bh) {
    h = bh;
    w = h * aspect;
  }
  return { x: width * 0.07 + (bw - w) / 2 + nx * w, y: height * 0.07 + (bh - h) / 2 + ny * h };
}
