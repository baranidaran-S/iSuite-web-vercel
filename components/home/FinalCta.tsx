"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowIcon } from "@/components/ui/icons";
import { finalCta } from "@/lib/content/close";
import { hero } from "@/lib/content/home";
import { site } from "@/lib/site";

/* ==========================================================================
   SECTION 9 - THE ASK
   --------------------------------------------------------------------------
   One heading, one sentence, one button. All three are §19's approved copy,
   and the button's label is imported from hero.primaryCta rather than
   retyped - §2 requires ONE primary CTA across the page, and two strings
   for one label is how that requirement quietly stops being true.

   "ONE SALES SYSTEM" IS THE LINE THE WHOLE PAGE BUILDS TO, so it gets a
   line of its own, the brand colour, and a rule that draws itself under it
   as the section arrives. Nine sections have been explaining what one
   sales system means; this is the moment the phrase is handed back.

   THE RULE IS AN SVG, NOT A BORDER, for one reason: a border-bottom cannot
   be drawn. `pathLength` from 0 to 1 makes the stroke arrive left to right
   like something being underlined by hand, which is emphasis a visitor
   watches happen rather than finds already there. It is also the only
   moving thing in the section.

   THE RULE CARRIES THE LOGO'S GRADIENT. THE TYPE DOES NOT, AND THAT IS
   MEASURED RATHER THAN CHOSEN. The ask was for the phrase itself to be
   set in the "AI" gradient from the wordmark - #0055FD into #00D8F8. It
   cannot be:

       #0055FD   5.65:1 on white   4.88:1 on sky-low   fine
       #00D8F8   1.72:1 on white   1.49:1 on sky-low   nowhere near

   AA's floor for large text is 3:1, so the tail of "system?" would run at
   about half the contrast it needs. Pulling the cyan back until it passes
   gives #006efe, which is indistinguishable from the blue it started from
   - the gradient stops being a gradient before it stops being illegible.

   SO THE PHRASE CARRIES THE GRADIENT, STOPPING WHERE THE EYE STILL WORKS.
   The background under that line is #ecf5fc - the section gradient is
   between sky-base and sky-low at about 45% down - and the brightest cyan
   that clears 3:1 against it is #008eff. That is still a long way from
   #0055FD, so the shift reads as a gradient rather than as a flat blue,
   and every glyph in it is legible. Measured, not estimated; re-measure if
   the section's gradient stops ever move.

   THE DRAWN RULE UNDERNEATH IS GONE. It ran the true logo gradient to
   #00D8F8 and existed only because the type could not, so once the type
   carried the gradient it was a second emphasis device doing the same job.
   It was also rendering as two small dots rather than a stroke - a
   near-flat path in a viewBox squashed by preserveAspectRatio="none", with
   motion writing a dash array over it for the pathLength animation, left
   little more than its two round caps. Both reasons point the same way.

   IF THE REAL CYAN IS EVER WANTED ON THE TYPE, the fix is not a brighter
   colour, it is a darker ground: #00D8F8 on --color-ink measures about
   11:1. That means putting this line on a navy plate, which is a change to
   the section rather than to the text.

   THE PAGE CLOSES WHERE IT OPENED. The hero sits under a sky running blue
   at the top into white; this runs white into blue going down, with the
   same drifting clouds at the same speeds. The same four stops reversed -
   an evening rather than the hero played twice.

   FULL BLEED, AND THE SECOND SECTION IN A ROW WITHOUT A FRAME. Everything
   from the hero to section 7 is a rounded card on the page ground. Section
   8 dropped the card, this drops the margins as well, so the page ends by
   opening outward rather than by stopping.

   NOTHING ELSE IS ON IT. No secondary link, no channel marks, no feature
   recap, no reassurance line. The whole page has been the argument; this is
   the sentence at the end of it, and anything placed beside the button is
   something a visitor can choose instead of pressing it.
   ========================================================================== */

/* Slow, long, and no duration a divisor of any other, so the three never
   sync into one pulsing mass. Minutes rather than seconds - at any speed a
   viewer can perceive directly this stops being weather. */
const CLOUDS = [
  {
    cls: "left-[6%] top-[14%] h-40 w-[34rem]",
    dx: "5%",
    dy: "-2%",
    dur: "104s",
  },
  {
    cls: "right-[4%] top-[38%] h-32 w-[26rem]",
    dx: "-4%",
    dy: "-3%",
    dur: "137s",
  },
  {
    cls: "left-[24%] bottom-[8%] h-36 w-[40rem]",
    dx: "3%",
    dy: "-1.5%",
    dur: "163s",
  },
];

export function FinalCta() {
  const reduced = useReducedMotion();
  const still = reduced === true;

  const enter = (i = 0) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: {
            duration: 0.55,
            delay: i * 0.09,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section
      /* NOT id="book-a-demo" - it would read as an on-page anchor for a
         button that now leaves the site entirely. */
      id="final-cta"
      className="relative overflow-hidden px-5 pt-32 pb-36 md:pt-40 md:pb-48 lg:px-10"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg) 0%, var(--color-sky-base) 20%, var(--color-sky-low) 56%, var(--color-sky-mid) 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {CLOUDS.map((cloud) => (
          <span
            key={cloud.cls}
            className={`anim-cloud absolute rounded-[50%] bg-white/55 blur-[46px] ${cloud.cls}`}
            style={
              {
                "--dx": cloud.dx,
                "--dy": cloud.dy,
                "--dur": cloud.dur,
              } as React.CSSProperties
            }
          />
        ))}

        {/* The light the heading sits in. Without it the middle of the
            gradient is the flattest part of the section, which is exactly
            where the most important sentence on the page is. */}
        <span className="absolute top-[22%] left-1/2 h-[30rem] w-[62rem] -translate-x-1/2 rounded-full bg-white/50 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h2
          {...enter(0)}
          className="h2-section mx-auto max-w-[17ch] font-extrabold"
          style={{ "--h2": "4.4em" } as React.CSSProperties}
        >
          {finalCta.heading.map((line) =>
            "accent" in line && line.accent ? (
              <span key={line.text} className="relative inline-block">
                <span
                  className="relative bg-clip-text text-transparent forced-colors:bg-none forced-colors:text-ink"
                  style={{
                    backgroundImage:
                      "linear-gradient(96deg, #0055FD 0%, #0072ff 48%, #008eff 100%)",
                  }}
                >
                  {line.text}
                </span>
              </span>
            ) : (
              <span key={line.text} className="block">
                {line.text}
              </span>
            ),
          )}
        </motion.h2>

        <motion.p
          {...enter(1)}
          className="lead-section mx-auto mt-8 max-w-[56ch] text-ink/65"
        >
          {finalCta.line}
        </motion.p>

        <motion.div {...enter(2)} className="mt-11">
          {/* The same pill as the hero's, one size up. A visitor who
              scrolled the whole page should arrive at a button they have
              already seen once at the top. */}
          <Link
            href={site.bookingUrl}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-10 py-5 text-[17.5px] font-bold text-white shadow-[0_22px_50px_-14px_rgba(4,28,61,0.65)] transition-all hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-[0_28px_60px_-14px_rgba(4,28,61,0.7)] md:text-[19px]"
          >
            {hero.primaryCta}
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
