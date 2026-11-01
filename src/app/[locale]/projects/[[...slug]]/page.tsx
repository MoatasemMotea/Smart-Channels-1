import { setRequestLocale } from "next-intl/server";
import { permanentRedirect } from "@/i18n/navigation";

/**
 * /projects and /projects/* → /#projects (D-092; 308 permanent).
 *
 * Projects no longer have their own pages — "Selected Projects" lives on
 * the homepage only, as a name-only list (no detail pages, D-092). This
 * optional catch-all covers the bare route and every historical detail
 * slug (bookmarks, external links, search engines) with one redirect,
 * locale preserved. Not listed in sitemap.ts.
 */
export default async function ProjectsRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  permanentRedirect({ href: "/#projects", locale });
}
