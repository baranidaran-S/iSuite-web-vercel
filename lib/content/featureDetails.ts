import type { features } from "@/lib/content/features";

/* ==========================================================================
   /features - WHAT EACH FEATURE SECTION SAYS
   --------------------------------------------------------------------------
   One entry per feature, keyed by the feature's slug from features.ts.

   THE SOURCE IS THE APP. Every capability here was read off the real
   product (crm.mntfuture.com) on 2026-09-30 - its screens, its settings,
   its own descriptions of itself - and where the app words something
   well, the words are its own: "Work owed to people - who to chase, and by
   when" is the Follow-ups page's subtitle. The requirements document this
   file was first written from described an earlier product; where the two
   differ the app wins (it has quotations and invoices, which the document
   listed as missing).

   NOTHING THE APP MARKS "COMING SOON" IS HERE. Click-to-WhatsApp and
   click-to-Instagram ads and Google lead forms are on its channels page,
   not yet available, and are not mentioned.

   THE CAPABILITIES ARE GROUPED, AND THE GROUPS ARE THE SECTION'S SHAPE.
   Sorted the way a business owner would ask about them, rather than one
   long column of equal bullets.

   IN CHAPTER 01 EACH GROUP IS ALSO A PART OF THE APP. A group's `id` names
   its parts up close - the conversation list, the thread, the bar under
   it, the contact panel - and a capability's `id` names its pin on them;
   see lib/content/closeups.ts. Elsewhere the ids only have to be unique.

   `limits` IS NOT SMALL PRINT. A page this detailed that never mentioned a
   limit would be the first thing a careful buyer stopped believing. Each
   sits with the feature it belongs to. A feature with none has none.

   EVERY LINE IS A CAPABILITY, never an outcome; nothing suggests it
   replaces a team; no figures.

   The Marketing AI Agent was left out until the client confirmed what it
   is (2026-10-01): Studio's ad side - see its entry.
   ========================================================================== */

export type FeatureSlug =
  (typeof features)["groups"][number]["items"][number]["slug"];

export type Capability = {
  /* The element this capability names - unique within its feature. */
  id: string;
  name: string;
  line?: string;
};

export type CapabilityGroup = {
  /* In Chapter 01, the area of the screenshot that shows this group. */
  id: string;
  label: string;
  items: readonly Capability[];
};

export type FeatureDetail = {
  /* The section's heading - a sentence, the way every heading on this site
     is. The feature's NAME is the pill above it. */
  title: string;
  lead: string;
  groups: readonly CapabilityGroup[];
  limits: readonly string[];
};

export const featureDetails: Partial<Record<FeatureSlug, FeatureDetail>> = {
  /* ==== 01 CONVERSATIONS ================================================ */

  "unified-inbox": {
    title: "Every channel. One shared inbox.",
    lead: "WhatsApp, Instagram, Facebook Messenger and your website's chat arrive in one list, and your whole team answers from it - with the Sales AI Agent replying wherever you let it.",
    groups: [
      {
        id: "channels",
        label: "Every channel, one list",
        items: [
          { id: "whatsapp", name: "WhatsApp Business", line: "Your business's own number, connected through WhatsApp's Business API." },
          { id: "instagram", name: "Instagram", line: "Direct messages to your Instagram business account, in the same list." },
          { id: "messenger", name: "Facebook Messenger", line: "Messages to your Facebook page, beside everything else." },
          { id: "webchat", name: "Website chat", line: "Chats from the widget on your website land here too." },
          { id: "filters", name: "Search, teams and tags", line: "Search the conversations, or narrow the list to a team or a tag." },
        ],
      },
      {
        id: "thread",
        label: "The whole conversation",
        items: [
          { id: "history", name: "Every message, in order", line: "Messages, templates and attachments, in one thread." },
          { id: "ai-badge", name: "AI replies, marked", line: "Every reply the Sales AI Agent sent carries an AI tag." },
          { id: "status", name: "Open or closed", line: "Mark where each conversation stands." },
          { id: "assign", name: "Assign", line: "Hand the conversation to the right teammate." },
        ],
      },
      {
        id: "control",
        label: "You and the AI, in the same chat",
        items: [
          { id: "auto", name: "The AI, replying", line: "A bar says when the Sales AI Agent is answering this conversation." },
          { id: "takeover", name: "Take over", line: "One press and the conversation is yours." },
          { id: "draft", name: "Draft with AI", line: "Tap the spark for a drafted reply you edit before sending." },
          { id: "attach", name: "Files and emoji", line: "Attach a file or add an emoji, the way you would on your phone." },
        ],
      },
      {
        id: "customer",
        label: "The customer, beside the chat",
        items: [
          { id: "contact", name: "Contact details", line: "Name, number and email, each a click from copying." },
          { id: "tags", name: "Tags", line: "Tag the customer without leaving the chat." },
          { id: "deals", name: "Deals", line: "The customer's deals, and a way to open one." },
          { id: "notes", name: "Notes", line: "Notes your team keeps about the customer." },
        ],
      },
    ],
    limits: [
      "After 24 hours without a message from the customer, WhatsApp allows only an approved template - the inbox says so and offers your templates.",
      "Meta bills WhatsApp messages separately.",
    ],
  },

  "website-ai-chat-widget": {
    title: "A chat on your website, answered.",
    lead: "Put one line of code on your site and a chat bubble appears on every page. Visitors write in, the Sales AI Agent answers, and every chat lands in your inbox.",
    groups: [
      {
        id: "install",
        label: "On any website",
        items: [
          { id: "snippet", name: "One line of code", line: "Paste it before your site's closing body tag, and the bubble appears bottom-right on every page." },
          { id: "anysite", name: "WordPress, Shopify, Wix or your own HTML", line: "It works on any website." },
          { id: "switch", name: "An off switch", line: "Turning the widget off hides the bubble at once." },
        ],
      },
      {
        id: "look",
        label: "Your name and your colour",
        items: [
          { id: "title", name: "Widget title", line: "The name at the top of the chat." },
          { id: "color", name: "Accent colour", line: "The widget wears your colour." },
          { id: "greeting", name: "Greeting", line: "The first bubble a visitor sees when the chat opens." },
        ],
      },
      {
        id: "answers",
        label: "Answered by the Sales AI Agent",
        items: [
          { id: "ai", name: "AI answers", line: "The Sales AI Agent replies from what you have told it about your business." },
          { id: "buttons", name: "Buttons to tap", line: "Where a reply offers choices, the visitor taps one instead of typing." },
          { id: "team", name: "Your team, when it's needed", line: "Someone can take the chat over from the inbox." },
        ],
      },
      {
        id: "inbox",
        label: "Every chat, someone you can reach",
        items: [
          { id: "phone", name: "A phone number first", line: "Turn it on and visitors give a number before chatting, so every chat is a lead you can call back." },
          { id: "landed", name: "In the same inbox", line: "Website chats sit beside WhatsApp, Instagram and Messenger." },
          { id: "files", name: "Attachments", line: "Visitors can send a file." },
        ],
      },
    ],
    limits: [
      "Its answers come from the Sales AI Agent, so the agent is set up first.",
    ],
  },

  "sales-ai-agent": {
    title: "An AI agent that answers, books and hands over.",
    lead: "It replies to customers in their own language from what you tell it about your business, books a time on your calendar, and hands the conversation to your team by the rules you set.",
    groups: [
      {
        id: "language",
        label: "In their language, from your business",
        items: [
          { id: "languages", name: "Tamil, English, Hindi and more", line: "It answers in the language the customer wrote in." },
          { id: "knowledge", name: "What you tell it", line: "Your business context, your instructions, and a knowledge base it searches." },
          { id: "goal", name: "A goal for every chat", line: "What it is working towards - and once a deal is open, the goal you set for that deal's stage." },
          { id: "briefs", name: "Ad briefs", line: "For a customer who came from an ad, the terms that ad's offer allows, and nothing beyond them." },
        ],
      },
      {
        id: "booking",
        label: "Books a time",
        items: [
          { id: "slots", name: "Offers free times", line: "It offers the times that are open on your calendar." },
          { id: "books", name: "Books it", line: "The booking goes on the calendar, and the customer becomes a contact." },
          { id: "confirm", name: "Confirmation on WhatsApp", line: "A confirmation follows with the time, who they will meet, and where." },
        ],
      },
      {
        id: "handoff",
        label: "Hands over by your rules",
        items: [
          { id: "reasons", name: "Reasons to hand over", line: "Asked for a person, ready to buy, a reply limit, a deal stage, gone quiet - or a reason you add." },
          { id: "routing", name: "To the right person", line: "By team, deal stage and value, language, channel or tags - to whoever is least busy." },
          { id: "escalation", name: "Nobody left waiting", line: "If no one answers in time: a reminder, the next person, a manager, then an honest word to the customer." },
          { id: "takeover", name: "Take over any time", line: "Anyone on your team can take the conversation with one press." },
        ],
      },
      {
        id: "rules",
        label: "Within the limits you set",
        items: [
          { id: "window", name: "Inside WhatsApp's 24 hours", line: "It follows up only while the window is open, stops the moment they reply, and never chases anyone who opted out." },
          { id: "replylimit", name: "A reply limit", line: "No more automatic replies per conversation than you allow." },
          { id: "playground", name: "A playground", line: "Test its replies as if you were a customer before it talks to anyone." },
          { id: "drafts", name: "Drafts for your team", line: "Your team can ask it for a reply to edit before sending." },
        ],
      },
    ],
    limits: [
      "It runs on your own OpenAI, Anthropic or Sarvam AI key: your provider bills you directly, and there are no per-seat AI fees.",
      "It states as fact only what you give it - your instructions, knowledge base, service packages and ad briefs.",
    ],
  },

  /* ==== 02 SALES ========================================================= */

  "leads-management": {
    title: "Businesses you found, kept apart until someone speaks to them.",
    lead: "Leads are prospects, not customers yet. Add them, import them, or give it a list of websites to read for a way to reach each one - then work the list call by call.",
    groups: [
      {
        id: "find",
        label: "Bring them in",
        items: [
          { id: "add", name: "Add a lead" },
          { id: "import", name: "Import leads" },
          { id: "websites", name: "Read a list of websites for contact details" },
        ],
      },
      {
        id: "work",
        label: "Work the list",
        items: [
          { id: "statuses", name: "New, contacted, replied, not a fit, do not contact" },
          { id: "calls", name: "My calls" },
          { id: "mark", name: "Mark contacted" },
          { id: "search", name: "Search by name" },
        ],
      },
    ],
    limits: [
      "A lead can't be messaged on WhatsApp first - Meta needs an opt-in - so you call or email, and WhatsApp opens the moment they write back.",
    ],
  },

  "contacts-management": {
    title: "Every customer, one record you shape.",
    lead: "One record per customer, holding the fields you decide are worth keeping, and a list you can search, filter, save views of, import to and export from.",
    groups: [
      {
        id: "list",
        label: "The list",
        items: [
          { id: "search", name: "Search by name, phone or email" },
          { id: "filter", name: "Filters" },
          { id: "columns", name: "Your columns" },
          { id: "views", name: "Saved views" },
          { id: "import", name: "Import" },
          { id: "export", name: "Export" },
        ],
      },
      {
        id: "record",
        label: "The record",
        items: [
          { id: "fields", name: "Your own fields" },
          { id: "tags", name: "Tags" },
          { id: "company", name: "Company" },
          { id: "chat", name: "A chat, one press away" },
        ],
      },
      {
        id: "groups",
        label: "Groups",
        items: [
          { id: "curated", name: "Curated lists of contacts" },
          { id: "broadcast", name: "Built to broadcast to" },
        ],
      },
    ],
    limits: [],
  },

  "sales-pipeline-management": {
    title: "As many pipelines as you sell in.",
    lead: "A pipeline for each way you sell, each with its own stages in its own order, and every deal on it as a board or a list.",
    groups: [
      {
        id: "pipelines",
        label: "Your pipelines",
        items: [
          { id: "add", name: "Add a pipeline" },
          { id: "stages", name: "Your stages, in your order" },
          { id: "rename", name: "Rename any stage" },
          { id: "duplicate", name: "Duplicate a pipeline" },
        ],
      },
      {
        id: "deals",
        label: "The deals",
        items: [
          { id: "views", name: "Board or list" },
          { id: "add-deal", name: "Add a deal" },
          { id: "card", name: "Value and owner on every deal" },
          { id: "close", name: "Won and lost" },
        ],
      },
      {
        id: "moves",
        label: "What moves with them",
        items: [
          { id: "goals", name: "A goal per stage for the Sales AI Agent" },
          { id: "triggers", name: "Deal created, moved, won and lost start automations" },
          { id: "forms", name: "Ad forms that open a deal" },
        ],
      },
    ],
    limits: [],
  },

  "follow-up-management": {
    title: "Work owed to people - who to chase, and by when.",
    lead: "Every follow-up your team owes, sorted by when it is due, with the whole team's or only your own in view.",
    groups: [
      {
        id: "when",
        label: "Sorted by when",
        items: [
          { id: "overdue", name: "Overdue" },
          { id: "today", name: "Today" },
          { id: "week", name: "This week" },
          { id: "done", name: "Show done" },
        ],
      },
      {
        id: "whose",
        label: "Whose, and what kind",
        items: [
          { id: "everyone", name: "Everyone, or mine" },
          { id: "kind", name: "Every kind, or one" },
          { id: "search", name: "Search a note or a name" },
        ],
      },
      {
        id: "glance",
        label: "At a glance",
        items: [
          { id: "counts", name: "Overdue, due today, done and new this week" },
          { id: "ontime", name: "On-time rate" },
        ],
      },
      {
        id: "act",
        label: "Done in one press",
        items: [
          { id: "new", name: "New follow-up" },
          { id: "tick", name: "Done" },
        ],
      },
    ],
    limits: [],
  },

  "booking-management": {
    title: "Share your calendar. Every booking becomes a contact.",
    lead: "A calendar for each kind of meeting, with a link customers book from, the appointments in one list, and a message on WhatsApp for every change.",
    groups: [
      {
        id: "calendars",
        label: "Booking calendars",
        items: [
          { id: "kinds", name: "A calendar for each kind of meeting" },
          { id: "link", name: "A link to share" },
          { id: "person", name: "Whose calendar it is" },
          { id: "duration", name: "Duration" },
          { id: "where", name: "Where or how you meet" },
          { id: "buffers", name: "Buffers before and after" },
          { id: "notice", name: "Minimum notice and booking window" },
        ],
      },
      {
        id: "appointments",
        label: "Appointments",
        items: [
          { id: "states", name: "Upcoming, past and cancelled" },
          { id: "views", name: "List or calendar" },
          { id: "people", name: "Everyone's, or one person's" },
        ],
      },
      {
        id: "messages",
        label: "On WhatsApp",
        items: [
          { id: "confirmed", name: "Confirmation" },
          { id: "reminder", name: "Reminder" },
          { id: "changed", name: "Rescheduled and cancelled" },
          { id: "missed", name: "Missed" },
          { id: "thanks", name: "Thank you" },
        ],
      },
      {
        id: "reports",
        label: "Booking reports",
        items: [
          { id: "by-person", name: "By team member" },
          { id: "busiest", name: "Busiest hours and days" },
          { id: "sources", name: "Where bookings come from" },
          { id: "deals", name: "Turned into deals" },
        ],
      },
    ],
    limits: [
      "Bookings live in iSuite AI's own calendars - there is no Google Calendar or Outlook sync. A meeting link is set once, on the calendar.",
    ],
  },

  "quotation-invoice": {
    title: "Quote it, bill it, and see what came back.",
    lead: "Quotations built from your catalogue with GST worked out, a link the customer accepts or declines from, invoices beside them, and where every one stands.",
    groups: [
      {
        id: "quote",
        label: "The quotation",
        items: [
          { id: "items", name: "Items from your catalogue, or typed" },
          { id: "pricing", name: "Quantity, rate, discount and tax" },
          { id: "gst", name: "GST and total" },
          { id: "terms", name: "Notes and terms" },
          { id: "pdf", name: "PDF download" },
        ],
      },
      {
        id: "customer",
        label: "The customer's side",
        items: [
          { id: "link", name: "A link to accept or decline" },
          { id: "verbal", name: "A yes on a call, recorded" },
          { id: "resend", name: "Send again" },
        ],
      },
      {
        id: "status",
        label: "Where each one stands",
        items: [
          { id: "states", name: "Draft, sent, accepted, declined, expired" },
          { id: "numbers", name: "Numbered, with a valid-until date" },
          { id: "revisions", name: "Every revision counted" },
          { id: "invoices", name: "Invoices, beside the quotations" },
        ],
      },
      {
        id: "auto",
        label: "What they can start",
        items: [
          { id: "q-triggers", name: "Quotation sent, accepted, declined and expiring" },
          { id: "i-triggers", name: "Invoice issued, paid and overdue" },
        ],
      },
    ],
    limits: [],
  },

  /* ==== 03 MARKETING ===================================================== */

  "whatsapp-marketing": {
    title: "Bulk WhatsApp messages, from approved templates.",
    lead: "Choose an approved template, choose who gets it, personalise it and send - then see how many were delivered and read.",
    groups: [
      {
        id: "steps",
        label: "In four steps",
        items: [
          { id: "template", name: "An approved template" },
          { id: "audience", name: "Who gets it" },
          { id: "personalise", name: "Personalised" },
          { id: "send", name: "Sent" },
        ],
      },
      {
        id: "who",
        label: "Who gets it",
        items: [
          { id: "groups", name: "Groups of your contacts" },
          { id: "optout", name: "Only customers who opted in" },
        ],
      },
      {
        id: "track",
        label: "What happened",
        items: [
          { id: "recipients", name: "Recipients" },
          { id: "delivered", name: "Delivered" },
          { id: "read", name: "Read" },
          { id: "status", name: "Status and date" },
        ],
      },
      {
        id: "templates",
        label: "Templates",
        items: [
          { id: "approved", name: "Approved by Meta" },
          { id: "kinds", name: "Utility or marketing" },
        ],
      },
    ],
    limits: [
      "Only approved templates can be sent in bulk, and only to customers who have opted in. Meta bills WhatsApp messages separately.",
    ],
  },

  "email-marketing": {
    title: "Email campaigns, through your own sending key.",
    lead: "Write the email in HTML with each customer's name in it, build the list it goes to, count it, and send.",
    groups: [
      {
        id: "write",
        label: "The email",
        items: [
          { id: "name", name: "Campaign name" },
          { id: "subject", name: "Subject line" },
          { id: "preview", name: "Preview text" },
          { id: "html", name: "Body in HTML" },
          { id: "merge", name: "Name, first name, company and email filled in" },
          { id: "unsubscribe", name: "Unsubscribe link" },
        ],
      },
      {
        id: "list",
        label: "Who it goes to",
        items: [
          { id: "build", name: "Build the list" },
          { id: "count", name: "Count them first" },
        ],
      },
      {
        id: "send",
        label: "Sending",
        items: [
          { id: "drafts", name: "Drafts" },
          { id: "now", name: "Send now" },
        ],
      },
    ],
    limits: [
      "Campaigns are sent through your own Resend account and key.",
    ],
  },

  forms: {
    title: "Forms that turn every answer into a contact.",
    lead: "Build a form, put it on your site or share its link, and every submission becomes a contact - and your Meta lead forms land the same way.",
    groups: [
      {
        id: "build",
        label: "Web forms you build",
        items: [
          { id: "pages", name: "Sections and pages" },
          { id: "types", name: "Text, choices and more" },
          { id: "required", name: "Required fields" },
          { id: "saves", name: "Each answer saved to a contact field" },
          { id: "preview", name: "A live preview" },
        ],
      },
      {
        id: "share",
        label: "On your site",
        items: [
          { id: "embed", name: "Embed it" },
          { id: "link", name: "Or share its link" },
          { id: "publish", name: "Publish or unpublish" },
          { id: "submissions", name: "Every submission kept" },
        ],
      },
      {
        id: "ads",
        label: "Your Meta lead forms",
        items: [
          { id: "import", name: "Every lead form on your page" },
          { id: "map", name: "Where each answer lands" },
          { id: "tags", name: "The tags a lead wears" },
          { id: "pipeline", name: "The pipeline its deal opens on" },
        ],
      },
      {
        id: "auto",
        label: "What they can start",
        items: [
          { id: "triggers", name: "Form submitted and ad lead received" },
          { id: "vars", name: "Ad, campaign and form names in the steps" },
        ],
      },
    ],
    limits: [
      "Ad forms are the lead forms on your connected Facebook page.",
    ],
  },

  /* THE MARKETING AI AGENT IS STUDIO'S AD SIDE - confirmed by the client
     on 2026-10-01. Studio is one agent; the Analytics AI Agent is its
     asking side. Every line here was read off Studio's own threads: asked
     in Tanglish with a poster attached, it asked its questions
     (ask_user), searched the targeting, created the campaign, ad set and
     ad - each "Created (Paused)" - and asked in the chat before going
     live (not through Approvals, so that is not claimed); it chose
     a lead form or a WhatsApp button; it stopped to say Meta needed a
     payment method, or its lead-ad terms, first; and asked afterwards it
     reported each ad's spend and clicks (meta_get_performance) and the
     contacts and won deals each brought in (ads_roas). Its "Meta Ads
     Manager" skill is the client's own, written with the Skill Creator,
     so it is not claimed here; Skills are on the Analytics AI Agent. */
  "marketing-ai-agent": {
    title: "Tell it what to advertise, and it builds the ad on Meta.",
    lead: "In Studio, attach your poster and say what you want in your own words. It asks what it needs, finds the audience, and builds the campaign, ad set and ad on your Meta ad account - paused, until you say it can run.",
    groups: [
      {
        id: "ask",
        label: "You ask in your own words",
        items: [
          { id: "languages", name: "Tamil, Tanglish or English" },
          { id: "poster", name: "Your poster or post attached" },
          { id: "questions", name: "Its questions before it builds" },
        ],
      },
      {
        id: "build",
        label: "It builds it on Meta",
        items: [
          { id: "audience", name: "The audience, and how many it reaches" },
          { id: "campaign", name: "Campaign, ad set and ad" },
          { id: "copy", name: "The ad copy" },
          { id: "kinds", name: "A WhatsApp button or a lead form" },
        ],
      },
      {
        id: "hold",
        label: "Nothing runs until you say so",
        items: [
          { id: "paused", name: "Everything made paused" },
          { id: "go-live", name: "It asks before it goes live" },
          { id: "meta-needs", name: "What Meta still needs from you" },
        ],
      },
      {
        id: "after",
        label: "Then, how each ad did",
        items: [
          { id: "spend", name: "Spend and clicks" },
          { id: "won", name: "The contacts and won deals it brought" },
          { id: "next", name: "What to change next" },
        ],
      },
    ],
    limits: [
      "It works on your own Meta ad account: Meta bills the ad spend, separately from MnT Future.",
      "It runs on the AI provider keys you add in Settings, and your provider bills you for them.",
    ],
  },

  /* ==== 04 AUTOMATION & INSIGHTS ========================================= */

  /* `triggers` holds one entry per kind of event, its `line` naming every
     trigger of that kind in the app's own words; the action groups hold one
     entry per action. All twenty-five triggers and nineteen actions are the
     app's, and the recipe on /features (operations/Recipe.tsx) runs its
     programs from these ids. */
  automation: {
    title: "Workflows that run the routine steps, without code.",
    lead: "Pick what starts it - a message, a new contact, a booking, a form, a quotation - and the steps that follow. Every run is logged.",
    groups: [
      {
        id: "triggers",
        label: "What starts it",
        /* " ·": the dot is held to the trigger before it, so a line can
           end on a dot but never start with one ("· Deal lost") - the same
           rule Names (kit/compact.tsx) keeps for capability lists. */
        items: [
          { id: "t-conversation", name: "A conversation", line: "New message received · First message from a contact · Keyword match · Button or list reply · No reply from you · Instagram comment" },
          { id: "t-contact", name: "A contact or a deal", line: "New contact created · Tag added · Deal created · Deal moved to stage · Deal won · Deal lost" },
          { id: "t-booking", name: "A booking", line: "Booking made · Cancelled · Completed · No-show" },
          { id: "t-form", name: "A form or an ad", line: "Form submitted · Ad lead received" },
          { id: "t-quote", name: "A quotation or an invoice", line: "Quotation sent · Accepted · Declined · Expiring · Invoice issued · Paid · Overdue" },
        ],
      },
      {
        id: "send",
        label: "Message the customer",
        items: [
          { id: "send-message", name: "Send message" },
          { id: "send-template", name: "Send template" },
          { id: "send-buttons", name: "Send buttons" },
          { id: "send-list", name: "Send list" },
          { id: "send-media", name: "Send media" },
        ],
      },
      {
        id: "wait",
        label: "Wait and listen",
        items: [
          { id: "wait", name: "Wait" },
          { id: "ask-wait", name: "Ask and wait for reply" },
          { id: "wait-reply", name: "Wait for reply" },
        ],
      },
      {
        id: "record",
        label: "Keep the record",
        items: [
          { id: "add-tag", name: "Add tag" },
          { id: "remove-tag", name: "Remove tag" },
          { id: "update-field", name: "Update contact field" },
          { id: "create-deal", name: "Create deal" },
          { id: "move-deal", name: "Move deal to stage" },
        ],
      },
      {
        id: "route",
        label: "Pass it on",
        items: [
          { id: "assign-conversation", name: "Assign conversation" },
          { id: "assign-lead", name: "Assign lead" },
          { id: "send-email", name: "Send email" },
          { id: "webhook", name: "Send webhook" },
          { id: "close", name: "Close conversation" },
        ],
      },
      {
        id: "decide",
        label: "Decide",
        items: [{ id: "condition", name: "Condition (if / else)" }],
      },
      {
        id: "logs",
        label: "Every run, logged",
        items: [
          { id: "log-status", name: "Result" },
          { id: "log-who", name: "Who it ran for" },
          { id: "log-trigger", name: "What started it" },
          { id: "log-steps", name: "The steps it ran" },
        ],
      },
    ],
    limits: [
      "Messages an automation sends keep to WhatsApp's rules: after 24 hours, only an approved template.",
    ],
  },

  /* `ask` names what the agent can look up; the recipe on /features
     (operations/Recipe.tsx) lights the ones each question reaches for. */
  "analytics-ai-agent": {
    title: "Ask your CRM a question in plain words.",
    lead: "It looks things up with real tools before it answers - your pipelines, deals, contacts, conversations and Meta ads - and tells you which tools it used. Anything it wants to change waits for a person.",
    groups: [
      {
        id: "ask",
        label: "Ask about",
        items: [
          { id: "ask-deals", name: "Pipelines and deals" },
          { id: "ask-contacts", name: "Contacts" },
          { id: "ask-conversations", name: "Conversations" },
          { id: "ask-ads", name: "Meta ads and how they are doing" },
        ],
      },
      {
        id: "tools",
        label: "It shows its work",
        items: [
          { id: "tools-real", name: "Looks it up before answering" },
          { id: "tools-named", name: "Names the tools it used" },
          { id: "threads", name: "Every question kept as a thread" },
        ],
      },
      {
        id: "skills",
        label: "Skills",
        items: [
          { id: "skill-write", name: "Write down how a job is done" },
          { id: "skill-load", name: "Used only when it applies" },
        ],
      },
      {
        id: "approvals",
        label: "Approvals",
        items: [{ id: "approve", name: "Anything it wants to change waits for a person" }],
      },
    ],
    limits: [
      "It runs on the AI provider keys you add in Settings, and your provider bills you for them.",
    ],
  },
};
