import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page/PageHero";
import { Link } from "@/i18n/navigation";

/**
 * Branded 404 (issue-audit M1 · D-049): unmatched URLs and notFound()
 * guards (invalid locales, thin project slugs, unknown solutions) land
 * inside the full site chrome — dark signal composition, localized
 * copy, one clear route home. Never the bare framework default.
 */
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <>
      <PageHero motif="trace" overline="404" title={t("title")} lede={t("body")} />
      <section className="mx-auto max-w-360 px-6 py-16 lg:px-12">
        <Link
          href="/"
          className="inline-block rounded border border-accent px-6 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
        >
          {t("cta")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
