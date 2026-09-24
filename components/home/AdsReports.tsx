"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { PlayIcon, WhatsAppIcon } from "@/components/ui/icons";
import { MegaphoneMark } from "@/components/ui/businessIcons";
import { ads, clip, type Turn } from "@/lib/content/ads";

/* ==========================================================================
   SECTION 7 - META ADS
   --------------------------------------------------------------------------
   THE CONVERSATION, DRAWN AS IT HAPPENS. The owner sends a poster into AI
   Studio, the AI asks the campaign questions itself, the owner approves,
   and it runs. lib/content/ads.ts lists the five treatments this replaced
   and why each failed - the short version is that every one of them
   DESCRIBED the product instead of showing it working.

   A CHAT NEEDS NO KEY. Every diagram this section has tried - a joined
   row, a tag spanning four moments, two panels with a gap - asked a
   visitor to learn how to read it first. Nobody has to be taught to read
   a conversation, and this one happens to be exactly what the product
   does.

   IT IS THE OWNER IN THE CHAT, NOT A CUSTOMER, and that is what stops it
   repeating sections 3 and 5. Every other conversation on this page is
   somebody buying from the business. This is the business talking to its
   own software, it is framed as a studio rather than as a phone, and it
   ends on a button no customer thread would ever have.

   THE POSTER IS AN ATTACHMENT NOW. The same drawn rectangle sat in a panel
   labelled "your poster or video" for a whole round and read as an empty
   box. Inside a message bubble, with a filename under it, it reads as a
   file somebody sent - which is all it ever needed to be.

   THE PUNCHLINE IS THE SECTION. "You never open Facebook or Ads Manager"
   is what a clinic owner repeats to somebody else, and it was missing from
   every earlier version. It is set large, alone, directly under the
   picture.

   THE OPENING CLIP GATES NOTHING. It plays when scrolled to, and the rest
   of the section fades in when it ends - but every word of that section is
   in the DOM from first paint and only its opacity is waiting. Three
   separate failures all reveal it anyway: the file erroring, autoplay being
   refused, or `onEnded` simply never arriving. The last one is why there is
   a timer as well as an event handler; iOS low-power mode refuses autoplay
   even on a muted video, and without the timer the section would stay
   invisible on exactly the devices least able to report it.

   THE CLIP LEAVES WHEN IT IS DONE. It collapses its own height as it
   fades, at the same moment the section fades in, so the two read as one
   crossfade rather than as a video that finished and then sat there. A
   clip that stays is a still frame of a logo parked above the content.

   ITS BACKGROUND MUST MATCH --color-night. There is no CSS that rescues a
   white-background video on a dark ground: multiply removes the white but
   crushes a blue mark to near-black, screen and lighten keep the white,
   and invert leaves a black square and the wrong hue. True alpha would
   need two files - WebM/VP9 for Chrome, HEVC-alpha MP4 for Safari - for a
   result identical to simply exporting on #0b1220.

   THE SECTION STARTS WHITE AND TURNS TO NIGHT, which began as a way
   around a white-background video and turned out to be better than the fix
   it replaced. The clip sits on white, so its background simply is not
   there; when it ends, the ground goes dark in the same movement that
   brings the content in. A section that changes colour under you is the
   most emphatic transition this page has, and it is spent on the one line
   the section exists to deliver.

   IT ALSO MEANS THE VIDEO NEVER NEEDED RE-EXPORTING. Worth remembering
   before anyone "fixes" the file: a dark-background export would now be
   the thing that looks wrong.

   EVERY COLOUR IN THE HEADER SWAPS WITH IT - the heading, the lead, the
   eyebrow pill and its dot - all on `transition-colors`, all at the same
   700ms, or the ground would change and the type would jump.

   WITH NO FILE SUPPLIED, THE SECTION IS SIMPLY NORMAL. clip.src is null
   until the video lands in public/, and nothing renders a gap or a
   placeholder in the meantime - the section is night from first paint, as
   it is for anyone who has asked for reduced motion.

   THE LOWER HALF IS LIT, NOT JUST LIGHTER. It read as dull twice, and
   the second time the fix was structural - handles, rules, a header. It
   was still dull, because the problem underneath was luminance: three
   panels at 4% white on near-black are paler rectangles, not objects.
   What makes a dark panel look lit is a gradient down its face, a one-pixel
   highlight along its top edge, and a light source inside it. All three are
   here, the body copy went from the near-neutral muted grey to white at
   72%, and the bottom gradient that was darkening the darkest part of the
   section is almost gone.

   NO NUMBER APPEARS ANYWHERE IN THIS COMPONENT. Not a spend, not a count,
   not a percentage - §6 bans fake dashboard figures, and the daily cap is
   named as something the owner sets rather than shown as an amount.
   ========================================================================== */

export function AdsReports() {
  const reduced = useReducedMotion();
  const still = reduced === true;

  /* The clip is decoration and carries no information, so reduced motion
     skips it outright and the section starts revealed. */
  const plays = Boolean(clip.src) && !still;

  const videoRef = useRef<HTMLVideoElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const inView = useInView(slotRef, { once: true, amount: 0.6 });
  const [revealed, setRevealed] = useState(!plays);
  /* Released once the section has finished opening. It cannot simply stay
     hidden: the AI Studio panel's bloom is drawn at -inset-6 and blurred
     70px, so a permanent overflow clip would slice it off. */
  const [unclipped, setUnclipped] = useState(!plays);

  /* autoPlay would fire on load, which for a section this far down the page
     means the clip is long over before anybody reaches it. It plays when
     scrolled to instead, and a refused play() reveals the section rather
     than stranding it. */
  useEffect(() => {
    if (!plays || !inView) return;
    videoRef.current?.play().catch(() => setRevealed(true));
  }, [plays, inView]);

  /* The belt to the braces, plus the optional early reveal. Both are
     timers and both only start once the clip is on screen, because a
     fallback counting down while the visitor is four sections above it
     would fire before they ever arrived. */
  useEffect(() => {
    if (!plays || !inView) return;
    const timers = [setTimeout(() => setRevealed(true), clip.fallbackMs)];
    if (clip.revealAtMs !== null) {
      timers.push(setTimeout(() => setRevealed(true), clip.revealAtMs));
    }
    return () => timers.forEach(clearTimeout);
  }, [plays, inView]);

  const enter = (i = 0, delay = 0) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: {
            duration: 0.45,
            delay: delay + i * 0.12,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section id="ads-reports" className="p-2 md:p-3">
      <div
        className={`relative overflow-hidden rounded-[1.5rem] px-4 pt-24 pb-20 transition-colors duration-700 md:rounded-[2rem] md:px-10 md:pt-32 md:pb-28 ${
          revealed ? "bg-night" : "bg-surface"
        }`}
      >
        {/* The blooms belong to the dark ground. On white they would read
            as a blue wash across the top of a clean section, so they arrive
            with it. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute top-[12%] left-1/2 h-[42rem] w-[70rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[150px]" />
          {/* A second bloom, low down. The section had one light source at
              12% and nothing under it, so everything below the studio
              panel sat in unlit navy and read as the section running
              out of things to say. */}
          <div className="absolute top-[58%] left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand/26 blur-[130px]" />
          <div className="absolute top-[82%] left-1/2 h-[24rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand-bright/12 blur-[120px]" />
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-b from-transparent to-black/8" />
        </div>

        {/* ---- THE HEADING ---- */}
        <div className="relative mx-auto max-w-4xl text-center">
          <p
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold tracking-[0.04em] backdrop-blur-sm transition-colors duration-700 ${
              revealed
                ? "border-white/15 bg-white/8 text-white/80"
                : "border-line bg-surface text-ink/70"
            }`}
          >
            <span
              className={`size-1.5 rounded-full transition-colors duration-700 ${
                revealed ? "bg-brand-bright" : "bg-brand"
              }`}
            />
            {ads.eyebrow}
          </p>

          <h2
            className={`h2-section mx-auto mt-6 max-w-[18ch] font-extrabold transition-colors duration-700 ${
              revealed ? "text-white" : "text-ink"
            }`}
            style={{ "--h2": "4em" } as React.CSSProperties}
          >
            {ads.heading}
          </h2>

          <p
            className={`lead-section mx-auto mt-7 max-w-[58ch] transition-colors duration-700 ${
              revealed ? "text-night-muted" : "text-muted"
            }`}
          >
            {ads.lead}
          </p>
        </div>

        {/* ---- THE OPENING CLIP ----
            Rendered only when a file exists. The slot has no reserved
            height otherwise, so the section closes up around it. */}
        <AnimatePresence initial={false}>
          {plays && !revealed && (
            <motion.div
              key="clip"
              ref={slotRef}
              initial={false}
              exit={{ opacity: 0, scale: 0.94, height: 0, marginTop: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto mt-12 flex justify-center overflow-hidden md:mt-14"
            >
              <video
                ref={videoRef}
                src={clip.src ?? undefined}
                muted
                playsInline
                preload="auto"
                onEnded={() => setRevealed(true)}
                onError={() => setRevealed(true)}
                style={{ width: clip.width }}
                className="h-auto max-w-full rounded-2xl"
                aria-hidden
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- EVERYTHING THE CLIP HANDS OVER TO ----
            HEIGHT AS WELL AS OPACITY, and the height is the point. Fading
            alone left the content occupying its full height while
            invisible, so the clip played at the top of a screen and a half
            of empty navy. Collapsed to nothing, the section is a heading
            and a clip until the clip is done.

            IT IS STILL IN THE DOM THROUGHOUT. Height zero with overflow
            hidden is not conditional rendering: the markup is served, so a
            crawler reads every word and a screen reader is not waiting on
            a video to finish. That was the whole reason for not gating it,
            and collapsing costs none of it. */}
        <motion.div
          initial={false}
          animate={{ height: revealed ? "auto" : 0, opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => revealed && setUnclipped(true)}
          style={{ overflow: unclipped ? "visible" : "hidden" }}
        >
          {/* ---- AI STUDIO ---- */}
          <div className="relative mx-auto mt-14 max-w-3xl md:mt-16">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand/20 blur-[70px]"
            />

            <div className="relative overflow-hidden rounded-[1.5rem] bg-surface shadow-[0_45px_100px_-45px_rgba(0,0,0,0.95)] ring-1 ring-black/5">
              {/* The studio's own bar. Two lines rather than one so the panel
                is unmistakably a workspace and not a phone. */}
              <div className="flex items-center gap-3 border-b border-line px-5 py-4 md:px-7">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-tint">
                  <SparkGlyph className="size-[18px] text-brand" />
                </span>
                <div className="min-w-0">
                  <p className="text-[16px] leading-tight font-extrabold">
                    {ads.studio.title}
                  </p>
                  <p className="mt-0.5 text-[13.5px] font-semibold text-muted">
                    {ads.studio.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 bg-bg px-5 py-6 md:px-7 md:py-7">
                {ads.studio.turns.map((turn, i) => (
                  <motion.div key={i} {...enter(i, 0.1)}>
                    <Bubble turn={turn} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ---- THE POINT ----
              A 42px line alone in the middle of a dark band reads as a
              subheading. The short bright rule above it is the only colour
              below the studio panel and it says: this is the thing the
              section was built to say. */}
          <motion.div
            {...enter(0, 0.7)}
            className="relative mt-14 flex flex-col items-center md:mt-16"
          >
            <span
              aria-hidden
              className="h-[3px] w-12 rounded-full bg-brand-bright shadow-[0_0_18px_rgba(0,200,248,0.8)]"
            />
            <p className="mt-7 max-w-[22ch] text-center text-[30px] leading-[1.12] font-extrabold text-white md:text-[42px]">
              {ads.punchline}
            </p>
          </motion.div>

          {/* ---- THE THREE THINGS THAT STILL NEED SAYING ----
              A handle, a rule and a line each. It was three grey paragraphs
              at one weight under a hairline that faded to nothing, which
              gave a reader no way in and nothing to scan - and the third is
              twice the length of the others, so without handles the row
              also looked accidental. Not a word of the lines changed. */}
          <div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
            <motion.p
              {...enter(0)}
              className="text-center text-[12.5px] font-bold tracking-[0.18em] text-white/55 uppercase"
            >
              {ads.notesLabel}
            </motion.p>

            <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-7">
              {ads.notes.map((note, i) => (
                <motion.div
                  key={note.label}
                  {...enter(i, 0.05)}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.10] to-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_60px_-34px_rgba(0,0,0,0.9)]"
                >
                  {/* A light source inside each card. A flat wash at 4%
                      white has no form - it reads as a slightly paler
                      rectangle. A gradient plus a top inner highlight plus
                      one corner glow is what makes a dark panel look LIT
                      rather than merely lighter. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-14 -left-10 size-40 rounded-full bg-brand-bright/14 blur-[48px]"
                  />

                  <span
                    aria-hidden
                    className="relative block h-[3px] w-9 rounded-full bg-brand-bright shadow-[0_0_14px_rgba(0,200,248,0.75)]"
                  />
                  <p className="relative mt-5 text-[17px] leading-tight font-extrabold text-white">
                    {note.label}
                  </p>
                  <p className="relative mt-2.5 text-[15.5px] leading-relaxed text-white/72">
                    {note.line}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ---- THE DISCLAIMER ----
              Required by §15, at reading size. It lost its box: four
              bordered panels stacked down the section was the lower half
              becoming a pile of containers, and this is the one that should
              look least like the other three - it is the legal note, not a
              fourth point. A rule and a label do the same job without
              adding another rectangle. */}
          <motion.div
            {...enter(3)}
            className="relative mx-auto mt-14 max-w-3xl border-t border-white/15 pt-8"
          >
            <p className="text-[12px] font-bold tracking-[0.16em] text-white/50 uppercase">
              {ads.disclaimerLabel}
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/68 md:text-[16px]">
              {ads.disclaimer}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   ONE TURN
   --------------------------------------------------------------------------
   An avatar and a bubble. The owner's sit right, the assistant's left,
   which is the arrangement every chat app on the visitor's phone already
   uses and the entire reason this picture needs no explaining.

   THE AVATAR CARRIES WHO IS SPEAKING, so the bubble does not have to. The
   spark is the assistant and the figure is the owner - which means both
   sides can be light and still be unmistakable, and that is what frees the
   poster to be the only dark object in the panel.

   THE LAST TURN IS STILL A BUBBLE. It became a full-width panel with three
   captioned cards for one round and that was an overreach: it turned the
   assistant's answer into the heaviest object in a conversation whose
   subject is how little the owner has to do. Three chips with three marks
   say the same thing inside the bubble it belongs in.
   -------------------------------------------------------------------------- */
function Bubble({ turn }: { turn: Turn }) {
  const mine = turn.from === "you";

  return (
    <div
      className={`flex items-end gap-2.5 ${mine ? "justify-end" : "justify-start"}`}
    >
      {!mine && <Avatar mine={false} />}

      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-3.5 md:max-w-[74%] ${
          mine
            ? "rounded-br-md bg-surface text-ink shadow-[0_6px_18px_-10px_rgba(4,28,61,0.45)] ring-1 ring-black/5"
            : "rounded-bl-md bg-brand-tint text-ink"
        }`}
      >
        {turn.attachment && (
          <div className="mb-3.5">
            <Poster attachment={turn.attachment} />

            {/* The file chip. A filename on its own line reads as a
                caption; a filename with a thumbnail glyph beside it reads
                as an attachment, which is what makes the artwork above it
                a FILE the owner sent rather than a picture the page is
                showing. */}
            <div className="mt-2.5 flex items-center gap-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-bg text-muted">
                <ImageGlyph />
              </span>
              <span className="truncate text-[13.5px] font-semibold text-muted">
                {turn.attachment.file}
              </span>
            </div>
          </div>
        )}

        {turn.text && (
          <p
            className={`text-[16px] leading-snug md:text-[16.5px] ${
              turn.attachment ? "font-extrabold" : "font-semibold"
            }`}
          >
            {turn.text}
          </p>
        )}

        {/* THE MARKS ARE THE ONLY THING ADDED HERE. The WhatsApp one keeps
            its own green, because third-party marks are allowed to be
            themselves on this site and because it is the fastest way to
            tell the three apart at a glance. */}
        {turn.built && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {turn.built.map((item) => {
              const { Glyph, ink } = CHIP_MARKS[item.mark];
              return (
                <li
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-[13.5px] font-bold text-ink ring-1 ring-black/5"
                >
                  <Glyph className={`size-4 shrink-0 ${ink}`} />
                  {item.name}
                </li>
              );
            })}
          </ul>
        )}

        {turn.approve && (
          /* A span, not a button. It is part of a picture of the product
             and nothing here is clickable. */
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-[14.5px] font-bold text-white">
              <PlayIcon className="size-3.5" />
              {turn.approve}
            </span>
            <span className="text-[13.5px] font-semibold text-muted">
              {turn.approveNote}
            </span>
          </div>
        )}
      </div>

      {mine && <Avatar mine />}
    </div>
  );
}

const CHIP_MARKS = {
  ads: { Glyph: MegaphoneMark, ink: "text-brand" },
  form: { Glyph: DocGlyph, ink: "text-brand" },
  wa: { Glyph: WhatsAppIcon, ink: "text-[var(--color-wa)]" },
} as const;

function Avatar({ mine }: { mine: boolean }) {
  return (
    <span
      className={`grid size-9 shrink-0 place-items-center self-end rounded-full ${
        mine ? "bg-bg text-ink/55" : "bg-brand-tint text-brand"
      }`}
    >
      {mine ? <PersonGlyph /> : <SparkGlyph className="size-[17px]" />}
    </span>
  );
}

/* --------------------------------------------------------------------------
   THE POSTER
   --------------------------------------------------------------------------
   The clinic's own ad creative: its offer on the left, its artwork on the
   right, a menu dot cluster in the corner. Deep navy, which makes it the
   only dark object inside a white panel and therefore the first thing seen.

   IT WORKS WITHOUT THE ARTWORK. `image.src` is null until the file lands,
   and the layout is a flex row rather than a two-column grid so the text
   simply takes the whole card in the meantime - no gap, no placeholder
   block, no broken-image frame.

   THE ARTWORK NEEDS A TRANSPARENT PNG. The card behind it is a gradient, so
   anything keyed out of a flat background will show a halo on it - the same
   fault logo.jpg already has, which is written up in PLACEHOLDERS.
   -------------------------------------------------------------------------- */
function Poster({
  attachment,
}: {
  attachment: NonNullable<Turn["attachment"]>;
}) {
  return (
    <div className="relative flex min-h-[8.5rem] items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-ink via-[#0a2f7a] to-brand-dark p-4">
      <span
        aria-hidden
        className="absolute top-3.5 right-4 flex gap-1 text-white/45"
      >
        <span className="size-1 rounded-full bg-current" />
        <span className="size-1 rounded-full bg-current" />
        <span className="size-1 rounded-full bg-current" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[21px] leading-[1.12] font-extrabold text-balance text-white">
          {attachment.title}
        </p>
        <p className="mt-1.5 text-[13.5px] font-semibold text-white/70">
          {attachment.sub}
        </p>
      </div>

      {attachment.image.src && (
        <Image
          src={attachment.image.src}
          alt={attachment.image.alt}
          width={200}
          height={200}
          className="h-auto w-[7rem] shrink-0 md:w-[8rem]"
        />
      )}
    </div>
  );
}

function ImageGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <rect
        x="3.2"
        y="5"
        width="17.6"
        height="14"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="9"
        cy="10.2"
        r="1.7"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m4.4 17.4 4.3-4a1.6 1.6 0 0 1 2.2 0l3 2.9m0 0 1.6-1.5a1.6 1.6 0 0 1 2.2 0l1.9 1.8m-5.7-.3 2.4 2.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M13.6 3.2H7.4a2.2 2.2 0 0 0-2.2 2.2v13.2a2.2 2.2 0 0 0 2.2 2.2h9.2a2.2 2.2 0 0 0 2.2-2.2V8.4z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M13.4 3.4v5h5M8.6 13h6.8M8.6 16.6h4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[17px]" aria-hidden>
      <circle
        cx="12"
        cy="8.4"
        r="3.4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.2 19.6a6.8 6.8 0 0 1 13.6 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkGlyph({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12.5 2.8 14.3 8l5.2 1.8-5.2 1.8-1.8 5.2-1.8-5.2L5.5 9.8 10.7 8z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M18.6 15.4l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
