/* ==========================================================================
   THE FEATURES - ONE LIST FOR THE WHOLE SITE
   --------------------------------------------------------------------------
   The home page's section 5 names them, /features explains them, the
   feature bar and /how-it-works link to them - all from this list.

   FIFTEEN, AND THEY ARE THE APP'S. On 2026-09-30 the client gave the
   list from the real product (crm.mntfuture.com) and it replaced the
   thirteen the requirements document described: Meta Ads, Reports and
   Dashboard, Team and Permissions and Chat Commerce left the list, and
   the website chat widget, leads, quotations and invoices, email
   marketing, forms and three AI agents came in. The names are the
   client's own, word for word apart from capitals.

   FOUR GROUPS - Conversations, Sales, Marketing, Automation & Insights.
   The app's own menu splits the same features five ways (Inbox, CRM,
   Commerce, Broadcasts, Automation); four groups keep the page's four
   chapters, and a feature is still where its job is: the widget with the
   inbox it feeds, quotations with the deals they close.

   THE MARKETING AI AGENT IS THE APP'S STUDIO, building Meta ads - the
   client confirmed it on 2026-10-01, after it had sat here as a feature
   whose details were on their way (PENDING, below, held it back).

   THE LANGUAGE PROOF LIVES HERE, and it is here because it was deliberately
   pulled OUT of section 3. The first conversation a visitor reads is where
   the product gets explained, and making it bilingual costs a beat of
   comprehension right at that moment. It deserved its own place where being
   bilingual is the entire point rather than a detail inside a different
   point. This is that place.

   EVERY LINE IS A CAPABILITY, NEVER AN OUTCOME. No line below promises a
   lead, a sale or a reply time. "Bulk WhatsApp messages from your approved
   templates" is a thing the software does; "reach more customers" would
   be a thing it cannot promise.
   ========================================================================== */

export const features = {
  eyebrow: "The whole system",

  heading: "Fifteen features. One system.",

  lead: "The shared inbox, the Sales AI Agent and the sales board are three of them, and you have just seen those. Here are all fifteen, in four groups.",

  /* ------------------------------------------------------------------
     THE LANGUAGE DEMONSTRATION
     ------------------------------------------------------------------
     The same exchange four times over, and it cycles rather than sitting
     still: a visitor who speaks Tamil sees Tamil arrive on its own, and a
     visitor who does not still watches the Sales AI Agent change language
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

  /* `short` IS WHAT THE HOME PAGE'S CARD SHOWS - three to five words,
     because it sits on one line inside a panel column about 230px wide.

     `line` IS /features' - the sentence on the chapter card, under the
     feature's name. Both are capabilities, never results.

     `accent` and `mark` are not decoration. A colour per GROUP (not per
     feature) gives the four bands a rhythm the eye can use, and a mark per
     feature gives every item an anchor to land on. The four hues walk the
     logo's own gradient - royal blue, blue, sky, cyan.

     TWO VALUES PER GROUP. `deep` is everything that has to READ on white
     and clears AA at 4.7:1 or better; `accent` is everything that only has
     to TINT.

     `slug` IS AN ADDRESS, NOT A LABEL. Every group and every feature has
     its own section on /features, and the slug is that section's id -
     /features#unified-inbox, /features#sales. The home page's feature rows,
     /features' feature bar and /how-it-works link to it, and it keys the
     feature's pictures (closeups.ts and shots.ts).
     A group's slug and a feature's slug are both ids on one page, so no
     two may be the same - the fourth group is automation-insights because
     its first feature is automation. */
  groups: [
    {
      name: "Conversations",
      slug: "conversations",
      tagline: "Every channel.\nOne inbox.",
      n: "01",
      accent: "#1e5bff",
      deep: "#0b3fd4",
      mark: "conversations",
      items: [
        {
          name: "Unified Inbox",
          slug: "unified-inbox",
          short: "WhatsApp, Instagram, Messenger, web.",
          mark: "inbox",
          line: "WhatsApp, Instagram, Messenger and your website's chat in one inbox your whole team works from.",
        },
        {
          name: "Website AI Chat Widget",
          slug: "website-ai-chat-widget",
          short: "A chat bubble on your site.",
          mark: "widget",
          line: "A chat bubble on every page of your website, answered by the Sales AI Agent, each chat landing in the inbox.",
        },
        {
          name: "Sales AI Agent",
          slug: "sales-ai-agent",
          short: "Replies, books, hands over.",
          mark: "assistant",
          line: "Replies in the customer's language from what you tell it, books a time, and hands over to your team by your rules.",
        },
      ],
    },
    {
      name: "Sales",
      slug: "sales",
      tagline: "From first lead\nto final invoice.",
      n: "02",
      accent: "#1e86f5",
      deep: "#0a4f9e",
      mark: "sales",
      items: [
        {
          name: "Leads Management",
          slug: "leads-management",
          short: "Businesses you found, kept apart.",
          mark: "leads",
          line: "Businesses you found, kept apart from your contacts until somebody has spoken to them, with a call list to work through.",
        },
        {
          name: "Contacts Management",
          slug: "contacts-management",
          short: "Every customer, one record.",
          mark: "contacts",
          line: "One record per customer, with your own fields, tags and groups, saved views, import and export.",
        },
        {
          name: "Sales Pipeline Management",
          slug: "sales-pipeline-management",
          short: "Your pipelines, your stages.",
          mark: "pipeline",
          line: "As many pipelines as you sell in, each with its own stages, as a board or a list.",
        },
        {
          name: "Follow-up Management",
          slug: "follow-up-management",
          short: "Who to chase, and when.",
          mark: "followups",
          line: "The work owed to people, sorted into overdue, today and this week - for the whole team or just you.",
        },
        {
          name: "Booking Management",
          slug: "booking-management",
          short: "Booking links and calendars.",
          mark: "appointments",
          line: "Calendars customers book from a link, every booking saved as a contact and confirmed on WhatsApp.",
        },
        {
          name: "Quotation & Invoice",
          slug: "quotation-invoice",
          short: "Quote it, bill it, track it.",
          mark: "quote",
          line: "Quotations with GST and a link the customer accepts from, invoices, and where each one stands.",
        },
      ],
    },
    {
      name: "Marketing",
      slug: "marketing",
      tagline: "Your templates.\nYour lists.",
      n: "03",
      accent: "#12a7e8",
      deep: "#0a6187",
      mark: "marketing",
      items: [
        {
          name: "WhatsApp Marketing",
          slug: "whatsapp-marketing",
          short: "Approved templates, sent in bulk.",
          mark: "broadcasts",
          line: "Bulk WhatsApp messages from your approved templates, sent to a group, with delivery and reads tracked.",
        },
        {
          name: "Email Marketing",
          slug: "email-marketing",
          short: "Campaigns through your own key.",
          mark: "email",
          line: "Email campaigns with a subject, preview text and your own HTML, sent to a list through your own sending key.",
        },
        {
          name: "Forms",
          slug: "forms",
          short: "Web forms and Meta ad forms.",
          mark: "forms",
          line: "Forms you build and put on your site, and your Meta lead forms - every submission saved as a contact.",
        },
        {
          name: "Marketing AI Agent",
          slug: "marketing-ai-agent",
          short: "Meta ads, built from your poster.",
          mark: "marketingAgent",
          line: "Attach your poster and say what you want: it builds the campaign on your Meta ad account, paused until you say it can run.",
        },
      ],
    },
    {
      name: "Automation & Insights",
      slug: "automation-insights",
      tagline: "Set the rules once.\nAsk your CRM.",
      n: "04",
      accent: "#00c8f8",
      deep: "#0b6f80",
      mark: "operations",
      items: [
        {
          name: "Automation",
          slug: "automation",
          short: "Triggers and actions, no code.",
          mark: "automations",
          line: "Workflows that start on an event - a message, a booking, a quotation accepted - and run the steps you chose.",
        },
        {
          name: "Analytics AI Agent",
          slug: "analytics-ai-agent",
          short: "Ask your CRM a question.",
          mark: "analyticsAgent",
          line: "Ask about your deals, contacts, conversations and ads in plain words, and see the tools it used to answer.",
        },
      ],
    },
  ],

  /* The rail under the four panels: the count and the positioning, both
     true. */
  railLeft: "Fifteen features",
  railRight: "One system",

  moreLabel: "Open the full feature list",
  moreHref: "/features",
} as const;

/* FEATURES WHOSE DETAILS ARE STILL BEING CONFIRMED. Named in the list;
   every place that would explain one says the details are on their way
   instead. Remove a slug once its words are written in featureDetails.ts
   and its picture exists. */
export const PENDING: ReadonlySet<string> = new Set<string>();
