import type { CatalogProduct } from "@/types/content";

/**
 * PRODUCTS (P5 §4 — D-034).
 *
 * SHIPS EMPTY BY DESIGN: the owner supplies the actual product
 * photographs, names, descriptions and importance/use cases. Nothing is
 * invented, no stock imagery, no fake catalogue entries.
 *
 * HOW TO ADD A PRODUCT LATER (data-only, no component changes):
 *  1. put the owner-approved photograph in /media-source/images/ and run
 *     `npm run media` (or place the optimized file under
 *     /public/media/products/);
 *  2. add one record below with `published: true` (and `featured: true`
 *     to appear on the homepage product stage);
 *  3. build. The homepage stage, /products route and future detail pages
 *     all read from this file through the content accessors.
 *
 * Field mapping to the approved schema: name.ar = nameAr,
 * summary.ar = summaryAr, importance.ar = importanceAr.
 */
export const products: CatalogProduct[] = [];
