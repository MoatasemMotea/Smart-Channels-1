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

  it("features exactly the owner's D-044 selection (D-004 resolved 2026-08-30)", () => {
    const featured = projects.filter((p) => p.featured).map((p) => p.id).sort();
    expect(featured).toEqual([
      "al-awal-park-king-fahd",
      "f1-saudi-arabian-gp",
      "king-abdullah-sports-city",
      "prince-abdullah-al-faisal",
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
