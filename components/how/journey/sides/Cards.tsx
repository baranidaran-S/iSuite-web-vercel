import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import {
  AdsMark,
  AssistantMark,
  CalendarMark,
  ContactsMark,
  FollowUpMark,
  InboxMark,
  PipelineMark,
  ReportsMark,
  TeamMark,
} from "@/components/ui/featureIcons";
import { Avatar } from "@/components/features/minis/parts";
import { DocGlyph, SparkGlyph } from "@/components/features/kit/glyphs";
import { CAST_TONE } from "@/components/how/Cast";
import { delay, fx, type Mode } from "@/components/how/journey/sides/Chat";
import type { Step } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - THE JOURNEY: THE TEAM'S SIDE
   --------------------------------------------------------------------------
   What the team sees change at each step, drawn as the part of iSuite AI
   it changes: the conversation arriving in the inbox, the contact and
   deal opening, the assistant's reply marked as the assistant's, the
   answers saved into fields, the booking on the calendar, the hand-over
   to Sara, Sara's note to Ravi, the follow-up ticked off - and sent as a
   template, WhatsApp's 24 hours being long past by then - the deal's stage,
   the win and its reason, the reports, and what goes back to Meta.

   THE WORDS ARE THE CONTENT FILE'S. Each card's heading and its lines are
   the step's own `record` lines from lib/content/howItWorks.ts; the card
   only draws them the way the product would.

   EACH CARD IS HEADED IN THE COLOUR OF WHOEVER DID THE STEP - the cast's
   colours from the hero - and ringed in it while its step is the one
   being read. It comes in once the step's messages have landed, its parts
   stamped in one after another. No figures anywhere: the reports say what
   was counted, never a number.
   ========================================================================== */

const STAGES = ["New Enquiry", "Qualified", "Appointment Booked", "Discussion", "Won"] as const;
const SHORT = ["New", "Qualified", "Booked", "Discussion", "Won"] as const;
const GREEN = "#1b9e5a";

function Frame({
  step,
  mode,
  at,
  lit,
  icon,
  label,
  children,
}: {
  step: Step;
  mode: Mode;
  at: number;
  lit: boolean;
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  const tone = CAST_TONE[step.actor];
  return (
    <div
      className={`w-full max-w-[25rem] rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(4,28,61,0.06),0_12px_26px_-20px_rgba(4,28,61,0.45)] ring-1 ring-line transition-shadow duration-500 ${fx(mode, "anim-rise")}`}
      style={{
        ...delay(at),
        ...(lit ? { boxShadow: `0 0 0 2px ${tone.light}, 0 16px 32px -20px ${tone.light}` } : {}),
      }}
    >
      <p className="flex items-center gap-2">
        <span
          className="grid size-[22px] shrink-0 place-items-center rounded-lg"
          style={{ backgroundColor: `${tone.light}1f`, color: tone.deep }}
        >
          {icon}
        </span>
        <span className="min-w-0 text-[12px] leading-tight font-extrabold text-ink">{label}</span>
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/* One part of a card, stamped in after the card itself. */
function Stamp({
  mode,
  at,
  className = "",
  children,
}: {
  mode: Mode;
  at: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`${className} ${fx(mode, "anim-pop")}`} style={delay(at)}>
      {children}
    </span>
  );
}

function Pill({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11.5px] leading-tight font-bold whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}

function Face({ letter, className }: { letter: string; className: string }) {
  return (
    <span
      className={`grid size-6 shrink-0 place-items-center rounded-full text-[10.5px] font-extrabold ring-2 ring-white ${className}`}
    >
      {letter}
    </span>
  );
}

const SARA = "bg-[#eef3ff] text-brand";
const RAVI = "bg-[#fff1e0] text-[#8a5212]";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 text-ink/55" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
      <path d="M5 12h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* A deal moving to the stage named after its arrow - "Deal → Qualified". */
function StageMove({ line }: { line: string }) {
  const to = line.split("→")[1]?.trim() ?? line;
  const i = STAGES.indexOf(to as (typeof STAGES)[number]);
  const from = i > 0 ? STAGES[i - 1] : undefined;
  return (
    <span className="flex flex-wrap items-center gap-1.5 text-[11.5px] font-bold">
      <span className="text-ink/65">Deal</span>
      {from && <span className="rounded-md bg-[#f2f4f9] px-1.5 py-0.5 text-ink/65 line-through decoration-ink/30">{from}</span>}
      <Arrow />
      <span className="rounded-md bg-[#eef3ff] px-1.5 py-0.5 text-[#0847d6]">{to}</span>
    </span>
  );
}

/* Each stage at least as wide as its name. Five equal fifths cut
   "Discussion" and "Qualified" short on a 320-375px phone and at 1024,
   where a fifth of the card is under 50px. */
function Track({ stage, won = false }: { stage: number; won?: boolean }) {
  return (
    <span className="flex gap-1">
      {STAGES.map((s, i) => (
        <span key={s} className="min-w-0 flex-auto">
          <span
            className="block h-1.5 rounded-full"
            style={{ backgroundColor: i <= stage ? (won ? GREEN : i === stage ? "#0a5bf5" : "#9dbbf7") : "#e8ecf4" }}
          />
          <span
            className={`mt-1 block truncate text-[9.5px] leading-none ${i === stage ? "font-extrabold text-ink" : "font-semibold text-ink/65"}`}
          >
            {SHORT[i]}
          </span>
        </span>
      ))}
    </span>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <span className="block min-w-0 rounded-xl bg-[#f5f7fb] px-2.5 py-2">
      <span className="block text-[9.5px] font-bold tracking-[0.08em] text-ink/65 uppercase">{k}</span>
      <span className="mt-0.5 block truncate text-[13px] leading-tight font-extrabold">{v}</span>
    </span>
  );
}

/* ---- the thirteen ------------------------------------------------------------ */

export function RecordCard({
  step,
  mode,
  at,
  lit,
}: {
  step: Step;
  mode: Mode;
  /* When the card comes in, after the step's messages. */
  at: number;
  lit: boolean;
}) {
  const r = step.record;
  const f = { step, mode, at, lit };
  const s = (k: number) => at + 0.35 + k * 0.14;

  switch (step.n) {
    case 1:
      return (
        <Frame {...f} icon={<InboxMark className="size-3.5" />} label={r[0]}>
          <span className="flex items-center gap-2.5 rounded-xl bg-[#f1fbf5] p-2">
            <Avatar name="Anand R." tint={0} className="size-9 text-[13px]" />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-[13px] font-extrabold">
                Anand R.
                <WhatsAppIcon className="size-3.5 text-wa" />
                <Stamp mode={mode} at={s(0)} className="rounded bg-[#0f7a40] px-1 py-px text-[9px] font-extrabold tracking-[0.06em] text-white uppercase">
                  New
                </Stamp>
              </span>
              {/* Wraps rather than truncates, as the last message does in
                  "Good to know": cut, it read "Saturday check-up ku slot
                  irukk…" on every screen under 1280px. */}
              <span className="mt-0.5 block text-[12px] leading-snug font-semibold text-ink/70">{step.chat[0]?.text}</span>
            </span>
            <span className="flex flex-col items-end gap-1">
              <span className="text-[10.5px] font-bold text-[#0f7a40] tabular-nums">{step.time}</span>
              <Stamp mode={mode} at={s(1)} className="grid size-4 place-items-center rounded-full bg-[#0f7a40] text-[9px] font-extrabold text-white">
                1
              </Stamp>
            </span>
          </span>
        </Frame>
      );

    case 2:
      return (
        <Frame {...f} icon={<ContactsMark className="size-3.5" />} label={r[0]}>
          <span className="flex items-center gap-2.5">
            <Avatar name="Anand R." tint={0} className="size-9 text-[13px]" />
            <span className="min-w-0">
              <span className="block text-[13.5px] leading-tight font-extrabold">Anand R.</span>
              <span className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-ink/65">
                <WhatsAppIcon className="size-3 text-wa" />
                WhatsApp
              </span>
            </span>
          </span>
          <span className="mt-2.5 flex flex-wrap gap-1.5">
            <Stamp mode={mode} at={s(0)}>
              <Pill className="bg-[#eef3ff] text-[#0847d6]">
                <PipelineMark className="size-3.5" />
                {r[1]}
              </Pill>
            </Stamp>
            <Stamp mode={mode} at={s(1)}>
              <Pill className="bg-[#eef3ff] text-[#1a4fb8]">
                <AdsMark className="size-3.5" />
                {r[2]}
              </Pill>
            </Stamp>
          </span>
        </Frame>
      );

    case 3:
      return (
        <Frame {...f} icon={<AssistantMark className="size-3.5" />} label={r[0]}>
          <span className="block rounded-2xl rounded-tl-md bg-brand-tint px-3 py-2 text-[13px] leading-snug text-ink">
            {step.chat[0]?.text}
            <Stamp
              mode={mode}
              at={s(0)}
              className="ml-1.5 inline-flex items-center gap-0.5 rounded bg-brand px-1.5 py-px align-[1px] text-[9.5px] font-bold text-white"
            >
              <SparkGlyph className="size-2.5" />
              AI
            </Stamp>
          </span>
        </Frame>
      );

    case 4:
      /* "Asked" drops under the question where the two do not fit side by
         side - below 1280, where it cut "Which branch?" to "Which b…". */
      return (
        <Frame {...f} icon={<SparkGlyph className="size-3.5" />} label={r[0]}>
          <span className="grid grid-cols-2 gap-1.5">
            {["First visit?", "Which branch?"].map((q, k) => (
              <Stamp key={q} mode={mode} at={s(k)} className="block">
                <span className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 rounded-xl bg-[#f5f7fb] px-2.5 py-2">
                  <span className="text-[12.5px] leading-tight font-extrabold">{q}</span>
                  <span className="inline-flex shrink-0 items-center gap-0.5 rounded bg-brand-tint px-1 py-px text-[9.5px] font-bold text-brand">
                    <SparkGlyph className="size-2.5" />
                    Asked
                  </span>
                </span>
              </Stamp>
            ))}
          </span>
        </Frame>
      );

    case 5:
      return (
        <Frame {...f} icon={<ContactsMark className="size-3.5" />} label="Saved from the chat">
          <span className="grid grid-cols-2 gap-1.5">
            <Stamp mode={mode} at={s(0)} className="block">
              <Field k="Visit type" v={r[0]} />
            </Stamp>
            <Stamp mode={mode} at={s(1)} className="block">
              <Field k="Branch" v={r[1].replace(/^Branch:\s*/, "")} />
            </Stamp>
          </span>
          <Stamp mode={mode} at={s(2)} className="mt-2 block">
            <StageMove line={r[2]} />
          </Stamp>
        </Frame>
      );

    case 6:
      return (
        <Frame {...f} icon={<CalendarMark className="size-3.5" />} label={r[0]}>
          <span className="flex items-center gap-3">
            <Stamp mode={mode} at={s(0)} className="grid w-[3.4rem] shrink-0 place-items-center rounded-xl bg-brand py-1.5 text-white">
              <span className="text-[9.5px] font-bold tracking-[0.1em] uppercase opacity-80">Sat</span>
              <span className="text-[16px] leading-tight font-extrabold tabular-nums">11:00</span>
            </Stamp>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-extrabold">Anand R. &middot; First visit</span>
              <span className="block text-[11.5px] font-semibold text-ink/65">Anna Nagar</span>
              <Stamp mode={mode} at={s(1)} className="mt-1 inline-flex items-center gap-1 rounded-md bg-[#e6f7ee] px-1.5 py-0.5 text-[10px] font-bold text-[#1b7a4b]">
                Reminder set
              </Stamp>
            </span>
          </span>
          <Stamp mode={mode} at={s(2)} className="mt-2.5 block">
            <StageMove line={r[1]} />
          </Stamp>
        </Frame>
      );

    case 7:
      return (
        <Frame {...f} icon={<TeamMark className="size-3.5" />} label={r[0]}>
          <span className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-tint px-2 py-1 text-[11.5px] font-bold text-brand">
              <SparkGlyph className="size-3" />
              Sales AI Agent
            </span>
            <Arrow />
            <Stamp
              mode={mode}
              at={s(0)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#fff6ea] py-0.5 pr-2.5 pl-0.5 text-[12px] font-extrabold text-[#a15c07]"
            >
              <Face letter="S" className={SARA} />
              Sara
            </Stamp>
          </span>
          <span className="mt-2 block text-[11.5px] font-semibold text-ink/65">With the whole conversation already in it</span>
        </Frame>
      );

    case 8:
      return (
        <Frame {...f} icon={<TeamMark className="size-3.5" />} label="Internal note">
          <Stamp mode={mode} at={s(0)} className="block rounded-xl bg-[#fff7df] px-3 py-2">
            <span className="block text-[13px] leading-snug font-bold text-[#6b4a00]">{r[0]}</span>
            <span className="mt-1 flex items-center gap-1.5 text-[10.5px] font-semibold text-[#8a6a1f]">
              <span className="flex -space-x-1.5">
                <Face letter="S" className={SARA} />
                <Face letter="R" className={RAVI} />
              </span>
              Only your team sees it
            </span>
          </Stamp>
        </Frame>
      );

    case 9:
      return (
        <Frame {...f} icon={<FollowUpMark className="size-3.5" />} label="Sara's due list">
          <span className="flex items-center gap-2.5 rounded-xl border border-line px-2.5 py-2">
            <Stamp mode={mode} at={s(0)} className="grid size-5 shrink-0 place-items-center rounded-md bg-[#1b7a4b] text-white">
              <CheckIcon className="size-3" />
            </Stamp>
            <span className="min-w-0 flex-1 text-[12.5px] leading-snug font-bold text-ink/65 line-through decoration-ink/30">
              {r[0].replace(/\s·\sdone$/, "")}
            </span>
            <Stamp mode={mode} at={s(1)} className="shrink-0 rounded-md bg-[#e6f7ee] px-1.5 py-0.5 text-[10px] font-bold text-[#1b7a4b]">
              Done
            </Stamp>
          </span>
          <Stamp mode={mode} at={s(2)} className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[#e7f9ee] px-1.5 py-0.5 text-[10.5px] font-bold text-[#0f7a40]">
            <DocGlyph className="size-3 shrink-0" />
            {r[1]}
          </Stamp>
        </Frame>
      );

    case 10:
      return (
        <Frame {...f} icon={<PipelineMark className="size-3.5" />} label={r[0]}>
          <Track stage={3} />
          <span className="mt-2 flex items-center justify-between gap-2">
            <Stamp mode={mode} at={s(0)} className="text-[13px] font-extrabold text-[#0847d6]">
              Discussion
            </Stamp>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-ink/65">
              <Face letter="R" className={RAVI} />
              Moved by Ravi
            </span>
          </span>
        </Frame>
      );

    case 11:
      return (
        <Frame {...f} icon={<CheckIcon className="size-3.5" />} label="Deal closed">
          <span className="flex items-center gap-2.5">
            <Stamp mode={mode} at={s(0)} className="shrink-0 rounded-lg bg-[#0f7a40] px-2.5 py-1 text-[13px] font-extrabold text-white">
              Won
            </Stamp>
            <span className="min-w-0 text-[12.5px] leading-snug font-semibold text-ink/70">
              {r[0].replace(/^Won\s·\s/, "Reason: ")}
            </span>
          </span>
          <span className="mt-2.5 block">
            <Track stage={4} won />
          </span>
        </Frame>
      );

    case 12:
      return (
        <Frame {...f} icon={<ReportsMark className="size-3.5" />} label="Dashboard">
          <span className="grid grid-cols-3 gap-1.5">
            {["New contacts", "Bookings", "Wins"].map((t, k) => (
              <Stamp key={t} mode={mode} at={s(k)} className="block rounded-xl bg-[#f5f7fb] px-2 py-1.5">
                <span className="block text-[10px] leading-tight font-bold text-ink/65">{t}</span>
                <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-extrabold">
                  <CheckIcon className="size-3 text-[#1b7a4b]" />
                  Counted
                </span>
              </Stamp>
            ))}
          </span>
          {/* The ad's own report, Ad return: its lead and its won deal,
              counted side by side. */}
          <Stamp mode={mode} at={s(3)} className="mt-1.5 flex items-center gap-1.5 rounded-xl bg-[#f5f7fb] px-2 py-1.5 text-[11px] font-bold">
            <AdsMark className="size-3.5 shrink-0 text-[#1a4fb8]" />
            <span className="min-w-0 flex-1 leading-tight">Dental check-up ad</span>
            <span className="rounded bg-white px-1.5 py-px text-[10px]">Lead</span>
            <span className="rounded bg-[#e6f7ee] px-1.5 py-px text-[10px] text-[#1b7a4b]">Won deal</span>
          </Stamp>
        </Frame>
      );

    case 13:
      /* The tag drops under the words where there is no room beside them -
         below about 350px, where it squeezed them into a 42px column and
         "Conversions" ran out of it. */
      return (
        <Frame {...f} icon={<AdsMark className="size-3.5" />} label="Sent back to Meta">
          <Stamp mode={mode} at={s(0)} className="flex flex-wrap items-center gap-2.5 rounded-xl bg-[#6d5cff] px-3 py-2.5 text-white">
            <span className="relative grid size-8 shrink-0 place-items-center rounded-lg bg-white/15">
              <AdsMark className="size-4" />
              {mode !== "rest" &&
                [0, 0.45, 0.9].map((d) => (
                  <span
                    key={d}
                    aria-hidden
                    className={`absolute top-0 right-0 size-1.5 rounded-full bg-white ${mode === "play" ? "anim-signal" : "opacity-0"}`}
                    style={{ ...delay(s(1) + d), "--tx": "16px", "--ty": "-14px" } as React.CSSProperties}
                  />
                ))}
            </span>
            <span className="min-w-[5.5rem] flex-1">
              <span className="block text-[12.5px] leading-tight font-extrabold">
                {r[0].replace(/^Sent to Meta:\s*/, "").replace(/^./, (c) => c.toUpperCase())}
              </span>
              <span className="mt-0.5 block text-[10.5px] font-semibold text-white">Through Meta&apos;s Conversions API</span>
            </span>
            {/* White on the violet, not a tint of it: a translucent chip
                measured 3.6:1 against 4.5 needed for type this small. */}
            <span className="ml-auto shrink-0 rounded-md bg-white px-1.5 py-0.5 text-[9.5px] font-bold text-[#4b3fd1]">Where configured</span>
          </Stamp>
        </Frame>
      );

    default:
      return null;
  }
}
