"use client";

import { useCallback, useRef, useState } from "react";
import { getPublishedGalleryItems } from "@/lib/content";
import { GalleryCarousel } from "@/components/gallery/GalleryCarousel";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

/**
 * GALLERY on the homepage (D-067): the D-065 cover carousel in place of
 * the editorial masonry preview, with the D-045 lightbox opening from
 * the centre card. Renders ONLY published records — the system is
 * complete at any collection size and population stays a data edit.
 * No category filter, no lede, no "explore" link: there is no gallery
 * page any more, this section IS the gallery.
 */
export function GallerySection() {
  const items = getPublishedGalleryItems();
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const total = items.length;

  const open = (idx: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setLightbox(idx);
  };
  const onStep = useCallback(
    (dir: 1 | -1) => setLightbox((cur) => (cur === null ? cur : (cur + dir + total) % total)),
    [total],
  );
  const onClose = useCallback(() => {
    setLightbox(null);
    openerRef.current?.focus();
  }, []);

  return (
    <>
      <GalleryCarousel items={items} index={index} onIndexChange={setIndex} onOpen={open} />
      <GalleryLightbox items={items} index={lightbox} onStep={onStep} onClose={onClose} />
    </>
  );
}
