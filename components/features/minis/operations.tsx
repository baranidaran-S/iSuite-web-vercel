import Image from "next/image";
import { AutomationMark } from "@/components/ui/featureIcons";
import { CheckIcon, ClockIcon, WhatsAppIcon } from "@/components/ui/icons";
import { unanswered } from "@/lib/content/queues";
import {
  AiBadge,
  ChevronGlyph,
  Chip,
  Dot,
  MiniCard,
} from "@/components/features/minis/parts";

/* ==========================================================================
   MINIS - OPERATIONS
   ========================================================================== */

const prakash = unanswered[2];

/* ---- Automations ---------------------------------------------------------
   One trigger, one wait, one action, from the lists in requirements §13 -
   "booking missed", "wait for a period", "send approved template". Drawn as
   the flow builder draws it, top to bottom, because a trigger-and-action
   list set as prose is exactly the thing nobody reads. */
const STEPS = [
  {
    Glyph: AutomationMark,
    text: "When a booking is missed",
    tone: "bg-brand-tint text-brand",
  },
  { Glyph: ClockIcon, text: "Wait 1 hour", tone: "bg-[#f2f4f9] text-ink/70" },
  {
    Glyph: WhatsAppIcon,
    text: "Send the reminder template",
    tone: "bg-[#e6f7ee] text-[#1b7a4b]",
  },
] as const;

export function AutomationsMini() {
  return (
    <div className="flex w-full flex-col items-center">
      {STEPS.map(({ Glyph, text, tone }, i) => (
        <div key={text} className="flex w-full flex-col items-center">
          {i > 0 && <span aria-hidden className="h-2.5 w-px bg-line-strong" />}
          <span className="flex w-full items-center gap-2 rounded-lg border border-line bg-surface px-2 py-1.5 shadow-[0_1px_3px_rgba(10,16,32,0.07)]">
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-md ${tone}`}
            >
              <Glyph className="size-3" />
            </span>
            <span className="truncate text-[11px] font-bold">{text}</span>
          </span>
        </div>
      ))}
      <Chip tone="green" className="mt-2">
        <CheckIcon className="size-2.5" />
        Ran, and logged
      </Chip>
    </div>
  );
}

/* ---- Reports and Dashboard -----------------------------------------------
   THE NAMES OF THE REPORTS, NOT NUMBERS IN THEM. Any figure drawn here
   would be invented, and a chart with the axis left off still invents a
   shape - which is the same line the how-it-works journey holds. All four
   are metrics §16 lists. */
const REPORTS = [
  { name: "Active conversations", dot: "bg-[#1e5bff]" },
  { name: "Pipeline value", dot: "bg-[#1e86f5]" },
  { name: "First-response time", dot: "bg-[#12a7e8]" },
  { name: "AI and team-handled leads", dot: "bg-[#00c8f8]" },
] as const;

export function ReportsMini() {
  return (
    <MiniCard className="w-full overflow-hidden">
      <ul className="divide-y divide-line-soft">
        {REPORTS.map((r) => (
          <li key={r.name} className="flex items-center gap-2 px-2.5 py-1.5">
            <Dot className={r.dot} />
            <span className="min-w-0 flex-1 truncate text-[11px] font-bold">
              {r.name}
            </span>
            <ChevronGlyph className="size-3 shrink-0 text-muted" />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-2 border-t border-line bg-bg/60 px-2.5 py-1.5">
        <span className="text-[10.5px] font-semibold text-muted">
          Your data, yours to export
        </span>
        <Chip tone="brand">Contacts CSV</Chip>
      </div>
    </MiniCard>
  );
}

/* ---- Team and Permissions ------------------------------------------------
   Three of the roles, one with its scope switched to its own records, and
   one line of the audit trail - the assistant's own action written down
   like anybody else's, which is the part a cautious owner asks about. */
export function TeamMini() {
  return (
    <MiniCard className="w-full p-2">
      {[
        { role: "Owner", scope: "Everything" },
        { role: "Employee", scope: "Own records", toggle: true },
        { role: "Viewer", scope: "Read only" },
      ].map((r) => (
        <div
          key={r.role}
          className="flex items-center gap-2 rounded-md px-1.5 py-1"
        >
          <span className="w-16 shrink-0 text-[11px] font-bold">{r.role}</span>
          <span className="min-w-0 flex-1 truncate text-[10.5px] text-muted">
            {r.scope}
          </span>
          {r.toggle && (
            <span className="relative h-3.5 w-6 shrink-0 rounded-full bg-brand">
              <span className="absolute top-0.5 right-0.5 size-2.5 rounded-full bg-white" />
            </span>
          )}
        </div>
      ))}
      <div className="mt-1 flex items-center gap-1.5 rounded-md bg-bg px-1.5 py-1">
        <AiBadge onBrand={false} />
        <span className="truncate text-[10.5px] text-ink/75">
          Booked {prakash.name} for Sat 11:00
        </span>
      </div>
    </MiniCard>
  );
}

/* ---- Chat Commerce in India ---------------------------------------------
   The consultation as a catalogue card inside the WhatsApp thread, a
   payment request for it, and the payment written back to the record.
   ₹500 because it is the same consultation at the same price the home
   page quoted Anand in four languages - a price that changed between two
   pictures would tell a visitor both were made up. */
export function CommerceMini() {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <MiniCard className="flex items-center gap-2 p-1.5 pr-2.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-ink via-[#0a2f7a] to-brand-dark">
          <Image
            src="/tooth.png"
            alt=""
            width={64}
            height={64}
            sizes="32px"
            className="h-7 w-auto"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11.5px] font-bold">
            First consultation
          </span>
          <span className="block text-[10.5px] text-muted">
            From your catalogue
          </span>
        </span>
        <span className="text-[12px] font-extrabold">₹500</span>
      </MiniCard>

      <span className="flex items-center gap-2 self-end rounded-xl rounded-br-sm bg-brand px-2.5 py-1.5 text-white shadow-sm">
        <span className="text-[11px] font-semibold">Payment request</span>
        <span className="rounded-md bg-white px-1.5 py-0.5 text-[10.5px] font-extrabold text-brand">
          Pay ₹500
        </span>
      </span>

      {/* "Recorded", and no more than that. §18 lists payment confirmation
          recording; it does not say where, so neither does this. */}
      <Chip tone="green" className="self-start">
        <CheckIcon className="size-2.5" />
        Payment confirmation recorded
      </Chip>
    </div>
  );
}
