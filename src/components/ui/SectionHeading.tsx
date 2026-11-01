import { LangText } from "@/components/ui/LangText";

/**
 * Foundation section heading: mono chapter index (decorative metadata,
 * legibility contract §4 — never essential info) + real heading.
 */
export function SectionHeading({
  index,
  children,
  as: Tag = "h2",
  center = false,
}: {
  index?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  /** D-092: homepage section headings are centered; every other caller
   *  (the /company overline, etc.) keeps its original alignment. */
  center?: boolean;
}) {
  return (
    <div className={center ? "mb-8 text-center" : "mb-8"}>
      {index ? (
        <p aria-hidden="true" className="microlabel mb-3 text-accent">
          <LangText text={index} />
        </p>
      ) : null}
      <Tag
        className={`section-title font-display text-3xl font-bold tracking-tight text-ink md:text-4xl${center ? " mx-auto" : ""}`}
      >
        {children}
      </Tag>
    </div>
  );
}
