import type { GalleryItem } from "@/types/content";

/**
 * GALLERY (D-008 / A-004 / Amendment 3).
 *
 * HOW TO ADD MEDIA:
 *  1. put the original file in /media-source/ (photos or video);
 *  2. run `npm run media` to generate optimized derivatives + posters;
 *  3. add one entry below (set `published: true` only when approved);
 *  4. build. No component changes, ever.
 *
 * `published: false` = staged privately: excluded from all public
 * rendering AND no public derivative is generated (a committed file is
 * never publicly reachable merely because it exists — Amendment 3).
 *
 * STARTER SET (P5 · Q-P5-5, owner-approved 2026-08-29): the three
 * owner-supplied videos plus the authentic fiber-splicing still (a frame
 * extracted from event-network-build-2025.mp4 at 42.5s — same approved
 * source, no external media) are published for the Homepage Gallery
 * preview. Metadata carries only source-supported facts; unresolved
 * fields stay absent. Further additions remain data-only edits.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "video-event-network-build-2025",
    type: "video",
    src: "/media/gallery/event-network-build-2025.mp4",
    published: true, // approved starter set (Q-P5-5, 2026-08-29)
    alt: {
      en: "Event site build and fiber network work at a Riyadh event, 2025",
      ar: "أعمال تجهيز الموقع وشبكة الألياف في فعالية بالرياض، 2025",
    },
    category: "events-venues",
    projectId: undefined,
    year: 2025,
    location: { en: "Riyadh", ar: "الرياض" },
  },
  {
    id: "video-event-environment-night",
    type: "video",
    src: "/media/gallery/event-environment-night.mp4",
    published: true, // approved starter set (Q-P5-5, 2026-08-29)
    alt: {
      en: "Night event environment with branded displays",
      ar: "أجواء فعالية ليلية مع شاشات وعناصر مميزة بالعلامة",
    },
    category: "events-venues",
  },
  {
    id: "video-hospitality-walkway-night",
    type: "video",
    src: "/media/gallery/hospitality-walkway-night.mp4",
    published: true, // approved starter set (Q-P5-5, 2026-08-29)
    alt: {
      en: "Night hospitality walkway environment",
      ar: "ممر ضيافة في أجواء ليلية",
    },
    category: "events-venues",
  },
  {
    id: "image-fiber-splicing-riyadh-2025",
    type: "image",
    src: "/media/gallery/fiber-splicing-riyadh-2025.webp",
    published: true, // approved starter set (Q-P5-5, 2026-08-29)
    alt: {
      en: "Fiber-optic fusion splicing by a Smart Channels technician, Riyadh 2025",
      ar: "لِحام ألياف بصرية بيد فنيّ من Smart Channels، الرياض 2025",
    },
    category: "events-venues",
    year: 2025,
    location: { en: "Riyadh", ar: "الرياض" },
  },
];
