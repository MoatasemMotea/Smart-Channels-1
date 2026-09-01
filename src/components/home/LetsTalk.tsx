import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getContact, localize } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { LeadForm } from "@/components/contact/LeadForm";
import { LocationMap } from "@/components/contact/LocationMap";

/**
 * LET'S TALK — the homepage contact chapter (§§24–27 · D-050).
 *
 * The closing signal moment (the converge motif returns from the
 * opening) now carries the REAL lead form: submissions go to the local
 * lead system (POST /api/leads) and success is only ever the backend's
 * confirmation (§26). Beside it: the approved contact information —
 * phone, email, address and the click-to-load Google map. Deliberately
 * NO WhatsApp number row here (§27 — WhatsApp lives in the floating
 * action only).
 */
export async function LetsTalk() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const contact = getContact();

  return (
    <MotionSection
      id="contact"
      className="cta-scene"
      aria-label={t("sections.contact")}
      data-scene="cta"
    >
      <div className="relative mx-auto max-w-360 px-6 py-24 lg:px-12">
        <div aria-hidden="true" className="cta-converge">
          <span /><span /><span /><span /><span /><span />
        </div>

        <p className="microlabel relative text-accent">{t("lead.overline")}</p>
        <h2 className="relative mt-4 max-w-3xl font-display text-4xl font-bold md:text-5xl">
          {locale === "ar" ? (
            <>
              لنبنِه <span className="text-accent">معًا.</span>
            </>
          ) : (
            <>
              Let&apos;s build it <span className="text-accent">together.</span>
            </>
          )}
        </h2>
        <p className="relative mt-5 max-w-xl text-base leading-8 text-ink-muted">
          {t("lead.intro")}
        </p>

        <div className="relative mt-12 grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <LeadForm />

          <aside aria-label={t("lead.infoTitle")}>
            <p className="microlabel text-accent">{t("lead.infoTitle")}</p>
            <dl className="lets-talk-info mt-6">
              <div>
                <dt className="microlabel">{t("contact.phoneLabel")}</dt>
                <dd>
                  <a dir="ltr" className="tx-link" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="microlabel">{t("contact.emailLabel")}</dt>
                <dd>
                  <a className="tx-link" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="microlabel">{t("contact.addressLabel")}</dt>
                <dd>{localize(contact.address, locale)}</dd>
              </div>
            </dl>
            <div className="mt-8">
              <LocationMap address={contact.address.en} />
            </div>
          </aside>
        </div>
      </div>
    </MotionSection>
  );
}
