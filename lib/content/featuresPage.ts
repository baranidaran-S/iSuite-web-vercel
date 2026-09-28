/* ==========================================================================
   /features - PAGE COPY
   --------------------------------------------------------------------------
   The home page NAMES the thirteen features and this page EXPLAINS them.
   Section 5 of the home page is the glimpse - a name and three to five
   words each - and its button, "Open the full feature list", lands here.

   THE FEATURES THEMSELVES ARE NOT RETYPED HERE. Their names, groups,
   marks, colours, slugs and one-line summaries all live in
   lib/content/features.ts, which the home page already reads. This file
   carries only what is new on this page. Two lists of thirteen names is
   one list that gets renamed and one that does not.

   WHERE THE DETAIL COMES FROM. Requirements §6 to §18 give every feature
   its own capability list, and those lists are the source for this page -
   not the home page's copy, and not invention. §31's rules apply to every
   word added here, the same as on the home page: no figures, no promised
   outcome, "AI sales assistant" and never "chatbot", nothing suggesting
   it replaces a team, and a limit stated plainly wherever the product has
   one.
   ========================================================================== */

export const featuresHero = {
  /* THE COUNT LIVES IN THE PILL, AND IT IS LOAD-BEARING. It says thirteen
     because features.ts lists thirteen. Add a fourteenth there and this
     changes with it - see the same warning on the home page's heading. */
  eyebrow: "All thirteen features",

  /* THE SAME TWO-PART SHAPE AS THE HOME HERO: lines set by hand for a
     wide screen, one word in the serif italic. It is a new page, so it
     gets its own accent word - the home page's "clear" stays the home
     page's.

     "The whole system" is section 5's own eyebrow on the home page, so a
     visitor who pressed that section's button arrives under a heading
     that picks up where it left off. "Feature by feature" is what the
     page then does.

     THE SPACE AFTER THE FIRST "feature" IS NON-BREAKING. Below 640px the
     hand-set lines dissolve and the browser balances the words itself -
     see .h1-hero in globals.css - and left alone it set "feature" on a
     line by itself and "by feature." under it. Measured at 390px with the
     two words tied: "The whole / system, / feature by / feature.", four
     lines either way, and the italic word finishes the heading on a line
     of its own the way it does on a wide screen. */
  headline: [
    { text: "The whole system," },
    { text: "feature\u00a0by ", accent: "feature." },
  ],

  /* The four groups by name, because the picture directly under this
     sentence is those four groups, one sheet each - and the promise the
     rest of the page has to keep. "Where its limits are" is not modesty. Requirements §23
     lists what the current product does not do, and a page this detailed
     that never mentions a limit would be the first thing a careful buyer
     stopped believing. */
  lead: "Grouped into conversations, sales, marketing and operations. For each one: what it does, what you can set up, and where its limits are.",
} as const;

/* ---- THE CHAPTERS ----------------------------------------------------------
   One per group, in the order the hero's stack reads top to bottom. The
   name, numeral, colour and tagline are features.ts's; this carries only
   the sentence under them, which says what the group is FOR before the
   features in it say what they do.

   Filled in as each chapter is built. A chapter with no entry here has not
   been written yet, not forgotten. */
export const chapters: Partial<Record<string, { lead: string }>> = {
  conversations: {
    lead: "Every enquiry lands in one shared inbox, whichever channel it came from, and the AI sales assistant can answer it from your own prices and rules.",
  },
  /* "Can become" is the landing page requirements' own hedge (§13); the
     last clause borrows their appointments heading (§14). */
  sales: {
    lead: "Every enquiry can become a contact and a deal on a board your whole team can see, with the follow-ups and appointments that keep it moving.",
  },
  marketing: {
    lead: "Your ads and forms bring enquiries in, each one recorded with where it came from, and approved WhatsApp templates carry your messages back out to customers who opted in.",
  },
  operations: {
    /* Worded around the chapter's own cards and flow: it said "the routine
       work" over a card saying "the routine part", and "how it is going"
       beside a dashboard labelled the same. */
    lead: "Automations handle the repeat work, the dashboard holds the numbers, permissions decide who sees what, and customers can buy without leaving the chat.",
  },
};

/* ---- THE FEATURE BAR ------------------------------------------------------
   The frosted bar that follows a visitor down the chapters. */
export const featureBar = {
  label: "Features",
  menu: "All features",
  /* Phones get the menu and nothing else, so the button says what it
     does rather than what it lists. */
  jump: "Jump to a feature",
  goodToKnow: "Good to know",
} as const;
