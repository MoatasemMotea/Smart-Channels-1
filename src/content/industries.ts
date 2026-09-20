import type { Industry } from "@/types/content";

/**
 * INDUSTRIES — the 16 approved sectors (Company Profile 2026 p.23), in the
 * D-072 homepage order (owner importance ranking, 2026-09-20).
 *
 * HOW TO EDIT: change `order` to reorder the homepage slider and the
 * /industries index — no component changes. Taglines are the owner's text,
 * verbatim (D-072). `image` names the full-width WebP under
 * public/media/industries/ (its `-960.webp` sibling serves phones); "" means
 * no approved scene yet and the slide shows the dark gradient alone;
 * `imageWidth` is the file's real pixel width (the srcset descriptor)
 * (08 Stadiums and 09 Major Sporting Events: the supplied files are
 * transparent cut-outs, held by owner decision until scenes arrive).
 * Do not add sectors that are not owner-approved; ids are referenced by
 * projects (`sectorId`) and never change.
 */
export const industries: Industry[] = [
  {
    id: "religious-holy-sites",
    name: { en: "Religious & Holy Sites", ar: "المواقع الدينية والمقدسة" },
    tagline: { en: "Reliable communications and security for the world's most visited sacred spaces", ar: "اتصالات وأمن موثوقان لأكثر الأماكن المقدسة ازدحامًا في العالم" },
    order: 1,
    image: "industry-01-religious.webp",
    imageWidth: 1672,
  },
  {
    id: "government-public-sector",
    name: { en: "Government & Public Sector", ar: "الحكومة والقطاع العام" },
    tagline: { en: "Secure infrastructure built to public-sector standards", ar: "بنية تحتية آمنة وفق معايير القطاع العام" },
    order: 2,
    image: "industry-02-government.webp",
    imageWidth: 1672,
  },
  {
    id: "giga-projects",
    name: { en: "Giga-projects", ar: "المشاريع العملاقة" },
    tagline: { en: "Networks and systems that scale with cities being built from the ground up", ar: "شبكات وأنظمة تنمو مع مدن تُبنى من الصفر" },
    order: 3,
    image: "industry-03-giga-projects.webp",
    imageWidth: 1672,
  },
  {
    id: "diplomatic-missions",
    name: { en: "Diplomatic Missions", ar: "البعثات الدبلوماسية" },
    tagline: { en: "Discreet, secure technology for embassies and consulates", ar: "تقنية آمنة ومتحفّظة للسفارات والقنصليات" },
    order: 4,
    image: "industry-04-diplomatic.webp",
    imageWidth: 1672,
  },
  {
    id: "banking-finance",
    name: { en: "Banking & Finance", ar: "البنوك والقطاع المالي" },
    tagline: { en: "Resilient connectivity and surveillance where downtime is not an option", ar: "اتصال ومراقبة صامدان حيث لا مجال للتوقف" },
    order: 5,
    image: "industry-05-banking.webp",
    imageWidth: 1672,
  },
  {
    id: "industrial-energy",
    name: { en: "Industrial & Energy", ar: "الصناعة والطاقة" },
    tagline: { en: "Ruggedized systems for plants, fields and remote operations", ar: "أنظمة معزّزة للمصانع والحقول والمواقع النائية" },
    order: 6,
    image: "industry-06-industrial.webp",
    imageWidth: 1672,
  },
  {
    id: "education",
    name: { en: "Education", ar: "التعليم" },
    tagline: { en: "Campus-wide networks, AV and safety for schools and universities", ar: "شبكات وصوتيات وأمن لحرم المدارس والجامعات" },
    order: 7,
    image: "industry-07-education.webp",
    imageWidth: 1672,
  },
  {
    id: "stadiums-sports-cities",
    name: { en: "Stadiums & Sports Cities", ar: "الملاعب والمدن الرياضية" },
    tagline: { en: "Connectivity and control for venues that fill in minutes", ar: "اتصال وتحكّم لمنشآت تمتلئ في دقائق" },
    order: 8,
    image: "",
    imageWidth: 0,
  },
  {
    id: "major-sporting-events",
    name: { en: "Major Sporting Events", ar: "الفعاليات الرياضية الكبرى" },
    tagline: { en: "Temporary infrastructure deployed and dismantled on schedule", ar: "بنية مؤقتة تُنشر وتُفكّك في موعدها" },
    order: 9,
    image: "",
    imageWidth: 0,
  },
  {
    id: "motorsport-racing",
    name: { en: "Motorsport & Racing", ar: "رياضة المحركات والسباقات" },
    tagline: { en: "Radio, timing and broadcast support at speed", ar: "لاسلكي وتوقيت ودعم بث بسرعة الحلبة" },
    order: 10,
    image: "industry-10-motorsport.webp",
    imageWidth: 1536,
  },
  {
    id: "healthcare",
    name: { en: "Healthcare", ar: "الرعاية الصحية" },
    tagline: { en: "Reliable networks and access control for hospitals and clinics", ar: "شبكات موثوقة وتحكّم بالدخول للمستشفيات والعيادات" },
    order: 11,
    image: "industry-11-healthcare.webp",
    imageWidth: 1672,
  },
  {
    id: "cultural-seasons-festivals",
    name: { en: "Cultural Seasons & Festivals", ar: "المواسم الثقافية والمهرجانات" },
    tagline: { en: "Sound, screens and communications for large audiences", ar: "صوت وشاشات واتصالات لجماهير كبيرة" },
    order: 12,
    image: "industry-12-festivals.webp",
    imageWidth: 1672,
  },
  {
    id: "hospitality-fb",
    name: { en: "Hospitality & F&B", ar: "الضيافة والأغذية والمشروبات" },
    tagline: { en: "Guest-facing technology that stays invisible", ar: "تقنية تخدم الضيف ولا تُرى" },
    order: 13,
    image: "industry-13-hospitality.webp",
    imageWidth: 1672,
  },
  {
    id: "retail-malls",
    name: { en: "Retail & Malls", ar: "التجزئة والمراكز التجارية" },
    tagline: { en: "Surveillance, analytics and digital signage across large floors", ar: "مراقبة وتحليل وشاشات رقمية عبر مساحات واسعة" },
    order: 14,
    image: "industry-14-retail.webp",
    imageWidth: 1672,
  },
  {
    id: "transport-rail",
    name: { en: "Transport & Rail", ar: "النقل والسكك الحديدية" },
    tagline: { en: "Communications and monitoring along corridors and stations", ar: "اتصالات ومراقبة على طول المسارات والمحطات" },
    order: 15,
    image: "industry-15-transport.webp",
    imageWidth: 1672,
  },
  {
    id: "media-broadcast",
    name: { en: "Media & Broadcast", ar: "الإعلام والبث" },
    tagline: { en: "Signal, display and networking for studios and live production", ar: "إشارة وعرض وشبكات للاستوديوهات والإنتاج المباشر" },
    order: 16,
    image: "industry-16-media.webp",
    imageWidth: 1672,
  },
];
