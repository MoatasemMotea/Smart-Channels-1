import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getContact, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * P3 foundation contact page: approved details with functional tel:/mailto:
 * links (Q9/D-011). The designed enquiry form UI arrives at P13 — with its
 * integration state explicit and NO fabricated submission backend.
 */
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const contact = getContact();

  return (
    <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
      <SectionHeading as="h1" index={t("pages.contact.title")}>
        {t("pages.contact.description")}
      </SectionHeading>
      <dl className="max-w-xl">
        <dt className="microlabel mt-8">{t("contact.addressLabel")}</dt>
        <dd className="mt-2 text-lg">{localize(contact.address, locale)}</dd>
        <dt className="microlabel mt-8">{t("contact.phoneLabel")}</dt>
        <dd className="mt-2 text-lg" dir="ltr">
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-accent">
            {contact.phone}
          </a>
        </dd>
        <dt className="microlabel mt-8">{t("contact.emailLabel")}</dt>
        <dd className="mt-2 text-lg">
          <a href={`mailto:${contact.email}`} className="hover:text-accent">
            {contact.email}
          </a>
        </dd>
      </dl>
    </div>
  );
}
