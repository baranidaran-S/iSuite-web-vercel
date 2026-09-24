"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  channelIcons,
} from "@/components/ui/icons";
import { unanswered } from "@/lib/content/queues";
import type { FragId } from "@/lib/content/journey";

/* ==========================================================================
   THE SIX JOURNEY FRAGMENTS
   --------------------------------------------------------------------------
   One small piece of real interface per step. Six steps of pure type is a
   numbered list, and a numbered list is the thing this section had to avoid
   being - "how it works" is a claim about software, and the cheapest way to
   support it is to show the software doing each part.

   THEY ARE FRAGMENTS, NOT SCREENSHOTS. Each one draws the SMALLEST piece of
   UI that proves its step and nothing else: step 04 is three time pills and
   an assignee, not a calendar. A full panel per step would be six competing
   product shots down one page, and the eye would stop reading the words.

   THE SAME FOUR PEOPLE AGAIN. Anand, Nisha and Prakash have been followed
   since section 2 - stuck behind a wall, answered in the inbox, a deal on
   the board. Here the journey is walked at half speed with the same names,
   so a visitor who has read this far is watching people they recognise
   rather than meeting a fourth set of invented customers. Everything below
   is derived from lib/content/queues.ts and nothing is retyped.

   NO FIGURES ANYWHERE. Step 06 names the reports rather than drawing a
   chart, and that is deliberate: bars without an axis still invent a shape
   for a business the visitor has never seen. The names of the reports are
   true and cost nothing to stand behind.
   ========================================================================== */

/* Every fragment animates the same way: the panel arrives, then its rows
   come up one after another. One shared pair of variants so six fragments
   cannot drift into six different rhythms. */
const panel = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.11,
      delayChildren: 0.18,
    },
  },
};

const row = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const VIEWPORT = { once: true, amount: 0.4 } as const;

/* The shared shell. A fragment that brought its own frame would be a
   different object on every row; this way the six read as six views of one
   product rather than as six illustrations. */
function Frame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  /* The global reduced-motion rule in globals.css only stops CSS animation.
     Everything in this file is driven by JS, so the preference has to be
     honoured here too - otherwise the one visitor who asked for less motion
     gets the most of it. `initial={false}` renders the finished state. */
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={panel}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
      className="w-full rounded-2xl border border-line bg-surface p-4 text-left shadow-[0_24px_60px_-34px_rgba(10,16,32,0.45)] md:p-5"
    >
      <p className="mb-3.5 text-[12.5px] font-extrabold tracking-[0.12em] text-muted uppercase">
        {label}
      </p>
      {children}
    </motion.div>
  );
}

/* THREE NAMES, NOT ONE, AND IT IS DELIBERATE. The obvious thing is to walk a
   single customer through all six steps. It cannot be done honestly: on the
   board in section 3, Anand is Qualified with a charges list to send and
   Prakash is the one with a Saturday appointment. Marching Anand through a
   booking here would contradict a board the visitor has just scrolled past.

   So each fragment shows the person whose actual state matches that step -
   Anand arriving and answered and waiting on a follow-up, Nisha being
   qualified, Prakash booked and on the board. The journey is the system's,
   not one customer's, and the heading says exactly that. */
const [anand, nisha, prakash] = unanswered;

/* ---- 01  Someone messages you ------------------------------------------ */
function Arrives() {
  const Wa = channelIcons[anand.channel];
  return (
    <Frame label="New enquiry">
      <motion.p
        variants={row}
        className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-3 py-1.5 text-[13px] font-bold text-brand"
      >
        <Wa className="size-4" />
        Clicked your Meta ad
      </motion.p>

      <motion.div
        variants={row}
        className="mt-3 max-w-[92%] rounded-2xl rounded-tl-md bg-[#f2f4f9] px-4 py-3"
      >
        <p className="text-[15px] leading-snug md:text-[16px]">{anand.text}</p>
        <p className="mt-1.5 text-[12.5px] font-semibold text-muted">
          {anand.name} &middot; just now
        </p>
      </motion.div>

      {/* THIS FOOTER USED TO READ "Four channels, one inbox" and it was the
          fourth time the page had said so. What a visitor has not been told
          is that the deal exists ALREADY - before a human has looked at the
          message, before anything has been replied to. SS8 is explicit that
          lead capture creates the contact, opens the deal and saves the ad
          source, so the picture says that instead. */}
      <motion.div
        variants={row}
        className="mt-4 flex flex-wrap items-center gap-2 border-t border-line-soft pt-3.5"
      >
        {["Contact created", "Deal opened"].map((done) => (
          <span
            key={done}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#e6f7ee] px-2.5 py-1 text-[12.5px] font-bold text-[#1b7a4b]"
          >
            <CheckIcon className="size-3" />
            {done}
          </span>
        ))}
        <span className="rounded-md bg-[#f2f4f9] px-2.5 py-1 text-[12.5px] font-bold text-ink/75">
          Source saved
        </span>
      </motion.div>
    </Frame>
  );
}

/* ---- 02  The assistant replies ----------------------------------------- */
function Replies() {
  return (
    <Frame label="Assistant reply">
      <motion.div variants={row} className="flex justify-end">
        <span className="max-w-[94%] rounded-2xl rounded-br-md bg-brand px-4 py-3 text-white shadow-sm">
          <span className="block text-[15px] leading-snug md:text-[16px]">
            {anand.reply}
          </span>
          <span className="mt-1.5 flex items-center justify-end gap-1.5">
            <span className="rounded bg-white/20 px-2 py-0.5 text-[12px] font-bold">
              &#10022; AI
            </span>
            <span className="text-[12px] text-white/85">12:19</span>
          </span>
        </span>
      </motion.div>

      <motion.p
        variants={row}
        className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-brand-tint px-3 py-1.5 text-[13px] font-bold text-brand"
      >
        <span className="size-1.5 rounded-full bg-brand" />
        {anand.did}
      </motion.p>
    </Frame>
  );
}

/* ---- 03  It asks your questions ---------------------------------------- */
const ASKED = [
  { q: "First visit or a follow-up?", a: "First visit" },
  { q: "Which branch suits you?", a: "Anna Nagar" },
];

function Asks() {
  return (
    <Frame label="Your qualifying questions">
      <ul className="space-y-2.5">
        {ASKED.map((item) => (
          <motion.li
            key={item.q}
            variants={row}
            className="flex items-start gap-2.5"
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
              <CheckIcon className="size-3" />
            </span>
            <span className="min-w-0">
              <span className="block text-[14.5px] leading-snug md:text-[15.5px]">
                {item.q}
              </span>
              <span className="mt-0.5 block text-[14px] font-bold text-ink md:text-[15px]">
                {item.a}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        variants={row}
        className="mt-4 flex flex-wrap items-center gap-2 border-t border-line-soft pt-3.5"
      >
        <span className="text-[13px] font-semibold text-muted">
          Saved to {nisha.name} &middot; contact and deal
        </span>
        {["Visit type", "Branch"].map((field) => (
          <span
            key={field}
            className="rounded-md bg-[#f2f4f9] px-2.5 py-1 text-[12.5px] font-bold text-ink/75"
          >
            {field}
          </span>
        ))}
      </motion.div>
    </Frame>
  );
}

/* ---- 04  A time gets booked -------------------------------------------- */
/* The chosen slot is Prakash's, taken from the queue rather than invented,
   so the time on this pill is the same time on his deal card one step down
   and the same one section 3 put on the board. */
const SLOTS = ["Sat 11:00 am", "Sat 4:30 pm", "Mon 5:00 pm"];

function Books() {
  return (
    <Frame label="Pick a time">
      <motion.div variants={row} className="flex flex-wrap gap-2">
        {SLOTS.map((slot, i) => (
          <span
            key={slot}
            className={
              "rounded-lg px-3 py-2 text-[13.5px] font-bold md:text-[14.5px] " +
              (i === 0
                ? "bg-brand text-white shadow-[0_6px_16px_-8px_rgba(10,91,245,0.9)]"
                : "border border-line bg-surface text-muted")
            }
          >
            {slot}
          </span>
        ))}
      </motion.div>

      <motion.p
        variants={row}
        className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-[#e6f7ee] px-3 py-1.5 text-[13px] font-bold text-[#1b7a4b]"
      >
        <CalendarIcon className="size-4" />
        Booked &mdash; {prakash.next}
      </motion.p>

      <motion.div
        variants={row}
        className="mt-4 flex items-center gap-2 border-t border-line-soft pt-3.5"
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#e8f0ff] text-[11.5px] font-bold text-[#2f5fd0]">
          {prakash.owner}
        </span>
        <span className="text-[13px] font-semibold text-muted">
          Handed to your team
        </span>
      </motion.div>
    </Frame>
  );
}

/* ---- 05  It becomes a deal --------------------------------------------- */
function Deal() {
  const Icon = channelIcons[prakash.channel];
  return (
    <Frame label="Your sales board">
      <motion.div variants={row} className="flex items-center gap-2">
        <span className="rounded-md bg-brand-tint px-2.5 py-1 text-[12.5px] font-bold text-brand">
          Qualified
        </span>
        <ArrowIcon className="size-4 shrink-0 text-muted" />
        <span className="rounded-md bg-[#e6f7ee] px-2.5 py-1 text-[12.5px] font-bold text-[#1b7a4b]">
          {prakash.stage}
        </span>
      </motion.div>

      <motion.div
        variants={row}
        className="mt-3 rounded-xl border border-line bg-surface p-3.5 shadow-[0_2px_8px_rgba(10,16,32,0.07)]"
      >
        <span className="flex items-center gap-2">
          <Icon
            className="size-4 shrink-0"
            style={{ color: `var(--color-${prakash.channel})` }}
          />
          <span className="text-[15px] font-bold md:text-[16px]">
            {prakash.name}
          </span>
        </span>
        <p className="mt-1.5 text-[13.5px] text-muted md:text-[14.5px]">
          {prakash.next}
        </p>
      </motion.div>

      <motion.p
        variants={row}
        className="mt-3.5 text-[13px] font-semibold text-muted"
      >
        Stages are yours to name and reorder. Won and lost reasons are
        recorded against the deal.
      </motion.p>
    </Frame>
  );
}

/* ---- 06  Follow-ups keep going ----------------------------------------- */
/* NAMES OF REPORTS, NOT NUMBERS IN THEM. Drawing a chart here would mean
   inventing a distribution, and an invented distribution on a live page is
   a fabricated statistic however small the bars are. */
const REPORTS = ["Enquiries", "Replies", "Deals", "Follow-ups"];

function Follows() {
  return (
    <Frame label="Follow-up scheduled">
      <motion.div
        variants={row}
        className="flex items-start gap-2.5 rounded-xl bg-[#fff6ea] p-3.5"
      >
        <ClockIcon className="mt-0.5 size-5 shrink-0 text-[#a16326]" />
        <span className="min-w-0">
          <span className="block text-[14.5px] font-bold md:text-[15.5px]">
            Tomorrow, 10:00 am
          </span>
          <span className="mt-0.5 block text-[13.5px] text-ink/70 md:text-[14.5px]">
            {anand.next} &middot; {anand.name}
          </span>
        </span>
      </motion.div>

      <motion.div
        variants={row}
        className="mt-4 border-t border-line-soft pt-3.5"
      >
        <p className="text-[13px] font-semibold text-muted">In your reports</p>
        <span className="mt-2 flex flex-wrap gap-2">
          {REPORTS.map((r) => (
            <span
              key={r}
              className="rounded-md bg-[#f2f4f9] px-2.5 py-1 text-[12.5px] font-bold text-ink/75"
            >
              {r}
            </span>
          ))}
        </span>
      </motion.div>
    </Frame>
  );
}

export const journeyFrags: Record<FragId, () => React.JSX.Element> = {
  arrives: Arrives,
  replies: Replies,
  asks: Asks,
  books: Books,
  deal: Deal,
  follows: Follows,
};
