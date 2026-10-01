import type { Chapter, Part } from "@/components/features/kit/chapter";
import { features } from "@/lib/content/features";
import { featureDetails, type FeatureSlug } from "@/lib/content/featureDetails";
import { featureShots } from "@/lib/content/shots";

/* ==========================================================================
   04 AUTOMATION & INSIGHTS - WHAT THE CHAPTER SHARES
   --------------------------------------------------------------------------
   The chapter's features in order - each with its words from
   featureDetails.ts and its real screen from shots.ts - the colour each is
   drawn in, and the runs and questions its recipes play (Recipe.tsx).

   CHOSEN FROM THREE, TWICE. A line map, a periodic table and a control
   desk were built first, each putting the capabilities into the picture,
   and the desk was chosen. On 2026-09-30, with the app's real screens to
   show, the chapter was drawn three ways again - a recipe that runs, a
   sentence that rewrites itself, one working day - and the recipe was
   chosen.

   ON 2026-09-30 THE CHAPTER ALSO TOOK THE APP'S OWN FEATURES: Automation
   and the Analytics AI Agent. Reports, Team and Chat Commerce are not on
   the client's list.
   ========================================================================== */

export const OPERATIONS = features.groups[3];

const PARTS: Part[] = OPERATIONS.items.map((item, i) => {
  const slug = item.slug as FeatureSlug;
  const detail = featureDetails[slug]!;
  return {
    slug,
    n: `${OPERATIONS.n}.${i + 1}`,
    name: item.name,
    mark: item.mark as Part["mark"],
    title: detail.title,
    groups: detail.groups,
    limits: detail.limits,
    shot: featureShots[slug]?.[0],
  };
});

export const AUTOMATION_CHAPTER: Chapter = {
  slug: OPERATIONS.slug,
  name: OPERATIONS.name,
  accent: OPERATIONS.accent,
  deep: OPERATIONS.deep,
  label: "Automation and insights features",
  parts: PARTS,
};

/* A feature's own colour: the chapter's cyan for Automation, and green for
   the Analytics AI Agent - two that can be told apart at a glance. Each
   pair is the light the picture uses and a deep value that holds type on
   white. */
export const TINTS = {
  automation: { light: "#00c8f8", deep: "#0b6f80" },
  "analytics-ai-agent": { light: "#18c29c", deep: "#0f6b57" },
} as const;

/* ---- the programs Automation's recipe runs ---------------------------------

   Each a kind of trigger, the trigger itself, its actions in order, and
   who the run was for - every trigger and action the app's own, named by
   their ids in featureDetails.ts. Every message they send keeps WhatsApp's
   window: an event the customer did not just write in with - a won deal, a
   no-show, an accepted quotation - is answered with an approved template,
   and free buttons go only to someone who has just written in. One run
   fails, and says why, the way the app's run log does. */
export type Program = {
  when: string;
  on: string;
  then: readonly string[];
  who: string;
  error?: string;
};

export const PROGRAMS: readonly Program[] = [
  { when: "t-form", on: "Ad lead received", then: ["send-template", "wait", "create-deal"], who: "Lakshmi A." },
  { when: "t-conversation", on: "Keyword match", then: ["send-buttons", "ask-wait", "update-field"], who: "Ajay T." },
  { when: "t-contact", on: "Deal won", then: ["add-tag", "send-template", "send-email"], who: "Meera N." },
  { when: "t-booking", on: "Booking no-show", then: ["send-template", "move-deal"], who: "Meena S." },
  { when: "t-quote", on: "Quotation accepted", then: ["assign-conversation", "send-template"], who: "Arun V." },
  {
    when: "t-quote",
    on: "Invoice overdue",
    then: ["condition", "send-template", "webhook"],
    who: "Suresh V.",
    error: "Your server did not reply in time.",
  },
];

/* A capability's name by its id - the ids are unique within a feature. */
const NAME = new Map(
  (featureDetails.automation?.groups ?? []).flatMap((g) => g.items.map((c) => [c.id, c.name] as const)),
);
export const nameOf = (id: string) => NAME.get(id) ?? id;

/* ---- the questions the Analytics AI Agent's recipe answers ----------------

   Questions put to it, the tools each one reaches for, and the shape of the
   answer - the app suggests the deals and conversations ones itself. No
   figures in any answer: what comes back is described, never counted.

   THE ADS QUESTION COMES FIRST because it is the one the Studio screen
   beside it answers ("are there any running ads") - first, it is also
   what stands still when nothing plays. */
export const QUESTIONS: readonly { q: string; tools: readonly string[]; a: string }[] = [
  {
    q: "Are any ads running? How are they doing?",
    tools: ["ask-ads"],
    a: "The campaigns that are running, their ad sets and ads, and how each is doing.",
  },
  {
    q: "Which deals are closing this month?",
    tools: ["ask-deals"],
    a: "The deals in Proposal and Negotiation due to close this month, each with its owner and stage.",
  },
  {
    q: "Which conversations are still unread?",
    tools: ["ask-conversations"],
    a: "The conversations nobody has opened yet, newest first, with the channel each came in on.",
  },
  {
    q: "Which new contacts came from our forms this week?",
    tools: ["ask-contacts"],
    a: "The contacts a form created this week, and the form each came from.",
  },
];
