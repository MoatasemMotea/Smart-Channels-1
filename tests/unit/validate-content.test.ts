import { describe, expect, it } from "vitest";
import { stats } from "../../src/content/stats";
import { solutionFamilies } from "../../src/content/solutions";
import { industries } from "../../src/content/industries";
import { projects } from "../../src/content/projects";
import { products } from "../../src/content/products";
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

  it("carries exactly the 22 approved product categories with the owner image mapping (D-052)", () => {
    expect(products.map((p) => p.name.en)).toEqual([
      "Switch", "Access Points", "Router", "Laptop", "Multi Charger", "T60",
      "SFP", "Firewall", "Core Switch", "Monitor", "PC", "UPS", "Printers",
      "NVR", "Hard Disk", "Decoder", "Face Recognition Terminals", "Camera",
      "Tablet", "HDMI Extender", "AC Adapter", "Media Converter",
    ]);
    const withImage = Object.fromEntries(
      products.filter((p) => p.image).map((p) => [p.slug, p.image!.src]),
    );
    expect(withImage).toEqual({
      switch: "/media/products/01-switch.webp",
      "access-points": "/media/products/02-access-points.webp",
      camera: "/media/products/03-camera.webp",
      firewall: "/media/products/firewall-interim.webp",
      laptop: "/media/products/laptop.webp",
      "core-switch": "/media/products/core-switch.webp",
      sfp: "/media/products/sfp.webp",
      tablet: "/media/products/tablet.webp",
      printers: "/media/products/printers.webp",
      "multi-charger": "/media/products/multi-charger-t60.webp",
      t60: "/media/products/multi-charger-t60.webp",
      nvr: "/media/products/nvr.webp",
    });
    // owner decision: ONE combined photograph serves both records —
    // never duplicated, never split into fabricated separate media
    expect(products.find((p) => p.slug === "multi-charger")?.image?.src).toBe(
      products.find((p) => p.slug === "t60")?.image?.src,
    );
    // the ten categories awaiting approved imagery keep the designed
    // media-pending state — no borrowed or invented visuals
    expect(products.filter((p) => !p.image).map((p) => p.slug)).toEqual([
      "router", "monitor", "pc", "ups", "hard-disk", "decoder",
      "face-recognition-terminals", "hdmi-extender", "ac-adapter", "media-converter",
    ]);
    expect(products.filter((p) => p.featured).map((p) => p.slug).sort()).toEqual(
      ["access-points", "camera", "firewall", "switch"],
    );
    // the temporary Firewall visual stays explicitly provisional (PRODUCT-MEDIA-01)
    expect(products.find((p) => p.slug === "firewall")?.image?.provisional).toBe(true);
    // no invented copy: category records carry no unapproved summaries/specs
    for (const p of products) {
      expect(p.summary).toBeUndefined();
      expect(p.importance).toBeUndefined();
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
