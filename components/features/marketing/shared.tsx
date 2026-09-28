import { Limits as KitLimits } from "@/components/features/kit/compact";
import { features } from "@/lib/content/features";
import {
  featureDetails,
  type FeatureDetail,
  type FeatureSlug,
} from "@/lib/content/featureDetails";

export { LAND, Names, useTick } from "@/components/features/kit/compact";

/* ==========================================================================
   03 MARKETING - WHAT THE CHAPTER SHARES
   --------------------------------------------------------------------------
   The chapter's three features in order, with their words from
   featureDetails.ts, the leads its pictures show arriving, and the parts
   every compact chapter says its features with (kit/compact.tsx).

   CHOSEN FROM THREE, TWICE OVER. The live board (Board.tsx) is the
   chapter. A hand of cards was chosen first, and given the board's live
   pictures; on the page the moving part was a quarter of each card and
   read as text, so the board came back, with each feature's name on its
   own panel and its words straight under it. The cards and the third
   version, the chapter in sentences, were deleted once it settled.
   ========================================================================== */

export const MARKETING = features.groups[2];

export type MarketingPart = {
  slug: FeatureSlug;
  item: (typeof MARKETING)["items"][number];
  detail: FeatureDetail;
  n: string;
};

export const MARKETING_PARTS: MarketingPart[] = MARKETING.items.map((item, i) => ({
  slug: item.slug as FeatureSlug,
  item,
  detail: featureDetails[item.slug as FeatureSlug]!,
  n: `${MARKETING.n}.${i + 1}`,
}));

/* LEADS ARRIVING, for the pictures that show Lead Capture at work. The
   site's cast, each arriving the way their own enquiry did elsewhere on
   the page - Farah, who submitted the form twice, is the duplicate that
   gets matched - and between them all eight of §8's ways in and all of
   its handling. */
export type Source = "ads" | "wa" | "ig" | "web" | "form" | "cal";

export const ARRIVALS: readonly {
  t: string;
  from: string;
  src: Source;
  who: string;
  via: string;
  status: string;
}[] = [
  { t: "09:12", from: "Meta lead ad", src: "ads", who: "Lakshmi A.", via: "Dental check-up", status: "Contact created" },
  { t: "09:26", from: "Click-to-WhatsApp ad", src: "wa", who: "Anand R.", via: "Dental check-up · Ad 2", status: "Ad saved" },
  { t: "09:41", from: "Instagram comment", src: "ig", who: "Ajay T.", via: "Keyword “PRICE”", status: "Tagged" },
  { t: "09:58", from: "Website form", src: "form", who: "Farah Q.", via: "Your contact form", status: "Duplicate matched" },
  { t: "10:07", from: "Instant form", src: "ads", who: "Meera N.", via: "Coimbatore branch ad", status: "Deal opened" },
  { t: "10:19", from: "Booking page", src: "cal", who: "Meena S.", via: "Check-up booking", status: "Contact created" },
  { t: "10:33", from: "Hosted form", src: "form", who: "Arun V.", via: "Callback form", status: "Tagged" },
  { t: "10:46", from: "Website chat", src: "web", who: "Naveen L.", via: "Your website", status: "Same record" },
  { t: "10:52", from: "Meta lead ad", src: "ads", who: "Suresh V.", via: "Missed on Sunday", status: "Pulled in later" },
];

/* GOOD TO KNOW for a Marketing feature. */
export function Limits({
  part,
  dark = false,
  className = "",
}: {
  part: MarketingPart;
  dark?: boolean;
  className?: string;
}) {
  return (
    <KitLimits
      name={part.item.name}
      limits={part.detail.limits}
      dark={dark}
      className={className}
    />
  );
}
