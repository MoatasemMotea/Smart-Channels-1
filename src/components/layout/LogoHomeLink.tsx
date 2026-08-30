"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Header logo behavior (final pre-media directive §3 · D-050): the logo
 * ALWAYS returns to the top of the localized homepage. On any inner
 * route it navigates home; when the homepage is already open it scrolls
 * back to the very top (hero) and clears any section hash — never a
 * dead click, never a jump to a stale anchor.
 */
export function LogoHomeLink({ children, ariaLabel }: { children: ReactNode; ariaLabel: string }) {
  const pathname = usePathname();

  const onClick = (e: React.MouseEvent) => {
    if (pathname !== "/") return; // normal navigation home
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <Link href="/" onClick={onClick} className="flex items-center" aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
