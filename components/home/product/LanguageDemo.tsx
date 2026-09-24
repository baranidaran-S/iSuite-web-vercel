"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { features } from "@/lib/content/features";

/* ==========================================================================
   THE LANGUAGE DEMONSTRATION
   --------------------------------------------------------------------------
   The one dark object in a light section, and the only feature on this page
   that gets shown rather than listed. It earns that because it is the claim
   an Indian business will not take on trust: everybody says their assistant
   handles regional languages, and a visitor who speaks Tamil can tell in one
   second whether ours actually does.

   SO IT DOES NOT SAY IT, IT DOES IT. The same enquiry and the same answer
   cycle through Tamil, Tanglish, English and Hindi on a timer. A visitor
   who reads Tamil sees Tamil arrive without asking. A visitor who does not
   watches the assistant change language anyway, which makes the point just
   as well.

   IT IS ALSO A CONTROL. The pills are buttons, so anyone who wants to check
   a particular language can, and the timer stops the moment they do - a
   carousel that keeps moving under someone who has just chosen something is
   a carousel that is ignoring them.

   IT IS RAISED, NOT INVERTED. It used to be the one dark object in a light
   section. The section is night now, so a panel on --color-ink would be
   dark-on-dark and lose its edge; this sits on --color-night-card, the tone
   section 2 already uses for "lifted off the night ground", with a brand
   bloom behind it so the eye still finds it first.

   THE SCRIPT FALLBACK IS REAL AND UNFIXED. Manrope has no Tamil or
   Devanagari glyphs, so those two turns render in whatever the OS provides -
   Nirmala UI on Windows, Noto on Android. It is legible everywhere and it
   does not match. A proper fix is loading Noto Sans Tamil and Noto Sans
   Devanagari; it is in lib/site.ts as a launch item rather than being
   quietly ignored.
   ========================================================================== */

const HOLD_MS = 3600;
const TURNS = features.language.turns;

export function LanguageDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const still = reduced === true;

  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (still || held || !inView) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % TURNS.length), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [still, held, inView, i]);

  const turn = TURNS[i];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[1.25rem] bg-night-card ring-1 ring-white/10 md:rounded-[1.5rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/4 h-[28rem] w-[38rem] rounded-full bg-brand/25 blur-[120px]"
      />
      <div className="relative grid gap-7 p-6 md:p-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12 lg:p-10">
        {/* ---- WHAT IT IS ---- */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-bold tracking-[0.1em] text-white/75 uppercase">
            {features.language.note}
          </p>

          <h3 className="mt-5 text-[1.7rem] leading-[1.14] font-extrabold text-white sm:text-[2.1rem] lg:text-[2.4rem]">
            {features.language.label}
          </h3>

          <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-night-muted md:text-[17.5px]">
            {features.language.line}
          </p>

          {/* The pills double as the legend and the control. */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {TURNS.map((t, n) => {
              const on = n === i;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setI(n);
                      setHeld(true);
                    }}
                    aria-pressed={on}
                    className={
                      "rounded-full px-4 py-2.5 text-[14.5px] font-bold transition-colors md:text-[15.5px] " +
                      (on
                        ? "bg-white text-ink"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white")
                    }
                  >
                    <span className="sr-only">{t.name}: </span>
                    {t.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---- THE EXCHANGE ----
            A fixed minimum height, because the four turns are different
            lengths and a panel that resizes on every swap reads as the page
            twitching rather than as a language changing. */}
        <div className="flex min-h-[224px] flex-col justify-center gap-3 rounded-2xl bg-white/[0.06] p-5 md:min-h-[238px] md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={turn.id}
              initial={still ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <span className="max-w-[88%] self-start rounded-2xl rounded-tl-md bg-white/12 px-4 py-3">
                <span className="block text-[15.5px] leading-snug text-white md:text-[16.5px]">
                  {turn.ask}
                </span>
                <span className="mt-1.5 block text-[12.5px] font-semibold text-white/50">
                  Anand R. &middot; WhatsApp
                </span>
              </span>

              <span className="max-w-[92%] self-end rounded-2xl rounded-br-md bg-brand px-4 py-3">
                <span className="block text-[15.5px] leading-snug text-white md:text-[16.5px]">
                  {turn.reply}
                </span>
                <span className="mt-1.5 flex items-center justify-end gap-1.5">
                  <span className="rounded bg-white/20 px-2 py-0.5 text-[11.5px] font-bold text-white">
                    &#10022; AI
                  </span>
                  <WhatsAppIcon className="size-3.5 text-white/70" />
                </span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
