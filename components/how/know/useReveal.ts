"use client";

import { useEffect, useState, type RefObject } from "react";
import { useStill } from "@/components/ui/useStill";

/* ==========================================================================
   PLAYED ONCE, AS IT SCROLLS IN
   --------------------------------------------------------------------------
   Where a picture in Good to know is in its life:

     rest   the finished picture - what the server sends, what stays if no
            script runs, and all a visitor who asked for less motion sees
     wait   the start of its motion, once the script is running and until
            it is on screen
     play   the motion, from the start to the finished picture, once

   The server cannot know either the setting or the scroll position, so it
   sends "rest" and the picture corrects itself after the first render -
   never during it, which would fail hydration (see useStill).

   A PICTURE ALREADY ON SCREEN WHEN THE SCRIPT STARTS STAYS AT REST. Only
   one scrolled to afterwards plays. Arriving by a link to the section,
   or reloading halfway down, every picture in view used to jump back to
   its start a tenth of a second after it appeared, finished, and play
   again - a flash on exactly the pages people land on.
   ========================================================================== */

export type Reveal = "rest" | "wait" | "play";

export function useReveal(ref: RefObject<Element | null>, margin = "0px 0px -18% 0px"): Reveal {
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState(false);
  const [arrived, setArrived] = useState(false);
  const still = useStill();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setArrived(true);
      return;
    }
    setReady(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);

  if (!ready || still || arrived) return "rest";
  return seen ? "play" : "wait";
}

/* The style a moving part takes while it plays: its transition, from a
   delay. At rest and while waiting it has none, so a picture never
   animates into its waiting pose. */
export const move = (mode: Reveal, delay = 0, duration = 0.6): React.CSSProperties | undefined =>
  mode === "play"
    ? {
        transitionProperty:
          "opacity, transform, translate, scale, rotate, stroke-dashoffset, background-color, color, border-color, box-shadow, filter",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        transitionDelay: `${delay}s`,
      }
    : undefined;
