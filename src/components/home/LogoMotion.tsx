/**
 * Logo marquees — Technology Alliances + Our Clients (D-056).
 *
 * One continuously flowing horizontal strip per ecosystem, with NO
 * frame, tile or plate around the marks: each approved logo is placed
 * directly on the section canvas — never mirrored, stretched, cropped
 * or distorted (D-033).
 *
 * COLOUR (D-078 supersedes the D-033 "never recolored" rule for the
 * rails, by owner directive 2026-09-21): at rest every mark is drawn in
 * ONE colour — white on the dark theme, dark on the light theme — via a
 * CSS `filter` on the <img>; the original colours return on :hover and
 * on keyboard focus of the rail (200 ms, none under reduced motion). A
 * mark whose background is part of its design (a solid brand box, where
 * the D-057 flood fill found no separable ground) is exempt through
 * `originalColor` on its record → `data-original-color` on the cell →
 * no filter, ever. Exceptions are named in the decision log.
 *
 * SIZE (D-078): the delivery files are trimmed to their ink box, so a
 * plain `block-size: clamp(28px, 2.4vw, 40px)` on the <img> sizes every
 * mark by its INK; marks wider than 4:1 are capped at 180 px.
 *
 * Motion is CSS ONLY — a single `transform` animation on the track, no
 * JavaScript, no rAF, no layout- or paint-animated properties. The
 * track carries two identical copies of the sequence and travels
 * exactly one copy-width (-50% of the track), so the loop closes with
 * no visible jump. The duplicate copy is aria-hidden so a screen reader
 * announces every company exactly once.
 *
 * Direction: the two ecosystems flow AGAINST each other, and both flip
 * with the reading direction so Arabic reads correctly.
 *
 * The flow pauses on :hover and :focus-within. Under
 * prefers-reduced-motion (and the project's STATIC motion tier) there
 * is no motion at all: the rail becomes a plain, fully readable
 * scrollable strip with a single copy and no edge fade.
 */
export interface RailLogo {
  id: string;
  name: string;
  src: string;
  /** D-078: shown in its own colours, outside the unified-colour filter. */
  originalColor?: boolean;
}

export function LogoCarousel({
  logos,
  rtl,
  kind,
  label,
}: {
  logos: RailLogo[];
  rtl: boolean;
  kind: "alliance" | "client";
  /** Accessible name for the scrollable/pausable rail region. */
  label: string;
}) {
  /* Alliances and Clients travel in opposite directions, and the whole
     pairing mirrors in Arabic — the viewport itself stays direction-
     isolated because the row is physical artwork, not text. */
  const reversed = (kind === "client") !== rtl;

  const seq = (copy: "a" | "b") => (
    <ul className={`rail-copy rail-copy-${copy}`} aria-hidden={copy === "b" || undefined}>
      {logos.map((l) => (
        <li
          key={`${copy}-${l.id}`}
          className={`rail-cell ${kind}-rail-cell`}
          data-id={l.id}
          data-original-color={l.originalColor ? "" : undefined}
        >
          <span className="rail-plate">
            {/* geometry preserved — never mirrored, stretched, cropped or
                distorted; colour unified by CSS at rest (D-078) */}
            {/* eslint-disable-next-line @next/next/no-img-element -- approved marks, CSS ink sizing */}
            <img src={l.src} alt={copy === "a" ? l.name : ""} loading="lazy" draggable={false} />
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`logo-rail logo-rail-${kind}`}>
      {/* Focusable on purpose: under reduced motion this strip becomes a
          horizontally scrollable region, and WCAG 2.1.1 requires that
          scroll to be reachable from the keyboard. Focus also pauses the
          flow, which is the only way a keyboard user can hold a mark
          still — there is nothing else focusable inside the rail. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- named, keyboard-scrollable region */}
      <div className="rail-viewport" dir="ltr" tabIndex={0} role="group" aria-label={label}>
        <div className="rail-track" data-flow={reversed ? "reverse" : "forward"}>
          {seq("a")}
          {seq("b")}
        </div>
      </div>
      <div className="rail-underline" aria-hidden="true" />
    </div>
  );
}
