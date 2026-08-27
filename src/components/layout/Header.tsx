import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getNavigation, localize } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import { MobileMenu } from "./MobileMenu";
import { ScrollState } from "./ScrollState";

/**
 * Site header (P4 · F-7): transparent over the cinematic hero, gaining a
 * controlled blur/solid state after scroll (with a reduced-transparency
 * fallback). Absent during the opening choreography, entering with the
 * final hero reveal; instantly available on skip. Data-driven from
 * navigation.ts — labels and order are owner-editable content.
 */
export async function Header() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("nav");
  const items = getNavigation();
  const links = items.filter((i) => !i.highlight || i.highlight === "smart-ai");
  const cta = items.find((i) => i.highlight === "cta");

  return (
    <header className="site-header">
      <ScrollState />
      <div className="mx-auto flex h-20 max-w-360 items-center gap-6 px-6 lg:px-12">
        <Link href="/" className="flex items-center" aria-label="Smart Channels — Home">
          <Image
            src="/brand/logo-dark.png"
            alt="Smart Channels — we take you to the future"
            width={132}
            height={108}
            priority
            className="logo-dark-lockup h-14 w-auto"
          />
          <Image
            src="/brand/logo-mark.png"
            alt="Smart Channels"
            width={61}
            height={66}
            className="logo-light-mark h-12 w-auto"
          />
        </Link>
        <nav aria-label="Main" className="ms-auto hidden items-center gap-7 lg:flex">
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={
                item.highlight === "smart-ai"
                  ? "border-b-2 border-accent pb-1 text-sm font-medium text-ink"
                  : "text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              }
            >
              {localize(item.label, locale)}
            </Link>
          ))}
          {cta ? (
            <Link
              href={cta.href}
              className="rounded bg-accent px-5 py-3 text-sm font-semibold text-accent-ink"
            >
              {localize(cta.label, locale)}
            </Link>
          ) : null}
        </nav>
        <div className="ms-auto flex items-center gap-2 lg:ms-4">
          <LocaleSwitch />
          <ThemeSwitch />
          <MobileMenu label={t("openMenu")} closeLabel={t("closeMenu")} />
        </div>
      </div>
    </header>
  );
}
