"use client";

import { motion } from "motion/react";
import { channelIcons } from "@/components/ui/icons";
import { oneInbox, unanswered } from "@/lib/content/queues";

/* ==========================================================================
   THE SALES BOARD
   --------------------------------------------------------------------------
   The beat that makes this a sales SYSTEM rather than an inbox with a
   chatbot attached. Section 3 used to stop at "the assistant replied", which
   is one feature of thirteen and reads as a chatbot - the exact positioning
   the requirements forbid. The product's own definition has a third clause:
   every lead becomes a contact and a deal on the sales board. This is that
   clause, drawn.

   THE SAME FOUR PEOPLE. Anand, Nisha, Prakash and Farah have now been
   followed through three states - stuck behind a wall, answered in the
   inbox, and here as deals with an owner and a next step. A visitor who has
   watched four specific names travel that far understands the product
   better than any feature list could explain it.

   NO DEAL VALUES, AND THAT IS NOT AN OVERSIGHT. A pipeline mock wants a
   rupee figure on every card and each one would be a fabricated statistic on
   a live page. The stage, the owner and the next action carry the whole idea
   without inventing a number - and "Site visit - Sat 11am" is in fact more
   convincing than a made-up amount, because it is the thing a showroom
   actually writes down.

   THE STAGES ARE EXAMPLES. The requirements are explicit that businesses
   configure their own, so the section says so rather than presenting these
   three as the product's fixed shape.

   THERE ARE TWO BOARDS IN HERE AND THAT IS DELIBERATE. Columns from 768px
   up; below it, the same deals as rows grouped under their stage. Three
   columns squeezed into a phone are 114px wide, which is not a board but a
   rumour of one, and stacking the full columns comes to 611px inside a
   pinned frame with about 550px to give. Grouped rows are 364px, keep every
   name, owner and next step, and are what a CRM on a phone actually looks
   like.

   The duplication is in the markup, not in the data - both read the same
   `stages` and the same four people, so neither can drift. Only one is ever
   displayed, so a screen reader is never read the board twice.
   ========================================================================== */

const COLUMN_TINT: Record<string, string> = {
  "New Enquiry": "bg-[#eef1f7] text-muted",
  Qualified: "bg-brand-tint text-brand",
  "Appointment Booked": "bg-[#e6f7ee] text-[#1b7a4b]",
};

export function PipelineMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(10,16,32,0.45)]">
      {/* Two lines on a phone. "Example stages" is required honesty, not a
          caption - the requirements are explicit that businesses set their
          own - so it wraps rather than being dropped at a narrow width. */}
      <div className="flex flex-col items-start gap-0.5 border-b border-line px-4 py-2.5 md:flex-row md:items-center md:justify-between md:gap-3 md:py-3.5">
        <span className="text-[16px] font-bold md:text-[17px]">
          {oneInbox.boardLabel}
        </span>
        <span className="text-[13px] font-semibold text-muted">
          Example stages &mdash; you set your own
        </span>
      </div>

      {/* ---- THE PHONE BOARD ---- */}
      <div className="flex flex-col gap-2.5 p-2.5 md:hidden">
        {oneInbox.stages.map((stage, col) => {
          const deals = unanswered.filter((e) => e.stage === stage);
          return (
            /* NATURAL HEIGHT, NOT STRETCHED, and the stretched version is
               worth recording because it looked reasonable on paper. Giving
               the three stages flex-1 makes them share the frame, which is
               how the wide board works - its columns carry a 380px floor.
               It does not translate: a 230px-tall full-width box with one
               deal card at the top of it reads as an empty box, where the
               same emptiness in a 230px-wide COLUMN reads as a column with
               room on it. The shape is doing the work, not the height.

               So the board sizes to its content and the stage centres it. */
            <div
              key={stage}
              className="board-stage flex flex-col rounded-xl bg-bg/60 p-2.5"
            >
              <span
                className={`inline-block self-start rounded-md px-2.5 py-1 text-[12.5px] font-bold ${
                  COLUMN_TINT[stage] ?? "bg-bg text-muted"
                }`}
              >
                {stage}
              </span>

              <div className="mt-1.5 space-y-1.5">
                {deals.map((deal, i) => {
                  const Icon = channelIcons[deal.channel];
                  return (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.3 + col * 0.12 + i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="board-row flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-4 shadow-[0_1px_3px_rgba(10,16,32,0.06)]"
                    >
                      <Icon
                        className="size-4 shrink-0"
                        style={{ color: `var(--color-${deal.channel})` }}
                      />

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-bold">
                          {deal.name}
                        </span>
                        <span className="block truncate text-[13px] text-muted">
                          {deal.next}
                        </span>
                      </span>

                      {/* The owner rides on the row rather than under it.
                          Two initials say the same thing the word "Owner"
                          does once the reader has met it on the wide
                          board, and it saves 34px a card. */}
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#e8f0ff] text-[10.5px] font-bold text-[#2f5fd0]">
                        {deal.owner}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* THE STAGES STACK ON A PHONE, THEY DO NOT SCROLL SIDEWAYS. This was
          560px wide inside a 342px screen, defended here on the grounds
          that a real kanban board scrolls sideways too. It does - inside an
          app the person has already decided to use. On a marketing page a
          board that only shows its first stage has shown a visitor one
          third of the idea, and the third that matters, Appointment
          Booked, is the one off the right-hand edge.

          Stacked, the three stages read top to bottom in the order a deal
          actually moves through them, which on a phone is arguably the
          clearer diagram. Three across from 640px up, where they fit. */}
      <div className="hidden grid-cols-3 gap-4 p-4 md:grid">
        {oneInbox.stages.map((stage, col) => {
          const deals = unanswered.filter((e) => e.stage === stage);
          return (
            <div
              key={stage}
              className="flex min-h-[380px] min-w-0 flex-col rounded-xl bg-bg/60 p-3"
            >
              <div className="flex items-center gap-2 px-1 pb-2.5">
                <span
                  className={`truncate rounded-md px-3 py-1.5 text-[14px] font-bold ${
                    COLUMN_TINT[stage] ?? "bg-bg text-muted"
                  }`}
                >
                  {stage}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {deals.map((deal, i) => {
                  const Icon = channelIcons[deal.channel];
                  return (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, y: 14, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.35 + col * 0.14 + i * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="rounded-lg border border-line bg-surface p-3 shadow-[0_1px_3px_rgba(10,16,32,0.06)]"
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon
                          className="size-4 shrink-0"
                          style={{ color: `var(--color-${deal.channel})` }}
                        />
                        <span className="truncate text-[15px] font-bold md:text-[16px]">
                          {deal.name}
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-2 text-[13.5px] leading-snug text-muted md:text-[14.5px]">
                        {deal.next}
                      </p>

                      <div className="mt-2.5 flex items-center gap-1.5">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#e8f0ff] text-[10.5px] font-bold text-[#2f5fd0]">
                          {deal.owner}
                        </span>
                        <span className="text-[12.5px] text-muted">Owner</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
