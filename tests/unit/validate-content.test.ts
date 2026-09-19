import { describe, expect, it } from "vitest";
import { statSync } from "node:fs";
import { join } from "node:path";
import { stats } from "../../src/content/stats";
import { solutionFamilies } from "../../src/content/solutions";
import { industries } from "../../src/content/industries";
import { projects } from "../../src/content/projects";
import { products } from "../../src/content/products";
import { productCards, productCategories } from "../../src/content/product-catalog";
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

  it("carries the D-059 categorised catalogue: nine categories, thirty-three cards — one per type (D-068)", () => {
    expect(productCategories.map((c) => c.slug)).toEqual([
      "networking", "fiber", "cybersecurity", "surveillance", "av",
      "computing", "storage", "communication", "environmental",
    ]);
    expect(productCategories.map((c) => c.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(productCards).toHaveLength(33);
    // cards per category = types per category, as the owner listed them
    const per = Object.fromEntries(productCategories.map((c) => [c.slug, productCards.filter((k) => k.category === c.slug).length]));
    expect(per).toEqual({ networking: 8, fiber: 3, cybersecurity: 1, surveillance: 4, av: 3, computing: 6, storage: 4, communication: 2, environmental: 2 });
    // D-068: a card IS a type — no (category + type) repeats
    expect(new Set(productCards.map((k) => `${k.category}|${k.typeEn}`)).size).toBe(33);
    // …and its brands are real names, sorted with localeCompare; [] means no brand line
    for (const k of productCards) {
      expect(k.brands.every((b) => b.trim().length > 0), `${k.typeEn}: no empty brand`).toBe(true);
      expect(k.brands, `${k.typeEn}: alphabetical`).toEqual([...k.brands].sort((a, b) => a.localeCompare(b, "en")));
    }
    expect(productCards.find((k) => k.typeEn === "Switches")?.brands).toEqual(["Aruba", "Cisco", "Hikvision", "Linksys", "Ruijie"]);
    expect(productCards.filter((k) => k.brands.length === 0).map((k) => k.typeEn)).toEqual([
      "PoE Switches", "Network Racks", "HDMI over Fiber Extenders", "HDMI Extenders", "Rack Servers", "Storage Arrays", "Weather Stations",
    ]);
    // no model number ever leaks into a name or brand
    for (const k of productCards) expect(`${k.typeEn} ${k.typeAr} ${k.brands.join(" ")}`).not.toMatch(/DS-K1T673DX/);
  });

  it("carries exactly the 24 approved product categories with the owner image mapping (D-058)", () => {
    expect(products.map((p) => p.name.en)).toEqual([
      "Switch", "Access Points", "Router", "Laptop", "Multi Charger", "T60",
      "SFP", "Firewall", "Core Switch", "Monitor", "PC", "UPS", "Printers",
      "NVR", "Hard Disk", "Decoder", "Face Recognition Terminals", "Cameras",
      "Tablet", "HDMI Extender", "AC Adapter", "Media Converter",
      // D-058 intake: two categories new to the catalogue, named by file
      "Access Control", "P2P",
    ]);
    const withImage = Object.fromEntries(
      products.filter((p) => p.image).map((p) => [p.slug, p.image!.src]),
    );
    // D-058: every owner photograph lives on a NEW -2026 path (D-053),
    // sfp keeps its D-052 asset (no intake file for it)
    expect(withImage).toEqual({
      switch: "/media/products/switch-2026.webp",
      "access-points": "/media/products/access-points-2026.webp",
      router: "/media/products/router-2026.webp",
      laptop: "/media/products/laptop-2026.webp",
      "multi-charger": "/media/products/multi-charger-2026.webp",
      t60: "/media/products/t60-2026.webp",
      sfp: "/media/products/sfp.webp",
      firewall: "/media/products/firewall-2026.webp",
      "core-switch": "/media/products/core-switch-2026.webp",
      pc: "/media/products/pc-2026.webp",
      ups: "/media/products/ups-2026.webp",
      printers: "/media/products/printers-2026.webp",
      nvr: "/media/products/nvr-2026.webp",
      camera: "/media/products/cameras-2026.webp",
      tablet: "/media/products/tablet-2026.webp",
      "hdmi-extender": "/media/products/hdmi-extender-2026.webp",
      "media-converter": "/media/products/media-converter-2026.webp",
      "access-control": "/media/products/access-control-2026.webp",
      p2p: "/media/products/p2p-2026.webp",
    });
    // D-058: Multi Charger and T60 each carry their OWN photograph now —
    // the earlier shared file is superseded, not duplicated
    expect(products.find((p) => p.slug === "multi-charger")?.image?.src).not.toBe(
      products.find((p) => p.slug === "t60")?.image?.src,
    );
    // the five categories still awaiting approved imagery keep the
    // designed media-pending state — no borrowed or invented visuals
    expect(products.filter((p) => !p.image).map((p) => p.slug)).toEqual([
      "monitor", "hard-disk", "decoder", "face-recognition-terminals", "ac-adapter",
    ]);
    expect(products.filter((p) => p.featured).map((p) => p.slug).sort()).toEqual(
      ["camera", "core-switch", "firewall", "laptop"],
    );
    // D-058 §4: the featured four in the owner's exact order
    expect(
      products
        .filter((p) => p.featured)
        .sort((x, y) => (x.featuredOrder ?? 99) - (y.featuredOrder ?? 99))
        .map((p) => p.slug),
    ).toEqual(["firewall", "core-switch", "laptop", "camera"]);
    // PRODUCT-MEDIA-01 is closed: the Firewall now carries the owner's own
    // appliance photograph, so nothing is provisional any more
    expect(products.find((p) => p.slug === "firewall")?.image?.provisional).toBeFalsy();
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

  it("keeps the D-065 gallery video discipline: explicit posters, ≤ 8 MB when published, ≤ 5 published videos", () => {
    const videos = galleryItems.filter((g) => g.type === "video");
    for (const v of videos) expect(v.poster, `${v.id} names its poster`).toMatch(/^\/media\/posters\/.+\.jpg$/);
    const published = videos.filter((v) => v.published);
    expect(published.length).toBeLessThanOrEqual(5);
    for (const v of published) {
      const bytes = statSync(join(process.cwd(), "public", v.src)).size;
      expect(bytes, `${v.id} is ${(bytes / 1048576).toFixed(2)} MB`).toBeLessThanOrEqual(8 * 1024 * 1024);
    }
    // the 14 MB build video is held until its re-encoded file lands (D065-VIDEO-REENCODE)
    expect(galleryItems.find((g) => g.id === "video-event-network-build-2025")?.published).toBe(false);
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
