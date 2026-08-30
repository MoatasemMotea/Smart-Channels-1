import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { getNavigation, localize } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { HeaderNav } from "./HeaderNav";
import { LogoHomeLink } from "./LogoHomeLink";
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
  const cta = getNavigation().find((i) => i.highlight === "cta");

  return (
    <header className="site-header">
      <ScrollState />
      <div className="mx-auto flex h-20 max-w-360 items-center gap-4 px-6 xl:gap-6 lg:px-12">
        <LogoHomeLink ariaLabel="Smart Channels — Home">
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
        </LogoHomeLink>
        <HeaderNav />
      {cta ? (
        <Link
          href={cta.href}
          className="hidden whitespace-nowrap rounded bg-accent px-4 py-2.5 text-[0.8125rem] font-semibold text-accent-ink lg:inline-block"
        >
          {localize(cta.label, locale)}
        </Link>
      ) : null}
        <div className="ms-auto flex items-center gap-2 lg:ms-3">
          <LocaleSwitch />
          <ThemeSwitch />
          <MobileMenu label={t("openMenu")} closeLabel={t("closeMenu")} />
        </div>
      </div>
    </header>
  );
}
