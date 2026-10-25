import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin/auth";
import { getLeadStore } from "@/lib/leads/store";
import { csvCell } from "@/lib/leads/csv";
import { sameOriginRequest } from "@/lib/http/request-guard";

/**
 * CSV export (§31): authenticated only, same-site requests only. UTF-8
 * with BOM so Arabic content opens correctly in Excel; every field
 * quoted/escaped, and (D-088 · SEC-4) any value a spreadsheet would read
 * as a formula is neutralized.
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

export async function GET(req: Request) {
  if (!sameOriginRequest(req)) {
    return NextResponse.json({ ok: false, error: "forbidden-origin" }, { status: 403 });
  }
  const jar = await cookies();
  if (!(await verifySessionToken(jar.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const leads = await getLeadStore().list();
  const rows = [
    COLUMNS.join(","),
    ...leads.map((l) => COLUMNS.map((c) => csvCell(l[c])).join(",")),
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
