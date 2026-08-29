import { getTranslations } from "next-intl/server";

/**
 * HERO — Riyadh cityscape composition (P5 Visual Correction §1).
 *
 * Original stylized vector art (drawn for this project — no photography,
 * no third-party assets): a layered Saudi urban silhouette on the hero
 * horizon — far ridge, mid skyline, and a near plane carrying a
 * distinctive Riyadh-tower silhouette — under a cool night atmosphere
 * with the brand's magenta signal light. Brand/capability storytelling
 * only (§1): the label reuses the approved "RIYADH — HEADQUARTERS"
 * wording; nothing is presented as project evidence.
 *
 * Server-rendered SVG: present in every tier including STATIC/no-JS.
 * Depth: layers drift subtly (CSS, FULL/LITE) and parallax on scroll
 * where the browser supports view-timelines. The live particle/signal
 * canvas renders ABOVE this layer — topology over the city.
 */
export async function HeroCityscape() {
  const t = await getTranslations("opening");

  // window lights for the near towers (deterministic, sparse)
  const windows: Array<{ x: number; y: number; w: number; h: number; o: number }> = [];
  const cols = [
    { x: 208, y: 250, rows: 7, cw: 4 },
    { x: 224, y: 262, rows: 6, cw: 4 },
    { x: 1178, y: 262, rows: 6, cw: 4 },
    { x: 1194, y: 250, rows: 7, cw: 4 },
    { x: 1330, y: 286, rows: 5, cw: 4 },
  ];
  cols.forEach((c, ci) => {
    for (let r = 0; r < c.rows; r++) {
      if ((r * 7 + ci * 3) % 4 === 0) continue; // unlit windows
      windows.push({ x: c.x, y: c.y + r * 13, w: c.cw, h: 3, o: 0.5 + ((r + ci) % 3) * 0.16 });
    }
  });

  return (
    <div className="hero-cityscape" aria-hidden="true">
      <svg
        viewBox="0 0 1600 430"
        preserveAspectRatio="xMidYMax slice"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id="sky-cool" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#101838" stopOpacity="0" />
            <stop offset="0.55" stopColor="#16214c" stopOpacity="0.5" />
            <stop offset="1" stopColor="#1a2554" stopOpacity="0.78" />
          </linearGradient>
          <radialGradient id="tower-glow" cx="0.5" cy="0.45" r="0.5">
            <stop offset="0" stopColor="var(--brand-magenta)" stopOpacity="0.5" />
            <stop offset="0.5" stopColor="var(--brand-purple)" stopOpacity="0.26" />
            <stop offset="1" stopColor="var(--brand-purple)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="horizon-band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4468e0" stopOpacity="0" />
            <stop offset="1" stopColor="#4468e0" stopOpacity="0.34" />
          </linearGradient>
        </defs>

        {/* cool night atmosphere settling onto the horizon */}
        <rect x="0" y="120" width="1600" height="310" fill="url(#sky-cool)" />
        <rect x="0" y="300" width="1600" height="130" fill="url(#horizon-band)" />
        {/* magenta light behind the tower district */}
        <ellipse cx="800" cy="320" rx="560" ry="240" fill="url(#tower-glow)" />

        {/* FAR ridge — distant city mass */}
        <path
          className="city-far"
          fill="#242c58"
          opacity="0.55"
          d="M0 372 L60 366 L90 370 L140 356 L180 362 L240 350 L300 360 L340 348 L420 358 L470 344 L540 356 L600 346 L660 354 L720 340 L780 350 L860 342 L920 352 L980 340 L1040 350 L1100 338 L1160 350 L1240 342 L1300 354 L1360 344 L1420 356 L1480 348 L1540 358 L1600 350 L1600 430 L0 430 Z"
        />

        {/* MID skyline — varied blocks and slim towers */}
        <path
          className="city-mid"
          fill="#161c40"
          d="M0 392 L40 392 L40 344 L70 344 L70 392 L120 392 L120 318 L134 310 L148 318 L148 392 L200 392 L200 240 L216 232 L236 240 L236 392 L290 392 L290 330 L330 330 L330 392 L380 392 L380 300 L392 292 L406 300 L406 392 L470 392 L470 350 L520 350 L520 392 L580 392 L580 322 L600 314 L622 322 L622 392 L700 392 L700 356 L742 356 L742 392 L860 392 L860 352 L900 352 L900 392 L980 392 L980 318 L1000 310 L1020 318 L1020 392 L1080 392 L1080 344 L1120 344 L1120 392 L1170 392 L1170 240 L1186 232 L1204 240 L1204 392 L1260 392 L1260 330 L1300 330 L1300 392 L1322 392 L1322 276 L1338 268 L1354 276 L1354 392 L1420 392 L1420 348 L1470 348 L1470 392 L1530 392 L1530 366 L1600 366 L1600 430 L0 430 Z"
        />

        {/* NEAR plane — the distinctive Riyadh tower silhouette (stylized
            original art: tapering shaft with the open crown arch) */}
        <g className="city-near">
          <path
            fill="#0a0b1a"
            d="M0 430 L0 402 L90 402 L90 380 L150 380 L150 402 L260 402 L260 372 L320 372 L320 402 L560 402 L560 388 L640 388 L640 402 L940 402 L940 386 L1030 386 L1030 402 L1240 402 L1240 376 L1310 376 L1310 402 L1440 402 L1440 384 L1520 384 L1520 402 L1600 402 L1600 430 Z"
          />
          {/* tower: shaft */}
          <path
            fill="#0c0d1e"
            d="M766 402 L774 210 Q800 196 826 210 L834 402 Z"
          />
          {/* tower: open crown arch (negative space) */}
          <path
            fill="#0c0d1e"
            d="M774 210 Q800 148 826 210 Q800 196 774 210 Z"
          />
          <path fill="#0c0d1e" d="M796 148 L800 118 L804 148 Z" />
          {/* crown light */}
          <path
            className="tower-crown"
            d="M778 208 Q800 158 822 208"
            fill="none"
            stroke="var(--brand-magenta)"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <circle className="tower-beacon" cx="800" cy="120" r="2.6" fill="var(--brand-magenta)" />
        </g>

        {/* lit windows — sparse, warm-neutral */}
        {windows.map((w, i) => (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width={w.w}
            height={w.h}
            fill="#cdd3e8"
            opacity={w.o * 0.85}
          />
        ))}

        {/* signal routes over the city — topology above the skyline */}
        <path
          className="city-signal city-signal-a"
          d="M240 236 Q520 150 800 150 Q1080 150 1190 236"
          fill="none"
          stroke="var(--brand-magenta)"
          strokeWidth="1"
          opacity="0.35"
        />
        <path
          className="city-signal city-signal-b"
          d="M410 296 Q620 220 800 208 Q1010 220 1338 272"
          fill="none"
          stroke="#5f7bdc"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle className="city-node" cx="240" cy="236" r="2.2" fill="var(--brand-magenta)" opacity="0.8" />
        <circle className="city-node" cx="1190" cy="236" r="2.2" fill="var(--brand-magenta)" opacity="0.8" />
        <circle className="city-node" cx="1338" cy="272" r="2" fill="#8ea4ec" opacity="0.8" />
      </svg>
      {/* approved wording only — Riyadh is the origin, not a project claim */}
      <p className="hero-city-label microlabel">{t("hqLabel")}</p>
    </div>
  );
}
