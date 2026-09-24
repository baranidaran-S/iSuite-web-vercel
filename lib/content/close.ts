/* ==========================================================================
   SECTIONS 8 AND 9 - THE QUESTIONS, AND THE ASK
   --------------------------------------------------------------------------
   The two that close the page, written together because between them they
   do one job: a visitor has to believe the page before they act on it.

   SECTION 8 WAS A LIST OF THINGS THAT ARE NOT ON THIS PAGE, and it was the
   one section on the site invented rather than taken from the brief. It
   named five absences - no logos, no testimonials, no case studies, no
   invented numbers, no promise of Meta approval - on the theory that
   pointing at an absence is a stronger trust move than asserting
   trustworthiness.

   It was wrong twice over. The eight do-not-publish rules in §17 are
   INSTRUCTIONS TO WHOEVER BUILDS THE PAGE, not content for it, and turning
   a build checklist into a customer-facing section was a category error.
   Worse, a young product volunteering that it has no testimonials and no
   case studies hands a prospect a reason to hesitate at the exact moment
   they were about to book - what reads as integrity to the people who
   built it reads as "no customers" to the person buying.

   SO IT IS THE FAQ NOW, WHICH THE BRIEF ASKED FOR AND THE PAGE DID NOT
   HAVE. §18 lists twelve questions and says to use only the most relevant
   ones. The page already answers seven of them in sections 1 to 7 - what
   it is, who it is for, Tamil, the channels, appointments, follow-ups, ad
   tracking - so the ones kept here are mostly the ones the page CANNOT
   answer by demonstration, and those are the uncomfortable ones.

   FIVE OF THE EIGHT ANSWERS ARE NO. That is the trust move, done with
   useful facts instead of a stance: a page that answers "is Meta approval
   guaranteed" with "no, Meta decides" has said something a visitor can use,
   and has said it before a salesperson has to.

   EVERY ANSWER IS CHECKED AGAINST THE GUIDE. Quotes, invoices,
   e-signatures and a native app store app are all listed in §23 under what
   the current product guide does NOT include, so those answers are no.
   Calendar sync is in the same list, which is why the appointments answer
   names it rather than leaving it to be discovered later. §24 closes with
   "All answers must be checked against the approved product guide before
   publishing" - that applies to every edit made here from now on.

   THE PRICING SENTENCE IS A QUESTION NOW. §17 requires it word for word
   and it is unchanged; it simply sits under the question people are
   actually asking, which is what it costs.

   SECTION 9 IS ONE THING. Heading, one sentence, one button - all three
   approved copy from §19, and the button carries the same label as the
   hero's because §2 says use ONE primary CTA across the page. It imports
   hero.primaryCta rather than retyping it, so the two cannot drift.

   THE PAGE CLOSES WHERE IT OPENED. The hero sits under a sky that runs
   blue at the top into white; the closer runs white into blue going down.
   Same four stops, reversed - which reads as an evening rather than as the
   hero played twice.
   ========================================================================== */

export const trust = {
  /* §17's own name for this section. */
  eyebrow: "Trust and transparency",

  /* IT WAS "BEFORE YOU BOOK A DEMO." AND THAT WAS A BAD MISS. Sitting
     directly above eight questions of which five are answered no, it does
     not read as "here is what you should know first" - it reads as a
     caution, as though the page were talking somebody out of it. The last
     content section before the CTA cannot be the one that introduces
     doubt.

     This says what the section actually is. Three of the answers are yes
     and five are no, and naming both halves up front is the trust move -
     a heading that promised only capabilities would be contradicted by its
     own first answer. */
  heading: "What it does, and what it does not.",

  /* Requirements §17 suggested copy, verbatim. */
  lead: "iSuite AI is designed to help your existing team handle enquiries with a clearer process, faster responses and better visibility.",

  /* §18's list, narrowed to what the page has not already demonstrated,
     plus the pricing question. Two capability answers lead so the section
     does not open on five refusals - but the refusals are the point of it,
     and none of them is softened. */
  faq: [
    {
      q: "Does it replace my sales team?",
      /* §17 do-not-publish: "Claims that the product replaces staff".
         §14 of the main guide: "Do not say it replaces the sales team." */
      a: "No. It handles the first reply, the qualifying questions and the follow-ups that get forgotten. Your team still sells, and every conversation stays visible to them.",
    },
    {
      q: "Can it reply in Tamil or Tanglish?",
      a: "Yes. Tamil, Tanglish, English, Hindi and more - it replies in whatever language the customer wrote to you in.",
    },
    {
      q: "Can it book appointments?",
      /* §23 lists Google Calendar sync and Outlook Calendar sync under
         what the product guide does NOT include, so the answer names the
         limit rather than leaving it to be found out later. */
      a: "Yes, into iSuite AI's own calendars, with buffers and reminders. It does not sync with Google Calendar or Outlook.",
    },
    {
      q: "How much does it cost?",
      /* Requirements §17, REQUIRED copy, verbatim. Publishing a figure
         instead of this sentence is a publication blocker. */
      a: "Pricing is based on business requirements and is discussed during the consultation.",
    },
    {
      q: "Are Meta's WhatsApp charges included?",
      a: "No. Meta bills you for WhatsApp messaging on its own terms, separately from anything MnT Future charges.",
    },
    {
      q: "Is Meta approval guaranteed?",
      /* §15 and §17 both forbid promising it. So does §23's rule against
         guaranteed launch dates, which is why the second sentence is
         here. */
      a: "No. Meta decides who gets approved and when. Nobody can promise you that outcome or a date for it, and we will not.",
    },
    {
      q: "Does it send quotes and invoices?",
      /* §23: quotes, invoices and e-signatures are all listed under what
         the current product guide does not include. */
      a: "No. Quotes, invoices and e-signatures are not part of the current product guide.",
    },
    {
      q: "Is there a mobile app?",
      /* §23: "Native App Store app" is on the not-included list. §24 lists
         "Mobile browser usage" as the topic that replaces it. */
      a: "There is no App Store or Play Store app. It runs in a mobile browser.",
    },
  ],

  moreLabel: "Read the full FAQ",
  moreHref: "/faq",
} as const;

export const finalCta = {
  /* Requirements §19, sentence case to match every other heading, and SPLIT
     so the last three words own a line of their own.

     "One sales system" is the whole proposition - it is the phrase the
     hero opens on, the reason sections 3 and 4 exist, and the thing a
     visitor is being asked to agree to. Left inside a paragraph of heading
     it wrapped wherever the viewport put it. On its own line it cannot.

     IT IS BRAND-COLOURED, NOT SERIF ITALIC. The hero's accent - one word,
     "clear", in Instrument Serif - is deliberately the only serif on the
     page; home.ts says so, and a second use would stop it being an accent.
     Colour and a drawn rule do the same job here without spending it. */
  heading: [
    { text: "Ready to bring your enquiries into" },
    { text: "one sales system?", accent: true },
  ],

  /* Requirements §19, verbatim. */
  line: "See how iSuite AI can fit your business's enquiry handling, follow-up, appointment and sales process.",

  /* The label itself comes from hero.primaryCta at the point of use - one
     CTA, one string, per §2. */
} as const;
