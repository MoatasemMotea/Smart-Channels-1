/**
 * Logo marquees — Technology Alliances + Our Clients (D-056).
 *
 * One continuously flowing horizontal strip per ecosystem, with NO
 * frame, tile or plate around the marks: each approved logo is placed
 * directly on the section canvas in its original colours and geometry —
 * never recolored, mirrored, stretched, cropped or distorted (D-033).
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
        <li key={`${copy}-${l.id}`} className={`rail-cell ${kind}-rail-cell`}>
          <span className="rail-plate">
            {/* original color/geometry preserved — never recolored,
                mirrored, stretched, cropped or distorted */}
            {/* eslint-disable-next-line @next/next/no-img-element -- approved marks, CSS contain sizing */}
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
