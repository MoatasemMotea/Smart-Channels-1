"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/types/content";
import { getNavigation, localize } from "@/lib/content";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Desktop primary navigation (P5 §§6–9).
 *
 * - Data-driven from navigation.ts (owner-editable IA).
 * - Restrained active indicator: route links match the pathname; homepage
 *   anchor links (Alliances / Clients / Smart AI) follow the section in
 *   view via IntersectionObserver.
 * - Cinematic arrival (§9): clicking an anchor link performs a smooth
 *   scroll, hands the destination a short one-shot `.arrive` choreography,
 *   and resolves keyboard focus at the section — never an abrupt jump,
 *   never at accessibility's expense.
 */
const ANCHOR_SCENES: Record<string, string> = {
  "/#partners": "partners",
  "/#clients": "clients",
  "/#smart-ai": "smart-ai",
};

export function arriveAt(sceneId: string, smooth: boolean) {
  const el = document.getElementById(sceneId);
  if (!el) return false;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  el.classList.remove("arrive");
  void el.offsetWidth; // restart the one-shot choreography
  el.classList.add("arrive");
  window.setTimeout(() => el.classList.remove("arrive"), 1200);
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  return true;
}

export function HeaderNav() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const items = getNavigation().filter((i) => i.highlight !== "cta");
  const [sectionActive, setSectionActive] = useState<string | null>(null);

  // homepage: the in-view anchor section drives the indicator
  useEffect(() => {
    if (pathname !== "/") return;
    const targets = Object.values(ANCHOR_SCENES)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const pick = () => {
      // the DOMINANT section: the one whose box crosses the 42%-height probe
      const probe = window.innerHeight * 0.42;
      let found: string | null = null;
      for (const el of targets) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) found = el.id;
      }
      setSectionActive(found);
    };
    const io = new IntersectionObserver(pick, { rootMargin: "-30% 0px -40% 0px" });
    targets.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      setSectionActive(null); // leaving the homepage clears anchor state
    };
  }, [pathname]);

  const isActive = (href: string): boolean => {
    const scene = ANCHOR_SCENES[href];
    if (scene) return sectionActive === scene;
    if (href === "/") return pathname === "/" && sectionActive === null;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const onClick = (href: string) => (e: React.MouseEvent) => {
    const scene = ANCHOR_SCENES[href];
    if (scene && pathname === "/") {
      e.preventDefault();
      arriveAt(scene, true);
      history.replaceState(null, "", `#${scene}`);
    }
  };

  return (
    <nav aria-label="Main" className="ms-auto hidden items-center gap-5 xl:gap-6 lg:flex">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          onClick={onClick(item.href)}
          data-active={isActive(item.href) || undefined}
          aria-current={isActive(item.href) ? "true" : undefined}
          className={
            item.highlight === "smart-ai"
              ? "nav-link tx-link text-[0.8125rem] font-semibold text-accent"
              : "nav-link tx-link text-[0.8125rem] font-medium text-ink-muted"
          }
        >
          {localize(item.label, locale)}
        </Link>
      ))}
    </nav>
  );
}
