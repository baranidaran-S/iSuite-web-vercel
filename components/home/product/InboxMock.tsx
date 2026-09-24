"use client";

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

   NO FIGURES ANYWHERE. Times of day and message ages are content; counts,
   values and response-time averages are statistics. The unread pill is the
   one number on screen and it is the length of the list beside it.
   ========================================================================== */

type Props = {
  merged: boolean;
  answered: boolean;
  /* The assistant reply, revealed a character at a time by the section. */
  typed: string;
  typing: boolean;
};

const AVATAR_TINTS = [
  "bg-[#e8f0ff] text-[#2f5fd0]",
  "bg-[#ffeaf2] text-[#c2367a]",
  "bg-[#e6f7ee] text-[#1b7a4b]",
  "bg-[#fff1e0] text-[#a5651c]",
];

export function InboxMock({ merged, answered, typed, typing }: Props) {
  const lead = unanswered[0];

  return (
    <motion.div
      layout
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className={
        merged
          ? "overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(10,16,32,0.45)]"
          : ""
      }
    >
      <div className="flex">
        {/* ---------------- LEFT: the conversation list ---------------- */}
        <motion.div
          layout
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className={merged ? "w-full lg:w-[38%] lg:border-r lg:border-line" : "w-full"}
        >
          {/* Search + filters. They do not exist before the merge, because
              there is no single list to search yet. */}
          {merged && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="border-b border-line px-3 py-3"
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

              <div className="mt-2.5 flex items-center gap-1.5">
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

          {/* THE CHANNEL HEADINGS, UNMERGED ONLY. Without them the opening
              is four loose cards; with them it is four separate places, which
              is the state the section starts from and has to be readable in
              the very first frame. Tinted chips rather than bare icons for
              the same reason they are tinted in section 2 - four small grey
              marks all read as "small grey mark". */}
          {!merged && (
            <div className="mb-3 grid grid-cols-4 gap-3">
              {unanswered.map((e) => {
                const Icon = channelIcons[e.channel];
                return (
                  <div
                    key={`head-${e.id}`}
                    className="flex items-center gap-2 border-b border-line pb-2.5"
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
            </div>
          )}

          <div
            className={
              merged
                ? "flex flex-col p-1.5"
                : "grid grid-cols-4 gap-3"
            }
          >
            {unanswered.map((e, i) => (
              <motion.button
                key={e.id}
                type="button"
                layout
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className={
                  merged
                    ? `flex w-full items-start gap-3 rounded-lg px-3 py-3.5 text-left transition-colors ${
                        i === 0 ? "bg-brand-tint" : "hover:bg-bg"
                      }`
                    : "flex w-full items-start gap-3 rounded-2xl border border-dashed border-line-strong px-4 py-5 text-left"
                }
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full text-[14px] font-bold ${AVATAR_TINTS[i]}`}
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
                    <span className="line-clamp-1 flex-1 text-[14px] text-muted sm:text-[14.5px]">
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
            Desktop only. At phone width a two-pane workspace is two
            unreadable panes, and the list alone still makes the point. */}
        {merged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="hidden w-[62%] flex-col bg-bg/40 lg:flex"
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
              <span className="ml-auto flex items-center gap-2">
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
            <div className="relative flex min-h-[400px] flex-1 flex-col gap-2.5 p-4 [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:16px_16px]">
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

              {answered && (
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-[78%] self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-white shadow-sm"
                >
                  <span className="block text-[14.5px] leading-snug">
                    {typed}
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
              )}

              {answered && !typing && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mx-auto mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[12.5px] font-bold text-brand"
                >
                  <span className="size-1.5 rounded-full bg-brand" />
                  {lead.did}
                </motion.span>
              )}
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
