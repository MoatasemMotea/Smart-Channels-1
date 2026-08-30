import type { GulfRegion } from "@/types/content";

/**
 * GULF REGIONAL REACH (P4 Rev3 §10 · D-021 semantics).
 *
 * These are REGIONAL-REACH storytelling destinations for the network
 * scene's closing beat — NOT project-evidence locations. They render as
 * hollow reach markers with muted labels under a "Regional reach" legend,
 * visually distinct from the source-backed national project nodes.
 * Claiming completed projects here would require approved evidence and a
 * separate owner decision.
 *
 * HOW TO EDIT: toggle `enabled`, or adjust names. Coordinates are
 * geographic reference points (K-13: lat/lon canonical).
 */
export const gulfRegions: GulfRegion[] = [
  { id: "bahrain", name: { en: "Bahrain", ar: "البحرين" }, latitude: 26.05, longitude: 50.55, enabled: true },
  // D-050 §8 (owner decision): the reach story shows Saudi cities +
  // Riyadh + Bahrain only — Qatar and UAE points removed from the
  // presentation. Records kept disabled for a future owner re-enable.
  { id: "qatar", name: { en: "Qatar", ar: "قطر" }, latitude: 25.3, longitude: 51.2, enabled: false },
  { id: "uae", name: { en: "UAE", ar: "الإمارات" }, latitude: 24.3, longitude: 54.4, enabled: false },
];
