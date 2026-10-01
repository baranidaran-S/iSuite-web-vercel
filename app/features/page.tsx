import type { Metadata } from "next";
import { FeaturesBody, type Compact } from "@/components/features/FeaturesBody";
import { MarketingDeck } from "@/components/features/marketing/Deck";
import { AutomationRecipe } from "@/components/features/operations/Recipe";
import { Showcase } from "@/components/features/sales/Showcase";

/* ==========================================================================
   /features
   --------------------------------------------------------------------------
    1  Hero                       [BUILT] the words, and a video still being
                                          made - switched on in heroVideo,
                                          lib/content/featuresPage.ts
    2  01 Conversations           [BUILT] Unified Inbox, Website AI Chat
                                          Widget, Sales AI Agent - a story
                                          section each, each group's parts
                                          of the real app up close
    3  02 Sales                   [BUILT] Leads, Contacts, Pipeline,
                                          Follow-ups, Bookings, Quotation &
                                          Invoice - one showcase
    4  03 Marketing               [BUILT] WhatsApp Marketing, Email
                                          Marketing, Forms - a deck of cards,
                                          each face the real screen; the
                                          Marketing AI Agent a marked gap
                                          until it is confirmed
    5  04 Automation & Insights   [BUILT] Automation, Analytics AI Agent -
                                          each a recipe that runs beside
                                          its real screen
    6  Final CTA                  [BUILT] the home page's own closer

   THE FEATURES ARE THE APP'S OWN FIFTEEN (2026-09-30), their words read
   off the real product and their pictures its screenshots - see
   lib/content/features.ts, featureDetails.ts and shots.ts.

   BUILT A SECTION AT A TIME, and each is looked at in the browser before
   the next one starts. A chapter appears here by itself once every one of
   its features has its words in featureDetails.ts and its picture - its
   parts of the app up close (lib/content/closeups.ts) for a chapter told
   feature by feature, or the chapter's own compact section (COMPACT,
   below). Until
   then it is simply not rendered, and the feature bar names its features
   without linking them.

   TWO WAYS TO LAY OUT A CHAPTER, and the page uses both on purpose. The
   story gives each group of a feature half a screen of scrolling: about
   three screens a feature, right for Chapter 01's three, the ones the
   rest of the product is built around - and about 45 screens if all
   fifteen had it. From Chapter 02 a chapter's features share one compact
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
   name on its own panel and its words straight under it. On 2026-09-30,
   with the app's real screens to show, the chapter was drawn three ways
   again - a deck, a bento, screens that unfold - and the deck was chosen,
   its face now the real screen (components/features/marketing/Deck.tsx).

   CHAPTER 04 WAS CHOSEN FROM THREE, TWICE: a line map, a line for each
   feature and a stop for each capability; a periodic table of them; and a
   control desk, a module for each feature and a control for each
   capability. The desk was chosen. On 2026-09-30, with the app's real
   screens to show, it was drawn three ways again - a recipe that runs, a
   sentence that rewrites itself, one working day - and the recipe was
   chosen (components/features/operations/Recipe.tsx).

   THE HERO WAS BUILT FOUR TIMES. The first was an index of the thirteen
   and read as a second copy of the home page's section 5; three
   alternatives were then compared side by side and the exploded stack was
   chosen. On 2026-09-30 the stack was taken out to make way for a video,
   and the hero is its words alone until the video is ready. The stack is
   in the git history (be265ee, ExplodedStack.tsx and
   components/features/minis), which also records what the other two were.

   THE FEATURE LAYOUT WAS BUILT THREE TIMES, with Chapter 01 in each: the
   story, a board of tiles and an annotated screen. The story was chosen
   and the other two were deleted - the annotated screen after it had
   been kept for a while as the alternative.

   CHAPTER 01'S PICTURES WERE REBUILT on 2026-09-30, once the whole screen
   at 40% proved too small to read. Unified Inbox's was built three ways -
   its parts up close in the story, the parts laid out at once, a tour
   zooming to each capability - and the first was chosen and given to all
   three features. See components/features/StoryFeature.tsx.

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
    "All fifteen iSuite AI features in detail: a unified inbox for WhatsApp, Instagram, Messenger and your website, a website AI chat widget, the Sales AI Agent, leads, contacts, pipelines, follow-ups, bookings, quotations and invoices, WhatsApp and email marketing, forms, the Marketing AI Agent, automation and the Analytics AI Agent.",
  /* Its own address, resolved against metadataBase (app/layout.tsx). */
  alternates: { canonical: "/features" },
};

/* The chapters laid out as one compact section, each with its own. Every
   other chapter is told feature by feature, in the story layout - and a
   chapter with neither is not on the page yet. The page itself is
   components/features/FeaturesBody. */
const COMPACT: Compact = {
  sales: Showcase,
  marketing: MarketingDeck,
  "automation-insights": AutomationRecipe,
};

export default function FeaturesPage() {
  return <FeaturesBody compact={COMPACT} />;
}
