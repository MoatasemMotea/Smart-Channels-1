import { Link } from "@/i18n/navigation";

/**
 * CATEGORY SIDE LIST (D-059 §4) — the nine categories beside a category
 * page: a sticky column on desktop, a horizontal strip on small
 * screens (pure CSS, see .catalog-side*). Server-rendered; the current
 * category carries aria-current.
 */
export function CategorySidebar({
  items,
  current,
  ariaLabel,
}: {
  items: { slug: string; label: string; href: string }[];
  current: string;
  ariaLabel: string;
}) {
  return (
    <nav className="catalog-side" aria-label={ariaLabel}>
      <ul className="catalog-side-list">
        {items.map((i) => (
          <li key={i.slug}>
            <Link
              href={i.href}
              className="catalog-side-link"
              aria-current={i.slug === current ? "page" : undefined}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
