"use client";

import { useRef, useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { PartHead, PartWords, useLive, type Part } from "@/components/features/kit/chapter";
import { LAND, useTick } from "@/components/features/kit/compact";
import { ScreenWindow } from "@/components/features/kit/ScreenWindow";
import {
  AUTOMATION_CHAPTER as CHAPTER,
  PROGRAMS,
  QUESTIONS,
  TINTS,
  nameOf,
} from "@/components/features/operations/shared";

/* ==========================================================================
   04 AUTOMATION & INSIGHTS - THE RECIPE
   --------------------------------------------------------------------------
   Each feature as a recipe that runs while you watch, beside the real
   screen it runs in. Automation: an event comes in, and its steps light
   one after another as the signal drops from each to the next, ending in
   the run's result - then the next of the app's own programs, one of which
   fails and says why. The Analytics AI Agent: a question, the tools it
   looked up, its answer.

   CHOSEN FROM THREE on 2026-09-30 - a sentence that rewrote itself and one
   working day were the others - replacing the control desk the chapter
   was until the app's real screens came.

   One beat a second, six beats a recipe; still under reduced motion, where
   each shows its first recipe run through. It moves by itself for longer
   than five seconds, so it has a pause.
   ========================================================================== */

const BEAT = 1000;
const BEATS = 6;

type Tint = { light: string; deep: string };
const CYAN = TINTS.automation;
const GREEN = TINTS["analytics-ai-agent"];

const [AUTO, AGENT] = CHAPTER.parts;
const TRIGGERS = AUTO.groups.find((g) => g.id === "triggers")!;
const ASK = AGENT.groups.find((g) => g.id === "ask")!;

/* The kind of event a run's trigger is - "A form or an ad". */
const familyOf = (when: string) => TRIGGERS.items.find((c) => c.id === when)?.name ?? "";

/* The tools a question reached for, by name. */
const toolsOf = (ids: readonly string[]) =>
  ids
    .map((id) => ASK.items.find((c) => c.id === id)?.name)
    .filter(Boolean)
    .join(", ");

function Card({ lit, tint, label, children }: { lit: boolean; tint: Tint; label: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl bg-white/[0.06] px-3.5 py-2.5 ring-1 transition-[background-color,box-shadow] duration-300"
      style={
        lit
          ? { backgroundColor: `${tint.light}24`, boxShadow: `0 0 0 1px ${tint.light}, 0 0 24px -6px ${tint.light}` }
          : { boxShadow: "0 0 0 1px rgba(255,255,255,0.1)" }
      }
    >
      <p className="text-[10.5px] font-extrabold tracking-[0.12em] text-white/60 uppercase">{label}</p>
      <div className="mt-0.5 text-[14px] leading-snug font-bold">{children}</div>
    </div>
  );
}

/* The line from one step to the next, the signal dropping down it. */
function Wire({ on, tint, k }: { on: boolean; tint: Tint; k: string }) {
  return (
    <div aria-hidden className="relative ml-5 h-5 w-px bg-white/20">
      {on && (
        <span
          key={k}
          className="anim-drip absolute -left-[3px] size-[7px] rounded-full"
          style={{ backgroundColor: tint.light, boxShadow: `0 0 8px ${tint.light}`, "--len": "20px" } as React.CSSProperties}
        />
      )}
    </div>
  );
}

function AutomationRun({ tick, live }: { tick: number; live: boolean }) {
  const round = Math.floor(tick / BEATS);
  const p = PROGRAMS[live ? round % PROGRAMS.length : 0];
  const beat = live ? tick % BEATS : BEATS - 1;
  const n = p.then.length;
  return (
    <ol className="flex flex-col">
      <li>
        <Card lit={beat === 0} tint={CYAN} label={`When · ${familyOf(p.when)}`}>
          {p.on}
        </Card>
      </li>
      {p.then.map((id, i) => (
        <li key={`${round}-${id}-${i}`}>
          <Wire on={live && beat === i + 1} tint={CYAN} k={`${round}-${i}`} />
          <Card lit={beat >= i + 1 && beat <= n} tint={CYAN} label={`Step ${i + 1}`}>
            {nameOf(id)}
          </Card>
        </li>
      ))}
      <li>
        <Wire on={live && beat === n + 1} tint={CYAN} k={`${round}-end`} />
        <div
          className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-bold transition-opacity duration-300 ${beat > n ? "opacity-100" : "opacity-30"}`}
          style={{ backgroundColor: p.error ? "rgba(239,92,80,0.18)" : "rgba(52,211,153,0.16)" }}
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: p.error ? "#ef5c50" : "#34d399" }} />
            <span className="min-w-0">{p.error ? `Failed - ${p.error}` : "Succeeded"}</span>
          </span>
          <span className="shrink-0 text-[12px] font-semibold text-white/65">For {p.who}</span>
        </div>
      </li>
    </ol>
  );
}

function AgentRun({ tick, live }: { tick: number; live: boolean }) {
  const round = Math.floor(tick / BEATS);
  const q = QUESTIONS[live ? round % QUESTIONS.length : 0];
  const beat = live ? tick % BEATS : BEATS - 1;
  return (
    <ol className="flex flex-col">
      <li>
        <Card lit={beat === 0} tint={GREEN} label="You ask">
          {q.q}
        </Card>
      </li>
      <li>
        <Wire on={live && beat === 1} tint={GREEN} k={`${round}-1`} />
        <div className={`transition-opacity duration-300 ${beat >= 1 ? "opacity-100" : "opacity-30"}`}>
          <Card lit={beat === 1 || beat === 2} tint={GREEN} label="It looks up">
            <span className="flex items-center gap-1.5">
              <CheckIcon className="size-3.5 text-[#18c29c]" />
              {toolsOf(q.tools)}
            </span>
          </Card>
        </div>
      </li>
      <li>
        <Wire on={live && beat === 3} tint={GREEN} k={`${round}-3`} />
        <div className={`transition-opacity duration-300 ${beat >= 3 ? "opacity-100" : "opacity-30"}`}>
          <Card lit={beat >= 3} tint={GREEN} label="It answers">
            <span className="font-semibold text-white/90">{q.a}</span>
          </Card>
        </div>
      </li>
    </ol>
  );
}

/* A feature: its words, and beside them its recipe running next to its
   real screen - the picture first on a phone, where the words are long. */
function Feature({ part, tint, live, tick, flip }: { part: Part; tint: Tint; live: boolean; tick: number; flip: boolean }) {
  const shot = part.shot;
  return (
    <article
      id={part.slug}
      data-feature={part.slug}
      className={`${LAND} grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12`}
    >
      <div className={flip ? "lg:order-2" : ""}>
        <PartHead part={part} chapter={CHAPTER} />
        {shot && <p className="mt-2 text-[11.5px] font-extrabold tracking-[0.12em] text-ink/70 uppercase">In the app · {shot.where}</p>}
        <PartWords part={part} chapter={CHAPTER} className="mt-5" />
      </div>
      <div
        aria-hidden
        className={`grid items-start gap-4 rounded-[1.6rem] bg-[#0a1733] p-4 shadow-[0_40px_80px_-44px_rgba(6,16,42,0.9)] max-lg:order-first md:p-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] ${flip ? "lg:order-1" : ""}`}
      >
        <div className="text-white">
          <p className="mb-3 flex items-center gap-2 text-[10.5px] font-extrabold tracking-[0.14em] text-white/70 uppercase">
            <span className="relative flex size-1.5">
              {live && <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ backgroundColor: tint.light }} />}
              <span className="relative size-1.5 rounded-full" style={{ backgroundColor: tint.light }} />
            </span>
            {part.slug === "automation" ? "Running now" : "Asked just now"}
          </p>
          {part.slug === "automation" ? <AutomationRun tick={tick} live={live} /> : <AgentRun tick={tick} live={live} />}
        </div>
        {shot && (
          <div className="mx-auto w-full overflow-hidden rounded-2xl bg-[#f3f5f9]" style={{ maxWidth: shot.w }}>
            <ScreenWindow src={shot.src} w={shot.w} h={shot.h} label="" max={520} live={live} />
          </div>
        )}
      </div>
    </article>
  );
}

export function AutomationRecipe() {
  const root = useRef<HTMLDivElement>(null);
  const { seen, still } = useLive(root, 0.1);
  const [paused, setPaused] = useState(false);
  const live = seen && !still && !paused;
  const tick = useTick(live, BEAT);
  return (
    <section aria-label={CHAPTER.label} className="p-2 md:p-3">
      <div
        ref={root}
        className="relative overflow-hidden rounded-[1.5rem] bg-surface px-4 py-12 text-ink md:rounded-[2rem] md:px-10 md:py-16"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute top-[10%] left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[#00c8f8]/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-[84rem]">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[12.5px] font-extrabold tracking-[0.14em] text-ink/65 uppercase">{CHAPTER.name}, running</p>
            {/* Hidden where nothing moves. */}
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[12px] font-bold text-ink/75 transition-colors hover:text-ink motion-reduce:hidden"
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
          <div className="mt-8 flex flex-col gap-16 md:gap-20">
            <Feature part={AUTO} tint={CYAN} live={live} tick={tick} flip={false} />
            <Feature part={AGENT} tint={GREEN} live={live} tick={tick} flip />
          </div>
        </div>
      </div>
    </section>
  );
}
