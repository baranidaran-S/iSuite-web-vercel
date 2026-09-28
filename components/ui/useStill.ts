"use client";

import { useSyncExternalStore } from "react";

/* ==========================================================================
   REDUCED MOTION, ONCE THE PAGE IS ON SCREEN
   --------------------------------------------------------------------------
   For a component that DRAWS something different for a visitor who has
   asked for less motion - another layout, another frame, no clip - rather
   than only timing its animations differently.

   The server cannot know the setting, so it renders every page as if
   motion were on. The home page's sections read it on the browser's first
   render and drew what the server had not, and React threw the server's
   HTML away and built the whole page again in the browser - error #418 in
   production, for exactly the visitors who had asked for less. This
   reports false for that first render, as the server did, and the real
   setting straight after, and again whenever it changes.

   Where only the TIMING differs, read useReducedMotion directly: timing is
   never written into the HTML, so it cannot disagree with it - FinalCta
   explains that pattern, and most sections use it.
   ========================================================================== */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useStill() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
