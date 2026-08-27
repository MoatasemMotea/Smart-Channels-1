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

  it("keeps every project unfeatured until the D-004 assessment", () => {
    for (const p of projects) expect(p.featured).toBe(false);
  });
});

describe("publish filtering (A-004 / Amendment 3)", () => {
  it("exposes no unpublished gallery items", () => {
    expect(getPublishedGalleryItems()).toHaveLength(0); // P3 ships candidates only
    expect(galleryItems.length).toBeGreaterThan(0);
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
