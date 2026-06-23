/**
 * SectionTitle
 * -------------
 * Reused on every home-page section so heading font/size/color stays
 * consistent everywhere (this satisfies the "consistent heading style"
 * UI requirement). The eyebrow row mimics a blueprint dimension line —
 * tick marks on both sides of a small mono label.
 *
 * Usage:
 * <SectionTitle
 *   eyebrow="06 LISTINGS SHOWN"
 *   title="Featured places to stay"
 *   description="A short supporting line about this section."
 *   light // pass this prop when the section background is dark (blueprint.ink)
 * />
 */
export default function SectionTitle({ eyebrow, title, description, light = false, align = "left" }) {
  const base = light ? "text-blueprint-paper" : "text-blueprint-charcoal";
  const sub = light ? "text-blueprint-line" : "text-blueprint-slate";

  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}>
          <span className={`h-px w-6 ${light ? "bg-blueprint-line/60" : "bg-blueprint-slate/40"}`} />
          <span className={`font-mono text-xs tracking-[0.2em] uppercase ${sub}`}>
            {eyebrow}
          </span>
          <span className={`h-px w-6 ${light ? "bg-blueprint-line/60" : "bg-blueprint-slate/40"}`} />
        </div>
      )}
      <h2 className={`font-display text-3xl md:text-4xl font-medium leading-tight ${base}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-base leading-relaxed ${sub}`}>{description}</p>
      )}
    </div>
  );
}