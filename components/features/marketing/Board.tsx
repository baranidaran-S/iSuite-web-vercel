"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { CheckIcon, channelIcons } from "@/components/ui/icons";
import {
  AdsMark,
  CalendarMark,
  featureMarks,
} from "@/components/ui/featureIcons";
import { DocGlyph, RepeatGlyph } from "@/components/features/kit/glyphs";
import {
  ARRIVALS,
  LAND,
  Limits,
  MARKETING,
  MARKETING_PARTS,
  Names,
  useTick,
  type MarketingPart,
  type Source,
} from "@/components/features/marketing/shared";

/* ==========================================================================
   03 MARKETING - THE BOARD
   --------------------------------------------------------------------------
   The chapter as a live board, the kind a station hangs over its
   platforms, one panel per feature: YOUR ADS running, the broadcasts
   DEPARTING, the leads ARRIVING. The rows turn over as new leads come in,
   a broadcast's status moves on, the ad's figures sync from Meta - so the
   board shows the three features working, not only names them. Under
   each panel, that feature in words: every capability and every limit,
   nothing to press.

   EACH PANEL CARRIES ITS FEATURE'S NAME, LARGE. The board first named its
   panels as a board would - Arrivals, Departures - with the features in
   small print, and a reader had to work out that Arrivals was Lead
   Capture. The board's words are now the small print.

   EACH FEATURE'S WORDS ARE WITH ITS OWN PANEL. They were one list below
   the whole board, 600px under the picture on a desktop and 1,000px on a
   phone. From 1280 the three panels share one board and each column's
   words sit under it; from 1024 each panel sits beside its words; on a
   phone each panel is followed by them. One set of elements does all
   three - the grid places them.

   THE BOARD IS A PICTURE (aria-hidden) and the words are the page, with
   each feature's name its heading. The names on it are the site's cast
   (see ARRIVALS in shared.tsx).

   NO FIGURES ON IT. Spend, clicks and the rest are named and marked as
   synced, never given a number: a number here would be a statistic
   nobody measured.

   Live only while it is on screen, never under reduced motion - where it
   is the finished picture: the latest leads in, every figure synced.
   ========================================================================== */

/* Each departure's status moves on as the board turns - one message
   being delivered and read, one template waiting on Meta. */
const DEPARTURES: readonly {
  name: string;
  to: string;
  when: string;
  steps: readonly string[];
}[] = [
  { name: "Saturday slots open", to: "Segment · First visit", when: "Now", steps: ["Sending", "Delivered", "Read", "Replied"] },
  { name: "Check-up reminder", to: "Tag · Check-up due", when: "Sat 09:00", steps: ["Scheduled"] },
  { name: "Whitening offer", to: "Group · Coimbatore", when: "—", steps: ["With Meta", "Approved"] },
  { name: "Diwali timings", to: "Uploaded list", when: "Fri 18:00", steps: ["Scheduled", "Opt-outs skipped"] },
];

/* WHERE EACH OF AN AD'S FIGURES COMES FROM. The first four are Meta's; the
   rest are the business's own, from its pipeline - iSuite AI joins the two
   per ad. The board first put all seven under "Synced from Meta", and won
   deals are nowhere in Meta. */
const FROM_META = ["Spend", "Impressions", "Clicks", "Leads"];
const FROM_PIPELINE = ["Won deals", "Deal value", "Cash collected"];
const METRICS = [...FROM_META, ...FROM_PIPELINE];

/* The leads this panel's ad brought in, as they arrive in Lead Capture's
   panel - one enquiry traced to its ad, which is the point of Meta Ads. */
const FROM_THIS_AD = ARRIVALS.filter((a) => a.via.startsWith("Dental check-up"));

const TICK = 3200;

/* What the board calls each feature's panel. */
const BOARD_NAME: Record<string, string> = {
  "meta-ads": "Your ads",
  broadcasts: "Departures",
  "lead-capture": "Arrivals",
};

/* A feature's column on the board - written out, so the classes exist. */
const COL = ["xl:col-start-1", "xl:col-start-2", "xl:col-start-3"];

const FIRST = ARRIVALS.findIndex((a) => a.status === "Duplicate matched");

function SourceIcon({ src }: { src: Source }) {
  const cls = "size-3.5";
  if (src === "ads") return <AdsMark className={`${cls} text-[#8ec5ff]`} />;
  if (src === "form") return <DocGlyph className={`${cls} text-white/80`} />;
  if (src === "cal") return <CalendarMark className={`${cls} text-white/80`} />;
  const Icon = channelIcons[src];
  return <Icon className={cls} style={{ color: src === "web" ? "#ffffff" : `var(--color-${src})` }} />;
}

/* A split-flap cell: its top half a shade lighter than its bottom, the
   way a flap display's two leaves meet. A hairline across the middle, as
   on the real thing, ran through words this small like a strikethrough -
   "Owner approved" read as cancelled. */
function Flap({
  children,
  tone = "plain",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "plain" | "good" | "wait" | "dim";
  className?: string;
}) {
  const tones = {
    plain: "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.11)_50%,rgba(255,255,255,0.06)_50%)] text-white/90",
    good: "bg-[linear-gradient(to_bottom,rgba(18,167,232,0.32)_50%,rgba(18,167,232,0.22)_50%)] text-[#bfe9ff]",
    wait: "bg-[linear-gradient(to_bottom,rgba(245,181,68,0.26)_50%,rgba(245,181,68,0.17)_50%)] text-[#ffd892]",
    dim: "bg-white/[0.04] text-white/40",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] leading-none font-bold whitespace-nowrap transition-colors duration-300 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ---- the three panels ------------------------------------------------------- */

/* META ADS: the campaign built and approved, then its figures coming in
   one after another - Meta's, then the pipeline's - then the qualified
   leads going back.

   ITS OWN CLOCK. The figures move twice a second, and on the board's clock
   that redrew the whole chapter each time; here it redraws this panel. */
function AdsBody({ live }: { live: boolean }) {
  const sync = useTick(live, 450);
  const k = sync % (METRICS.length + 6);
  const synced = live ? Math.min(k, METRICS.length) : METRICS.length;
  const back = !live || k > METRICS.length;
  const figure = (m: string, i: number) => (
    <Flap key={m} tone={i < synced ? "plain" : "dim"} className="max-sm:px-1.5 max-sm:text-[11px]">
      {m}
      {i < synced ? (
        <CheckIcon className="size-2.5 text-[#34d399]" />
      ) : (
        <span className="size-2.5 animate-spin rounded-full border-[1.5px] border-white/30 border-t-transparent" />
      )}
    </Flap>
  );
  const label = "block text-[10.5px] font-bold tracking-[0.14em] text-white/60 uppercase";
  return (
    <>
      <span className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-[#0a6187]">
          <AdsMark className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-[14.5px] leading-tight font-extrabold">Dental check-up</span>
          <span className="block truncate text-[12px] text-white/55">Campaign, ad set, 2 ads, lead form</span>
        </span>
      </span>
      <span className="mt-3 flex flex-wrap gap-1.5">
        <Flap tone="good">
          <CheckIcon className="size-3" />
          Owner approved
        </Flap>
        <Flap>Daily cap set</Flap>
      </span>
      <span className={`${label} mt-3 sm:mt-4`}>From Meta</span>
      <span className="mt-1.5 flex flex-wrap gap-1 sm:gap-1.5">
        {FROM_META.map((m, i) => figure(m, i))}
      </span>
      <span className={`${label} mt-2.5 sm:mt-3`}>From your pipeline</span>
      <span className="mt-1.5 flex flex-wrap gap-1 sm:gap-1.5">
        {FROM_PIPELINE.map((m, i) => figure(m, FROM_META.length + i))}
      </span>
      <Flap tone={back ? "good" : "dim"} className="mt-3 self-start">
        <RepeatGlyph className="size-3" />
        Qualified leads back to Meta
      </Flap>
      {/* On the board, where this panel stands as tall as the others, its
          foot was empty: the leads this ad brought, pinned there. */}
      <span className="mt-auto hidden border-t border-white/10 pt-3.5 xl:block">
        <span className={label}>Leads from this ad</span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          {FROM_THIS_AD.map((a) => (
            <span
              key={a.who}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] py-1 pr-2.5 pl-1 text-[12px] font-bold"
            >
              <span className="grid size-5 place-items-center rounded-full bg-[#12a7e8]/30 text-[10px] font-extrabold text-[#bfe9ff]">
                {a.who[0]}
              </span>
              {a.who}
              <SourceIcon src={a.src} />
            </span>
          ))}
        </span>
      </span>
    </>
  );
}

/* BROADCASTS: four templates on their way, each status moving on. */
function DeparturesBody({ live, tick }: { live: boolean; tick: number }) {
  return (
    <>
      <ol className="[perspective:900px]">
        {DEPARTURES.map((d, k) => {
          const step = d.steps[live ? tick % d.steps.length : d.steps.length - 1];
          return (
            <li
              key={d.name}
              className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 border-t border-white/[0.07] py-2 first:border-t-0 first:pt-0 sm:py-2.5 ${
                k === 3 ? "max-sm:hidden" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="flex items-baseline gap-2">
                  <span className="truncate text-[14px] font-bold">{d.name}</span>
                  <span className="shrink-0 text-[11.5px] font-semibold text-white/55 tabular-nums max-[380px]:hidden">{d.when}</span>
                </span>
                <span className="block truncate text-[12px] text-white/55">{d.to}</span>
              </span>
              <span
                key={live ? `${tick}-${step}` : "rest"}
                className={live && tick > 0 && d.steps.length > 1 ? "anim-flap" : ""}
                style={{ "--d": `${k * 90}ms` } as React.CSSProperties}
              >
                <Flap tone={step === "With Meta" || step === "Scheduled" ? "wait" : "good"}>{step}</Flap>
              </span>
            </li>
          );
        })}
      </ol>
      <span className="mt-2.5 flex items-center gap-1.5 text-[12px] text-white/50">
        <span className="size-1.5 rounded-full bg-white/40" />
        Customers who opted out are skipped on every send
      </span>
    </>
  );
}

/* LEAD CAPTURE: leads arriving, newest on top, the rows turning over.
   It opens on Farah, whose second form was matched to her first. */
function ArrivalsBody({ live, tick }: { live: boolean; tick: number }) {
  const n = ARRIVALS.length;
  const newest = (FIRST + tick) % n;
  const rows = [0, 1, 2, 3].map((k) => ARRIVALS[(newest - k + n) % n]);
  return (
    <ol className="[perspective:900px]">
      {rows.map((r, k) => (
        <li
          key={live ? `${tick}-${k}` : k}
          className={`grid grid-cols-[2.9rem_minmax(0,1fr)_auto] items-center gap-x-2.5 border-t max-[380px]:grid-cols-[minmax(0,1fr)_auto] border-white/[0.07] py-2 first:border-t-0 first:pt-0 sm:py-2.5 ${
            live && tick > 0 ? "anim-flap" : ""
          } ${k === 3 ? "max-sm:hidden" : ""}`}
          style={{ "--d": `${k * 70}ms`, opacity: 1 - k * 0.13 } as React.CSSProperties}
        >
          <span className="text-[12.5px] font-semibold text-white/55 tabular-nums max-[380px]:hidden">{r.t}</span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-bold">{r.who}</span>
            <span className="flex items-center gap-1.5 truncate text-[12px] text-white/55">
              <SourceIcon src={r.src} />
              {r.from}
            </span>
          </span>
          <Flap tone={r.status === "Duplicate matched" || r.status === "Same record" ? "good" : "plain"}>
            {r.status}
          </Flap>
        </li>
      ))}
    </ol>
  );
}

/* ---- a feature in words, under its panel ------------------------------------ */

/* BELOW 1024px A GROUP IS ONE RUN OF TEXT - "Built in iSuite AI: Campaigns
   · Ad sets · ..." - rather than a heading over a list: the same words a
   line shorter each, which on a phone was a fifth of the chapter. */
function Words({ part, className = "" }: { part: MarketingPart; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[17px] leading-snug font-extrabold tracking-[-0.01em] lg:text-[19px]">
        {part.detail.title}
      </p>
      <ul className="mt-3 grid gap-y-2.5 sm:grid-cols-2 sm:gap-x-6 lg:mt-3.5 lg:grid-cols-1 lg:gap-y-3">
        {part.detail.groups.map((g) => (
          <li key={g.id} className="text-[13.5px] leading-normal text-muted lg:leading-relaxed">
            <span className="font-extrabold text-ink max-lg:mr-1 lg:flex lg:items-center lg:gap-2 lg:text-[14px] lg:leading-snug">
              <span aria-hidden className="hidden size-1.5 shrink-0 rounded-full lg:inline-block" style={{ backgroundColor: MARKETING.accent }} />
              {g.label}
              <span className="lg:hidden">:</span>
            </span>
            <span className="lg:mt-1 lg:block lg:pl-3.5">
              <Names names={g.items.map((c) => c.name)} />
            </span>
          </li>
        ))}
      </ul>
      <Limits part={part} className="mt-3.5 border-t border-line pt-3 max-lg:leading-snug lg:mt-4 lg:pt-3.5" />
    </div>
  );
}

export function Board() {
  const [inView, setInView] = useState(false);
  /* 1280px and up, where the three panels share one board. It starts
     true, as the server draws it; it decides only whether the feature bar
     treats the board as one section (see below), never the layout. */
  const [wide, setWide] = useState(true);
  const still = useReducedMotion() === true;
  const live = inView && !still;
  const tick = useTick(live, TICK);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  /* LIVE WHILE A PANEL IS ON SCREEN - the panels, not the words under
     them, which were keeping it running for a reader a screen below. */
  useEffect(() => {
    const els = panels.current.filter((el): el is HTMLDivElement => el !== null);
    const showing = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) showing.add(e.target);
          else showing.delete(e.target);
        }
        setInView(showing.size > 0);
      },
      { threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const newest = (FIRST + tick) % ARRIVALS.length;

  return (
    /* SIDE BY SIDE, THE FEATURE BAR NAMES THE CHAPTER. Three panels level
       with each other cross the bar's line together, and by position it
       named whichever came last. data-compact with no feature open makes
       it say "Marketing" there; below 1280, where the panels come one
       after another, it names each as it is read. */
    <section aria-label="Marketing features" data-compact={wide ? "" : undefined} className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-surface px-4 py-12 text-ink md:rounded-[2rem] md:px-10 md:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute top-[8%] left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[#12a7e8]/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-[84rem]">
          <p className="text-[12.5px] font-extrabold tracking-[0.14em] text-ink/65 uppercase">
            {MARKETING.name}, live
          </p>

          {/* THREE LAYOUTS FROM ONE SET OF ELEMENTS. From 1280 the panels
              share one board, each column's words under its panel. From
              1024 to 1279 each panel sits beside its own words, a feature
              to a row: three across at 1024 left each panel 290px, and cut
              "Farah Q." to "Fara..." and broke "Broadcasts and Templates"
              over three lines. Below that, each panel is followed by its
              words. */}
          <div className="relative isolate mt-5 grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-12 xl:grid-cols-3 xl:gap-x-5 xl:gap-y-0 xl:px-5">
            {/* The board itself: one dark ground behind the clock and the
                three panels. */}
            <div
              aria-hidden
              className="-z-10 hidden rounded-[1.75rem] bg-[#06102a] shadow-[0_40px_80px_-40px_rgba(6,16,42,0.9),inset_0_0_0_1px_rgba(255,255,255,0.08)] xl:col-span-3 xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:-mx-5 xl:-mb-5 xl:block"
            />

            {/* The clock and the sync, across the top of the board. Not
                where the panels come one at a time, which already carry
                both - the arrivals' times, the ad's figures. */}
            <div
              aria-hidden
              className="hidden items-center justify-between gap-3 text-white xl:col-span-3 xl:col-start-1 xl:row-start-1 xl:flex xl:pt-5 xl:pb-4"
            >
              <span className="inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[0.14em] text-white/80 uppercase">
                <span className="relative flex size-2">
                  {live && <span className="absolute inset-0 animate-ping rounded-full bg-[#34d399] opacity-60" />}
                  <span className="relative size-2 rounded-full bg-[#34d399]" />
                </span>
                Today
                <span className="tracking-normal text-white/55 tabular-nums">{ARRIVALS[newest].t}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 py-1 text-[11.5px] font-bold text-white/70">
                <CheckIcon className="size-3 text-[#34d399]" />
                Synced with Meta
              </span>
            </div>

            {MARKETING_PARTS.map((part, i) => {
              const Mark = featureMarks[part.item.mark];
              return (
                <Fragment key={part.slug}>
                  <div
                    ref={(el) => {
                      panels.current[i] = el;
                    }}
                    id={part.slug}
                    data-feature={part.slug}
                    className={`${LAND} ${COL[i]} flex flex-col rounded-2xl bg-[#06102a] p-4 text-white shadow-[0_30px_60px_-36px_rgba(6,16,42,0.9)] md:p-5 lg:self-start xl:row-start-2 xl:self-stretch xl:bg-white/[0.045] xl:shadow-none`}
                  >
                    {/* The feature's name, large - the board's own name
                        for the panel is the small print. */}
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white" style={{ color: MARKETING.deep }}>
                          <Mark className="size-[18px]" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] font-extrabold tracking-[0.1em] text-white/50">{part.n}</span>
                          <h3 className="text-[17.5px] leading-tight font-extrabold">{part.item.name}</h3>
                        </span>
                      </span>
                      <span aria-hidden className="shrink-0 text-[10.5px] font-extrabold tracking-[0.18em] text-white/60 uppercase">
                        {BOARD_NAME[part.slug]}
                      </span>
                    </div>
                    <div aria-hidden className="mt-3.5 flex flex-1 flex-col">
                      {part.slug === "meta-ads" && <AdsBody live={live} />}
                      {part.slug === "broadcasts" && <DeparturesBody live={live} tick={tick} />}
                      {part.slug === "lead-capture" && <ArrivalsBody live={live} tick={tick} />}
                    </div>
                  </div>
                  <Words part={part} className={`${COL[i]} mt-3.5 mb-8 last:mb-0 lg:my-0 xl:row-start-3 xl:mt-12`} />
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
