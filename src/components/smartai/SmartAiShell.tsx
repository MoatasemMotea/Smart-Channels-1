"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { smartAiIntegration } from "@/lib/smart-ai/adapter";
import { Link } from "@/i18n/navigation";

/**
 * SMART AI — integration-ready interaction shell (P11 · D-046 · D-009).
 *
 * The composer is real; the intelligence is NOT. While no provider is
 * configured the shell wears the explicit prototype state: a status
 * chip, an honesty note, and a permanently disabled send action —
 * nothing is transmitted, stored, or answered, and nothing ever
 * pretends to be. The human path stays primary ("Continue with our
 * team"). When a provider is connected later (adapter boundary +
 * owner-approved privacy notice, O-010), this shell is the seam where
 * the live conversation mounts.
 */
export function SmartAiShell() {
  const t = useTranslations("smartai");
  const [draft, setDraft] = useState("");
  const connected = smartAiIntegration !== null;

  return (
    <div className="smartai-shell" data-connected={connected || undefined}>
      <div className="smartai-shell-head">
        <p className="smartai-status microlabel" role="status">
          <span aria-hidden="true" className="smartai-status-dot" />
          {t("status")}
        </p>
      </div>

      <label htmlFor="smartai-draft" className="microlabel mb-3 block text-accent">
        {t("composerLabel")}
      </label>
      <textarea
        id="smartai-draft"
        className="smartai-composer"
        rows={4}
        placeholder={t("placeholder")}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        aria-describedby="smartai-honesty"
      />

      <p id="smartai-honesty" className="smartai-honesty">
        {t("honesty")}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {/* the live action exists only in its future: never clickable,
            never simulated (D-009) */}
        <button type="button" className="smartai-send" disabled aria-disabled="true">
          {t("sendSoon")}
        </button>
        <Link
          href="/contact"
          className="inline-block rounded border border-accent px-6 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
        >
          {t("continue")}&nbsp;&nbsp;<span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
