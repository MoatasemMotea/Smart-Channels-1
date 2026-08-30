"use client";

import { useMemo, useState } from "react";
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

      <ul className="product-grid">
        {visible.map((p) => (
          <li key={p.id} className="product-card">
            {p.image ? (
              <div className="product-card-photo">
                {/* eslint-disable-next-line @next/next/no-img-element -- owner-supplied catalogue media */}
                <img src={p.image.src} alt={localize(p.name, locale)} loading="lazy" />
              </div>
            ) : (
              <div className="product-card-motif" aria-hidden="true">
                <span />
              </div>
            )}
            <div className="product-card-body">
              {p.category ? (
                <p className="microlabel text-accent">{localize(p.category, locale)}</p>
              ) : null}
              <h3 className="product-card-name font-display">{localize(p.name, locale)}</h3>
              <p className="product-card-summary">{localize(p.summary, locale)}</p>
              <p className="product-card-importance">{localize(p.importance, locale)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
