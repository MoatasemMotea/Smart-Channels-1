import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getContact, localize } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MotionSection } from "@/components/motion/MotionSection";
import { PageHero } from "@/components/page/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";

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
 * CONTACT (P6 · D-043) — the conversation page. Dark converging intro
 * (the signals meet — the closing echo of the homepage journey), then a
 * theme-aware channel board: every approved way to reach Smart Channels
 * as a large deliberate row (address, telephone, email, WhatsApp) with
 * functional tel:/mailto:/wa.me links only. NO submission form exists —
 * none is mocked, nothing pretends to send (D-010/O-009: the designed
 * enquiry form arrives with its integration state explicit in a later
 * phase). Approved contact details only (D-011).
 */
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(raw);
  const t = await getTranslations();
  const contact = getContact();
  const waDigits = contact.whatsapp?.replace(/[^\d]/g, "") ?? "";

  return (
    <>
      <PageHero
        motif="trace"
        overline={t("pages.contact.title")}
        title={t("pages.contact.description")}
      />

      <MotionSection reveal="converge" aria-label={t("inner.channels")}>
        <div className="mx-auto max-w-360 px-6 py-16 lg:px-12">
          <p className="microlabel mb-8 text-accent">{t("inner.channels")}</p>
          <dl className="channel-board">
            <div className="channel-row">
              <dt className="channel-label microlabel">{t("contact.addressLabel")}</dt>
              <dd className="channel-value">{localize(contact.address, locale)}</dd>
            </div>
            <div className="channel-row">
              <dt className="channel-label microlabel">{t("contact.phoneLabel")}</dt>
              <dd className="channel-value">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="tx-link"
                  dir="ltr"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div className="channel-row">
              <dt className="channel-label microlabel">{t("contact.emailLabel")}</dt>
              <dd className="channel-value">
                <a href={`mailto:${contact.email}`} className="tx-link">
                  {contact.email}
                </a>
              </dd>
            </div>
            {contact.whatsapp ? (
              <div className="channel-row">
                <dt className="channel-label microlabel">{t("inner.whatsappShort")}</dt>
                <dd className="channel-value">
                  <a
                    href={`https://wa.me/${waDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tx-link"
                    aria-label={t("contact.whatsappLabel")}
                    dir="ltr"
                  >
                    {contact.whatsapp}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </MotionSection>

      {/* P13 · D-047: the enquiry form — explicit non-production state,
          composes into the visitor's own email/WhatsApp app */}
      <MotionSection reveal="rise" aria-label={t("form.title")}>
        <div className="mx-auto max-w-360 px-6 pb-24 lg:px-12">
          <p className="microlabel mb-8 text-accent">{t("form.title")}</p>
          <ContactForm />
        </div>
      </MotionSection>
    </>
  );
}
