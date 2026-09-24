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
   ========================================================================== */

const COLUMN_TINT: Record<string, string> = {
  "New Enquiry": "bg-[#eef1f7] text-muted",
  Qualified: "bg-brand-tint text-brand",
  "Appointment Booked": "bg-[#e6f7ee] text-[#1b7a4b]",
};

export function PipelineMock() {
  return (
    <div className="overflow-x-auto overflow-y-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(10,16,32,0.45)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
        <span className="text-[16px] font-bold md:text-[17px]">{oneInbox.boardLabel}</span>
        <span className="text-[13px] font-semibold text-muted">
          Example stages &mdash; you set your own
        </span>
      </div>

      {/* A real kanban board scrolls sideways on a phone, so this one does
          too - three 110px columns would be authentic to nothing. */}
      <div className="grid min-w-[560px] grid-cols-3 gap-3 p-3 md:min-w-0 md:gap-4 md:p-4">
        {oneInbox.stages.map((stage, col) => {
          const deals = unanswered.filter((e) => e.stage === stage);
          return (
            <div key={stage} className="flex min-h-[380px] min-w-0 flex-col rounded-xl bg-bg/60 p-3">
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
