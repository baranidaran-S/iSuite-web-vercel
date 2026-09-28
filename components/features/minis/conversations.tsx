import { channelIcons } from "@/components/ui/icons";
import { features } from "@/lib/content/features";
import { unanswered } from "@/lib/content/queues";
import {
  AiBadge,
  Avatar,
  Chip,
  Dot,
  MiniCard,
  Owner,
  SearchGlyph,
  type MiniProps,
} from "@/components/features/minis/parts";

/* ==========================================================================
   MINIS - CONVERSATIONS
   ========================================================================== */

/* ---- One Inbox -----------------------------------------------------------
   The four people from section 2, in one list, each with their own channel
   mark - which is the whole feature in one picture. Anand's row is open and
   assigned, because a shared inbox is only shared if somebody owns each
   conversation.

   THE RICH VERSION ADDS THE TWO TEAM TOOLS §6 LISTS that a visitor has not
   seen on the home page: an internal note, which the customer never sees,
   and saved quick replies. The note is about the charges list Anand is
   owed tomorrow, the same promise the follow-ups mini keeps. */
export function InboxMini({ rich = false }: MiniProps) {
  return (
    <MiniCard className="w-full overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-line px-2.5 py-2">
        <span className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-bg px-2 text-[11px] text-muted">
          <SearchGlyph className="size-3 shrink-0" />
          <span className="truncate">Search conversations</span>
        </span>
        <span className="rounded-md bg-ink px-1.5 py-0.5 text-[10.5px] font-bold text-white">
          All
        </span>
        <span className="rounded-md border border-line px-1.5 py-0.5 text-[10.5px] font-semibold text-muted">
          Unread
        </span>
      </div>

      <ul className="p-1">
        {unanswered.map((e, i) => {
          const Icon = channelIcons[e.channel];
          return (
            <li
              key={e.id}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                i === 0 ? "bg-brand-tint" : ""
              }`}
            >
              <Avatar name={e.name} tint={i} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1">
                  <span className="truncate text-[12px] font-bold">
                    {e.name}
                  </span>
                  <Icon
                    className="size-3 shrink-0"
                    style={{ color: `var(--color-${e.channel})` }}
                  />
                  <span className="ml-auto shrink-0 pl-1 text-[10px] text-muted">
                    {e.time}
                  </span>
                </span>
                <span className="block truncate text-[11px] leading-snug text-muted">
                  {e.text}
                </span>
              </span>
              {i === 0 && <Owner initials={e.owner} />}
            </li>
          );
        })}
      </ul>

      {rich && (
        <div className="space-y-2 border-t border-line px-2.5 py-2.5">
          <p className="rounded-lg border border-[#f3e2b3] bg-[#fff8e6] px-2 py-1.5 text-[10.5px] leading-snug text-[#6b4e00]">
            <span className="font-bold">Internal note &middot; SA</span>
            <span className="block">
              Charges list goes to Anand tomorrow morning.
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-1">
            <span className="mr-0.5 text-[10px] font-bold text-muted">
              Quick replies
            </span>
            <Chip>Timings</Chip>
            <Chip>Price list</Chip>
            <Chip>Location</Chip>
          </div>
        </div>
      )}
    </MiniCard>
  );
}

/* ---- AI Sales Assistant --------------------------------------------------
   The Tanglish turn from the home page's language demonstration, word for
   word - the same question, the same ₹500 - with the four languages above
   it and Tanglish lit. It is the claim an Indian business checks first,
   so it is the one this mini makes.

   THE RICH VERSION CARRIES ON INTO A QUALIFYING QUESTION - asked in
   Tanglish, because the assistant stays in the customer's language - and
   shows the answer being saved. Replying is one of the assistant's jobs;
   asking your questions and keeping the answers is the one that makes it
   a sales assistant rather than an answering machine. */
const TURNS = features.language.turns;
const TANGLISH = TURNS.find((t) => t.id === "tg") ?? TURNS[0];

export function AssistantMini({ rich = false }: MiniProps) {
  return (
    <MiniCard className="w-full overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b border-line px-2.5 py-2">
        {TURNS.map((t) => (
          <span
            key={t.id}
            className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold ${
              t.id === TANGLISH.id
                ? "bg-brand text-white"
                : "bg-[#f2f4f9] text-ink/60"
            }`}
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2 p-2.5 [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:14px_14px]">
        <span className="max-w-[88%] self-start rounded-xl rounded-tl-sm border border-line bg-surface px-2.5 py-1.5 text-[11.5px] leading-snug shadow-sm">
          {TANGLISH.ask}
        </span>
        <span className="max-w-[92%] self-end rounded-xl rounded-br-sm bg-brand px-2.5 py-1.5 text-[11.5px] leading-snug text-white shadow-sm">
          {TANGLISH.reply}
          <span className="mt-1 flex justify-end">
            <AiBadge />
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-brand-tint px-2 py-0.5 text-[10.5px] font-bold text-brand">
          <Dot />
          Answered from your price list
        </span>

        {rich && (
          <>
            <span className="max-w-[80%] self-end rounded-xl rounded-br-sm bg-brand px-2.5 py-1.5 text-[11.5px] leading-snug text-white shadow-sm">
              First visit ah, illa follow-up ah?
              <span className="mt-1 flex justify-end">
                <AiBadge />
              </span>
            </span>
            <span className="max-w-[70%] self-start rounded-xl rounded-tl-sm border border-line bg-surface px-2.5 py-1.5 text-[11.5px] leading-snug shadow-sm">
              First visit dhaan.
            </span>
            <span className="self-center">
              <Chip tone="green">Saved to contact &middot; Visit type</Chip>
            </span>
          </>
        )}
      </div>
    </MiniCard>
  );
}
