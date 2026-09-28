import { CheckIcon, channelIcons } from "@/components/ui/icons";
import {
  AdsMark,
  CalendarMark,
  ContactsMark,
  FollowUpMark,
  InboxMark,
  PipelineMark,
} from "@/components/ui/featureIcons";
import { Avatar, Owner } from "@/components/features/minis/parts";
import { BellGlyph, SparkGlyph } from "@/components/features/kit/glyphs";
import { queues, unanswered } from "@/lib/content/queues";

/* ==========================================================================
   02 SALES - THE PHONE  (the picture in Showcase.tsx)
   --------------------------------------------------------------------------
   iSuite AI as a team member sees it on a phone - which is in a browser:
   the product guide lists no App Store or Play Store app (§23), so the
   phone has a browser's address pill at the top and the product's own
   bar along the foot. Four screens, one per Sales feature, side by side
   in one strip; the showcase slides the strip to whichever is playing.

   Drawn at 300 x 620 and scaled whole to its column, like every product
   drawing on the page.
   ========================================================================== */

export const PHONE = { w: 300, h: 620 } as const;

const [ANAND, NISHA, PRAKASH, FARAH] = unanswered;
const DIVYA = queues[0].enquiries[3];

type Channel = keyof typeof channelIcons;

function Ch({ c, className = "size-3" }: { c: Channel; className?: string }) {
  const Icon = channelIcons[c];
  return <Icon className={`${className} shrink-0`} style={{ color: `var(--color-${c})` }} />;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-3 mb-1.5 block text-[9.5px] font-extrabold tracking-[0.12em] text-muted uppercase">
      {children}
    </span>
  );
}

function Title({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[17px] font-extrabold tracking-[-0.01em]">{children}</span>
      {right}
    </div>
  );
}

/* ---- the four screens ------------------------------------------------------ */

function ContactsScreen() {
  return (
    <div className="px-4 pt-3">
      <Title right={<span className="rounded-full bg-[#f2f4f9] px-2.5 py-1 text-[10px] font-semibold text-muted">Search</span>}>
        Contact
      </Title>
      <div className="mt-3 rounded-2xl border border-line p-3">
        <div className="flex items-center gap-2.5">
          <Avatar name={ANAND.name} tint={0} className="size-10 text-[15px]" />
          <span className="min-w-0">
            <span className="block text-[14px] leading-tight font-extrabold">{ANAND.name}</span>
            <span className="mt-0.5 flex items-center gap-1 text-[10.5px] text-muted">
              <Ch c="wa" />
              +91 ••••• •••18
            </span>
          </span>
        </div>
        <span className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-[#eef3ff] px-2 py-1.5 text-[10.5px] font-bold text-[#1a4fb8]">
          <AdsMark className="size-3.5" />
          From the Dental check-up ad
        </span>
      </div>

      <Label>Fields</Label>
      <div className="divide-y divide-line-soft rounded-2xl border border-line">
        {[
          { k: "Visit type", v: "First visit", asked: true, req: true },
          { k: "Branch", v: "Anna Nagar", asked: true },
          { k: "Preferred time", v: "Evening", deal: true },
        ].map((f) => (
          <div key={f.k} className="flex items-center gap-2 px-3 py-2">
            {/* Required before a deal opens: the usual asterisk. As a "Req."
                badge beside "Asked" it left the value 56px, and "First
                visit" was cut down to "First vi…". */}
            <span className="w-[76px] shrink-0 text-[10.5px] text-muted">
              {f.k}
              {f.req && <span className="font-bold text-[#a16326]">*</span>}
            </span>
            <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold">{f.v}</span>
            {f.asked && (
              <span className="flex items-center gap-0.5 rounded bg-brand-tint px-1 py-px text-[9px] font-bold text-brand">
                <SparkGlyph className="size-2.5" />
                Asked
              </span>
            )}
            {f.deal && <span className="rounded bg-[#e6f7ee] px-1 py-px text-[9px] font-bold text-[#1b7a4b]">Deal</span>}
          </div>
        ))}
      </div>

      <Label>Tags</Label>
      <div className="flex gap-1.5">
        <span className="rounded-md border border-line px-2 py-0.5 text-[10.5px] font-bold">First visit</span>
        <span className="rounded-md bg-[#e6f7ee] px-2 py-0.5 text-[10.5px] font-bold text-[#1b7a4b]">Qualified</span>
      </div>

      <Label>History</Label>
      <div className="flex flex-col gap-2">
        {[
          { icon: <AdsMark className="size-3" />, bg: "bg-[#eef3ff] text-[#1877f2]", t: "Clicked the Dental check-up ad", d: "Mon" },
          { icon: <Ch c="wa" className="size-3" />, bg: "bg-[#e7f9ee]", t: ANAND.text, d: "Tue" },
          { icon: <CalendarMark className="size-3" />, bg: "bg-brand-tint text-brand", t: "Booked for Monday, 5:00 pm", d: "Fri" },
        ].map((h) => (
          <span key={h.t} className="flex items-center gap-2">
            <span className={`grid size-6 shrink-0 place-items-center rounded-full ${h.bg}`}>{h.icon}</span>
            <span className="min-w-0 flex-1 truncate text-[11px]">{h.t}</span>
            <span className="text-[9.5px] font-semibold text-muted">{h.d}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function PipelineScreen() {
  return (
    <div className="px-4 pt-3">
      <Title
        right={
          <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-bold">
            New patients &#9662;
          </span>
        }
      >
        Pipeline
      </Title>
      <div className="mt-3 flex gap-1 rounded-xl bg-[#f2f4f9] p-1 text-[10.5px] font-bold">
        {["New", "Qualified", "Booked", "Won"].map((s) => (
          <span
            key={s}
            className={`flex-1 rounded-lg py-1.5 text-center ${s === "Qualified" ? "bg-surface text-brand shadow-sm" : "text-muted"}`}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <div className="rounded-2xl border-2 border-brand/40 bg-surface p-3 shadow-[0_16px_30px_-18px_rgba(10,91,245,0.7)]">
          <span className="flex items-center gap-2">
            <Avatar name={ANAND.name} tint={0} className="size-7 text-[11px]" />
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-extrabold">{ANAND.name}</span>
              <span className="text-[10px] text-muted">Owner Sara A. &middot; Close Monday</span>
            </span>
            <span className="text-[13px] font-extrabold">&#8377;500</span>
          </span>
          <span className="mt-2.5 flex items-center justify-between rounded-lg bg-[#e6f7ee] px-2.5 py-1.5 text-[10.5px] font-bold text-[#1b7a4b]">
            Move to Booked
            <span>&rarr;</span>
          </span>
        </div>
        <div className="rounded-2xl border border-line p-3">
          <span className="flex items-center gap-2">
            <Avatar name={NISHA.name} tint={1} className="size-7 text-[11px]" />
            <span className="min-w-0 flex-1 text-[12.5px] font-extrabold">{NISHA.name}</span>
            <Owner initials="RM" />
          </span>
          <span className="mt-2 inline-block rounded bg-[#fff6ea] px-1.5 py-0.5 text-[9.5px] font-bold text-[#a16326]">
            Past close date
          </span>
        </div>
        <div className="rounded-2xl border border-line p-3">
          <span className="flex items-center gap-2">
            <Avatar name={DIVYA.name} tint={2} className="size-7 text-[11px]" />
            <span className="min-w-0 flex-1 text-[12.5px] font-extrabold">{DIVYA.name}</span>
            <Owner initials="SA" />
          </span>
        </div>
      </div>

      <Label>When it closes</Label>
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-md bg-[#e6f7ee] px-2 py-0.5 text-[10.5px] font-bold text-[#1b7a4b]">Won: Booked and paid</span>
        <span className="rounded-md border border-line px-2 py-0.5 text-[10.5px] font-semibold text-ink/70">Lost: Price</span>
      </div>
    </div>
  );
}

function FollowUpsScreen() {
  const row = (who: string, tint: number, c: Channel, what: string, when: string, o: string, late = false, ai = false) => (
    <span className={`flex items-center gap-2 rounded-xl px-2.5 py-2 ${late ? "bg-[#fff6ea]" : "border border-line"}`}>
      <Avatar name={who} tint={tint} className="size-7 text-[11px]" />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 text-[11.5px] font-bold">
          {who}
          <Ch c={c} className="size-2.5" />
          {ai && <SparkGlyph className="size-2.5 text-brand" />}
        </span>
        <span className="block truncate text-[10px] text-muted">{what}</span>
      </span>
      <span className={`shrink-0 text-right text-[10px] font-bold ${late ? "text-[#a16326]" : "text-muted"}`}>{when}</span>
      <Owner initials={o} />
    </span>
  );
  return (
    <div className="relative px-4 pt-3">
      {/* The reminder, as it arrives. */}
      <span className="absolute inset-x-3 top-1 z-10 flex items-start gap-2 rounded-2xl border border-line bg-surface/95 p-2.5 shadow-[0_18px_34px_-16px_rgba(10,16,32,0.6)] backdrop-blur">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand text-white">
          <BellGlyph className="size-3.5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] leading-tight font-extrabold">Due now: call {FARAH.name}</span>
          <span className="mt-0.5 block text-[10px] text-muted">To Ravi M. &middot; 3:00 pm</span>
        </span>
      </span>

      <div className="pt-[62px]">
        <Title>Follow-ups</Title>
        {/* On "All", because the list below shows the overdue ones too. */}
        <div className="mt-3 flex gap-1 rounded-xl bg-[#f2f4f9] p-1 text-[10.5px] font-bold">
          {["Due", "Overdue", "All"].map((s) => (
            <span key={s} className={`flex-1 rounded-lg py-1.5 text-center ${s === "All" ? "bg-surface shadow-sm" : "text-muted"}`}>
              {s}
            </span>
          ))}
        </div>
        <Label>Overdue</Label>
        {row(NISHA.name, 1, NISHA.channel, "Ask about first visit", "Yesterday", "RM", true)}
        <Label>Due</Label>
        <div className="flex flex-col gap-1.5">
          {row(FARAH.name, 3, FARAH.channel, "Callback", "3:00 pm", "RM")}
          {row(ANAND.name, 0, "wa", "Send charges list", "Tomorrow", "SA", false, true)}
          {row(PRAKASH.name, 2, PRAKASH.channel, "Confirm Saturday visit", "Fri", "SA")}
        </div>
        <span className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-brand">
          <SparkGlyph className="size-3" />
          Anand&rsquo;s was written by the assistant
        </span>
      </div>
    </div>
  );
}

function AppointmentsScreen() {
  return (
    <div className="px-4 pt-3">
      <Title
        right={
          <span className="flex items-center gap-1 rounded-full border border-line py-px pr-2 pl-px text-[10px] font-bold">
            <Avatar name="Kavya" tint={2} className="size-5 text-[9px]" />
            Dr. Kavya
          </span>
        }
      >
        Calendar
      </Title>
      <div className="mt-3 grid grid-cols-4 gap-1 text-center">
        {["Thu", "Fri", "Sat", "Mon"].map((d) => (
          <span key={d} className={`rounded-lg py-1.5 text-[10.5px] font-bold ${d === "Mon" ? "bg-brand text-white" : "bg-[#f2f4f9] text-ink/55"}`}>
            {d}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <span className="flex items-center gap-2 rounded-xl bg-[#f2f4f9] px-3 py-2 text-[10.5px] font-semibold text-ink/45">
          <span className="w-9">4:00</span>
          Booked
        </span>
        <span className="flex items-center gap-2 rounded-xl border-l-[3px] border-brand bg-brand-tint px-3 py-2.5 shadow-[0_12px_24px_-16px_rgba(10,91,245,0.9)]">
          <span className="w-9 text-[10.5px] font-extrabold text-brand">5:00</span>
          <span className="min-w-0">
            <span className="block text-[12px] font-extrabold">{ANAND.name}</span>
            <span className="block text-[10px] text-muted">First consultation &middot; 30 min</span>
          </span>
        </span>
        <span className="flex items-center gap-2 rounded-xl border border-dashed border-line-strong px-3 py-2 text-[10.5px] font-semibold text-muted">
          <span className="w-9">6:00</span>
          Free
        </span>
      </div>

      <Label>Messages to Anand</Label>
      <div className="flex flex-col gap-1.5">
        {[
          { t: "Booking confirmed", s: "Sent", done: true },
          { t: "Day-before reminder", s: "Sun 5:00 pm" },
          { t: "Hour-before reminder", s: "Mon 4:00 pm" },
        ].map((m) => (
          <span key={m.t} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2">
            <span className={`grid size-5 shrink-0 place-items-center rounded-full ${m.done ? "bg-[#1b7a4b] text-white" : "bg-brand-tint text-brand"}`}>
              {m.done ? <CheckIcon className="size-3" /> : <BellGlyph className="size-3" />}
            </span>
            <span className="min-w-0 flex-1 text-[11px] font-bold">{m.t}</span>
            <span className="text-[9.5px] text-muted">{m.s}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-2 text-[10.5px] font-bold">
        <span className="rounded-lg bg-brand-tint px-2.5 py-1 text-brand">Reschedule link</span>
        <span className="rounded-lg bg-[#f2f4f9] px-2.5 py-1 text-ink/65">Cancel link</span>
      </div>
    </div>
  );
}

const SCREENS = [ContactsScreen, PipelineScreen, FollowUpsScreen, AppointmentsScreen];

const NAV = [
  { name: "Inbox", Mark: InboxMark },
  { name: "Contacts", Mark: ContactsMark },
  { name: "Pipeline", Mark: PipelineMark },
  { name: "Follow-ups", Mark: FollowUpMark },
  { name: "Calendar", Mark: CalendarMark },
];

/* ---- the phone ------------------------------------------------------------- */
export function Phone({ active }: { active: number }) {
  return (
    <div
      className="relative rounded-[46px] bg-[#0a0f1b] p-[9px] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.95),inset_0_0_0_1px_rgba(255,255,255,0.14)]"
      style={{ width: PHONE.w, height: PHONE.h }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[38px] bg-surface text-left text-ink">
        {/* status bar */}
        <div className="relative flex h-9 shrink-0 items-center justify-between px-6 text-[11px] font-bold">
          <span>9:41</span>
          <span className="absolute top-2 left-1/2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#0a0f1b]" />
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-px">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-sm bg-ink" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-ink/60 p-px">
              <span className="block h-full w-3/4 rounded-[1px] bg-ink" />
            </span>
          </span>
        </div>
        {/* the browser's address pill */}
        <div className="mx-3 flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#f2f4f9] text-[11px] font-semibold text-ink/70">
          <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
            <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
          </svg>
          iSuite AI
        </div>

        {/* the screens, side by side */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ width: `${SCREENS.length * 100}%`, transform: `translateX(-${(active * 100) / SCREENS.length}%)` }}
          >
            {SCREENS.map((S, i) => (
              <div key={i} className="h-full overflow-hidden" style={{ width: `${100 / SCREENS.length}%` }}>
                <S />
              </div>
            ))}
          </div>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-surface to-transparent" />
        </div>

        {/* the product's own bar */}
        <div className="grid h-[58px] shrink-0 grid-cols-5 border-t border-line bg-surface px-1 pb-2">
          {NAV.map((n, i) => {
            const on = i === active + 1;
            return (
              <span
                key={n.name}
                className={`flex flex-col items-center justify-center gap-0.5 text-[8.5px] font-bold transition-colors duration-500 ${
                  on ? "text-brand" : "text-muted"
                }`}
              >
                <n.Mark className="size-[18px]" />
                {n.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
