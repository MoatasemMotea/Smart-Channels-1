"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { GalleryItem, Locale } from "@/types/content";
import { getGalleryCategories, getPublishedGalleryItems, localize } from "@/lib/content";

/**
 * GALLERY SYSTEM (P10 · D-045).
 *
 * - Editorial masonry (CSS columns) rendering ONLY published records —
 *   the system is complete at any collection size; population is
 *   forever a data edit (A-004/Amendment 3).
 * - Category filter: "All" + only categories that actually hold
 *   published items (empty filters can never exist).
 * - FLIP reflow on filter (FULL tier): surviving cards glide to their
 *   new positions; entering cards fade up. LITE/STATIC reflow
 *   instantly.
 * - Accessible lightbox: native <dialog> (modal focus containment),
 *   Escape closes, arrow keys + on-screen arrows step (direction-aware
 *   in RTL), touch/pointer swipe, focus returns to the opening card.
 * - Video discipline: poster-first cards (play badge); playback happens
 *   in the lightbox with controls, muted-autoplay on open (§20 —
 *   nothing autoplays with sound). STATIC/no-JS: server-rendered
 *   poster grid remains (the page renders items server-side too).
 */
const posterOf = (item: GalleryItem) =>
  item.poster ?? `/media/posters/${item.src.split("/").pop()!.replace(/\.\w+$/, "")}.jpg`;

function subscribeTier(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-tier"] });
  return () => obs.disconnect();
}
const getTier = () => document.documentElement.getAttribute("data-motion-tier") ?? "static";

export function GalleryExperience() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const items = getPublishedGalleryItems();
  const categories = getGalleryCategories().filter((c) =>
    items.some((i) => i.category === c.id),
  );
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const rectsRef = useRef(new Map<string, DOMRect>());

  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  // FLIP: capture positions before a filter change…
  const applyFilter = (next: string) => {
    const grid = gridRef.current;
    rectsRef.current.clear();
    if (grid && getTier() === "full") {
      grid.querySelectorAll<HTMLElement>("[data-flip-id]").forEach((el) => {
        rectsRef.current.set(el.dataset.flipId!, el.getBoundingClientRect());
      });
    }
    setFilter(next);
  };

  // …and play the deltas after the reflow commits
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || rectsRef.current.size === 0) return;
    const prev = rectsRef.current;
    rectsRef.current = new Map();
    grid.querySelectorAll<HTMLElement>("[data-flip-id]").forEach((el) => {
      const before = prev.get(el.dataset.flipId!);
      const after = el.getBoundingClientRect();
      if (before) {
        const dx = before.left - after.left;
        const dy = before.top - after.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
            { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );
        }
      } else {
        el.animate(
          [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }],
          { duration: 380, easing: "ease-out" },
        );
      }
    });
  }, [visible]);

  // lightbox open/close via the native dialog for real modal semantics
  const open = (idx: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setLightbox(idx);
  };
  const close = () => dialogRef.current?.close();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightbox !== null && !dialog.open) dialog.showModal();
    const onClose = () => {
      setLightbox(null);
      openerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [lightbox]);

  const total = visible.length;
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) => (cur === null ? cur : (cur + dir + total) % total));
    },
    [total],
  );

  // keyboard steps (logical: "next" follows reading direction), backdrop
  // click, and pointer swipe — all registered imperatively on the dialog
  // (the dialog element itself carries no JSX interaction handlers)
  useEffect(() => {
    if (lightbox === null) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rtl = locale === "ar";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    let swipe: { x: number; t: number } | null = null;
    const onDown = (e: PointerEvent) => {
      swipe = { x: e.clientX, t: Date.now() };
    };
    const onUp = (e: PointerEvent) => {
      const start = swipe;
      swipe = null;
      if (!start || Date.now() - start.t > 700) return;
      const dx = e.clientX - start.x;
      if (Math.abs(dx) < 48) return;
      // physical swipe: dragging left always brings the item on the right
      step(dx < 0 ? 1 : -1);
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close(); // backdrop click
    };
    document.addEventListener("keydown", onKey);
    dialog.addEventListener("pointerdown", onDown);
    dialog.addEventListener("pointerup", onUp);
    dialog.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      dialog.removeEventListener("pointerdown", onDown);
      dialog.removeEventListener("pointerup", onUp);
      dialog.removeEventListener("click", onClick);
    };
  }, [lightbox, locale, step]);

  const meta = (item: GalleryItem) =>
    [item.location ? localize(item.location, locale) : null, item.year ? String(item.year) : null]
      .filter(Boolean)
      .join(" · ");

  const current = lightbox !== null ? visible[lightbox] : null;

  return (
    <div>
      {/* category filter — All + populated categories only */}
      <div className="gallery-filter" role="group" aria-label={t("inner.categories")}>
        <button
          type="button"
          className="gallery-filter-chip"
          data-active={filter === "all" || undefined}
          aria-pressed={filter === "all"}
          onClick={() => applyFilter("all")}
        >
          {t("common.all")}
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="gallery-filter-chip"
            data-active={filter === c.id || undefined}
            aria-pressed={filter === c.id}
            onClick={() => applyFilter(c.id)}
          >
            {localize(c.label, locale)}
          </button>
        ))}
      </div>

      {/* editorial masonry */}
      <ul ref={gridRef} className="gallery-masonry">
        {visible.map((g, idx) => (
          <li key={g.id} data-flip-id={g.id} className="gallery-masonry-item">
            <button
              type="button"
              className="gallery-card"
              aria-label={localize(g.alt, locale)}
              onClick={(e) => open(idx, e.currentTarget)}
            >
              <span className="gallery-card-media">
                {/* poster-first, always — playback belongs to the lightbox */}
                {/* eslint-disable-next-line @next/next/no-img-element -- approved published media, CSS-sized */}
                <img
                  src={g.type === "video" ? posterOf(g) : g.src}
                  alt=""
                  loading="lazy"
                />
                {g.type === "video" ? (
                  <span className="gallery-play-badge" aria-hidden="true">
                    <svg viewBox="0 0 16 16" focusable="false">
                      <path d="M5 3.5v9l8-4.5z" fill="currentColor" />
                    </svg>
                  </span>
                ) : null}
              </span>
              <span className="gallery-card-caption">
                <span>{localize(g.alt, locale)}</span>
                {meta(g) ? <span className="microlabel">{meta(g)}</span> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* accessible lightbox */}
      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        aria-label={current ? localize(current.alt, locale) : t("pages.gallery.title")}
      >
        {current ? (
          <div className="gallery-lightbox-body">
            <div className="gallery-lightbox-stage">
              {current.type === "video" ? (
                <video
                  key={current.id}
                  src={current.src}
                  poster={posterOf(current)}
                  controls
                  autoPlay
                  muted
                  playsInline
                  aria-label={localize(current.alt, locale)}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- approved published media
                <img key={current.id} src={current.src} alt={localize(current.alt, locale)} />
              )}
            </div>
            <div className="gallery-lightbox-caption">
              <p>{localize(current.alt, locale)}</p>
              {meta(current) ? <p className="microlabel">{meta(current)}</p> : null}
            </div>
            {visible.length > 1 ? (
              <div className="gallery-lightbox-nav-row">
                <button
                  type="button"
                  className="rail-nav gallery-lightbox-prev"
                  aria-label={t("carousel.prev")}
                  onClick={() => step(-1)}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="M10.5 3 5.5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="rail-nav gallery-lightbox-next"
                  aria-label={t("carousel.next")}
                  onClick={() => step(1)}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="M5.5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ) : null}
            <button
              type="button"
              className="gallery-lightbox-close"
              aria-label={t("common.close")}
              onClick={close}
            >
              ✕
            </button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
