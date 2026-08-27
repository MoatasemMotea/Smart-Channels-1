import type { ProfileDocument } from "@/types/content";

/**
 * PUBLIC DOWNLOADABLE DOCUMENTS.
 *
 * D-020 (owner ruling, P4 Revision 2): the Company Profile PDF is SOURCE
 * MATERIAL ONLY. It must never be placed under /public, linked, served or
 * offered for download — the approved information extracted from it lives
 * in the content modules instead. The source PDF is archived privately in
 * media-source/documents/ for provenance.
 *
 * This model stays generic and EMPTY. Publishing any future document here
 * requires explicit owner approval first (no placeholders, no "coming
 * soon"). Content validation rejects Company Profile records and any PDF
 * found under /public.
 */
export const documents: ProfileDocument[] = [];
