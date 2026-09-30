"use client";

import { useEffect, useState } from "react";

/* ==========================================================================
   /how-it-works - THE CAST'S PAUSE
   --------------------------------------------------------------------------
   The cast row's loop - the enquiry carried from card to card - runs for
   as long as the page is open, and motion that starts by itself and lasts
   more than five seconds needs a way to stop it (WCAG 2.2.2). This is the
   way: it marks the row paused, and globals.css holds its animations where
   they stand; pressed again, they carry on.

   IT ALSO KEEPS THE BUBBLE IN STEP. The bubble's row is drawn only from
   1024px, and an animation starts when its element is drawn - so a window
   crossing 1024 after the page opened (a tablet turned, a window resized)
   started the bubble from the beginning while the cards' lights ran on,
   and it stood over one card while another was lit. On that crossing, the
   bubble is set to the lights' time.

   The only part of the cast that runs in the browser - the row itself is
   CSS and stays a server component. Not drawn under reduced motion, where
   the loop is not drawn either. Its name starts with the word it shows.
   ========================================================================== */

export function CastPause({ target }: { target: string }) {
  const [paused, setPaused] = useState(false);
  const toggle = () => {
    const next = !paused;
    document.getElementById(target)?.toggleAttribute("data-paused", next);
    setPaused(next);
  };

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 64rem)");
    const sync = () => {
      const show = document.getElementById(target);
      if (!wide.matches || !show) return;
      /* getAnimations brings the styles up to date first, so the row just
         drawn has its animations by now. The lights are the ones in the
         list of cards; all of them share one clock. */
      const all = show.getAnimations({ subtree: true });
      const light = all.find((a) => (a.effect as KeyframeEffect | null)?.target?.closest("ol"));
      if (!light || light.currentTime === null) return;
      all.forEach((a) => {
        if (a !== light) a.currentTime = light.currentTime;
      });
    };
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, [target]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={paused ? "Play the animation" : "Pause the animation"}
      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/80 px-3.5 text-[12.5px] font-bold text-ink/75 shadow-[0_6px_16px_-10px_rgba(10,16,32,0.5)] ring-1 ring-white backdrop-blur transition-colors hover:bg-white hover:text-ink motion-reduce:hidden"
    >
      {paused ? (
        <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
          <path d="M7 5.2v13.6c0 .8.9 1.3 1.6.9l10.4-6.8a1 1 0 0 0 0-1.8L8.6 4.3C7.9 3.9 7 4.4 7 5.2Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
          <rect x="6" y="5" width="4" height="14" rx="1.2" />
          <rect x="14" y="5" width="4" height="14" rx="1.2" />
        </svg>
      )}
      {paused ? "Play" : "Pause"}
    </button>
  );
}
