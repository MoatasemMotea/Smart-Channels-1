import type { GalleryItem } from "@/types/content";

/**
 * GALLERY (D-008 / A-004 / Amendment 3).
 *
 * HOW TO ADD MEDIA:
 *  1. put the original file in /media-source/images/gallery/ (photos) or
 *     /media-source/video/ (video);
 *  2. derive: photos → /public/media/gallery/<name>.webp (long edge 1600,
 *     WebP q82, metadata stripped) + <name>-800.webp for the card (`thumb`);
 *     videos → `npm run media` for derivatives + posters;
 *  3. add one entry below (set `published: true` only when approved);
 *     a video MUST name its `poster` explicitly and be ≤ 8 MB (D-065);
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
    poster: "/media/posters/event-network-build-2025.jpg",
    // D-065: held — 14.09 MB exceeds the 8 MB video limit. Re-published
    // when the re-encoded file lands on a NEW path (D065-VIDEO-REENCODE).
    published: false, // approved starter set (Q-P5-5, 2026-08-29); held at D-065
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
    poster: "/media/posters/event-environment-night.jpg",
    published: true, // approved starter set (Q-P5-5, 2026-08-29)
    order: 1,
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
    poster: "/media/posters/hospitality-walkway-night.jpg",
    published: true, // approved starter set (Q-P5-5, 2026-08-29)
    order: 2,
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
    order: 3,
    alt: {
      en: "Fiber-optic fusion splicing by a Smart Channels technician, Riyadh 2025",
      ar: "لِحام ألياف بصرية بيد فنيّ من Smart Channels، الرياض 2025",
    },
    category: "events-venues",
    year: 2025,
    location: { en: "Riyadh", ar: "الرياض" },
  },
  /* D-077 (owner-approved 2026-09-21): three photographs from the 2026
     field batch. Alt/caption text is the owner's, verbatim. The press-room
     photograph names the venue (Alawwal Park), never the club — the club is
     not a client; the event was held at their venue. No projectId: the only
     ledger record at that venue is a 2022–2025 venue fit-out, not this event. */
  {
    id: "image-alawwal-park-press-room",
    type: "image",
    src: "/media/gallery/alawwal-park-press-room.webp",
    thumb: "/media/gallery/alawwal-park-press-room-800.webp",
    published: true,
    order: 4,
    alt: {
      en: "Event AV and network setup — press room, Alawwal Park, Riyadh",
      ar: "تجهيز صوتي ومرئي وشبكي لفعالية — قاعة المؤتمرات، ملعب الأول بارك، الرياض",
    },
    caption: {
      en: "Event AV and network setup — press room, Alawwal Park, Riyadh",
      ar: "تجهيز صوتي ومرئي وشبكي لفعالية — قاعة المؤتمرات، ملعب الأول بارك، الرياض",
    },
    category: "events-venues",
    year: 2026,
    location: { en: "Riyadh", ar: "الرياض" },
  },
  {
    id: "image-smc-office-ceiling-install",
    type: "image",
    src: "/media/gallery/smc-office-ceiling-install.webp",
    thumb: "/media/gallery/smc-office-ceiling-install-800.webp",
    focus: "50% 20%", // 9:16 in a square card: the centred crop cut the technician's head
    published: true,
    order: 5,
    alt: {
      en: "Ceiling network installation at a corporate office, Riyadh",
      ar: "تركيب شبكة في السقف بمكتب شركة، الرياض",
    },
    caption: {
      en: "Ceiling network installation at a corporate office, Riyadh",
      ar: "تركيب شبكة في السقف بمكتب شركة، الرياض",
    },
    category: "infrastructure-networks",
    year: 2026,
    location: { en: "Riyadh", ar: "الرياض" },
  },
  {
    id: "image-smc-office-ladder-install",
    type: "image",
    src: "/media/gallery/smc-office-ladder-install.webp",
    thumb: "/media/gallery/smc-office-ladder-install-800.webp",
    focus: "50% 0%", // 3:4 in a square card: the centred crop cut the head of the technician on the ladder
    published: true,
    order: 6,
    alt: {
      en: "Network installation team at work in a corporate office, Riyadh",
      ar: "فريق تركيب الشبكات أثناء العمل بمكتب شركة، الرياض",
    },
    caption: {
      en: "Network installation team at work in a corporate office, Riyadh",
      ar: "فريق تركيب الشبكات أثناء العمل بمكتب شركة، الرياض",
    },
    category: "infrastructure-networks",
    year: 2026,
    location: { en: "Riyadh", ar: "الرياض" },
  },
];
