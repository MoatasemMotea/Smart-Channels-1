/**
 * ARABIC NAMES PENDING (D-081) — the owner's waiting list.
 *
 * One language per page: on the Arabic site every client and project is
 * shown by its OFFICIAL Arabic name. Where that name is not known it is
 * never invented — the record keeps its English name (no `ar`, no
 * arPolicy) and is listed here. The language smoke test accepts exactly
 * these names in Latin on Arabic pages and prints them on every run; the
 * validator fails if a record lacks Arabic without being listed here, or
 * is listed here while it already has Arabic.
 *
 * HOW TO CLOSE AN ENTRY: add `ar: "…"` to the record's `name` in
 * clients.ts / projects.ts and delete its line below.
 */
export interface PendingName {
  kind: "client" | "project";
  id: string;
  en: string;
  note: string;
}

export const arabicPending: PendingName[] = [
  { kind: "client", id: "skywave", en: "SkyWave", note: "no Arabic on the approved logo" },
  { kind: "client", id: "wpe", en: "Water & Power Engineering", note: "no Arabic on the approved logo" },
  { kind: "client", id: "add-plus", en: "add+", note: "no Arabic on the approved logo" },
  { kind: "client", id: "sala-entertainment", en: "Sala Entertainment", note: "no Arabic on the approved logo" },
  { kind: "client", id: "hopscotch", en: "Hopscotch", note: "Saudi or international brand? — no Arabic on the logo" },
  { kind: "client", id: "moments-international", en: "Moments International", note: "Saudi or international brand? — no Arabic on the logo" },
  { kind: "client", id: "hwadi", en: "Hwadi", note: "no Arabic on the approved logo" },
  { kind: "client", id: "reform-athletica", en: "Reform Athletica", note: "no Arabic on the approved logo" },
  { kind: "project", id: "rcu-outdoor-alula", en: "RCU Outdoor Entertainment — AlUla", note: "official Arabic title of the engagement unknown" },
  { kind: "project", id: "neom-sports-village", en: "NEOM Sports Village", note: "official Arabic name unknown" },
  { kind: "project", id: "world-combat-games", en: "World Combat Games — Riyadh 2023", note: "official Arabic name unknown" },
  { kind: "project", id: "formula-e1-jeddah", en: "Formula E1 — Jeddah", note: "event identity unclear (E1 powerboat series?)" },
  { kind: "project", id: "pfl-venues", en: "PFL — Green Hall / Boulevard / MENA", note: "official Arabic name unknown" },
  { kind: "project", id: "fei-world-cup-finals", en: "FEI World Cup Finals — Riyadh", note: "official Arabic name unknown" },
  { kind: "project", id: "longines-gct", en: "Longines Global Champions Tour", note: "official Arabic name unknown" },
  { kind: "project", id: "wta-finals-riyadh", en: "WTA Finals — Riyadh", note: "official Arabic name unknown" },
  { kind: "project", id: "next-gen-atp-finals", en: "Next Gen ATP Finals", note: "official Arabic name unknown" },
  { kind: "project", id: "saudi-snooker-masters", en: "Saudi Arabia Snooker Masters", note: "official Arabic name unknown" },
];
