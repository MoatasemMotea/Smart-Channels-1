import type { LocalizedText } from "@/types/content";

/**
 * COMPANY / ABOUT copy — from the approved Company Profile 2026 (pp. 3–5,
 * 30–31). HOW TO EDIT: change text here; Arabic fields are authored from
 * the approved English and require owner review before publication (D-006).
 * General positioning uses the approved source scope "the Kingdom and the
 * Gulf" (P2-A04).
 */
export const company = {
  /** p.3 headline. */
  positioning: {
    en: "A trusted technology solutions partner in Saudi Arabia",
    ar: "شريك موثوق لحلول التقنية في المملكة العربية السعودية",
  } satisfies LocalizedText,

  /** D-092: the homepage "About Us" paragraph, owner-authored (replaces
   *  the earlier p.3 profile paragraph everywhere `about` is read). */
  about: {
    en: "Smart Channels is a Saudi company specialized in technology and communications systems integration. We design infrastructure, networks, security, communication and display systems, and we supply, install and operate them for government entities, institutions, major projects and national events.",
    ar: "Smart Channels شركة سعودية متخصصة في تكامل أنظمة التقنية والاتصالات. نصمّم البنية التحتية والشبكات وأنظمة الأمن والاتصال والعرض، ونورّدها ونركّبها ونشغّلها للجهات الحكومية والمؤسسات والمشاريع الكبرى والفعاليات الوطنية.",
  } satisfies LocalizedText,

  /** The company's mission — ONE source for the homepage About and
   *  /company (D-092: the owner's wording, replacing the D-081/D-082
   *  sentence everywhere). */
  mission: {
    en: "We deliver integrated technology solutions to global standards, from design and supply to installation, operation and support, delivered on schedule and ready to work from day one.",
    ar: "نقدّم حلولًا تقنية متكاملة بمعايير عالمية، من التصميم والتوريد إلى التركيب والتشغيل والدعم، ونسلّمها في موعدها جاهزة للعمل من اليوم الأول.",
  } satisfies LocalizedText,

  /** The company's values — ONE source for the homepage About and /company
   *  (D-092: the owner's five, each a name and one line, replacing the
   *  D-083 wording everywhere). */
  values: [
    { name: { en: "Reliability", ar: "الموثوقية" }, line: { en: "Systems you can rely on in decisive moments.", ar: "أنظمة يُعتمد عليها في اللحظات الحاسمة." } },
    { name: { en: "Precision", ar: "الدقة" }, line: { en: "We measure and plan before we execute.", ar: "نقيس ونخطط قبل أن ننفّذ." } },
    { name: { en: "Responsiveness", ar: "سرعة الاستجابة" }, line: { en: "We deploy from our own stock, without waiting on suppliers.", ar: "ننشر من مخزوننا دون انتظار الموردين." } },
    { name: { en: "Safety", ar: "السلامة" }, line: { en: "Strict standards for our teams and our clients' sites.", ar: "معايير صارمة لفرقنا ولمواقع عملائنا." } },
    { name: { en: "Partnership", ar: "الشراكة" }, line: { en: "We stay with our clients after handover.", ar: "نبقى مع عملائنا بعد التسليم." } },
  ] satisfies { name: LocalizedText; line: LocalizedText }[],

  /**
   * D-081 (vision/goals), D-092 (new wording + layout): the homepage
   * "About" section's vision/mission/values/goals. `mission`/`values`
   * are read from the single shared source above; `vision`/`goals` are
   * homepage-only — /company keeps its own `capabilities`.
   */
  aboutPillars: {
    vision: {
      en: "To be the leading technology partner that government entities and major projects in the Kingdom rely on to build smart, secure and sustainable infrastructure.",
      ar: "أن نكون الشريك التقني الأول الذي تعتمد عليه الجهات الحكومية والمشاريع الكبرى في المملكة لبناء بنية تحتية ذكية وآمنة ومستدامة.",
    } satisfies LocalizedText,
    // mission: read from `company.mission` above (one source, D-082)
    // values: read from `company.values` above (one source, D-083)
    goals: [
      { en: "Support Saudi Vision 2030 projects with the technology infrastructure they need.", ar: "دعم مشاريع رؤية المملكة 2030 بالبنية التقنية التي تحتاجها." },
      { en: "Empower national talent and develop their technical skills.", ar: "تمكين الكفاءات الوطنية وتطوير مهاراتها التقنية." },
      { en: "Stand permanently ready to deploy in any city in the Kingdom.", ar: "الجاهزية الدائمة للنشر في أي مدينة بالمملكة." },
      { en: "Build long-term partnerships built on trust and quality.", ar: "بناء شراكات طويلة الأمد قائمة على الثقة والجودة." },
    ] satisfies LocalizedText[],
  },

  /** D-092: the three "one responsibility" highlight rows under the
   *  About paragraph (icon + phrase), owner-authored. Homepage only. */
  aboutHighlights: [
    { en: "One responsibility, from design to operation", ar: "مسؤولية واحدة من التصميم حتى التشغيل" },
    { en: "Ready to deploy in any city", ar: "جاهزية للنشر في أي مدينة" },
    { en: "Ongoing support after handover", ar: "دعم مستمر بعد التسليم" },
  ] satisfies LocalizedText[],

  /** D-092: the "Our values" and "Our goals" section intros (homepage
   *  only), owner-authored. */
  aboutSectionIntros: {
    values: {
      en: "Five values that guide how we work, on every site and every project.",
      ar: "خمس قيم توجّه طريقة عملنا في كل موقع وكل مشروع.",
    } satisfies LocalizedText,
    goals: {
      en: "What we're working to achieve in the Kingdom over the years ahead.",
      ar: "ما نعمل على تحقيقه في المملكة خلال السنوات القادمة.",
    } satisfies LocalizedText,
  },

  /** p.3 capability pillars. */
  capabilities: [
    {
      id: "advisory",
      name: { en: "Advisory & Technical", ar: "الاستشارات والخدمات التقنية" },
      description: {
        en: "Guiding clients to the technologies that serve their needs and drive tangible business growth.",
        ar: "نرشد عملاءنا إلى التقنيات التي تخدم احتياجاتهم وتدفع نموّ أعمالهم بشكل ملموس.", // authored from approved EN (D-006) — owner review pending
      },
    },
    {
      id: "engineering",
      name: { en: "Engineering Team", ar: "الفريق الهندسي" },
      description: {
        en: "Highly experienced engineers and technicians across design, implementation and maintenance.",
        ar: "مهندسون وفنيّون بخبرات عالية في التصميم والتنفيذ والصيانة.", // authored from approved EN (D-006) — owner review pending
      },
    },
    {
      id: "integration",
      name: { en: "Systems Integration", ar: "تكامل الأنظمة" },
      description: {
        en: "Network, communications and security systems brought into one scalable architecture.",
        ar: "أنظمة الشبكات والاتصالات والأمن في بنية واحدة قابلة للتوسّع.", // authored from approved EN (D-006) — owner review pending
      },
    },
    {
      id: "managed",
      name: { en: "Managed Services", ar: "الخدمات المُدارة" },
      description: {
        en: "Operation, monitoring and continuous support, with annual maintenance contracts.",
        ar: "تشغيل ومراقبة ودعم مستمر، مع عقود صيانة سنوية.", // authored from approved EN (D-006) — owner review pending
      },
    },
  ],

  /** p.30 client-base scope statement (approved source scope, P2-A04). */
  reach: {
    en: "Government bodies, giga-projects, financial institutions, global brands and event organisers across the Kingdom and the Gulf.",
    // AR authored from the approved EN (D-006) — owner review pending
    ar: "جهات حكومية ومشاريع كبرى ومؤسسات مالية وعلامات عالمية ومنظّمو فعاليات في المملكة والخليج.",
  } satisfies LocalizedText,
};

/**
 * ABOUT MEDIA SLOT (final pre-media directive §7 · D-050).
 *
 * The About section is designed to carry an owner-approved company
 * film later. While `enabled` is false the section renders the
 * approved fiber-splicing photograph; when the owner supplies the
 * video, place the files under /public/media/about/, fill the paths
 * and set enabled: true — no component changes. Never stock footage,
 * never AI media presented as evidence (D-009).
 */
export const aboutMedia: {
  enabled: boolean;
  videoSrc: string | null;
  poster: string | null;
} = {
  enabled: false,
  videoSrc: null,
  poster: null,
};
