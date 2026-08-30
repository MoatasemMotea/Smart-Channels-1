/**
 * HERO TECHNOLOGY OBJECTS (final pre-media directive §2.1/§2.2 · D-050).
 *
 * A small floating layer of technology-integration motifs above the
 * Riyadh photograph: CCTV, processor, wireless access point, server
 * rack, IoT sensor, network switch, fiber node. Each object is SMALL
 * (≈2–4% of hero width), drifts slowly at its own depth, and never
 * competes with the headline.
 *
 * MEDIA-READY: every slot carries an optional `src`. While `src` is
 * null the component renders the programmatic line-art motif; when the
 * owner supplies approved object assets, place them under
 * /public/media/hero/objects/ and fill the paths — no component
 * changes. Never invent third-party product imagery here.
 *
 * Positions use LOGICAL inline offsets so the layer mirrors correctly
 * in RTL, always staying clear of the editorial column.
 */
export type HeroObjectMotif =
  | "cctv"
  | "chip"
  | "ap"
  | "rack"
  | "sensor"
  | "switch"
  | "fiber";

export interface HeroObjectSlot {
  id: string;
  motif: HeroObjectMotif;
  /** future owner-approved asset (e.g. "/media/hero/objects/cctv.webp") */
  src: string | null;
  /** distance from the inline-start edge, % of hero width */
  inlineStart: number;
  /** distance from the top edge, % of hero height */
  top: number;
  /** rendered width as % of hero width (§2: 2–4%) */
  size: number;
  /** 1 = nearest/fastest drift … 3 = deepest/slowest */
  depth: 1 | 2 | 3;
  /** objects hidden on small viewports (§2.2: only 3–4 on mobile) */
  desktopOnly?: boolean;
}

export const heroObjects: HeroObjectSlot[] = [
  { id: "obj-cctv", motif: "cctv", src: null, inlineStart: 58, top: 18, size: 3.2, depth: 1 },
  { id: "obj-chip", motif: "chip", src: null, inlineStart: 84, top: 30, size: 2.6, depth: 2 },
  { id: "obj-ap", motif: "ap", src: null, inlineStart: 70, top: 12, size: 2.8, depth: 3 },
  { id: "obj-sensor", motif: "sensor", src: null, inlineStart: 90, top: 16, size: 2.2, depth: 1 },
  { id: "obj-rack", motif: "rack", src: null, inlineStart: 64, top: 44, size: 3.6, depth: 2, desktopOnly: true },
  { id: "obj-switch", motif: "switch", src: null, inlineStart: 78, top: 52, size: 3.4, depth: 3, desktopOnly: true },
  { id: "obj-fiber", motif: "fiber", src: null, inlineStart: 50, top: 34, size: 2.4, depth: 2, desktopOnly: true },
];
