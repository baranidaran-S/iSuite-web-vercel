import type { Metadata } from "next";
import { FeaturesBody, type Compact } from "@/components/features/FeaturesBody";
import { Board } from "@/components/features/marketing/Board";
import { Desk } from "@/components/features/operations/Desk";
import { Showcase } from "@/components/features/sales/Showcase";

/* ==========================================================================
   /features
   --------------------------------------------------------------------------
    1  Hero                       [BUILT] the product taken apart - four
                                          sheets, one per group, and a
                                          callout linking every feature
    2  01 Conversations           [BUILT] One Inbox, AI Sales Assistant -
                                          a story section each
    3  02 Sales                   [BUILT] Contacts, Pipeline, Follow-ups,
                                          Appointments - one showcase
    4  03 Marketing               [BUILT] Meta Ads, Broadcasts, Lead
                                          Capture - one live board
    5  04 Operations              [BUILT] Automations, Reports, Team,
                                          Chat Commerce - one control desk
    6  Final CTA                  [BUILT] the home page's own closer

   BUILT A SECTION AT A TIME, and each is looked at in the browser before
   the next one starts. A chapter appears here by itself once every one of
   its features has its words in featureDetails.ts and its picture - its
   screen in components/features/screens for a chapter told feature by
   feature, or the chapter's own compact section (COMPACT, below). Until
   then it is simply not rendered, and the hero's links to its features go
   nowhere.

   TWO WAYS TO LAY OUT A CHAPTER, and the page uses both on purpose. The
   story gives each group of a feature half a screen of scrolling: about
   three screens a feature, right for the inbox and the assistant, the two
   the rest of the product is built around - and about 46 screens if all
   thirteen had it. From Chapter 02 a chapter's features share one compact
   section instead, about a screen for the whole chapter, with every
   capability and every limit still on it.

   CHAPTER 02 WAS BUILT FOUR TIMES OVER. Its features in the story layout,
   then in three one-screen layouts per feature, were both too long and too
   like Chapter 01; of a live desk, a showcase and a pipeline board, the
   showcase was chosen.

   CHAPTER 03 WAS CHOSEN FROM THREE, TWICE: a live board of leads arriving
   and broadcasts leaving, a hand of cards, and the chapter in sentences.
   The cards were chosen first, as the shortest, with the board's live
   pictures put into them - and on the page the moving part was a quarter
   of each card and read as text. The board came back, with each feature's
   name on its own panel and its words straight under it.

   CHAPTER 04 WAS CHOSEN FROM THREE: a line map, a line for each feature
   and a stop for each capability; a periodic table of them; and a control
   desk, a module for each feature and a control for each capability. The
   desk was chosen, and the other two deleted.

   THE HERO WAS BUILT FOUR TIMES. The first was an index of the thirteen
   and read as a second copy of the home page's section 5; three
   alternatives were then compared side by side and the exploded stack was
   chosen. ExplodedStack.tsx records what the other two were.

   THE FEATURE LAYOUT WAS BUILT THREE TIMES, with Chapter 01 in each: the
   story, a board of tiles and an annotated screen. The story was chosen
   and the other two were deleted - the annotated screen after it had
   been kept for a while as the alternative.

   THE CLOSER IS THE HOME PAGE'S, IMPORTED RATHER THAN REBUILT. Its heading
   asks the question this page answers in detail, and its button reads the
   same label from the same string - §2's one primary CTA holds across
   both pages because there is only one copy of it.
   ========================================================================== */

/* The layout's title template turns this into "Features | iSuite AI". The
   description names the features people search for by name rather than
   describing the page, because the name of a feature is what somebody
   types. */
export const metadata: Metadata = {
  title: "Features",
  description:
    "All thirteen iSuite AI features in detail: one inbox for WhatsApp, Instagram, Facebook and website chat, the AI sales assistant, sales pipeline, appointments, follow-ups, Meta ads, automations and reports.",
};

/* The chapters laid out as one compact section, each with its own. Every
   other chapter is told feature by feature, in the story layout - and a
   chapter with neither is not on the page yet. The page itself is
   components/features/FeaturesBody. */
const COMPACT: Compact = {
  sales: Showcase,
  marketing: Board,
  operations: Desk,
};

export default function FeaturesPage() {
  return <FeaturesBody compact={COMPACT} />;
}
