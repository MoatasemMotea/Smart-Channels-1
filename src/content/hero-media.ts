import type { HeroMediaConfig } from "@/types/content";

/**
 * HERO CINEMATIC MEDIA SLOT (P4 Rev3 §§7–9 · D-024).
 *
 * The final Hero is designed for an AI-GENERATED cinematic
 * event-technology film (brand/capability storytelling media — never
 * presented as project evidence, and never arbitrary stock footage).
 *
 * STATUS: the approved AI asset does not exist yet, so `enabled` is false
 * and the Hero renders the approved particle-field treatment. When the
 * owner approves the generated media:
 *   1. place files under /public/media/hero/  (see the spec below)
 *   2. fill the paths and set enabled: true
 * No component changes are required.
 *
 * FINAL ASSET SPECIFICATION (D-024):
 * - hero-desktop.mp4  — 21:9-safe 16:9 master, 2560×1440 (min 1920×1080),
 *   10–16 s seamless loop, H.264 high profile ≈8–10 Mbps (plus optional
 *   AV1/WebM at ≈4 Mbps), no audio track, dark grade with magenta accents,
 *   LEFT 55% of frame kept calm/dark as the text-safe region (RIGHT 55%
 *   for RTL builds is achieved by the same centered-energy composition).
 * - hero-mobile.mp4   — 9:16 or 4:5 recomposed derivative (NOT a crop),
 *   1080×1350 max, 8–10 s loop, ≈2.5 Mbps, subject recentered.
 * - hero-poster.avif/jpg — first-frame-equivalent still, 2560×1440 AVIF
 *   (+ JPEG fallback ≤300 KB); doubles as the STATIC-tier visual.
 */
export const heroMedia: HeroMediaConfig = {
  enabled: false,
  videoSrc: null,
  videoMobileSrc: null,
  poster: null,
};
