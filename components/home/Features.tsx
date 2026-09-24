"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowIcon } from "@/components/ui/icons";
import {
  ChevronMark,
  featureMarks,
  groupMarks,
} from "@/components/ui/featureIcons";
import { LanguageDemo } from "@/components/home/product/LanguageDemo";
import { features } from "@/lib/content/features";

/* ==========================================================================
   SECTION 5 - THE FEATURES
   --------------------------------------------------------------------------
   Thirteen features in four groups, plus the one demonstration this page
   still owed a visitor.

   LESS MOTION, NOT NONE, and the difference matters. This ran a nested
   cascade at first - four columns one after another, each heading and each
   card following inside it - which was a lot of movement to deliver a grid
   of names. Stripping it out entirely went too far the other way: a section
   that simply appears reads as a static image on a page where everything
   else has some life in it.

   So exactly two things move on arrival now: the language panel, and the
   four panels on a 70ms stagger. Nothing inside a panel animates
   separately. The hovers are CSS transitions, which cost nothing and are
   feedback rather than decoration.

   FOUR LIGHT PANELS ON A DARK SECTION. Not thirteen white cards, which was
   tried and was too much glare - one lit object per group, with its
   features as rows inside it. The section stays dark and the four panels
   are the only thing lit on it.

   NO GROUP DESCRIPTION. Each panel carried a sentence under its name
   saying what the group covered. It was the first thing a reader met in
   every panel and it delayed the features by three lines each - and the
   thirteen names plus their own short lines say it better. The panel opens
   on its mark and its name and goes straight to the list.

   THE ROWS ARE TINTED, THE MARK TILES ARE WHITE. A white row on a white
   panel is only a border; tinting the row in its group's colour makes it
   an object, and flipping the mark tile to white inside it gives the mark
   something to sit on. Every group's colour then appears three times in
   its panel - numeral, rule, rows - instead of only in the chip.

   THE CARDS CARRY THREE TO FIVE WORDS. Not the sentence they had before -
   that made the section run on - and not nothing, which made it bare.

   THE GRID IS WIDER THAN THE REST OF THE PAGE, at 86rem against the 72rem
   the hero image and the funnel use. Four panels at 72rem come out around
   273px each, which leaves about 160px for a feature name after the
   padding, the mark and the chevron - and "Chat Commerce in India" needs
   three lines in 160px.

   IT SITS ON THE NIGHT GROUND, THE SAME ONE SECTION 2 USES, deliberately.
   The page runs sky, night, white, white, night - the two dark sections
   bookend the three that explain the product.

   THE COUNT IN THE HEADING IS LOAD-BEARING. If a feature is added to the
   requirements, it is added to features.ts AND the heading changes. A page
   that says thirteen and lists fourteen has told its first lie.
   ========================================================================== */

export function Features() {
  const reduced = useReducedMotion();
  const still = reduced === true;

  /* One entrance, used twice. Short and shallow on purpose - 18px and just
     over half a second, which registers as the panel arriving rather than
     as an effect being played at you. */
  const enter = (i = 0) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: {
            duration: 0.55,
            delay: i * 0.07,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section id="features" className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-night px-4 pt-24 pb-20 md:rounded-[2rem] md:px-10 md:pt-32 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-[14%] left-1/2 h-[46rem] w-[74rem] -translate-x-1/2 rounded-full bg-brand/22 blur-[150px]" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-black/35" />
        </div>

        {/* ---- THE HEADING ---- */}
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-white/80 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-brand-bright" />
            {features.eyebrow}
          </p>

          <h2
            className="h2-section mx-auto mt-6 max-w-[20ch] font-extrabold text-white"
            style={{ "--h2": "4em" } as React.CSSProperties}
          >
            {features.heading}
          </h2>

          <p className="lead-section mx-auto mt-7 max-w-[62ch] text-night-muted">
            {features.lead}
          </p>
        </div>

        {/* ---- THE ONE THING SHOWN RATHER THAN LISTED ---- */}
        <motion.div
          {...enter()}
          className="relative mx-auto mt-12 max-w-[86rem] md:mt-14"
        >
          <LanguageDemo />
        </motion.div>

        {/* ---- THE THIRTEEN ----
            Four light panels, one per group: a numeral and a rule, the
            group's own mark, its name, its features as rows, and a line at
            the foot.

            THE COLUMNS END RAGGED and that is correct - Conversations has
            two features and Sales has four. The foot line is pushed down
            with mt-auto so all four panels still end level, which is what
            makes the raggedness look intended rather than unfinished. */}
        <div className="relative mx-auto mt-12 grid max-w-[86rem] gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {features.groups.map((group, g) => {
            const GroupMark = groupMarks[group.mark];
            return (
              <motion.div
                key={group.name}
                {...enter(g)}
                className="relative flex flex-col overflow-hidden rounded-[1.4rem] bg-surface p-5 shadow-[0_30px_70px_-42px_rgba(0,0,0,0.95)] ring-1 ring-black/5"
              >
                {/* The wash at the foot of the panel, in the group's own
                    colour. Bright rather than deep: a deep colour at 13%
                    turns muddy, a bright one stays a tint. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${group.accent}22)`,
                  }}
                />

                <div className="relative flex flex-1 flex-col">
                  {/* Numeral and rule. */}
                  <div className="flex items-center gap-3">
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-lg text-[14px] font-extrabold text-white"
                      style={{ backgroundColor: group.deep }}
                    >
                      {group.n}
                    </span>
                    <span
                      aria-hidden
                      className="h-px flex-1 rounded-full"
                      style={{ backgroundColor: group.accent }}
                    />
                  </div>

                  {/* The group's mark, then its name. */}
                  <span
                    className="mt-6 grid size-14 place-items-center rounded-2xl ring-1 ring-inset"
                    style={{
                      backgroundColor: `${group.accent}2e`,
                      color: group.deep,
                      // @ts-expect-error -- Tailwind reads the ring colour off this
                      "--tw-ring-color": `${group.deep}26`,
                    }}
                  >
                    <GroupMark className="size-7" />
                  </span>

                  <h3 className="mt-5 text-[1.6rem] leading-tight font-extrabold">
                    {group.name}
                  </h3>

                  {/* ---- THE FEATURES ---- */}
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {group.items.map((item) => {
                      const Mark = featureMarks[item.mark];
                      return (
                        <li
                          key={item.name}
                          style={
                            {
                              "--acc": group.deep,
                              backgroundColor: `${group.accent}17`,
                              borderColor: `${group.accent}3d`,
                            } as React.CSSProperties
                          }
                          className="group/f flex items-center gap-3 rounded-xl border py-3 pr-2.5 pl-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--acc)] hover:shadow-[0_14px_28px_-16px_var(--acc)]"
                        >
                          <span
                            className="grid size-11 shrink-0 place-items-center rounded-lg bg-surface shadow-[0_2px_6px_rgba(10,16,32,0.1)]"
                            style={{ color: group.deep }}
                          >
                            <Mark className="size-[22px]" />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block text-[15.5px] leading-snug font-extrabold">
                              {item.name}
                            </span>
                            <span className="mt-0.5 block text-[13.5px] leading-snug text-muted">
                              {item.short}
                            </span>
                          </span>

                          <ChevronMark
                            className="size-3.5 shrink-0 transition-transform duration-300 group-hover/f:translate-x-0.5"
                            style={{ color: group.deep, opacity: 0.5 }}
                          />
                        </li>
                      );
                    })}
                  </ul>

                  {/* The foot. mt-auto is what keeps four panels of two,
                      four, three and four features ending on the same
                      line. */}
                  <div className="mt-auto pt-10">
                    <p
                      className="text-[16px] leading-snug font-bold whitespace-pre-line"
                      style={{ color: group.deep }}
                    >
                      {group.tagline}
                    </p>
                    <span
                      aria-hidden
                      className="mt-3 block h-[3px] w-9 rounded-full"
                      style={{ backgroundColor: group.deep }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ---- THE RAIL ----
            Two labels, two rules and the way out, on one line. */}
        <div className="relative mx-auto mt-12 flex max-w-[86rem] flex-col items-center gap-6 md:mt-14 md:flex-row md:gap-5">
          <span className="hidden text-[12.5px] font-bold tracking-[0.18em] whitespace-nowrap text-night-muted/75 uppercase md:block">
            {features.railLeft}
          </span>
          <span aria-hidden className="hidden h-px flex-1 bg-night-line/30 md:block" />

          <Link
            href={features.moreHref}
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-surface px-7 py-4 text-[16px] font-bold text-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-colors hover:bg-brand-tint md:text-[17px]"
          >
            {features.moreLabel}
            <ArrowIcon className="size-4 text-brand transition-transform group-hover:translate-x-0.5" />
          </Link>

          <span aria-hidden className="hidden h-px flex-1 bg-night-line/30 md:block" />
          <span className="hidden text-[12.5px] font-bold tracking-[0.18em] whitespace-nowrap text-night-muted/75 uppercase md:block">
            {features.railRight}
          </span>
        </div>
      </div>
    </section>
  );
}
