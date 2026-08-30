import type { ReactNode } from "react";

/**
 * INNER-PAGE cinematic intro (P6 · D-043).
 *
 * The dark-committed opening moment of an inner route (Q-P6-3 policy:
 * theme-aware editorial bodies, dark cinematic moments only where the
 * scene justifies them). A compact typographic band — never the
 * homepage hero copied — with a per-page PROGRAMMATIC motif drawn in
 * CSS (no photography, no invented imagery):
 *   signal  — horizon signal lines + drifting light (company)
 *   nodes   — engineered node lattice (solution details)
 *   grid    — perspective technical grid (partners)
 *   field   — calm constellation dots (clients)
 *   trace   — converging trace lines (contact)
 *
 * Server-rendered; entrance is CSS-staged (static-neutralized by the
 * global tier override). data-env="dark" hands the header its dark
 * environment while the band is under it (D-022).
 */
export function PageHero({
  motif,
  overline,
  title,
  lede,
  children,
}: {
  motif: "signal" | "nodes" | "grid" | "field" | "trace";
  overline: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="page-hero" data-env="dark" data-motif={motif}>
      <div className="page-hero-backdrop" aria-hidden="true">
        <span className="ph-a" />
        <span className="ph-b" />
        <span className="ph-c" />
      </div>
      <div className="relative mx-auto w-full max-w-360 px-6 lg:px-12">
        <p className="page-hero-overline microlabel">
          <span aria-hidden="true" className="text-accent">
            ●
          </span>
          &nbsp;&nbsp;{overline}
        </p>
        <h1 className="page-hero-title font-display font-bold">{title}</h1>
        {lede ? <p className="page-hero-lede">{lede}</p> : null}
        {children}
      </div>
    </header>
  );
}
