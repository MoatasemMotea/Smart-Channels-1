import Link from "next/link";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminConfigured, verifySessionToken } from "@/lib/admin/auth";
import { getLeadStore } from "@/lib/leads/store";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/types/lead";

/**
 * LEAD CONSOLE (§§28–31 · D-050) — protected list view.
 *
 * Three explicit states: NOT CONFIGURED (ADMIN_PASSWORD unset — locked
 * with a clear operator message), SIGN IN (real auth, rate-limited),
 * and the console: statistics from real stored data only, filters,
 * CSV export, and per-lead detail links. Nothing is mocked.
 */
export const dynamic = "force-dynamic";

const fmt = (iso: string) => iso.slice(0, 16).replace("T", " ");

function Stats({ leads }: { leads: Lead[] }) {
  const byStatus = LEAD_STATUSES.map((s) => [s, leads.filter((l) => l.status === s).length] as const);
  const bySource = [
    ["contact-form", leads.filter((l) => l.source === "contact-form").length],
    ["digital-employee", leads.filter((l) => l.source === "digital-employee").length],
  ] as const;
  return (
    <div className="admin-stats">
      <div className="admin-stat">
        <p className="admin-stat-value">{leads.length}</p>
        <p className="microlabel">Total leads</p>
      </div>
      {byStatus.map(([s, n]) => (
        <div key={s} className="admin-stat">
          <p className="admin-stat-value">{n}</p>
          <p className="microlabel">{s}</p>
        </div>
      ))}
      {bySource.map(([s, n]) => (
        <div key={s} className="admin-stat">
          <p className="admin-stat-value">{n}</p>
          <p className="microlabel">{s}</p>
        </div>
      ))}
    </div>
  );
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  if (!adminConfigured()) {
    return (
      <section className="admin-card">
        <h1 className="admin-title">Lead console — locked</h1>
        <p className="mt-4 leading-7 text-ink-muted">
          This console is not configured yet. The operator must set the{" "}
          <code>ADMIN_PASSWORD</code> environment variable (and optionally{" "}
          <code>ADMIN_SESSION_SECRET</code>) at deploy time. No default credentials exist.
        </p>
      </section>
    );
  }

  const jar = await cookies();
  const authed = verifySessionToken(jar.get(ADMIN_COOKIE)?.value);

  if (!authed) {
    const error = typeof params.error === "string" ? params.error : null;
    return (
      <section className="admin-card">
        <h1 className="admin-title">Lead console — sign in</h1>
        {error ? (
          <p className="mt-3 text-sm text-accent" role="alert">
            {error === "rate" ? "Too many attempts — try again later." : "Incorrect password."}
          </p>
        ) : null}
        <form method="post" action="/api/admin/login" className="mt-6 flex flex-wrap gap-3">
          <label htmlFor="admin-pass" className="sr-only">
            Password
          </label>
          <input
            id="admin-pass"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="form-input"
          />
          <button type="submit" className="rounded bg-accent px-6 py-3 text-sm font-semibold text-accent-ink">
            Sign in
          </button>
        </form>
      </section>
    );
  }

  const status = typeof params.status === "string" ? params.status : "";
  const source = typeof params.source === "string" ? params.source : "";
  const q = typeof params.q === "string" ? params.q.toLowerCase() : "";

  const all = await getLeadStore().list();
  const leads = all.filter(
    (l) =>
      (!status || l.status === status) &&
      (!source || l.source === source) &&
      (!q ||
        [l.name, l.company ?? "", l.email, l.phone ?? "", l.message]
          .join(" ")
          .toLowerCase()
          .includes(q)),
  );

  return (
    <section>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="admin-title">Lead console</h1>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download, not a page navigation */}
          <a href="/api/admin/leads/export" className="admin-btn">
            Export CSV
          </a>
          <form method="post" action="/api/admin/logout">
            <button type="submit" className="admin-btn">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <Stats leads={all} />

      <form method="get" className="admin-filters">
        <label>
          <span className="microlabel">Status</span>
          <select name="status" defaultValue={status} className="form-input">
            <option value="">All</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="microlabel">Source</span>
          <select name="source" defaultValue={source} className="form-input">
            <option value="">All</option>
            <option value="contact-form">contact-form</option>
            <option value="digital-employee">digital-employee</option>
          </select>
        </label>
        <label className="admin-filter-grow">
          <span className="microlabel">Search</span>
          <input name="q" type="search" defaultValue={q} className="form-input" />
        </label>
        <button type="submit" className="admin-btn self-end">
          Filter
        </button>
      </form>

      {leads.length === 0 ? (
        <p className="mt-10 text-ink-muted">No leads match.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Created</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Service</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.leadId}>
                  <td dir="ltr">{fmt(l.createdAt)}</td>
                  <td>
                    <Link href={`/admin/leads/${l.leadId}`} className="tx-link font-semibold text-accent">
                      {l.name}
                    </Link>
                  </td>
                  <td>{l.company ?? "—"}</td>
                  <td dir="ltr">{l.email}</td>
                  <td>{l.service ?? "—"}</td>
                  <td>{l.source}</td>
                  <td>
                    <span className="admin-status" data-status={l.status}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
