import { Limits as KitLimits } from "@/components/features/kit/compact";
import { features } from "@/lib/content/features";
import {
  featureDetails,
  type FeatureDetail,
  type FeatureSlug,
} from "@/lib/content/featureDetails";

export { LAND, useTick } from "@/components/features/kit/compact";

/* ==========================================================================
   04 OPERATIONS - WHAT THE CHAPTER SHARES
   --------------------------------------------------------------------------
   The chapter's four features in order, with their words from
   featureDetails.ts, the colour each is drawn in, and the parts every
   compact chapter says its features with (kit/compact.tsx).

   CHOSEN FROM THREE, each putting the capabilities themselves into the
   picture - Chapter 03 taught that a small moving picture in a card of
   text reads as text: a line map, a line per feature and a stop per
   capability; a periodic table, an element per capability; and the
   control desk (Desk.tsx), a control per capability. The desk was chosen
   and the other two deleted.
   ========================================================================== */

export const OPERATIONS = features.groups[3];

export type OperationsPart = {
  slug: FeatureSlug;
  item: (typeof OPERATIONS)["items"][number];
  detail: FeatureDetail;
  n: string;
};

export const OPERATIONS_PARTS: OperationsPart[] = OPERATIONS.items.map((item, i) => ({
  slug: item.slug as FeatureSlug,
  item,
  detail: featureDetails[item.slug as FeatureSlug]!,
  n: `${OPERATIONS.n}.${i + 1}`,
}));

/* A feature's own colour on the chapter's pictures: the chapter's cyan
   for Automations, the green and the blue either side of it for Reports
   and Team, and amber for Chat Commerce, where money changes hands - four
   that can be told apart at a glance. Each pair is the light the picture
   uses and a deep value that holds type on white. */
export const TINTS: Record<string, { light: string; deep: string }> = {
  automations: { light: "#00c8f8", deep: "#0b6f80" },
  reports: { light: "#18c29c", deep: "#0f6b57" },
  "team-permissions": { light: "#4f8cff", deep: "#2a4fb8" },
  "chat-commerce": { light: "#f5a524", deep: "#8a5a06" },
};

/* GOOD TO KNOW for an Operations feature - nothing, for Team and
   Permissions, which the requirements give no limit. */
export function Limits({
  part,
  dark = false,
  className = "",
}: {
  part: OperationsPart;
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
