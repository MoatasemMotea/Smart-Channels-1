"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * PROJECTS ACCORDION (D-075).
 *
 * Desktop (> 900 px): one flex row of five panels; the active panel grows
 * to `flex: 4`, the rest sit at `flex: 1`, with a 700 ms `flex-grow`
 * transition. Hover OR focus activates; ← → step between panels and
 * Home / End jump (logical — mirrored in RTL); a click on an inactive
 * panel only activates it (the second click navigates), a click on the
 * active panel navigates. The first panel is active by default (the
 * right-most one in RTL, since the row is a logical flex row). No
 * autoplay — the Industries slider above already moves.
 *
 * Phones / tablets (≤ 900 px): no accordion — a snap-scrolled row of 4:5
 * cards, 84 % wide, that navigate directly. The switch is CSS-only; the
 * same markup serves both.
 *
 * A panel without an approved image shows the designed no-image ground
 * (dark gradient + a faint dot grid + a larger title); when an image
 * arrives, one `media` entry in projects.ts changes, no code.
 */
export interface AccordionItem {
  slug: string;
  title: string;
  sector: string;
  location: string;
  years: string;
  image: { src: string; alt: string } | null;
}

export function ProjectsAccordion({ items }: { items: AccordionItem[] }) {
  const t = useTranslations("home.selectedProjects");
  const rtl = useLocale() === "ar";
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const n = items.length;

  // keyboard on the row: arrows step (logical), Home / End jump, and focus follows
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const focusLink = (i: number) => el.querySelector<HTMLAnchorElement>(`[data-panel="${i}"] a`)?.focus();
    const onKey = (e: KeyboardEvent) => {
      let next: number | null = null;
      if (e.key === "ArrowRight") next = rtl ? active - 1 : active + 1;
      else if (e.key === "ArrowLeft") next = rtl ? active + 1 : active - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = n - 1;
      if (next === null) return;
      e.preventDefault();
      const i = Math.min(n - 1, Math.max(0, next));
      setActive(i);
      focusLink(i);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [active, n, rtl]);

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles -- `list-style: none` strips list semantics in WebKit; the explicit role keeps the five announced as a list
    <ul ref={listRef} className="projects-accordion" role="list">
      {items.map((item, i) => {
        const isActive = i === active;
        const meta = [item.location, item.years].filter(Boolean).join(" · ");
        return (
          <li
            key={item.slug}
            className="pa-panel"
            data-panel={i}
            data-active={isActive || undefined}
            data-ground={item.image ? "photo" : "designed"}
            onMouseEnter={() => setActive(i)}
          >
            <Link
              href={`/projects/${item.slug}`}
              className="pa-link"
              aria-current={isActive ? "true" : undefined}
              aria-label={item.title}
              onFocus={() => setActive(i)}
              onClick={(e) => {
                // desktop rule: an inactive panel activates on the first click, navigates on the second;
                // the phone row (no accordion) always navigates
                if (!isActive && window.matchMedia("(min-width: 901px)").matches) {
                  e.preventDefault();
                  setActive(i);
                }
              }}
            >
              <span className="pa-ground" aria-hidden="true">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- owner-supplied project photograph, CSS-sized
                  <img src={item.image.src} alt="" loading="lazy" decoding="async" />
                ) : (
                  <svg className="pa-dots" aria-hidden="true" focusable="false">
                    <defs>
                      <pattern id={`pa-dots-${i}`} width="22" height="22" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pa-dots-${i})`} />
                  </svg>
                )}
                <span className="pa-dim" />
              </span>

              <span className="pa-spine" aria-hidden="true">
                {item.title}
              </span>

              <span className="pa-content">
                {item.sector ? <span className="pa-tag">{item.sector}</span> : null}
                <span className="pa-title">{item.title}</span>
                {meta ? <span className="pa-meta">{meta}</span> : null}
                <span className="pa-cta" aria-hidden="true">
                  {t("exploreProject")}
                  <svg viewBox="0 0 16 16" focusable="false">
                    <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
