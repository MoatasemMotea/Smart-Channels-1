import { getTranslations } from "next-intl/server";
import { MotionSection } from "@/components/motion/MotionSection";
import { Link } from "@/i18n/navigation";

/**
 * SMART AI — cinematic teaser (P5 · Q-P5-6a · D-009).
 *
 * A dark scene stating the idea — project needs converge into an AI
 * consultation concept — with an honest "upcoming experience" framing and
 * a clear CTA. NO fake chat, NO simulated streaming, NO implication of a
 * live AI backend. The convergence is pure CSS choreography on reveal;
 * STATIC renders the settled composition.
 */
export async function SmartAiTeaser() {
  const t = await getTranslations();

  return (
    <MotionSection
      className="smartai-scene border-b border-line"
      aria-label={t("sections.smartAi")}
      data-scene="smart-ai"
      data-env="dark"
      id="smart-ai"
    >
      <div className="relative mx-auto max-w-360 px-6 py-24 text-center lg:px-12">
        <div aria-hidden="true" className="smartai-converge">
          <span /><span /><span /><span />
        </div>
        <p className="microlabel text-accent">{t("sections.smartAi")}</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold md:text-5xl">
          {t("home.smartAi.title")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-muted">
          {t("home.smartAi.body")}
        </p>
        <p className="mt-8">
          {/* the dedicated /smart-ai experience arrives at P11 — until then
              the honest action is a human conversation (no dead routes) */}
          <Link
            href="/contact"
            className="inline-block rounded border border-accent px-6 py-3.5 font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
          >
            {t("home.smartAi.cta")} →
          </Link>
        </p>
      </div>
    </MotionSection>
  );
}
