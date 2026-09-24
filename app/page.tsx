import { AdsReports } from "@/components/home/AdsReports";
import { Features } from "@/components/home/Features";
import { FourWalls } from "@/components/home/FourWalls";
import { Hero } from "@/components/home/Hero";
import { OneInbox } from "@/components/home/OneInbox";
import { FinalCta } from "@/components/home/FinalCta";
import { SalesPipeline } from "@/components/home/SalesPipeline";
import { Trust } from "@/components/home/Trust";
import { WhoItsFor } from "@/components/home/WhoItsFor";

/* ==========================================================================
   HOME - 9 sections
   --------------------------------------------------------------------------
    1  Hero                     [BUILT]
    2  The Problem              [BUILT] four walls - the gutters argue
    3  What iSuite AI Is        [BUILT] the collapse into one inbox
    4  Sales Pipeline           [BUILT] deals cross the board and close
    5  The Features             [BUILT] four bands, all 13 named
    6  Who It's For             [BUILT] 3x3, the mark at the centre
    7  Ads & Reports            [BUILT] the severed row, joined
    8  Trust & Transparency     [BUILT] the limited FAQ, per §18
    9  Final CTA                [BUILT] full-bleed, one button

   SECTION 4 WAS A SIX-STEP "HOW IT WORKS" AND IS NOW THE SALES PIPELINE.
   Three sections in a row had been about enquiries arriving and being
   answered, and the pipeline - the part that makes this a sales system
   rather than a shared inbox with a chatbot in it - only ever appeared as
   somebody else's closing beat. It has its own section now.

   The journey it replaced is not deleted. journey.ts, HowItWorks.tsx and
   JourneyFrags.tsx are intact and unrendered, waiting for /how-it-works,
   which is where thirteen steps always belonged. They are the ONLY unused
   components in the tree and they are unused on purpose - do not tidy them
   away.

   ALL NINE ARE BUILT. SectionStub.tsx and the `sections` array it rendered
   from are gone, deleted as the last stub was replaced - which was the rule
   they were written under. Nothing on this page is a placeholder any more.

   What is still outstanding is listed in lib/site.ts PLACEHOLDERS: real
   brand fonts, the Indic webfonts, the domain, the dashboard capture, and
   three photographs for section 6.

   THE LAST TWO SECTIONS HAVE NO FRAME. Everything from the hero to section
   7 is a rounded card on the page ground; 8 drops the card and 9 drops the
   margins too, so the page ends by opening outward rather than by
   stopping.
   ========================================================================== */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FourWalls />
      <OneInbox />
      <SalesPipeline />
      <Features />
      <WhoItsFor />
      <AdsReports />
      <Trust />
      <FinalCta />
    </>
  );
}
