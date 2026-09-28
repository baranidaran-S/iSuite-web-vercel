import { CalendarIcon, channelIcons, CheckIcon } from "@/components/ui/icons";
import { Avatar } from "@/components/features/minis/parts";
import { Cap, Zone } from "@/components/features/kit/spot";
import { Card } from "@/components/features/screens/inbox";
import {
  DocGlyph,
  HandGlyph,
  RepeatGlyph,
  SparkGlyph,
} from "@/components/features/kit/glyphs";
import { features } from "@/lib/content/features";
import { queues, unanswered } from "@/lib/content/queues";

/* ==========================================================================
   AI SALES ASSISTANT - THE WHOLE SCREEN
   --------------------------------------------------------------------------
   What the business writes, what the assistant says, what it books and
   what it hands on - four columns, one per group of §7, read left to
   right:

     setup      the ten things §7 lists for configuring it, filled in the
                way a clinic would fill them in                 "setup"
     the chat   a question in Tanglish, answered in Tanglish from the
                price list                                      "talk"
     booking    its own question's answer saved to the contact, the
                calendar checked, the booking confirmed         "book"
     activity   customers who went quiet and were followed up, and the
                questions it passed to a person                 "handoff"

   COLUMNS, LIKE THE INBOX, AND FOR THE SAME REASON. A group has to be one
   place on the screen to be lit as one - see inbox.tsx. This was first
   drawn as a setup column beside one long conversation holding the other
   three groups in a stack, which only worked for a layout that lit a
   whole column at a time.

   ANAND'S CONVERSATION CARRIES ON FROM THE REST OF THE SITE. His question
   and the reply are the home page's Tanglish turn, word for word, read from
   features.ts; the qualifying question and his answer are the hero mini's.
   Saturday does not suit him, so the assistant checks Monday - the other
   slot it offered Prakash on the home page, which Prakash did not take.
   Prakash keeps his Saturday 11am, and his payment question is the one
   that goes to a person.

   THE BOOKING IS CONFIRMED BEFORE THE REPLY THAT SAYS SO, and that order
   is the capability. §7: it "checks actual system events before sending
   booking-related replies" - so in the chat the confirmation sits between
   the customer's yes and the assistant's "Booked!", not after it.

   NOTHING IS ANSWERED THAT THE SETUP DOES NOT HOLD. ₹500 is on the price
   list in the first column before it is in a reply in the second.

   The business name is invented and generic on purpose; nothing else on
   the site names the clinic.
   ========================================================================== */

export const ASSISTANT_SIZE = { w: 880, h: 480 } as const;

const TURNS = features.language.turns;
const TANGLISH = TURNS.find((t) => t.id === "tg") ?? TURNS[0];
const [ANAND, , PRAKASH] = unanswered;
const KARTHIK = queues[1].enquiries[1];

/* §7's configuration, in §7's order. The ids match featureDetails.ts. */
const SETUP: { id: string; label: string; value: React.ReactNode }[] = [
  { id: "name", label: "Business name", value: "Bright Smile Dental" },
  { id: "tone", label: "Tone", value: "Warm, short replies" },
  { id: "services", label: "Services", value: "Consultation, cleaning, braces" },
  { id: "prices", label: "Prices", value: "First consultation ₹500" },
  { id: "rules", label: "Rules", value: "No treatment prices before a check-up" },
  { id: "packages", label: "Packages", value: "Family check-up plan" },
  { id: "policies", label: "Policies", value: "Free reschedule up to a day before" },
  {
    id: "documents",
    label: "Approved documents",
    value: (
      <span className="flex flex-wrap gap-1">
        {["Price list.pdf", "FAQ.pdf"].map((d) => (
          <span
            key={d}
            className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-1.5 py-px text-[10px] font-semibold"
          >
            <DocGlyph className="size-3 text-brand" />
            {d}
          </span>
        ))}
      </span>
    ),
  },
  { id: "ad-rules", label: "Ad-specific instructions", value: "Camp ad: mention the Saturday camp" },
  { id: "handoff-rules", label: "Handoff rules", value: "Payments and complaints go to Sara" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[9.5px] font-extrabold tracking-[0.12em] text-muted uppercase">
      {children}
    </span>
  );
}

/* ---- SETUP - "setup" --------------------------------------------------------- */
export function SetupPanel({ className = "" }: { className?: string }) {
  return (
    <Zone id="setup" className={`flex flex-col bg-[#fafbfd] ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-3">
        <span className="grid size-6 place-items-center rounded-md bg-brand text-white">
          <SparkGlyph className="size-3.5" />
        </span>
        <span className="text-[12.5px] font-extrabold">Assistant setup</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#e6f7ee] px-2 py-0.5 text-[10px] font-bold text-[#1b7a4b]">
          <span className="size-1.5 rounded-full bg-[#1b7a4b]" />
          Live
        </span>
      </div>

      <dl className="flex flex-1 flex-col p-1.5">
        {SETUP.map((s) => (
          <Cap key={s.id} id={s.id} as="div" className="rounded-lg px-2 py-[4px]">
            <dt className="text-[9px] font-extrabold tracking-[0.1em] text-muted uppercase">
              {s.label}
            </dt>
            <dd className="mt-px text-[11px] leading-snug font-semibold">
              {s.value}
            </dd>
          </Cap>
        ))}
      </dl>
    </Zone>
  );
}

/* ---- THE CHAT - "talk" ------------------------------------------------------- */
function Ask({ children }: { children: React.ReactNode }) {
  return (
    <span className="max-w-[84%] self-start rounded-xl rounded-tl-sm border border-line bg-surface px-2.5 py-1.5 text-[11.5px] leading-snug shadow-sm">
      {children}
    </span>
  );
}

/* The badge sits at the end of the line rather than on a row of its own:
   every assistant message carries it, and a row each would cost the
   column five lines. */
function Ai({ id, children }: { id?: string; children: React.ReactNode }) {
  const body = (
    <>
      {children}
      <span className="ml-1.5 inline-block translate-y-[-1px] rounded bg-white/20 px-1 py-px align-middle text-[9px] font-bold">
        &#10022; AI
      </span>
    </>
  );
  const cls =
    "max-w-[86%] self-end rounded-xl rounded-br-sm bg-brand px-2.5 py-1.5 text-[11.5px] leading-snug text-white shadow-sm";
  return id ? (
    <Cap id={id} className={cls}>
      {body}
    </Cap>
  ) : (
    <span className={cls}>{body}</span>
  );
}

function Pill({
  id,
  tone = "brand",
  icon,
  children,
}: {
  id: string;
  tone?: "brand" | "green";
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Cap
      id={id}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
        tone === "green"
          ? "bg-[#e6f7ee] text-[#1b7a4b]"
          : "bg-brand-tint text-brand"
      }`}
    >
      {icon}
      {children}
    </Cap>
  );
}

export function ChatColumn({
  className = "",
  short = false,
}: {
  className?: string;
  /* Only the first exchange - the language and the price list, which is
     all this group is about. */
  short?: boolean;
}) {
  const WaIcon = channelIcons.wa;
  return (
    <Zone id="talk" className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2.5 border-b border-line bg-surface px-3 py-2.5">
        <Avatar name={ANAND.name} tint={0} className="size-8 text-[12px]" />
        <p className="min-w-0">
          <span className="flex items-center gap-1.5 text-[12.5px] font-bold">
            {ANAND.name}
            <WaIcon className="size-3" style={{ color: "var(--color-wa)" }} />
          </span>
          <span className="block text-[10.5px] text-muted">WhatsApp</span>
        </p>
      </div>

      <div className="flex items-center gap-1.5 border-b border-line bg-surface/80 px-3 py-1.5">
        <span className="text-[10px] font-bold text-muted">Replying in</span>
        <Cap id="language" className="flex items-center gap-0.5 rounded-full bg-bg p-0.5">
          {TURNS.map((t) => (
            <span
              key={t.id}
              className={`rounded-full px-1.5 py-px text-[9.5px] font-bold ${
                t.id === TANGLISH.id ? "bg-brand text-white" : "text-ink/55"
              }`}
            >
              {t.label}
            </span>
          ))}
        </Cap>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden p-3 [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:14px_14px]">
        <Ask>{TANGLISH.ask}</Ask>
        <Ai>{TANGLISH.reply}</Ai>
        <span className="self-end">
          <Pill id="approved" icon={<DocGlyph className="size-3" />}>
            Answered from your price list
          </Pill>
        </span>

        {!short && (
          <>
            <Ai id="qualify">First visit ah, illa follow-up ah?</Ai>
            <Ask>First visit dhaan. Saturday mudiyaadhu, Monday evening?</Ask>
            <Ai>Monday 5 manikku free irukku. Book pannalaama?</Ai>
            <Ask>Seri, book pannunga.</Ask>
            <span className="self-center">
              <Pill id="confirmed" tone="green" icon={<CheckIcon className="size-2.5" />}>
                Booking confirmed
              </Pill>
            </span>
            <Ai>Booked! Monday 5 manikku.</Ai>
          </>
        )}
      </div>
    </Zone>
  );
}

/* ---- BOOKING - "book" -------------------------------------------------------- */
export function BookingPanel({ className = "" }: { className?: string }) {
  return (
    <Zone id="book" className={`flex flex-col gap-3 bg-[#fafbfd] p-3 ${className}`}>
      <div>
        <Heading>Visit type</Heading>
        <Cap
          id="qualify"
          as="div"
          className="mt-1.5 rounded-lg border border-line bg-surface px-2 py-1.5"
        >
          <span className="block text-[11.5px] font-bold">First visit</span>
          <span className="mt-0.5 inline-flex items-center gap-1 text-[9.5px] font-bold text-[#1b7a4b]">
            <CheckIcon className="size-2.5" />
            Saved to contact
          </span>
        </Cap>
      </div>

      <div>
        <Heading>Availability</Heading>
        <Cap
          id="calendar"
          as="div"
          className="mt-1.5 rounded-lg border border-line bg-surface px-2 py-1.5"
        >
          <span className="flex items-center justify-between gap-2 text-[10px] font-bold text-muted">
            Monday
            <CalendarIcon className="size-3 text-brand" />
          </span>
          <span className="mt-1 grid grid-cols-3 gap-1">
            {["4:00", "5:00", "6:00"].map((t) => (
              <span
                key={t}
                className={`rounded-md py-0.5 text-center text-[10px] font-bold ${
                  t === "5:00"
                    ? "bg-brand text-white"
                    : "bg-bg text-ink/35 line-through"
                }`}
              >
                {t}
              </span>
            ))}
          </span>
        </Cap>
      </div>

      <div>
        <Heading>Appointment</Heading>
        <Cap
          id="booking"
          as="div"
          className="mt-1.5 rounded-lg border border-line bg-surface p-2 shadow-sm"
        >
          <span className="flex items-center gap-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand-tint text-brand">
              <CalendarIcon className="size-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11.5px] leading-tight font-extrabold">
                Mon &middot; 5:00 pm
              </span>
              <span className="block truncate text-[10px] text-muted">
                First consultation
              </span>
            </span>
          </span>
          <Cap
            id="confirmed"
            className="mt-1.5 flex items-center gap-1 rounded-md bg-[#e6f7ee] px-1.5 py-0.5 text-[9.5px] font-bold text-[#1b7a4b]"
          >
            <CheckIcon className="size-2.5" />
            Confirmed in calendar
          </Cap>
          <span className="mt-1.5 flex gap-2 text-[10px] font-bold">
            <span className="text-brand">Reschedule</span>
            <span className="text-muted">Cancel</span>
          </span>
        </Cap>
      </div>

      {/* §9's two reminders, which a confirmed booking now has. */}
      <div>
        <Heading>Reminders</Heading>
        <span className="mt-1.5 flex flex-wrap gap-1">
          {["A day before", "An hour before"].map((r) => (
            <span
              key={r}
              className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-[10px] font-semibold"
            >
              {r}
            </span>
          ))}
        </span>
      </div>
    </Zone>
  );
}

/* ---- ACTIVITY - "handoff" ---------------------------------------------------
   Newest first. Two people went quiet and were followed up; two questions
   went to Sara because the handoff rules in the first column send
   payments and complaints to her. The names are the queues' own. */
const MEERA = queues[1].enquiries[2];
const SURESH = queues[2].enquiries[1];

const ACTIVITY: {
  kind: "follow" | "hand";
  name: string;
  channel: "ig" | "fb";
  text: string;
  tag?: string;
}[] = [
  { kind: "follow", name: KARTHIK.name, channel: "ig", text: "No reply since yesterday" },
  { kind: "hand", name: PRAKASH.name, channel: "fb", text: "“Can I pay online before Saturday?”", tag: "Payment question" },
  { kind: "follow", name: MEERA.name, channel: "ig", text: "No reply in two days" },
  { kind: "hand", name: SURESH.name, channel: "fb", text: "“Nobody called me back.”", tag: "Complaint" },
];

export function ActivityPanel({
  className = "",
  entries = ACTIVITY.length,
}: {
  className?: string;
  entries?: number;
}) {
  return (
    <Zone id="handoff" className={`flex flex-col gap-2 p-3 ${className}`}>
      <Heading>Assistant activity</Heading>

      {ACTIVITY.slice(0, entries).map((a, i) => {
        const Icon = channelIcons[a.channel];
        const follow = a.kind === "follow";
        return (
          <Cap
            key={a.name}
            id={follow ? "follow-up" : "handover"}
            as="div"
            className={`rounded-lg border border-line bg-surface px-2 py-1.5 shadow-sm ${i === 0 ? "mt-0.5" : ""}`}
          >
            <span
              className={`flex items-center gap-1 text-[10px] font-extrabold ${
                follow ? "text-brand" : "text-[#a16326]"
              }`}
            >
              {follow ? (
                <RepeatGlyph className="size-3 shrink-0" />
              ) : (
                <HandGlyph className="size-3 shrink-0" />
              )}
              {follow ? "Follow-up sent" : "Handed to Sara"}
            </span>
            <span className="mt-1 flex items-center gap-1 text-[11px] font-bold">
              {a.name}
              <Icon
                className="size-2.5"
                style={{ color: `var(--color-${a.channel})` }}
              />
            </span>
            <span className="block text-[10px] leading-snug text-muted">
              {a.text}
            </span>
            {a.tag && (
              <span className="mt-1 inline-block rounded bg-[#fff6ea] px-1 py-px text-[9px] font-bold text-[#a16326]">
                {a.tag}
              </span>
            )}
          </Cap>
        );
      })}
    </Zone>
  );
}

/* ---- THE WHOLE SCREEN ----------------------------------------------------- */
export function AssistantScreen() {
  return (
    <div className="flex h-[480px] w-[880px] overflow-hidden rounded-2xl border border-line bg-surface text-left text-ink shadow-[0_30px_80px_-40px_rgba(10,16,32,0.45)]">
      <SetupPanel className="w-[228px] shrink-0 border-r border-line" />
      <ChatColumn className="w-[312px] shrink-0 border-r border-line" />
      <BookingPanel className="w-[178px] shrink-0 border-r border-line" />
      <ActivityPanel className="w-[162px] shrink-0 bg-[#fafbfd]" />
    </div>
  );
}

/* ---- THE CROPS -------------------------------------------------------------- */
export function SetupCrop() {
  return (
    <Card className="w-full max-w-[320px]">
      <SetupPanel />
    </Card>
  );
}

export function TalkCrop() {
  return (
    <Card className="w-full max-w-[380px]">
      <ChatColumn short />
    </Card>
  );
}

export function BookCrop() {
  return (
    <Card className="w-full max-w-[280px]">
      <BookingPanel />
    </Card>
  );
}

export function HandoffCrop() {
  return (
    <Card className="w-full max-w-[280px] bg-[#fafbfd]">
      <ActivityPanel entries={2} />
    </Card>
  );
}
