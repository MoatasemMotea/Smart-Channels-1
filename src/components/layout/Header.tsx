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
import { LangText } from "@/components/ui/LangText";

/**
 * Site header (P4 · F-7): transparent over the cinematic hero, gaining a
 * controlled blur/solid state after scroll (with a reduced-transparency
 * fallback). Visible from the first paint (D-086). Data-driven from
 * navigation.ts — labels and order are owner-editable content.
 */
export async function Header() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("nav");
  const tf = await getTranslations("footer");
  const cta = getNavigation().find((i) => i.highlight === "cta");

  return (
    <header className="site-header">
      <ScrollState />
      <div className="mx-auto flex h-20 max-w-360 items-center gap-4 px-6 xl:gap-6 lg:px-12">
        <LogoHomeLink ariaLabel={t("homeLabel")}>
          {/* D-086: 2× display-size lossless derivatives of the untouched
              brand PNGs (13 KB / 10 KB), served as-is — no preload */}
          <Image
            src="/brand/logo-dark-lockup.webp"
            alt={tf("logoAlt")}
            width={132}
            height={108}
            unoptimized
            loading="eager"
            className="logo-dark-lockup h-14 w-auto"
          />
          <Image
            src="/brand/logo-mark-small.webp"
            alt={tf("markAlt")}
            width={61}
            height={66}
            unoptimized
            className="logo-light-mark h-12 w-auto"
          />
        </LogoHomeLink>
        <HeaderNav />
      {cta ? (
        <Link
          href={cta.href}
          className="magnetic hidden whitespace-nowrap rounded bg-accent px-4 py-2.5 text-[0.8125rem] font-semibold text-accent-ink lg:inline-block"
        >
          <LangText text={localize(cta.label, locale)} />
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
