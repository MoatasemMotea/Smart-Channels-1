"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

/**
 * EN/AR switcher. Navigating sets the next-intl locale cookie, so the
 * visitor's explicit choice persists and wins over detection (Q4).
 */
export function LocaleSwitch() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const other = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      aria-label={t("switchLocaleLabel")}
      className="h-11 rounded border border-line px-4 text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-visible:text-ink"
    >
      {t("switchLocale")}
    </button>
  );
}
