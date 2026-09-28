import { CheckIcon, channelIcons } from "@/components/ui/icons";
import { unanswered } from "@/lib/content/queues";
import {
  Avatar,
  Chip,
  Dot,
  MiniCard,
  Owner,
} from "@/components/features/minis/parts";

/* ==========================================================================
   MINIS - SALES
   ========================================================================== */

const [anand, nisha, prakash, farah] = unanswered;

/* ---- Contacts and Custom Fields -----------------------------------------
   Nisha's record, with the two answers the assistant saved when it asked
   her its qualifying questions - the same two, "First visit" and "Anna
   Nagar", the how-it-works journey saves. The fields are the business's
   own, which is the "custom" in the name. */
export function ContactMini() {
  const Ig = channelIcons[nisha.channel];
  return (
    <MiniCard className="w-full p-2.5">
      <div className="flex items-center gap-2">
        <Avatar name={nisha.name} tint={1} />
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-[12px] font-bold">
            <span className="truncate">{nisha.name}</span>
            <Ig
              className="size-3 shrink-0"
              style={{ color: `var(--color-${nisha.channel})` }}
            />
          </p>
          <p className="text-[10.5px] text-muted">Source: Instagram</p>
        </div>
        <span className="ml-auto flex gap-1">
          <Chip tone="brand">First visit</Chip>
        </span>
      </div>

      <dl className="mt-2 space-y-1 border-t border-line-soft pt-2 text-[11px]">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted">Visit type</dt>
          <dd className="font-bold">First visit</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted">Branch</dt>
          <dd className="font-bold">Anna Nagar</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted">Tags</dt>
          <dd className="flex gap-1">
            <Chip>Saturday</Chip>
            <Chip>Check-up</Chip>
          </dd>
        </div>
      </dl>
    </MiniCard>
  );
}

/* ---- Sales Pipeline ------------------------------------------------------
   The home page's three example stages with the four deals exactly where
   its board put them. No values on the cards - see PipelineMock for why a
   rupee figure on a mock deal is a fabricated statistic. */
const STAGES = [
  { stage: "New Enquiry", label: "New", tone: "bg-[#eef1f7] text-muted" },
  { stage: "Qualified", label: "Qualified", tone: "bg-brand-tint text-brand" },
  {
    stage: "Appointment Booked",
    label: "Booked",
    tone: "bg-[#e6f7ee] text-[#1b7a4b]",
  },
] as const;

export function PipelineMini() {
  return (
    <div className="grid w-full grid-cols-3 gap-1.5">
      {STAGES.map((col) => (
        <div
          key={col.stage}
          className="flex min-w-0 flex-col rounded-lg bg-surface/70 p-1.5 ring-1 ring-line"
        >
          <span
            className={`self-start rounded px-1.5 py-0.5 text-[10px] font-bold ${col.tone}`}
          >
            {col.label}
          </span>
          <div className="mt-1.5 space-y-1">
            {unanswered
              .filter((e) => e.stage === col.stage)
              .map((e) => {
                const Icon = channelIcons[e.channel];
                return (
                  /* STACKED, NAME ON TOP. Side by side with its channel
                     mark and owner, a card in an 89px column left the
                     name 27px - "Far...", "Pra..." - which is not a
                     person any more. First name alone on its own line,
                     the channel and the owner under it. */
                  <div
                    key={e.id}
                    className="rounded-md border border-line bg-surface px-1.5 py-1.5 shadow-[0_1px_3px_rgba(10,16,32,0.07)]"
                  >
                    <span className="block truncate text-[10.5px] leading-tight font-bold">
                      {e.name.split(" ")[0]}
                    </span>
                    <span className="mt-1 flex items-center justify-between">
                      <Icon
                        className="size-2.5 shrink-0"
                        style={{ color: `var(--color-${e.channel})` }}
                      />
                      <Owner initials={e.owner} />
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Follow-ups ----------------------------------------------------------
   Three buckets, and the overdue one is amber - the page's colour for
   waiting, from section 2. Every row is somebody the home page already
   left mid-conversation: Nisha never said whether it was a first visit,
   Farah is owed a callback, Anand is owed the charges list. */
const FOLLOW_UPS = [
  {
    bucket: "Overdue",
    rows: [{ who: nisha, what: "Ask about first visit", when: "Yesterday" }],
  },
  {
    bucket: "Today",
    rows: [{ who: farah, what: "Callback", when: "3:00 pm" }],
  },
  {
    bucket: "Tomorrow",
    rows: [{ who: anand, what: anand.next ?? "", when: "10:00 am" }],
  },
] as const;

export function FollowUpsMini() {
  return (
    <MiniCard className="w-full p-2">
      {FOLLOW_UPS.map((b) => {
        const late = b.bucket === "Overdue";
        return (
          <div key={b.bucket} className="mt-1 first:mt-0">
            <p
              className={`flex items-center gap-1.5 px-1 text-[10px] font-bold ${
                late ? "text-[#a16326]" : "text-muted"
              }`}
            >
              <Dot className={late ? "bg-night-warn" : "bg-line-strong"} />
              {b.bucket}
            </p>
            {b.rows.map((r) => (
              <div
                key={r.who.id}
                className={`mt-0.5 flex items-center gap-1.5 rounded-md px-1.5 py-1 ${
                  late ? "bg-[#fff6ea]" : ""
                }`}
              >
                <span className="min-w-0 flex-1 truncate text-[11px]">
                  <span className="font-bold">{r.who.name}</span>
                  <span className="text-muted"> &middot; {r.what}</span>
                </span>
                <span className="shrink-0 text-[10px] font-semibold text-muted">
                  {r.when}
                </span>
                <Owner initials={r.who.owner} />
              </div>
            ))}
          </div>
        );
      })}
    </MiniCard>
  );
}

/* ---- Appointments --------------------------------------------------------
   Prakash's Saturday 11am, the slot the assistant offered him on the home
   page, with the reminders the product sends before it. Days, not dates:
   a date would make the picture look like a particular week. */
const DAYS = ["Thu", "Fri", "Sat", "Mon"] as const;

export function AppointmentsMini() {
  return (
    <MiniCard className="w-full p-2.5">
      <div className="grid grid-cols-4 gap-1">
        {DAYS.map((d) => (
          <span
            key={d}
            className={`rounded-md py-1 text-center text-[10.5px] font-bold ${
              d === "Sat"
                ? "bg-brand text-white"
                : "bg-[#f2f4f9] text-ink/55"
            }`}
          >
            {d}
          </span>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-lg border-l-[3px] border-[#1b7a4b] bg-[#e6f7ee] px-2 py-1.5">
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] font-bold text-[#12592f]">
            11:00 am &ndash; 11:30 am
          </span>
          <span className="block truncate text-[10.5px] text-[#1b7a4b]">
            {prakash.name} &middot; Check-up
          </span>
        </span>
        <Owner initials={prakash.owner} />
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        <Chip tone="green">
          <CheckIcon className="size-2.5" />
          Confirmed
        </Chip>
        <Chip>24h reminder</Chip>
        <Chip>1h reminder</Chip>
      </div>
    </MiniCard>
  );
}
