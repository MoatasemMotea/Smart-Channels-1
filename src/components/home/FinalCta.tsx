import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { Link } from "@/i18n/navigation";

/**
 * FINAL CTA — the signal field returns (P5 · Q-P5-8).
 *
 * The closing echo of the opening: distributed signals CONVERGE toward
 * the call to action (the opening dispersed and expanded; the close
 * gathers). Pure CSS choreography on reveal, dark-committed in both
 * themes (D-019), visually strong but simpler than the Hero. Approved
 * contact routes only; the floating WhatsApp action stays independent.
 */
export async function FinalCta({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <MotionSection className="cta-scene" aria-label={t("sections.contact")} data-scene="cta" data-env="dark">
      <div className="relative mx-auto max-w-360 px-6 py-28 text-center lg:px-12">
        <div aria-hidden="true" className="cta-converge">
          <span /><span /><span /><span /><span /><span />
        </div>
        <h2 className="relative font-display text-4xl font-bold md:text-6xl">
          {locale === "ar" ? (
            <>
              لنبنِه <span className="text-accent">معًا.</span>
            </>
          ) : (
            <>
              Let&apos;s build it <span className="text-accent">together.</span>
            </>
          )}
        </h2>
        <p className="relative mt-8">
          <Link
            href="/contact"
            className="inline-block rounded bg-accent px-8 py-4 text-lg font-semibold text-accent-ink"
          >
            {locale === "ar" ? "تواصل معنا" : "Let's Talk"} →
          </Link>
        </p>
      </div>
    </MotionSection>
  );
}
