/**
 * Content validation (Q-P3-10, A-002).
 *
 * Dev mode (`npm run validate`): reports problems; Arabic-completeness
 * gaps are WARNINGS (English fallback is allowed during development but
 * must be visible).
 * Release mode (`npm run validate:release`): missing required Arabic
 * business copy and any structural problem is a FAILURE (release-blocking,
 * A-002). Intentional-Latin proper nouns (arPolicy: 'latin') are complete.
 *
 * Checks: referenced file paths exist · id/slug uniqueness · referential
 * integrity (sectors, vendors, projects, gallery) · EN/AR message key
 * parity · Arabic completeness of business content.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { LocalizedText } from "../src/types/content";
import { stats } from "../src/content/stats";
import { solutionFamilies } from "../src/content/solutions";
import { industries } from "../src/content/industries";
import { projects } from "../src/content/projects";
import { galleryItems } from "../src/content/gallery";
import { galleryCategories } from "../src/content/gallery-categories";
import { partners } from "../src/content/partners";
import { clients } from "../src/content/clients";
import { documents } from "../src/content/documents";
import { navigation } from "../src/content/navigation";
import { locations } from "../src/content/locations";
import { pointInSaudi } from "../src/lib/map/geo";

const release = process.argv.includes("--release");
const root = join(import.meta.dirname, "..");
const errors: string[] = [];
const warnings: string[] = [];
const arGaps: string[] = [];

function checkPath(p: string, owner: string, requiredNow: boolean) {
  const fs = join(root, "public", p);
  if (!existsSync(fs)) {
    if (requiredNow) errors.push(`${owner}: missing file public${p}`);
    else warnings.push(`${owner}: file public${p} does not exist yet (unpublished record — ok)`);
  }
}

function checkAr(text: LocalizedText | undefined, owner: string) {
  if (!text) return;
  if (text.ar === undefined && text.arPolicy !== "latin") arGaps.push(`${owner}: missing Arabic`);
}

function checkUnique(ids: string[], owner: string) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${owner}: duplicate id/slug "${id}"`);
    seen.add(id);
  }
}

/* ---- uniqueness ---- */
checkUnique(stats.map((s) => s.id), "stats");
checkUnique(solutionFamilies.map((s) => s.id), "solutions.id");
checkUnique(solutionFamilies.map((s) => s.slug), "solutions.slug");
checkUnique(industries.map((i) => i.id), "industries");
checkUnique(projects.map((p) => p.id), "projects.id");
checkUnique(projects.map((p) => p.slug), "projects.slug");
checkUnique(galleryItems.map((g) => g.id), "gallery");
checkUnique(partners.map((p) => p.id), "partners");
checkUnique(clients.map((c) => c.id), "clients");

/* ---- referential integrity ---- */
const industryIds = new Set(industries.map((i) => i.id));
const partnerIds = new Set(partners.map((p) => p.id));
const projectIds = new Set(projects.map((p) => p.id));
const galleryIds = new Set(galleryItems.map((g) => g.id));
const categoryIds = new Set(galleryCategories.map((c) => c.id));
const solutionIds = new Set(solutionFamilies.map((s) => s.id));

for (const p of projects) {
  for (const s of p.sectorIds) {
    if (!industryIds.has(s)) errors.push(`project ${p.id}: unknown sectorId "${s}"`);
  }
  for (const g of p.galleryItemIds ?? []) {
    if (!galleryIds.has(g)) errors.push(`project ${p.id}: unknown galleryItemId "${g}"`);
  }
  for (const s of p.solutionIds ?? []) {
    if (!solutionIds.has(s)) errors.push(`project ${p.id}: unknown solutionId "${s}"`);
  }
}
for (const f of solutionFamilies) {
  for (const v of f.relatedVendorIds ?? []) {
    if (!partnerIds.has(v)) errors.push(`solution ${f.id}: unknown vendorId "${v}"`);
  }
}

/* ---- D-050 Solutions media: locked MAPPING.md associations ---------- */
const SOLUTION_MEDIA_MAPPING: Record<string, string> = {
  "infrastructure-data-centre": "/media/solutions/01-infrastructure-data-centre-web.mp4",
  "networking-connectivity": "/media/solutions/02-networking-connectivity-web.mp4",
  "security-solutions": "/media/solutions/03-security-technology-solutions-web.mp4",
  "biometrics-access-control": "/media/solutions/04-biometrics-access-control-web.mp4",
  "audio-visual-solutions": "/media/solutions/05-audio-visual-solutions-web.mp4",
  "unified-communications-smart-buildings":
    "/media/solutions/06-unified-communications-smart-buildings-web.mp4",
  "video-surveillance-ai": "/media/solutions/07-video-surveillance-ai-solutions-web.mp4",
};
for (const f of solutionFamilies) {
  const expected = SOLUTION_MEDIA_MAPPING[f.slug];
  if (!f.media) {
    errors.push(`solution ${f.id}: missing owner-approved media record (D-050)`);
    continue;
  }
  if (expected && f.media.video !== expected)
    errors.push(`solution ${f.id}: media mapping violates MAPPING.md (got ${f.media.video})`);
  if (f.media.video.startsWith("/media-source") || f.media.poster.startsWith("/media-source"))
    errors.push(`solution ${f.id}: media must never be served from media-source/`);
  checkPath(f.media.video, `solution ${f.id} video`, f.media.published);
  checkPath(f.media.poster, `solution ${f.id} poster`, f.media.published);
  const portrait = f.media.height > f.media.width;
  if ((f.media.orientation === "portrait") !== portrait)
    errors.push(`solution ${f.id}: orientation "${f.media.orientation}" contradicts ${f.media.width}×${f.media.height}`);
  checkAr(f.media.alt, `solution ${f.id} media alt`);
}
for (const g of galleryItems) {
  if (!categoryIds.has(g.category)) errors.push(`gallery ${g.id}: unknown category "${g.category}"`);
  if (g.projectId && !projectIds.has(g.projectId))
    errors.push(`gallery ${g.id}: unknown projectId "${g.projectId}"`);
  checkPath(g.src, `gallery ${g.id}`, g.published);
  if (g.poster) checkPath(g.poster, `gallery ${g.id} poster`, g.published);
}
for (const d of documents) checkPath(d.src, `document ${d.locale}`, true);

/* ---- D-020: Company Profile is source-only, never publicly served ---- */
import { readdirSync, statSync } from "node:fs";
function findPdfs(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) findPdfs(p, acc);
    else if (/\.pdf$/i.test(name)) acc.push(p);
  }
  return acc;
}
for (const pdf of findPdfs(join(root, "public")))
  errors.push(`D-020: PDF found under public/ (${pdf}) — no public documents are approved`);
for (const d of documents)
  if (/profile/i.test(d.src) || /profile/i.test(d.label.en))
    errors.push(`D-020: Company Profile record "${d.src}" must never be publicly enabled`);

/* ---- P5 §4: product records (architecture ships empty; guards armed) ---- */
import { products } from "../src/content/products";
{
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const pr of products) {
    if (ids.has(pr.id)) errors.push(`product ${pr.id}: duplicate id`);
    if (slugs.has(pr.slug)) errors.push(`product ${pr.slug}: duplicate slug`);
    ids.add(pr.id);
    slugs.add(pr.slug);
    if (pr.image) checkPath(pr.image.src, `product ${pr.id} image`, pr.published);
    for (const g of pr.gallery ?? []) checkPath(g.src, `product ${pr.id} gallery`, pr.published);
    if (pr.published && !pr.image)
      warnings.push(`product ${pr.id}: published without an image (stage renders text-only)`);
  }
}

/* ---- Rev3 §13: social records — no dead links, no invented URLs ---- */
import { socialLinks } from "../src/content/social";
for (const l of socialLinks) {
  if (l.enabled && !l.url)
    errors.push(`social ${l.platform}: enabled without a URL (would render a dead link)`);
  if (l.url && !/^https:\/\//.test(l.url))
    errors.push(`social ${l.platform}: URL must be absolute https`);
}
for (const p of projects) {
  for (const m of p.media ?? []) checkPath(m.src, `project ${p.id} media ${m.id}`, p.display !== "hidden");
  if (p.logo) checkPath(p.logo.src, `project ${p.id} logo`, p.display === "logo");
}

/* ---- Arabic completeness (business layer) ---- */
for (const s of stats) checkAr(s.label, `stat ${s.id}`);
for (const f of solutionFamilies) {
  checkAr(f.name, `solution ${f.id} name`);
  checkAr(f.tagline, `solution ${f.id} tagline`);
  checkAr(f.summary, `solution ${f.id} summary`);
  for (const sub of f.subSolutions) {
    checkAr(sub.name, `solution ${f.id}/${sub.id} name`);
    for (const [i, item] of (sub.items ?? []).entries())
      checkAr(item, `solution ${f.id}/${sub.id} item ${i}`);
  }
}
for (const i of industries) checkAr(i.name, `industry ${i.id}`);
for (const p of projects) {
  checkAr(p.name, `project ${p.id} name`);
  if (p.location) checkAr(p.location, `project ${p.id} location`);
  for (const [i, s] of (p.scope ?? []).entries()) checkAr(s, `project ${p.id} scope ${i}`);
}
for (const g of galleryItems) if (g.published) checkAr(g.alt, `gallery ${g.id} alt`);
for (const n of navigation) checkAr(n.label, `nav ${n.id}`);
for (const c of galleryCategories) checkAr(c.label, `gallery category ${c.id}`);

/* ---- geographic evidence locations (K-13 / D-5 / Amendment 2) ---- */
checkUnique(locations.map((l) => l.id), "locations");
const hqCount = locations.filter((l) => l.kind === "hq").length;
if (hqCount !== 1) errors.push(`locations: expected exactly 1 HQ record, found ${hqCount}`);
for (const l of locations) {
  checkAr(l.name, `location ${l.id} name`);
  if (l.kind !== "hq" && l.projectIds.length === 0)
    errors.push(`location ${l.id}: non-HQ evidence location must reference approved projects`);
  for (const pid of l.projectIds) {
    if (!projectIds.has(pid)) errors.push(`location ${l.id}: unknown projectId "${pid}"`);
  }
  if (!pointInSaudi(l.longitude, l.latitude))
    errors.push(`location ${l.id}: coordinates fall outside the stylized Saudi outline`);
}

/* ---- messages parity ---- */
function flatten(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "object" && v !== null
      ? flatten(v as Record<string, unknown>, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );
}
const en = flatten(JSON.parse(readFileSync(join(root, "src/messages/en.json"), "utf8")));
const ar = flatten(JSON.parse(readFileSync(join(root, "src/messages/ar.json"), "utf8")));
for (const k of en) if (!ar.includes(k)) errors.push(`messages: ar.json missing key "${k}"`);
for (const k of ar) if (!en.includes(k)) errors.push(`messages: en.json missing key "${k}"`);

/* ---- report ---- */
for (const w of warnings) console.warn(`⚠ ${w}`);
if (arGaps.length > 0) {
  const level = release ? "✖" : "⚠";
  console[release ? "error" : "warn"](
    `${level} Arabic completeness: ${arGaps.length} business field(s) still fall back to English (A-002${release ? " — RELEASE-BLOCKING" : ""}):`,
  );
  for (const g of arGaps) console[release ? "error" : "warn"](`  ${level} ${g}`);
}
for (const e of errors) console.error(`✖ ${e}`);

const failed = errors.length > 0 || (release && arGaps.length > 0);
console.log(
  failed
    ? `\nContent validation FAILED (${errors.length} error(s)${release ? `, ${arGaps.length} AR gap(s)` : ""}).`
    : `\nContent validation passed (${warnings.length} warning(s), ${arGaps.length} AR gap(s) pending phase authoring).`,
);
process.exit(failed ? 1 : 0);
