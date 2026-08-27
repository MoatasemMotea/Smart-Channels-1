/**
 * Foundation section heading: mono chapter index (decorative metadata,
 * legibility contract §4 — never essential info) + real heading.
 */
export function SectionHeading({
  index,
  children,
  as: Tag = "h2",
}: {
  index?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className="mb-8">
      {index ? (
        <p aria-hidden="true" className="microlabel mb-3 text-accent">
          {index}
        </p>
      ) : null}
      <Tag className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
        {children}
      </Tag>
    </div>
  );
}
