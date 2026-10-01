"use client";

import { useReducedMotion } from "motion/react";
import { CheckIcon } from "@/components/ui/icons";
import { featureMarks } from "@/components/ui/featureIcons";
import { InfoGlyph } from "@/components/features/kit/glyphs";
import { features } from "@/lib/content/features";
import {
  featureDetails,
  type Capability,
  type CapabilityGroup,
  type FeatureSlug,
} from "@/lib/content/featureDetails";
import { featureBar } from "@/lib/content/featuresPage";

/* ==========================================================================
   /features - THE PARTS EVERY FEATURE SECTION IS BUILT FROM
   --------------------------------------------------------------------------
   The shell a feature sits in, its name pill, its capability lists and its
   "Good to know" note - one set for all fifteen, so they read as one page
   rather than as fifteen designs.

   TWO GROUNDS, THE HOME PAGE'S TWO. A feature is either on white or on
   night, and a chapter alternates them - the rhythm the home page already
   uses, where night marks the sections that carry the argument. Colour
   inside a section is the chapter's: its accent for anything that only
   has to tint, its deep value for anything that has to read on white.
   ========================================================================== */

export type Tone = "light" | "dark";

export function featureOf(slug: FeatureSlug) {
  const group = features.groups.find((g) =>
    g.items.some((i) => i.slug === slug),
  )!;
  const item = group.items.find((i) => i.slug === slug)!;
  return {
    group,
    item,
    detail: featureDetails[slug]!,
  };
}

/* ---- MOTION ------------------------------------------------------------------
   The page's one entrance, and the same props on the server and in the
   browser - reduced motion changes the TIMING only. Branching the props
   themselves on the setting is the hydration bug FinalCta.tsx records: the
   server cannot know it, renders the hidden state, and the browser's
   first render disagrees. */
export function useEnter() {
  const still = useReducedMotion() === true;
  return (i = 0, amount = 0.2) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: still
      ? { duration: 0 }
      : { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  });
}

/* ---- THE SHELL ---------------------------------------------------------------
   A rounded card on the page ground, like every section on the site. The
   id is the feature's slug, so /features#one-inbox lands here, and the
   scroll margin clears the header and the feature bar together.

   NO overflow-hidden ON THE CARD. A layout that pins something inside it
   needs `position: sticky`, which dies inside any ancestor that clips. The
   glow is clipped by a sibling layer instead - the same arrangement as the
   home page's section 3. */
export function FeatureShell({
  slug,
  tone,
  className = "",
  children,
}: {
  slug: FeatureSlug;
  tone: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={slug}
      data-feature={slug}
      className="scroll-mt-[7.25rem] p-2 md:scroll-mt-[8.5rem] md:p-3"
    >
      <div
        className={`relative rounded-[1.5rem] px-4 pt-20 pb-14 md:rounded-[2rem] md:px-10 md:pt-24 md:pb-20 ${
          dark ? "bg-night text-white" : "bg-surface text-ink"
        } ${className}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        >
          {dark ? (
            <>
              <div className="absolute top-[18%] left-1/2 h-[46rem] w-[74rem] -translate-x-1/2 rounded-full bg-brand/22 blur-[150px]" />
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-black/35" />
            </>
          ) : (
            <>
              <div className="absolute top-[22%] left-1/2 h-[52rem] w-[78rem] -translate-x-1/2 rounded-full bg-brand/7 blur-[140px]" />
              <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-b from-transparent to-bg/70" />
            </>
          )}
        </div>
        <div className="relative mx-auto max-w-[84rem]">{children}</div>
      </div>
    </section>
  );
}

/* ---- THE NAME ----------------------------------------------------------------
   The home page's eyebrow pill with the feature's own mark where the dot
   was. The name is the pill and the sentence is the heading, the way every
   section on the site pairs them. */
export function FeaturePill({
  slug,
  tone,
}: {
  slug: FeatureSlug;
  tone: Tone;
}) {
  const { group, item } = featureOf(slug);
  const Mark = featureMarks[item.mark];
  const dark = tone === "dark";
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-[13.5px] font-bold tracking-[0.02em] ${
        dark
          ? "border-white/15 bg-white/8 text-white/85"
          : "border-line bg-surface text-ink/80"
      }`}
    >
      <span
        className="grid size-7 place-items-center rounded-full"
        style={
          dark
            ? { backgroundColor: group.accent, color: "#fff" }
            : { backgroundColor: `${group.accent}1c`, color: group.deep }
        }
      >
        <Mark className="size-4" />
      </span>
      {item.name}
    </p>
  );
}

export function FeatureTitle({
  slug,
  tone,
  className = "",
  size = "4em",
}: {
  slug: FeatureSlug;
  tone: Tone;
  className?: string;
  size?: string;
}) {
  const { detail } = featureOf(slug);
  /* AN h3 SET AT h2 SIZE. Every feature belongs to a chapter, and the
     chapter's name is the h2 - Conversations, Sales - so a screen reader's
     list of headings reads chapter, then its features, then their groups
     (h4), rather than fifteen features level with the four chapters they
     sit in. The size is the site's section heading all the same. */
  return (
    <h3
      className={`h2-section font-extrabold ${tone === "dark" ? "text-white" : ""} ${className}`}
      style={{ "--h2": size } as React.CSSProperties}
    >
      {detail.title}
    </h3>
  );
}

export function FeatureLead({
  slug,
  tone,
  className = "",
}: {
  slug: FeatureSlug;
  tone: Tone;
  className?: string;
}) {
  const { detail } = featureOf(slug);
  return (
    <p
      className={`lead-section ${tone === "dark" ? "text-night-muted" : "text-muted"} ${className}`}
    >
      {detail.lead}
    </p>
  );
}

/* ---- THE CAPABILITIES ------------------------------------------------------
   A tick, the name, and the sentence under it. Pointing at one lights the
   element it describes in the picture beside it - `onHot` is how a layout
   hears about it. A tap does the same on a touch screen.

   `numbered` puts each one's place in the list where the tick was - the
   number its pin carries on the picture beside it. */
export function CapabilityItems({
  group,
  tone,
  accent,
  deep,
  onHot,
  hot,
  numbered = false,
  className = "",
}: {
  group: CapabilityGroup;
  tone: Tone;
  accent: string;
  deep: string;
  onHot?: (id: string | null) => void;
  hot?: string | null;
  numbered?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  const tags = group.items.every((c) => !c.line);

  if (tags) {
    return (
      <ul className={`flex flex-wrap gap-2 ${className}`}>
        {group.items.map((c) => (
          <li
            key={c.id}
            onMouseEnter={() => onHot?.(c.id)}
            onMouseLeave={() => onHot?.(null)}
            onClick={() => onHot?.(c.id)}
            className={`inline-flex cursor-default items-center gap-2 rounded-full border px-3 py-1.5 text-[14px] font-semibold transition-colors ${
              dark
                ? "border-white/12 bg-white/[0.06] text-white/90"
                : "border-line bg-surface text-ink/85"
            }`}
            style={
              hot === c.id
                ? { borderColor: accent, backgroundColor: `${accent}22` }
                : undefined
            }
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: dark ? "#fff" : accent }}
            />
            {c.name}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex flex-col gap-4 ${className}`}>
      {group.items.map((c, i) => (
        <CapabilityRow
          key={c.id}
          cap={c}
          n={numbered ? i + 1 : undefined}
          dark={dark}
          accent={accent}
          deep={deep}
          on={hot === c.id}
          onHot={onHot}
        />
      ))}
    </ul>
  );
}

function CapabilityRow({
  cap,
  n,
  dark,
  accent,
  deep,
  on,
  onHot,
}: {
  cap: Capability;
  n?: number;
  dark: boolean;
  accent: string;
  deep: string;
  on: boolean;
  onHot?: (id: string | null) => void;
}) {
  return (
    <li
      onMouseEnter={() => onHot?.(cap.id)}
      onMouseLeave={() => onHot?.(null)}
      onClick={() => onHot?.(cap.id)}
      className="flex cursor-default gap-3"
    >
      <span
        className={`mt-[3px] grid shrink-0 place-items-center rounded-full transition-colors ${
          n ? "size-[22px] text-[11.5px] leading-none font-extrabold" : "size-5"
        }`}
        style={
          on
            ? { backgroundColor: dark ? "#fff" : deep, color: dark ? deep : "#fff" }
            : dark
              ? { backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }
              : { backgroundColor: `${accent}1f`, color: deep }
        }
      >
        {n ?? <CheckIcon className="size-3" />}
      </span>
      <span className="min-w-0">
        <span
          className="block text-[15.5px] leading-snug font-bold md:text-[16px]"
        >
          {cap.name}
        </span>
        <span
          className={`mt-0.5 block text-[14.5px] leading-relaxed md:text-[15px] ${
            dark ? "text-night-muted" : "text-muted"
          }`}
        >
          {cap.line}
        </span>
      </span>
    </li>
  );
}

/* ---- GOOD TO KNOW ------------------------------------------------------------
   The feature's limits, stated where the feature is. Not a warning -
   nothing here has gone wrong - so no amber and no alert icon: the
   neutral ground of the page, a quiet label, and the facts. */
export function GoodToKnow({
  slug,
  tone,
  columns = 1,
  className = "",
}: {
  slug: FeatureSlug;
  tone: Tone;
  columns?: 1 | 2;
  className?: string;
}) {
  const { detail } = featureOf(slug);
  const dark = tone === "dark";
  const grid = columns === 2 ? "md:grid-cols-2" : "";
  /* Nothing at all for a feature with no limits - an empty box labelled
     "Good to know" would promise something and say nothing. */
  if (detail.limits.length === 0) return null;
  return (
    <aside
      aria-label={`${featureOf(slug).item.name}: ${featureBar.goodToKnow.toLowerCase()}`}
      className={`rounded-2xl border p-5 md:p-6 ${
        dark ? "border-white/10 bg-white/[0.04]" : "border-line bg-bg/60"
      } ${className}`}
    >
      <p
        className={`flex items-center gap-2 text-[12.5px] font-extrabold tracking-[0.14em] uppercase ${
          dark ? "text-white/70" : "text-ink/60"
        }`}
      >
        <InfoGlyph className="size-4" />
        {featureBar.goodToKnow}
      </p>
      <ul className={`mt-4 grid gap-x-8 gap-y-3 ${grid}`}>
        {detail.limits.map((l) => (
          <li
            key={l}
            className={`flex gap-3 text-[14.5px] leading-relaxed ${
              dark ? "text-night-muted" : "text-ink/70"
            }`}
          >
            <span
              aria-hidden
              className={`mt-[0.8em] h-px w-3 shrink-0 ${dark ? "bg-white/35" : "bg-ink/30"}`}
            />
            {l}
          </li>
        ))}
      </ul>
    </aside>
  );
}
