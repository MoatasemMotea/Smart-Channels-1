import type { HeroMediaConfig, HeroSceneConfig } from "@/types/content";

/**
 * HERO PHOTOGRAPHIC SCENE (Riyadh media round · D-041).
 *
 * The owner-approved Riyadh skyline photograph is the Hero's primary
 * media layer. The untouched master is archived at
 * media-source/images/riyadh-skyline-hero-approved-2026-08-29.webp;
 * the entries below are its production web derivatives (never served
 * from media-source/). Replacing the photograph later = regenerate
 * derivatives + edit these paths. The programmatic technology layers
 * (origin, signal routes, particles) are drawn ABOVE whatever this
 * config points to.
 */
export const heroScene: HeroSceneConfig = {
  src: "/media/hero/riyadh-1672.jpg",
  srcSet: [
    "/media/hero/riyadh-640.webp 640w",
    "/media/hero/riyadh-960.webp 960w",
    "/media/hero/riyadh-1280.webp 1280w",
    "/media/hero/riyadh-1672.webp 1672w",
  ].join(", "),
  // portrait viewports render the art-direction frame at ≈178% of the
  // viewport height (cover math), landscape at the viewport width
  sizes: "(orientation: portrait) 178vh, 100vw",
  width: 1672,
  height: 941,
};

/**
 * HERO CINEMATIC MEDIA SLOT (P4 Rev3 §§7–9 · D-024).
 *
 * The final Hero is designed for an AI-GENERATED cinematic
 * event-technology film (brand/capability storytelling media — never
 * presented as project evidence, and never arbitrary stock footage).
 *
 * STATUS: the approved AI asset does not exist yet, so `enabled` is false
 * and the Hero renders the approved Riyadh photographic scene
 * (`heroScene` above). When the owner approves the generated media it
 * plays inside the same art-direction frame, above the photograph
 * (which remains the poster/fallback). To enable:
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
