import { setRequestLocale } from "next-intl/server";
import { permanentRedirect } from "@/i18n/navigation";

/**
 * /smart-ai → / (§14/§51 · D-050; 308 permanent since D-088).
 *
 * Smart AI is no longer a destination: the assistant became the
 * floating Smart Channels Digital Employee, available everywhere. The
 * historical route redirects home, locale preserved.
 */
export default async function SmartAiRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  permanentRedirect({ href: "/", locale });
}
