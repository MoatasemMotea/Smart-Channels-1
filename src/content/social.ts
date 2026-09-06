import type { SocialLink } from "@/types/content";

/**
 * SOCIAL PRESENCE (P4 Rev3 §13).
 *
 * HOW TO EDIT: when the owner supplies an official company URL, set `url`
 * and flip `enabled: true` — the footer treatment renders automatically.
 * URLs are NEVER invented; disabled/url-less records are hidden from the
 * public site (no dead links, no "coming soon"). Validation rejects an
 * enabled record without a URL.
 */
export const socialLinks: SocialLink[] = [
  {
    /* TEMPORARY: personal profile (/in/), not a company page (/company/).
       Excluded from Organization sameAs. Replace when the official
       company page is created — see O-016. */
    platform: "linkedin",
    url: "https://www.linkedin.com/in/smart-channels-514a80372/",
    enabled: true,
    label: { en: "Smart Channels on LinkedIn", ar: "Smart Channels على لينكدإن" },
    order: 1,
  },
  {
    platform: "instagram",
    url: null, // official URL pending owner input
    enabled: false,
    label: { en: "Smart Channels on Instagram", ar: "Smart Channels على إنستغرام" },
    order: 2,
  },
  {
    platform: "x",
    url: null, // official URL pending owner input
    enabled: false,
    label: { en: "Smart Channels on X", ar: "Smart Channels على إكس" },
    order: 3,
  },
  {
    platform: "tiktok",
    url: null, // official URL pending owner input (D-050 §39)
    enabled: false,
    label: { en: "Smart Channels on TikTok", ar: "Smart Channels على تيك توك" },
    order: 4,
  },
];
