"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types/content";
import { getSolutionFamilies, localize } from "@/lib/content";
import { Link } from "@/i18n/navigation";

/**
 * SOLUTIONS — ecosystem index (P5 · Q-P5-2a).
 *
 * The seven canonical families ARE the interface: selecting one (hover,
 * focus, keyboard, or tap) updates the preview panel — tagline, three key
 * areas, Explore action — while a signal rail responds to the active
 * family. Fully understandable without animation; no hover dependency
 * (buttons with aria-expanded; small screens use tap-to-expand
 * progressive disclosure). Data-driven from solutions.ts only.
 */
export function SolutionsIndex() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const families = getSolutionFamilies();
  const [active, setActive] = useState(families[0]?.id);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const panelId = useId();
  const current = families.find((f) => f.id === active) ?? families[0]!;

  const preview = (f: (typeof families)[number]) => (
    <div className="solutions-preview-body">
      <p className="text-lg font-medium">{localize(f.tagline, locale)}</p>
      <ul className="mt-5 space-y-2">
        {f.subSolutions.slice(0, 3).map((sub) => (
          <li key={sub.id} className="flex items-baseline gap-3 text-sm text-ink-muted">
            <span aria-hidden="true" className="solutions-tick" />
            {localize(sub.name, locale)}
          </li>
        ))}
      </ul>
      <Link
        href={`/solutions/${f.slug}`}
        className="tx-link mt-6 inline-block font-semibold text-accent"
      >
        {t("common.explore")} →
      </Link>
    </div>
  );

  return (
    <div className="solutions-index" data-active={current.id}>
      {/* desktop: index + live preview */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-[6fr_1px_5fr]">
        <ol>
          {families.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(f.id)}
                onFocus={() => setActive(f.id)}
                onClick={() => setActive(f.id)}
                aria-expanded={active === f.id}
                aria-controls={panelId}
                className="solutions-item tx-link"
                data-current={active === f.id || undefined}
              >
                <span aria-hidden="true" className="solutions-rail" />
                <span className="font-display text-2xl font-semibold">
                  {localize(f.name, locale)}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div aria-hidden="true" className="solutions-divider" />
        <div id={panelId} className="solutions-preview" aria-live="polite">
          {preview(current)}
        </div>
      </div>

      {/* small screens: tap-to-expand progressive disclosure */}
      <ol className="lg:hidden">
        {families.map((f) => (
          <li key={f.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => (v === f.id ? null : f.id))}
              aria-expanded={mobileOpen === f.id}
              className="tx-link flex w-full items-center justify-between py-4 text-start font-display text-xl font-semibold"
            >
              {localize(f.name, locale)}
              <span aria-hidden="true" className="text-accent">
                {mobileOpen === f.id ? "−" : "+"}
              </span>
            </button>
            {mobileOpen === f.id ? <div className="pb-6">{preview(f)}</div> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
