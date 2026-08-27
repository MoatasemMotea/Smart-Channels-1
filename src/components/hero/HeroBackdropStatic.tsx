/**
 * Designed static hero backdrop (I-11): the final state of the visual
 * system as a still — served to STATIC tier, no-JS, and as the base under
 * the live canvas. Pure inline SVG, decorative, zero runtime cost.
 * Dark cinematic environment in both themes (D-019) — colors are
 * intentionally literal to the dark scene, not theme tokens.
 */
export function HeroBackdropStatic() {
  // deterministic star-field (seeded at authoring time, matches engine look)
  const nodes = [
    [6, 18, 1.6], [14, 62, 1.1], [21, 34, 2.0], [28, 78, 1.2], [33, 22, 1.4],
    [39, 55, 1.0], [46, 30, 1.8], [52, 70, 1.3], [58, 16, 1.1], [63, 44, 2.2],
    [69, 66, 1.2], [74, 26, 1.5], [80, 52, 1.0], [86, 38, 1.9], [91, 74, 1.3],
    [95, 20, 1.1], [10, 84, 1.4], [43, 88, 1.6], [77, 86, 1.1], [88, 8, 1.4],
  ] as const;
  return (
    <svg
      className="hero-backdrop"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="100" height="100" fill="#0a0a0c" />
      <radialGradient id="hero-atmos" cx="68%" cy="30%" r="70%">
        <stop offset="0%" stopColor="rgba(141,52,146,0.14)" />
        <stop offset="100%" stopColor="rgba(141,52,146,0)" />
      </radialGradient>
      <rect width="100" height="100" fill="url(#hero-atmos)" />
      {nodes.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r * 0.22} fill={`rgba(226,226,229,${0.25 + (i % 3) * 0.2})`} />
      ))}
      <polyline
        points="21,34 46,30 63,44 86,38"
        fill="none"
        stroke="rgba(255,24,156,0.35)"
        strokeWidth="0.18"
      />
      <circle cx="63" cy="44" r="0.5" fill="rgba(255,24,156,0.9)" />
    </svg>
  );
}
