import type { Client } from "@/types/content";

/**
 * CLIENTS — organizations from the approved Company Profile 2026 p.30
 * ("A selection of the organizations Smart Channels has delivered for
 * since 2020"), page order, official Latin names (Q5).
 *
 * HOW TO EDIT: toggle `enabled`; add `logo` only with an approved asset
 * (D-005). Two p.30 entries were NOT legible enough in the source PDF to
 * record confidently and are intentionally omitted pending owner
 * confirmation (see docs/asset-inventory.md, O-005 note): the Arabic-named
 * partner firm on row 1 and the "HQWS"-like mark on row 3.
 */
const name = (en: string): Client["name"] => ({ en, arPolicy: "latin" });

export const clients: Client[] = [
  { id: "skywave", name: name("SkyWave"), enabled: true, order: 1 },
  { id: "sela", name: name("Sela"), enabled: true, order: 2 },
  { id: "rothschild", name: name("Rothschild & Co"), enabled: true, order: 3 },
  { id: "takamol", name: name("Takamol"), enabled: true, order: 4 },
  { id: "veolia", name: name("Veolia"), enabled: true, order: 5 },
  { id: "mott-macdonald", name: name("Mott MacDonald"), enabled: true, order: 6 },
  { id: "westcon-comstor", name: name("Westcon-Comstor"), enabled: true, order: 7 },
  { id: "response-plus", name: name("Response Plus Medical Complex"), enabled: true, order: 8 },
  { id: "wpe", name: name("Water & Power Engineering"), enabled: true, order: 9 },
  { id: "veda-holding", name: name("Veda Holding"), enabled: true, order: 10 },
  { id: "perfect-presentation", name: name("Perfect Presentation (2P)"), enabled: true, order: 11 },
  { id: "add-plus", name: name("add+"), enabled: true, order: 12 },
  { id: "dhahran-expo", name: name("Dhahran Expo"), enabled: true, order: 13 },
  { id: "sala-entertainment", name: name("Sala Entertainment"), enabled: true, order: 14 },
  { id: "balich-wonder-studio", name: name("BalichWonderStudio"), enabled: true, order: 15 },
  { id: "hopscotch", name: name("Hopscotch"), enabled: true, order: 16 },
  { id: "moments-international", name: name("Moments International"), enabled: true, order: 17 },
  { id: "mediapro", name: name("mediaPro International"), enabled: true, order: 18 },
  { id: "time", name: name("TIME"), enabled: true, order: 19 },
  { id: "pfl-mena", name: name("PFL MENA"), enabled: true, order: 20 },
  { id: "moelis", name: name("Moelis"), enabled: true, order: 21 },
  { id: "black-orange", name: name("black orange"), enabled: true, order: 22 },
  { id: "buildup", name: name("buildup"), enabled: true, order: 23 },
  { id: "hwadi", name: name("Hwadi"), enabled: true, order: 24 },
  { id: "reform-athletica", name: name("Reform Athletica"), enabled: true, order: 25 },
];
