import type { SolutionFamily } from "@/types/content";

/**
 * SOLUTIONS — the 7 canonical families (Q2), content from the approved
 * Company Profile 2026 pp. 5–20.
 *
 * HOW TO EDIT: text and sub-solution lists are data — change them here.
 * `relatedVendorIds` reference ids in partners.ts and are populated ONLY
 * where the profile explicitly associates vendors with a family
 * (pp. 18–19). Arabic taglines/summaries are authored at each family's
 * build phase (D-006) — missing `ar` here is reported by validation.
 * D-081: every summary, item and sub-solution name now carries Arabic —
 * a translation of the approved English, nothing added. Brands and
 * technical acronyms (Cisco, CCTV, IPTV, PoE, Cat 6…) stay Latin inside
 * the Arabic sentence and are wrapped lang="en" by <LangText>.
 */
export const solutionFamilies: SolutionFamily[] = [
  {
    id: "infrastructure",
    slug: "infrastructure-data-centre",
    name: { en: "Infrastructure & Data Centre", ar: "البنية التحتية ومراكز البيانات" },
    tagline: { en: "Building the foundation for connected, scalable and reliable technology", ar: "نبني الأساس لتقنية متصلة وموثوقة وقابلة للتوسّع" },
    summary: {
      en: "We design and deliver robust infrastructure solutions for enterprises, multi-tenant buildings and data centers — from structured cabling and connectivity to racks, switching, fiber and complete infrastructure deployment.",
      ar: "نصمّم وننفّذ حلول بنية تحتية متينة للمؤسسات والمباني متعددة المستأجرين ومراكز البيانات — من الكابلات المهيكلة والاتصال إلى الخزائن والمحوّلات والألياف وتنفيذ البنية التحتية المتكاملة.",
    },
    subSolutions: [
      {
        id: "structured-cabling",
        name: { en: "Structured Cabling", ar: "الكابلات المهيكلة" },
        items: [
          { en: "Fiber optic cabling", ar: "كابلات الألياف البصرية" },
          { en: "Copper cabling — Cat 6 / Cat 6A / Cat 7", ar: "الكابلات النحاسية — Cat 6 / Cat 6A / Cat 7" },
          { en: "Cable management", ar: "تنظيم الكابلات" },
          { en: "Racks and enclosures", ar: "خزائن الشبكات والصناديق" },
          { en: "Testing, certification & documentation", ar: "الاختبار والاعتماد والتوثيق" },
        ],
      },
      {
        id: "data-centre",
        name: { en: "Data Centre", ar: "مراكز البيانات" },
        items: [
          { en: "Fiber connectivity & cable assemblies", ar: "توصيلات الألياف ومجمّعات الكابلات" },
          { en: "High-density fiber panels", ar: "لوحات ألياف عالية الكثافة" },
          { en: "Pre-terminated MPO / MTP solutions", ar: "حلول MPO / MTP منتهية مسبقًا" },
          { en: "Pre-terminated fiber trunks", ar: "مسارات ألياف رئيسية منتهية مسبقًا" },
          { en: "Rack & aisle containment", ar: "عزل الممرات الساخنة والباردة" },
        ],
      },
    ],
    /* D-050 Solutions integration — owner-approved film (MAPPING.md 01) */
    media: {
      video: "/media/solutions/01-infrastructure-data-centre-web.mp4",
      poster: "/media/solutions/posters/01-infrastructure-data-centre.jpg",
      orientation: "landscape" as const,
      width: 1920,
      height: 1080,
      focus: { desktop: "42% 45%", mobile: "40% 45%" },
      alt: { en: "Data-centre server racks with active drive bays in low blue light", ar: "خزائن خوادم في مركز بيانات بإضاءة زرقاء خافتة" },
      published: true,
    },
    order: 1,
  },
  {
    id: "networking",
    slug: "networking-connectivity",
    name: { en: "Networking & Connectivity", ar: "الشبكات والاتصال" },
    tagline: { en: "Building reliable networks for connected businesses", ar: "شبكات موثوقة لأعمال متصلة" },
    summary: {
      en: "We design, deploy and manage reliable network and connectivity solutions that keep businesses connected, secure and ready to scale. From enterprise networking and Wi-Fi to routing, switching, connectivity and network security, our solutions are built for performance, availability and long-term growth.",
      ar: "نصمّم حلول الشبكات والاتصال الموثوقة وننشرها وندير تشغيلها، لتبقى الأعمال متصلة وآمنة وجاهزة للتوسّع. من شبكات المؤسسات وWi-Fi إلى التوجيه والتبديل والاتصال وأمن الشبكات، تُبنى حلولنا للأداء والإتاحة والنمو على المدى الطويل.",
    },
    subSolutions: [
      {
        id: "active-networking",
        name: { en: "Active Networking", ar: "الشبكات النشطة" },
        items: [
          { en: "Enterprise & data center switching", ar: "محوّلات المؤسسات ومراكز البيانات" },
          { en: "Cloud-managed networking", ar: "شبكات مُدارة سحابيًا" },
          { en: "Wireless & Wi-Fi solutions", ar: "حلول الشبكات اللاسلكية وWi-Fi" },
          { en: "Next-generation firewalls & security", ar: "جدران الحماية من الجيل التالي والأمن" },
          { en: "Network routing & connectivity", ar: "توجيه الشبكات والاتصال" },
        ],
      },
      {
        id: "network-it-services",
        name: { en: "Network & IT Services", ar: "خدمات الشبكات وتقنية المعلومات" },
        items: [
          { en: "Network design & deployment", ar: "تصميم الشبكات ونشرها" },
          { en: "Network monitoring & management", ar: "مراقبة الشبكات وإدارتها" },
          { en: "Help desk & IT support", ar: "مكتب المساعدة ودعم تقنية المعلومات" },
          { en: "Technology support services", ar: "خدمات الدعم التقني" },
          { en: "IT infrastructure support", ar: "دعم البنية التحتية لتقنية المعلومات" },
        ],
      },
      {
        id: "amc-managed-support",
        name: { en: "AMC & Managed Support Services", ar: "عقود الصيانة والدعم المُدار" },
        items: [
          {
            en: "Preventive maintenance, troubleshooting, software and security updates, system support, installation, commissioning and user assistance.",
            ar: "الصيانة الوقائية، وتشخيص الأعطال وإصلاحها، وتحديثات البرمجيات والأمن، ودعم الأنظمة، والتركيب والتشغيل، ومساعدة المستخدمين.",
          },
        ],
      },
    ],
    /* D-050 Solutions integration — owner-approved film (MAPPING.md 02) */
    media: {
      video: "/media/solutions/02-networking-connectivity-web.mp4",
      poster: "/media/solutions/posters/02-networking-connectivity.jpg",
      orientation: "landscape" as const,
      width: 1920,
      height: 1080,
      focus: { desktop: "50% 45%", mobile: "50% 45%" },
      alt: { en: "Dark terrain-mapping and network-analytics motion graphic", ar: "رسوم متحركة داكنة لخرائط طبوغرافية وتحليلات شبكية" },
      published: true,
    },
    order: 2,
  },
  {
    id: "security",
    slug: "security-solutions",
    name: { en: "Security Solutions", ar: "الحلول الأمنية" },
    tagline: { en: "Protect what matters — from people and property to networks and data", ar: "نحمي ما يهم — من الأشخاص والممتلكات إلى الشبكات والبيانات" },
    summary: {
      en: "We deliver integrated security solutions that protect people, property, assets and digital environments. From CCTV and video analytics to access control, biometrics, firewalls and network security, our solutions provide reliable protection, visibility and control.",
      ar: "نقدّم حلولًا أمنية متكاملة تحمي الأشخاص والممتلكات والأصول والبيئات الرقمية. من كاميرات المراقبة CCTV وتحليلات الفيديو إلى التحكم في الدخول والقياسات الحيوية وجدران الحماية وأمن الشبكات، توفّر حلولنا حماية موثوقة ورؤية شاملة وتحكمًا كاملًا.",
    },
    subSolutions: [
      {
        id: "physical-security",
        name: { en: "Physical Security", ar: "الأمن المادي" },
        items: [
          { en: "CCTV & video surveillance", ar: "كاميرات CCTV والمراقبة بالفيديو" },
          { en: "Video analytics", ar: "تحليلات الفيديو" },
          { en: "Access control", ar: "التحكم في الدخول" },
          { en: "Biometric systems", ar: "أنظمة القياسات الحيوية" },
          { en: "Security monitoring", ar: "المراقبة الأمنية" },
          { en: "Security system integration", ar: "تكامل الأنظمة الأمنية" },
        ],
      },
      {
        id: "cyber-network-security",
        name: { en: "Cyber & Network Security", ar: "الأمن السيبراني وأمن الشبكات" },
        items: [
          { en: "Next-generation firewalls", ar: "جدران الحماية من الجيل التالي" },
          { en: "Network security", ar: "أمن الشبكات" },
          { en: "VPN & secure connectivity", ar: "الشبكات الافتراضية الخاصة VPN والاتصال الآمن" },
          { en: "Endpoint protection", ar: "حماية الأجهزة الطرفية" },
          { en: "Cloud security", ar: "الأمن السحابي" },
          { en: "Security monitoring & management", ar: "المراقبة الأمنية وإدارتها" },
        ],
      },
    ],
    /* D-050 Solutions integration — owner-approved film (MAPPING.md 03, portrait) */
    media: {
      video: "/media/solutions/03-security-technology-solutions-web.mp4",
      poster: "/media/solutions/posters/03-security-technology-solutions.jpg",
      orientation: "portrait" as const,
      width: 1080,
      height: 1920,
      alt: { en: "Security operations screens with live monitoring readouts in a dark control room", ar: "شاشات عمليات أمنية بقراءات مراقبة حية في غرفة تحكم داكنة" },
      published: true,
    },
    order: 3,
  },
  {
    id: "biometrics",
    slug: "biometrics-access-control",
    name: { en: "Biometrics & Access Control", ar: "القياسات الحيوية والتحكم في الدخول" },
    tagline: { en: "A matter of who, where and when", ar: "مسألة مَن وأين ومتى" },
    summary: {
      en: "From standalone access points to fully networked access control systems, we deliver scalable solutions tailored to the size, security and operational needs of each facility.",
      ar: "من نقاط الدخول المستقلة إلى أنظمة التحكم في الدخول المتصلة بالكامل بالشبكة، نقدّم حلولًا قابلة للتوسّع مصمّمة وفق حجم كل منشأة ومتطلباتها الأمنية والتشغيلية.",
    },
    subSolutions: [
      { id: "card-readers", name: { en: "Card Readers", ar: "قارئات البطاقات" }, items: [{ en: "Standalone and networked card readers for secure and convenient access across different facilities and environments.", ar: "قارئات بطاقات مستقلة ومتصلة بالشبكة لدخول آمن وميسّر في مختلف المنشآت والبيئات." }] },
      { id: "biometric-readers", name: { en: "Biometric Readers", ar: "القارئات الحيوية" }, items: [{ en: "Fingerprint and biometric identification solutions integrated with access control systems for enhanced security and accountability.", ar: "حلول التعرّف ببصمة الإصبع والقياسات الحيوية، متكاملة مع أنظمة التحكم في الدخول لتعزيز الأمن والمساءلة." }] },
      { id: "turnstiles-barriers", name: { en: "Turnstiles & Barriers", ar: "البوابات والحواجز" }, items: [{ en: "Turnstiles, vehicle barriers, road blockers and perimeter control solutions for secure entry and restricted areas.", ar: "البوابات الدوّارة وحواجز المركبات وموانع الطرق وحلول التحكم في المحيط، لدخول آمن وحماية المناطق المحظورة." }] },
      { id: "time-attendance", name: { en: "Time & Attendance", ar: "الوقت والحضور" }, items: [{ en: "Integrated time and attendance solutions that help organizations manage employee working hours, attendance and access records.", ar: "حلول متكاملة للوقت والحضور تساعد المؤسسات على إدارة ساعات عمل الموظفين وسجلات الحضور والدخول." }] },
    ],
    /* D-050 Solutions integration — owner-approved film (MAPPING.md 04) */
    media: {
      video: "/media/solutions/04-biometrics-access-control-web.mp4",
      poster: "/media/solutions/posters/04-biometrics-access-control.jpg",
      orientation: "landscape" as const,
      width: 1920,
      height: 1080,
      focus: { desktop: "45% 55%", mobile: "40% 55%" },
      alt: { en: "Commuters passing through electronic access-control gates", ar: "أشخاص يعبرون بوابات تحكم دخول إلكترونية" },
      published: true,
    },
    order: 4,
  },
  {
    id: "audio-visual",
    slug: "audio-visual-solutions",
    name: { en: "Audio & Visual Solutions", ar: "حلول الصوت والصورة" },
    tagline: { en: "Immersive audio and visual solutions for every environment", ar: "حلول صوت وصورة غامرة لكل بيئة" },
    summary: {
      en: "We deliver integrated audio visual solutions for meeting rooms, classrooms, offices, retail spaces, events and large-scale environments. From displays and video walls to professional audio, digital signage and presentation systems, we design, supply, install and support solutions tailored to each space.",
      ar: "نقدّم حلول صوت وصورة متكاملة لقاعات الاجتماعات والفصول الدراسية والمكاتب ومساحات البيع والفعاليات والبيئات الواسعة. من الشاشات وجدران الفيديو إلى الصوتيات الاحترافية واللوحات الرقمية وأنظمة العرض، نصمّم الحلول ونورّدها ونركّبها وندعمها وفق كل مساحة.",
    },
    subSolutions: [
      { id: "catv-iptv", name: { en: "CATV & IPTV", ar: "أنظمة CATV وIPTV" }, items: [{ en: "Centralized CATV and IPTV solutions for hospitality, healthcare, residential and commercial environments, including distribution, management and display systems.", ar: "حلول CATV وIPTV مركزية للضيافة والرعاية الصحية والمباني السكنية والتجارية، تشمل أنظمة التوزيع والإدارة والعرض." }] },
      { id: "video-conferencing", name: { en: "Video Conferencing & Collaboration", ar: "الاجتماعات المرئية والتعاون" }, items: [{ en: "Professional video conferencing and collaboration solutions for meeting rooms, boardrooms, classrooms and distributed teams.", ar: "حلول احترافية للاجتماعات المرئية والتعاون لقاعات الاجتماعات ومجالس الإدارة والفصول الدراسية والفرق الموزّعة." }] },
      { id: "digital-signage", name: { en: "Digital Signage & Video Walls", ar: "اللوحات الرقمية وجدران الفيديو" }, items: [{ en: "Digital signage, video walls, commercial displays and content solutions designed for communication, engagement and information delivery.", ar: "لوحات رقمية وجدران فيديو وشاشات تجارية وحلول محتوى مصمّمة للتواصل والتفاعل وإيصال المعلومات." }] },
    ],
    /* D-050 Solutions integration — owner-approved film (MAPPING.md 05, portrait) */
    media: {
      video: "/media/solutions/05-audio-visual-solutions-web.mp4",
      poster: "/media/solutions/posters/05-audio-visual-solutions.jpg",
      orientation: "portrait" as const,
      width: 1080,
      height: 1920,
      alt: { en: "Close-up of a laptop running professional audio-mixing software", ar: "لقطة قريبة لحاسوب محمول يشغّل برنامج مزج صوتي احترافي" },
      published: true,
    },
    order: 5,
  },
  {
    id: "unified-comms",
    slug: "unified-communications-smart-buildings",
    name: { en: "Unified Communications & Smart Buildings", ar: "الاتصالات الموحدة والمباني الذكية" },
    tagline: { en: "Connected communications and smarter buildings", ar: "اتصالات متصلة ومبانٍ أكثر ذكاءً" },
    summary: {
      en: "From enterprise IP telephony to intelligent building management, we integrate communication and facility technologies to create connected, efficient and easier-to-manage environments.",
      ar: "من الهاتف عبر بروتوكول الإنترنت للمؤسسات إلى الإدارة الذكية للمباني، ندمج تقنيات الاتصال وتقنيات المرافق لبناء بيئات متصلة وفعّالة وأسهل في الإدارة.",
    },
    subSolutions: [
      {
        id: "pbx-ip-telephony",
        name: { en: "PBX Systems & IP Telephony", ar: "أنظمة السنترال والهاتف عبر الإنترنت" },
        items: [
          {
            en: "A private branch exchange concentrates central-office lines and provides intercommunication between a large number of stations. An IP PBX handles voice under Internet protocol, bringing the benefits of computer telephony integration (CTI) to enterprise and hospitality deployments. Technology from Cisco, Avaya, Panasonic, Alcatel, Grandstream and others.",
            ar: "يجمع السنترال الخاص (PBX) خطوط المقسم المركزي ويوفّر الاتصال الداخلي بين عدد كبير من الأطراف. ويعالج سنترال IP PBX الصوت عبر بروتوكول الإنترنت، فيضيف مزايا تكامل الهاتف مع الحاسوب (CTI) إلى منشآت المؤسسات والضيافة. بتقنيات من Cisco وAvaya وPanasonic وAlcatel وGrandstream وغيرها.",
          },
        ],
      },
      {
        id: "building-management",
        name: { en: "Building Management", ar: "إدارة المباني" },
        items: [
          {
            en: "A complete building management software solution able to monitor and control every building system — and more, including IT devices such as printers and network switches, inside the same software.",
            ar: "حل برمجي متكامل لإدارة المباني يراقب كل أنظمة المبنى ويتحكم فيها — وأكثر من ذلك، إذ يضم أجهزة تقنية المعلومات كالطابعات ومحوّلات الشبكة في البرنامج نفسه.",
          },
        ],
      },
    ],
    // Profile p.18 explicitly associates these PBX vendors; only ids that
    // exist in the approved p.28 alliances list are referenced here.
    relatedVendorIds: ["cisco", "panasonic", "grandstream"],
    /* D-050 Solutions integration — owner-approved film (MAPPING.md 06) */
    media: {
      video: "/media/solutions/06-unified-communications-smart-buildings-web.mp4",
      poster: "/media/solutions/posters/06-unified-communications-smart-buildings.jpg",
      orientation: "landscape" as const,
      width: 1920,
      height: 1080,
      focus: { desktop: "50% 42%", mobile: "50% 42%" },
      alt: { en: "Stereographic monochrome view of high-rise buildings curving around a glass dome", ar: "منظر بانورامي أحادي اللون لأبراج شاهقة تلتف حول قبة زجاجية" },
      published: true,
    },
    order: 6,
  },
  {
    id: "surveillance-ai",
    slug: "video-surveillance-ai",
    name: { en: "Video Surveillance & AI Solutions", ar: "المراقبة بالفيديو وحلول الذكاء الاصطناعي" },
    tagline: { en: "Intelligent surveillance built for visibility, security and control", ar: "مراقبة ذكية مصمّمة للرؤية والأمن والتحكم" },
    summary: {
      en: "We design and deploy comprehensive video surveillance solutions tailored to the security and operational requirements of each environment. From IP CCTV and high-resolution cameras to AI-powered video analytics, thermal imaging, solar-powered surveillance and advanced multi-sensor systems, we deliver scalable solutions for permanent facilities, remote locations and temporary deployments.",
      ar: "نصمّم حلول مراقبة بالفيديو شاملة وننشرها وفق المتطلبات الأمنية والتشغيلية لكل بيئة. من كاميرات IP CCTV والكاميرات عالية الدقة إلى تحليلات الفيديو بالذكاء الاصطناعي والتصوير الحراري والمراقبة بالطاقة الشمسية والأنظمة المتقدمة متعددة المستشعرات، نقدّم حلولًا قابلة للتوسّع للمنشآت الدائمة والمواقع النائية والتجهيزات المؤقتة.",
    },
    subSolutions: [
      { id: "multi-sensor", name: { en: "Multi-sensor & Panoramic Cameras", ar: "الكاميرات متعددة المستشعرات والبانورامية" }, items: [{ en: "Multi-sensor and panoramic camera solutions designed to provide wide-area coverage, high-resolution imaging and detailed visibility across large and complex environments.", ar: "حلول كاميرات متعددة المستشعرات وبانورامية توفّر تغطية واسعة وتصويرًا عالي الدقة ورؤية تفصيلية في البيئات الكبيرة والمعقّدة." }] },
      { id: "solar-cctv", name: { en: "Solar CCTV", ar: "كاميرات المراقبة بالطاقة الشمسية" }, items: [{ en: "Solar-powered surveillance solutions for remote and temporary locations, combining autonomous power, wireless connectivity and local or cloud-based recording.", ar: "حلول مراقبة تعمل بالطاقة الشمسية للمواقع النائية والمؤقتة، تجمع بين الطاقة الذاتية والاتصال اللاسلكي والتسجيل المحلي أو السحابي." }] },
      { id: "ai-video-analytics", name: { en: "AI-powered Video Analytics", ar: "تحليلات الفيديو بالذكاء الاصطناعي" }, items: [{ en: "AI-powered video analytics for people and vehicle detection, facial recognition, license plate recognition, object tracking, counting and other intelligent security applications.", ar: "تحليلات فيديو بالذكاء الاصطناعي لرصد الأشخاص والمركبات، والتعرّف على الوجوه ولوحات المركبات، وتتبّع الأجسام وعدّها، وغيرها من التطبيقات الأمنية الذكية." }] },
      { id: "ip-thermal-lowlight", name: { en: "IP, Thermal & Low-light CCTV", ar: "كاميرات IP الحرارية ومنخفضة الإضاءة" }, items: [{ en: "Advanced camera solutions for day and night surveillance, including high-resolution IP, thermal and low-light cameras for challenging environments and critical security applications.", ar: "حلول كاميرات متقدمة للمراقبة ليلًا ونهارًا، تشمل كاميرات IP عالية الدقة والكاميرات الحرارية وكاميرات الإضاءة المنخفضة للبيئات الصعبة والتطبيقات الأمنية الحرجة." }] },
      { id: "anpr-lpr", name: { en: "ANPR / LPR Solutions", ar: "حلول التعرّف على لوحات المركبات ANPR / LPR" }, items: [{ en: "Intelligent license plate recognition solutions for vehicle identification, access control, parking management and monitoring of vehicle movements across sites and facilities.", ar: "حلول ذكية للتعرّف على لوحات المركبات لتحديد هويتها والتحكم في الدخول وإدارة المواقف ومراقبة حركة المركبات عبر المواقع والمنشآت." }] },
    ],
    // Profile p.19: "Technology from leading global brands".
    relatedVendorIds: ["dallmeier", "hikvision", "dahua", "hanwha", "bosch"],
    /* D-050 Solutions integration — owner-approved film (MAPPING.md 07) */
    media: {
      video: "/media/solutions/07-video-surveillance-ai-solutions-web.mp4",
      poster: "/media/solutions/posters/07-video-surveillance-ai-solutions.jpg",
      orientation: "landscape" as const,
      width: 1920,
      height: 1080,
      focus: { desktop: "50% 38%", mobile: "50% 38%" },
      alt: { en: "Operators monitoring a large video-surveillance wall in a control room", ar: "مشغّلون يراقبون جدار شاشات مراقبة في غرفة تحكم" },
      published: true,
    },
    order: 7,
  },
];
