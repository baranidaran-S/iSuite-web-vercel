"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { channelIcons } from "@/components/ui/icons";
import { oneInbox, unanswered } from "@/lib/content/queues";

/* ==========================================================================
   THE INBOX - drawn to match the real product
   --------------------------------------------------------------------------
   The first version of this section put four plain cards in a plain list and
   it read as a wireframe. The real iSuite AI inbox is a two-pane workspace -
   search, filters, avatars, a live thread, an assignee, a session timer, a
   composer - and a visitor who has seen a CRM recognises that shape in about
   a second. Every one of those details is here for that reason, not for
   decoration: together they are what says "this is software" rather than
   "this is a diagram of software".

   THE ROWS ARE THE SAME ELEMENTS IN BOTH STATES. When `merged` is false they
   sit in four columns, echoing section 2; when it is true they stack into the
   conversation list. Motion's `layout` animates between the two, which is
   what makes a viewer read them as the SAME four enquiries rather than as one
   picture replaced by another. Rendering separate elements per state would
   lose that, and the continuity is the entire argument.

   THE AI BADGE IS THE POINT OF THE THREAD. Their real product marks every
   assistant message with it, and it is the one detail that distinguishes this
   from a shared inbox with a person typing fast.

   BOTH PANES ON A PHONE, STACKED - list above, thread below. This went
   through three wrong answers first and the last one is the reason for
   this one.

     hidden lg:flex   the thread simply did not exist below 1024px, so the
                      beat this section is built around - the assistant
                      writing the reply, with the AI badge on it - was
                      rendered into a pane nobody could see, typewriter and
                      all.
     one at a time    list until the reply starts, thread after. It read
                      well and left a 250px hole of white inside the panel,
                      because one phone pane is 428px and the pinned frame
                      is about 690px.
     stretch to fill  the same hole, just distributed - an inbox panel with
                      four conversations and a quarter of a screen of
                      nothing under them.

   The hole was never a placement problem. A viewport-tall frame wants a
   viewport of content, and one pane is not that. Two panes are: the list
   sits at its natural height and the THREAD's message area is the flexible
   part, so it takes whatever is left on a tall phone and gives it back on
   a short one.

   The two buttons at the top right of the thread - Open, Assigned - stay
   held back to lg, because they are chrome rather than argument and the
   header has to carry a name, a channel and a timer first.

   NO FIGURES ANYWHERE. Times of day and message ages are content; counts,
   values and response-time averages are statistics. The unread pill is the
   one number on screen and it is the length of the list beside it.

   THE TYPEWRITER LIVES AT THE BOTTOM OF THIS FILE AND THAT IS A PERFORMANCE
   FIX, NOT TIDINESS. It used to be a useState in the section, handed down
   as a `typed` prop - so each of the reply's 105 characters re-rendered the
   section, this component and everything in it. Eleven nodes in that tree
   carry motion's `layout` prop, and motion re-measures a layout node every
   time the component owning it renders. That is 105 measure-and-correct
   passes over eleven boxes in three seconds, and it happens on the REPLY
   beat - the one the section is built around. A laptop absorbs it; a phone
   stammers, which is exactly what it was reported doing.

   Owned by the bubble instead, the same 105 renders touch two spans and no
   layout node at all. AssistantReply carries no `layout` prop for that
   reason, and nothing above it re-renders while the reply types.
   ========================================================================== */

type Props = {
  merged: boolean;
  answered: boolean;
  /* Reduced motion: the reply is already written rather than typing. */
  still?: boolean;
};

/* WHERE EACH HEADING AND ITS CARD SIT, BY HAND, because two sibling grids
   cannot interleave. The headings and the cards used to be two grids stacked
   one above the other, which lines up at four columns - heading i sits over
   card i - and comes apart at two, where auto-flow puts ALL FOUR headings in
   the first two rows and all four cards below them. On a phone that read as
   "WhatsApp, Instagram, Facebook, Website" and then four unlabelled cards,
   with Facebook's heading directly above WhatsApp's enquiry.

   One grid, explicit placement. At two columns the rows run heading, card,
   heading, card; at lg they collapse to one row of headings over one row of
   cards, which is the arrangement that was always intended. */
const CELL = [
  {
    head: "col-start-1 row-start-1 lg:col-start-1 lg:row-start-1",
    card: "col-start-1 row-start-2 lg:col-start-1 lg:row-start-2",
  },
  {
    head: "col-start-2 row-start-1 lg:col-start-2 lg:row-start-1",
    card: "col-start-2 row-start-2 lg:col-start-2 lg:row-start-2",
  },
  {
    head: "col-start-1 row-start-3 lg:col-start-3 lg:row-start-1",
    card: "col-start-1 row-start-4 lg:col-start-3 lg:row-start-2",
  },
  {
    head: "col-start-2 row-start-3 lg:col-start-4 lg:row-start-1",
    card: "col-start-2 row-start-4 lg:col-start-4 lg:row-start-2",
  },
];

const AVATAR_TINTS = [
  "bg-[#e8f0ff] text-[#2f5fd0]",
  "bg-[#ffeaf2] text-[#c2367a]",
  "bg-[#e6f7ee] text-[#1b7a4b]",
  "bg-[#fff1e0] text-[#a5651c]",
];

export function InboxMock({ merged, answered, still = false }: Props) {
  const lead = unanswered[0];

  return (
    <motion.div
      layout
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className={
        merged
          ? "flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(10,16,32,0.45)] md:h-auto"
          : ""
      }
    >
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* ---------------- LEFT: the conversation list ---------------- */}
        <motion.div
          layout
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className={
            merged
              ? "inbox-list w-full shrink-0 border-b border-line md:w-[38%] md:border-r md:border-b-0"
              : "w-full"
          }
        >
          {/* Search + filters. They do not exist before the merge, because
              there is no single list to search yet. */}
          {merged && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              /* HIDDEN ON A PHONE, and it is the block that makes both
                 panes fit. It is 53px of fixed height; without it the list
                 and the thread come to 568px against the 608px a common
                 phone has, and with it they come to 621px and do not. The
                 rows are the argument, the search bar is chrome, so the
                 chrome goes. It is back from 768px up. */
              className="hidden border-b border-line px-3 py-2 md:block md:py-3"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-line bg-bg px-3">
                  <SearchGlyph />
                  <span className="text-[14px] text-muted">
                    Search conversations...
                  </span>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-muted">
                  <ComposeGlyph />
                </span>
              </div>

              <div className="mt-2.5 hidden items-center gap-1.5 md:flex">
                <Chip active>All</Chip>
                <Chip>
                  Unread
                  <span className="ml-1 rounded-full bg-brand px-1.5 text-[11.5px] text-white">
                    {answered ? 0 : unanswered.length}
                  </span>
                </Chip>
                <Chip>Tags</Chip>
                <Chip>Channels</Chip>
              </div>
            </motion.div>
          )}

          {/* FOUR ACROSS ONLY AT lg. Four columns inside a 342px phone
              give each card about 80px - an avatar, a truncated name and
              nothing else, which is not a smaller version of the idea but
              an unreadable one. Two columns hold a name, the message and
              the amber line, and two rows of two still read as four
              separate places. Below lg that is what this draws. */}
          <div
            className={
              merged
                ? "flex flex-col p-1.5"
                : "grid grid-cols-2 gap-x-3 lg:grid-cols-4"
            }
          >
            {/* THE CHANNEL HEADINGS, UNMERGED ONLY. Without them the opening
                is four loose cards; with them it is four separate places,
                which is the state the section starts from and has to be
                readable in the very first frame. Tinted chips rather than
                bare icons for the same reason they are tinted in section 2 -
                four small grey marks all read as "small grey mark".

                They are children of the SAME grid as the cards now. See
                CELL above for why. */}
            {!merged &&
              unanswered.map((e, i) => {
                const Icon = channelIcons[e.channel];
                return (
                  <div
                    key={`head-${e.id}`}
                    className={`mb-2.5 flex items-center gap-2 border-b border-line pb-2.5 ${CELL[i].head}`}
                  >
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-lg"
                      style={{
                        color: `var(--color-${e.channel})`,
                        backgroundColor: `color-mix(in oklab, var(--color-${e.channel}) 14%, transparent)`,
                      }}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="truncate text-[14.5px] font-bold">
                      {e.label}
                    </span>
                  </div>
                );
              })}

            {unanswered.map((e, i) => (
              <motion.button
                key={e.id}
                type="button"
                layout
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className={
                  merged
                    ? `flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors md:py-3.5 ${
                        i === 0 ? "bg-brand-tint" : "hover:bg-bg"
                      }`
                    : `flex w-full items-start gap-3 rounded-2xl border border-dashed border-line-strong px-3.5 py-4 text-left mb-3 lg:mb-0 lg:px-4 lg:py-5 ${CELL[i].card}`
                }
              >
                {/* NO AVATAR IN A TWO-COLUMN CELL. Measured: the cell is
                    165px, so with the avatar and its gap the text column is
                    85px and the name row needs 103 - which is why the phone
                    showed "Ana..." and "Pra...". Without it the column is
                    137px, the name and its timestamp both fit whole, and
                    the message takes two lines instead of three truncated
                    ones. The channel heading directly above the card is
                    already doing the identifying an avatar initial does. */}
                <span
                  className={`${
                    merged ? "grid" : "hidden lg:grid"
                  } size-9 shrink-0 place-items-center rounded-full text-[14px] font-bold ${AVATAR_TINTS[i]}`}
                >
                  {e.name.charAt(0)}
                </span>

                <motion.span layout="position" className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[15px] font-bold sm:text-[15.5px]">
                      {e.name}
                    </span>
                    <ChannelMark channel={e.channel} />
                    <span className="ml-auto shrink-0 pl-1 text-[12.5px] text-muted">
                      {e.time}
                    </span>
                  </span>

                  <span className="mt-0.5 flex items-start gap-1.5">
                    <span
                      className={`flex-1 text-[14px] text-muted sm:text-[14.5px] ${
                        merged ? "line-clamp-1" : "line-clamp-2 lg:line-clamp-1"
                      }`}
                    >
                      {answered ? e.reply : e.text}
                    </span>
                    {!answered && (
                      <span className="mt-1 size-2 shrink-0 rounded-full bg-brand" />
                    )}
                  </span>

                  {/* The amber wound from section 2, closing. */}
                  {!answered && (
                    <span className="mt-1.5 block text-[12.5px] font-semibold text-night-warn">
                      no reply &middot; {e.waited}
                    </span>
                  )}
                </motion.span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ---------------- RIGHT: the live thread ----------------
            BESIDE THE LIST FROM 768px, UNDERNEATH IT BELOW THAT. It is the
            only place the assistant's reply is actually drawn, so it can
            never be the pane that gets dropped at a narrow width. */}
        {merged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="inbox-thread flex min-h-0 w-full flex-1 flex-col bg-bg/40 md:w-[62%] md:flex-none"
          >
            <div className="flex items-center gap-2.5 border-b border-line bg-surface px-4 py-3">
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full text-[14px] font-bold ${AVATAR_TINTS[0]}`}
              >
                {lead.name.charAt(0)}
              </span>
              <span className="text-[15px] font-bold">{lead.name}</span>
              <ChannelMark channel={lead.channel} />
              <span className="ml-1 rounded-full bg-brand-tint px-2 py-0.5 text-[12.5px] font-semibold text-brand">
                21h remaining
              </span>
              <span className="ml-auto hidden items-center gap-2 lg:flex">
                <span className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[13px] font-semibold">
                  Open
                </span>
                <span className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 text-[13px] font-semibold">
                  <span className="grid size-6 place-items-center rounded-full bg-[#e8f0ff] text-[11px] font-bold text-[#2f5fd0]">
                    {lead.owner}
                  </span>
                  Assigned
                </span>
              </span>
            </div>

            {/* Thread. The faint dot grid is the messaging-app ground every
                customer already knows. */}
            <div className="relative flex min-h-[96px] flex-1 flex-col gap-2.5 p-3.5 [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:16px_16px] md:min-h-[400px] md:p-4">
              <span className="mx-auto rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12px] font-semibold text-muted">
                Today
              </span>

              <span className="max-w-[72%] self-start rounded-2xl rounded-tl-md border border-line bg-surface px-3 py-2 shadow-sm">
                <span className="block text-[14.5px] leading-snug">
                  {lead.text}
                </span>
                <span className="mt-1 block text-right text-[11.5px] text-muted">
                  12:18
                </span>
              </span>

              <AssistantReply
                text={lead.reply ?? ""}
                did={lead.did}
                on={answered}
                still={still}
              />
            </div>

            <div className="flex items-center gap-2 border-t border-line bg-surface px-3.5 py-3">
              <span className="text-muted">
                <ClipGlyph />
              </span>
              <span className="flex-1 truncate text-[14px] text-muted">
                Type a message...
              </span>
              <span className="grid size-8 place-items-center rounded-lg bg-brand text-white">
                <SendGlyph />
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* The label only makes sense once there is one list to label. */}
      {merged && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="border-t border-line px-4 py-2.5 text-[13px] font-semibold text-muted"
        >
          {oneInbox.inboxLabel}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ==========================================================================
   THE ASSISTANT'S REPLY
   --------------------------------------------------------------------------
   The bubble and the little "what it did" pill under it, which are flex
   siblings rather than nested - hence the fragment.

   IT OWNS THE TYPING. See the note at the top of the file for why that
   matters. NOTHING IN HERE MAY TAKE A `layout` PROP, or the whole point of
   moving it is undone.

   It renders null rather than unmounting when `on` goes false, so the
   sentence it has already typed survives a scroll back up and the bubble's
   entry animation still plays fresh when the beat comes round again.
   ========================================================================== */
function AssistantReply({
  text,
  did,
  on,
  still,
}: {
  text: string;
  /* Optional only because the array it comes from is derived with a find;
     every enquiry that reaches this component has one. */
  did: string | undefined;
  on: boolean;
  still: boolean;
}) {
  const typed = useTypewriter(text, on && !still);
  const shown = still ? text : typed;
  const typing = !still && shown.length < text.length;

  if (!on) return null;

  return (
    <>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-[78%] self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-white shadow-sm"
      >
        <span className="block text-[14.5px] leading-snug">
          {shown}
          {typing && (
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-white/90" />
          )}
        </span>
        <span className="mt-1 flex items-center justify-end gap-1.5">
          <span className="rounded bg-white/20 px-2 py-0.5 text-[12px] font-bold">
            &#10022; AI
          </span>
          <span className="text-[11.5px] text-white/80">12:19</span>
          <TicksGlyph />
        </span>
      </motion.span>

      {!typing && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[12.5px] font-bold text-brand"
        >
          <span className="size-1.5 rounded-full bg-brand" />
          {did}
        </motion.span>
      )}
    </>
  );
}

/* Reveals `text` one character at a time once `on` is true. A reply that
   simply appears is a string; a reply that types is a machine working, and
   that difference is most of what this section is selling.

   It holds whatever it has typed when `on` goes false rather than resetting,
   so scrolling back up does not rewind the sentence mid-word. */
function useTypewriter(text: string, on: boolean) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!on || n >= text.length) return;
    const id = window.setTimeout(() => setN((v) => v + 1), 28);
    return () => window.clearTimeout(id);
  }, [on, n, text.length]);

  return text.slice(0, n);
}

function ChannelMark({ channel }: { channel: keyof typeof channelIcons }) {
  const Icon = channelIcons[channel];
  return (
    <Icon
      className="size-3.5 shrink-0"
      style={{ color: `var(--color-${channel})` }}
    />
  );
}

function Chip({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-[13px] font-semibold ${
        active
          ? "bg-ink text-white"
          : "border border-line bg-surface text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/* Inline glyphs - four small shapes do not justify an icon dependency. */
const SearchGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-3.5 text-muted" aria-hidden>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
    <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ComposeGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
    <path d="M4 20h16M6 15.5 15.5 6l2.5 2.5L8.5 18H6v-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const TicksGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-3.5 text-white/80" aria-hidden>
    <path d="m2 13 3.5 3.5L13 9M10 13l3.5 3.5L21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ClipGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
    <path d="M17 8.5 9.5 16a3 3 0 1 1-4.2-4.3l8-8a4.5 4.5 0 0 1 6.4 6.4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const SendGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden>
    <path d="M2.5 21 23 12 2.5 3v7l14 2-14 2v7z" />
  </svg>
);
