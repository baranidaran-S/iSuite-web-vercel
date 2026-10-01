"use client";

import { useEffect } from "react";

/* ==========================================================================
   SMOOTH SCROLLING, ONCE THE PAGE HAS ARRIVED
   --------------------------------------------------------------------------
   A link within a page glides to where it points - globals.css does that,
   on html[data-arrived]. The attribute is set here, once the page is
   running, rather than in the HTML, for the one scroll that must not glide:
   ARRIVING. A link from elsewhere to /features#sales played a second and a
   half of the page flying past - the hero, all of Chapter 01 - and then
   stopped wherever it had been aimed when it set off, which was wrong by
   the time it got there. Without the attribute the browser simply jumps
   to the section, and holds it there while the rest of the page loads.

   Moving between pages is the router's to keep instant, which it does
   because <html> carries data-scroll-behavior="smooth" (app/layout.tsx).
   ========================================================================== */
export function SmoothScroll() {
  useEffect(() => {
    document.documentElement.dataset.arrived = "";
  }, []);
  return null;
}
