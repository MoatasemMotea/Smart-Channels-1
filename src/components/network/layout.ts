/**
 * NETWORK MAP LAYOUT (D-081) — where a normalized map point lands on the
 * canvas stage.
 *
 * Canvas (FULL/LITE): the map is fitted into 70 % × 86 % of the stage
 * (92 % wide below 768 px), centred, and the settled frame keeps the
 * story's final camera push (scale 1.04, 4 px up).
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
