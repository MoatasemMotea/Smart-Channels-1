"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { GalleryItem, Locale } from "@/types/content";
import { getGalleryCategories, getPublishedGalleryItems, localize } from "@/lib/content";
import { GalleryCarousel } from "@/components/gallery/GalleryCarousel";

/**
 * GALLERY SYSTEM (P10 · D-045 · D-065).
 *
 * - Category filter: "All" + only categories that actually hold
 *   published items (empty filters can never exist). Changing the
 *   filter re-centres the carousel on its first item.
 * - D-065: the editorial masonry (and its FLIP reflow) is replaced by
 *   the 3D cover carousel (GalleryCarousel) — poster-first video cards
 *   that play muted only in the centre. The page still renders items
 *   server-side, so STATIC/no-JS shows the first ring in place.
 * - Accessible lightbox, unchanged from D-045: native <dialog> (modal
 *   focus containment), Escape closes, arrow keys + on-screen arrows
 *   step (direction-aware in RTL), touch/pointer swipe, focus returns
 *   to the opening card. Opened by a click on the centre card, so a
 *   video plays WITH sound there (the click is the permission); the
 *   card-mode video is always muted. Posters are explicit data (D-065),
 *   nothing is derived by convention here any more.
 */
export function GalleryExperience() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const items = getPublishedGalleryItems();
  const categories = getGalleryCategories().filter((c) =>
    items.some((i) => i.category === c.id),
  );
  const [filter, setFilter] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  const applyFilter = (next: string) => {
    setFilter(next);
    setIndex(0);
  };

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

      {/* D-065: the 3D cover carousel — the centre card opens the lightbox */}
      <GalleryCarousel items={visible} index={index} onIndexChange={setIndex} onOpen={open} />

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
                // eslint-disable-next-line jsx-a11y/media-has-caption -- D-065: opened by a click, so it plays with sound; ambient field footage without speech, no caption track exists
                <video
                  key={current.id}
                  src={current.src}
                  poster={current.poster}
                  controls
                  autoPlay
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
