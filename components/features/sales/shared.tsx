import { Fragment } from "react";
import { InfoGlyph } from "@/components/features/kit/glyphs";
import { features } from "@/lib/content/features";
import {
  featureDetails,
  type FeatureDetail,
  type FeatureSlug,
} from "@/lib/content/featureDetails";
import { featureBar } from "@/lib/content/featuresPage";

/* ==========================================================================
   02 SALES - WHAT EACH FEATURE SAYS, COMPACTLY
   --------------------------------------------------------------------------
   The parts the chapter's showcase (Showcase.tsx) says every feature with:
   what is inside it and what to know, under the heading it takes from
   featureDetails.ts.

   ONE SECTION FOR THE WHOLE CHAPTER, NOT ONE PER FEATURE. Chapter 01
   gives each feature a section of its own, about three screens long; here
   the four features share one, about a screen, which is what the chapter
   was chosen for. Each feature still carries its slug as an id, so the
   hero's callouts, the chapter card and the feature bar all still land on
   it.

   CHOSEN FROM THREE, and after two rounds. A live desk of four animated
   tiles and the chapter drawn as a pipeline board were built beside the
   showcase and dropped - and before them, two sets of per-feature layouts
   that came out too long and too like Chapter 01.
   ========================================================================== */

export const SALES = features.groups[1];

export type SalesPart = {
  slug: FeatureSlug;
  item: (typeof SALES)["items"][number];
  detail: FeatureDetail;
  n: string;
};

export const SALES_PARTS: SalesPart[] = SALES.items.map((item, i) => ({
  slug: item.slug as FeatureSlug,
  item,
  detail: featureDetails[item.slug as FeatureSlug]!,
  n: `${SALES.n}.${i + 1}`,
}));

/* Where the page's header and bar leave a feature when it is linked to. */
export const LAND = "scroll-mt-[7.25rem] md:scroll-mt-[8.5rem]";

/* WHAT'S INSIDE: each capability group by name, with the capabilities in
   it named after it - every one of them, in a sentence's worth of space. */
export function Inside({
  part,
  dark = false,
  columns = 2,
  className = "",
}: {
  part: SalesPart;
  dark?: boolean;
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      className={`grid gap-x-6 gap-y-3.5 ${columns === 2 ? "sm:grid-cols-2" : ""} ${className}`}
    >
      {part.detail.groups.map((g) => (
        <li key={g.id}>
          <span className="flex items-center gap-2 text-[14px] leading-snug font-extrabold">
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: dark ? "#fff" : SALES.accent }}
            />
            {g.label}
          </span>
          {/* EACH CAPABILITY KEPT WHOLE. A line breaks between two of them
              and never inside one - joined as plain text they split as
              "1- / hour reminder" and "Drag / and drop" - and each dot
              rides on the end of its line rather than starting the next. */}
          <span
            className={`mt-1 block pl-3.5 text-[13.5px] leading-relaxed ${
              dark ? "text-night-muted" : "text-muted"
            }`}
          >
            {g.items.map((c, i) => (
              <Fragment key={c.id}>
                <span className="inline-block max-w-full">
                  {c.name}
                  {i < g.items.length - 1 && " ·"}
                </span>{" "}
              </Fragment>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* GOOD TO KNOW, in a line or two: every limit, never folded away. */
export function Know({
  part,
  dark = false,
  className = "",
}: {
  part: SalesPart;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-label={`${part.item.name}: ${featureBar.goodToKnow.toLowerCase()}`}
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
        {part.detail.limits.join(" ")}
      </p>
    </div>
  );
}
