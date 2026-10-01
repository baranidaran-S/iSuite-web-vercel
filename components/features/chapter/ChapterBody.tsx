"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import { featureMarks } from "@/components/ui/featureIcons";
import { chapterFlows } from "@/components/features/chapter/FlowScene";
import { features } from "@/lib/content/features";

/* ==========================================================================
   THE CHAPTER HEADING'S MOVING PARTS
   --------------------------------------------------------------------------
   The heading itself is the Server Component's and arrives as children;
   this lays it out beside the chapter's flow, with the chapter's features
   under it, and holds the one piece of state the two share - which
   feature is being pointed at, so the flow can light that feature's part.

   ONE GRID, TWO ORDERS. From 1024px the flow takes the right-hand column
   the full height of the card and the words and the feature cards stack
   on the left. Below that everything is one column, and the flow sits
   between the words and the cards - the picture after the sentence that
   introduces it, and the links last, where a thumb is.

   FROM 1024, WITH THE TALL DRAWING UNTIL 1280. Side by side from 1024
   was tried once with the wide drawing, and rejected: in a 485px column
   it came out at 58%, its labels about 10px. So the chapters stacked below
   1280 - and each came to 1,160-1,460px, the flow in a band of its own
   and the space beside the heading empty. The tall drawing, the phone's,
   is 420px wide, and beside the words from 1024 to 1279 it is drawn at
   92% and up (FlowScene's WIDE_SHOWN and TALL_SHOWN): 750-1,010px a
   chapter at 1024, 400-500px shorter than stacked. The chapter's name
   fits beside it, the heading a step smaller below 1280: "Conversations"
   is 419px in its 471px column at 1024.

   ON A PHONE THE CARD LOSES ITS ARROW. The whole card is the link, and
   the arrow's circle took 52px from a sentence that had 160.

   FOUR FEATURES STAND THEIR CARDS UP. Two across in the left-hand column,
   a card laid on its side - mark, words, arrow in a row - left its words
   102px at 1440, and "Contacts and Custom Fields" took four lines. Stood
   up, the mark on top and the arrow in its corner, the words get the
   card's whole width; below 1024 they sit two across from 640 rather
   than stretching the card's width. A chapter of two keeps them lying
   down, one above the other, where they have the column to themselves.
   ========================================================================== */

type Group = (typeof features)["groups"][number];

export function ChapterBody({
  group,
  children,
}: {
  group: Group;
  children: React.ReactNode;
}) {
  const Flow = chapterFlows[group.slug];
  const [lit, setLit] = useState<string | null>(null);
  const upright = group.items.length > 2;
  /* THREE ARE A ROW, NOT TWO AND ONE. Two across left Marketing's third
     card alone on a line of its own. Stood up, three share a row from
     640px; from 1024, in the column beside the flow, three stood up would
     be 140-200px each, so there they lie down one above the other, the
     way a chapter of two does. */
  const three = group.items.length === 3;

  /* THE PICTURE IS THE CHAPTER'S FLOW. It was once the hero's exploded
     stack with this chapter's layer lit, kept aside because it was liked;
     it went on 2026-09-30 with the stack itself and the old feature list
     it drew (git history, be265ee: chapter/ChapterScene.tsx, scenes.tsx).

     IT HOLDS STILL WHEN ASKED, AND WHEN NOBODY CAN SEE IT. Its messages
     travel the wires for as long as the page is open, so it has a pause
     (WCAG 2.2.2); and off screen it stops, rather than running four
     chapters' animations nobody is looking at. Under reduced motion it is
     still already, and the button is not drawn. */
  const flowBox = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [away, setAway] = useState(true);
  useEffect(() => {
    const el = flowBox.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setAway(!e[e.length - 1].isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative mx-auto grid max-w-[84rem] gap-y-10 px-5 pt-16 pb-10 md:px-10 md:pt-20 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:grid-rows-[1fr_auto] lg:gap-x-12 lg:gap-y-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.2fr)] xl:pt-24 xl:pb-16">
      <div className="lg:col-start-1 lg:row-start-1 lg:self-end">{children}</div>

      {Flow && (
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div
            ref={flowBox}
            aria-hidden
            data-still={paused || away ? "" : undefined}
            className="[&[data-still]_*]:[animation-play-state:paused]!"
          >
            <Flow lit={lit} accent={group.accent} deep={group.deep} />
          </div>
          <div className="mt-2 flex justify-end motion-reduce:hidden">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={`${paused ? "Play" : "Pause"} the ${group.name} picture`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-[12px] font-bold text-white/80 transition-colors hover:border-white/45 hover:text-white focus-visible:outline-white"
            >
              <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden>
                {paused ? (
                  <path d="M7 5v14l12-7L7 5z" />
                ) : (
                  <>
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </>
                )}
              </svg>
              {paused ? "Play" : "Pause"}
            </button>
          </div>
        </div>
      )}

      {/* ---- THE FEATURES IN THIS CHAPTER ----
          The features.ts `line` - the summaries written for this page and
          never shown on the home page. Pointing at one, or tabbing to it,
          lifts its part of the scene. */}
      <ul
        onMouseLeave={() => setLit(null)}
        className={`grid gap-3 lg:col-start-1 lg:row-start-2 ${
          three ? "sm:grid-cols-3 lg:grid-cols-1" : upright ? "sm:grid-cols-2" : ""
        }`}
      >
        {group.items.map((item, i) => {
          const Mark = featureMarks[item.mark];
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                onMouseEnter={() => setLit(item.slug)}
                onFocus={() => setLit(item.slug)}
                onBlur={() => setLit(null)}
                className={`group/c relative flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-md transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.13] md:p-5 ${
                  upright ? "sm:h-full sm:flex-col sm:items-start sm:gap-4" : ""
                } ${three ? "lg:h-auto lg:flex-row lg:items-center" : ""}`}
                style={{ "--deep": group.deep } as React.CSSProperties}
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-white shadow-[0_10px_24px_-12px_rgba(2,8,24,0.8)] sm:size-12"
                  style={{ color: group.deep }}
                >
                  <Mark className="size-5 sm:size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`flex items-baseline gap-2 ${
                      upright ? "sm:flex-col sm:gap-1" : ""
                    } ${three ? "lg:flex-row lg:gap-2" : ""}`}
                  >
                    <span className="text-[12px] font-extrabold tracking-[0.1em] text-white/50">
                      {group.n}.{i + 1}
                    </span>
                    <span className="text-[17.5px] leading-tight font-extrabold text-white">
                      {item.name}
                    </span>
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-white/70">
                    {item.line}
                  </span>
                </span>
                <span
                  className={`hidden size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition-all duration-300 group-hover/c:border-white group-hover/c:bg-white group-hover/c:text-[var(--deep)] sm:grid ${
                    upright ? "sm:absolute sm:top-5 sm:right-5 md:top-6 md:right-6" : ""
                  } ${three ? "lg:static" : ""}`}
                >
                  <ArrowIcon className="size-4 rotate-90 transition-transform duration-300 group-hover/c:translate-y-0.5" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
