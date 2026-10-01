"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { featureMarks } from "@/components/ui/featureIcons";
import { Limits, Names } from "@/components/features/kit/compact";
import type { CapabilityGroup, FeatureSlug } from "@/lib/content/featureDetails";
import type { Shot } from "@/lib/content/shots";

/* ==========================================================================
   A COMPACT CHAPTER'S FEATURES - THE PARTS BOTH ARE DRAWN WITH
   --------------------------------------------------------------------------
   Marketing's deck (marketing/Deck.tsx) and Automation & Insights' recipe
   (operations/Recipe.tsx) read their chapters the same way - every
   feature's words from featureDetails.ts, its real screen from shots.ts -
   and head and word each feature with the pieces below, so the two
   chapters say their features alike.

   Each chapter's own list of parts is built in its shared.tsx.
   ========================================================================== */

export type Part = {
  slug: FeatureSlug;
  n: string;
  name: string;
  mark: keyof typeof featureMarks;
  title: string;
  groups: readonly CapabilityGroup[];
  limits: readonly string[];
  shot?: Shot;
  /* A feature still being confirmed: the line that says so, and no words. */
  pending?: string;
};

export type Chapter = {
  slug: string;
  name: string;
  accent: string;
  deep: string;
  /* The section's name, for a screen reader. */
  label: string;
  parts: readonly Part[];
};

/* Motion on, once the thing is on screen and while nobody has asked for
   less of it. */
export function useLive(el: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const still = useReducedMotion() === true;
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver((e) => setSeen(e[e.length - 1].isIntersecting), { threshold });
    io.observe(node);
    return () => io.disconnect();
  }, [el, threshold]);
  return { seen, still };
}

/* A feature's name: its mark, number and name. */
export function PartHead({
  part,
  chapter,
  dark = false,
  className = "",
}: {
  part: Part;
  chapter: Chapter;
  dark?: boolean;
  className?: string;
}) {
  const Mark = featureMarks[part.mark];
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className="grid size-10 shrink-0 place-items-center rounded-xl"
        style={dark ? { backgroundColor: "#fff", color: chapter.deep } : { backgroundColor: chapter.deep, color: "#fff" }}
      >
        <Mark className="size-5" />
      </span>
      <span className="min-w-0">
        <span className={`block text-[11.5px] font-extrabold tracking-[0.1em] ${dark ? "text-white/60" : "text-ink/60"}`}>
          {part.n}
        </span>
        <h3 className="text-[19px] leading-tight font-extrabold tracking-[-0.01em] md:text-[20px]">{part.name}</h3>
      </span>
    </div>
  );
}

/* A feature in words: the sentence it stands for, every capability in its
   groups - a capability with a line of its own says it after its name -
   and every limit. */
export function PartWords({
  part,
  chapter,
  dark = false,
  columns = 1,
  className = "",
}: {
  part: Part;
  chapter: Chapter;
  dark?: boolean;
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[17px] leading-snug font-extrabold tracking-[-0.01em] md:text-[18px]">{part.title}</p>
      <ul className={`mt-3.5 grid gap-x-6 gap-y-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {part.groups.map((g) => (
          <li key={g.id} className={`text-[13.5px] leading-relaxed ${dark ? "text-night-muted" : "text-muted"}`}>
            <span className={`flex items-center gap-2 text-[14px] leading-snug font-extrabold ${dark ? "text-white" : "text-ink"}`}>
              <span aria-hidden className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: dark ? "#fff" : chapter.accent }} />
              {g.label}
            </span>
            <span className="mt-0.5 block pl-3.5">
              {g.items.some((c) => c.line) ? (
                g.items.map((c) => (
                  <span key={c.id} className="block">
                    <span className={`font-semibold ${dark ? "text-white/85" : "text-ink/80"}`}>{c.name}</span>
                    {c.line && <span>: {c.line}</span>}
                  </span>
                ))
              ) : (
                <Names names={g.items.map((c) => c.name)} />
              )}
            </span>
          </li>
        ))}
      </ul>
      <Limits
        name={part.name}
        limits={part.limits}
        dark={dark}
        className={`mt-4 border-t pt-3.5 ${dark ? "border-white/10" : "border-line"}`}
      />
    </div>
  );
}
