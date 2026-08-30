"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin/auth";
import { getLeadStore } from "@/lib/leads/store";
import { LEAD_STATUSES, type LeadStatus } from "@/types/lead";

/**
 * Admin mutations (§§28–30 · D-050) — server actions, each re-checking
 * the session cookie (§23: status is HUMAN-owned; every change lands in
 * the audit trail with the admin actor).
 */
async function authed(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export async function updateLeadStatus(formData: FormData): Promise<void> {
  if (!(await authed())) return;
  const leadId = String(formData.get("leadId") ?? "");
  const next = String(formData.get("status") ?? "") as LeadStatus;
  if (!leadId || !LEAD_STATUSES.includes(next)) return;

  await getLeadStore().update(leadId, (lead) => {
    if (lead.status === next) return lead;
    const now = new Date().toISOString();
    return {
      ...lead,
      status: next,
      updatedAt: now,
      audit: [
        ...lead.audit,
        { at: now, actor: "admin", action: "status-changed", from: lead.status, to: next },
      ],
    };
  });
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
}

export async function addLeadNote(formData: FormData): Promise<void> {
  if (!(await authed())) return;
  const leadId = String(formData.get("leadId") ?? "");
  const text = String(formData.get("note") ?? "")
    .trim()
    .slice(0, 2000);
  if (!leadId || !text) return;

  await getLeadStore().update(leadId, (lead) => {
    const now = new Date().toISOString();
    return {
      ...lead,
      updatedAt: now,
      notes: [...lead.notes, { at: now, author: "admin", text }],
      audit: [...lead.audit, { at: now, actor: "admin", action: "note-added" }],
    };
  });
  revalidatePath(`/admin/leads/${leadId}`);
}
