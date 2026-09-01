import type { CSSProperties, JSX } from "react";
import { heroObjects, type HeroObjectMotif } from "@/content/hero-objects";

/**
 * Small drifting technology objects above the Riyadh photograph
 * (final pre-media directive §2.1/§2.2 · D-050).
 *
 * Server-rendered, decorative-only (aria-hidden). Motion is pure CSS
 * keyed off the pre-paint motion tier: FULL/LITE get slow multi-depth
 * orbital drift, STATIC (and prefers-reduced-motion via the tier
 * bootstrap) renders the objects perfectly still. Line-art motifs are
 * programmatic placeholders — each slot is media-ready for an
 * owner-approved asset (see hero-objects.ts).
 *
 * V2 §8 (D-054) — TECHNOLOGY SIGNAL FIELD. Two things make the layer read
 * as a field rather than a decoration:
 *
 * 1. NOTHING IS SYNCHRONISED. Every object gets its own drift period and
 *    a negative start offset, derived deterministically from its slot so
 *    the server and client agree. No two objects ever share a phase.
 * 2. THE FIELD HAS REAL DEPTH. The deepest objects paint UNDER the
 *    scrims — inside the photographic atmosphere of the city — while the
 *    nearest paint in front of the whole scene. The architecture is still
 *    the hero: the objects stay small, unlit and clear of the headline.
 *
 * No HUD, no readouts, no invented metrics.
 */

/* deterministic per-slot timing: same numbers on the server and the
   client, no two objects in phase */
const DRIFT_BASE: Record<1 | 2 | 3, number> = { 1: 44, 2: 58, 3: 74 };
const LAYER: Record<1 | 2 | 3, "near" | "mid" | "far"> = {
  1: "near",
  2: "mid",
  3: "far",
};
function timing(i: number, depth: 1 | 2 | 3) {
  const spread = 0.78 + ((i * 37) % 45) / 100; // 0.78 … 1.22
  const drift = DRIFT_BASE[depth] * spread;
  return {
    "--drift-dur": `${drift.toFixed(1)}s`,
    "--drift-delay": `-${((i * 53) % 97).toFixed(1)}s`,
    "--twinkle-dur": `${(9 + ((i * 29) % 13)).toFixed(1)}s`,
    "--twinkle-delay": `-${((i * 41) % 17).toFixed(1)}s`,
  } as CSSProperties;
}

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** 48×48 line-art motifs — engineered, restrained, never gaming/holograms */
const MOTIFS: Record<HeroObjectMotif, JSX.Element> = {
  cctv: (
    <g {...S}>
      <rect x="8" y="16" width="24" height="12" rx="3" />
      <path d="M32 19l8-3v12l-8-3" />
      <path d="M14 28v6h10" />
      <circle cx="14" cy="22" r="2.4" stroke="var(--brand-magenta)" />
    </g>
  ),
  chip: (
    <g {...S}>
      <rect x="14" y="14" width="20" height="20" rx="2.5" />
      <rect x="20" y="20" width="8" height="8" stroke="var(--brand-magenta)" />
      <path d="M18 14V8M24 14V8M30 14V8M18 40v-6M24 40v-6M30 40v-6M14 18H8M14 24H8M14 30H8M40 18h-6M40 24h-6M40 30h-6" />
    </g>
  ),
  ap: (
    <g {...S}>
      <circle cx="24" cy="30" r="7" />
      <circle cx="24" cy="30" r="1.6" stroke="var(--brand-magenta)" />
      <path d="M14 20a14 14 0 0 1 20 0" />
      <path d="M9 15a21 21 0 0 1 30 0" opacity="0.55" />
    </g>
  ),
  rack: (
    <g {...S}>
      <rect x="13" y="8" width="22" height="32" rx="2" />
      <path d="M13 16h22M13 24h22M13 32h22" />
      <circle cx="18" cy="12" r="1.2" stroke="var(--brand-magenta)" />
      <circle cx="18" cy="20" r="1.2" stroke="var(--brand-magenta)" />
      <path d="M26 12h6M26 20h6M26 28h6M26 36h6" opacity="0.6" />
    </g>
  ),
  sensor: (
    <g {...S}>
      <path d="M24 30V16" />
      <circle cx="24" cy="33" r="4" />
      <circle cx="24" cy="33" r="1.4" stroke="var(--brand-magenta)" />
      <path d="M18 12a8.5 8.5 0 0 1 12 0" />
      <path d="M14 8a14 14 0 0 1 20 0" opacity="0.55" />
    </g>
  ),
  switch: (
    <g {...S}>
      <rect x="8" y="18" width="32" height="12" rx="2.5" />
      <path d="M13 24h2.5M19 24h2.5M25 24h2.5M31 24h2.5" />
      <circle cx="37" cy="24" r="1.2" stroke="var(--brand-magenta)" />
      <path d="M14 18v-5m10 5v-8m10 8v-5" opacity="0.6" />
    </g>
  ),
  fiber: (
    <g {...S}>
      <circle cx="24" cy="24" r="5" />
      <circle cx="24" cy="24" r="1.5" stroke="var(--brand-magenta)" />
      <path d="M10 12c6 4 8 6 10.5 8.5M38 12c-6 4-8 6-10.5 8.5M10 36c6-4 8-6 10.5-8.5M38 36c-6-4-8-6-10.5-8.5" opacity="0.6" />
    </g>
  ),
};

export function HeroTechObjects() {
  return (
    <div className="hero-objects" aria-hidden="true">
      {heroObjects.map((o, i) => (
        <span
          key={o.id}
          className="hero-object"
          data-depth={o.depth}
          data-layer={LAYER[o.depth]}
          data-desktop-only={o.desktopOnly ? "" : undefined}
          style={{
            insetInlineStart: `${o.inlineStart}%`,
            top: `${o.top}%`,
            width: `clamp(26px, ${o.size}vw, 58px)`,
            ...timing(i, o.depth),
          }}
        >
          <span className="hero-object-drift">
            {o.src ? (
              // eslint-disable-next-line @next/next/no-img-element -- tiny decorative slot; next/image adds nothing
              <img src={o.src} alt="" loading="lazy" decoding="async" />
            ) : (
              <svg viewBox="0 0 48 48">{MOTIFS[o.motif]}</svg>
            )}
          </span>
        </span>
      ))}
    </div>
  );
}
