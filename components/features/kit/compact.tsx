import { Fragment, useEffect, useState } from "react";
import { InfoGlyph } from "@/components/features/kit/glyphs";
import { featureBar } from "@/lib/content/featuresPage";

/* ==========================================================================
   THE PARTS EVERY COMPACT CHAPTER SAYS ITS FEATURES WITH
   --------------------------------------------------------------------------
   From Chapter 03 on, a chapter is one section with its own picture, and
   these are the pieces its words are made of: where a linked feature
   lands, a live picture's clock, a group's capabilities by name, and the
   limits. Chapter 02's showcase keeps its own (sales/shared.tsx) - it came
   first and is finished.
   ========================================================================== */

/* Where the page's header and bar leave a feature when it is linked to -
   the same as every feature on the page. */
export const LAND = "scroll-mt-[7.25rem] md:scroll-mt-[8.5rem]";

/* A count that climbs while `live`, one step every `ms`, from nought each
   time it comes alive - what every live picture runs on. */
export function useTick(live: boolean, ms: number) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!live) return;
    setT(0);
    const id = window.setInterval(() => setT((k) => k + 1), ms);
    return () => window.clearInterval(id);
  }, [live, ms]);
  return t;
}

/* A group's capabilities by name, each kept whole: a line breaks between
   two of them and never inside one, and the dot rides on the end of its
   line rather than starting the next - held to the last word by a
   no-break space, or a name that filled its line left the dot alone on
   the next ("Overdue, due today, done and new this week" / "·"). */
export function Names({ names }: { names: readonly string[] }) {
  return (
    <>
      {names.map((name, i) => (
        <Fragment key={name}>
          <span className="inline-block max-w-full">
            {name}
            {i < names.length - 1 && " ·"}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

/* GOOD TO KNOW, in a line or two: every limit, never folded away - and
   nothing at all for a feature the requirements give no limit. */
export function Limits({
  name,
  limits,
  dark = false,
  className = "",
}: {
  name: string;
  limits: readonly string[];
  dark?: boolean;
  className?: string;
}) {
  if (limits.length === 0) return null;
  return (
    <div
      aria-label={`${name}: ${featureBar.goodToKnow.toLowerCase()}`}
      role="note"
      className={`flex gap-2.5 text-[13px] leading-relaxed ${
        dark ? "text-white/70" : "text-ink/65"
      } ${className}`}
    >
      <InfoGlyph className="mt-[3px] size-4 shrink-0" />
      <p>
        <span className={`font-bold ${dark ? "text-white/85" : "text-ink/80"}`}>
          {featureBar.goodToKnow}:{" "}
        </span>
        {limits.join(" ")}
      </p>
    </div>
  );
}
