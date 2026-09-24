"use client";

import { motion, type Variants } from "motion/react";
import { channelIcons } from "@/components/ui/icons";
import { fourWalls, queues, type Enquiry } from "@/lib/content/queues";
import type { ChannelId } from "@/lib/content/home";

/* ==========================================================================
   SECTION 2 - FOUR WALLS
   --------------------------------------------------------------------------
   THE GUTTERS ARE THE ARGUMENT. The obvious way to draw this section is
   chaos - bubbles everywhere, overlapping, spilling. That is wrong, and not
   for taste reasons: it says the enquiries are the problem. They are not.
   Each of these four columns is perfectly tidy on its own. The failure is
   the three walls between them, and anyone running four separate inboxes
   recognises their own week in that.

   IT IS DARK, AND THAT IS THE FIX FOR THE FIRST ATTEMPT. Built on the same
   pale ground as the rest of the page, this read as one more feature panel -
   correct in structure, mild in effect, which on a problem statement is the
   same as failing. The page now runs bright sky, then night, then bright
   again once the problem is solved. Colour is carrying the narrative, and a
   visitor feels the weight land before reading a word.

   THE WALLS ARE GRADIENTS, NOT RULES. A flat hairline either disappears at
   the bottom of a fading column or sits there as a hard stripe after the
   cards have gone. These start bright where the columns are solid and fade
   out with them, which also reads as what they are: walls, going up.

   FOUR GHOSTS, NOT FORTY, and they line up across all four columns at the
   same depth. One unanswered card per channel reads as an ordinary Tuesday
   and is believed; a wall of them reads as invented outrage, and once a
   visitor stops believing the picture the section is worth less than
   nothing. They are drawn by SUBTRACTION - no fill, a dashed edge, the
   channel's colour drained out - because an unanswered message does not
   announce itself. That is the whole problem.

   THE BOTTOM FADES. The queue does not end at the last card, it dissolves.
   Nobody is working through it. A column with a clean bottom edge says the
   work is done.

   THE ANIMATION IS THE ARGUMENT TOO: the walls draw DOWNWARD, going up
   between channels that used to be one business. Cards rise in behind them,
   already separated. Then it stops - `once: true`, no loop. A problem
   statement that keeps re-animating becomes decoration.

   THE DATA IS NOT LOCAL. It comes from lib/content/queues.ts because
   SECTION 3 REUSES IT - the same cards collapse into one inbox and the
   ghosts come back answered. If the two sections ever draw different names,
   the payoff stops working.
   ========================================================================== */

/* One trigger for the whole section, with the stagger flowing down through
   the tree. Per-card viewport observers would fire at different scroll
   positions and lose the left-to-right build entirely. */
const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const wall: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const column: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.34 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FourWalls() {
  return (
    <section id="problem" className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-night px-5 pt-24 pb-0 md:rounded-[2rem] md:px-10 md:pt-36">
        {/* Centred, because a narrow left-aligned block above four columns
            leaves half the width visibly unused and reads as unfinished. */}
        <div className="mx-auto max-w-4xl text-center">
          {/* ONE SENTENCE, ONE BRIGHTNESS, TWO LINES.

              It was four lines of identical white type carrying two
              sentences, and it read as a paragraph rather than a heading -
              because that is what it was. The second sentence moved to the
              lead below.

              An earlier attempt to break it up ran the first half at 45%
              white. That was worse: on display type it reads as two lines
              that failed to load above two that did, and the sentence splits
              before anyone finishes it. The emphasis is in the words. */}
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-white/80 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-night-warn" />
            {fourWalls.eyebrow}
          </p>

          <h2 className="h2-section mx-auto mt-6 max-w-[17ch] font-extrabold text-white">
            {fourWalls.heading}
          </h2>

          <p className="lead-section mx-auto mt-8 max-w-[54ch] text-night-muted">
            {fourWalls.lead}
          </p>
        </div>

        {/* On a phone the four columns are wider than the screen ON PURPOSE.
            Having to travel sideways to see all four channels delivers the
            argument as an interaction rather than a picture. */}
        <div className="mt-16 -mx-5 overflow-x-auto px-5 md:mx-0 md:mt-24 md:overflow-visible md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative mx-auto grid min-w-[680px] max-w-[1340px] grid-cols-4 pb-44 md:min-w-0 md:pb-56"
          >
            {/* ---- THE WALLS ---- brightest at the top, gone by the bottom,
                so they fade out with the columns instead of outlasting them. */}
            {[1, 2, 3].map((n) => (
              <motion.span
                key={n}
                aria-hidden
                variants={wall}
                style={{ left: `${n * 25}%`, originY: 0 }}
                className="pointer-events-none absolute top-0 bottom-0 w-px"
              >
                {/* A hairline alone is 1px on a dark ground and reads as an
                    artefact rather than as a thing. The blurred copy behind
                    it gives it mass without giving it width - at 3px solid
                    it would stop being a hairline and start being a border. */}
                <span
                  className="absolute -inset-x-[3px] inset-y-0 blur-[3px] opacity-60"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--color-night-line) 0%, var(--color-night-line) 38%, transparent 82%)",
                  }}
                />
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--color-night-line) 0%, var(--color-night-line) 42%, transparent 88%)",
                  }}
                />
              </motion.span>
            ))}

            {queues.map((queue) => (
              <motion.div
                key={queue.channel}
                variants={column}
                className="min-w-0 px-2.5 md:px-6"
              >
                <ColumnHeading channel={queue.channel} label={queue.label} />

                <ul className="mt-5 space-y-3 md:mt-6 md:space-y-3.5">
                  {queue.enquiries.map((enquiry) => (
                    <motion.li key={enquiry.id} variants={card}>
                      <EnquiryCard enquiry={enquiry} channel={queue.channel} />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* The queue dissolves rather than ending. A veil, so it is
                aria-hidden and takes no pointer events. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-night/80 to-night"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ColumnHeading({
  channel,
  label,
}: {
  channel: ChannelId;
  label: string;
}) {
  const Icon = channelIcons[channel];
  return (
    /* The mark sits in a chip tinted with its own channel colour. Four bare
       icons on one dark ground all read as "small grey thing"; four tinted
       blocks read as four different places, which is the sentence above. */
    <div className="flex items-center gap-2.5 border-b border-night-line pb-4">
      <span
        className="grid size-8 shrink-0 place-items-center rounded-lg"
        style={{
          color: `var(--color-${channel})`,
          backgroundColor: `color-mix(in oklab, var(--color-${channel}) 16%, transparent)`,
        }}
      >
        <Icon className="size-[18px]" />
      </span>
      <span className="truncate text-[15px] font-bold text-white md:text-[16px]">
        {label}
      </span>
    </div>
  );
}

function EnquiryCard({
  enquiry,
  channel,
}: {
  enquiry: Enquiry;
  channel: ChannelId;
}) {
  const Icon = channelIcons[channel];
  const ghost = Boolean(enquiry.waited);

  /* The ghost is the same card with three things taken away: the fill, the
     solid edge, and the channel's colour. Subtraction rather than a warning
     colour is what keeps it quiet - and quiet is accurate, because nothing
     on a real phone flags the message nobody answered. */
  return (
    <div
      className={
        ghost
          ? "rounded-2xl border border-dashed border-night-line px-4 py-3.5 md:px-5 md:py-4"
          : "rounded-2xl border border-white/8 bg-night-card px-4 py-3.5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.5)] transition-colors hover:border-white/15 md:px-5 md:py-4"
      }
    >
      <div className="flex items-center gap-1.5">
        <Icon
          className="size-3.5 shrink-0 md:size-4"
          style={{
            color: ghost ? "var(--color-night-dim)" : `var(--color-${channel})`,
          }}
        />
        <span
          className={`truncate text-[14px] font-bold md:text-[15px] ${
            ghost ? "text-night-dim" : "text-white"
          }`}
        >
          {enquiry.name}
        </span>
      </div>

      <p
        className={`mt-1.5 text-[14px] leading-snug md:text-[15px] ${
          ghost ? "text-night-dim/80" : "text-night-muted"
        }`}
      >
        {enquiry.text}
      </p>

      {ghost && (
        <p className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold tracking-wide text-night-warn md:text-[13px]">
          <span className="size-1.5 rounded-full bg-night-warn" />
          {fourWalls.ghostLabel} &middot; {enquiry.waited}
        </p>
      )}
    </div>
  );
}
