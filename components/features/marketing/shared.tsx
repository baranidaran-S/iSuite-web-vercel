import type { Chapter, Part } from "@/components/features/kit/chapter";
import { PENDING, features } from "@/lib/content/features";
import { featureDetails, type FeatureSlug } from "@/lib/content/featureDetails";
import { featureShots } from "@/lib/content/shots";

/* ==========================================================================
   03 MARKETING - WHAT THE CHAPTER SHARES
   --------------------------------------------------------------------------
   The chapter's features in order - each with its words from
   featureDetails.ts and its real screen from shots.ts - for its deck
   (Deck.tsx), and the moments each card's live strip shows (LiveStrip.tsx).

   CHOSEN FROM THREE, THREE TIMES OVER. A hand of cards was chosen first,
   then a live board of arrivals and departures took its place: the cards'
   moving part was a quarter of each card and read as text. On 2026-09-30,
   with the app's real screens to show, the chapter was drawn three ways
   again - a deck, a bento, screens that unfold - and the deck was chosen,
   its face now the real screen.

   ON 2026-09-30 THE CHAPTER ALSO TOOK THE APP'S OWN FEATURES: WhatsApp
   Marketing, Email Marketing, Forms, and the Marketing AI Agent - a card
   saying its details were on their way until the client confirmed it,
   on 2026-10-01, as the app's Studio building Meta ads.
   ========================================================================== */

export const MARKETING = features.groups[2];

/* The chapter's features, in order. A feature still being confirmed
   carries only the line that says so. */
const PARTS: Part[] = MARKETING.items.map((item, i) => {
  const slug = item.slug as FeatureSlug;
  const detail = featureDetails[slug];
  const head = {
    slug,
    n: `${MARKETING.n}.${i + 1}`,
    name: item.name,
    mark: item.mark as Part["mark"],
  };
  if (PENDING.has(slug) || !detail) {
    return { ...head, title: "", groups: [], limits: [], pending: item.line };
  }
  return {
    ...head,
    title: detail.title,
    groups: detail.groups,
    limits: detail.limits,
    shot: featureShots[slug]?.[0],
  };
});

export const MARKETING_CHAPTER: Chapter = {
  slug: MARKETING.slug,
  name: MARKETING.name,
  accent: MARKETING.accent,
  deep: MARKETING.deep,
  label: "Marketing features",
  parts: PARTS,
};

/* SUBMISSIONS ARRIVING, for Forms: web forms on a business's site, a
   form's shared link, and Meta lead forms from its ads - the three ways a
   form reaches the CRM - and what becomes of each, all of which the app
   does: a contact created, the answers saved to its fields, a tag, a deal
   opened on the form's pipeline. */
export type Source = "ads" | "form";

export const ARRIVALS: readonly {
  t: string;
  from: string;
  src: Source;
  who: string;
  status: string;
}[] = [
  { t: "09:12", from: "Meta lead form", src: "ads", who: "Lakshmi A.", status: "Deal opened" },
  { t: "09:41", from: "Website form", src: "form", who: "Ajay T.", status: "Contact created" },
  { t: "09:58", from: "Form link", src: "form", who: "Farah Q.", status: "Answers saved" },
  { t: "10:07", from: "Meta lead form", src: "ads", who: "Meera N.", status: "Tagged" },
  { t: "10:33", from: "Website form", src: "form", who: "Arun V.", status: "Deal opened" },
  { t: "10:52", from: "Meta lead form", src: "ads", who: "Suresh V.", status: "Contact created" },
];

/* WHATSAPP BROADCASTS on their way, each status moving on - the states the
   app's broadcast list tracks. Every one an approved template, to a group
   of contacts. */
export const DEPARTURES: readonly { name: string; to: string; kind: string; steps: readonly string[] }[] = [
  { name: "Weekend offer", to: "Group · Past customers", kind: "Marketing", steps: ["Sending", "Delivered", "Read"] },
  { name: "Booking reminder", to: "Group · Booked this week", kind: "Utility", steps: ["Delivered", "Read"] },
  { name: "New price list", to: "Group · New enquiries", kind: "Marketing", steps: ["Sending", "Delivered"] },
  { name: "Holiday timings", to: "Group · All customers", kind: "Utility", steps: ["Delivered", "Read"] },
];

/* CAMPAIGNS THE MARKETING AI AGENT IS BUILDING, as its Studio threads go:
   it asks its questions, builds on Meta, and leaves each one paused for
   you to start. Ads with a WhatsApp button or a lead form, the two kinds
   it made. */
export const CAMPAIGNS: readonly { name: string; ad: string; where: string }[] = [
  { name: "Weekend offer", ad: "WhatsApp ad", where: "Chennai" },
  { name: "Free first visit", ad: "Lead form ad", where: "Madurai" },
  { name: "New batch open", ad: "WhatsApp ad", where: "Coimbatore" },
  { name: "Festive sale", ad: "Lead form ad", where: "Tamil Nadu" },
];
export const CAMPAIGN_STEPS = ["Asking you", "Building", "Paused"] as const;

/* EMAIL CAMPAIGNS in the outbox: a draft, its list built, sent. */
export const OUTBOX: readonly { subject: string; to: string; steps: readonly string[] }[] = [
  { subject: "What's new this month", to: "List · All contacts", steps: ["Draft", "List built", "Sent"] },
  { subject: "Welcome aboard", to: "List · New contacts", steps: ["List built", "Sent"] },
  { subject: "We miss you", to: "List · Gone quiet", steps: ["Draft", "List built"] },
];
