import type { FeatureSlug } from "@/lib/content/featureDetails";
import {
  ASSISTANT_SIZE,
  AssistantScreen,
  BookCrop,
  HandoffCrop,
  SetupCrop,
  TalkCrop,
} from "@/components/features/screens/assistant";
import {
  ChannelsCrop,
  FindCrop,
  INBOX_SIZE,
  InboxScreen,
  MediaCrop,
  TeamCrop,
} from "@/components/features/screens/inbox";

/* ==========================================================================
   THE PRODUCT DRAWINGS, BY FEATURE
   --------------------------------------------------------------------------
   Each feature's whole screen, the size it is drawn at, and one crop per
   capability group - keyed by the ids in featureDetails.ts, so a group
   and the part of the picture that shows it cannot be spelled two ways.

   EVERY SCREEN IS DRAWN AS COLUMNS, ONE PER GROUP, in the order the groups
   are read. It is the one rule a new screen has to follow. The story
   layout lights one group at a time and, below 1280px, shows each group
   as its own crop - and a group that is one column can be lit as one
   place and cropped as one piece. A group spread across the screen can be
   neither.

   Filled in feature by feature as the chapters are built.
   ========================================================================== */

export type FeatureScreen = {
  Screen: () => React.JSX.Element;
  size: { w: number; h: number };
  crops: Record<string, () => React.JSX.Element>;
};

export const featureScreens: Partial<Record<FeatureSlug, FeatureScreen>> = {
  "one-inbox": {
    Screen: InboxScreen,
    size: INBOX_SIZE,
    crops: {
      channels: ChannelsCrop,
      find: FindCrop,
      media: MediaCrop,
      team: TeamCrop,
    },
  },
  "ai-sales-assistant": {
    Screen: AssistantScreen,
    size: ASSISTANT_SIZE,
    crops: {
      setup: SetupCrop,
      talk: TalkCrop,
      book: BookCrop,
      handoff: HandoffCrop,
    },
  },
};
