import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getContact, getNavigation, localize } from "@/lib/content";
import { Link } from "@/i18n/navigation";

/** P3 foundation footer — approved contact data only (D-011). */
export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const contact = getContact();
  const links = getNavigation().filter((i) => !i.highlight);

  return (
    <footer className="site-footer border-t border-line bg-bg-deep">
      <div className="mx-auto grid max-w-360 gap-10 px-6 py-14 md:grid-cols-3 lg:px-12">
        <div>
          <Image
            src="/brand/logo-dark.png"
            alt="Smart Channels — we take you to the future"
            width={132}
            height={108}
            className="logo-dark-lockup h-16 w-auto"
          />
          <Image
            src="/brand/logo-mark.png"
            alt="Smart Channels"
            width={61}
            height={66}
            className="logo-light-mark h-14 w-auto"
          />
          {/* Approved textual brand treatment (D-001 stays intact: the logo
              artwork is never altered — the Arabic wording is set as type). */}
          <p className="mt-4 font-display text-lg font-semibold">{t("footer.brandName")}</p>
          <p className="mt-1 text-sm text-ink-muted">{t("footer.brandTagline")}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2">
            {links.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {localize(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="text-sm not-italic leading-7 text-ink-muted">
          <p className="microlabel mb-2">{t("sections.contact")}</p>
          <p>{localize(contact.address, locale)}</p>
          <p dir="ltr">
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-ink">
              {contact.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${contact.email}`} className="hover:text-ink">
              {contact.email}
            </a>
          </p>
        </address>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-360 px-6 py-5 text-xs text-ink-muted lg:px-12">
          © 2026 Smart Channels. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
