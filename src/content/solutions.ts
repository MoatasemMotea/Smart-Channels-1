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
 */
export const solutionFamilies: SolutionFamily[] = [
  {
    id: "infrastructure",
    slug: "infrastructure-data-centre",
    name: { en: "Infrastructure & Data Centre", ar: "البنية التحتية ومراكز البيانات" },
    tagline: { en: "Building the foundation for connected, scalable and reliable technology" },
    summary: {
      en: "We design and deliver robust infrastructure solutions for enterprises, multi-tenant buildings and data centers — from structured cabling and connectivity to racks, switching, fiber and complete infrastructure deployment.",
    },
    subSolutions: [
      {
        id: "structured-cabling",
        name: { en: "Structured Cabling", ar: "الكابلات المهيكلة" },
        items: [
          { en: "Fiber optic cabling" },
          { en: "Copper cabling — Cat 6 / Cat 6A / Cat 7" },
          { en: "Cable management" },
          { en: "Racks and enclosures" },
          { en: "Testing, certification & documentation" },
        ],
      },
      {
        id: "data-centre",
        name: { en: "Data Centre", ar: "مراكز البيانات" },
        items: [
          { en: "Fiber connectivity & cable assemblies" },
          { en: "High-density fiber panels" },
          { en: "Pre-terminated MPO / MTP solutions" },
          { en: "Pre-terminated fiber trunks" },
          { en: "Rack & aisle containment" },
        ],
      },
    ],
    order: 1,
  },
  {
    id: "networking",
    slug: "networking-connectivity",
    name: { en: "Networking & Connectivity", ar: "الشبكات والاتصال" },
    tagline: { en: "Building reliable networks for connected businesses" },
    summary: {
      en: "We design, deploy and manage reliable network and connectivity solutions that keep businesses connected, secure and ready to scale. From enterprise networking and Wi-Fi to routing, switching, connectivity and network security, our solutions are built for performance, availability and long-term growth.",
    },
    subSolutions: [
      {
        id: "active-networking",
        name: { en: "Active Networking", ar: "الشبكات النشطة" },
        items: [
          { en: "Enterprise & data center switching" },
          { en: "Cloud-managed networking" },
          { en: "Wireless & Wi-Fi solutions" },
          { en: "Next-generation firewalls & security" },
          { en: "Network routing & connectivity" },
        ],
      },
      {
        id: "network-it-services",
        name: { en: "Network & IT Services", ar: "خدمات الشبكات وتقنية المعلومات" },
        items: [
          { en: "Network design & deployment" },
          { en: "Network monitoring & management" },
          { en: "Help desk & IT support" },
          { en: "Technology support services" },
          { en: "IT infrastructure support" },
        ],
      },
      {
        id: "amc-managed-support",
        name: { en: "AMC & Managed Support Services", ar: "عقود الصيانة والدعم المُدار" },
        items: [
          {
            en: "Preventive maintenance, troubleshooting, software and security updates, system support, installation, commissioning and user assistance.",
          },
        ],
      },
    ],
    order: 2,
  },
  {
    id: "security",
    slug: "security-solutions",
    name: { en: "Security Solutions", ar: "الحلول الأمنية" },
    tagline: { en: "Protect what matters — from people and property to networks and data" },
    summary: {
      en: "We deliver integrated security solutions that protect people, property, assets and digital environments. From CCTV and video analytics to access control, biometrics, firewalls and network security, our solutions provide reliable protection, visibility and control.",
    },
    subSolutions: [
      {
        id: "physical-security",
        name: { en: "Physical Security", ar: "الأمن المادي" },
        items: [
          { en: "CCTV & video surveillance" },
          { en: "Video analytics" },
          { en: "Access control" },
          { en: "Biometric systems" },
          { en: "Security monitoring" },
          { en: "Security system integration" },
        ],
      },
      {
        id: "cyber-network-security",
        name: { en: "Cyber & Network Security", ar: "الأمن السيبراني وأمن الشبكات" },
        items: [
          { en: "Next-generation firewalls" },
          { en: "Network security" },
          { en: "VPN & secure connectivity" },
          { en: "Endpoint protection" },
          { en: "Cloud security" },
          { en: "Security monitoring & management" },
        ],
      },
    ],
    order: 3,
  },
  {
    id: "biometrics",
    slug: "biometrics-access-control",
    name: { en: "Biometrics & Access Control", ar: "القياسات الحيوية والتحكم في الدخول" },
    tagline: { en: "A matter of who, where and when" },
    summary: {
      en: "From standalone access points to fully networked access control systems, we deliver scalable solutions tailored to the size, security and operational needs of each facility.",
    },
    subSolutions: [
      { id: "card-readers", name: { en: "Card Readers", ar: "قارئات البطاقات" }, items: [{ en: "Standalone and networked card readers for secure and convenient access across different facilities and environments." }] },
      { id: "biometric-readers", name: { en: "Biometric Readers", ar: "القارئات الحيوية" }, items: [{ en: "Fingerprint and biometric identification solutions integrated with access control systems for enhanced security and accountability." }] },
      { id: "turnstiles-barriers", name: { en: "Turnstiles & Barriers", ar: "البوابات والحواجز" }, items: [{ en: "Turnstiles, vehicle barriers, road blockers and perimeter control solutions for secure entry and restricted areas." }] },
      { id: "time-attendance", name: { en: "Time & Attendance", ar: "الوقت والحضور" }, items: [{ en: "Integrated time and attendance solutions that help organizations manage employee working hours, attendance and access records." }] },
    ],
    order: 4,
  },
  {
    id: "audio-visual",
    slug: "audio-visual-solutions",
    name: { en: "Audio & Visual Solutions", ar: "حلول الصوت والصورة" },
    tagline: { en: "Immersive audio and visual solutions for every environment" },
    summary: {
      en: "We deliver integrated audio visual solutions for meeting rooms, classrooms, offices, retail spaces, events and large-scale environments. From displays and video walls to professional audio, digital signage and presentation systems, we design, supply, install and support solutions tailored to each space.",
    },
    subSolutions: [
      { id: "catv-iptv", name: { en: "CATV & IPTV", arPolicy: "latin" }, items: [{ en: "Centralized CATV and IPTV solutions for hospitality, healthcare, residential and commercial environments, including distribution, management and display systems." }] },
      { id: "video-conferencing", name: { en: "Video Conferencing & Collaboration", ar: "الاجتماعات المرئية والتعاون" }, items: [{ en: "Professional video conferencing and collaboration solutions for meeting rooms, boardrooms, classrooms and distributed teams." }] },
      { id: "digital-signage", name: { en: "Digital Signage & Video Walls", ar: "اللوحات الرقمية وجدران الفيديو" }, items: [{ en: "Digital signage, video walls, commercial displays and content solutions designed for communication, engagement and information delivery." }] },
    ],
    order: 5,
  },
  {
    id: "unified-comms",
    slug: "unified-communications-smart-buildings",
    name: { en: "Unified Communications & Smart Buildings", ar: "الاتصالات الموحدة والمباني الذكية" },
    tagline: { en: "Connected communications and smarter buildings" },
    summary: {
      en: "From enterprise IP telephony to intelligent building management, we integrate communication and facility technologies to create connected, efficient and easier-to-manage environments.",
    },
    subSolutions: [
      {
        id: "pbx-ip-telephony",
        name: { en: "PBX Systems & IP Telephony", ar: "أنظمة السنترال والهاتف عبر الإنترنت" },
        items: [
          {
            en: "A private branch exchange concentrates central-office lines and provides intercommunication between a large number of stations. An IP PBX handles voice under Internet protocol, bringing the benefits of computer telephony integration (CTI) to enterprise and hospitality deployments. Technology from Cisco, Avaya, Panasonic, Alcatel, Grandstream and others.",
          },
        ],
      },
      {
        id: "building-management",
        name: { en: "Building Management", ar: "إدارة المباني" },
        items: [
          {
            en: "A complete building management software solution able to monitor and control every building system — and more, including IT devices such as printers and network switches, inside the same software.",
          },
        ],
      },
    ],
    // Profile p.18 explicitly associates these PBX vendors; only ids that
    // exist in the approved p.28 alliances list are referenced here.
    relatedVendorIds: ["cisco", "panasonic", "grandstream"],
    order: 6,
  },
  {
    id: "surveillance-ai",
    slug: "video-surveillance-ai",
    name: { en: "Video Surveillance & AI Solutions", ar: "المراقبة بالفيديو وحلول الذكاء الاصطناعي" },
    tagline: { en: "Intelligent surveillance built for visibility, security and control" },
    summary: {
      en: "We design and deploy comprehensive video surveillance solutions tailored to the security and operational requirements of each environment. From IP CCTV and high-resolution cameras to AI-powered video analytics, thermal imaging, solar-powered surveillance and advanced multi-sensor systems, we deliver scalable solutions for permanent facilities, remote locations and temporary deployments.",
    },
    subSolutions: [
      { id: "multi-sensor", name: { en: "Multi-sensor & Panoramic Cameras", ar: "الكاميرات متعددة المستشعرات والبانورامية" }, items: [{ en: "Multi-sensor and panoramic camera solutions designed to provide wide-area coverage, high-resolution imaging and detailed visibility across large and complex environments." }] },
      { id: "solar-cctv", name: { en: "Solar CCTV", arPolicy: "latin" }, items: [{ en: "Solar-powered surveillance solutions for remote and temporary locations, combining autonomous power, wireless connectivity and local or cloud-based recording." }] },
      { id: "ai-video-analytics", name: { en: "AI-powered Video Analytics", ar: "تحليلات الفيديو بالذكاء الاصطناعي" }, items: [{ en: "AI-powered video analytics for people and vehicle detection, facial recognition, license plate recognition, object tracking, counting and other intelligent security applications." }] },
      { id: "ip-thermal-lowlight", name: { en: "IP, Thermal & Low-light CCTV", arPolicy: "latin" }, items: [{ en: "Advanced camera solutions for day and night surveillance, including high-resolution IP, thermal and low-light cameras for challenging environments and critical security applications." }] },
      { id: "anpr-lpr", name: { en: "ANPR / LPR Solutions", arPolicy: "latin" }, items: [{ en: "Intelligent license plate recognition solutions for vehicle identification, access control, parking management and monitoring of vehicle movements across sites and facilities." }] },
    ],
    // Profile p.19: "Technology from leading global brands".
    relatedVendorIds: ["dallmeier", "hikvision", "dahua", "hanwha", "bosch"],
    order: 7,
  },
];
