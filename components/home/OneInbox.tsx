"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { InboxMock } from "@/components/home/product/InboxMock";
import { PipelineMock } from "@/components/home/product/PipelineMock";
import { oneInbox } from "@/lib/content/queues";

/* ==========================================================================
   SECTION 3 - WHAT iSuite AI IS
   --------------------------------------------------------------------------
   The product's own definition has three clauses, and this section draws all
   three in order:

       1  every enquiry can be brought into ONE INBOX
       2  the assistant REPLIES, qualifies, books and follows up
       3  every lead becomes a CONTACT AND A DEAL on the sales board

   It used to stop after clause 2, which made iSuite AI look like a chatbot
   attached to a shared inbox - the one positioning the requirements forbid
   outright. Clause 3 is what makes it a sales SYSTEM.

   THE SAME FOUR PEOPLE THROUGHOUT. Anand, Nisha, Prakash and Farah were the
   four left unanswered in section 2, marked amber so they were the only warm
   thing on that screen. They are derived from the same array here, never
   retyped. A visitor follows four specific names from stuck, to answered, to
   a deal with an owner - which teaches the product better than any feature
   list, and better than any larger number of cards would.

   THE HEADING IS NOT PINNED, AND THAT IS THE FIX FOR A REAL BIND. Everything
   used to sit inside the sticky box - heading, lead, stepper, a full product
   workspace and the capability chips, all in one viewport. That cannot be
   made to work. At a readable heading size the content overflowed and
   `overflow-hidden` sliced the top off it; sized down to fit, the section
   looked small. Two rounds went into trading one of those for the other.

   So only what NEEDS to persist is pinned. A heading is read once and can
   scroll away like any other heading. The stage holds the stepper and the
   workspace - about 570px of content in a viewport with 700 to give - so it
   is comfortable at any laptop size, and the type above it can be as large
   as it should have been from the start.

   NO overflow-hidden ON THE CARD. `position: sticky` stops working inside any
   ancestor whose overflow is not visible, and the card does not need clipping
   anyway - everything inside it is inset by padding.

   IT IS PINNED AT EVERY WIDTH, AND THE FRAMES WERE REDRAWN TO FIT RATHER
   THAN THE PIN BEING DROPPED. Stacking the three beats down a phone was
   tried and rejected: it reads as three static pictures, and the thing
   this section is actually selling is the CHANGE between them - four
   places becoming one list, the list becoming a reply, the reply becoming
   a deal. Scroll has to drive that at every width or the argument is only
   made on desktop.

   WHAT HAD TO GIVE, because a pinned frame is one viewport tall and the
   content has to fit inside it. Budget on a common handset is about 700px
   of small-viewport height, minus 64px of top padding, 38px of stepper and
   48px of gaps, which leaves roughly 550px for the frame. Against that:

     the board       611px stacked as three full columns  ->  364px as
                     stage-grouped rows, which is what every CRM does on a
                     phone anyway. Same four deals, same owners, same next
                     steps, no sideways drag.
     the inbox       506px with the list and the thread both on  ->  428px
                     showing the list until the reply starts and the thread
                     once it does, the way a messaging app does it.
     the stepper     774px of pills across  ->  38px, because only the
                     LIVE pill is drawn below 896px. Its own badge already
                     says 1, 2 or 3, so nothing is lost by hiding the two
                     that are not the answer to "where am I".

   896px IS MEASURED, NOT CHOSEN. The three pills and their two rules come
   to 774px in Manrope at 16px, and the section's padding takes 104px more.
   Below that the row wraps - and because each rule lives inside the list
   item that follows it, pills two and three land 52px right of the first.
   That is the crooked stepper, and it is not a spacing bug. One pill
   cannot wrap, so it cannot misalign.

   THE TIGHTEST SCREEN IT WAS CHECKED AGAINST is an iPhone SE, 375x667,
   which leaves about 573px once Safari's bars are counted. The furniture
   costs 138px there - 64 of top padding, 38 of stepper, 20 of gap, 16 of
   bottom padding - and the tallest beat, the inbox list, is 428px. 566
   against 573. It fits, with nothing to spare, which is why the numbers
   above are written down: anything added to a frame has to come out of
   something else, and on a common Android handset there is 130px of slack
   but on that one there is 7.

   THE SLACK IS INSIDE THE STAGE, NOT ABOVE OR BELOW IT, and getting that
   wrong twice is worth writing down. A viewport-tall frame holding a 428px
   beat has about 200px spare on a common phone, and the question is only
   where it goes.

     justify-start on the frame   put all of it UNDER the card, which reads
                                  as the section having ended early.
     justify-center on the frame  split it, but half of it then sits
                                  between the lead paragraph and the first
                                  pill - and on the way in, before the
                                  frame pins, that gap is the whole top of
                                  the screen.

   Neither removes it, because the slack is real. So the STEPPER is pinned
   to the top of the frame where it belongs, directly under the lead, and
   the stage below it takes every remaining pixel and centres the card
   inside itself. The spare height ends up as even margin around the
   product frame, which is what margin is supposed to look like.

   md:block md:flex-none turns all of that off from 768px up, where the
   frame was already right and nothing needed moving.

   IT IS A STAGE MACHINE, NOT A SCRUBBED TIMELINE. Scroll sets a stage; each
   beat then plays at its own speed. Scrubbing every property against scroll
   is worse twice over: a fast flick skips the typing entirely, and a merge
   animated frame-by-frame against a trackpad reads as dragging rather than
   as resolving. Stages also reverse cleanly on the way back up.
   ========================================================================== */

/* Scroll progress at which each beat fires.

   THE MERGE FIRES THE MOMENT THE SECTION PINS, and pushing it later was a
   mistake worth recording. When the transitions were called too fast, two
   things were changed: the DURATIONS were slowed, which was right, and the
   TRIGGERS were pushed back, which was not. The four-column state is about
   250px of content in a viewport-tall box, so delaying the merge to 12%
   bought roughly a third of a screen of scrolling spent looking at white
   space below four small cards, waiting for something to happen.

   Duration and trigger are separate problems. A beat can play slowly and
   still start immediately, which is what this does now.

   The opening state is still seen - it plays through the whole approach as
   the section scrolls up into view, which is several hundred pixels of
   scrolling. It just does not hold once there is nothing left to look at. */
/* THE BOARD USED TO GET A THIRD OF THE RUNWAY and the inbox two thirds,
   which is the page's whole imbalance expressed as three numbers. The board
   is the part a visitor has never seen in a WhatsApp tool and the part that
   makes this a sales system rather than a shared inbox; it now holds for
   longer than either beat before it. */
const BEATS = { merge: 0.015, reply: 0.26, board: 0.56 };

export function OneInbox() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next =
      p >= BEATS.board ? 3 : p >= BEATS.reply ? 2 : p >= BEATS.merge ? 1 : 0;
    setStage((prev) => (prev === next ? prev : next));
  });

  /* REDUCED MOTION NOW GETS THE WHOLE STORY RATHER THAN THE LAST FRAME OF
     IT. It used to be pinned to the end state - answered, already on the
     board - so anyone with the preference set never saw the four separate
     places or the inbox at all, which is two thirds of the argument
     withheld from the people least able to ask for it back. It takes the
     stacked layout instead: the same three beats, in order, with nothing
     moving. */
  const still = reduced === true;

  /* The stacked layout survives for exactly one audience. Scroll-driven
     beats are useless to someone who has asked the system for less motion,
     and the alternative of showing them the last frame only - which is what
     this did before - withholds two thirds of the argument from the people
     least able to ask for it back. */
  const flow = still;

  const merged = stage >= 1;
  const answered = stage >= 2;
  const onBoard = stage >= 3;

  /* THIS COMPONENT RE-RENDERS FOUR TIMES FOR THE WHOLE SECTION - once per
     beat - and it has to stay that way. The reply's typewriter used to live
     here and made it 109; see the note at the top of InboxMock for what
     that cost on a phone. Anything added here that ticks belongs in a leaf,
     because eleven `layout` nodes hang off this render. */
  const at = onBoard ? 2 : merged ? 1 : 0;

  return (
    <section id="what-it-is" className="p-2 md:p-3">
      <div className="relative rounded-[1.5rem] bg-surface px-4 pt-24 pb-10 md:rounded-[2rem] md:px-10 md:pt-28">
        {/* ---- THE GROUND ----
            Flat white read as the plain section between a sky and a night,
            so it gets depth - but quietly. Two layers, neither of them a
            colour: a soft brand bloom behind where the panel sits, and a
            pale wash at the foot so the card does not end on the same white
            it started on.

            NO DOT GRID. One was tried here and removed. The hero already
            carries a dot grid, and repeating it made the two sections look
            like the same background twice rather than two places - and under
            a workspace that is itself full of small marks it read as noise
            rather than as texture. Depth, not pattern.

            THIS IS A SIBLING OF THE STICKY CONTENT, NOT AN ANCESTOR. It
            carries overflow-hidden to clip its own bloom to the card's
            rounded corners, and `position: sticky` dies inside any ancestor
            whose overflow is not visible. As a sibling it clips itself and
            leaves the pinning alone. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.5rem] md:rounded-[2rem]"
        >
          <div className="absolute top-[26%] left-1/2 h-[52rem] w-[78rem] -translate-x-1/2 rounded-full bg-brand/7 blur-[140px]" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-bg/70" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-ink/70">
            <span className="size-1.5 rounded-full bg-brand" />
            {oneInbox.eyebrow}
          </p>

          <h2
            className="h2-section mx-auto mt-6 max-w-[20ch] font-extrabold"
            style={{ "--h2": "4em" } as React.CSSProperties}
          >
            {oneInbox.heading}
          </h2>
          <p className="lead-section mx-auto mt-7 max-w-[58ch] text-muted">
            {oneInbox.lead}
          </p>
        </div>

        {/* THE RUNWAY DIV IS RENDERED IN BOTH LAYOUTS, and that is not
            tidiness either. useScroll is given this ref on mount; branching
            it away on a phone leaves the hook holding a ref that is never
            attached, which is a warning at best and a silently dead scroll
            listener at worst. It stays, at its natural height, and the
            stage it reports is simply not read. */}
        <div
          ref={runwayRef}
          className={flow ? "relative mt-12" : "relative mt-2 h-[230vh]"}
        >
          {flow ? (
            <Flow still={still} />
          ) : (
            /* CENTRED AND TIGHTER ON A PHONE. The top padding exists to
               clear the fixed header, which is 64px tall on a phone and
               96px on a desktop - so pt-16 clears it there with nothing to
               spare, and centring absorbs whatever slack is left over. A
               JS comment, not a JSX one: this is a ternary branch and it
               takes a single expression. */
            <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-start pt-16 pb-6 md:pt-28 md:pb-8">
              {/* ---- THE STEPPER ----
                  Three beats, named, with the live one filled. It is here
                  because the opening frame - four dead cards - does not explain
                  itself until you have already scrolled past it. */}
              <ol className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2">
                {oneInbox.steps.map((step, i) => {
                  const active = i === at;
                  const done = i < at;
                  return (
                    <li
                      key={step}
                      /* Below 896px only the live step is drawn - see the
                         note at the top of the file for the 896. */
                      className={`items-center gap-1.5 ${
                        active ? "flex" : "hidden min-[56rem]:flex"
                      }`}
                    >
                      {i > 0 && (
                        <span
                          aria-hidden
                          className={
                            (done || active
                              ? "bg-brand/40"
                              : "bg-line") +
                            " hidden h-px w-5 min-[56rem]:block md:w-10"
                          }
                        />
                      )}
                      <StepPill
                        n={i + 1}
                        label={step}
                        state={active ? "active" : done ? "done" : "idle"}
                      />
                    </li>
                  );
                })}
              </ol>

              {/* ---- THE STAGE ---- */}
              <motion.div
                layout
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className={
                  "relative mt-5 flex w-full min-h-0 flex-1 flex-col justify-center md:mt-9 md:block md:flex-none " +
                  (merged ? "max-w-5xl" : "max-w-[1180px]")
                }
              >
                {/* The three walls from section 2. They leave first - nothing
                    can merge while they are up.

                    AT TWO COLUMNS THERE IS ONE DIVISION, NOT THREE, and the
                    other two were being drawn straight down the middle of
                    the cards. They sit at 25, 50 and 75 per cent of the
                    stage, which is where the gutters are when the grid is
                    four across. Below lg it is two across and only the one
                    at 50% still lands in a gutter. */}
                {!merged &&
                  [1, 2, 3].map((n) => (
                    <motion.span
                      key={n}
                      aria-hidden
                      exit={{ opacity: 0 }}
                      style={{ left: n * 25 + "%" }}
                      className={`pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-ink/25 via-ink/12 to-transparent ${
                        n === 2 ? "" : "hidden lg:block"
                      }`}
                    />
                  ))}

                <AnimatePresence mode="wait" initial={false}>
                  {onBoard ? (
                    <motion.div
                      key="board"
                      /* The board does NOT fill - see PipelineMock for
                         why a stretched full-width stage box reads as
                         empty where a stretched column does not. It sizes
                         to its content at about 510px and the stage
                         centres it. */
                      className="w-full"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <PipelineMock />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="inbox"
                      /* Only once it is a panel. The opening frame is four
                         loose cards with no chrome to stretch, so that one
                         stays centred. */
                      className={merged ? "h-full w-full md:h-auto" : "w-full"}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.55, ease: "easeIn" }}
                    >
                      <InboxMock merged={merged} answered={answered} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* WHAT IT DOES, IN FIVE WORDS. Four cards show four capabilities,
                  but four reads as the whole list. This says answering is where
                  the assistant starts, not where it stops - and "hands over to
                  your team" is on it deliberately, because the requirements
                  forbid any wording suggesting the product replaces staff. */}
              <motion.ul
                animate={{ opacity: answered ? 1 : 0, y: answered ? 0 : 8 }}
                transition={{ duration: 0.6, delay: answered ? 0.7 : 0 }}
                className="mt-7 hidden flex-wrap items-center justify-center gap-x-3 gap-y-2.5 sm:flex md:mt-9"
              >
                {oneInbox.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[14px] font-semibold text-ink/75 md:text-[15px]"
                  >
                    <span className="size-1.5 rounded-full bg-brand" />
                    {cap}
                  </li>
                ))}
              </motion.ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   THE STACKED LAYOUT - phones, and anyone who asked for reduced motion
   --------------------------------------------------------------------------
   The same three beats in the same order, each one labelled with its own
   step pill and drawn at whatever height it needs.

   THE STEPPER DISSOLVES INTO THE BEATS, which is also the fix for the
   three pills sitting visibly out of line. There is no row left to
   misalign: one pill sits centred above the frame it names, and it is the
   same StepPill the wide layout uses, so the two cannot drift apart.
   ========================================================================== */
function Flow({ still }: { still: boolean }) {
  return (
    <div className="mt-12 space-y-14">
      <FlowBeat n={1} label={oneInbox.steps[0]} still={still}>
        <InboxMock merged={false} answered={false} />
      </FlowBeat>

      <FlowBeat n={2} label={oneInbox.steps[1]} still={still}>
        {/* `still` is the only way this layout is ever reached, so the
            reply is written rather than typed - the typewriter would be
            motion, which is the thing the reader asked the system not to
            do. */}
        <InboxMock merged answered still={still} />
      </FlowBeat>

      <FlowBeat n={3} label={oneInbox.steps[2]} still={still}>
        <PipelineMock />
      </FlowBeat>

      {/* Visible here, where the pinned layout hides it below sm. There it
          is competing for a fixed viewport; here it costs one more row. */}
      <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
        {oneInbox.capabilities.map((cap) => (
          <li
            key={cap}
            className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[14px] font-semibold text-ink/75"
          >
            <span className="size-1.5 rounded-full bg-brand" />
            {cap}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowBeat({
  n,
  label,
  still,
  children,
}: {
  n: number;
  label: string;
  still: boolean;
  children: React.ReactNode;
}) {
  const enter = still
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <motion.div {...enter}>
      <div className="flex justify-center">
        <StepPill n={n} label={label} state="active" />
      </div>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

/* One pill, both layouts. It was written twice for a while and the two
   copies had already drifted by a pixel of padding. */
function StepPill({
  n,
  label,
  state,
}: {
  n: number;
  label: string;
  state: "active" | "done" | "idle";
}) {
  const active = state === "active";
  const done = state === "done";

  return (
    <motion.span
      animate={{ opacity: active ? 1 : done ? 0.8 : 0.5 }}
      transition={{ duration: 0.4 }}
      className={
        "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-bold whitespace-nowrap md:text-[16px] " +
        (active
          ? "border-brand bg-brand text-white"
          : done
            ? "border-brand/30 bg-brand-tint text-brand"
            : "border-line bg-surface text-muted")
      }
    >
      <span
        className={
          "grid size-5 place-items-center rounded-full text-[11px] font-bold " +
          (active ? "bg-white/25" : done ? "bg-brand/15" : "bg-line")
        }
      >
        {n}
      </span>
      {label}
    </motion.span>
  );
}
