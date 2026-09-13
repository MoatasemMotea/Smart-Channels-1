/**
 * CATEGORY CARD GRID (D-059 · D-062).
 *
 * A card is a product type + (optional) brand. The photograph follows
 * the TYPE, so five "Switches" cards share one image; a type with no
 * photograph yet shows the neutral placeholder — a grey field with an
 * inline SVG, nothing generated or borrowed.
 *
 * D-062 removed the brand filter row and its state: this is a plain
 * server-rendered grid. The brand still appears as the quiet second
 * line under each card — text, not a control. Nothing here shows a
 * model number and nothing anywhere shows a count.
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

export function CategoryCards({ cards }: { cards: CardView[] }) {
  return (
    <ul className="catalog-grid">
      {cards.map((c) => (
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
  );
}
