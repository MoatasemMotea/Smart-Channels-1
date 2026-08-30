import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin/auth";
import { getLeadStore } from "@/lib/leads/store";

/**
 * CSV export (§31): authenticated only. UTF-8 with BOM so Arabic
 * content opens correctly in Excel; every field quoted/escaped.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLUMNS = [
  "leadId",
  "createdAt",
  "status",
  "source",
  "locale",
  "name",
  "company",
  "phone",
  "email",
  "service",
  "message",
  "conversationSummary",
  "consentTimestamp",
] as const;

function cell(v: unknown): string {
  const s = v == null ? "" : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const leads = await getLeadStore().list();
  const rows = [
    COLUMNS.join(","),
    ...leads.map((l) => COLUMNS.map((c) => cell(l[c])).join(",")),
  ];
  const csv = `${"\uFEFF"}${rows.join("\r\n")}\r\n`;

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="smart-channels-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "cache-control": "no-store",
    },
  });
}
