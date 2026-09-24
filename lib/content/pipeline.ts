/* ==========================================================================
   SECTION 4 COPY - THE SALES PIPELINE
   --------------------------------------------------------------------------
   THIS SECTION REPLACED THE SIX-STEP JOURNEY, and the reason is worth
   keeping. The home page spent its first three sections on enquiries
   arriving and being answered, and the pipeline - the part that makes this a
   sales SYSTEM rather than a shared inbox with a chatbot in it - only ever
   turned up as somebody else's last beat. Section 3 ended on the board.
   Section 4 was a journey that passed through it. Nothing on the page was
   ABOUT it.

   Now section 4 is. Short, because the detail belongs in the features
   section and on the pipeline feature page - this one has to make a visitor
   understand what a pipeline is and why their business wants one, and then
   stop.

   The six-step journey it replaced still exists in full - journey.ts,
   HowItWorks.tsx and JourneyFrags.tsx - and is waiting for /how-it-works,
   which is where a thirteen-step explanation always belonged.

   NOTHING HERE IS AN OUTCOME. The section shows deals being moved and closed,
   never how many or how fast. One of the three example deals is LOST, on
   purpose: a board where everything is won is a board nobody believes, and
   the product records lost reasons precisely because losing happens.
   ========================================================================== */

export const pipeline = {
  eyebrow: "Sales pipeline",

  heading: "See exactly where every deal stands.",

  lead: "Every enquiry opens a deal on your board. You set the stages, drag deals across them, and record why each one was won or lost - so what is actually in progress is a list you can look at, instead of something somebody has to remember.",

  boardNote: "Example stages - you set your own. iSuite AI ships with these and every business changes them.",

  funnelLabel: ["SALES", "PIPELINE"],
  funnelSub: "iSuite AI",

  /* FIVE GATES AND A GOAL, which is the shape of the funnel infographic the
     client chose. All six names come from the example stage list in the
     requirements - New Enquiry, Contacted, Qualified, Appointment Booked,
     Discussion, Won - so nothing here is invented, only ordered.

     Each line is what that stage MEANS in a business that has never used a
     CRM, which is the whole job of this section. Kept to one short sentence
     because it sits in a 150px column under a ring.

     THE FUNNEL NARROWS, and that was raised as a concern and overruled: a
     taper is the genre convention for this diagram. Nothing here states a
     figure, and the caption says the stages are examples, so the shape
     carries no number. */
  stages: [
    {
      name: "New Enquiry",
      line: "A deal opens the moment the message lands.",
    },
    {
      name: "Contacted",
      line: "The assistant has replied, so they know someone is there.",
    },
    {
      name: "Qualified",
      line: "Your questions answered, and saved onto the deal.",
    },
    {
      name: "Appointment Booked",
      line: "A time is held and the reminders are scheduled.",
    },
    {
      name: "Discussion",
      line: "Price, options, whatever your sale needs before a yes.",
    },
  ],

  /* The target at the end of the arrow. Its line is where Lost lives in this
     layout - the funnel has no downward branch, and a page that shows only
     won deals is a page nobody believes. */
  goal: {
    name: "Won",
    line: "Closed, with the reason recorded. Lost deals record one too.",
  },

  /* The four deals that travel the funnel, keyed to lib/content/queues.ts so
     they are the same people the page has followed since section 2 rather
     than a fifth invented set.

     `path` is the gate index at each beat - 0 to 4 are the rings and 5 is
     the target. `start` is the beat a deal joins, staggered by one so that
     at the fullest beat there is somebody on four of the five gates, the way
     the reference has a figure on every ring.

     NISHA DOES NOT FINISH. Her path stops at Qualified and she closes Lost.
     Four deals sailing through to Won would be the dishonest version of this
     picture, and the product records lost reasons precisely because that is
     not what a week looks like. */
  deals: [
    { id: "fb-4", start: 0, path: [0, 1, 2, 3, 4, 5], reason: "Price agreed" },
    { id: "ig-4", start: 2, path: [0, 1, 2], reason: "Went elsewhere" },
    { id: "wa-4", start: 4, path: [0, 1, 2, 3, 4, 5], reason: "Booked and paid" },
    { id: "web-4", start: 6, path: [0, 1, 2, 3, 4, 5], reason: "Signed up" },
  ],

  /* THE FOUR FACTS THAT USED TO SIT HERE WERE CUT. "Your own stages", "An
     owner and a next step", "Won and lost with the reason" and "One deal per
     customer" ran as a four-column row under the funnel, and the section was
     asked to be short. They are all documented capabilities and they belong
     in the features section and on the pipeline feature page, where there is
     room to say them properly.

     ONE OF THEM STILL HAS TO BE SAID HERE, and it is: the goal's line below
     carries "Lost deals record one too", because the funnel has no downward
     branch and a picture where everything is won is a picture nobody
     believes. */

  moreLabel: "See everything the pipeline does",
  moreHref: "/features",
} as const;
