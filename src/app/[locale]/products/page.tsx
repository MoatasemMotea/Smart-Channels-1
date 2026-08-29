import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getPublishedProducts, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.products" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/products",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * PRODUCTS route (P5 §5 · D-034). Intentionally restrained until the
 * owner supplies the approved catalogue: renders published records only —
 * no invented products, no stock imagery, no placeholder cards. The copy
 * below states only approved solution-backed facts.
 */
export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const products = getPublishedProducts();

  return (
    <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
      <SectionHeading as="h1">{t("pages.products.title")}</SectionHeading>
      <p className="max-w-2xl text-lg leading-8 text-ink-muted">{t("home.products.sub")}</p>
      {products.length > 0 ? (
        <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id} className="border-t border-line pt-5">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- owner-supplied catalogue media, CSS-sized
                <img src={p.image.src} alt={localize(p.name, locale)} className="mb-4 h-auto w-full" />
              ) : null}
              <p className="font-display text-xl font-semibold">{localize(p.name, locale)}</p>
              <p className="mt-2 text-sm leading-7 text-ink-muted">{localize(p.summary, locale)}</p>
              <p className="mt-3 text-sm leading-7">{localize(p.importance, locale)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10">
          <Link href="/contact" className="tx-link font-semibold text-accent">
            {t("home.products.cta")} →
          </Link>
        </p>
      )}
    </div>
  );
}
