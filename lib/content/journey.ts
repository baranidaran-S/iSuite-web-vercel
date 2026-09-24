/* ==========================================================================
   HOW IT WORKS - THE SIX-STEP JOURNEY
   --------------------------------------------------------------------------
   NOT ON THE HOME PAGE ANY MORE, AND NOT DEAD EITHER. This was section 4
   until the sales pipeline took that slot. It is finished, it builds, and it
   is waiting for /how-it-works, which is where a thirteen-step explanation
   belonged in the first place. Its components are HowItWorks.tsx and
   JourneyFrags.tsx. Do not delete any of the three.
   --------------------------------------------------------------------------
   --------------------------------------------------------------------------
   Requirements SS19 lists the journey as THIRTEEN steps. Thirteen on a home
   page is a specification, not a story - a visitor counts them and leaves.
   These six are the same journey with the pairs folded together, and the
   section links to the full thirteen on /how-it-works rather than pretending
   six is all there is.

   What folded into what:
     01  <- ad click + lead enters through a channel or a form, AND the
             contact and deal that SS8 opens the moment it lands
     02  <- assistant responds in the customer's language
     03  <- qualifying questions + answers saved to the contact
     04  <- appointment booked + conversation assigned to the team
     05  <- contact and deal in the CRM + deal moves through the pipeline
     06  <- follow-ups scheduled + won/lost recorded + reports

   PLAIN TITLES, VERB FIRST. Every one of them is a thing that happens,
   written the way the business owner would say it happened. No "seamless",
   no "intelligent", no "effortless" - those words describe how a vendor
   feels about their software rather than what it did.

   CLAIM DISCIPLINE. Nothing below promises a lead, a sale or a reply time.
   Step 02 says the customer gets an answer, which is what an automatic reply
   IS, not a result it produces. Step 04 hands over to a person on purpose:
   the requirements are explicit that no wording may suggest the assistant
   replaces the team, and a handover written into the journey says that
   better than a disclaimer underneath it would.

   `frag` names the small piece of real interface drawn beside each step -
   see components/home/product/JourneyFrags.tsx. Six steps of pure type
   would be a list, and the point of this section is that each step is a
   thing you can SEE happening.
   ========================================================================== */

export type FragId =
  | "arrives"
  | "replies"
  | "asks"
  | "books"
  | "deal"
  | "follows";

export type Step = {
  n: string;
  id: string;
  title: string;
  line: string;
  frag: FragId;
};

export const journey = {
  eyebrow: "How it works",

  heading: "Here is what happens when someone messages you.",

  lead: "From the very first message there is a contact and a deal on your board. The assistant works through the rest while your team is busy, and you can take over at any point - everything the customer has already said is sitting right there.",

  moreLabel: "See the full journey, all thirteen steps",
  moreHref: "/how-it-works",

  steps: [
    {
      n: "01",
      id: "arrives",
      title: "Someone messages you",
      line: "A Meta ad, a WhatsApp message, an Instagram DM or your website chat. It lands in one place - and a contact and a deal open straight away, with the ad they clicked saved against them.",
      frag: "arrives",
    },
    {
      n: "02",
      id: "replies",
      title: "The assistant replies",
      line: "In your customer's language, using the price list, timings and answers you set up - so they get an answer instead of waiting.",
      frag: "replies",
    },
    {
      n: "03",
      id: "asks",
      title: "It asks your questions",
      line: "The ones that tell you whether a lead is worth a call. What they answer saves onto the contact and onto the deal, in fields you define.",
      frag: "asks",
    },
    {
      n: "04",
      id: "books",
      title: "A time gets booked",
      line: "Or the chat is handed to the right person on your team - with the whole conversation already there, so nobody asks twice.",
      frag: "books",
    },
    {
      n: "05",
      id: "deal",
      title: "The deal moves",
      line: "Drag it through the stages you set up - New Enquiry, Qualified, Won, or whatever you call yours. When it is won or lost, the reason is recorded against it.",
      frag: "deal",
    },
    {
      n: "06",
      id: "follows",
      title: "Follow-ups keep going",
      line: "When a customer goes quiet, the follow-up is already scheduled. Your team sees what is due, and what happened lands in your reports.",
      frag: "follows",
    },
  ] satisfies Step[],
} as const;
