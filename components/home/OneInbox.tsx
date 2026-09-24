"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { InboxMock } from "@/components/home/product/InboxMock";
import { PipelineMock } from "@/components/home/product/PipelineMock";
import { oneInbox, unanswered } from "@/lib/content/queues";

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

  /* THE FOUR-COLUMN OPENING IS DESKTOP ONLY. At 390px, four columns give each
     card about 80px - an avatar, a truncated name and nothing else. That is
     not a smaller version of the idea, it is an unreadable one. Below lg the
     section opens already merged and runs inbox -> replies -> board, which is
     three of the four beats and the three that matter. Section 2 has shown
     the columns by then anyway. */
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next =
      p >= BEATS.board ? 3 : p >= BEATS.reply ? 2 : p >= BEATS.merge ? 1 : 0;
    setStage((prev) => (prev === next ? prev : next));
  });

  /* Reduced motion gets the END of the story - answered, on the board. A
     still frame has to make the same argument the animation does. */
  const still = reduced === true;
  const merged = still || !wide || stage >= 1;
  const answered = still || stage >= 2;
  const onBoard = still || stage >= 3;

  const reply = unanswered[0].reply ?? "";
  const typed = useTypewriter(reply, answered && !still);
  const shown = still ? reply : typed;

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

        <div
          ref={runwayRef}
          className={still ? "relative mt-12" : "relative mt-2 h-[230vh]"}
        >
          <div
            className={
              still
                ? ""
                : "sticky top-0 flex h-[100svh] flex-col items-center justify-start pt-24 pb-8 md:pt-28"
            }
          >
            {/* ---- THE STEPPER ----
                Three beats, named, with the live one filled. It is here
                because the opening frame - four dead cards - does not explain
                itself until you have already scrolled past it. */}
            <ol className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2">
              {oneInbox.steps.map((step, i) => {
                const active = i === at;
                const done = i < at;
                return (
                  <li key={step} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className={
                          done || active
                            ? "h-px w-5 bg-brand/40 md:w-10"
                            : "h-px w-5 bg-line md:w-10"
                        }
                      />
                    )}
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
                          (active
                            ? "bg-white/25"
                            : done
                              ? "bg-brand/15"
                              : "bg-line")
                        }
                      >
                        {i + 1}
                      </span>
                      {step}
                    </motion.span>
                  </li>
                );
              })}
            </ol>

            {/* ---- THE STAGE ---- */}
            <motion.div
              layout
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className={
                "relative mt-7 w-full md:mt-9 " +
                (merged ? "max-w-5xl" : "max-w-[1180px]")
              }
            >
              {/* The three walls from section 2. They leave first - nothing
                  can merge while they are up. */}
              {!still &&
                !merged &&
                [1, 2, 3].map((n) => (
                  <motion.span
                    key={n}
                    aria-hidden
                    exit={{ opacity: 0 }}
                    style={{ left: n * 25 + "%" }}
                    className="pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-ink/25 via-ink/12 to-transparent"
                  />
                ))}

              <AnimatePresence mode="wait" initial={false}>
                {onBoard ? (
                  <motion.div
                    key="board"
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
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.55, ease: "easeIn" }}
                  >
                    <InboxMock
                      merged={merged}
                      answered={answered}
                      typed={shown}
                      typing={!still && answered && shown.length < reply.length}
                    />
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
        </div>
      </div>
    </section>
  );
}

/* Reveals `text` one character at a time once `on` is true. A reply that
   simply appears is a string; a reply that types is a machine working, and
   that difference is most of what this section is selling.

   It holds whatever it has typed when `on` goes false rather than resetting,
   so scrolling back up does not rewind the sentence mid-word. */
function useTypewriter(text: string, on: boolean) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!on || n >= text.length) return;
    const id = window.setTimeout(() => setN((v) => v + 1), 28);
    return () => window.clearTimeout(id);
  }, [on, n, text.length]);

  return text.slice(0, n);
}
