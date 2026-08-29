import type { Client } from "@/types/content";

/**
 * CLIENTS — organizations from the approved Company Profile 2026 p.30
 * ("A selection of the organizations Smart Channels has delivered for
 * since 2020"), page order, official Latin names (Q5).
 *
 * HOW TO EDIT: toggle `enabled`; logos are the owner-approved marks
 * extracted at 300 DPI from the profile's p.30 grid (P5 logo revision) —
 * replace `logo.src` with an official client asset to upgrade quality
 * (never substitute internet logos, D-005). The updated profile resolved
 * O-014: "Saleh Al Rajhi Partners" (row 1) and "HQWS" (row 3) are now
 * legible and recorded.
 */
const name = (en: string): Client["name"] => ({ en, arPolicy: "latin" });

export const clients: Client[] = [
  { id: "skywave", name: name("SkyWave"), logo: { src: "/media/logos/clients/skywave.webp", quality: "pdf-extract" }, enabled: true, order: 1 },
  { id: "sela", name: name("Sela"), logo: { src: "/media/logos/clients/sela.webp", quality: "pdf-extract" }, enabled: true, order: 2 },
  {
    id: "saleh-al-rajhi",
    name: { en: "Saleh Al Rajhi Partners", ar: "صالح عبد العزيز الراجحي" },
    logo: { src: "/media/logos/clients/saleh-al-rajhi.webp", quality: "pdf-extract" },
    enabled: true,
    order: 2.5,
  },
  { id: "rothschild", name: name("Rothschild & Co"), logo: { src: "/media/logos/clients/rothschild.webp", quality: "pdf-extract" }, enabled: true, order: 3 },
  { id: "takamol", name: name("Takamol"), logo: { src: "/media/logos/clients/takamol.webp", quality: "pdf-extract" }, enabled: true, order: 4 },
  { id: "veolia", name: name("Veolia"), logo: { src: "/media/logos/clients/veolia.webp", quality: "pdf-extract" }, enabled: true, order: 5 },
  { id: "mott-macdonald", name: name("Mott MacDonald"), logo: { src: "/media/logos/clients/mott-macdonald.webp", quality: "pdf-extract" }, enabled: true, order: 6 },
  { id: "westcon-comstor", name: name("Westcon-Comstor"), logo: { src: "/media/logos/clients/westcon-comstor.webp", quality: "pdf-extract" }, enabled: true, order: 7 },
  { id: "response-plus", name: name("Response Plus Medical Complex"), logo: { src: "/media/logos/clients/response-plus.webp", quality: "pdf-extract" }, enabled: true, order: 8 },
  { id: "wpe", name: name("Water & Power Engineering"), logo: { src: "/media/logos/clients/wpe.webp", quality: "pdf-extract" }, enabled: true, order: 9 },
  {
    id: "hqws",
    name: name("HQWS"),
    logo: { src: "/media/logos/clients/hqws.webp", quality: "pdf-extract" },
    enabled: true,
    order: 9.5,
  },
  { id: "veda-holding", name: name("Veda Holding"), logo: { src: "/media/logos/clients/veda-holding.webp", quality: "pdf-extract" }, enabled: true, order: 10 },
  { id: "perfect-presentation", name: name("Perfect Presentation (2P)"), logo: { src: "/media/logos/clients/perfect-presentation.webp", quality: "pdf-extract" }, enabled: true, order: 11 },
  { id: "add-plus", name: name("add+"), logo: { src: "/media/logos/clients/add-plus.webp", quality: "pdf-extract" }, enabled: true, order: 12 },
  { id: "dhahran-expo", name: name("Dhahran Expo"), logo: { src: "/media/logos/clients/dhahran-expo.webp", quality: "pdf-extract" }, enabled: true, order: 13 },
  { id: "sala-entertainment", name: name("Sala Entertainment"), logo: { src: "/media/logos/clients/sala-entertainment.webp", quality: "pdf-extract" }, enabled: true, order: 14 },
  { id: "balich-wonder-studio", name: name("BalichWonderStudio"), logo: { src: "/media/logos/clients/balich-wonder-studio.webp", quality: "pdf-extract" }, enabled: true, order: 15 },
  { id: "hopscotch", name: name("Hopscotch"), logo: { src: "/media/logos/clients/hopscotch.webp", quality: "pdf-extract" }, enabled: true, order: 16 },
  { id: "moments-international", name: name("Moments International"), logo: { src: "/media/logos/clients/moments-international.webp", quality: "pdf-extract" }, enabled: true, order: 17 },
  { id: "mediapro", name: name("mediaPro International"), logo: { src: "/media/logos/clients/mediapro.webp", quality: "pdf-extract" }, enabled: true, order: 18 },
  { id: "time", name: name("TIME"), logo: { src: "/media/logos/clients/time.webp", quality: "pdf-extract" }, enabled: true, order: 19 },
  { id: "pfl-mena", name: name("PFL MENA"), logo: { src: "/media/logos/clients/pfl-mena.webp", quality: "pdf-extract" }, enabled: true, order: 20 },
  { id: "moelis", name: name("Moelis"), logo: { src: "/media/logos/clients/moelis.webp", quality: "pdf-extract" }, enabled: true, order: 21 },
  { id: "black-orange", name: name("black orange"), logo: { src: "/media/logos/clients/black-orange.webp", quality: "pdf-extract" }, enabled: true, order: 22 },
  { id: "buildup", name: name("buildup"), logo: { src: "/media/logos/clients/buildup.webp", quality: "pdf-extract" }, enabled: true, order: 23 },
  { id: "hwadi", name: name("Hwadi"), logo: { src: "/media/logos/clients/hwadi.webp", quality: "pdf-extract" }, enabled: true, order: 24 },
  { id: "reform-athletica", name: name("Reform Athletica"), logo: { src: "/media/logos/clients/reform-athletica.webp", quality: "pdf-extract" }, enabled: true, order: 25 },
];
