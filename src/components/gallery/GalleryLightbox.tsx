"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { GalleryItem, Locale } from "@/types/content";
import { localize } from "@/lib/content";

/**
 * GALLERY LIGHTBOX (D-045, extracted at D-067 — behaviour unchanged).
 *
 * Native <dialog> for real modal semantics (focus containment), Escape
 * closes, arrow keys + on-screen .rail-nav arrows step (direction-aware
 * in RTL), pointer swipe steps, backdrop click closes. The owner of the
 * state (GallerySection) passes the open index, receives steps and the
 * close, and returns focus to the opening card. A video plays WITH
 * sound and controls here — the click that opened the dialog is the
 * browser's permission (D-065). Posters are explicit data.
 *
 * D-070: the dialog is a full-screen grid (see .gallery-lightbox in
 * globals.css) that centres the media on the screen; the caption and, on
 * small screens, the arrow row hang under the media inside
 * .gallery-lightbox-below, so they never shift the centre.
 */
export function GalleryLightbox({
  items,
  index,
  onStep,
  onClose,
}: {
  items: GalleryItem[];
  index: number | null;
  onStep: (dir: 1 | -1) => void;
  onClose: () => void;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // open/close via the native dialog; the 'close' event (Escape, backdrop,
  // the ✕ button) is the single exit path and hands control back
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [index, onClose]);

  // keyboard steps (logical: "next" follows reading direction), backdrop
  // click, and pointer swipe — all registered imperatively on the dialog
  // (the dialog element itself carries no JSX interaction handlers)
  useEffect(() => {
    if (index === null) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rtl = locale === "ar";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onStep(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") onStep(rtl ? 1 : -1);
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
      onStep(dx < 0 ? 1 : -1);
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
  }, [index, locale, onStep]);

  const meta = (item: GalleryItem) =>
    [item.location ? localize(item.location, locale) : null, item.year ? String(item.year) : null]
      .filter(Boolean)
      .join(" · ");

  const current = index !== null ? items[index] : null;

  return (
    <>
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
              <div className="gallery-lightbox-below">
                <div className="gallery-lightbox-caption">
                  <p>{localize(current.alt, locale)}</p>
                  {meta(current) ? <p className="microlabel">{meta(current)}</p> : null}
                </div>
                {items.length > 1 ? (
                  <div className="gallery-lightbox-nav-row">
                    <button
                      type="button"
                      className="rail-nav gallery-lightbox-prev"
                      aria-label={t("carousel.prev")}
                      onClick={() => onStep(-1)}
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                        <path d="M10.5 3 5.5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="rail-nav gallery-lightbox-next"
                      aria-label={t("carousel.next")}
                      onClick={() => onStep(1)}
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                        <path d="M5.5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              className="gallery-lightbox-close"
              aria-label={t("common.close")}
              onClick={() => dialogRef.current?.close()}
            >
              ✕
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
