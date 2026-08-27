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
 * The three entries below are CANDIDATE records for the owner-supplied
 * videos (archived in /media-source/video/). Their categories, captions
 * and publication await owner approval under O-008/O-012 — they must stay
 * published: false until the owner approves them at P10.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "video-event-network-build-2025",
    type: "video",
    src: "/media/gallery/event-network-build-2025.mp4",
    published: false, // CANDIDATE — awaiting owner approval (P10 / O-012)
    alt: {
      en: "Event site build and fiber network work at a Riyadh event, 2025",
      ar: "أعمال تجهيز الموقع وشبكة الألياف في فعالية بالرياض، 2025",
    },
    category: "events-venues",
    projectId: undefined,
  },
  {
    id: "video-event-environment-night",
    type: "video",
    src: "/media/gallery/event-environment-night.mp4",
    published: false, // CANDIDATE — awaiting owner approval (P10 / O-012)
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
    published: false, // CANDIDATE — awaiting owner approval (P10 / O-012)
    alt: {
      en: "Night hospitality walkway environment",
      ar: "ممر ضيافة في أجواء ليلية",
    },
    category: "events-venues",
  },
];
