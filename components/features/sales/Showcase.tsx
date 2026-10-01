"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { featureMarks } from "@/components/ui/featureIcons";
import { ScaledScreen } from "@/components/features/kit/ScaledScreen";
import { PHONE, Phone } from "@/components/features/sales/phone";
import {
  Inside,
  Know,
  LAND,
  SALES,
  SALES_PARTS,
} from "@/components/features/sales/shared";

/* ==========================================================================
   02 SALES - THE SHOWCASE
   --------------------------------------------------------------------------
   The chapter's six features beside a phone holding the app's own screen
   for each - chosen for Chapter 02 over a live desk and a pipeline board
   (see shared.tsx).

   THE PHONE SHOWS THE REAL PRODUCT. It held a hand-drawn screen for each
   of the four features the chapter had. On 2026-09-30 the chapter took
   the app's own six, and for a day a browser window held the client's
   desktop screenshots of them - at a quarter of their size, too small to
   read. The phone came back with the app's own phone screens in it
   (sales/phone.tsx), which read at their real size.

   FROM 1024px IT IS TOLD THE WAY CHAPTER 01 IS: SCROLLED, ONE FEATURE AT A
   TIME. The six are one list, each open and an even 40px apart, and the
   phone is pinned beside them - the feature that has come up to the
   reading line (LINE) is the one lit, the rest dimmed, and the phone
   slides to its screen (2026-10-01). It
   was six tabs and a tour that played by itself, twelve seconds a feature:
   scrolling on, a visitor saw Leads Management and nothing else unless
   they waited or clicked. The section is several screens tall now, as
   each of Chapter 01's features is, and nothing moves unless the visitor
   scrolls - so it needs no pause.

   BELOW 1024px THE FEATURES ARE CARDS IN A ROW THAT SWIPES SIDEWAYS,
   under the phone, which follows the card. The next card shows at the
   edge and dots below say where the row is. All of them open one under
   another made the chapter several screens long on a phone.

   THE FEATURE BAR NAMES THE ONE LIT HERE (data-compact, data-open, and a
   "features:turn" event when it changes) - see FeatureBar.tsx.
   ========================================================================== */

/* Each feature's phone screen, in the list's order. */
const SCREENS: Record<string, string> = {
  "leads-management": "/features/phone/leads.webp",
  "contacts-management": "/features/phone/contacts.webp",
  "sales-pipeline-management": "/features/phone/pipelines.webp",
  "follow-up-management": "/features/phone/followups.webp",
  "booking-management": "/features/phone/bookings.webp",
  "quotation-invoice": "/features/phone/quotes.webp",
};
const PHONE_SCREENS = SALES_PARTS.map((p) => SCREENS[p.slug]);

const WIDE = "(min-width: 1024px)";

/* From 1024px, how far down the window a card's top must come to be lit. */
const LINE = 360;

/* On a phone: card i brought to the start of its row. Nothing to do where
   the list is not a row that scrolls - the list from 1024px. */
function slideTo(
  row: HTMLOListElement | null,
  i: number,
  behavior: ScrollBehavior,
) {
  const card = row?.children[i];
  if (!row || !card || row.scrollWidth <= row.clientWidth) return;
  const pad = parseFloat(getComputedStyle(row).scrollPaddingLeft) || 0;
  row.scrollTo({
    left:
      row.scrollLeft +
      card.getBoundingClientRect().left -
      row.getBoundingClientRect().left -
      pad,
    behavior,
  });
}

/* On a phone: the card nearest the start of the row. */
function nearest(row: HTMLOListElement) {
  const x =
    row.getBoundingClientRect().left +
    (parseFloat(getComputedStyle(row).scrollPaddingLeft) || 0);
  let best = 0;
  let gap = Infinity;
  Array.from(row.children).forEach((card, k) => {
    const d = Math.abs(card.getBoundingClientRect().left - x);
    if (d < gap) {
      gap = d;
      best = k;
    }
  });
  return best;
}

export function Showcase() {
  const [active, setActive] = useState(0);
  const still = useReducedMotion() === true;
  const list = useRef<HTMLOListElement>(null);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  const frame = useRef(0);

  /* From 1024px: the feature lit is the last whose top has passed a line
     LINE px down the window - under the header and the feature bar (136px),
     where a card is being read. Below that the row decides (onRow).

     A FIXED LINE, NOT CHAPTER 01's 55% OF THE WINDOW. That rule needs every
     feature to hold half a window of scrolling, so each card stood in a
     box of its own - and the short ones left gaps under them twice the
     tall ones' (2026-10-01). The cards now sit an even 40px apart, and a
     line this high still never lights the card under the one landed on:
     the shortest card and its gap reach past it. */
  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    let raf = 0;
    const measure = () => {
      raf = 0;
      if (!mq.matches) return;
      let a = 0;
      steps.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= LINE) a = i;
      });
      setActive(a);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event("features:turn"));
  }, [active]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  /* A #slug in the address - the chapter card, the feature bar, a link
     from the home page or /how-it-works - lands on that feature: from
     1024px the browser's own jump does it (the list is in the page's
     flow); on a phone its card is also brought to the start of the row. */
  useEffect(() => {
    const pick = () => {
      const i = SALES_PARTS.findIndex((p) => p.slug === window.location.hash.slice(1));
      if (i < 0) return;
      setActive(i);
      requestAnimationFrame(() => slideTo(list.current, i, "instant"));
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  /* A feature picked: from 1024px the page is scrolled to it, and the
     scroll lights it; on a phone the row slides to its card. */
  const choose = (i: number) => {
    if (window.matchMedia(WIDE).matches) {
      steps.current[i]?.scrollIntoView({ block: "start" });
      return;
    }
    setActive(i);
    slideTo(list.current, i, still ? "instant" : "smooth");
  };

  /* On a phone: the card that has come to the start of the row is the one
     open, and the window follows the swipe. */
  const onRow = () => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const row = list.current;
      if (row && row.scrollWidth > row.clientWidth) setActive(nearest(row));
    });
  };

  return (
    <section aria-label="Sales features" data-compact className="p-2 md:p-3">
      {/* overflow-clip, not hidden: hidden would make this the phone's
          scrolling box, and the phone could not pin to the window. */}
      <div className="relative overflow-clip rounded-[1.5rem] bg-night px-4 py-12 text-white md:rounded-[2rem] md:px-10 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        >
          <div className="absolute top-[18%] right-[-10%] h-[40rem] w-[46rem] rounded-full bg-brand/30 blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[30rem] w-[40rem] rounded-full bg-[#1e86f5]/15 blur-[140px]" />
        </div>

        {/* 1024 to 1279 the phone's column is the phone, and the words have
            the rest: shared out 1fr to 0.8fr they had 484px at 1024, and
            every list of capabilities wrapped four or five times. */}
        <div className="relative mx-auto grid max-w-[84rem] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] xl:gap-14">
          {/* Below 1024px the phone goes first, so the chapter's label goes
              above it - as Marketing's and Automation's do - rather than
              landing under the phone, mid-section. */}
          <p className="order-first -mb-2 text-[12.5px] font-extrabold tracking-[0.14em] text-white/55 uppercase lg:hidden">
            {SALES.name}, one feature at a time
          </p>

          {/* ---- The phone: the lit feature's real screen ----
              From 1024px it is pinned under the feature bar while the list
              scrolls, and no wider than the window's height allows (a
              phone is 0.47 as wide as it is tall), so the whole of it is
              always in view. */}
          <div
            aria-hidden
            className="relative order-first mx-auto w-full max-w-[260px] min-w-0 sm:max-w-[280px] lg:sticky lg:top-[10.5rem] lg:order-last lg:max-w-[min(300px,calc((100svh_-_12rem)_*_0.47))] xl:max-w-[min(340px,calc((100svh_-_12rem)_*_0.47))]"
          >
            <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,rgba(30,134,245,0.45),transparent)] blur-2xl" />
            <ScaledScreen w={PHONE.w} h={PHONE.h} max={340}>
              <Phone screens={PHONE_SCREENS} active={active} />
            </ScaledScreen>
          </div>

          {/* ---- The six ---- */}
          <div className="min-w-0">
            <p className="text-[12.5px] font-extrabold tracking-[0.14em] text-white/55 uppercase max-lg:hidden">
              {SALES.name}, one feature at a time
            </p>

            {/* From 1024px an even 40px between the cards, and room under
                the last for it to be read while the phone is still
                pinned beside it. */}
            <ol
              ref={list}
              onScroll={onRow}
              className="mt-5 flex flex-col lg:gap-10 lg:pb-[18svh] max-lg:-mx-4 max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-px-4 max-lg:flex-row max-lg:gap-3 max-lg:overflow-x-auto max-lg:overscroll-x-contain max-lg:px-4 max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden md:max-lg:-mx-10 md:max-lg:scroll-px-10 md:max-lg:px-10"
            >
              {SALES_PARTS.map((part, i) => {
                const on = i === active;
                const Mark = featureMarks[part.item.mark];
                return (
                  <li
                    key={part.slug}
                    ref={(el) => {
                      steps.current[i] = el;
                    }}
                    id={part.slug}
                    data-feature={part.slug}
                    data-open={on ? "" : undefined}
                    className={`${LAND} max-lg:w-[85%] max-lg:shrink-0 max-lg:snap-start`}
                  >
                    {/* The one lit is lifted - its card, its mark; the rest
                        are dimmed only to 88%, which keeps the smallest
                        type in them above 4.5:1 (at 45% it fell to 2.2:1). */}
                    <div
                      className={`relative h-full overflow-hidden rounded-2xl border transition-[background-color,border-color,opacity] duration-500 lg:h-auto ${
                        on
                          ? "border-white/25 bg-white/[0.08]"
                          : "border-white/8 bg-white/[0.02] hover:bg-white/[0.05] lg:opacity-[0.88]"
                      }`}
                    >
                      <button
                        type="button"
                        aria-current={on ? "step" : undefined}
                        onClick={() => choose(i)}
                        className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left md:px-5"
                      >
                        <span
                          className="grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-500"
                          style={
                            on
                              ? { backgroundColor: "#fff", color: SALES.deep }
                              : { backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }
                          }
                        >
                          <Mark className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11.5px] font-extrabold tracking-[0.1em] text-white/55">
                            {part.n}
                          </span>
                          <span className="block text-[17px] leading-tight font-extrabold md:text-[18px]">
                            {part.item.name}
                          </span>
                        </span>
                      </button>

                      {/* No summary line under the heading: it was the
                          chapter card's own sentence, a screen above. */}
                      <div className="px-4 pb-5 md:px-5 md:pl-[4.6rem]">
                        <h3 className="text-[21px] leading-[1.15] font-extrabold tracking-[-0.02em] md:text-[23px]">
                          {part.detail.title}
                        </h3>
                        <Inside part={part} dark className="mt-4" />
                        <Know part={part} dark className="mt-4 border-t border-white/10 pt-3.5" />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* ---- On a phone, the dots ----
                Where the row is, and a way to any card without swiping. */}
            <div className="mt-4 flex items-center justify-center gap-1 lg:hidden">
              {SALES_PARTS.map((part, i) => (
                <button
                  key={part.slug}
                  type="button"
                  onClick={() => choose(i)}
                  aria-label={part.item.name}
                  aria-current={i === active ? "true" : undefined}
                  className="grid h-6 w-7 place-items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-5 bg-white" : "w-1.5 bg-white/35"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
