"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ArrowIcon, CheckIcon, channelIcons } from "@/components/ui/icons";
import { pipeline } from "@/lib/content/pipeline";
import { unanswered } from "@/lib/content/queues";
import funnelArt from "@/public/funnel-final.png";
import funnelUpright from "@/public/funnel-upright.png";

/* ==========================================================================
   SECTION 4 - THE SALES PIPELINE, AS A FUNNEL
   --------------------------------------------------------------------------
   The funnel, its five rings and the arrow are painted artwork -
   public/funnel-final.png, 2048x768. Everything else is live on top of it:
   the six labels, the Won badge at the arrow tip, the glow behind each ring,
   and the four deals that ride the gates.

   THE ARTWORK'S GLOW IS ALPHA ZERO, AND THAT TURNED OUT TO BE A GIFT. The
   file was painted as a neon scene - every ring throwing coloured light onto
   a dark ground - but the alpha channel is effectively binary: the solid
   shapes are opaque and every pixel of that glow is fully transparent. Drop
   it on a page and none of the light arrives.

   So the glow is rebuilt in CSS, one blurred ellipse per ring, positioned
   from the same measurements as everything else and coloured to match. That
   is better than the baked version: it can be tuned, it costs no pixels, and
   it cannot go stale if the artwork is recut.

   THE SECTION IS LIGHT, ON AN ARTWORK PAINTED FOR A DARK ROOM, and that
   works only because the file's alpha is near-binary: 0.4% of its pixels
   fall between opaque and clear, so there is almost no dark edge left to
   fringe against white. The tube then reads the way the client's own
   reference reads - a strong dark funnel on a pale ground.

   WHAT THAT COSTS, AND WHERE IT IS PAID. Every colour in the artwork is
   pitched for a dark scene, and as type on white they fail: the painted
   yellow measures 1.7:1. So GATES carries TWO colours per gate. `glow` is
   the ring's own hue and tints the ground beneath it; `ink` is that hue
   taken deep enough to clear AA as text. They are never the same value, and
   the yellow has to travel furthest - it lands as a deep amber, because a
   yellow that is still yellow cannot be read on white at any weight.

   THE NUMBERS BELOW WERE MEASURED, NOT GUESSED - every ring isolated by hue
   and its column-density peak, and its top and bottom edges read off the
   file. If the artwork is replaced, re-measure and change GATES, ART and BOX
   and nothing else, because every overlay is positioned from those alone.

   THE BOX IS BIGGER THAN THE ARTWORK in three directions, each for a reason:
   above, because deals ride on the first gate and its crown is 93px from the
   top of the file; below, for the labels; and to the right, because the
   arrow tip is AT the frame edge and the Won badge has to go somewhere.

   THE TAPER WAS QUERIED AND OVERRULED. A narrowing funnel implies fewer
   survive each stage. The client's call, twice; the caption says the stages
   are examples and no figure appears anywhere, so the shape carries no
   number.

   BELOW 1296px THE FUNNEL STANDS UP. The artwork is 2048x768 and the rail
   holds it at a 1180px floor, which with this section's 104px of padding
   needs a 1284px viewport - so every tablet and most laptops were dragging
   it sideways, not just phones. A drag nobody is told about is a stage
   nobody sees, and the stage off the right-hand edge was Won.

   Rotating the PICTURE does not work - a 768x2048 tube is 912px tall on a
   phone before a single label is placed. So below 1296px there is a second
   piece of artwork, funnel-upright.png, and the stages are a list beneath
   it rather than labels beside it.

   THE STAGES SIT BESIDE THE FUNNEL AT EVERY WIDTH. From 640px up the two
   columns balance: the artwork is 897x1752 - 1:1.95 - so at 304px wide it
   stands 594px, which is about what six stages of name-plus-sentence take.

   THE TWO COLUMNS PULL IN OPPOSITE DIRECTIONS AND THAT IS THE WHOLE
   PROBLEM. The funnel's height is fixed by its width - 1.95 times it. The
   list's height moves the other way: a wide text column wraps fewer lines
   and gets SHORTER. So widening the funnel shortens the list and lengthens
   the picture at the same time, and the gap between them opens twice as
   fast as it looks like it should.

   At 304px the funnel column stood 339px taller than the list on a laptop,
   which is what it looked like. Measured across 640px to 1290px, 208px of
   funnel inside a 704px block holds the two within +73/-7 of each other at
   every width. That is why the block is capped well below the page's own
   max width: letting it run to 960px makes the text column wide enough to
   unwrap every line, and the list collapses to 416px against a 489px
   picture.

   A PHONE CANNOT BE BALANCED AT ALL. The closest is a 120px funnel, which
   is 282px of column against a much taller list. Wider is worse, for the
   reason above, so the picture is simply smaller than the list it sits
   beside and is centred against it.

   A TETHER WAS TRIED IN THAT GAP AND TAKEN OUT AGAIN - a hairline running
   from the arrow's point down to a target parked beside the Won row. It
   filled the space and it was wrong: a 300px thread down a phone screen
   reads as a loading bar, and it pushed the target so far from the arrow
   that the arrow stopped pointing at anything. The badge sits under the
   arrow's point where it belongs, and the leftover height stays empty.

   A 1:5 version of the artwork would let the rings sit beside their own
   rows and make the tether unnecessary. It is the one asset that would
   change this section again.

   The two columns are NOT aligned ring-to-row, and that is a limit of the
   file rather than a choice. The rings are 27%, 16%, 15%, 12%, 12% and 15%
   of the height apart - they crowd as the funnel narrows, the way
   perspective makes them - where six rows of type are near enough equal. To
   pin row five to ring five, that row would have to be 54px tall at 768px,
   which is less than a heading and a sentence take. They run in the same
   order and share a colour, and that is the join.

   NOTHING MOVES BELOW 1296px. The deals that ride the wide funnel are gone
   here - asked for, and right: four names appearing and vanishing beside a
   static picture reads as a glitch rather than as travel, because there is
   no tube for them to be travelling along. The stage colours and the light
   pools stay, fixed. The wide funnel keeps its animation.

   A funnel is normally drawn vertically in any case. The horizontal one is
   the client's reference and it is kept where there is room for it.

   ONE TIMER, TWO DRAWINGS. Both read the same `beat`, the same `live` and
   the same GATES, so the deals are in the same place in both and neither
   can drift from the artwork. The switch is CSS, not JavaScript, so there
   is no first-paint flash - and the artwork is lazy-loaded inside a
   display:none box, so a phone never downloads it.
   ========================================================================== */

const ART = { w: 2048, h: 768, top: 120 };
const BOX = { w: 2378, h: 1180 };

/* Measured from public/funnel-final.png, then shifted down by ART.top.
   `ink` is the label colour and `glow` is the light behind the ring. They
   are not the same value: the label has to clear contrast as text on the
   deep ground, the glow only has to look like the ring it belongs to. */
const GATES = [
  { x: 459.5, rx: 132, top: 213, bottom: 803, ink: "#0b3fd4", glow: "#1f6cff" },
  { x: 853.5, rx: 84, top: 257, bottom: 746, ink: "#0a6e97", glow: "#39b8f5" },
  {
    x: 1147.0,
    rx: 115,
    top: 287,
    bottom: 729,
    ink: "#077a72",
    glow: "#16c79a",
  },
  {
    x: 1454.5,
    rx: 106,
    top: 325,
    bottom: 709,
    ink: "#9a6a00",
    glow: "#f5b211",
  },
  { x: 1736.0, rx: 92, top: 359, bottom: 680, ink: "#b3261e", glow: "#f34044" },
  /* The Won badge, drawn below - same shape of entry as a gate so the labels
     and the deals loop over all six without a special case. */
  { x: 2200, rx: 100, top: 424, bottom: 624, ink: "#0a7a38", glow: "#34d399" },
];

const GOAL_AT = GATES.length - 1;
/* A white tick on this green measures 2.4:1 and fails; the deep ground on it
   measures 8.1:1, so the tick is cut out of the badge rather than laid on. */
const GOAL = { x: 2200, y: 524, r: 100, fill: "#34d399", tick: "#04234d" };

/* How far above a gate its deal rides. */
const RIDE = 70;

/* WHERE EACH RING SITS IN public/funnel-upright.png (897x1752), found by
   the silhouette rather than by eye: a ring protrudes past the tube, so
   every one is a local maximum in the image's width-per-row profile. The
   sixth entry is the arrowhead, which is where Won goes.

   `y` is the ring's centre as a percentage of the image HEIGHT and `w` its
   outer width as a percentage of the image WIDTH. Both are percentages so
   the overlays hold at any rendered size. Replace the artwork and these
   six pairs are the only numbers that change. */
const UPRIGHT = [
  { y: 22.5, w: 85 },
  { y: 38.0, w: 71 },
  { y: 53.7, w: 59 },
  { y: 67.1, w: 49 },
  { y: 78.0, w: 38 },
  { y: 90.1, w: 23 },
];

/* EVERY LABEL SITS ON ONE BASELINE, and that is the fix for the section
   reading dull. They used to hang a fixed distance below each ring, which
   stepped them up as the funnel narrowed - the arrangement the reference
   uses. It looked right and read badly: the rings are 400 to 600px tall and
   their lower halves are the darkest part of the artwork, so five of the six
   labels were set in a bright colour ON a dark ring rather than on the
   ground. The contrast problem was never against the background.

   58 units below the DEEPEST ring puts all six on clean ground. A hairline
   runs from each ring down to its own label so nothing is orphaned, which
   is what the stepping was doing before. */
const LABEL_Y = Math.max(803, 746, 729, 709, 680, 624) + 58;

const DEALS = pipeline.deals
  .map((d) => {
    const hit = unanswered.find((e) => e.id === d.id);
    return hit ? { ...d, ...hit } : null;
  })
  .filter((d): d is NonNullable<typeof d> => d !== null);

/* One beat past the last deal's last stop, so the funnel empties before it
   fills again rather than snapping back mid-flow. */
const BEATS = Math.max(...DEALS.map((d) => d.start + d.path.length)) + 1;
const STEP_MS = 1150;

/* Where each deal stands when motion is switched off. Not "everybody at the
   end" - that would stack three cards on the badge. One won, one lost, two
   still working, on gates that are not neighbours, so the still frame makes
   the same argument the animation makes. */
const STILL_STEP = [5, 2, 4, 0];

export function SalesPipeline() {
  const railRef = useRef<HTMLDivElement>(null);

  /* Only the wide funnel animates now, and it is the only thing this
     observer watches. Below 1296px the rail is display:none, so this never
     fires and the timer never starts - which is exactly the intent. */
  const inView = useInView(railRef, { amount: 0.3 });
  const reduced = useReducedMotion();
  const still = reduced === true;

  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (still || !inView) return;
    const id = window.setTimeout(
      () => setBeat((b) => (b + 1) % BEATS),
      STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [still, inView, beat]);

  /* The artwork and the labels are placed in percentages, but the deals are
     MOVED with transforms, which need pixels - cards animating on `left`
     would repaint the whole graphic on every frame. */
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const sync = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const live = DEALS.map((deal, i) => {
    const step = still ? STILL_STEP[i] : beat - deal.start;
    if (step < 0 || step >= deal.path.length) return null;
    return {
      deal,
      at: deal.path[step],
      closed: step === deal.path.length - 1,
    };
  }).filter((d): d is NonNullable<typeof d> => d !== null);

  /* Typed as number rather than inferred: `path` comes off an `as const`
     object, so the inferred set would be a union of literals and every
     lookup by a plain index would fail to compile. */
  const busy = new Set<number>(live.map((d) => d.at));

  const marks = [...pipeline.stages, pipeline.goal];
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <section id="pipeline" className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-surface px-4 pt-24 pb-16 md:rounded-[2rem] md:px-10 md:pt-32 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-brand-tint to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-b from-transparent to-bg/70" />
        </div>

        {/* ---- THE HEADING ---- */}
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-ink/70">
            <span className="size-1.5 rounded-full bg-brand" />
            {pipeline.eyebrow}
          </p>

          <h2
            className="h2-section mx-auto mt-6 max-w-[20ch] font-extrabold"
            style={{ "--h2": "4em" } as React.CSSProperties}
          >
            {pipeline.heading}
          </h2>

          <p className="lead-section mx-auto mt-7 max-w-[60ch] text-muted">
            {pipeline.lead}
          </p>
        </div>

        {/* ---- THE FUNNEL, STANDING UP ---- below 1296px. */}
        <VerticalFunnel marks={marks} />

        {/* ---- THE FUNNEL, LYING DOWN ---- 1296px and up, where the
            artwork's 1180px floor clears this section's padding. */}
        <div className="relative mt-10 hidden min-[81rem]:block">
          <div
            ref={railRef}
            className="relative mx-auto max-w-6xl min-w-[1180px]"
            style={{ aspectRatio: `${BOX.w} / ${BOX.h}` }}
          >
            {/* ---- THE LIGHT THE ARTWORK THREW AWAY ----
                One blurred ellipse per ring, behind the image, brightening
                when a deal is standing on that gate. */}
            {GATES.map((g, i) => (
              <div
                key={`glow-${i}`}
                aria-hidden
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] transition-opacity duration-500"
                style={{
                  left: pct(g.x, BOX.w),
                  top: pct((g.top + g.bottom) / 2, BOX.h),
                  width: pct(g.rx * 2.8, BOX.w),
                  height: pct((g.bottom - g.top) * 1.25, BOX.h),
                  background: g.glow,
                  /* A fraction of what it is on a dark ground. Coloured
                     blur on white stops being light and becomes a stain
                     very fast - this is a tint pool under each ring, not
                     a glow around it. */
                  opacity: busy.has(i) ? 0.3 : 0.14,
                }}
              />
            ))}

            <Image
              src={funnelArt}
              alt="The sales pipeline drawn as a funnel: five rings on a narrowing tube, ending in an arrow."
              sizes="(max-width: 1279px) 1180px, 1152px"
              className="absolute"
              style={{
                left: 0,
                top: pct(ART.top, BOX.h),
                width: pct(ART.w, BOX.w),
                height: pct(ART.h, BOX.h),
              }}
            />

            {/* ---- THE WON BADGE ----
                One overlay SVG in BOX units. The container's aspect ratio is
                set to the same numbers, so a circle here is a circle on
                screen at every width - which a percentage-sized div is not. */}
            <svg
              aria-hidden
              viewBox={`0 0 ${BOX.w} ${BOX.h}`}
              className="absolute inset-0 h-full w-full"
            >
              <circle
                cx={GOAL.x}
                cy={GOAL.y}
                r={GOAL.r + 20}
                fill="none"
                stroke={GOAL.fill}
                strokeWidth={16}
                opacity={busy.has(GOAL_AT) ? 0.42 : 0}
                style={{ transition: "opacity 450ms ease" }}
              />
              <circle cx={GOAL.x} cy={GOAL.y} r={GOAL.r} fill={GOAL.fill} />
              <circle
                cx={GOAL.x}
                cy={GOAL.y}
                r={GOAL.r * 0.7}
                fill="none"
                stroke={GOAL.tick}
                strokeWidth={9}
              />
              <path
                d={`M ${GOAL.x - 34},${GOAL.y + 2} l 23,25 l 45,-52`}
                fill="none"
                stroke={GOAL.tick}
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* ---- THE TETHERS ----
                Ring to label, so a label on a common baseline still clearly
                belongs to the gate above it. It emerges from the ring rather
                than butting against it - solid at the label end, nothing at
                the ring end. */}
            {GATES.map((g, i) => (
              <div
                key={`tether-${i}`}
                aria-hidden
                className="pointer-events-none absolute w-[2px] -translate-x-1/2 transition-opacity duration-500"
                style={{
                  left: pct(g.x, BOX.w),
                  top: pct(g.bottom + 12, BOX.h),
                  height: pct(LABEL_Y - 14 - (g.bottom + 12), BOX.h),
                  background: `linear-gradient(180deg, transparent, ${g.glow})`,
                  opacity: busy.has(i) ? 0.95 : 0.4,
                }}
              />
            ))}

            {/* ---- THE LABELS ----
                On a plate, because the ground behind them carries the glow
                and bare type on a lit background is the thing that read as
                dull. And each one LIGHTS UP as its deal arrives: the section
                is about stages, so the stage being worked should be the
                brightest thing in the row. */}
            {marks.map((mark, i) => {
              const g = GATES[i];
              const on = busy.has(i);
              return (
                <div
                  key={mark.name}
                  /* 128px, NOT 124, AND THE TYPE IS 16.5px NOT 18.
                     The tightest pair on the rail is Appointment Booked and
                     Discussion: measured off the artwork their centres are
                     139.7px apart at the rail's 1180px minimum width. At
                     18px the word "Appointment" is wider than the plate's
                     inner box and spilled past both its edges, which is
                     what put it into Discussion. At 16.5px it fits inside,
                     and 128px leaves about 12px of air between the two
                     plates. If a stage name ever gets longer than
                     "Appointment", re-check this against that 139.7px. */
                  className="absolute w-[128px] -translate-x-1/2"
                  style={{ left: pct(g.x, BOX.w), top: pct(LABEL_Y, BOX.h) }}
                >
                  <motion.div
                    animate={{ scale: on ? 1.06 : 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl px-2 py-3 text-center backdrop-blur-sm transition-colors duration-500"
                    style={{
                      background: on
                        ? "rgba(255,255,255,0.97)"
                        : "rgba(255,255,255,0.88)",
                      boxShadow: on
                        ? `inset 0 0 0 1.5px ${g.ink}, 0 16px 34px -16px ${g.ink}`
                        : "inset 0 0 0 1px var(--color-line), 0 6px 18px -12px rgba(10,16,32,0.35)",
                    }}
                  >
                    <p
                      className="text-[16.5px] leading-tight font-extrabold text-balance"
                      style={{ color: g.ink }}
                    >
                      {mark.name}
                    </p>
                    <p
                      className="mt-2 text-[13.5px] leading-snug transition-colors duration-500"
                      style={{
                        color: on ? "var(--color-ink)" : "var(--color-muted)",
                      }}
                    >
                      {mark.line}
                    </p>
                  </motion.div>
                </div>
              );
            })}

            {/* ---- THE DEALS, RIDING ON TOP ----
                Where the reference puts its walking figures. Ours are the
                four customers the page has followed since section 2, so the
                thing crossing the funnel is a named enquiry rather than a
                pictogram. */}
            {box.w > 0 && (
              <AnimatePresence>
                {live.map(({ deal, at, closed }) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: (GATES[at].x / BOX.w) * box.w,
                      y: ((GATES[at].top - RIDE) / BOX.h) * box.h,
                    }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{
                      duration: still ? 0 : 0.78,
                      ease: [0.33, 1, 0.42, 1],
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                    }}
                    className="absolute top-0 left-0 z-10"
                  >
                    <DealPill
                      deal={deal}
                      closed={closed}
                      won={deal.path[deal.path.length - 1] === GOAL_AT}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        <p className="relative mt-2 text-center text-[13.5px] font-semibold text-muted">
          {pipeline.boardNote}
        </p>

        <div className="relative mt-12 text-center md:mt-14">
          <Link
            href={pipeline.moreHref}
            className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-7 py-4 text-[16px] font-bold text-ink shadow-[0_2px_12px_-6px_rgba(10,16,32,0.25)] transition-colors hover:border-line-strong hover:bg-brand-tint md:text-[17px]"
          >
            {pipeline.moreLabel}
            <ArrowIcon className="size-4 text-brand transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* A deal, riding on top of a gate.
   IT STACKS WHEN IT CLOSES rather than growing sideways. The gates are about
   135px apart on screen at the narrow end and a name and a reason on one
   line is wider than that, so the reason goes underneath. It reads better
   too: the name arrives first and the verdict lands under it. */
/* ==========================================================================
   THE FUNNEL, UPRIGHT - below 1296px
   --------------------------------------------------------------------------
   The artwork on the left and the six stages beside it, stacking under it on
   a phone. See the note at the top of the file for why the rows are not
   pinned to the rings and why nothing moves here.

   THE LIGHT POOLS ARE THE SAME DEVICE THE WIDE FUNNEL USES. One blurred
   ellipse of each ring's own colour, behind the image. Behind rather than
   on top: a coloured wash over a glossy 3D render reads as a stain, where
   the same wash underneath reads as the ring throwing light. They are fixed
   at the dim value here, because nothing is standing on a gate to brighten
   them.

   THE WON BADGE IS AN OVERLAY, NOT PART OF THE PICTURE. The upright artwork
   ends in a bare arrow tip, where the wide funnel's ends in a green target
   with a tick cut out of it. Without it the last row is a stage the funnel
   does not draw, and "Won" is the one the whole picture is pointing at. It
   straddles the tip so the arrow reads as landing in it.
   ========================================================================== */
function VerticalFunnel({
  marks,
}: {
  marks: readonly { name: string; line: string }[];
}) {
  return (
    <div className="mt-8 min-[81rem]:hidden">
      {/* max-w-[44rem], not the page's usual width - see the note at the
          top. Wider unwraps the list and the picture wins by 300px. */}
      <div className="mx-auto flex max-w-[44rem] items-center gap-3 sm:gap-10 md:gap-14">
        {/* ---- THE ARTWORK ---- */}
        {/* Picture, then target. Nothing between them and nothing that
            grows - see the note at the top for the thread that used to be
            here. */}
        <div className="flex w-[7.5rem] shrink-0 flex-col items-center sm:w-[13rem]">
          <div className="relative w-full">
            {UPRIGHT.map((ring, i) => (
              <span
                key={`pool-${i}`}
                aria-hidden
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[34px]"
                style={{
                  top: `${ring.y}%`,
                  width: `${ring.w * 1.15}%`,
                  height: "7%",
                  background: GATES[i].glow,
                  opacity: 0.16,
                }}
              />
            ))}

            <Image
              src={funnelUpright}
              alt="The sales pipeline drawn as a funnel standing upright: five coloured rings down a narrowing tube, ending in a downward arrow."
              sizes="208px"
              className="relative h-auto w-full"
            />

          </div>

          {/* THE TARGET THE ARROW POINTS INTO, and it is the wide funnel's
              badge redrawn rather than a green circle with an icon dropped
              in it - same fill, same inner ring, same tick geometry, same
              deep ink. The first attempt was a plain disc with a generic
              check glyph and it read as a status chip rather than as the
              end of the funnel.

              White on this green measures 2.4:1 and fails; the deep ink
              measures 8.1, which is why the tick is cut in ink rather than
              laid on in white. */}
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            className="mt-2 w-10 shrink-0 drop-shadow-[0_10px_20px_rgba(10,16,32,0.28)] sm:mt-3 sm:w-16"
          >
            <circle cx="100" cy="100" r="100" fill={GOAL.fill} />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke={GOAL.tick}
              strokeWidth="9"
            />
            <path
              d="M 66,102 l 23,25 l 45,-52"
              fill="none"
              stroke={GOAL.tick}
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ---- THE STAGES ---- */}
        <ol className="min-w-0 flex-1 space-y-3 sm:space-y-3.5">
          {marks.map((mark, i) => {
            const gate = GATES[i];
            const won = i === GOAL_AT;

            return (
              /* A CARD EACH, the way the wide funnel gives every stage its
                 own plate rather than a line in a list. Six names and six
                 sentences in one column run together into a paragraph with
                 bold bits; six cards are six things.

                 The tint and the edge are the ring's own colour, which is
                 what says which card belongs to which ring now that they
                 are not side by side. 5% and 24% - any more and six cards
                 in a column become six competing colours. */
              <li
                key={mark.name}
                className="rounded-2xl border p-3.5 sm:p-4"
                style={{
                  borderColor: `color-mix(in oklab, ${gate.glow} 24%, transparent)`,
                  background: `color-mix(in oklab, ${gate.glow} 5%, var(--color-surface))`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  {/* `ink` not `glow` - the glow values are pitched for a
                      dark scene and the amber measures 1.7:1 on white. */}
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-lg text-[12.5px] font-extrabold sm:size-7 sm:text-[13px]"
                    style={{
                      color: gate.ink,
                      background: `color-mix(in oklab, ${gate.glow} 18%, transparent)`,
                    }}
                  >
                    {won ? <CheckIcon className="size-3 sm:size-3.5" /> : i + 1}
                  </span>

                  <h3 className="min-w-0 text-[16.5px] leading-tight font-extrabold text-balance sm:text-[17.5px]">
                    {mark.name}
                  </h3>
                </div>

                <p className="mt-2 text-[14px] leading-snug text-muted sm:text-[15px]">
                  {mark.line}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function DealPill({
  deal,
  closed,
  won,
}: {
  deal: (typeof DEALS)[number];
  closed: boolean;
  won: boolean;
}) {
  const Icon = channelIcons[deal.channel];

  return (
    <div
      className={
        "w-[142px] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-surface px-2.5 py-2 shadow-[0_16px_34px_-14px_rgba(10,16,32,0.55)] " +
        (closed
          ? won
            ? "border-[#12703f]/45"
            : "border-[#a3392f]/45"
          : "border-line")
      }
    >
      <div className="flex items-center gap-1.5">
        <Icon
          className="size-4 shrink-0"
          style={{ color: `var(--color-${deal.channel})` }}
        />
        <span className="truncate text-[14px] font-bold">{deal.name}</span>
        {!closed && (
          <span className="ml-auto grid size-[22px] shrink-0 place-items-center rounded-full bg-[#e8f0ff] text-[10px] font-bold text-[#2f5fd0]">
            {deal.owner}
          </span>
        )}
      </div>

      {closed && (
        <span
          className={
            "mt-1.5 flex items-center gap-1 rounded-md px-1.5 py-1 text-[11.5px] leading-tight font-bold " +
            (won
              ? "bg-[#e6f7ee] text-[#12703f]"
              : "bg-[#fbeceb] text-[#a3392f]")
          }
        >
          {won && <CheckIcon className="size-3 shrink-0" />}
          {deal.reason}
        </span>
      )}
    </div>
  );
}
