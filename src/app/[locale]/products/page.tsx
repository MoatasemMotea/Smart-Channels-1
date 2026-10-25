import { setRequestLocale } from "next-intl/server";
import { getProductCategories } from "@/lib/content";
import { permanentRedirect } from "@/i18n/navigation";

/**
 * /products → /products/<first category> (D-088 · SEO-2), 308 permanent.
 *
 * Until D-088 this route rendered the first category (networking) in full
 * under its own URL — the same page twice. A redirect leaves one URL per
 * page for search engines; the menu links straight to the category and
 * stays current on every /products/… page (NavItem.match).
 */
export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const first = getProductCategories()[0]!;
  permanentRedirect({ href: `/products/${first.slug}`, locale });
}
