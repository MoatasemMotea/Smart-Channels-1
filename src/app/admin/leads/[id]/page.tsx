import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminConfigured, verifySessionToken } from "@/lib/admin/auth";
import { getLeadStore } from "@/lib/leads/store";
import { LEAD_STATUSES } from "@/types/lead";
import { addLeadNote, updateLeadStatus } from "../actions";

/**
 * LEAD DETAIL (§§29–30 · D-050): full record, Digital Employee
 * transcript, deterministic summary, human status workflow (audited),
 * and internal notes. Auth re-checked on every request.
 */
export const dynamic = "force-dynamic";

const fmt = (iso: string) => iso.slice(0, 19).replace("T", " ");

export default async function AdminLeadDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!adminConfigured()) notFound();
  const jar = await cookies();
  if (!verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) notFound();

  const lead = await getLeadStore().get(id);
  if (!lead) notFound();

  const rtl = lead.locale === "ar";

  return (
    <section>
      <p>
        <Link href="/admin/leads" className="tx-link text-sm font-semibold text-accent">
          ← All leads
        </Link>
      </p>
      <header className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="admin-title">{lead.name}</h1>
        <span className="admin-status" data-status={lead.status}>
          {lead.status}
        </span>
      </header>

      <div className="admin-detail-grid">
        <div className="admin-card">
          <h2 className="microlabel">Lead</h2>
          <dl className="admin-dl">
            <dt>Reference</dt>
            <dd dir="ltr">{lead.leadId}</dd>
            <dt>Created</dt>
            <dd dir="ltr">{fmt(lead.createdAt)}</dd>
            <dt>Source</dt>
            <dd>{lead.source}</dd>
            <dt>Locale</dt>
            <dd>{lead.locale}</dd>
            <dt>Company</dt>
            <dd dir={rtl ? "rtl" : "ltr"}>{lead.company ?? "—"}</dd>
            <dt>Phone</dt>
            <dd dir="ltr">{lead.phone ?? "—"}</dd>
            <dt>Email</dt>
            <dd dir="ltr">{lead.email}</dd>
            <dt>Service</dt>
            <dd dir={rtl ? "rtl" : "ltr"}>{lead.service ?? "—"}</dd>
            <dt>Consent</dt>
            <dd dir="ltr">{fmt(lead.consentTimestamp)}</dd>
          </dl>
          <h2 className="microlabel mt-6">Message</h2>
          <p className="admin-message" dir={rtl ? "rtl" : "ltr"}>
            {lead.message}
          </p>
          {lead.conversationSummary ? (
            <>
              <h2 className="microlabel mt-6">Summary</h2>
              <p className="admin-message" dir={rtl ? "rtl" : "ltr"}>
                {lead.conversationSummary}
              </p>
            </>
          ) : null}
        </div>

        <div className="admin-card">
          <h2 className="microlabel">Status (human-owned — §23)</h2>
          <form action={updateLeadStatus} className="mt-3 flex flex-wrap gap-3">
            <input type="hidden" name="leadId" value={lead.leadId} />
            <select name="status" defaultValue={lead.status} className="form-input">
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button type="submit" className="admin-btn">
              Update
            </button>
          </form>

          <h2 className="microlabel mt-8">Notes</h2>
          {lead.notes.length === 0 ? (
            <p className="mt-2 text-sm text-ink-muted">No notes yet.</p>
          ) : (
            <ul className="admin-notes">
              {lead.notes.map((n, i) => (
                <li key={i}>
                  <p className="microlabel" dir="ltr">
                    {fmt(n.at)} · {n.author}
                  </p>
                  <p>{n.text}</p>
                </li>
              ))}
            </ul>
          )}
          <form action={addLeadNote} className="mt-4">
            <input type="hidden" name="leadId" value={lead.leadId} />
            <label htmlFor="admin-note" className="sr-only">
              Add note
            </label>
            <textarea id="admin-note" name="note" rows={3} className="form-input w-full" />
            <button type="submit" className="admin-btn mt-3">
              Add note
            </button>
          </form>

          <h2 className="microlabel mt-8">Audit trail</h2>
          <ul className="admin-audit">
            {lead.audit.map((a, i) => (
              <li key={i} dir="ltr">
                {fmt(a.at)} · {a.actor} · {a.action}
                {a.from ? ` (${a.from} → ${a.to})` : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lead.conversation && lead.conversation.length > 0 ? (
        <div className="admin-card mt-6">
          <h2 className="microlabel">Digital Employee conversation</h2>
          <div className="admin-transcript" dir={rtl ? "rtl" : "ltr"}>
            {lead.conversation.map((m, i) => (
              <p key={i} className="de-msg" data-role={m.role}>
                {m.content}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
