import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

/**
 * /contact → /#contact (§25/§51 · D-050).
 *
 * The contact experience lives on the homepage Let's Talk section; the
 * historical route stays as a locale-preserving compatibility redirect
 * (bookmarks, external links, the old IA).
 */
export default async function ContactRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect({ href: "/#contact", locale });
}
