"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import logoFull from "@/public/logo-full.png";
import { businessMarks } from "@/components/ui/businessIcons";
import { audience, type Enquiry } from "@/lib/content/audience";

/* ==========================================================================
   SECTION 6 - WHO IT'S FOR
   --------------------------------------------------------------------------
   Nine tiles in a 3x3, the iSuite AI mark dead centre, the eight business
   types around it. The reasoning for showing enquiries rather than industry
   labels is in lib/content/audience.ts, next to the copy it applies to.

   THE MARK IS AT THE CENTRE BECAUSE THAT IS WHAT THE PRODUCT IS. Eight
   kinds of business, eight different questions, four different apps, one
   system underneath. Most sites using a bento are arranging tiles
   attractively; here the arrangement is the argument, and the 3x3 is the
   only grid where eight things can surround one thing exactly.

   THE ARRAY ORDER IS THE GRID. Nine cells, the mark spliced in at index 4,
   which lands it at row 2 column 2 with no explicit placement. Moving a
   tile is moving an entry in audience.ts.

   THE BUSINESS NAME IS THE BIGGEST THING ON ITS TILE. It was 15.5px, under
   a channel icon, above a 21px quote - which put the quote first in the
   visual order and left a visitor scanning for the word "Showroom" to find
   it in the smallest type in the section. A tile in this grid is answering
   one question, "is this me", and the answer is a word. The quote is what
   confirms it a beat later, so it sits at the foot at 20px.

   THE CHANNEL MARKS CAME OFF, and so did the three-line strip that used to
   sit under the grid. audience.ts says why at length; the short version is
   that the four channels are taught three times before this section, and
   that nine tiles saying who this is for do not need a paragraph underneath
   confirming it.

   IT IS LIGHT, AND THE REFERENCE WAS DARK - for a reason that is not
   taste. The supplied logo is navy on transparent (public/logo-full.png
   measures #002040 at its darkest), so on a navy ground the mark at the
   centre of the composition disappears. The header hit this exact problem
   and solved it the same way, and its comment says so. There is a second
   reason: sections 2 and 5 are both night and bookend the three that
   explain the product. A dark section 6 sitting against section 5 would
   merge with it and lose the pair.

   So the weight comes from the TILES instead. Three of the eight are dark
   - top-left, top-right, bottom-left - which puts a triangle of heavy
   tiles around the centre and gives the grid the texture the reference got
   from its photographs. Those three are the photo tiles, and they read as
   deliberate dark tiles until photography arrives (see audience.ts).

   THE CENTRE TILE IS THE ONLY PURE WHITE ONE. Its eight neighbours are
   pale blue or navy, so white plus a brand bloom makes it the brightest
   object in the section without needing to be the biggest.

   EVERY TILE CARRIES AN OBJECT, NOT JUST TYPE. Nine rectangles of pure
   text is a spreadsheet with rounded corners, which is exactly how the
   first cut of this grid read. Two things fixed it and neither adds a word:

     1  THE QUOTE IS A MESSAGE. It sits in a bubble with a corner squared
        off and a time and a delivery tick in the corner - so a visitor
        reads it as something a customer sent, which is what it is, rather
        than as a pull quote somebody wrote.

     2  EACH BUSINESS HAS A WATERMARK. Its own mark at 96px and 6% ink,
        bled off the top-right corner, giving the tile a silhouette. It is
        never read as an icon and is not the channel marks returning - see
        components/ui/businessIcons.tsx.

   THE THIRD THING IS STILL MISSING and it is the photography. Three of the
   nine tiles are reserved for it and the grid is noticeably flatter without
   them.

   NOTHING IN HERE IS CLICKABLE and nothing pretends to be. No hover lifts,
   no chevrons, no cursor changes. It is something to read.

   MOTION IS ONE THING: the nine arrive one after another, 50ms apart.
   ========================================================================== */

export function WhoItsFor() {
  const reduced = useReducedMotion();
  const still = reduced === true;

  const enter = (i = 0) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: {
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  /* The mark is spliced into the middle of the eight rather than placed by
     grid-area, so the 3x3 needs no explicit coordinates and a 2-up phone
     layout still puts it halfway down instead of somewhere arbitrary. */
  const half = audience.enquiries.length / 2;
  const cells = [
    ...audience.enquiries.slice(0, half),
    "mark" as const,
    ...audience.enquiries.slice(half),
  ];

  return (
    <section id="who-its-for" className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-surface px-4 pt-24 pb-20 md:rounded-[2rem] md:px-10 md:pt-32 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-brand-tint to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-b from-transparent to-bg/70" />
        </div>

        {/* ---- THE HEADING ---- */}
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-ink/70">
            <span className="size-1.5 rounded-full bg-brand" />
            {audience.eyebrow}
          </p>

          <h2
            className="h2-section mx-auto mt-6 max-w-[20ch] font-extrabold"
            style={{ "--h2": "4em" } as React.CSSProperties}
          >
            {audience.heading}
          </h2>

          <p className="lead-section mx-auto mt-7 max-w-[62ch] text-muted">
            {audience.lead}
          </p>
        </div>

        {/* ---- THE NINE ---- */}
        <div className="relative mx-auto mt-14 grid max-w-6xl gap-3 sm:grid-cols-2 md:gap-4 lg:mt-16 lg:auto-rows-fr lg:grid-cols-3">
          {cells.map((cell, i) =>
            cell === "mark" ? (
              <motion.div
                key="mark"
                {...enter(i)}
                className="sm:col-span-2 lg:col-span-1"
              >
                <MarkTile />
              </motion.div>
            ) : (
              <motion.div key={cell.business} {...enter(i)}>
                <Tile enquiry={cell} />
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   THE CENTRE TILE
   --------------------------------------------------------------------------
   White, raised and blooming, against eight neighbours that are pale blue
   or navy. The bloom is inside the tile rather than behind the grid so it
   travels with the mark when the layout reflows to two columns or one.
   -------------------------------------------------------------------------- */
function MarkTile() {
  return (
    <div className="relative flex h-full min-h-[13rem] flex-col items-center justify-center gap-5 overflow-hidden rounded-[1.25rem] bg-surface p-6 text-center shadow-[0_28px_60px_-26px_rgba(10,91,245,0.55)] ring-1 ring-brand/15 md:min-h-[14rem]">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 size-56 -translate-x-1/2 rounded-full bg-brand/12 blur-[52px]"
      />

      <Image
        src={logoFull}
        alt="iSuite AI"
        className="relative h-auto w-[164px] md:w-[184px]"
        sizes="184px"
      />

      <p className="relative max-w-[24ch] text-[16px] leading-snug font-bold text-ink/75 md:text-[17px]">
        {audience.centreLine}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   ONE BUSINESS
   --------------------------------------------------------------------------
   The name, then what kind of enquiry it is, then what the customer
   actually said. The quote is bottom-anchored with mt-auto so that quotes
   of four words and quotes of eight sit on the same line across a row -
   which is the difference between a grid that looks set and a grid that
   looks poured in.
   -------------------------------------------------------------------------- */
function Tile({ enquiry }: { enquiry: Enquiry }) {
  const dark = Boolean(enquiry.photo);
  const Mark = businessMarks[enquiry.mark];

  return (
    <figure
      className={`relative flex h-full min-h-[14rem] flex-col overflow-hidden rounded-[1.25rem] p-5 md:min-h-[15rem] md:p-6 ${
        dark
          ? "bg-ink ring-1 ring-black/10"
          : "bg-brand-tint ring-1 ring-brand/10"
      }`}
    >
      {/* THE PHOTO LAYER, WHICH MAY BE EMPTY. Without an image the tile is
          its navy ground and a bloom; with one, the image sits under the
          same scrim and the type above it does not move. The scrim is not
          optional - it is what guarantees white text stays legible over a
          photograph nobody has seen yet. */}
      {dark ? (
        <>
          {enquiry.photo?.src && (
            <Image
              src={enquiry.photo.src}
              alt={enquiry.photo.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            />
          )}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/45"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-brand/25 blur-[60px]"
          />
        </>
      ) : (
        /* The dark tiles have a bloom and the light ones were flat beside
           them, which is most of why they looked like cells rather than
           objects. A sheen from the top-left costs nothing and gives the
           fill a direction. */
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-brand/10"
        />
      )}

      {/* THE WATERMARK. Bled off the corner on purpose - a mark fully
          inside the tile is an icon sitting in a corner, and a mark that
          runs off the edge is texture. */}
      <Mark
        className={`pointer-events-none absolute -top-3 -right-4 size-24 md:size-28 ${
          dark ? "text-white opacity-[0.13]" : "text-ink opacity-[0.07]"
        }`}
      />

      {/* The padding on the right is what keeps a two-word business name
          out of the watermark. */}
      <figcaption className="relative pr-14 md:pr-16">
        <h3
          className={`text-[26px] leading-[1.05] font-extrabold md:text-[28px] lg:text-[30px] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {enquiry.business}
        </h3>
        <p
          className={`mt-2 text-[15px] leading-tight font-semibold ${
            dark ? "text-white/65" : "text-muted"
          }`}
        >
          {enquiry.kind}
        </p>
      </figcaption>

      {/* ---- THE MESSAGE ----
          One corner squared off rather than a drawn tail: it reads as a
          bubble at a glance and survives being resized, which a tail
          pinned to an edge does not. mt-auto keeps every bubble in the row
          sitting on the same line however long its quote runs. */}
      <div
        className={`relative mt-auto rounded-2xl rounded-bl-md px-4 py-3.5 ${
          dark
            ? "bg-white/12 ring-1 ring-white/10"
            : "bg-surface shadow-[0_8px_22px_-12px_rgba(4,28,61,0.45)]"
        }`}
      >
        <blockquote
          className={`text-[18px] leading-snug font-bold text-balance md:text-[19px] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {enquiry.quote}
        </blockquote>

        <p
          className={`mt-2 flex items-center justify-end gap-1.5 text-[12.5px] leading-none font-semibold ${
            dark ? "text-white/55" : "text-muted/80"
          }`}
        >
          {enquiry.time}
          <TickGlyph />
        </p>
      </div>
    </figure>
  );
}

/* ONE TICK, NOT TWO. Two ticks mean the message has been read, and the
   whole argument of this page up to here is that these are the ones nobody
   got to. Delivered is the honest state and it is also the sadder one. */
function TickGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden>
      <path
        d="m4 12.6 5.2 5.2L20 6.6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
