"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowIcon } from "@/components/ui/icons";
import { journeyFrags } from "@/components/home/product/JourneyFrags";
import { journey } from "@/lib/content/journey";

/* ==========================================================================
   HOW IT WORKS - BUILT, UNRENDERED, WAITING FOR /how-it-works
   --------------------------------------------------------------------------
   This was section 4 of the home page until the sales pipeline took that
   slot. Nothing is wrong with it - the home page simply needed that space
   for the pipeline, and a thirteen-step journey was always a better fit for
   its own route than for a home page. Imported by nothing today, so it costs
   no bundle. Do not tidy it away.
   --------------------------------------------------------------------------
   --------------------------------------------------------------------------
   Section 3 said what iSuite AI is. This says what it DOES, in order, and it
   is the section a sceptical owner reads before deciding the rest is
   marketing. So it is built out of the product rather than out of adjectives:
   every step carries a small piece of real interface beside it.

   IT IS NOT PINNED, AND THAT IS THE WHOLE POINT OF ITS DESIGN. The plan for
   this section was another sticky scroll - the product pinned while six
   steps advanced beside it. Built that way it would have been section 3
   twice in a row: same mechanic, same shape, a viewport that stops moving
   for the second time in thirty seconds. A page needs different gears, not
   one gear used harder.

   So section 3 PINS and this one FLOWS. Here the page keeps moving and a
   line draws down it, which is a different feeling entirely - and it is the
   right feeling for a journey, because a journey is the one thing that
   should not hold still.

   SCRUBBED, NOT STAGED. Section 3 sets discrete stages off scroll because
   its beats have to play at their own speed. This line is bound frame by
   frame to scroll position, so it is exactly as far along as the reader is.
   Nothing here needs to hold, so nothing here is staged.

   SIX, NOT THIRTEEN. Requirements SS19 lists thirteen steps and the link at
   the foot goes to all of them. The folding is documented in
   lib/content/journey.ts so nobody has to guess which of the thirteen went
   where.
   ========================================================================== */

export function HowItWorks() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const still = reduced === true;

  /* Starts drawing as the first step comes up the screen and finishes as the
     last one settles, rather than running start-to-end of the viewport - a
     line that is only half drawn when the last step is read looks broken. */
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 78%", "end 62%"],
  });

  const headTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headFade = useTransform(scrollYProgress, [0, 0.04, 0.94, 1], [0, 1, 1, 0]);

  return (
    <section id="how-it-works" className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-surface px-4 pt-24 pb-20 md:rounded-[2rem] md:px-10 md:pt-32 md:pb-28">
        {/* ---- THE GROUND ----
            Section 3 is white and ends on a wash back to the page grey, so
            this one opens on a pale blue and lets the colour drain out of it
            as the journey runs down. Two sections of plain white stacked
            would read as one very long section with a line through it. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-brand-tint to-transparent" />
          <div className="absolute top-1/2 left-1/2 h-[58rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-[150px]" />
        </div>

        {/* ---- THE HEADING ---- */}
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-ink/70">
            <span className="size-1.5 rounded-full bg-brand" />
            {journey.eyebrow}
          </p>

          <h2 className="h2-section mx-auto mt-6 max-w-[22ch] font-extrabold">
            {journey.heading}
          </h2>

          <p className="lead-section mx-auto mt-7 max-w-[60ch] text-muted">
            {journey.lead}
          </p>
        </div>

        {/* ---- THE RAIL ---- */}
        <div
          ref={railRef}
          className="relative mx-auto mt-20 max-w-6xl md:mt-28"
        >
          {/* The track. A grey hairline the whole way down so the shape of
              the journey is visible before any of it is drawn, with the
              brand line growing over it. A track that only appears as it
              fills gives the reader no sense of how far they have to go. */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-2 bottom-2 left-5 w-px -translate-x-1/2 bg-line lg:left-1/2"
          >
            <motion.div
              style={still ? undefined : { scaleY: scrollYProgress }}
              className="h-full w-px origin-top bg-gradient-to-b from-brand via-brand to-brand/40"
            />

            {/* The head of the line. It is the enquiry, travelling - the one
                mark on the page that is exactly where the reader is. */}
            {!still && (
              <motion.span
                style={{ top: headTop, opacity: headFade }}
                className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_0_6px_rgba(10,91,245,0.14),0_0_22px_4px_rgba(10,91,245,0.35)]"
              />
            )}
          </div>

          <ol className="relative space-y-16 md:space-y-24 lg:space-y-32">
            {journey.steps.map((step, i) => {
              const Frag = journeyFrags[step.frag];
              /* Odd rows put the picture on the left and the words on the
                 right. Six rows with the same layout is a table; alternating
                 them makes the eye cross the line six times, which is the
                 line doing its job. */
              const flip = i % 2 === 1;

              return (
                <li
                  key={step.id}
                  className="relative pl-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:pl-0"
                >
                  {/* ---- THE NODE ----
                      Sits on the line and fills when the step arrives. The
                      number is here rather than above the title because a
                      number on the line is a position in a sequence, and a
                      number above a heading is just a decoration. */}
                  <motion.span
                    initial={still ? false : { scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.55, ease: [0.34, 1.4, 0.64, 1] }}
                    className="absolute top-0 left-0 z-10 grid size-10 place-items-center rounded-full bg-brand text-[14px] font-extrabold text-white shadow-[0_0_0_5px_var(--color-surface),0_10px_24px_-10px_rgba(10,91,245,0.8)] lg:top-1/2 lg:left-1/2 lg:size-14 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:text-[17px]"
                  >
                    {step.n}
                  </motion.span>

                  {/* ---- THE WORDS ----
                      Pushed against the line on left-hand rows, but still set
                      ragged-right. Right-aligned body copy looks tidy in a
                      screenshot and is measurably harder to read, and this is
                      the section people actually read. */}
                  <motion.div
                    initial={still ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={
                      "lg:max-w-[30rem] " +
                      (flip
                        ? "lg:col-start-2 lg:row-start-1 lg:mr-auto lg:pl-4"
                        : "lg:col-start-1 lg:row-start-1 lg:ml-auto lg:pr-4")
                    }
                  >
                    <h3 className="text-[1.55rem] leading-[1.15] font-extrabold sm:text-[1.85rem] lg:text-[2.1rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-muted md:text-[18px]">
                      {step.line}
                    </p>
                  </motion.div>

                  {/* ---- THE PICTURE ---- */}
                  <div
                    className={
                      "mt-6 lg:mt-0 lg:max-w-[28rem] " +
                      (flip
                        ? "lg:col-start-1 lg:row-start-1 lg:ml-auto lg:pr-4"
                        : "lg:col-start-2 lg:row-start-1 lg:mr-auto lg:pl-4")
                    }
                  >
                    <Frag />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ---- THE WAY OUT ----
            Six steps is an edit of thirteen, and saying so is better than
            hoping nobody notices. The link is the honest end of the
            section rather than a second call to action competing with the
            one at the foot of the page. */}
        <div className="relative mt-16 text-center md:mt-20">
          <Link
            href={journey.moreHref}
            className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-7 py-4 text-[16px] font-bold text-ink shadow-[0_2px_12px_-6px_rgba(10,16,32,0.25)] transition-colors hover:border-line-strong hover:bg-brand-tint md:text-[17px]"
          >
            {journey.moreLabel}
            <ArrowIcon className="size-4 text-brand transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
