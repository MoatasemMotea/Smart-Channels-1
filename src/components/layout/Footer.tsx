import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getContact, getNavigation, getSocialLinks, localize } from "@/lib/content";
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
          {/* Social presence (P4 Rev3 §13): renders ONLY enabled records
              with owner-supplied URLs — never dead links or placeholders. */}
          <SocialRow />
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2">
            {links.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="tx-link text-sm text-ink-muted"
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
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="tx-link">
              {contact.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${contact.email}`} className="tx-link">
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

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M19.32 5.56a5.1 5.1 0 0 1-3.05-2.99 5.05 5.05 0 0 1-.27-1.63h-3.35v13.4a2.83 2.83 0 1 1-2.83-2.83c.29 0 .57.05.83.13V8.2a6.2 6.2 0 0 0-.83-.06 6.18 6.18 0 1 0 6.18 6.18V8.63a8.4 8.4 0 0 0 4.62 1.38V6.66c-.46 0-.9-.06-1.3-.18a5.1 5.1 0 0 1-.02-.02Z" />
    </svg>
  ),
};

async function SocialRow() {
  const locale = (await getLocale()) as Locale;
  const links = getSocialLinks();
  if (links.length === 0) return null;
  return (
    <ul className="mt-5 flex gap-3">
      {links.map((l) => (
        <li key={l.platform}>
          <a
            href={l.url!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={localize(l.label, locale)}
            className="tx-link flex h-11 w-11 items-center justify-center rounded border border-line text-ink-muted"
          >
            {SOCIAL_ICONS[l.platform]}
          </a>
        </li>
      ))}
    </ul>
  );
}
