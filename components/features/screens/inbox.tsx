import { channelIcons, ClockIcon } from "@/components/ui/icons";
import { Avatar, Owner } from "@/components/features/minis/parts";
import { Cap, Zone } from "@/components/features/kit/spot";
import {
  AllGlyph,
  BoltGlyph,
  ClipGlyph,
  DownGlyph,
  ImageGlyph,
  MicGlyph,
  SendGlyph,
} from "@/components/features/kit/glyphs";
import { SearchGlyph } from "@/components/features/minis/parts";
import { queues, unanswered } from "@/lib/content/queues";

/* ==========================================================================
   ONE INBOX - THE WHOLE SCREEN
   --------------------------------------------------------------------------
   The inbox as a team actually works in it: four columns, and each column
   is one group of §6's capabilities.

     the rail      where the conversations come from - every channel, and
                   the filter that picks one                     "channels"
     the list      finding the right one - unread, status, and how long
                   each customer has been waiting                "find"
     the thread    what a conversation holds - history, a voice note, the
                   assistant's reply to it, a photo              "media"
     the panel     who is on it - the owner, the team, a note the customer
                   never sees, the replies saved for every day   "team"

   THE COLUMNS ARE THE GROUPS ON PURPOSE. The section walks through the
   groups by lighting one column at a time, which does not work if a
   group's capabilities are scattered across the screen. That is why the channel
   filter is filed under channels in featureDetails.ts: here it IS the
   channel rail.

   THE SAME PEOPLE AS EVERYWHERE ELSE, a little later in the day. Anand is
   the open conversation - his first question and the assistant's answer
   from section 3 are his history now, and the charges list he is owed is
   the internal note, the same promise the hero's inbox mini makes. Names
   and his first exchange are read from queues.ts, never retyped. Owners
   keep the initials the home page's board gave them: SA and RM.

   NO FIGURES. Times of day and message ages are content; there is no
   count, total or rate anywhere on the screen.
   ========================================================================== */

export const INBOX_SIZE = { w: 800, h: 500 } as const;

const [ANAND, NISHA, PRAKASH, FARAH] = unanswered;

/* Two more rows from the four queues, so the list reads as a working day
   rather than as the four people the page has been following. They are
   the first enquiry in the WhatsApp and Instagram queues. */
const PRIYA = queues[0].enquiries[0];
const KARTHIK = queues[1].enquiries[1];

type Channel = keyof typeof channelIcons;

const CHANNELS: {
  id: Channel;
  cap: string;
  name: string;
  short: string;
  whose: string;
}[] = [
  { id: "wa", cap: "whatsapp", name: "WhatsApp Business", short: "WhatsApp", whose: "Your own number" },
  { id: "ig", cap: "instagram", name: "Instagram", short: "Instagram", whose: "Your account" },
  { id: "fb", cap: "messenger", name: "Messenger", short: "Messenger", whose: "Your Facebook page" },
  { id: "web", cap: "webchat", name: "Website chat", short: "Website", whose: "Your website" },
];

/* The list, later in the day than section 3. Anand is open and his last
   message is a photo; Nisha is the one still waiting. */
const ROWS: {
  name: string;
  channel: Channel;
  time: string;
  text: string;
  kind?: "photo";
  owner?: string;
  unread?: boolean;
  waiting?: string;
  open?: boolean;
}[] = [
  { name: ANAND.name, channel: ANAND.channel, time: "now", text: "Photo", kind: "photo", owner: "SA", open: true },
  { name: NISHA.name, channel: NISHA.channel, time: "12m", text: "Is the Saturday camp still on?", unread: true, waiting: "Waiting 12 min" },
  { name: PRAKASH.name, channel: PRAKASH.channel, time: "1h", text: "Saturday 11 works for me", owner: "SA" },
  { name: FARAH.name, channel: FARAH.channel, time: "2h", text: "Can you call me today?", owner: "RM", unread: true },
  { name: PRIYA.name, channel: "wa", time: "3h", text: PRIYA.text, owner: "RM" },
  { name: KARTHIK.name, channel: "ig", time: "5h", text: KARTHIK.text, owner: "SA" },
];

function tint(channel: Channel, pct = 14) {
  return {
    color: `var(--color-${channel})`,
    backgroundColor: `color-mix(in oklab, var(--color-${channel}) ${pct}%, transparent)`,
  };
}

/* ---- THE RAIL - "channels" ------------------------------------------------ */
export function ChannelRail({ className = "" }: { className?: string }) {
  return (
    <Zone
      id="channels"
      className={`flex flex-col items-center gap-2 border-r border-line bg-[#f7f8fb] px-1.5 pt-3.5 ${className}`}
    >
      <Cap
        id="channel-filter"
        as="div"
        className="flex w-full flex-col items-center gap-1 rounded-xl py-1"
      >
        <span className="grid size-10 place-items-center rounded-xl bg-ink text-white">
          <AllGlyph className="size-[18px]" />
        </span>
        <span className="text-[9.5px] font-extrabold">All</span>
      </Cap>

      <span aria-hidden className="h-px w-8 bg-line" />

      {CHANNELS.map((c) => {
        const Icon = channelIcons[c.id];
        return (
          <Cap
            key={c.id}
            id={c.cap}
            as="div"
            className="flex w-full flex-col items-center gap-1 rounded-xl py-1"
          >
            <span
              className="grid size-10 place-items-center rounded-xl"
              style={tint(c.id)}
            >
              <Icon className="size-[18px]" />
            </span>
            <span className="text-[9.5px] font-bold text-muted">
              {c.short}
            </span>
          </Cap>
        );
      })}
    </Zone>
  );
}

/* ---- THE LIST - "find" ----------------------------------------------------- */
export function ConversationList({
  className = "",
  rows = ROWS.length,
}: {
  className?: string;
  rows?: number;
}) {
  return (
    <Zone id="find" className={`flex flex-col ${className}`}>
      <div className="border-b border-line p-3">
        <div className="flex h-8 items-center gap-2 rounded-lg border border-line bg-bg px-2.5 text-[12px] text-muted">
          <SearchGlyph className="size-3.5 shrink-0" />
          Search conversations
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <Cap
            id="unread"
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1 text-[11px] font-bold"
          >
            <span className="size-1.5 rounded-full bg-brand" />
            Unread
          </Cap>
          <Cap
            id="status"
            className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2 py-1 text-[11px] font-bold"
          >
            <span className="font-semibold text-muted">Status:</span> Open
            <DownGlyph className="size-3 text-muted" />
          </Cap>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-0.5 overflow-hidden p-1.5">
        {ROWS.slice(0, rows).map((r, i) => {
          const Icon = channelIcons[r.channel];
          return (
            <li
              key={r.name}
              className={`flex gap-2.5 rounded-lg px-2 py-2 ${
                r.open ? "bg-brand-tint" : ""
              }`}
            >
              <Avatar name={r.name} tint={i} className="size-8 text-[12px]" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[12.5px] font-bold">
                    {r.name}
                  </span>
                  <Icon
                    className="size-3 shrink-0"
                    style={{ color: `var(--color-${r.channel})` }}
                  />
                  <span className="ml-auto shrink-0 text-[10.5px] text-muted">
                    {r.time}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="flex min-w-0 flex-1 items-center gap-1 truncate text-[11.5px] text-muted">
                    {r.kind === "photo" && (
                      <ImageGlyph className="size-3 shrink-0" />
                    )}
                    <span className="truncate">{r.text}</span>
                  </span>
                  {r.unread && (
                    <span className="size-1.5 shrink-0 rounded-full bg-brand" />
                  )}
                  {r.owner && <Owner initials={r.owner} />}
                </div>
                {r.waiting && (
                  <Cap
                    id="waiting"
                    className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-[#fff6ea] px-1.5 py-0.5 text-[10px] font-bold text-[#a16326]"
                  >
                    <ClockIcon className="size-3" />
                    {r.waiting}
                  </Cap>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Zone>
  );
}

/* ---- THE THREAD - "media" -------------------------------------------------- */

/* A voice note's waveform. Fixed heights rather than random ones, so the
   server and the browser draw the same picture. */
const WAVE = [5, 9, 14, 8, 17, 11, 6, 13, 18, 10, 7, 15, 9, 12, 5, 10, 16, 8, 11, 6, 9, 4];

function Day({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-auto rounded-full border border-line bg-surface px-2.5 py-0.5 text-[10px] font-bold text-muted">
      {children}
    </span>
  );
}

function AiFoot({ note }: { note?: string }) {
  return (
    <span className="mt-1 flex items-center justify-end gap-1.5">
      {note && <span className="text-[9.5px] text-white/80">{note}</span>}
      <span className="rounded bg-white/20 px-1.5 py-0.5 text-[9.5px] font-bold">
        &#10022; AI
      </span>
    </span>
  );
}

export function Thread({
  className = "",
  composer = true,
}: {
  className?: string;
  composer?: boolean;
}) {
  const WaIcon = channelIcons.wa;
  return (
    <Zone id="media" className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2.5 border-b border-line bg-surface px-3 py-2.5">
        <Avatar name={ANAND.name} tint={0} className="size-8 text-[12px]" />
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[12.5px] font-bold">
            {ANAND.name}
            <WaIcon className="size-3" style={{ color: "var(--color-wa)" }} />
          </p>
          <Cap id="whatsapp" className="block rounded text-[10.5px] text-muted">
            WhatsApp &middot; your business number
          </Cap>
        </div>
        <span className="ml-auto rounded-full bg-brand-tint px-2 py-0.5 text-[10.5px] font-bold text-brand">
          Open
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-hidden p-3 [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:14px_14px]">
        {/* Section 3's exchange, a day on - which is what history is. */}
        <Cap id="history" as="div" className="flex flex-col gap-1.5 rounded-xl">
          <Day>Yesterday</Day>
          <span className="max-w-[82%] self-start rounded-xl rounded-tl-sm border border-line bg-surface px-2.5 py-1.5 text-[11.5px] leading-snug opacity-80">
            {ANAND.text}
          </span>
          {/* The clamp is on the text, not the bubble: clamped with its own
              padding, the bubble shows the top of a third line in it. */}
          <span className="max-w-[86%] self-end rounded-xl rounded-br-sm bg-brand/80 px-2.5 py-1.5 text-[11.5px] leading-snug text-white">
            <span className="line-clamp-2">{ANAND.reply}</span>
          </span>
        </Cap>

        <Day>Today</Day>

        <Cap
          id="voice"
          className="flex items-center gap-2 self-start rounded-xl rounded-tl-sm border border-line bg-surface px-2 py-1.5"
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-white">
            <svg viewBox="0 0 24 24" className="size-3 translate-x-px" fill="currentColor" aria-hidden>
              <path d="M8 5.14v13.72c0 .78.85 1.26 1.52.86l11.14-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14z" />
            </svg>
          </span>
          <span className="flex h-5 items-center gap-[2px]">
            {WAVE.map((h, i) => (
              <span
                key={i}
                className={`w-[2px] rounded-full ${i < 8 ? "bg-ink/70" : "bg-ink/25"}`}
                style={{ height: h }}
              />
            ))}
          </span>
          <span className="text-[10px] font-bold text-muted">0:14</span>
          <MicGlyph className="size-3 text-muted" />
        </Cap>

        <Cap
          id="ai-voice"
          className="max-w-[86%] self-end rounded-xl rounded-br-sm bg-brand px-2.5 py-1.5 text-[11.5px] leading-snug text-white"
        >
          Yes, we are open Saturday, 9am to 2pm. Shall I book you in?
          <AiFoot note="Replied to a voice note" />
        </Cap>

        {/* A photo of an old prescription, the kind of thing a patient
            sends before a first visit - a slip of paper on a table rather
            than a generic image icon, so it reads as a photo somebody
            took. */}
        <Cap
          id="photos"
          className="self-start rounded-xl rounded-tl-sm border border-line bg-surface p-1"
        >
          <span className="relative block h-[70px] w-[116px] overflow-hidden rounded-lg bg-[linear-gradient(160deg,#efe8dc,#dcd2c1)]">
            <span className="absolute top-2.5 right-4 -bottom-2 left-4 -rotate-[4deg] rounded-sm bg-white px-2 py-1.5 shadow-[0_4px_10px_-4px_rgba(60,40,10,0.45)]">
              <span className="block text-[9px] leading-none font-extrabold text-brand/75">
                Rx
              </span>
              <span className="mt-1.5 block h-[3px] w-4/5 rounded-full bg-ink/15" />
              <span className="mt-1 block h-[3px] w-1/2 rounded-full bg-ink/15" />
              <span className="mt-1 block h-[3px] w-2/3 rounded-full bg-ink/15" />
            </span>
          </span>
        </Cap>
      </div>

      {composer && (
        <div className="flex items-center gap-2 border-t border-line bg-surface px-3 py-2.5">
          <ClipGlyph className="size-3.5 text-muted" />
          <span className="flex-1 truncate text-[11.5px] text-muted">
            Type a message...
          </span>
          <span className="grid size-7 place-items-center rounded-lg bg-brand text-white">
            <SendGlyph className="size-3" />
          </span>
        </div>
      )}
    </Zone>
  );
}

/* ---- THE PANEL - "team" ----------------------------------------------------- */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block text-[9.5px] font-extrabold tracking-[0.12em] text-muted uppercase">
      {children}
    </span>
  );
}

const QUICK = ["Timings", "Price list", "Location"];

export function TeamPanel({ className = "" }: { className?: string }) {
  return (
    <Zone
      id="team"
      className={`flex flex-col gap-3.5 border-l border-line bg-[#fafbfd] p-3 ${className}`}
    >
      <div>
        <Label>Assigned to</Label>
        <Cap
          id="assign"
          as="div"
          className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2 py-1.5"
        >
          <Owner initials="SA" />
          <span className="text-[11.5px] font-bold">Sara A.</span>
          <DownGlyph className="ml-auto size-3 text-muted" />
        </Cap>
      </div>

      <div>
        <Label>Shared with</Label>
        <Cap id="shared" as="div" className="flex items-center gap-2 rounded-lg py-0.5">
          <span className="flex -space-x-1.5">
            <Avatar name="Sara" tint={0} className="size-6 text-[10px] ring-2 ring-[#fafbfd]" />
            <Avatar name="Ravi" tint={2} className="size-6 text-[10px] ring-2 ring-[#fafbfd]" />
            <span className="grid size-6 place-items-center rounded-full border border-dashed border-line-strong bg-surface text-[12px] font-bold text-muted ring-2 ring-[#fafbfd]">
              +
            </span>
          </span>
          <span className="text-[10.5px] font-semibold text-muted">
            Your team
          </span>
        </Cap>
      </div>

      <div>
        <Label>Internal note</Label>
        <Cap
          id="notes"
          as="div"
          className="rounded-lg border border-[#f3e2b3] bg-[#fff8e6] px-2 py-1.5 text-[11px] leading-snug text-[#6b4e00]"
        >
          Charges list goes to Anand tomorrow morning.
          <span className="mt-1 block text-[9.5px] font-bold opacity-75">
            SA &middot; only your team sees this
          </span>
        </Cap>
      </div>

      <div>
        <Label>Quick replies</Label>
        <Cap id="quick" as="div" className="flex flex-col gap-1 rounded-lg">
          {QUICK.map((q) => (
            <span
              key={q}
              className="flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1 text-[11px] font-semibold"
            >
              <BoltGlyph className="size-3 text-brand" />
              {q}
            </span>
          ))}
        </Cap>
      </div>
    </Zone>
  );
}

/* ---- THE WHOLE SCREEN ----------------------------------------------------- */
export function InboxScreen() {
  return (
    <div className="flex h-[500px] w-[800px] overflow-hidden rounded-2xl border border-line bg-surface text-left text-ink shadow-[0_30px_80px_-40px_rgba(10,16,32,0.45)]">
      <ChannelRail className="w-16 shrink-0" />
      <ConversationList className="w-[254px] shrink-0 border-r border-line" />
      <Thread className="w-[300px] shrink-0" />
      <TeamPanel className="w-[182px] shrink-0" />
    </div>
  );
}

/* ==========================================================================
   THE CROPS - one group at a time, at a readable size
   --------------------------------------------------------------------------
   Where there is no room for the whole screen - below 1024px, where the
   story stops pinning it - each group gets its own part of the product,
   drawn fluid so it fits whatever width it is put in.

   THE CHANNELS CROP IS NOT THE RAIL. Five icons in a column say "channels"
   to somebody looking at the whole screen and very little on their own, so
   on its own the group is drawn as the list of connected channels - which
   is where "your own number" can actually be written down.
   ========================================================================== */
export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-surface text-left text-ink shadow-[0_24px_60px_-34px_rgba(10,16,32,0.5)] ${className}`}
    >
      {children}
    </div>
  );
}

export function ChannelsCrop() {
  return (
    <Card className="w-full max-w-[400px]">
      <Zone id="channels">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="text-[13px] font-extrabold">Channels in this inbox</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1b7a4b]">
            <span className="size-1.5 rounded-full bg-[#1b7a4b]" />
            All connected
          </span>
        </div>
        <ul className="flex flex-col gap-0.5 p-2">
          {CHANNELS.map((c) => {
            const Icon = channelIcons[c.id];
            return (
              <Cap
                key={c.id}
                id={c.cap}
                as="li"
                className="flex items-center gap-3 rounded-lg px-2 py-2"
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-lg"
                  style={tint(c.id)}
                >
                  <Icon className="size-[17px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-bold">{c.name}</span>
                  <span className="block text-[11.5px] text-muted">{c.whose}</span>
                </span>
                <span className="ml-auto text-[11px] font-semibold text-muted">
                  Connected
                </span>
              </Cap>
            );
          })}
        </ul>
        <div className="border-t border-line p-2.5">
          <Cap
            id="channel-filter"
            as="div"
            className="flex items-center gap-1 rounded-lg bg-bg p-1"
          >
            <span className="flex items-center gap-1 rounded-md bg-ink px-2.5 py-1 text-[11px] font-bold text-white">
              <AllGlyph className="size-3" />
              All
            </span>
            {CHANNELS.map((c) => {
              const Icon = channelIcons[c.id];
              return (
                <span
                  key={c.id}
                  className="grid h-6 flex-1 place-items-center rounded-md"
                  style={{ color: `var(--color-${c.id})` }}
                >
                  <Icon className="size-3.5" />
                </span>
              );
            })}
          </Cap>
        </div>
      </Zone>
    </Card>
  );
}

export function FindCrop() {
  return (
    <Card className="w-full max-w-[400px]">
      <ConversationList rows={4} />
    </Card>
  );
}

export function MediaCrop() {
  return (
    <Card className="w-full max-w-[400px]">
      <Thread composer={false} />
    </Card>
  );
}

export function TeamCrop() {
  return (
    <Card className="w-full max-w-[320px]">
      <TeamPanel className="border-l-0" />
    </Card>
  );
}
