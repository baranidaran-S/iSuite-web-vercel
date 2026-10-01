import Image from "next/image";

/* ==========================================================================
   02 SALES - THE PHONE  (the picture in Showcase.tsx)
   --------------------------------------------------------------------------
   iSuite AI as a team member sees it on a phone - in a browser: the app has
   no App Store or Play Store app, so the phone has a browser's address
   pill at the top. Its screens are the app's own, at a phone's width
   (public/features/phone, captured 2026-09-30 at twice a phone's
   resolution), one per Sales feature, side by side in one strip; the
   showcase slides the strip to whichever feature is open.

   THE FRAME IS THE CHAPTER'S FIRST PHONE. It held hand-drawn screens for
   the four features the chapter had; the chapter then showed the app's
   desktop screenshots in a browser window, where they came out at a
   quarter of their size and could not be read. The app lays itself out
   for a phone, so the phone came back with the real screens in it.

   Customers' names, photos and amounts are blurred where they show. A
   picture: the showcase marks it aria-hidden, and every capability is in
   the words beside it.
   ========================================================================== */

/* The screens as captured: a phone 390 wide, cut 738 tall under its bar. */
const SCREEN = { w: 390, h: 738 } as const;

/* The phone, drawn at this size and scaled to its column. */
export const PHONE = { w: 300, h: 640 } as const;

export function Phone({ screens, active }: { screens: readonly string[]; active: number }) {
  return (
    <div
      className="relative rounded-[46px] bg-[#0a0f1b] p-[9px] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.95),inset_0_0_0_1px_rgba(255,255,255,0.14)]"
      style={{ width: PHONE.w, height: PHONE.h }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[38px] bg-[#f3f5f9] text-left text-ink">
        {/* status bar */}
        <div className="relative flex h-9 shrink-0 items-center justify-between bg-surface px-6 text-[11px] font-bold">
          <span>9:41</span>
          <span className="absolute top-2 left-1/2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#0a0f1b]" />
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-px">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-sm bg-ink" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-ink/60 p-px">
              <span className="block h-full w-3/4 rounded-[1px] bg-ink" />
            </span>
          </span>
        </div>
        {/* the browser's address pill */}
        <div className="flex h-10 shrink-0 items-center bg-surface px-3 pb-2">
          <div className="flex h-8 w-full items-center justify-center gap-1.5 rounded-full bg-[#f2f4f9] text-[11px] font-semibold text-ink/70">
            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
              <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
            </svg>
            iSuite AI
          </div>
        </div>

        {/* the screens, side by side */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              width: `${screens.length * 100}%`,
              transform: `translateX(-${(active * 100) / screens.length}%)`,
            }}
          >
            {screens.map((src) => (
              <div key={src} className="h-full overflow-hidden" style={{ width: `${100 / screens.length}%` }}>
                <Image
                  src={src}
                  alt=""
                  width={SCREEN.w * 2}
                  height={SCREEN.h * 2}
                  sizes="340px"
                  draggable={false}
                  className="block h-auto w-full select-none"
                />
              </div>
            ))}
          </div>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#f3f5f9] to-transparent" />
        </div>

        {/* the home indicator */}
        <div className="flex h-5 shrink-0 items-center justify-center bg-[#f3f5f9]">
          <span className="h-1 w-24 rounded-full bg-ink/80" />
        </div>
      </div>
    </div>
  );
}
