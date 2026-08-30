import { describe, expect, it } from "vitest";
import { stats } from "../../src/content/stats";
import { solutionFamilies } from "../../src/content/solutions";
import { industries } from "../../src/content/industries";
import { projects } from "../../src/content/projects";
import { galleryItems } from "../../src/content/gallery";
import {
  getFeaturedIndustries,
  getPublicProjects,
  getPublishedGalleryItems,
  localize,
} from "../../src/lib/content";

describe("approved business data invariants", () => {
  it("carries exactly the four approved Track Record figures (D-002)", () => {
    expect(stats.map((s) => `${s.value}${s.suffix ?? ""}`)).toEqual(["200+", "7", "16+", "100+"]);
    for (const s of stats) expect(s.asOf).toBe(2026); // A-001
  });

  it("has the seven canonical solution families in order (Q2)", () => {
    expect(solutionFamilies.map((f) => f.slug)).toEqual([
      "infrastructure-data-centre",
      "networking-connectivity",
      "security-solutions",
      "biometrics-access-control",
      "audio-visual-solutions",
      "unified-communications-smart-buildings",
      "video-surveillance-ai",
    ]);
  });

  it("models all 16 approved sectors (Q3)", () => {
    expect(industries).toHaveLength(16);
    expect(getFeaturedIndustries().length).toBeGreaterThanOrEqual(6);
  });

  it("carries the exact owner Solutions media mapping (D-050 MAPPING.md)", () => {
    const mapping = Object.fromEntries(
      solutionFamilies.map((f) => [f.slug, f.media?.video]),
    );
    expect(mapping).toEqual({
      "infrastructure-data-centre": "/media/solutions/01-infrastructure-data-centre-web.mp4",
      "networking-connectivity": "/media/solutions/02-networking-connectivity-web.mp4",
      "security-solutions": "/media/solutions/03-security-technology-solutions-web.mp4",
      "biometrics-access-control": "/media/solutions/04-biometrics-access-control-web.mp4",
      "audio-visual-solutions": "/media/solutions/05-audio-visual-solutions-web.mp4",
      "unified-communications-smart-buildings":
        "/media/solutions/06-unified-communications-smart-buildings-web.mp4",
      "video-surveillance-ai": "/media/solutions/07-video-surveillance-ai-solutions-web.mp4",
    });
    for (const f of solutionFamilies) {
      expect(f.media?.published).toBe(true);
      expect(f.media?.poster).toMatch(/^\/media\/solutions\/posters\//);
      // portrait sources stay portrait — never forced to 16:9 (§10)
      expect(f.media!.orientation === "portrait").toBe(f.media!.height > f.media!.width);
    }
  });

  it("features exactly the owner's D-050 §12 Selected Projects (supersedes D-044)", () => {
    const featured = projects.filter((p) => p.featured).map((p) => p.id).sort();
    expect(featured).toEqual([
      "diriyah-season",
      "grand-mosque-makkah",
      "neom-sports-village",
      "red-sea-film-festival",
    ]);
  });
});

describe("publish filtering (A-004 / Amendment 3)", () => {
  it("exposes only published gallery items (P5 starter set approved, Q-P5-5)", () => {
    const published = getPublishedGalleryItems();
    expect(published.length).toBeGreaterThan(0);
    for (const g of published) expect(g.published).toBe(true);
    // nothing unpublished may ever leak through the accessor
    const publicIds = new Set(published.map((g) => g.id));
    for (const g of galleryItems) if (!g.published) expect(publicIds.has(g.id)).toBe(false);
  });

  it("filters hidden projects out of public access", () => {
    for (const p of getPublicProjects()) expect(p.display).not.toBe("hidden");
  });
});

describe("localize (A-002 / Q5)", () => {
  it("returns Arabic when present and falls back to English otherwise", () => {
    expect(localize({ en: "Hello", ar: "مرحبا" }, "ar")).toBe("مرحبا");
    expect(localize({ en: "Cisco", arPolicy: "latin" }, "ar")).toBe("Cisco");
    expect(localize({ en: "Hello" }, "en")).toBe("Hello");
  });
});
