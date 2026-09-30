"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useStill } from "@/components/ui/useStill";
import type { Reveal } from "@/components/how/know/useReveal";

/* ==========================================================================
   PLAYED WHILE IT IS ON SCREEN, AGAIN AND AGAIN - UNTIL PAUSED
   --------------------------------------------------------------------------
   For Good to know's scenes, which each show a rule happening. Played once
   and left, they read as a still of the rule - the section felt static
   beside the page around it. So each goes round while it is on screen:

     play    from its opening pose to the rule's end state, `length`
             seconds
     hold    the end state, HOLD seconds - long enough to read it
     round   a quick fade, back to the opening pose unseen, and play again

   ONLY WHILE IT IS ON SCREEN. It starts once it reaches the middle half of
   the window - whatever its size, so a scene taller than a zoomed-in
   window still gets there, as it never did when a third of it had to be
   in view. Scrolled away entirely, it waits in its opening pose, where
   nobody sees it, and plays from the start when it comes back. Scenes
   started together begin `offset` seconds apart, so they never pulse in
   step.

   IT CAN BE PAUSED (WCAG 2.2.2): motion that starts by itself and runs
   longer than five seconds beside other content needs a way to stop it.
   `toggle` pauses - the scene shows its finished picture and stays - and
   plays again from the start. And while the card is pointed at with a
   mouse, or has the keyboard in it (`hold`), it does not go round:
   whoever is reading its words is not interrupted by the picture above
   them fading. A finger's tap is neither - a phone sends no "left" after
   one, and the card stayed held for good. Pressing Play lets go of both
   holds: whoever pressed it wants to watch.

   The server draws the finished picture ("rest"), which is also what a
   scene already on screen when the script starts shows first - held, then
   round. Under reduced motion it is only ever the finished picture.
   ========================================================================== */

const HOLD = 3.4;
const FADE = 0.28;

type HoldBy = "pointer" | "keys";

export function useLoop(ref: RefObject<Element | null>, length: number, offset = 0) {
  const still = useStill();
  const [mode, setModeState] = useState<Reveal>("rest");
  const [faded, setFaded] = useState(false);
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);
  const modeRef = useRef<Reveal>("rest");
  const pausedRef = useRef(false);
  const pointed = useRef(false);
  const keyed = useRef(false);
  const now = useRef(false);

  const setMode = (m: Reveal) => {
    modeRef.current = m;
    setModeState(m);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* Off screen when the script starts: wait in the opening pose. */
    const r = el.getBoundingClientRect();
    if (r.top >= window.innerHeight || r.bottom <= 0) setMode("wait");
    /* The newest entry decides - a busy moment can deliver two at once. */
    const on = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) setLive(true);
      },
      { rootMargin: "-25% 0px -25% 0px" },
    );
    const off = new IntersectionObserver((entries) => {
      if (!entries[entries.length - 1].isIntersecting) setLive(false);
    });
    on.observe(el);
    off.observe(el);
    return () => {
      on.disconnect();
      off.disconnect();
    };
  }, [ref]);

  useEffect(() => {
    if (still) return;
    if (paused) {
      /* Paused: the finished picture, and nothing more. */
      setFaded(false);
      setMode("rest");
      return;
    }
    /* Everything this run of the effect schedules stops with it - a play
       waiting on its frames included, which could otherwise start a
       scene just after Pause was pressed. */
    let cancelled = false;
    const timers: number[] = [];
    const later = (s: number, f: () => void) => {
      timers.push(window.setTimeout(() => !cancelled && f(), s * 1000));
    };
    const twoFrames = (f: () => void) =>
      requestAnimationFrame(() => requestAnimationFrame(() => !cancelled && f()));

    if (!live) {
      /* Gone from the screen: back to the opening pose, unseen. */
      if (modeRef.current === "play") setMode("wait");
      setFaded(false);
      return;
    }

    /* The next round is timed from when the scene actually starts - two
       frames after the opening pose is drawn - so on a slow device it
       cannot come round before the scene has finished. */
    const play = () => {
      setFaded(false);
      twoFrames(() => {
        setMode("play");
        later(length + HOLD, round);
      });
    };
    const round = () => {
      /* Being read: keep the finished picture a little longer. */
      if (pointed.current || keyed.current) {
        later(0.5, round);
        return;
      }
      setFaded(true);
      later(FADE, () => {
        setMode("wait");
        later(0.06, play);
      });
    };

    if (now.current) {
      now.current = false;
      round();
    } else if (modeRef.current === "wait") {
      later(offset, play);
    } else {
      /* The finished picture is what is showing: let it be read first. */
      later(HOLD + offset, round);
    }
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [live, still, paused, length, offset]);

  /* Pause, or play again from the start. */
  const toggle = useCallback(() => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    if (!next) {
      now.current = true;
      pointed.current = false;
      keyed.current = false;
    }
    setPaused(next);
  }, []);

  const hold = useCallback((by: HoldBy, on: boolean) => {
    (by === "pointer" ? pointed : keyed).current = on;
  }, []);

  return { mode: still ? ("rest" as const) : mode, faded: !still && faded, still, paused, toggle, hold };
}
