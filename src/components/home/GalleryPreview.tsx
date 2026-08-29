"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types/content";
import { getPublishedGalleryItems, localize } from "@/lib/content";
import { Link } from "@/i18n/navigation";

/**
 * GALLERY — homepage preview, editorial masonry (P5 · Q-P5-5).
 *
 * Renders ONLY published (owner-approved) gallery records — expanding the
 * preview is forever a data edit. Videos are poster-first, muted, looped,
 * playsinline: FULL tier plays them while visible (paused offscreen);
 * LITE/touch toggles playback on tap; STATIC and no-JS show posters only.
 * Captions carry only source-supported metadata (year · location where
 * approved); unresolved fields are simply absent.
 */
function subscribeTier(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-tier"] });
  return () => obs.disconnect();
}
const getTier = () => document.documentElement.getAttribute("data-motion-tier") ?? "static";

export function GalleryPreview() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const tier = useSyncExternalStore(subscribeTier, getTier, () => "static");
  const items = getPublishedGalleryItems();
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tier !== "full") return; // LITE: tap-to-play; STATIC: posters
    const host = hostRef.current;
    if (!host) return;
    const videos = [...host.querySelectorAll<HTMLVideoElement>("video")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.35 },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [tier, items.length]);

  const meta = (item: (typeof items)[number]) => {
    const parts: string[] = [];
    if (item.location) parts.push(localize(item.location, locale));
    if (item.year) parts.push(String(item.year));
    return parts.join(" · ");
  };

  return (
    <div ref={hostRef}>
      <div className="gallery-masonry">
        {items.map((item) => (
          <figure key={item.id} className="gallery-tile">
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster ?? `/media/posters/${item.src.split("/").pop()!.replace(/\.\w+$/, "")}.jpg`}
                muted
                loop
                playsInline
                preload="none"
                aria-label={localize(item.alt, locale)}
                onClick={(e) => {
                  if (tier === "full") return;
                  const v = e.currentTarget;
                  if (v.paused) v.play().catch(() => {});
                  else v.pause();
                }}
              />
            ) : (
              <Image
                src={item.src}
                alt={localize(item.alt, locale)}
                width={848}
                height={464}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            )}
            <figcaption className="gallery-caption">
              <span className="text-sm">{localize(item.alt, locale)}</span>
              {meta(item) ? (
                <span className="microlabel" dir="ltr">
                  {meta(item)}
                </span>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8">
        <Link href="/gallery" className="tx-link font-semibold text-accent">
          {t("common.explore")} →
        </Link>
      </p>
    </div>
  );
}
