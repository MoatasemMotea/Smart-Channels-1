import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * SEC-12 regression (D-088): no image served from public/ carries EXIF,
 * XMP or IPTC metadata (a phone original can hold a GPS position, a
 * camera serial or an author name). The D-088 audit found zero; this
 * keeps it that way for every future file, published record or not.
 *
 * Containers are walked chunk by chunk — scanning raw bytes for "Exif"
 * would match compressed pixel data by chance.
 */
const root = join(import.meta.dirname, "..", "..", "public");

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

function jpegMetadata(b: Buffer): string[] {
  const found: string[] = [];
  let i = 2;
  while (i + 4 <= b.length && b[i] === 0xff) {
    const marker = b[i + 1]!;
    if (marker === 0xda || marker === 0xd9) break; // start of scan / end of image
    const len = b.readUInt16BE(i + 2);
    const body = b.subarray(i + 4, i + 2 + len);
    if (marker === 0xe1 && body.toString("latin1", 0, 6) === "Exif\0\0") found.push("EXIF");
    if (marker === 0xe1 && body.toString("latin1", 0, 28) === "http://ns.adobe.com/xap/1.0/") found.push("XMP");
    if (marker === 0xed && body.toString("latin1", 0, 13) === "Photoshop 3.0") found.push("IPTC");
    i += 2 + len;
  }
  return found;
}

function pngMetadata(b: Buffer): string[] {
  const found: string[] = [];
  let i = 8;
  while (i + 8 <= b.length) {
    const len = b.readUInt32BE(i);
    const type = b.toString("latin1", i + 4, i + 8);
    const keyword = b.toString("latin1", i + 8, i + 8 + Math.min(len, 40)).split("\0")[0]!;
    if (type === "eXIf") found.push("EXIF");
    if (/^[itz]TXt$|^tEXt$/.test(type) && /XML:com\.adobe\.xmp|Raw profile type (exif|iptc|xmp)/i.test(keyword))
      found.push(`${type}:${keyword}`);
    if (type === "IEND") break;
    i += 12 + len;
  }
  return found;
}

function webpMetadata(b: Buffer): string[] {
  const found: string[] = [];
  let i = 12;
  while (i + 8 <= b.length) {
    const id = b.toString("latin1", i, i + 4);
    const len = b.readUInt32LE(i + 4);
    if (id === "EXIF" || id === "XMP ") found.push(id.trim());
    i += 8 + len + (len % 2);
  }
  return found;
}

function imageMetadata(file: string, b: Buffer): string[] {
  const ext = extname(file).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return jpegMetadata(b);
  if (ext === ".png") return pngMetadata(b);
  if (ext === ".webp") return webpMetadata(b);
  return [];
}

describe("public images carry no EXIF / XMP / IPTC (SEC-12 · D-088)", () => {
  const images = walk(root).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

  it("finds the images it audits", () => {
    expect(images.length).toBeGreaterThan(100);
  });

  it("every image is clean", () => {
    const dirty = images
      .map((f) => ({ file: relative(root, f), meta: imageMetadata(f, readFileSync(f)) }))
      .filter((r) => r.meta.length > 0)
      .map((r) => `${r.file}: ${r.meta.join(", ")}`);
    expect(dirty).toEqual([]);
  });

  it("the parsers do detect metadata (self-check)", () => {
    const app1 = Buffer.from("Exif\0\0abcd", "latin1");
    const jpeg = Buffer.concat([
      Buffer.from([0xff, 0xd8, 0xff, 0xe1]),
      Buffer.from([0, app1.length + 2]),
      app1,
      Buffer.from([0xff, 0xda]),
    ]);
    expect(imageMetadata("x.jpg", jpeg)).toEqual(["EXIF"]);

    const xmp = Buffer.from("<x:xmpmeta/>", "latin1");
    const chunk = Buffer.alloc(8);
    chunk.write("XMP ", 0, "latin1");
    chunk.writeUInt32LE(xmp.length, 4);
    const webp = Buffer.concat([Buffer.from("RIFF\0\0\0\0WEBP", "latin1"), chunk, xmp]);
    expect(imageMetadata("x.webp", webp)).toEqual(["XMP"]);
  });
});
