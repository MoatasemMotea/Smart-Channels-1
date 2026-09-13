"use client";

import { useState } from "react";

/**
 * CATEGORY CARD GRID with a brand filter row (D-059 §4).
 *
 * A card is a product type + (optional) brand. The photograph follows
 * the TYPE, so five "Switches" cards share one image; a type with no
 * photograph yet shows the neutral placeholder — a grey field with an
 * inline SVG, nothing generated or borrowed.
 *
 * Brands are toggles: press one to keep only its cards, press it again
 * to release the filter. Nothing here shows a model number and nothing
 * anywhere shows a count.
 *
 * Localised strings arrive from the server page; this component owns
 * only the filter state.
 */
export interface CardView {
  key: string;
  name: string;
  brand: string; // "" = no brand line at all
  image: string; // "" = placeholder
  alt: string;
}

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="6" y="10" width="36" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6 30l10-9 8 7 6-5 12 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="33" cy="17" r="2.5" fill="currentColor" />
      <path d="M18 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CategoryCards({
  cards,
  brandsLabel,
}: {
  cards: CardView[];
  brandsLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const brands = [...new Set(cards.map((c) => c.brand).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" }),
  );
  const visible = active ? cards.filter((c) => c.brand === active) : cards;

  return (
    <div>
      {brands.length > 0 ? (
        <div className="catalog-brands" role="group" aria-label={brandsLabel}>
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              className="catalog-brand"
              aria-pressed={active === b}
              onClick={() => setActive((cur) => (cur === b ? null : b))}
            >
              {b}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="catalog-grid">
        {visible.map((c) => (
          <li key={c.key} className="catalog-card">
            {c.image ? (
              <div className="catalog-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element -- owner-supplied catalogue media, CSS-sized */}
                <img src={`/media/products/${c.image}`} alt={c.alt} loading="lazy" decoding="async" />
              </div>
            ) : (
              <div className="catalog-card-media" data-empty="" aria-hidden="true">
                <PlaceholderIcon />
              </div>
            )}
            <p className="catalog-card-name">{c.name}</p>
            {c.brand ? <p className="catalog-card-brand">{c.brand}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
