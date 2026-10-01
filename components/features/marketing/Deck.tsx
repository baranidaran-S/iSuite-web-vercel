"use client";

import { useEffect, useRef, useState } from "react";
import { featureMarks } from "@/components/ui/featureIcons";
import { PartWords, useLive } from "@/components/features/kit/chapter";
import { LAND, useTick } from "@/components/features/kit/compact";
import { ScreenWindow } from "@/components/features/kit/ScreenWindow";
import { LiveStrip } from "@/components/features/marketing/LiveStrip";
import { MARKETING_CHAPTER as CHAPTER } from "@/components/features/marketing/shared";

/* ==========================================================================
   03 MARKETING - THE DECK
   --------------------------------------------------------------------------
   The chapter as a hand of cards, one per feature, fanned. The card in
   front shows its feature whole: the real screen at about its real size,
   the feature working under it, and every capability and limit beside it.
   A card is one scroll, one press, one swipe or one link away.

   CHOSEN FROM THREE on 2026-09-30 (a bento and screens that unfold were
   the others). The deck was the chapter's runner-up once and lost because
   its picture was a quarter of each card; here the picture is the card's
   face.

   FROM 1024px THE HAND IS DEALT BY SCROLLING, the way Chapter 01 turns its
   groups (2026-10-01): the hand is pinned under the feature bar, and each
   share of the window scrolled (STEP) brings the next card to the front -
   WhatsApp, Email, Forms, the Marketing AI Agent - before the page moves
   on. It dealt itself before, twelve seconds a card, and a visitor
   scrolling on saw the first card and nothing else unless they waited or
   clicked. A card picked by name, by a swipe or by a link scrolls the page
   to that card's share, so the scroll and the hand never disagree. Where
   the window is too short for the whole hand it is drawn a little smaller
   (fit), rather than cut off at the foot.

   ONE PAUSE STOPS EVERYTHING THAT MOVES by itself - the front card's live
   strip and its screen panning - at every size (WCAG 2.2.2). Scrolling is
   the visitor's own, and needs none.

   THE SCREEN PANS WHENEVER ITS CARD IS IN FRONT AND THE HAND IS LIVE, so
   the foot of a tall screen - Studio's "Created (Paused)", the bottom of
   Forms - is seen at every size.

   THE FEATURE BAR NAMES THE CARD IN FRONT (data-compact, data-open, and a
   "features:turn" event when it changes) - see FeatureBar.tsx.
   ========================================================================== */

const WIDE = "(min-width: 1024px)";

/* How much of the window's height is scrolled for each card, from 1024px. */
const STEP = 0.6;

export function MarketingDeck() {
  const parts = CHAPTER.parts;
  const n = parts.length;
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const { seen, still } = useLive(stage, 0.3);
  const [active, setActive] = useState(0);
  const [swiped, setSwiped] = useState(false);
  const [paused, setPaused] = useState(false);
  /* From 1024px the real screen's window is as tall as the window's height
     leaves room for (the rest of the pinned hand is about 332px) - 500px
     at most, as below 1024 - and the hand is scaled down only if even that
     will not fit. */
  const [screenMax, setScreenMax] = useState(500);
  const [fit, setFit] = useState(1);
  const live = seen && !still && !paused;
  const tick = useTick(live, 3200);

  useEffect(() => {
    window.dispatchEvent(new Event("features:turn"));
  }, [active]);

  /* Where the pinned hand sits under the feature bar, and the share of the
     window each card is scrolled for. */
  const pinTop = () => parseFloat(pin.current ? getComputedStyle(pin.current).top : "") || 0;
  const stepPx = () => window.innerHeight * STEP;
  /* The page's scroll position at which card i is in front: the middle of
     its share. */
  const scrollFor = (i: number) => {
    const t = track.current;
    return t ? window.scrollY + t.getBoundingClientRect().top - pinTop() + (i + 0.5) * stepPx() : window.scrollY;
  };

  /* From 1024px the card in front is the share of the scroll the page is
     in, counted from the moment the hand pinned. */
  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    let raf = 0;
    const measure = () => {
      raf = 0;
      const t = track.current;
      if (!mq.matches || !t) return;
      const into = pinTop() - t.getBoundingClientRect().top;
      setActive(Math.min(n - 1, Math.max(0, Math.floor(into / stepPx()))));
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
  }, [n]);

  /* The pinned hand fitted to the window: its screen's window first, then,
     only if that is not enough, a scale - measured on the hand's own
     height, which a scale does not change. */
  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    const mq = window.matchMedia(WIDE);
    const measure = () => {
      if (!mq.matches) {
        setScreenMax(500);
        setFit(1);
        return;
      }
      const room = window.innerHeight - pinTop() - 16;
      setScreenMax(Math.round(Math.min(500, Math.max(260, room - 332))));
      setFit(Math.min(1, Math.round((room / el.offsetHeight) * 1000) / 1000));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, []);

  /* A #slug in the address brings that card to the front: from 1024px by
     scrolling to its share (a jump when arriving from another page), below
     that by turning the hand and landing on it.

     A LINK TO THE HASH ALREADY IN THE ADDRESS fires no hashchange, and the
     browser's own jump lands on the cards - all stacked at the top of the
     hand - so the first card came to the front, not the one linked: back
     to #forms from the feature bar, say, after scrolling on. A click on
     such a link is taken here instead. */
  useEffect(() => {
    let arriving = true;
    const land = (i: number) => {
      const behavior: ScrollBehavior | undefined = arriving ? "instant" : undefined;
      arriving = false;
      setActive(i);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (window.matchMedia(WIDE).matches) window.scrollTo({ top: scrollFor(i), behavior });
          else stage.current?.scrollIntoView({ block: "start", behavior: behavior ?? "auto" });
        }),
      );
    };
    const pick = () => {
      const i = parts.findIndex((p) => p.slug === window.location.hash.slice(1));
      if (i >= 0) land(i);
      else arriving = false;
    };
    const again = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = (e.target as Element | null)?.closest?.("a[href^='#']")?.getAttribute("href");
      if (!href || href !== window.location.hash) return;
      const i = parts.findIndex((p) => `#${p.slug}` === href);
      if (i < 0) return;
      e.preventDefault();
      land(i);
    };
    pick();
    window.addEventListener("hashchange", pick);
    document.addEventListener("click", again);
    return () => {
      window.removeEventListener("hashchange", pick);
      document.removeEventListener("click", again);
    };
  }, [parts]);

  const choose = (i: number) => {
    const k = (i + n) % n;
    if (window.matchMedia(WIDE).matches && track.current) {
      window.scrollTo({ top: scrollFor(k) });
      return;
    }
    setActive(k);
  };

  /* A swipe on a touch screen: more than 40px sideways. */
  const start = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
      choose(active + (dx < 0 ? 1 : -1));
      setSwiped(true);
    }
  };

  return (
    <section aria-label={CHAPTER.label} data-compact className="p-2 md:p-3">
      {/* overflow-clip, not hidden: hidden would make this the hand's
          scrolling box, and the hand could not pin to the window. */}
      <div className="relative overflow-clip rounded-[1.5rem] bg-surface px-4 py-12 text-ink md:rounded-[2rem] md:px-10 md:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div
            className="absolute top-[12%] left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full blur-[140px]"
            style={{ backgroundColor: `${CHAPTER.accent}1f` }}
          />
        </div>

        <div className="relative mx-auto max-w-[84rem]">
          <p className="text-[12.5px] font-extrabold tracking-[0.14em] text-ink/65 uppercase">{CHAPTER.name}, in cards</p>

          <div ref={track} className="mt-6">
            <div
              ref={pin}
              className="lg:sticky lg:top-[10.5rem]"
              style={fit < 1 ? { transform: `scale(${fit})`, transformOrigin: "50% 0" } : undefined}
            >
              {/* THE HAND: every card in one cell, so it is as tall as its
                  tallest card with nothing measured. */}
              <div
                ref={stage}
                onPointerDown={onDown}
                onPointerUp={onUp}
                className={`${LAND} relative grid touch-pan-y justify-items-center pb-6 [--fan-r:2.5deg] [--fan-s:0.95] [--fan-x:5%] [--fan-y:12px] md:[--fan-r:3.5deg] md:[--fan-s:0.93] md:[--fan-x:11%] md:[--fan-y:24px]`}
              >
                {parts.map((part, i) => {
                  const rel = (i - active + n) % n;
                  const on = rel === 0;
                  const dir = rel === 1 ? 1 : rel === n - 1 ? -1 : 0;
                  const transform = on
                    ? "none"
                    : dir
                      ? `translateX(calc(var(--fan-x) * ${dir})) translateY(var(--fan-y)) rotate(calc(var(--fan-r) * ${dir})) scale(var(--fan-s))`
                      : "translateY(calc(var(--fan-y) * 1.8)) scale(calc(var(--fan-s) * 0.96))";
                  const Mark = featureMarks[part.mark];
                  return (
                    <article
                      key={part.slug}
                      id={part.slug}
                      data-feature={part.slug}
                      data-open={on ? "" : undefined}
                      aria-hidden={on ? undefined : true}
                      onClick={on ? undefined : () => choose(i)}
                      className={`${LAND} w-full max-w-[62rem] overflow-hidden rounded-[1.6rem] bg-white shadow-[0_40px_80px_-40px_rgba(10,16,32,0.55)] ring-1 ring-black/8 transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none [grid-area:1/1] motion-reduce:transition-none ${
                        on ? "" : "cursor-pointer brightness-[0.97]"
                      }`}
                      style={{ transform, zIndex: on ? 30 : dir === 1 ? 20 : dir === -1 ? 10 : 5 }}
                    >
                      {/* The card's band, in the chapter's colours. */}
                      <div
                        className="flex items-center gap-3 px-5 py-3.5 text-white md:px-6"
                        style={{ backgroundImage: `linear-gradient(120deg, ${CHAPTER.deep}, ${CHAPTER.accent})` }}
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white" style={{ color: CHAPTER.deep }}>
                          <Mark className="size-[18px]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] font-extrabold tracking-[0.1em] text-white/80">{part.n}</span>
                          <h3 className="text-[18px] leading-tight font-extrabold">{part.name}</h3>
                        </span>
                        {part.shot && (
                          <span className="hidden text-[11px] font-extrabold tracking-[0.12em] text-white/85 uppercase sm:block">
                            {part.shot.where}
                          </span>
                        )}
                      </div>

                      {part.pending ? (
                        <div className="p-5 md:p-8">
                          <p
                            className="rounded-2xl border-2 border-dashed px-5 py-10 text-center text-[15px] font-semibold text-muted"
                            style={{ borderColor: `${CHAPTER.deep}4d` }}
                          >
                            {part.pending}
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-6 p-4 md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] md:gap-8 md:p-6">
                          {/* The face: the real screen, the feature working
                              under it - from 1024px a window a little
                              shorter, so the pinned hand fits the window;
                              the screen pans to show the rest. */}
                          <div aria-hidden className="flex flex-col items-center gap-3">
                            {part.shot && (
                              <div className="w-full overflow-hidden rounded-2xl bg-[#f3f5f9] ring-1 ring-black/8">
                                <ScreenWindow
                                  src={part.shot.src}
                                  w={part.shot.w}
                                  h={part.shot.h}
                                  label=""
                                  max={screenMax}
                                  live={on && live}
                                  className="mx-auto"
                                />
                              </div>
                            )}
                            <LiveStrip slug={part.slug} live={on && live} tick={tick} className="w-full" />
                          </div>
                          <PartWords part={part} chapter={CHAPTER} />
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* A card by name - the way to any card without the pointer -
                  and the pause, kept in the pinned hand so it is on screen
                  whenever anything is moving. */}
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {parts.map((part, i) => {
                  const Mark = featureMarks[part.mark];
                  const on = i === active;
                  return (
                    <button
                      key={part.slug}
                      type="button"
                      aria-pressed={on}
                      aria-controls={part.slug}
                      onClick={() => choose(i)}
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-bold transition-colors ${
                        on ? "bg-ink text-white" : "bg-white text-ink/80 ring-1 ring-line hover:text-ink"
                      }`}
                    >
                      <Mark className="size-4" />
                      {part.name}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-2 text-[12.5px] font-bold text-ink/75 transition-colors hover:text-ink motion-reduce:hidden"
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

            {/* The scroll the hand is dealt on, from 1024px: a share of the
                window for each card, while the hand stays pinned. */}
            <div aria-hidden className="hidden lg:block" style={{ height: `${Math.round(n * STEP * 100)}svh` }} />
          </div>
          {!swiped && <p className="mt-3 text-center text-[12.5px] font-semibold text-ink/60 lg:hidden">← Swipe for the next card →</p>}
        </div>
      </div>
    </section>
  );
}
