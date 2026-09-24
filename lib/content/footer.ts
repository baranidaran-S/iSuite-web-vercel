/* ==========================================================================
   FOOTER CONTENT
   --------------------------------------------------------------------------
   NOTHING HERE IS NEW COPY. The blurb is two clauses lifted whole from
   sentences already approved elsewhere on the page - "iSuite AI is an AI
   sales system" opens oneInbox.lead, and the rest is hero.sub with its
   middle removed. A footer is the last thing a careful reader checks and
   the easiest place on a site for an unreviewed claim to appear, so it
   makes none: no figures, no outcomes, no "trusted by".

   THE META DISCLAIMER IS NOT DUPLICATED HERE. It is imported from
   lib/content/ads.ts, which holds the one copy of requirements section 15's
   mandatory wording. Two copies of a legal sentence is one copy that can be
   edited and one that cannot.

   THE PAGE LINKS ARE NOT HERE EITHER - they are in lib/site.ts, shared with
   the header, because three routes written out in two files drift the
   moment a page is renamed.
   ========================================================================== */

export const footer = {
  blurb:
    "iSuite AI is an AI sales system. It brings WhatsApp, Instagram, Facebook and website enquiries into one inbox, and every one becomes a deal on your sales board.",

  /* The tagline is set as TEXT, not taken from logo-full.png. The artwork
     carries it, but it is 10.6% of the file's height - so at a size where
     "Product of MnT Future" is legible, roughly 15px, the whole lockup is
     395px wide and does not fit a 390px phone. Text scales, stays crisp,
     can be read aloud and can be translated. */
  tagline: "Product of",

  productLabel: "Product",
  legalLabel: "Legal",
  rights: "All rights reserved.",
} as const;
