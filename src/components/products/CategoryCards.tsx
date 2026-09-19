/**
 * CATEGORY CARD GRID (D-059 · D-062 · D-068).
 *
 * A card is a product TYPE (D-068): its photograph, its name, and its
 * brands as one quiet line — "Aruba · Cisco · Hikvision · Linksys ·
 * Ruijie" — or no line at all when the type has none. A type with no
 * photograph yet shows the neutral placeholder — a grey field with an
 * inline SVG, nothing generated or borrowed.
 *
 * D-062 removed the brand filter row and its state: this is a plain
 * server-rendered grid. The brand line is text, not a control, and is
 * dir="ltr" on its own element: the names are Latin, and inside an RTL
 * card the bidi algorithm would otherwise reverse their order and move
 * the separators. Nothing here shows a model number and nothing
 * anywhere shows a count.
 */
export interface CardView {
  key: string;
  name: string;
  brands: string[]; // alphabetical; [] = no brand line at all
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
          {c.brands.length > 0 ? (
            <p className="catalog-card-brand" dir="ltr">
              {c.brands.join(" · ")}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
