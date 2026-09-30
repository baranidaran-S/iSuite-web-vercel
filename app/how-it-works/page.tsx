import type { Metadata } from "next";
import { HowHero } from "@/components/how/HowHero";
import { BothSides } from "@/components/how/journey/BothSides";
import { InAction } from "@/components/how/know/InAction";
import { FlatLay } from "@/components/how/start/FlatLay";
import { FinalCta } from "@/components/home/FinalCta";

/* ==========================================================================
   /how-it-works
   --------------------------------------------------------------------------
    1  Hero                       [BUILT] the cast of the journey, the
                                          enquiry carried along them
    2  The journey                [BUILT] all thirteen steps of §19, from
                                          both sides - what the customer
                                          sees beside what the team sees,
                                          each step playing in as it
                                          scrolls up
    3  Good to know               [BUILT] the rules and limits the journey
                                          depends on, each shown happening
                                          in the product at the step it
                                          applies to
    4  Getting started            [BUILT] what a business needs before its
                                          first enquiry (§22), laid out on
                                          a desk, each thing with the steps
                                          it makes possible
    5  Final CTA                  [BUILT] the home page's own closer

   BUILT A SECTION AT A TIME, as /features was, each looked at in the
   browser before the next one starts. The words are in
   lib/content/howItWorks.ts.

   THE JOURNEY WAS CHOSEN FROM THREE: a relay, the enquiry passed from lane
   to lane between the cast; both sides; and one week in a planner. Both
   sides was kept, and the other two deleted.

   GOOD TO KNOW WAS CHOSEN FROM THREE as well: the rules in action; the
   journey as a road with a traffic sign at each rule; and the enquiry as
   a pass stamped at each rule. The rules in action was kept - it is the
   one whose pictures say the rule themselves. The road's signs misled (a
   no-entry calendar at the very step where a visit is booked), and the
   pass said each rule three times.

   GETTING STARTED WAS ADDED BECAUSE THE PAGE WAS THIN: §19 asks only for
   the journey. A section of other ways the journey could go was built
   first, three ways, and removed - it could only retell the journey's
   own chats and records, and two of its four turns were already in the
   journey's own words. Getting started says what no other page says. It
   was chosen from three as well - the desk; Meta's part beside yours;
   frames of film - and it is the reader's own business on the desk, not
   the journey's clinic.

   THE HEADER, THE FOOTER AND THE HOME HERO'S "SEE HOW IT WORKS" BUTTON all
   link here. They 404'd until this page existed.
   ========================================================================== */

/* The description covers the whole page, Getting started included, in
   about the 160 characters a search result shows. The canonical is this
   page's own address, resolved against metadataBase (app/layout.tsx). */
export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Follow one enquiry through iSuite AI from ad click to won or lost deal: what the AI sales assistant does, where your team takes over, and what you need to start.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <HowHero />
      <BothSides />
      <InAction />
      <FlatLay />
      <FinalCta />
    </>
  );
}
