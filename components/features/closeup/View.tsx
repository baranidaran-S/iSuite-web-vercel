"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Capture, Closeup, Pin, Rect } from "@/lib/content/closeups";

/* ==========================================================================
   /features CHAPTER 01 - THE PIECES A CLOSE-UP IS DRAWN WITH
   --------------------------------------------------------------------------
   One view of the app with its numbered pins, the small map of a whole
   screen with a part marked on it, the line saying where in the app a view
   is, and the scroller a phone uses for a view wider than it can show at a
   readable size. What they show is lib/content/closeups.ts.

   Positions are percentages of the view, so a view is drawn at whatever
   width its box has and the pins stay on their things.
   ========================================================================== */

const pct = (a: number, b: number) => `${(a / b) * 100}%`;

/* The widest a capture is drawn, as a share of its own size: a double-
   resolution one up to 1.4 and still sharp, a plain one no further than
   its own pixels. */
export const most = (c: Capture) => (c.density === 2 ? 1.4 : 1);

/* The narrowest it is drawn before a phone scrolls it sideways - its type
   at about 10px. A plain capture's type is larger to begin with. */
export const least = (c: Capture) => (c.density === 2 ? 0.72 : 0.6);

function Pins({
  pins,
  index,
  view,
  numbers,
  hot,
  accent,
  deep,
  delay,
}: {
  pins: Readonly<Record<string, Pin>>;
  index: number;
  view: Rect;
  numbers: Readonly<Record<string, number>>;
  hot: string | null;
  accent: string;
  deep: string;
  delay: number;
}) {
  const mine = Object.entries(pins).filter(([, p]) => p.view === index);
  return (
    <>
      {mine.map(([id, p], i) => {
        const n = numbers[id];
        if (!n) return null;
        const on = hot === id;
        return (
          <Fragment key={id}>
            {/* The thing itself, ringed while its capability is pointed at. */}
            {p.box && (
              <span
                aria-hidden
                className="pointer-events-none absolute rounded-lg transition-opacity duration-300"
                style={{
                  left: pct(p.box.x - view.x, view.w),
                  top: pct(p.box.y - view.y, view.h),
                  width: pct(p.box.w, view.w),
                  height: pct(p.box.h, view.h),
                  opacity: on ? 1 : 0,
                  boxShadow: `0 0 0 2px ${accent}, 0 0 0 6px color-mix(in oklab, ${accent} 22%, transparent)`,
                }}
              />
            )}
            <span
              aria-hidden
              className="anim-pop pointer-events-none absolute z-10 grid size-[22px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[11.5px] leading-none font-extrabold text-white shadow-[0_0_0_2px_#fff,0_4px_12px_rgba(6,12,30,0.35)] transition-[scale] duration-300"
              style={
                {
                  left: pct(p.x - view.x, view.w),
                  top: pct(p.y - view.y, view.h),
                  backgroundColor: deep,
                  scale: on ? "1.25" : "1",
                  "--d": `${delay + i * 0.08}s`,
                } as React.CSSProperties
              }
            >
              {on && (
                <span
                  className="absolute inset-0 rounded-full opacity-45 motion-safe:animate-ping"
                  style={{ backgroundColor: accent }}
                />
              )}
              <span className="relative">{n}</span>
            </span>
          </Fragment>
        );
      })}
    </>
  );
}

/* One view of a group - part of one capture, with its pins. It fills its
   box's width at the view's own shape.

   `drawn` IS THE WIDEST THE VIEW IS DRAWN, and each file's `sizes` comes
   from it. A view is often a small part of a large file, so the file is
   drawn several times wider than the view: told the view's width, the
   browser fetched a copy a third the size it was shown at, and the widget's
   chat came out blurred. */
export function ViewPicture({
  closeup,
  group,
  index,
  numbers,
  hot,
  accent,
  deep,
  drawn,
  className = "",
  pinDelay = 0.25,
}: {
  closeup: Closeup;
  group: string;
  index: number;
  numbers: Readonly<Record<string, number>>;
  hot: string | null;
  accent: string;
  deep: string;
  drawn: number;
  className?: string;
  pinDelay?: number;
}) {
  const g = closeup.groups[group];
  const view = g?.views[index];
  if (!g || !view) return null;
  const cap = closeup.captures[view.capture];
  const v = view.rect;
  /* The frame is drawn over the picture, inside its edge: an outside ring
     is cut off by the scroller a phone draws the view in. */
  return (
    <div
      className={`relative overflow-hidden bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-black/10 after:ring-inset ${className}`}
      style={{ aspectRatio: `${v.w} / ${v.h}` }}
    >
      {view.files.map((id) => {
        const f = cap.files[id];
        return (
          <Image
            key={id}
            src={f.src}
            alt=""
            width={f.at.w * cap.density}
            height={f.at.h * cap.density}
            sizes={`${Math.ceil((drawn * f.at.w) / v.w)}px`}
            draggable={false}
            className="absolute max-w-none select-none"
            style={{
              left: pct(f.at.x - v.x, v.w),
              top: pct(f.at.y - v.y, v.h),
              width: pct(f.at.w, v.w),
              height: "auto",
            }}
          />
        );
      })}
      <Pins pins={g.pins} index={index} view={v} numbers={numbers} hot={hot} accent={accent} deep={deep} delay={pinDelay} />
    </div>
  );
}

/* A whole screen, with one part marked on it - where a view is from. */
export function ScreenMap({
  capture,
  file,
  mark,
  accent,
  sizes,
  className = "",
}: {
  capture: Capture;
  file: string;
  mark?: Rect | null;
  accent: string;
  sizes: string;
  className?: string;
}) {
  const f = capture.files[file];
  return (
    <div
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ aspectRatio: `${capture.w} / ${capture.h}` }}
    >
      <Image
        src={f.src}
        alt=""
        width={f.at.w * capture.density}
        height={f.at.h * capture.density}
        sizes={sizes}
        draggable={false}
        className="block size-full select-none"
      />
      {mark && (
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-[3px] transition-[left,top,width,height] duration-500 ease-out"
          style={{
            left: pct(mark.x, capture.w),
            top: pct(mark.y, capture.h),
            width: pct(mark.w, capture.w),
            height: pct(mark.h, capture.h),
            boxShadow: `0 0 0 2px ${accent}, 0 0 0 9999px rgba(6, 12, 30, 0.28)`,
          }}
        />
      )}
    </div>
  );
}

/* Where in the app a view is - "AI Agents · Setup". At 11.5px it needs
   4.5:1: ink at 55% came to 3.9 on white. */
export function Where({
  children,
  dark,
  className = "",
}: {
  children: React.ReactNode;
  dark: boolean;
  className?: string;
}) {
  return (
    <p
      className={`mb-2 text-[11.5px] leading-4 font-extrabold tracking-[0.12em] uppercase ${
        dark ? "text-white/65" : "text-ink/70"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/* Pictures no narrower than `lo` pixels - their type readable. Where the
   column is narrower they scroll sideways, together, and say so once; a
   region that scrolls can be reached from the keyboard, and carries a
   name. One per group: a scroller for each of its views stacked a "Swipe
   for more" over every picture, covering what they said. */
export function Scroller({
  lo,
  hi,
  label,
  className = "",
  children,
}: {
  lo: number;
  hi: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scrolls, setScrolls] = useState(false);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const check = () => setScrolls(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={`@container relative ${className}`}>
      <div
        ref={box}
        onScroll={(e) => setMoved(e.currentTarget.scrollLeft > 16)}
        {...(scrolls ? { role: "region", tabIndex: 0, "aria-label": label } : { "aria-hidden": true })}
        className="w-fit max-w-full overflow-x-auto overscroll-x-contain [scrollbar-width:thin]"
      >
        <div style={{ width: `clamp(${lo}px, 100cqw, ${hi}px)` }}>{children}</div>
      </div>
      {/* ITS OWN LINE, UNDER THE PICTURES. Laid over them, the hint hid
          the words it sat on. The line is always there and shown only
          when the pictures scroll - it is known after the first paint,
          and a line arriving then would push the page down. */}
      <p
        aria-hidden
        className={`mt-2 flex items-center justify-end gap-1.5 text-[12px] font-bold opacity-70 transition-opacity duration-300 ${
          scrolls && !moved ? "" : "invisible"
        }`}
      >
        Swipe for more
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M5 12h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </p>
    </div>
  );
}
