import Image from "next/image";
import { ads } from "@/lib/content/ads";
import type { Step } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - THE JOURNEY: THE CUSTOMER'S SIDE
   --------------------------------------------------------------------------
   What Anand sees, step by step, drawn as WhatsApp draws it: the customer's
   own messages on the right in green with read ticks, the business on the
   left in white, the ad the chat was opened from above the first message,
   and a chip where the day changes. The business is "Your clinic" - the
   reader's own.

   A STEP THE CUSTOMER NEVER SEES SAYS SO, in the pale yellow WhatsApp uses
   for its own notices in a chat, rather than leaving an empty stretch of
   chat that reads as a gap - each of the six, the last four included.
   Everything in this column is something WhatsApp itself would show.

   EACH STEP PLAYS ONCE, as it scrolls in (see BothSides): the business's
   messages are typed first. `Mode` says where a step is in that - "rest"
   is the finished picture, which is what the server sends and what stays
   if no script runs; "wait" keeps each element's room with nothing in it
   yet; "play" brings them in.
   ========================================================================== */

export type Mode = "rest" | "wait" | "play";

/* The class an element wears in each mode. */
export const fx = (mode: Mode, anim: string) => (mode === "rest" ? "" : mode === "wait" ? "opacity-0" : anim);

export const delay = (s: number) => ({ "--d": `${s.toFixed(2)}s` }) as React.CSSProperties;

const POSTER = ads.studio.turns[0].attachment;

/* When each of a step's messages lands: the business's are typed for TYPE
   seconds first. `end` is when the last has landed - the team's side of the
   step follows it, so a reply is seen to be sent before it is logged. */
const TYPE = 0.8;

export function chatPlan(step: Step) {
  let t = 0.15;
  const plan = step.chat.map((b) => {
    if (b.from === "business") {
      const p = { typing: t, bubble: t + TYPE };
      t += TYPE + 0.4;
      return p;
    }
    const p = { typing: undefined, bubble: t };
    t += 0.5;
    return p;
  });
  return { plan, end: step.chat.length ? t : 0.1 };
}

/* The clinic's picture: its own poster artwork. */
export function ClinicFace({ className = "size-9" }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-ink via-[#0a2f7a] to-brand-dark ${className}`}
    >
      {POSTER?.image.src && (
        <Image src={POSTER.image.src} alt="" width={40} height={40} sizes="40px" className="size-[76%] object-contain" />
      )}
    </span>
  );
}

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" className="inline-block h-[9px] w-[13px] text-[#53bdeb]" aria-hidden>
      <path
        d="M1 5.8 3.9 8.7 9.6 2.2M6.6 8.7 12.3 2.2M7.2 7.3l1.4 1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dots() {
  return (
    <span className="flex items-center gap-[3px] py-[3px]">
      {[0, 0.15, 0.3].map((d) => (
        <span key={d} className="anim-dot size-[5px] rounded-full bg-ink/45" style={delay(d)} />
      ))}
    </span>
  );
}

/* The ad the chat was opened from, as WhatsApp shows it over the first
   message sent from a click-to-WhatsApp ad. */
function AdCard() {
  return (
    <span className="mb-1.5 flex items-center gap-2 overflow-hidden rounded-md border-l-[3px] border-[#06cf9c] bg-[#c8f2c0]/70 py-1 pr-2.5 pl-1.5">
      <span className="grid size-9 shrink-0 place-items-center rounded bg-gradient-to-br from-ink via-[#0a2f7a] to-brand-dark">
        {POSTER?.image.src && (
          <Image src={POSTER.image.src} alt="" width={40} height={40} sizes="36px" className="size-7 object-contain" />
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12px] leading-tight font-extrabold text-ink">{POSTER?.title}</span>
        <span className="block truncate text-[10.5px] leading-tight text-ink/70">Ad &middot; Your clinic</span>
      </span>
    </span>
  );
}

export function DayChip({ label, mode }: { label: string; mode: Mode }) {
  return (
    <span
      className={`self-center rounded-md bg-white/90 px-2.5 py-0.5 text-[10.5px] font-bold tracking-[0.08em] text-ink/65 uppercase shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${fx(mode, "anim-bubble")}`}
    >
      {label}
    </span>
  );
}

/* A step's messages. */
export function Messages({ step, mode }: { step: Step; mode: Mode }) {
  const { plan } = chatPlan(step);
  return (
    <>
      {step.chat.map((b, k) => {
        const mine = b.from === "customer";
        const p = plan[k];
        return (
          <div key={k} className={`relative flex ${mine ? "justify-end" : "justify-start"}`}>
            {mode === "play" && p.typing !== undefined && (
              <span
                aria-hidden
                className="anim-typing absolute top-0 left-0 rounded-2xl rounded-tl-md bg-white px-3 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.08)]"
                style={{ ...delay(p.typing), "--dur": `${TYPE + 0.15}s` } as React.CSSProperties}
              >
                <Dots />
              </span>
            )}
            <p
              className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[14px] leading-snug text-ink shadow-[0_1px_1px_rgba(0,0,0,0.08)] ${
                mine ? "rounded-tr-md bg-[#d9fdd3]" : "rounded-tl-md bg-white"
              } ${fx(mode, "anim-bubble")}`}
              style={delay(p.bubble)}
            >
              {step.n === 1 && k === 0 && <AdCard />}
              {b.text}
              <span className="ml-2 inline-flex translate-y-[2px] items-center gap-0.5 text-[10.5px] text-ink/65 tabular-nums">
                {step.time}
                {mine && <Ticks />}
              </span>
            </p>
          </div>
        );
      })}
    </>
  );
}

/* A step that never reaches the customer's phone. */
export function QuietNote({ mode }: { mode: Mode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 self-center rounded-lg bg-[#fdf4c5] px-3 py-1.5 text-[12px] leading-snug font-semibold text-[#5f5323] shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${fx(mode, "anim-bubble")}`}
      style={delay(0.15)}
    >
      <EyeOff className="size-3.5 shrink-0" />
      Nothing new on Anand&apos;s phone
    </span>
  );
}

function EyeOff({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        d="M3 3l18 18M10.6 5.1A9.7 9.7 0 0 1 12 5c5 0 8.5 4.2 9.5 7-.4 1.1-1.2 2.5-2.4 3.8M6.2 6.7C4.5 8 3.2 9.8 2.5 12c1 2.8 4.5 7 9.5 7 1.8 0 3.4-.5 4.8-1.3M9.9 9.9a3 3 0 0 0 4.2 4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

