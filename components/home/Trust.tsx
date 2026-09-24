"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowIcon } from "@/components/ui/icons";
import { trust } from "@/lib/content/close";

/* ==========================================================================
   SECTION 8 - TRUST AND TRANSPARENCY
   --------------------------------------------------------------------------
   §18's limited FAQ, which the brief asked for and the page did not have.
   lib/content/close.ts records what this replaced - a list of the things
   NOT on this page - and why that was the wrong section to have built.

   IT IS A NORMAL SECTION AGAIN, AND THAT IS THE SECOND CORRECTION TO ITS
   SHELL. It was built frameless on the page's own grey, on the theory that
   the last two sections should open out as the frame drops away. Then it
   was a floating white panel on that same grey. Both were wrong in the
   same way: with no card of its own it had no edges, so it ran into the
   full-bleed sky of section 9 below it and read as the top half of one
   long closing block rather than as a section.

   So it takes the same shell as sections 3, 4 and 6 - rounded card, white
   ground, the page's grey showing round it. Section 9 stays full bleed,
   and the seam between the two is now the card edge, which is the same
   seam the whole page uses.

   THE ANSWERS ARE CARDS, NOT A RULED LIST. Eight paragraphs separated by
   hairlines is a document; eight tinted panels is something built. It also
   fixes a real problem the ruled version had - the answers run from one
   line to four, and rules between uneven blocks make the column look
   accidental, while cards of equal height in a row do not.

   THE GRID IS ROW-MAJOR AND THAT IS FINE HERE. A ruled list read in column
   order and had to be split by hand, because questions that snake across a
   page are questions nobody finishes. Cards do not have that problem: a
   visitor reads a grid of panels the way they read a grid of anything.

   NOTHING IS COLLAPSED. An accordion would halve the height and would also
   hide seven answers behind a click, which is the opposite of what a trust
   section is for: a visitor scanning for the one question they are worried
   about has to be able to FIND it, and a crawler has to be able to read
   it.

   THE ANSWERS ARE BIGGER THAN A FAQ USUALLY GETS. 17px, not 14. Five of
   the eight are refusals, and a refusal set in small grey type looks like
   something being got out of the way rather than something being said.
   ========================================================================== */

export function Trust() {
  const reduced = useReducedMotion();
  const still = reduced === true;

  const enter = (i = 0) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: {
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section id="faq" className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-surface px-4 pt-24 pb-20 md:rounded-[2rem] md:px-10 md:pt-32 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-brand-tint to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-b from-transparent to-bg/70" />
        </div>

        {/* ---- THE FRAME ---- */}
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.p
            {...enter(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-ink/70"
          >
            <span className="size-1.5 rounded-full bg-brand" />
            {trust.eyebrow}
          </motion.p>

          <motion.h2
            {...enter(1)}
            className="h2-section mx-auto mt-6 max-w-[18ch] font-extrabold"
            style={{ "--h2": "4em" } as React.CSSProperties}
          >
            {trust.heading}
          </motion.h2>

          <motion.p
            {...enter(2)}
            className="lead-section mx-auto mt-7 max-w-[58ch] text-muted"
          >
            {trust.lead}
          </motion.p>
        </div>

        {/* ---- THE ANSWERS ---- */}
        <div className="relative mx-auto mt-14 grid max-w-6xl gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          {trust.faq.map((item, i) => (
            <motion.div
              key={item.q}
              {...enter(i % 2)}
              className="relative overflow-hidden rounded-2xl border border-brand/10 bg-brand-tint/60 p-6 md:p-7"
            >
              {/* A short rule in the brand, top-left of every card. It is
                  the only colour in the block, and it is what stops eight
                  pale panels reading as one large pale panel. */}
              <span
                aria-hidden
                className="block h-[3px] w-8 rounded-full bg-brand"
              />

              <h3 className="mt-5 text-[19.5px] leading-snug font-extrabold text-balance md:text-[21px]">
                {item.q}
              </h3>
              <p className="mt-3 text-[16.5px] leading-relaxed text-muted md:text-[17px]">
                {item.a}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ---- THE WAY OUT ----
            §18 asks for a link to the full FAQ. The route does not exist yet
            and will 404 until /faq is built, the same as /features and
            /how-it-works - it is listed in PLACEHOLDERS. */}
        <motion.div
          {...enter(1)}
          className="relative mx-auto mt-10 max-w-6xl text-center"
        >
          <Link
            href={trust.moreHref}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[16.5px] font-bold text-white shadow-[0_14px_34px_-16px_rgba(4,28,61,0.7)] transition-all hover:-translate-y-0.5 hover:bg-ink/90"
          >
            {trust.moreLabel}
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
