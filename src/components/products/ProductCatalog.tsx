"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types/content";
import { getPublishedProducts, localize } from "@/lib/content";

/**
 * PRODUCT CATALOG (D-048) — media-ready listing architecture.
 *
 * Renders NOTHING until owner-approved products are published
 * (products.ts ships empty by design — the stage's empty state is the
 * designed state). Once records exist:
 * - category filter chips appear automatically when the data carries
 *   two or more approved categories;
 * - each card upgrades from a typographic composition (motif ground —
 *   never a blank placeholder) to its photograph the moment `image`
 *   data is supplied;
 * - featured records additionally ride the stage rail (server-side).
 * Population and imagery remain pure data edits; no invented products,
 * categories or specs ever render.
 */
export function ProductCatalog() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const products = getPublishedProducts();
  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of products) {
      if (p.category) {
        const key = localize(p.category, locale);
        if (!seen.has(key)) seen.set(key, key);
      }
    }
    return [...seen.keys()];
  }, [products, locale]);
  const [filter, setFilter] = useState<string>("all");
  const gridRef = useRef<HTMLUListElement>(null);

  /* D-054 §12: each card is "read" by the system ONCE as it arrives —
     a thin signal scan, then a single edge pulse. Never a loop, never
     all cards animating at once. */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (document.documentElement.getAttribute("data-motion-tier") !== "full") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "-8% 0px -8% 0px" },
    );
    for (const card of grid.querySelectorAll(".product-card")) io.observe(card);
    return () => io.disconnect();
  }, [filter]);

  if (products.length === 0) return null;

  const visible =
    filter === "all"
      ? products
      : products.filter((p) => p.category && localize(p.category, locale) === filter);

  return (
    <div>
      {categories.length >= 2 ? (
        <div className="gallery-filter" role="group" aria-label={t("inner.categories")}>
          <button
            type="button"
            className="gallery-filter-chip"
            data-active={filter === "all" || undefined}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            {t("common.all")}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="gallery-filter-chip"
              data-active={filter === c || undefined}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <ul ref={gridRef} className="product-grid">
        {visible.map((p) => (
          <li key={p.id} id={p.slug} className="product-card">
            {p.image ? (
              <div
                className="product-card-photo scan-frame edge-pulse"
                data-fit={p.image.fit ?? "cover"}
                data-plate={p.image.plate}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- owner-supplied catalogue media */}
                <img
                  src={p.image.src}
                  alt={localize(p.image.alt, locale)}
                  loading="lazy"
                  decoding="async"
                  width={p.image.width}
                  height={p.image.height}
                  style={p.image.focus ? { objectPosition: p.image.focus } : undefined}
                />
              </div>
            ) : (
              /* designed media-pending motif — never a blank placeholder */
              <div className="product-card-motif" aria-hidden="true">
                <span />
              </div>
            )}
            <div className="product-card-body">
              {p.category ? (
                <p className="microlabel text-accent">{localize(p.category, locale)}</p>
              ) : null}
              <h3 className="product-card-name font-display">{localize(p.name, locale)}</h3>
              {/* approved copy only — absent fields simply do not render */}
              {p.summary ? (
                <p className="product-card-summary">{localize(p.summary, locale)}</p>
              ) : null}
              {p.importance ? (
                <p className="product-card-importance">{localize(p.importance, locale)}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
