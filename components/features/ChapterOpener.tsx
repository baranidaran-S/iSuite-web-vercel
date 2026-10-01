import { ChapterBody } from "@/components/features/chapter/ChapterBody";
import { features } from "@/lib/content/features";
import { chapters } from "@/lib/content/featuresPage";

/* ==========================================================================
   /features - A CHAPTER OPENS
   --------------------------------------------------------------------------
   One per group - Conversations, Sales, Marketing, Automation & Insights -
   before the features in it. It says which of the four the reader is in,
   what that group is for, and which features follow, and it shows how
   that part of the system moves.

   A CARD IN THE CHAPTER'S OWN COLOUR. This was first drawn with no card at
   all - the heading straight on the page ground between two feature cards
   - on the theory that open ground would read as the gap between chapters.
   It read as a gap: a large grey band with some type in it, easy to scroll
   past and hard to tell was the start of anything. A chapter needs to look
   like a threshold.

   So each chapter opens on its group's colour, the one the home page's
   section 5 gives it: the deep value darkened into the night the site
   already uses, and the bright value as light falling across it. Four
   chapters, four colours - Conversations royal blue, Sales blue, Marketing
   sky, Operations cyan - which is the order the logo's gradient runs, and
   the same numeral and colour the feature bar shows once the reader is
   inside the chapter.

   THE PICTURE IS THE CHAPTER'S FLOW - what comes into this part of the
   system and where it goes - see chapter/FlowScene.tsx. Each feature shows
   its real screen; the chapter shows the movement between them, so no
   picture on the page is drawn twice.

   The ground - colour, light and a faint grid - is drawn here, on the
   server; the flow and the feature cards, which share a hover, are
   ChapterBody's.
   ========================================================================== */

type Group = (typeof features)["groups"][number];

/* The ground: the deep colour taken most of the way to night, lit from
   the top right where the scene stands and faintly from the bottom left.
   Every stop is mixed from the group's two values, so the four chapters
   are four colours of one ground. */
function ground(group: Group) {
  const night = "#040b1f";
  return [
    `radial-gradient(60% 75% at 82% 22%, color-mix(in oklab, ${group.accent} 62%, transparent) 0%, transparent 70%)`,
    `radial-gradient(55% 70% at 4% 100%, color-mix(in oklab, ${group.accent} 32%, transparent) 0%, transparent 70%)`,
    `linear-gradient(150deg, color-mix(in oklab, ${group.deep} 38%, ${night}) 0%, color-mix(in oklab, ${group.deep} 72%, ${night}) 55%, ${group.deep} 100%)`,
  ].join(", ");
}

export function ChapterOpener({ group }: { group: Group }) {
  const lead = chapters[group.slug]?.lead;
  const count = String(features.groups.length).padStart(2, "0");

  return (
    <section
      id={group.slug}
      data-chapter={group.slug}
      aria-labelledby={`${group.slug}-title`}
      className="scroll-mt-[6.75rem] p-2 md:scroll-mt-[8rem] md:p-3"
    >
      <div
        className="relative overflow-hidden rounded-[1.5rem] text-white md:rounded-[2rem]"
        style={{ background: ground(group) }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* A faint grid, strongest behind the scene and gone by the
              edges - the drawing-board the product is laid out on. */}
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_62%_70%_at_70%_42%,black,transparent)] bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:56px_56px]" />
          {/* NO GIANT NUMERAL. A faint "01" twenty rems tall sat behind the
              feature cards, and the glass cards showed it through them in
              pieces - half a zero beside one card, the foot of the one
              under another. The number is in the pill and the feature
              bar; it did not need a third place. */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        <ChapterBody group={group}>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pr-4 pl-1.5 text-[12.5px] font-bold tracking-[0.12em] text-white/85 uppercase backdrop-blur-md">
            <span
              className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-[12px] tracking-normal"
              style={{ color: group.deep }}
            >
              {group.n}
            </span>
            Chapter {group.n} of {count}
          </p>

          <h2
            id={`${group.slug}-title`}
            className="h2-section mt-6 font-extrabold text-white"
            /* 4.3, and measured against the longest name. At 4.9
               "Conversations" came to 537px in a column 483px wide at
               1280 and ran into the flow beside it; at 4.3 it is 471. */
            style={{ "--h2": "4.3em" } as React.CSSProperties}
          >
            {group.name}
          </h2>

          <p
            className="mt-3 text-[20px] leading-snug font-bold md:text-[23px]"
            style={{
              color: `color-mix(in oklab, ${group.accent} 30%, white)`,
            }}
          >
            {group.tagline.replace("\n", " ")}
          </p>

          {lead && (
            <p className="lead-section mt-5 max-w-[46ch] text-white/75">
              {lead}
            </p>
          )}
        </ChapterBody>
      </div>
    </section>
  );
}
