/* ==========================================================================
   SECTION 5 COPY - THE FEATURES
   --------------------------------------------------------------------------
   All thirteen, in the four groups the requirements themselves use for the
   product menu - Conversations, Sales, Marketing, Operations. Grouping them
   the way the product is organised means a visitor who reads this section
   can already navigate the app, and it stops the section being a list of
   thirteen equal things where nothing has a shape.

   THREE OF THE THIRTEEN HAVE ALREADY HAD A SECTION EACH. The inbox, the
   assistant and the sales pipeline were sections 3 and 4. They are still
   named here, in their group, at the same weight as the rest - leaving them
   out would make the count wrong and the menu unrecognisable. The lead says
   plainly that they have been covered.

   THE LANGUAGE PROOF LIVES HERE, and it is here because it was deliberately
   pulled OUT of section 3. The first conversation a visitor reads is where
   the product gets explained, and making it bilingual costs a beat of
   comprehension right at that moment. It deserved its own place where being
   bilingual is the entire point rather than a detail inside a different
   point. This is that place.

   EVERY LINE IS A CAPABILITY, NEVER AN OUTCOME. No line below promises a
   lead, a sale, a reply time or Meta approval. "Connect your ad account and
   see which ad an enquiry came from" is a thing the software does; "get more
   leads from your ads" would be a thing it cannot promise.
   ========================================================================== */

export const features = {
  eyebrow: "The whole system",

  heading: "Thirteen features. One system.",

  lead: "The shared inbox, the AI assistant and the sales board are three of them, and you have just seen those. Here are all thirteen, grouped the way the product itself is.",

  /* ------------------------------------------------------------------
     THE LANGUAGE DEMONSTRATION
     ------------------------------------------------------------------
     The same exchange four times over, and it cycles rather than sitting
     still: a visitor who speaks Tamil sees Tamil arrive on its own, and a
     visitor who does not still watches the assistant change language
     without anyone explaining that it can.

     THE MONEY IS THE SAME MONEY AS SECTION 3. Anand was told a first
     consultation is 500 rupees in the inbox, and it is 500 rupees here. A
     price that moves between two screens of the same site is the kind of
     detail that quietly tells a visitor the screens are made up.

     THE LIST IS NOT EXHAUSTIVE AND SAYS SO. The requirements list Tamil,
     Tanglish, English, Hindi "and other supported languages" - so the
     caption says "and more" rather than implying these four are the whole
     set or that any particular fifth one is available.
     ------------------------------------------------------------------ */
  language: {
    label: "It replies in your customer's language",
    line: "Tamil, Tanglish, English, Hindi and more. The same answer, in whatever they wrote to you in.",
    note: "Same enquiry, four languages",

    /* `dir` is not needed for any of these four, but the field exists so
       that adding a right-to-left language later is a data change rather
       than a component change. */
    turns: [
      {
        id: "ta",
        label: "தமிழ்",
        name: "Tamil",
        ask: "முதல் ஆலோசனைக்கு கட்டணம் எவ்வளவு?",
        reply:
          "முதல் ஆலோசனை ₹500. சனிக்கிழமை காலை 11 மணிக்கு நேரம் பதிவு செய்யவா?",
      },
      {
        id: "tg",
        label: "Tanglish",
        name: "Tanglish",
        ask: "First consultation ku charge evlo?",
        reply:
          "First consultation ₹500 தான். Saturday morning 11 manikku book pannalaama?",
      },
      {
        id: "en",
        label: "English",
        name: "English",
        ask: "How much for a first consultation?",
        reply:
          "A first consultation is ₹500. Shall I book you in for Saturday at 11am?",
      },
      {
        id: "hi",
        label: "हिन्दी",
        name: "Hindi",
        ask: "पहले परामर्श का शुल्क कितना है?",
        reply:
          "पहला परामर्श ₹500 का है। क्या मैं शनिवार सुबह 11 बजे का समय बुक कर दूँ?",
      },
    ],
  },

  /* `short` IS WHAT THE CARD SHOWS - three to five words, because it sits
     on one line inside a panel column about 230px wide and a second line
     would push every card in the column out of step with its neighbours.

     NONE OF THE THIRTEEN PROMISES A RESULT, and that took rewriting. The
     design this was built from had "Never miss a next step" on Follow-ups,
     "Turn interest into opportunity" on Lead Capture and "Do more,
     automatically" on Automations. Each one is a promise about what happens
     to a business rather than a statement of what the software does, which
     is the line SS31 draws. "Due and overdue, listed" is duller and it is
     true.

     `line` IS NOT RENDERED ON THE HOME PAGE ANY MORE. The cards carry a
     mark and a name and nothing else - the home page names the thirteen,
     the feature pages explain them, and a sentence under every card was
     making the section run on.

     The thirteen lines are kept rather than deleted because they are
     written and claim-checked, and /features is a route in the plan. When
     that page is built it should start from these. If the route is ever
     dropped, delete them in the same change - copy waiting for a page that
     is never coming is how dead content survives a review.

     `accent` and `mark` are not decoration. Thirteen features set as plain
     headings and paragraphs read as a specification sheet - correct,
     complete and impossible to scan. A colour per GROUP (not per feature)
     gives the four bands a rhythm the eye can use, and a mark per feature
     gives every item an anchor to land on.

     THE FOUR HUES ARE ONE HUE NOW - the logo's. They were blue, teal,
     green and amber: four invented colours, and the green and the amber in
     particular belong to no other part of this site. globals.css opens by
     saying the palette is limited so that colour earns attention by being
     rare; inventing four more for one section is the opposite of that, and
     it is exactly why the section looked like it came from somewhere else.

     They walk the wordmark's own gradient instead - royal blue, blue, sky,
     cyan, deep end to bright end across the four panels in order. Still
     four distinguishable groups, no colour on the page that is not already
     the brand's.

     TWO VALUES PER GROUP, because the section is dark and the four panels
     inside it are light. `deep` is everything that has to READ on white -
     the numeral tile's ground, the marks, the tagline - and clears AA at
     4.7:1 or better. `accent` is everything that only has to TINT - the
     chip behind a mark, the rule, the wash at the foot of a panel - and is
     the same hue taken bright, which makes a better pastel at 10% than a
     deep colour does.

     The pair has been added, removed and added again as the panels went
     white, dark and white. If they go dark for good, `deep` goes with them
     in the same change.

     The four groups are lifted verbatim from the product menu in the
     requirements. Do not regroup them here without regrouping them there -
     a visitor who learns the shape of the product on this page and then
     cannot find it in the app has been taught the wrong thing. */
  groups: [
    {
      name: "Conversations",
      tagline: "One inbox.\nYour own number.",
      n: "01",
      accent: "#1e5bff",
      deep: "#0b3fd4",
      mark: "conversations",
      items: [
        {
          name: "One Inbox",
          short: "Every channel, one place.",
          mark: "inbox",
          line: "Every channel in one place, on your own WhatsApp number, with your team in it.",
        },
        {
          name: "AI Sales Assistant",
          short: "Replies, qualifies, books.",
          mark: "assistant",
          line: "Replies, qualifies, books and follows up, using the prices and rules you set.",
        },
      ],
    },
    {
      name: "Sales",
      tagline: "Your stages.\nYour fields.",
      n: "02",
      accent: "#1e86f5",
      deep: "#0a4f9e",
      mark: "sales",
      items: [
        {
          name: "Contacts and Custom Fields",
          short: "One record per customer.",
          mark: "contacts",
          line: "One record per customer, with the fields you decide are worth keeping.",
        },
        {
          name: "Sales Pipeline",
          short: "Your stages, your board.",
          mark: "pipeline",
          line: "Your own stages, an owner on every deal, a recorded reason when it closes.",
        },
        {
          name: "Follow-ups",
          short: "Due and overdue, listed.",
          mark: "followups",
          line: "Due and overdue lists, owner reminders, and what the assistant promised.",
        },
        {
          name: "Appointments",
          short: "Calendars, buffers, reminders.",
          mark: "appointments",
          line: "Calendars, working hours, buffers, reminders, reschedule and cancel links.",
        },
      ],
    },
    {
      name: "Marketing",
      tagline: "Your ads.\nYour templates.",
      n: "03",
      accent: "#12a7e8",
      deep: "#0a6187",
      mark: "marketing",
      items: [
        {
          name: "Meta Ads",
          short: "See which ad they came from.",
          mark: "ads",
          line: "Connect your ad account and see which ad an enquiry came from.",
        },
        {
          name: "Broadcasts and Templates",
          short: "Templates, sent to a segment.",
          mark: "broadcasts",
          line: "WhatsApp templates and saved replies, sent to a segment you choose.",
        },
        {
          name: "Lead Capture",
          short: "Forms, ads and booking pages.",
          mark: "capture",
          line: "Meta lead forms, click-to-WhatsApp ads, website forms and booking pages.",
        },
      ],
    },
    {
      name: "Operations",
      tagline: "Set the rules once.\nThen leave them.",
      n: "04",
      accent: "#00c8f8",
      deep: "#0b6f80",
      mark: "operations",
      items: [
        {
          name: "Automations",
          short: "Triggers and actions, no code.",
          mark: "automations",
          line: "No-code triggers and actions, so the routine part happens on its own.",
        },
        {
          name: "Reports and Dashboard",
          short: "Enquiries, deals, follow-ups.",
          mark: "reports",
          line: "Enquiries, replies, deals, follow-ups and ad activity, in one place.",
        },
        {
          name: "Team and Permissions",
          short: "Roles, and who sees what.",
          mark: "team",
          line: "Roles, conversation assignment, and what each person is allowed to see.",
        },
        {
          name: "Chat Commerce in India",
          short: "Built for selling over chat.",
          mark: "commerce",
          line: "Built for customers who ask, decide and buy over chat, not on a website.",
        },
      ],
    },
  ],

  /* The rail under the four panels. The design had "ALL THE TOOLS YOU
     NEED" and "BUILT FOR REAL BUSINESS" here - both unprovable and both
     the kind of line a visitor has read on forty other sites. The count
     and the positioning are true and say more. */
  railLeft: "Thirteen features",
  railRight: "One system",

  moreLabel: "Open the full feature list",
  moreHref: "/features",
} as const;
