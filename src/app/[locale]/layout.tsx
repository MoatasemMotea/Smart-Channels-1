import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, isRtl } from "@/i18n/routing";
import { ThemeAndTierScript } from "@/components/layout/ThemeAndTierScript";
import { HtmlStateGuard } from "@/components/layout/HtmlStateGuard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { indexingAllowed, SITE_NAME } from "@/lib/seo";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: { default: t("title"), template: `%s — ${SITE_NAME}` },
    description: t("description"),
    robots: indexingAllowed() ? undefined : { index: false, follow: false },
    icons: { icon: "/brand/favicon.png" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"} data-theme="dark" data-motion-tier="static">
      <head>
        <ThemeAndTierScript />
      </head>
      <body className="bg-bg text-ink">
        <NextIntlClientProvider>
          <HtmlStateGuard />
          <a href="#main" className="skip-link">
            {t("skipToContent")}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
