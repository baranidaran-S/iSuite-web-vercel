"use client";

import { Fragment } from "react";
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

   FOUR GHOSTS, NOT FORTY, and they are deliberately NOT at the same depth
   in each column - see queues.ts, where the reason is written out. One
   unanswered card per channel reads as an ordinary Tuesday
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

   NOTHING SCROLLS SIDEWAYS ANY MORE, AND THAT WAS A REAL MISTAKE. The
   four columns used to be 680px wide inside a phone screen, with the
   overflow hidden and the scrollbar hidden too. The note that used to sit
   here argued it was deliberate - that having to travel sideways delivered
   the argument as an interaction rather than a picture.

   It does not. A phone showed WhatsApp, Instagram and a sliver of a third
   column, with nothing on screen saying there was more to the right. A
   visitor who does not guess to drag sees half the evidence and the section
   makes half its case - and that is the good outcome, because the bad one
   is a vertical scroll that swallows a sideways drag and the page simply
   moves on. An argument the reader has to discover is an argument most
   readers do not get.

   So the columns are 2x2 below 640px and 4 across above it, and at no width
   does anything overflow. The walls survive the change: the one at 50%
   stays, the ones at 25% and 75% are hidden, and a fourth wall is drawn
   across between the two rows - so a phone gets a cross of walls with a
   channel walled off in each quarter, which is the same sentence the four
   columns say.

   MEASURED, NOT ESTIMATED. At 360px each card carries about 112px of text
   and the longest message - "What do you charge for a consultation?" -
   takes three lines; the average is two. The padding ramps in three steps
   rather than two because the old jump from px-2.5 straight to px-6 at
   768px made the cards NARROWER at that width than they had been just
   below it.

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

/* Same draw, turned 90 degrees, for the wall that only exists on a phone. */
const wallAcross: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
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

        <div className="mt-16 md:mt-24">
          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative mx-auto grid max-w-[1340px] grid-cols-2 pb-44 sm:grid-cols-4 md:pb-56"
          >
            {/* ---- THE WALLS ---- brightest at the top, gone by the bottom,
                so they fade out with the columns instead of outlasting them. */}
            {[1, 2, 3].map((n) => (
              <motion.span
                key={n}
                aria-hidden
                variants={wall}
                style={{ left: `${n * 25}%`, originY: 0 }}
                /* At two columns there is only one division to draw, and it
                   is the one already sitting at 50%. */
                className={`pointer-events-none absolute top-0 bottom-0 w-px ${
                  n === 2 ? "" : "hidden sm:block"
                }`}
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

            {queues.map((queue, i) => (
              <Fragment key={queue.channel}>
                {/* THE FOURTH WALL, and it only exists at two columns. It is
                    a grid item spanning both of them, so it lands on the
                    true row boundary - the two rows are not the same height
                    and a line absolutely positioned at 50% would miss it.

                    It fades at both ends for the same reason the vertical
                    ones fade at the bottom: a rule that stops dead is a
                    border, and this is meant to read as a wall. */}
                {i === 2 && (
                  <motion.span
                    aria-hidden
                    variants={wallAcross}
                    style={{
                      originX: 0,
                      background:
                        "linear-gradient(90deg, transparent 0%, var(--color-night-line) 18%, var(--color-night-line) 82%, transparent 100%)",
                    }}
                    className="col-span-2 my-9 h-px w-full sm:hidden"
                  />
                )}

                {/* THE GUTTER IS WIDEST ON A PHONE AND NARROWEST JUST
                    ABOVE IT, which looks backwards and is not. Two columns
                    on a 390px screen give each channel 167px; four columns
                    at 640px give it 146px. The padding follows the cell, so
                    every card keeps at least 106px of text at every width -
                    three lines for the longest message, two on average. */}
                <motion.div
                  variants={column}
                  className="min-w-0 px-2.5 sm:px-1.5 md:px-3 lg:px-6"
                >
                  <ColumnHeading
                    channel={queue.channel}
                    label={queue.label}
                  />

                  <ul className="mt-5 space-y-3 md:mt-6 md:space-y-3.5">
                    {queue.enquiries.map((enquiry) => (
                      <motion.li key={enquiry.id} variants={card}>
                        <EnquiryCard
                          enquiry={enquiry}
                          channel={queue.channel}
                        />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </Fragment>
            ))}

            {/* The queue dissolves rather than ending. A veil, so it is
                aria-hidden and takes no pointer events.

                ITS HEIGHT MATCHES THE PADDING BELOW THE CARDS - h-44 with
                pb-44, h-56 with pb-56 - and that is not tidiness. It was
                h-56 at both, so on a phone the veil reached 48px further up
                than the padding did and settled over the bottom of the last
                card in the tallest column. That column is Website, whose
                unanswered card is its fourth and last, and the line the veil
                was dimming was "no reply - 2h". The one thing in the column
                the section exists to show. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-night/80 to-night md:h-56"
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
          ? "rounded-2xl border border-dashed border-night-line px-3.5 py-3.5 md:px-4 md:py-4 lg:px-5"
          : "rounded-2xl border border-white/8 bg-night-card px-3.5 py-3.5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.5)] transition-colors hover:border-white/15 md:px-4 md:py-4 lg:px-5"
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
