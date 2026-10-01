"use client";

import { useRef } from "react";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { AdsMark, CalendarMark, PipelineMark, ReportsMark } from "@/components/ui/featureIcons";
import { DocGlyph } from "@/components/features/kit/glyphs";
import { FeatureLink } from "@/components/how/FeatureLink";
import { KnowShell, toneOf } from "@/components/how/know/shared";
import { useLoop } from "@/components/how/know/useLoop";
import { move, type Reveal } from "@/components/how/know/useReveal";
import { goodToKnow, type KnowNote } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - GOOD TO KNOW: THE RULES IN ACTION
   --------------------------------------------------------------------------
   Chosen from three - see know/shared.tsx for the other two.

   Each rule shown HAPPENING in the product, on a stage of its own colour
   above its words:

     the ad account     the business's own, stamped approved by Meta, and
                        one bill coming apart into two - Meta's and MnT
                        Future's
     the calendar       a new visit lands in iSuite AI's calendar and is
                        saved there, a sync reaches out to Google Calendar
                        and to Outlook and stops short - not supported -
                        and a no-show is ticked by hand
     the 24 hours       the clock runs out from the customer's last
                        message, free text locks, and the approved
                        template is what is left to send
     the reports        three reports rise, each with its own chart, and
                        Ad return joins what the ads cost to the deals
                        they won - the wins as the team records them

   EACH SCENE GOES ROUND WHILE IT IS ON SCREEN (useLoop): it plays, holds
   its end long enough to read, fades and plays again - the scenes on
   screen together a little apart. It was played once and left, and at a
   quarter of each card's size read as a still: the section felt static
   beside the page around it. "Pause" stops it on the finished picture and
   "Play" starts it again (WCAG 2.2.2), and a card being pointed at or
   tabbed into holds its picture while its words are read. Under reduced
   motion it is only the finished picture, with no button.

   THE CARDS ARE NOT FOUR OF ONE. From 1024 a wide card and a narrow one
   share each row, the other way round on the next; each stage is its
   rule's colour - Meta's violet, the calendar's blue, WhatsApp's green,
   the reports' teal - and the picture fills it, its type 11 to 15px, not
   the 9.5 to 13 it was drawn at when it sat small in a grey box.

   NOTHING IN THE SCENES IS THE JOURNEY'S - no Dental check-up ad, no
   Saturday booking, no "Yes, varen!", not even its days and times. It was
   redrawn once already for repeating the journey straight after it. Nor
   is the calendar a week of boxes: Getting started's, just below, is.
   No figures: the bills carry bars, the charts no values.
   ========================================================================== */

/* Each rule's stage, how long its scene takes to play, the columns its
   card takes from 1024, and how wide its scene may grow - further in a
   wide card, where at 29rem it left a third of the stage empty. */
const WIDE = { span: "lg:col-span-7", scene: "max-w-[36rem]", measure: "lg:max-w-[26rem]" };
const NARROW = { span: "lg:col-span-5", scene: "max-w-[29rem]", measure: "" };

/* A wide card's words are held to a shorter line from 1024, so they wrap
   to as many lines as the narrow card's beside them: at the narrow card's
   measure they took one line fewer, and left 44px of blank above the link
   that lines up with its neighbour's. */
const LOOK: Record<KnowNote["id"], { stage: string; length: number; span: string; scene: string; measure: string }> = {
  ad: { stage: "linear-gradient(155deg, #f5f3ff 0%, #e6e1ff 100%)", length: 2.4, ...WIDE },
  booking: { stage: "linear-gradient(155deg, #f2f7ff 0%, #dbe7ff 100%)", length: 2.6, ...NARROW },
  window: { stage: "linear-gradient(155deg, #effbf4 0%, #d3f2df 100%)", length: 3.2, ...NARROW },
  reports: { stage: "linear-gradient(155deg, #effafd 0%, #d4edf5 100%)", length: 2.6, ...WIDE },
};

const CARD = "shadow-[0_14px_30px_-20px_rgba(4,28,61,0.55)] ring-1 ring-black/5";

/* Moving parts. */
const rise = (mode: Reveal, at: number, dy = 12): React.CSSProperties => ({
  opacity: mode !== "wait" ? 1 : 0,
  translate: mode !== "wait" ? "0 0" : `0 ${dy}px`,
  ...move(mode, at, 0.5),
});
const pop = (mode: Reveal, at: number): React.CSSProperties => ({
  opacity: mode !== "wait" ? 1 : 0,
  scale: mode !== "wait" ? "1" : "0.5",
  ...move(mode, at, 0.35),
});

function Cross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

/* ---- the ad account ---------------------------------------------------------- */

const TEETH =
  "polygon(0 0, 100% 0, 100% calc(100% - 7px), 93.75% 100%, 87.5% calc(100% - 7px), 81.25% 100%, 75% calc(100% - 7px), 68.75% 100%, 62.5% calc(100% - 7px), 56.25% 100%, 50% calc(100% - 7px), 43.75% 100%, 37.5% calc(100% - 7px), 31.25% 100%, 25% calc(100% - 7px), 18.75% 100%, 12.5% calc(100% - 7px), 6.25% 100%, 0 calc(100% - 7px))";

/* A bill: it arrives as one, on top of the other, and the two come apart. */
function Bill({ who, what, color, from, mode }: { who: string; what: string; color: string; from: string; mode: Reveal }) {
  const on = mode !== "wait";
  return (
    <span className="block" style={{ translate: on ? "0 0" : from, ...move(mode, 1.25, 0.7) }}>
      <span
        className="block"
        style={{ opacity: on ? 1 : 0, filter: "drop-shadow(0 12px 12px rgba(4,28,61,0.14))", ...move(mode, 0.85, 0.35) }}
      >
        <span className="block bg-white px-3 pt-2.5 pb-5" style={{ borderTop: `4px solid ${color}`, clipPath: TEETH }}>
          <span className="block text-[13.5px] leading-tight font-extrabold">{who}</span>
          <span className="block text-[12px] text-ink/65">{what}</span>
          <span className="mt-2.5 block space-y-1.5">
            <span className="block h-1.5 w-[82%] rounded-full bg-ink/10" />
            <span className="block h-1.5 w-[58%] rounded-full bg-ink/10" />
          </span>
        </span>
      </span>
    </span>
  );
}

function AdAccount({ mode }: { mode: Reveal }) {
  const on = mode !== "wait";
  return (
    <div className="w-full">
      {/* IT IS THE ACCOUNT THAT IS APPROVED, said in so many words (§22:
          ads features need approval for the customer's own ad account). */}
      <div className={`relative flex items-center gap-3 rounded-2xl bg-white p-3.5 ${CARD}`} style={rise(mode, 0.05)}>
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#6d5cff] text-white">
          <AdsMark className="size-6" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] leading-tight font-extrabold">Your Meta ad account</span>
          <span className="mt-0.5 block text-[12.5px] text-ink/65">Where your ads run</span>
        </span>
        <span
          className="absolute -top-3 right-3 inline-flex items-center gap-1 rounded-md border-2 border-[#4b3fd1] bg-white px-2 py-0.5 text-[10.5px] font-extrabold tracking-[0.06em] text-[#4b3fd1] uppercase"
          style={{ rotate: "-5deg", opacity: on ? 1 : 0, scale: on ? "1" : "1.8", ...move(mode, 0.55, 0.3) }}
        >
          <CheckIcon className="size-3" />
          Approved by Meta
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Bill who="Meta" what="Ad charges" color="#6d5cff" from="calc(50% + 0.375rem) 0" mode={mode} />
        <Bill who="MnT Future" what="iSuite AI" color="#0a5bf5" from="calc(-50% - 0.375rem) 0" mode={mode} />
      </div>
      <p
        className="mt-3 flex items-center justify-center gap-2 text-[12.5px] font-extrabold text-[#4b3fd1]"
        style={{ opacity: on ? 1 : 0, ...move(mode, 1.9, 0.4) }}
      >
        <span className="h-px w-6 bg-[#4b3fd1]/40" />
        Billed separately
        <span className="h-px w-6 bg-[#4b3fd1]/40" />
      </p>
    </div>
  );
}

/* ---- the calendar -------------------------------------------------------------- */

function Calendars({ mode }: { mode: Reveal }) {
  const on = mode !== "wait";
  return (
    <div className="w-full">
      <div className={`rounded-2xl bg-white p-3.5 ${CARD}`} style={rise(mode, 0.05)}>
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand text-white">
            <CalendarMark className="size-[18px]" />
          </span>
          <span className="min-w-0">
            <span className="block text-[14px] leading-tight font-extrabold">iSuite AI calendar</span>
            <span className="block text-[12px] text-ink/65">Where every booking stays</span>
          </span>
        </div>
        {/* The booking, landing where it stays. One entry, not a week of
            boxes - Getting started's calendar just below is a week grid,
            and the journey's step 6 is a day and a time. "Saved here"
            drops under the words where the two do not fit side by side -
            on a 320-375px phone, where it cut them to "New…". */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1.5 rounded-xl border border-brand/20 bg-brand-tint px-3 py-2.5" style={rise(mode, 0.45, 8)}>
          <span className="flex items-center gap-2.5">
            <span className="size-2.5 shrink-0 rounded-full bg-brand" />
            <span className="text-[13px] font-extrabold whitespace-nowrap">New visit booked</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white px-1.5 py-0.5 text-[10.5px] font-bold text-[#0f7a40]" style={pop(mode, 0.85)}>
            <CheckIcon className="size-3" />
            Saved here
          </span>
        </div>
      </div>
      {/* A sync reaching out, and stopping short. */}
      <div className="mt-3 space-y-2">
        {["Google Calendar", "Outlook"].map((c, k) => (
          <div key={c} className="flex items-center gap-2">
            <span className="shrink-0 text-[11px] font-bold text-ink/75">Sync</span>
            <span
              className="h-0 min-w-4 flex-1 origin-left border-t-2 border-dashed border-brand/60"
              style={{ scale: on ? "1 1" : "0 1", ...move(mode, 1.0 + k * 0.3, 0.45) }}
            />
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#c0283f] text-white" style={pop(mode, 1.45 + k * 0.3)}>
              <Cross className="size-2.5" />
            </span>
            <span className="flex shrink-0 flex-col rounded-lg bg-white px-2.5 py-1.5 leading-tight ring-1 ring-black/5 sm:flex-row sm:items-center sm:gap-1.5">
              <span className="text-[12px] font-bold text-ink/80">{c}</span>
              <span className="text-[10.5px] font-extrabold text-[#b42335]">Not supported</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-black/5" style={rise(mode, 1.9, 8)}>
        <span className="text-[12.5px] font-bold">
          No-show? <span className="font-semibold text-ink/65">Marked by your team</span>
        </span>
        {/* Ticked by hand - it is never detected. */}
        <span
          className="grid size-5 shrink-0 place-items-center rounded-[6px] border-2"
          style={{ borderColor: on ? "#a15c07" : "#c9d1e0", backgroundColor: on ? "#a15c07" : "#ffffff", ...move(mode, 2.3, 0.3) }}
        >
          <CheckIcon className="size-3.5 text-white" style={{ opacity: on ? 1 : 0, ...move(mode, 2.4, 0.2) }} />
        </span>
      </div>
    </div>
  );
}

/* ---- the 24 hours ---------------------------------------------------------------- */

const RING = 30;
const ROUND = 2 * Math.PI * RING;

function Window({ mode }: { mode: Reveal }) {
  const on = mode !== "wait";
  const closeAt = 1.8;
  return (
    <div className="w-full">
      {/* The clock starts at the customer's last message - on two lines
          on a 320px phone rather than cut short. */}
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-black/5">
        <WhatsAppIcon className="size-4 shrink-0 text-[#1b9e5a]" />
        <span className="min-w-0 flex-1 text-[12px] leading-tight font-bold text-ink/80">Customer&apos;s last message</span>
        <span className="text-[11px] text-ink/65 tabular-nums">18:20</span>
      </div>
      <div className="mt-3 flex items-center gap-3.5">
        <span className={`relative grid size-[4.5rem] shrink-0 place-items-center rounded-full bg-white ${CARD}`}>
          <svg viewBox="0 0 72 72" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="36" cy="36" r={RING} fill="none" stroke="#e3e7f0" strokeWidth="6" />
            <circle
              cx="36"
              cy="36"
              r={RING}
              fill="none"
              stroke="#25d366"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={ROUND}
              style={{ strokeDashoffset: on ? ROUND : 0, ...move(mode, 0.2, 1.5) }}
            />
          </svg>
          <span className="text-[15px] font-extrabold">24h</span>
        </span>
        <span className="relative grid min-w-0 flex-1">
          {[
            { t: "Window open", s: "Any reply can be sent", open: true },
            { t: "24 hours have passed", s: "Only an approved template now", open: false },
          ].map((x) => (
            <span key={x.t} className="[grid-area:1/1]" style={{ opacity: (x.open ? !on : on) ? 1 : 0, ...move(mode, closeAt, 0.3) }}>
              <span className="block text-[14px] leading-tight font-extrabold">{x.t}</span>
              <span className="mt-0.5 block text-[12px] text-ink/65">{x.s}</span>
            </span>
          ))}
        </span>
      </div>
      {/* Free text locks, and the template is what is left. */}
      <div className="relative mt-3 grid">
        <span
          className="flex h-10 items-center justify-between rounded-full bg-white px-3.5 text-[12px] text-ink/65 ring-1 ring-black/5 [grid-area:1/1]"
          style={{ opacity: on ? 0 : 1, ...move(mode, closeAt, 0.3) }}
        >
          Type a message
          <span className="grid size-7 place-items-center rounded-full bg-[#00a884] text-white">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
              <path d="M3 20.5 21 12 3 3.5l2.5 8.5L3 20.5Z" />
            </svg>
          </span>
        </span>
        <span
          className="flex h-10 items-center gap-2 rounded-full bg-[#e3e7f0] px-3.5 text-[12px] font-bold text-ink/70 [grid-area:1/1]"
          style={{ opacity: on ? 1 : 0, ...move(mode, closeAt, 0.3) }}
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
          </svg>
          Free text closed
        </span>
      </div>
      <div
        className={`mt-2 flex items-center gap-2.5 rounded-xl bg-white p-2 pl-2.5 ${CARD}`}
        style={{ opacity: on ? 1 : 0, translate: on ? "0 0" : "0 12px", ...move(mode, closeAt + 0.35, 0.45) }}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#e7f9ee] text-[#0f7a40]">
          <DocGlyph className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] leading-tight font-extrabold">Approved template</span>
          <span className="block text-[11px] text-ink/65">The only kind allowed now</span>
        </span>
        <span className="shrink-0 rounded-full bg-[#0f7a40] px-3.5 py-1.5 text-[11.5px] font-bold text-white">Send</span>
      </div>
      <span className="mt-2.5 inline-flex rounded-md bg-white px-2 py-0.5 text-[10.5px] font-bold text-[#4b3fd1] ring-1 ring-black/5">
        Messages billed by Meta
      </span>
    </div>
  );
}

/* ---- the reports ------------------------------------------------------------------ */

function Reports({ mode }: { mode: Reveal }) {
  const on = mode !== "wait";
  const parts = [
    { t: "Dashboard", s: "The business at a glance", Icon: ReportsMark, bars: [45, 70, 55, 90] },
    { t: "Pipeline", s: "Deals by stage", Icon: PipelineMark, bars: [90, 65, 45, 28] },
    { t: "Ad return", s: "What each ad cost and won", Icon: AdsMark, bars: [35, 70, 50, 80] },
  ];
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2">
        {parts.map(({ t, s, Icon, bars }, k) => (
          /* Sized in three steps, because a third of a phone's card is
             barely wider than "Dashboard": 10px under 360, 12px from
             360, 12.5 from 640. One step, 12.5 from 360, left it 3px
             wider than its box on 360-375px phones. */
          <span key={t} className={`flex min-w-0 flex-col rounded-xl bg-white p-1.5 min-[360px]:p-2 sm:p-2.5 ${CARD}`} style={rise(mode, 0.1 + k * 0.18)}>
            <span className="grid size-7 place-items-center rounded-lg bg-[#e1f4f8] text-[#0b6f80]">
              <Icon className="size-4" />
            </span>
            <span className="mt-2 text-[10px] leading-tight font-extrabold min-[360px]:text-[12px] sm:text-[12.5px]">{t}</span>
            <span className="mt-0.5 hidden text-[10.5px] leading-snug text-ink/65 min-[360px]:block">{s}</span>
            {/* A chart with no values on it. */}
            <span aria-hidden className="mt-2.5 flex h-10 items-end gap-1">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 origin-bottom rounded-sm bg-[#0b6f80]/35"
                  style={{ height: `${h}%`, scale: on ? "1 1" : "1 0.1", ...move(mode, 0.5 + k * 0.18 + i * 0.07, 0.5) }}
                />
              ))}
            </span>
          </span>
        ))}
      </div>
      {/* Ad return joins the two ends - what the ads cost, and the deals
          they brought in - as far as the team has marked them won. It
          was a line reaching for a report that joins them and breaking
          off, "not in the product"; the app has that report. */}
      <div className="mt-4 flex items-center gap-2">
        <span className={`shrink-0 rounded-lg bg-white px-2 py-1 text-[11px] font-extrabold ${CARD}`} style={rise(mode, 1.2)}>
          Ad spend
        </span>
        <span
          className="h-0 flex-1 origin-left border-t-2 border-[#0b6f80]/60"
          style={{ scale: on ? "1 1" : "0 1", ...move(mode, 1.35, 0.5) }}
        />
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#0f7a40] text-white" style={pop(mode, 1.85)}>
          <CheckIcon className="size-3" />
        </span>
        <span
          className="h-0 flex-1 origin-right border-t-2 border-[#0b6f80]/60"
          style={{ scale: on ? "1 1" : "0 1", ...move(mode, 1.35, 0.5) }}
        />
        <span className={`shrink-0 rounded-lg bg-white px-2 py-1 text-[11px] font-extrabold ${CARD}`} style={rise(mode, 1.2)}>
          Won deals
        </span>
      </div>
      <p className="mt-2 text-center text-[12px] leading-snug font-bold text-ink/75" style={{ opacity: on ? 1 : 0, ...move(mode, 2.0, 0.4) }}>
        Ad return &middot; counts the wins your team records
      </p>
    </div>
  );
}

const SCENES: Record<KnowNote["id"], (p: { mode: Reveal }) => React.ReactNode> = {
  ad: AdAccount,
  booking: Calendars,
  window: Window,
  reports: Reports,
};

function PauseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1.2" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7 5.2v13.6c0 .8.9 1.3 1.6.9l10.4-6.8a1 1 0 0 0 0-1.8L8.6 4.3C7.9 3.9 7 4.4 7 5.2Z" />
    </svg>
  );
}

/* ---- a rule, and its scene ------------------------------------------------- */

function Rule({ note, index }: { note: KnowNote; index: number }) {
  const stage = useRef<HTMLDivElement>(null);
  const look = LOOK[note.id];
  /* The second of each pair a little behind the first: side by side from
     1024 they reach the screen together. A scene alone on screen waits
     no more than that - it once waited up to 2.1s, blank, for its turn. */
  const { mode, faded, still, paused, toggle, hold } = useLoop(stage, look.length, (index % 2) * 0.6);
  const Scene = SCENES[note.id];
  const tone = toneOf(note);
  return (
    /* From 768 to 1023, one rule a row, its scene beside its words.

       Pointed at with a mouse, or with the keyboard inside it, the card
       holds its finished picture rather than going round - see useLoop. A
       tap is neither: a phone never says the finger has left. */
    <li
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hold("pointer", true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") hold("pointer", false);
      }}
      onFocus={(e) => {
        if ((e.target as Element).matches(":focus-visible")) hold("keys", true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hold("keys", false);
      }}
      className={`flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white md:max-lg:grid md:max-lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] ${look.span}`}
    >
      <div
        ref={stage}
        aria-hidden
        className="relative flex min-h-[16.5rem] items-center justify-center overflow-hidden px-5 py-7 lg:h-[19rem] lg:py-6"
        style={{ background: look.stage }}
      >
        <span
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(4,28,61,0.06) 1px, transparent 1.3px)", backgroundSize: "16px 16px" }}
        />
        <div className={`relative flex w-full justify-center ${look.scene}`} style={{ opacity: faded ? 0 : 1, transition: "opacity 0.28s ease" }}>
          <Scene mode={mode} />
        </div>
      </div>
      <div className="flex flex-1 flex-col border-t border-line p-5 md:p-6 md:max-lg:justify-center md:max-lg:border-t-0 md:max-lg:border-l">
        <div className="flex items-center justify-between gap-3">
          {/* The step, in the colour of whoever does it - as the journey's
              numbered stops wear it. */}
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-[0.1em] text-white uppercase"
            style={{ backgroundColor: tone.deep }}
          >
            {note.label}
          </span>
          {/* Pause, and play again from the start - motion that runs by
              itself for more than five seconds needs a way to stop it
              (WCAG 2.2.2). Its name starts with the word it shows. */}
          {!still && (
            <button
              type="button"
              onClick={toggle}
              aria-label={`${paused ? "Play" : "Pause"}: ${note.title}`}
              className="-my-1.5 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-bold text-ink/70 transition-colors hover:bg-brand-tint hover:text-brand"
            >
              {paused ? <PlayGlyph className="size-3.5" /> : <PauseGlyph className="size-3.5" />}
              {paused ? "Play" : "Pause"}
            </button>
          )}
        </div>
        <h3 className="mt-3 text-[19px] leading-snug font-extrabold">{note.title}</h3>
        {/* Held to about sixty characters a line - shorter in a wide card
            (LOOK), so it runs to as many lines as its neighbour's. */}
        <p className={`mt-2 max-w-[31rem] text-[15px] leading-relaxed text-ink/75 ${look.measure}`}>{note.line}</p>
        {/* At the foot from 1024, level across a row of cards whose
            words run to different lengths - where the rule has a feature
            on the list to point to. */}
        {note.feature && (
          <div className="flex pt-4 lg:mt-auto lg:pt-5">
            <FeatureLink slug={note.feature} />
          </div>
        )}
      </div>
    </li>
  );
}

export function InAction() {
  return (
    <KnowShell>
      {/* Twelve columns from 1024: seven and five, then five and seven. */}
      <ol className="grid gap-4 lg:grid-cols-12">
        {goodToKnow.notes.map((n, i) => (
          <Rule key={n.id} note={n} index={i} />
        ))}
      </ol>
    </KnowShell>
  );
}
