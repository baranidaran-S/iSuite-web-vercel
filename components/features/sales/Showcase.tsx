"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
   The whole chapter's features in one section of about a screen - chosen
   for Chapter 02 over a live desk and a pipeline board (see shared.tsx).

   The four features as four tabs beside a phone, and the tour plays by
   itself: each feature opens in turn - its heading, what is inside it,
   what to know - while the phone slides to that feature's screen. Nobody
   has to click anything to see all four; anyone who wants one picks it.

   THE PHONE IS A BROWSER. iSuite AI has no App Store or Play Store app
   (§23), so the phone shows it the way a team member really uses it on
   the move - in a mobile browser - with the product's own bar along the
   foot, the part on screen lit.

   THE TOUR IS POLITE. It starts only once the section is on screen, waits
   while it is being pointed at or tabbed through, and goes round ONCE -
   twelve seconds a feature, then it rests on the last. A visitor who picks
   a feature stops it, and its button plays another round. Under reduced
   motion it never plays: the first feature is open and the rest are one
   press away. It was eight seconds and went round for ever, which closed
   a ninety-word feature on anyone reading it with the mouse elsewhere.

   THE TABS HOLD THE TALLEST FEATURE'S HEIGHT, so nothing under the section
   moves as the tour turns from one feature to the next.

   BELOW 1024px THE FOUR ARE CARDS IN A ROW THAT SWIPES SIDEWAYS, under
   the phone, which follows the card. The next card shows at the edge and
   dots below say where the row is. There is no tour: the visitor moves
   between them. All four open one under another made the chapter six
   screens long on a phone, with the phone drawing a screen and a half
   above whatever was being read; and the tour never started at all,
   because a 3,400px section is never 35% on screen. The row was chosen
   over tabs under the phone, the two compared side by side.

   THE FEATURE BAR NAMES THE ONE OPEN HERE (data-compact, data-open, and a
   "features:turn" event when the tour changes it) - see FeatureBar.tsx.
   ========================================================================== */

const DUR = 12000;

/* On a phone: card i brought to the start of its row. Nothing to do where
   the list is not a row that scrolls - the tabs from 1024px. */
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
  const n = SALES_PARTS.length;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  /* Turns left in the tour's one round. */
  const [left, setLeft] = useState(n - 1);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  /* 1024px and up. It starts true, as the server draws it, and corrects
     itself once running - it decides the tour and the tabs' ARIA, never
     the layout, which is CSS. */
  const [wide, setWide] = useState(true);
  const still = useReducedMotion() === true;
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const frame = useRef(0);
  const [tallest, setTallest] = useState(0);

  /* The tallest feature's height, for the open one to hold. The closed
     ones are laid out but invisible from 1024px, so they can be measured;
     below that nothing is held - the row of cards is as tall as its
     tallest card. */
  useLayoutEffect(() => {
    const el = list.current;
    if (!el) return;
    const measure = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        setTallest(0);
        return;
      }
      const hs = Array.from(el.querySelectorAll<HTMLElement>("[data-panel]")).map(
        (p) => p.offsetHeight,
      );
      setTallest(Math.max(0, ...hs));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

  /* Only while the section is on screen. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event("features:turn"));
  }, [active]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  /* A #slug in the address - the hero's callouts, the chapter card, the
     feature bar - opens that feature and stops the tour.

     AND THEN LANDS ON IT AGAIN. The browser scrolls to the feature first
     and the feature opens after, closing the one above it - which moved
     the target up under the header: from the hero, Follow-ups arrived
     221px above the top of the window. Once it has opened, it is scrolled
     to a second time - a jump when arriving from another page, the page's
     own glide for a link within it - and on a phone its card is brought
     to the start of the row. */
  useEffect(() => {
    let arriving = true;
    const pick = () => {
      const behavior: ScrollBehavior = arriving ? "instant" : "auto";
      arriving = false;
      const i = SALES_PARTS.findIndex((p) => p.slug === window.location.hash.slice(1));
      if (i < 0) return;
      setActive(i);
      setPlaying(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          slideTo(list.current, i, "instant");
          document
            .getElementById(SALES_PARTS[i].slug)
            ?.scrollIntoView({ block: "start", behavior });
        }),
      );
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  const running = playing && wide && inView && !held && !still;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      if (left > 0) {
        setActive((a) => (a + 1) % n);
        setLeft(left - 1);
      } else {
        setPlaying(false);
      }
    }, DUR);
    return () => window.clearTimeout(t);
  }, [running, active, left, n]);

  const choose = (i: number) => {
    setActive(i);
    setPlaying(false);
    slideTo(list.current, i, still ? "instant" : "smooth");
  };

  /* On a phone: the card that has come to the start of the row is the one
     open, and the phone follows the swipe. */
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
      <div
        ref={root}
        className="relative overflow-hidden rounded-[1.5rem] bg-night px-4 py-12 text-white md:rounded-[2rem] md:px-10 md:py-16"
      >
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
        <div className="relative mx-auto grid max-w-[84rem] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] xl:gap-14">
          {/* ---- The phone ---- */}
          <div
            aria-hidden
            className="relative order-first mx-auto w-full max-w-[260px] min-w-0 sm:max-w-[280px] lg:order-last lg:max-w-[300px] xl:max-w-[340px]"
          >
            <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,rgba(30,134,245,0.45),transparent)] blur-2xl" />
            <ScaledScreen w={PHONE.w} h={PHONE.h} max={340}>
              <Phone active={active} />
            </ScaledScreen>
          </div>

          {/* ---- The four ---- */}
          <div
            className="min-w-0"
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocus={() => setHeld(true)}
            onBlur={() => setHeld(false)}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-[12.5px] font-extrabold tracking-[0.14em] text-white/55 uppercase">
                {SALES.name}, one feature at a time
              </p>
              {/* Always drawn and hidden by CSS - under reduced motion, and
                  below 1024px where there is no tour: the server cannot
                  know either, and drawing it only when motion was allowed
                  failed hydration. */}
              <button
                type="button"
                onClick={() => {
                  if (!playing) setLeft(n - 1);
                  setPlaying((p) => !p);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[12px] font-bold text-white/75 transition-colors hover:border-white/40 hover:text-white max-lg:hidden motion-reduce:hidden"
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden>
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden>
                    <path d="M7 5v14l12-7L7 5z" />
                  </svg>
                )}
                {playing ? "Pause the tour" : "Play the tour"}
              </button>
            </div>

            <ol
              ref={list}
              onScroll={onRow}
              className="mt-5 flex flex-col gap-2 max-lg:-mx-4 max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-px-4 max-lg:flex-row max-lg:gap-3 max-lg:overflow-x-auto max-lg:overscroll-x-contain max-lg:px-4 max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden md:max-lg:-mx-10 md:max-lg:scroll-px-10 md:max-lg:px-10"
            >
              {SALES_PARTS.map((part, i) => {
                const on = i === active;
                const Mark = featureMarks[part.item.mark];
                return (
                  <li
                    key={part.slug}
                    id={part.slug}
                    data-feature={part.slug}
                    data-open={on ? "" : undefined}
                    className={`${LAND} relative overflow-hidden rounded-2xl border transition-colors duration-500 max-lg:w-[85%] max-lg:shrink-0 max-lg:snap-start ${
                      on ? "border-white/20 bg-white/[0.07]" : "border-white/8 bg-white/[0.02] hover:bg-white/[0.05]"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={wide ? on : undefined}
                      aria-controls={wide ? `${part.slug}-panel` : undefined}
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

                    <div
                      id={`${part.slug}-panel`}
                      className={
                        on
                          ? ""
                          : "lg:pointer-events-none lg:invisible lg:absolute lg:inset-x-0 lg:top-full"
                      }
                      style={on && tallest ? { minHeight: tallest } : undefined}
                    >
                      {/* No summary line under the heading: it was the
                          chapter card's own sentence, a screen above. */}
                      <div
                        data-panel
                        className={`px-4 pb-5 md:px-5 md:pl-[4.6rem] ${on ? "lg:anim-swap" : ""}`}
                      >
                        <h3 className="text-[21px] leading-[1.15] font-extrabold tracking-[-0.02em] md:text-[23px]">
                          {part.detail.title}
                        </h3>
                        <Inside part={part} dark className="mt-4" />
                        <Know part={part} dark className="mt-4 border-t border-white/10 pt-3.5" />
                      </div>
                    </div>

                    {/* How long until the next feature. */}
                    {on && running && (
                      <span
                        key={`${active}-${running}`}
                        aria-hidden
                        className="anim-fill absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,#1e86f5,#00c8f8)]"
                        style={{ "--dur": `${DUR}ms` } as React.CSSProperties}
                      />
                    )}
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
