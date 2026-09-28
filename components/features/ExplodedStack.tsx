"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { featureMinis } from "@/components/features/minis";
import { groupMarks } from "@/components/ui/featureIcons";
import { features } from "@/lib/content/features";

/* ==========================================================================
   THE PRODUCT, TAKEN APART - the picture in the /features hero
   --------------------------------------------------------------------------
   One app, drawn as four sheets stacked in space: Conversations on top,
   then Sales, Marketing and Operations, each sheet carrying the real
   interface of its own features.

   IT PLAYS ONCE, AND THE STACK IS WHERE IT RESTS:

     1  flat         one product, the sheets lying on each other
     2  the stack    they separate - each sheet tucked under the one above,
                     its name and its front row showing
     3  the tour     each sheet in turn opens a gap, turns up to the
                     visitor and is read, while the others fold back to
                     their names - Conversations, Sales, Marketing,
                     Operations
     4  the stack    back to 2, and it stays there

   THE STACK IS THE REST STATE ON PURPOSE. It is the picture this version
   was chosen for, and the one moment all four layers can be seen together
   - which is what "thirteen features, one product" looks like. It must
   look like a STACK: an earlier rest spread the sheets 250 apart, every
   one showed nearly its whole face, and it read as four cards laid out
   rather than one thing in layers. At 180 each tucks under the one above.

   ONCE, NOT FOR EVER. Twenty seconds of touring tells the story; past that
   it is motion on the page with nothing left to say, which the brief asks
   to be sparing with (§29), and a loop that never ends needs a way for a
   visitor to stop it.

   THE CALLOUTS SIT BESIDE THEIR OWN SHEETS. From 1280px each one is
   positioned level with the middle of its sheet's visible band, and a
   leader line runs from it to that sheet's edge - the convention every
   exploded drawing uses, and the answer to "which label is which layer".
   They used to be an evenly spaced column beside an unevenly spaced
   stack, so each drifted further from its sheet than the one above it:
   Marketing's sat beside the Sales sheet. The positions are CALCULATED,
   by projecting the stack the way the browser does - see the geometry
   below - so they cannot drift when a number changes.

   Pointing at, tapping or tabbing into a callout turns its sheet up and
   ends the tour; moving away lets the stack settle. Every feature name is
   a link down the page.

   THE SHEETS CAN BE TAPPED TOO, and below 1280px that is the main way in.
   There the callouts are a grid UNDER the stack, so a visitor tapping the
   fourth one turned a sheet up in a picture that had scrolled off the top
   of their phone - the tap did something, somewhere they could not see.
   So tapping a sheet opens it where the eye already is, a line under the
   stack says so, and tapping a callout (anywhere but its links) brings
   the stack back into view before turning its sheet up.

   THE PICTURE IS aria-hidden. Every word in it is repeated as real text in
   the callouts, which is where a screen reader gets the page - and where
   the reading order, and the links, actually are.
   ========================================================================== */

/* ---- THE GEOMETRY ---------------------------------------------------------
   The scene is laid out once at 1000 wide and scaled whole to its column.
   Every number here is in the scene's own units.

   THE SPACING WAS SOLVED, NOT TUNED BY EYE. A model of the browser's
   projection - checked against the live page to the pixel - was searched
   for the smallest stack that meets three rules, in screen pixels at full
   width:

     - the sheet being read is never overhung by the one above it
     - every other sheet shows at least 56px - its name and a sliver
     - at rest each lower sheet shows 135 to 165px - a stack, not a spread

   Change one of these and all five states need checking again; the
   callout positions follow on their own. */
const SCENE = { w: 1000, h: 930 };
const PLANE = { w: 780, h: 450 };
const ANCHOR = 0.73; // where the stack stands, as a share of the scene's height
const EYE_Y = 0.2; // the perspective origin, as a share of the scene's height
const DEPTH = 2400; // the perspective distance
const LEAN = 57; // the stack's lean away from the viewer, degrees
const SPREAD = 180; // between sheets at rest
const TIGHT = 75; // between sheets that are not being read
const UNDER = 220; // under the sheet being read, so the one below still shows
const OVER = 360; // over the sheet being read, so nothing overhangs it...
const OVER_STEP = 30; // ...and more the deeper it sits, which perspective demands
const FACE = -27; // the sheet being read turns up to 30 degrees
const FOLD = 14; // the others lean further back, out of its way
/* At rest the stack sits higher than the anchor. The anchor is placed for
   the tallest reading state; the rest state is shorter, and left there it
   would sit low under an empty band of sky. */
const REST_LIFT = -30;

const ZOOM = 1.15; // the interface on every sheet, drawn larger
const HOLD_MS = 2400; // how long the stack is shown before the tour starts
const TURN_MS = 4200; // how long each sheet is up for on the tour
const GUTTER = 24; // the grid gap between the scene and the callouts, px

/* Top of the stack first - Conversations, where every enquiry lands, down
   to Operations underneath everything. */
const LAYERS = features.groups;
const COUNT = LAYERS.length;

/* How far above the bottom sheet each sheet stands, built up from the
   bottom one gap at a time. */
function heights(active: number | null) {
  const z = LAYERS.map(() => 0);
  for (let i = COUNT - 2; i >= 0; i--) {
    const gap =
      active === null
        ? SPREAD
        : i + 1 === active
          ? OVER + OVER_STEP * (active - 1)
          : i === active
            ? UNDER
            : TIGHT;
    z[i] = z[i + 1] + gap;
  }
  return z;
}

/* Where a point on a sheet lands on the screen, in scene units - the same
   sums the browser does: the sheet's own tilt, its height off the stack,
   the stack's lean, then the perspective. */
function project(z: number, tilt: number, lift: number, x: number, y: number) {
  const a = (LEAN * Math.PI) / 180;
  const t = (tilt * Math.PI) / 180;
  const Y = y * Math.cos(t);
  const Z = y * Math.sin(t) + z;
  const y1 = Y * Math.cos(a) - Z * Math.sin(a);
  const z1 = Y * Math.sin(a) + Z * Math.cos(a);
  const k = DEPTH / (DEPTH - z1);
  const cx = SCENE.w / 2;
  const cy = SCENE.h * ANCHOR + lift;
  const ey = SCENE.h * EYE_Y;
  return { x: cx + x * k, y: ey + (cy + y1 - ey) * k };
}

/* WHERE EACH CALLOUT GOES. For each sheet at rest: the middle of the band
   of it that shows - from the bottom edge of the sheet above, which
   covers the rest of it, down to its own bottom edge - and how far its
   right-hand edge reaches at that height, which is where the leader line
   ends. Worked out once, from the constants above. */
const MARKS = (() => {
  const z = heights(null);
  const half = PLANE.h / 2;
  const bottoms = z.map((zi) => project(zi, 0, REST_LIFT, 0, half).y);
  return z.map((zi, i) => {
    const top = project(zi, 0, REST_LIFT, 0, -half).y;
    const from = i === 0 ? top : Math.max(top, bottoms[i - 1]);
    const mid = (from + bottoms[i]) / 2;
    /* The sheet's right edge at that height: walk down the sheet until its
       projection reaches the band's middle. Monotonic, so a scan is
       enough and it only ever runs once. */
    let y = -half;
    while (y < half && project(zi, 0, REST_LIFT, 0, y).y < mid) y += 2;
    const edge = project(zi, 0, REST_LIFT, PLANE.w / 2, y).x;
    return { y: (mid / SCENE.h) * 100, reach: SCENE.w - edge };
  });
})();

/* How each sheet lays out its own features. Written per group because the
   groups are different sizes - two, four, three and four.

   MARKETING IS A TALL COLUMN AND TWO SHORT ONES, not three across. Three
   minis in a row came to about 250px on a 450px sheet, and once a sheet
   turns up to be read, the empty top of it is on show. The ad takes the
   left column with its fuller version, and the template and the lead stack
   beside it. */
const SHEET_GRID: Record<string, string> = {
  conversations: "grid-cols-[1.08fr_1fr]",
  sales: "grid-cols-2 grid-rows-2",
  marketing: "grid-cols-[1.1fr_1fr] grid-rows-2",
  operations: "grid-cols-2 grid-rows-2",
};

/* The features that get their fuller version on a sheet, and the one that
   spans both of its sheet's rows. */
const RICH = new Set(["one-inbox", "ai-sales-assistant", "meta-ads"]);
const SPAN: Record<string, string> = { "meta-ads": "row-span-2" };

type Phase = "flat" | "opening" | "tour" | "rest";

/* `built` lists the features whose sections are on the page. A feature
   still to be built is named in its callout but not linked - a link to a
   section that is not there scrolls nowhere, which reads as broken. Left
   out, every feature is linked. */
export function ExplodedStack({ built }: { built?: readonly string[] }) {
  /* REDUCED MOTION IS READ ONLY ONCE THE PAGE HAS HYDRATED, and that is a
     bug fix. motion's hook answers from matchMedia on the browser's very
     first render, but the server cannot know the setting and renders the
     sheets flat. So for anyone with reduced motion on, the first client
     render disagreed with the server's HTML - React reported it and, as it
     does for a mismatched attribute, left the server's version in place.
     The stack stayed flat for good, the one thing the setting was meant to
     prevent. Held back one render, both sides agree, and the switch to the
     rest state is an ordinary update. */
  const prefersReduced = useReducedMotion() === true;
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const reduced = hydrated && prefersReduced;

  const rootRef = useRef<HTMLDivElement>(null);
  /* 15%, because this block is the stack AND the callouts - most of a
     screen tall - and on a 768px laptop only a quarter of it is on screen
     when the page opens. At 25% the tour waited for a scroll nobody had
     made. */
  const inView = useInView(rootRef, { amount: 0.15 });

  /* THE SEQUENCE. 650ms in, so the separation starts as the headline above
     finishes arriving rather than competing with it; the tour begins once
     the separation has settled, because its stagger - the sheets lift one
     after another - must be gone before a sheet turns up, or every turn
     inherits it and lags.

     Each step only moves FORWARD from the one it expects, so a visitor who
     reaches for the callouts in the first two seconds is not overruled by
     a timer that was already running. */
  const [phase, setPhase] = useState<Phase>("flat");
  useEffect(() => {
    const opening = window.setTimeout(
      () => setPhase((p) => (p === "flat" ? "opening" : p)),
      650,
    );
    const tour = window.setTimeout(
      () => setPhase((p) => (p === "opening" ? "tour" : p)),
      650 + 1700,
    );
    return () => {
      window.clearTimeout(opening);
      window.clearTimeout(tour);
    };
  }, []);

  /* Reduced motion gets the rest state from the first frame after
     hydration - the stack, nothing moving on its own - and the callouts
     still turn a sheet up for anyone who reaches for them. */
  const current: Phase = reduced ? "rest" : phase;

  /* THE TOUR. -1 is the stack held before the first sheet turns up; 0 to 3
     are the sheets; after the last one the stack settles and stays. The
     timer only runs while the picture is on screen, so nobody misses the
     tour by being further down the page. */
  const [step, setStep] = useState(-1);
  const touring = current === "tour" && inView;

  useEffect(() => {
    if (!touring) return;
    const id = window.setTimeout(
      () => {
        if (step >= COUNT - 1) setPhase("rest");
        else setStep((s) => s + 1);
      },
      step < 0 ? HOLD_MS : TURN_MS,
    );
    return () => window.clearTimeout(id);
  }, [touring, step]);

  /* THE VISITOR'S SHEET, once they have reached for one. */
  const [picked, setPicked] = useState<number | null>(null);
  const take = (i: number) => {
    setPicked(i);
    setPhase("rest");
  };
  const release = () => setPicked(null);

  /* A FINGER HAS NO "AWAY". The list lets its sheet settle when the
     pointer leaves it, which is right for a mouse and wrong for a tap: the
     browser invents a leave for the old spot as soon as the page scrolls,
     so a sheet turned up by a tap would drop the moment the stack scrolled
     into view to show it. After a touch, only another tap moves it. */
  const touched = useRef(false);

  const separated = current !== "flat";
  const active =
    current === "tour"
      ? step >= 0
        ? step
        : null
      : current === "rest"
        ? picked
        : null;
  const z = heights(active);

  const boxRef = useRef<HTMLDivElement>(null);

  /* Below 1280px the callouts sit under the stack. A tap on one that
     would turn a sheet up out of sight first scrolls the stack back in,
     unless all of it is already on screen: its top just under the header
     if it fits, and otherwise its FOOT at the bottom of the window. A
     tablet's stack is taller than the tablet - 842px on a 1024x768 iPad -
     and the top of the scene is the empty sky kept for the tallest
     reading state, while a turned-up sheet's name is on its front edge,
     low down. The scroll follows the page's own smooth scrolling, which
     reduced motion already turns off. */
  const reveal = () => {
    const el = boxRef.current;
    if (!el || window.innerWidth >= 1280) return;
    const r = el.getBoundingClientRect();
    const clear = 88;
    if (r.top >= clear && r.bottom <= window.innerHeight) return;
    const fits = r.height <= window.innerHeight - clear;
    window.scrollTo({
      top:
        window.scrollY +
        (fits ? r.top - clear : r.bottom - window.innerHeight + 12),
    });
  };

  /* THE SCALE IS CSS, like every other drawing on the page (kit/
     ScaledScreen). It was measured in a script, which meant the server's
     HTML drew the scene at full size and it shrank once the script ran -
     618px of page vanishing from under a phone's reader, and every link
     into the page from elsewhere landing that far out. Now the box takes
     its height from its width, and the scene reads its scale off the box
     with tan(atan2(a, b)), which is a/b: right in the first HTML, and
     nothing moves. */
  return (
    <div
      ref={rootRef}
      onPointerDown={(e) => {
        touched.current = e.pointerType !== "mouse";
      }}
      className="anim-fade @container relative mx-auto mt-8 max-w-[82rem] md:mt-10 xl:grid xl:grid-cols-[1fr_22rem] xl:gap-6"
      style={{ "--d": "0.45s" } as React.CSSProperties}
    >
      {/* ---- THE SCENE ---- */}
      <div
        ref={boxRef}
        aria-hidden
        className="@container pointer-events-none relative w-full"
        style={{ aspectRatio: `${SCENE.w} / ${SCENE.h}`, maxHeight: SCENE.h }}
      >
        <div
          className="absolute top-0 left-1/2 origin-top"
          style={
            {
              width: SCENE.w,
              height: SCENE.h,
              "--s": `min(1, tan(atan2(100cqw, ${SCENE.w}px)))`,
              transform: "translateX(-50%) scale(var(--s))",
            } as React.CSSProperties
          }
        >
          {/* The light the stack stands in. */}
          <span className="pointer-events-none absolute top-[45%] left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[90px]" />

          <div
            className="absolute inset-0 [perspective:2400px]"
            style={{ perspectiveOrigin: `50% ${EYE_Y * 100}%` }}
          >
            {/* STRAIGHT ON, NO TWIST. The stack used to turn 8 degrees as
                well as lean, which ran every line of type on a sheet
                downhill. Leaning alone, the lines stay level and only get
                shorter - and on the sheet that turns up, barely that. It
                also keeps every sheet's edge horizontal, which is what lets
                a callout sit level with its sheet. */}
            <div
              className="absolute left-1/2 [transform-style:preserve-3d]"
              style={{
                top: `${ANCHOR * 100}%`,
                width: PLANE.w,
                height: PLANE.h,
                transform: `translate(-50%, calc(-50% + ${
                  active === null ? REST_LIFT : 0
                }px)) rotateX(${LEAN}deg)`,
                transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {LAYERS.map((group, i) => {
                const isUp = active === i;
                const tilt = isUp ? FACE : active !== null ? FOLD : 0;
                return (
                  <div
                    key={group.slug}
                    /* Tappable: opens this sheet, or lets it settle again
                       if it is the one already up. The scene around it
                       stays pointer-events-none, so only the sheets
                       themselves answer. */
                    onClick={() => (isUp ? release() : take(i))}
                    className="pointer-events-auto absolute inset-0 cursor-pointer rounded-[30px] p-4"
                    style={{
                      transform: `translateZ(${
                        separated ? z[i] : (COUNT - 1 - i) * 6
                      }px) rotateX(${tilt}deg)`,
                      /* Staggered only while the stack first opens - the
                         top sheet lifts first, as if coming off the pile. */
                      transition: `transform ${
                        current === "opening" ? "1.25s" : "0.9s"
                      } cubic-bezier(0.16, 1, 0.3, 1) ${
                        current === "opening" ? i * 0.09 : 0
                      }s, box-shadow 0.4s ease`,
                      /* OPAQUE. A sheet you can see through shows the sheet
                         underneath it, and two layers of interface
                         overprinting each other read as a mess, not as
                         depth. The group's colour is a tint at the foot,
                         mixed into white rather than laid over it. */
                      background: `linear-gradient(160deg, #ffffff 0%, #f8faff 55%, color-mix(in oklab, ${group.accent} 9%, #ffffff) 100%)`,
                      /* A ring, and a shadow kept tight. A wide glow in the
                         group's colour lies ON the sheet below a leaning
                         sheet, and read as a smear across the next layer. */
                      boxShadow: isUp
                        ? `0 0 0 2px ${group.accent}, 0 26px 50px -30px ${group.deep}`
                        : `0 0 0 1px rgba(255,255,255,0.9), 0 30px 70px -36px rgba(10,16,32,0.5)`,
                    }}
                  >
                    <Sheet group={group} quiet={active !== null && !isUp} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Below 1280px, where the stack answers taps and the callouts are
          out of its way, a line saying so - a picture does not look like
          something that can be pressed. */}
      <p className="mt-3 flex items-center justify-center gap-2 text-[13px] font-semibold text-ink/55 xl:hidden">
        <span className="size-1.5 rounded-full bg-brand" />
        <span className="[@media(pointer:fine)]:hidden">Tap a layer to open it</span>
        <span className="hidden [@media(pointer:fine)]:inline">Click a layer to open it</span>
      </p>

      {/* ---- THE CALLOUTS ----
          FROM 1280px, EACH ONE SITS LEVEL WITH ITS OWN SHEET, at the
          projected middle of that sheet's band, with a leader line to its
          edge. Below 1280px they are an ordinary grid under the stack -
          two across from 640px, one on a phone - where there is no side to
          sit beside.

          Pointing turns a sheet up and holds it until the pointer leaves
          the list; a tap does the same; focus bubbles up from the links, so
          tabbing through the features turns the stack with them. Any of the
          three ends the tour. */}
      <ol
        onMouseLeave={() => {
          if (!touched.current) release();
        }}
        className="relative mt-6 grid gap-3 sm:grid-cols-2 xl:mt-0 xl:block"
      >
        {LAYERS.map((group, i) => {
          const GroupMark = groupMarks[group.mark];
          const isUp = active === i;
          const mark = MARKS[i];
          return (
            <li
              key={group.slug}
              onMouseEnter={() => take(i)}
              onFocus={() => take(i)}
              onBlur={release}
              onClick={(e) => {
                take(i);
                if (!(e.target as HTMLElement).closest("a")) reveal();
              }}
              className="relative xl:absolute xl:inset-x-0 xl:top-[var(--y)] xl:-translate-y-1/2"
              style={{ "--y": `${mark.y}%` } as React.CSSProperties}
            >
              {/* THE LEADER. From the callout to its sheet's edge, level
                  with the band it names, ending on a dot - drawn only while
                  the stack rests, because a sheet being read has moved and
                  a line to where it used to be points at nothing. */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-full hidden -translate-y-1/2 items-center transition-opacity duration-500 xl:flex"
                style={{
                  /* The reach at the scene's scale, which is its column's
                     width over 1000 - and at 1280 and up, where the leader
                     is drawn, that column is the root less the callouts'
                     22rem and the gap. */
                  width: `calc(min(${mark.reach}px, ${mark.reach / SCENE.w} * (100cqw - 22rem - ${GUTTER}px)) + ${GUTTER - 6}px)`,
                  opacity: active === null && separated ? 1 : 0,
                }}
              >
                <span
                  className="size-2 shrink-0 rounded-full ring-4 ring-white/80"
                  style={{ backgroundColor: group.accent }}
                />
                <span
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, ${group.accent}, color-mix(in oklab, ${group.accent} 40%, transparent))`,
                  }}
                />
              </span>

              {/* h-full below 1280px, where the callouts are a grid and the
                  two in a row should end level; at 1280 and up each sits on
                  its own and takes the height of what is in it. */}
              <div
                className="relative h-full overflow-hidden rounded-2xl border p-3 backdrop-blur-md transition-colors duration-300 xl:h-auto"
                style={{
                  borderColor: isUp ? group.accent : "rgba(255,255,255,0.8)",
                  backgroundColor: isUp
                    ? "rgba(255,255,255,0.94)"
                    : "rgba(255,255,255,0.66)",
                }}
              >
                <p className="flex items-center gap-2.5">
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-md text-white"
                    style={{ backgroundColor: group.deep }}
                  >
                    <GroupMark className="size-3.5" />
                  </span>
                  <span className="text-[15.5px] leading-6 font-extrabold">
                    {group.name}
                  </span>
                  <span
                    className="ml-auto text-[12.5px] font-extrabold"
                    style={{ color: group.deep }}
                  >
                    {group.n}
                  </span>
                </p>
                {/* COMPACT ON PURPOSE, AND MEASURED. A callout that sits
                    beside its sheet can be no taller than the gap between
                    its sheet's band and the next one - 139px at full width,
                    121px at 1280. So every group's names have to set on two
                    lines: Operations' last two came to 323px against 322 of
                    room and took a third line, which put its callout
                    straight into Marketing's. At 12px with 8px of padding
                    they fit, and with a 24px header every callout comes to
                    about 110px - measured at 1280, the tightest width, that
                    leaves daylight between each pair. No arrow in the pill
                    for the same reason; the hover still says it goes
                    somewhere. */}
                <ul className="mt-1.5 flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      {/* Same box either way - these chips are measured to
                          fit two lines per callout - so a feature still to
                          come is only quieter, never wider. */}
                      {!built || built.includes(item.slug) ? (
                        <a
                          href={`#${item.slug}`}
                          className="inline-flex items-center rounded-full bg-surface px-2 py-[3px] text-[12px] font-bold text-ink ring-1 ring-black/5 transition-colors hover:bg-[var(--tint)] hover:text-[var(--acc)]"
                          style={
                            {
                              "--acc": group.deep,
                              "--tint": `${group.accent}14`,
                            } as React.CSSProperties
                          }
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span
                          title="Coming soon"
                          className="inline-flex cursor-default items-center rounded-full bg-surface/70 px-2 py-[3px] text-[12px] font-bold text-ink/45 ring-1 ring-black/5"
                        >
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* The time left on this sheet's turn of the tour. Keyed on
                    the step so it starts from nothing each time, and drawn
                    only while the tour is running - once a visitor has taken
                    over, it would be a bar counting down to nothing. */}
                {isUp && touring && (
                  <motion.span
                    key={step}
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: TURN_MS / 1000, ease: "linear" }}
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left"
                    style={{ backgroundColor: group.accent }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* One sheet: its features, and its group's name along the front edge.

   EVERYTHING SITS AT THE FRONT. The sheet above covers the back of each
   resting sheet, so the front edge is the part of it that always shows -
   its name, and the front row of its interface.

   QUIET SHEETS SIT UNDER A FILM, AND THE NAME SITS ON TOP OF IT. The film
   is white rather than opacity, because a sheet taken see-through shows
   the sheet below it through its own interface. It is light - a sheet
   that is not up still has to be recognisable - and the name is drawn
   above it so the four layers can always be told apart. At rest there is
   no film at all: nothing is up, so nothing is quiet. */
function Sheet({
  group,
  quiet,
}: {
  group: (typeof features)["groups"][number];
  quiet: boolean;
}) {
  return (
    <div className="relative flex h-full flex-col justify-end">
      {/* zoom rather than scale: it enlarges the interface AND the room it
          lays out in, so the grid still fills the sheet instead of a scaled
          copy spilling past its edges. */}
      <div
        className={`grid items-end gap-3 ${SHEET_GRID[group.slug]}`}
        style={{ zoom: ZOOM }}
      >
        {group.items.map((item) => {
          const Mini = featureMinis[item.slug];
          return (
            <div
              key={item.slug}
              className={`min-w-0 ${SPAN[item.slug] ?? ""}`}
            >
              <Mini rich={RICH.has(item.slug)} />
            </div>
          );
        })}
      </div>

      <span
        className="pointer-events-none absolute inset-0 -m-4 rounded-[30px] bg-white transition-opacity duration-500"
        style={{ opacity: quiet ? 0.38 : 0 }}
      />

      <p
        className="relative mt-3 flex items-center gap-2 px-1 text-[20px] font-extrabold"
        style={{ color: group.deep }}
      >
        <span
          className="rounded-md px-2 py-0.5 text-[14px] text-white"
          style={{ backgroundColor: group.deep }}
        >
          {group.n}
        </span>
        {group.name}
      </p>
    </div>
  );
}
