import type { features } from "@/lib/content/features";

/* ==========================================================================
   /features - WHAT EACH FEATURE SECTION SAYS
   --------------------------------------------------------------------------
   One entry per feature, keyed by the feature's slug from features.ts, and
   every line in it comes from that feature's own section of the
   requirements - §6 for One Inbox, §7 for the AI Sales Assistant, and so on
   down to §18. The home page NAMES these features; this is where each one
   is explained in full.

   THE CAPABILITIES ARE GROUPED, AND THE GROUPS ARE THE SECTION'S SHAPE.
   §6 lists sixteen capabilities for One Inbox in one column. Sixteen
   equal bullets is a specification sheet, and nobody reads one. Sorted the
   way a business owner would ask about them - where the messages come
   from, how you find one, what a conversation can hold, how the team
   shares the work - it is the same sixteen with a shape.

   EACH GROUP IS ALSO A PART OF THE PRODUCT PICTURE. A group's `id` names
   the zone of the drawing that shows it - the channel rail, the
   conversation list, the thread, the side panel - and every capability's
   `id` names the element inside that zone. That is why the channel filter
   sits with the channels: in the product it IS the channel rail, and a
   group that had to point at two ends of the screen could not be drawn as
   one place. See components/features/screens.

   `limits` IS NOT SMALL PRINT. Requirements §23 asks for the current
   product's limits to be stated plainly, and a page this detailed that
   never mentioned one would be the first thing a careful buyer stopped
   believing. Each limit sits with the feature it belongs to - calendar
   sync under the assistant that books, not in a list at the foot of the
   page. Every one comes from §14, §21, §22 or §23, and where the home
   page's FAQ already answers the same question, the wording matches it.

   §31 APPLIES TO EVERY LINE: a capability, never an outcome; "AI sales
   assistant", never "chatbot"; nothing suggesting it replaces a team.
   ========================================================================== */

export type FeatureSlug =
  (typeof features)["groups"][number]["items"][number]["slug"];

export type Capability = {
  /* The element in the product drawing that shows this capability. */
  id: string;
  name: string;
  /* Omitted for the assistant's setup list, which is ten things you fill
     in rather than ten things it does - they are shown as tags. */
  line?: string;
};

export type CapabilityGroup = {
  /* The zone of the product drawing that shows this group. */
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
  /* ---- One Inbox - requirements §6 ------------------------------------- */
  "one-inbox": {
    /* §6's own page heading, in the site's sentence case. */
    title: "Every conversation. One shared inbox.",
    lead: "WhatsApp Business, Instagram DMs, Facebook Messenger and your website chat arrive in one list, on your business's own WhatsApp number, and your whole team works from it.",
    groups: [
      {
        id: "channels",
        label: "Every channel",
        items: [
          {
            id: "whatsapp",
            name: "WhatsApp Business on your own number",
            /* §6 says the business's own number. It does NOT say the number
               a business already uses - §22 needs one not yet on WhatsApp -
               so this says "yours", and no more. */
            line: "Your business's own number, not a shared or borrowed one.",
          },
          {
            id: "instagram",
            name: "Instagram DMs",
            line: "Direct messages to your Instagram account, in the same list.",
          },
          {
            id: "messenger",
            name: "Facebook Messenger",
            line: "Messages to your Facebook page, beside everything else.",
          },
          {
            id: "webchat",
            name: "Website chat widget",
            line: "A chat window on your website that lands in the same inbox.",
          },
          {
            id: "channel-filter",
            name: "Channel filter",
            line: "Just WhatsApp, just Instagram, or everything together.",
          },
        ],
      },
      {
        id: "find",
        label: "Finding the right chat",
        items: [
          {
            id: "unread",
            name: "Unread filter",
            line: "Only the conversations nobody has opened yet.",
          },
          {
            id: "status",
            name: "Status filter",
            line: "Conversations filtered by where each one stands.",
          },
          {
            id: "waiting",
            name: "Waiting time",
            line: "How long each customer has been waiting for a reply.",
          },
        ],
      },
      {
        id: "media",
        label: "Voice notes, photos and history",
        items: [
          {
            id: "voice",
            name: "Voice notes",
            line: "A customer's voice note plays inside the conversation.",
          },
          {
            id: "ai-voice",
            name: "AI replies to voice notes",
            /* §6: "AI voice-note replies where configured". */
            line: "Where you have set it up, the assistant answers a voice note too.",
          },
          {
            id: "photos",
            name: "Photos",
            line: "Photos customers send, in the thread they sent them in.",
          },
          {
            id: "history",
            name: "Conversation history",
            line: "Everything said with a customer, kept in one thread.",
          },
        ],
      },
      {
        id: "team",
        label: "Working as a team",
        items: [
          {
            id: "shared",
            name: "Shared team inbox",
            line: "Everyone on your team works from the same list of conversations.",
          },
          {
            id: "assign",
            name: "Conversation assignment",
            line: "Each conversation can have an owner, so it is clear who replies.",
          },
          {
            id: "notes",
            name: "Internal notes",
            line: "Notes on a conversation that only your team can see.",
          },
          {
            id: "quick",
            name: "Saved quick replies",
            line: "The answers you give every day, saved and sent in a tap.",
          },
        ],
      },
    ],
    limits: [
      /* §23. "Not part of the current product guide" rather than "cannot":
         the guide not listing it is what is known. */
      "One WhatsApp number per workspace. More than one is not part of the current product guide.",
      /* §14 - approved templates for out-of-window messages. */
      "More than 24 hours after a customer's last message, WhatsApp only allows an approved template. That rule is Meta's.",
      /* §22, in the words of the home page's FAQ answer. */
      "Meta bills you for WhatsApp messaging on its own terms, separately from anything MnT Future charges.",
      /* §23 and §24, and the home page's FAQ answer again. */
      "There is no App Store or Play Store app. Your team uses the inbox in a mobile browser.",
    ],
  },

  /* ---- AI Sales Assistant - requirements §7 ------------------------------ */
  "ai-sales-assistant": {
    /* The landing page requirements' own heading for this feature (§12). */
    title: "An AI sales assistant that understands your business.",
    lead: "You set it up with your own services, prices, rules and tone. It replies in the customer's language, asks your questions, books appointments and follows up, and it hands anything it should not handle to your team.",
    groups: [
      {
        id: "setup",
        label: "What you set it up with",
        /* §7's configuration list, all ten, in its own order. */
        items: [
          { id: "name", name: "Business name" },
          { id: "tone", name: "Tone" },
          { id: "services", name: "Services" },
          { id: "prices", name: "Prices" },
          { id: "rules", name: "Rules" },
          { id: "packages", name: "Packages" },
          { id: "policies", name: "Policies" },
          { id: "documents", name: "Approved documents" },
          { id: "ad-rules", name: "Ad-specific instructions" },
          { id: "handoff-rules", name: "Handoff rules" },
        ],
      },
      {
        id: "talk",
        label: "How it talks",
        items: [
          {
            id: "language",
            name: "The customer's language",
            line: "It replies in the language the customer wrote in: Tamil, Tanglish, English, Hindi and more.",
          },
          {
            id: "approved",
            name: "Your information, nothing else",
            /* §7: "Uses approved business information". */
            line: "Its answers come from the business information you approve.",
          },
        ],
      },
      {
        id: "book",
        label: "Qualifying and booking",
        items: [
          {
            id: "qualify",
            name: "Your qualifying questions",
            line: "It asks the questions you set, and saves the answers to the contact.",
          },
          {
            id: "calendar",
            name: "Calendar availability",
            line: "It checks your calendar before it offers a time.",
          },
          {
            id: "booking",
            name: "Book, reschedule, cancel",
            line: "Customers can book, move or cancel an appointment in the chat.",
          },
          {
            id: "confirmed",
            name: "Confirmed before it says so",
            /* §7: "Checks actual system events before sending
               booking-related replies" - said the way a customer would
               notice it. */
            line: "It checks the booking really went through before it tells the customer.",
          },
        ],
      },
      {
        id: "handoff",
        label: "Following up and handing over",
        items: [
          {
            id: "follow-up",
            name: "Follow-ups after silence",
            line: "When a customer goes quiet, it follows up.",
          },
          {
            id: "handover",
            name: "Handoff to your team",
            line: "Complaints, payments, legal questions and anything else you choose go to a person.",
          },
        ],
      },
    ],
    limits: [
      /* §7 and §17: never suggest it replaces staff. The home page's FAQ
         says the same thing at more length. */
      "It works alongside your team, not instead of it. Anything it should not handle goes to a person.",
      "It answers from the information you approve, so keep your prices and policies up to date.",
      /* §7: "and other supported languages" - no fifth one is named. */
      "Tamil, Tanglish, English and Hindi are among the languages it supports. Ask about any other you need.",
      /* §21 and §23, in the words of the home page's FAQ answer. */
      "It books into iSuite AI's own calendars. It does not sync with Google Calendar or Outlook.",
    ],
  },

  /* ---- Contacts and Custom Fields - requirements §10 ------------------- */
  contacts: {
    title: "Everything about a customer, on one record.",
    lead: "Their number, where they came from and every conversation on every channel, with the fields your business decides are worth keeping - including the ones the assistant asks for.",
    groups: [
      {
        id: "record",
        label: "The contact record",
        items: [
          {
            id: "identity",
            name: "Name, number and email",
            line: "The basics, kept once, for everyone on your team.",
          },
          {
            id: "company",
            name: "Company",
            line: "For customers who come to you on behalf of a business.",
          },
          {
            id: "source",
            name: "Source",
            /* §8: "A clicked ad can be recorded against the contact". */
            line: "Where the enquiry came from - a channel, a form or the ad they clicked.",
          },
          {
            id: "notes",
            name: "Notes",
            line: "What your team learns about the customer, written where everyone can find it.",
          },
        ],
      },
      {
        id: "history",
        label: "Every conversation with them",
        items: [
          {
            id: "full-history",
            name: "Full conversation history",
            line: "Everything said with the customer, in order.",
          },
          {
            id: "cross-channel",
            name: "Across every channel",
            line: "WhatsApp, Instagram, Messenger and your website, on the one record.",
          },
        ],
      },
      {
        id: "fields",
        label: "Fields you decide",
        /* §10's five kinds of custom field, in its own order. */
        items: [
          {
            id: "contact-fields",
            name: "Contact fields",
            line: "Your own details about the customer, like the branch they visit.",
          },
          {
            id: "deal-fields",
            name: "Deal fields",
            line: "Details that belong to one deal rather than to the person.",
          },
          {
            id: "shared-fields",
            name: "Fields on contacts and deals",
            line: "Details kept on the contact and on their deals together.",
          },
          {
            id: "ask-fields",
            name: "Fields the assistant asks for",
            line: "It asks your questions in the chat and fills these in from the answers.",
          },
          {
            id: "required-fields",
            name: "Required before a deal opens",
            line: "Fields that must be filled in before a deal can be opened.",
          },
        ],
      },
      {
        id: "segments",
        label: "Tags and segments",
        /* §10's uses for tags and segments, all five. */
        items: [
          {
            id: "filter",
            name: "Filtering",
            line: "Narrow any list to the customers with a tag.",
          },
          {
            id: "seg-follow-ups",
            name: "Follow-ups",
            line: "Choose who to follow up by tag or segment.",
          },
          {
            id: "seg-broadcasts",
            name: "Broadcasts",
            line: "Send an approved template to a segment you pick.",
          },
          {
            id: "groups",
            name: "Customer groups",
            line: "Group customers the way your business thinks about them.",
          },
          {
            id: "qualification",
            name: "Lead qualification",
            line: "Mark how far a lead has come, using your own tags.",
          },
        ],
      },
    ],
    limits: [
      /* §23 - no lead scoring, stated with what does the job instead. */
      "There is no hot, warm or cold lead scoring in the current product guide. Your own tags and fields do that job.",
      /* §16 - data ownership and the Contacts CSV export. */
      "Your contacts belong to your business, and they can be exported as a CSV.",
    ],
  },

  /* ---- Sales Pipeline - requirements §11 -------------------------------- */
  "sales-pipeline": {
    /* The landing page requirements' own heading and copy (§13). */
    title: "Every lead has a place in your sales pipeline.",
    lead: "Every enquiry can become a contact and a deal. Your team can manage owners, stages, deal values, expected close dates, notes and won/lost reasons from a shared sales board.",
    groups: [
      {
        id: "board",
        label: "Your boards and stages",
        items: [
          {
            id: "boards",
            name: "More than one board",
            line: "A board for each way you sell - new patients on one, treatments on another.",
          },
          {
            id: "stages",
            name: "Your own stages",
            /* §11: the stages are examples; businesses configure their own. */
            line: "New Enquiry, Qualified, Appointment Booked - or whatever your business calls them.",
          },
          {
            id: "drag",
            name: "Drag and drop",
            line: "Move a deal to its next stage by dragging it there.",
          },
        ],
      },
      {
        id: "deal",
        label: "Every deal",
        items: [
          {
            id: "value",
            name: "Deal value and currency",
            line: "What the deal is worth, in the currency you sell in.",
          },
          {
            id: "owner",
            name: "Deal owner",
            line: "One person responsible for every deal.",
          },
          {
            id: "close-date",
            name: "Expected close date",
            line: "When the deal should close, so late ones show up.",
          },
          {
            id: "deal-notes",
            name: "Notes",
            line: "What has been said and agreed, on the deal itself.",
          },
          {
            id: "answers",
            name: "Qualifying answers",
            line: "The answers to your questions, saved on the deal.",
          },
        ],
      },
      {
        id: "close",
        label: "Won, lost and why",
        items: [
          {
            id: "won",
            name: "Won reasons",
            line: "Why a deal was won, recorded when it closes.",
          },
          {
            id: "lost",
            name: "Lost reasons",
            line: "Why a deal was lost - recorded, because losing happens.",
          },
          {
            id: "one-deal",
            /* "per board" is §11's own, and without it the name says a
               customer can only ever have one deal open. */
            name: "One open deal per customer, per board",
            line: "A customer has one open deal on a board at a time.",
          },
        ],
      },
      {
        id: "analytics",
        label: "Seeing the whole board",
        items: [
          {
            id: "pipeline-analytics",
            name: "Pipeline analytics",
            line: "How deals are moving through your stages.",
          },
          {
            id: "stage-contents",
            name: "What is in each stage",
            line: "Every deal waiting in a stage, listed.",
          },
          {
            id: "past-close",
            name: "Deals past their close date",
            line: "The ones that should have closed by now, pulled out.",
          },
        ],
      },
    ],
    limits: [
      /* §11 - the stages are examples. */
      "The stages shown are examples. You set your own.",
      /* §23 - quotes, invoices, e-signatures. */
      "Quotes, invoices and e-signatures are not part of the current product guide.",
    ],
  },

  /* ---- Follow-ups - requirements §12 ------------------------------------ */
  "follow-ups": {
    /* §12's positioning, and the landing page's benefit 4: "do not depend
       only on memory". */
    title: "Follow-ups that do not depend on memory.",
    lead: "Every follow-up has a due date and an owner. Due and overdue lists show what is waiting, owners are reminded, and the follow-ups the assistant promises in a chat are written down.",
    groups: [
      {
        id: "lists",
        label: "Due and overdue",
        items: [
          {
            id: "due-date",
            name: "A due date on every follow-up",
            line: "Each follow-up says when it has to happen.",
          },
          {
            id: "due-list",
            name: "Due list",
            line: "What is due today and next, in one list.",
          },
          {
            id: "overdue-list",
            name: "Overdue list",
            line: "The ones that slipped, kept apart so they are seen first.",
          },
        ],
      },
      {
        id: "remind",
        label: "Reminders",
        items: [
          {
            id: "owner-reminders",
            name: "Owner reminders",
            line: "The person a follow-up belongs to is reminded when it is due.",
          },
          {
            id: "promised",
            name: "Follow-ups the assistant promised",
            /* §12: "AI-written promised follow-ups". */
            line: "When the assistant promises something in a chat, the follow-up is written down.",
          },
        ],
      },
      {
        id: "track",
        label: "Keeping track",
        items: [
          {
            id: "per-customer",
            name: "Follow-ups per customer",
            line: "Every follow-up with one customer, on their record.",
          },
          {
            id: "on-time",
            name: "On-time follow-up rate",
            line: "How often follow-ups happen when they were due.",
          },
        ],
      },
    ],
    limits: [
      /* §14 - out-of-window WhatsApp messages need templates. */
      "More than 24 hours after a customer's last message, a WhatsApp follow-up has to be an approved template. That rule is Meta's.",
    ],
  },

  /* ---- Appointments - requirements §9 ----------------------------------- */
  appointments: {
    title: "Bookings that follow your calendar.",
    /* The landing page requirements' copy (§14), with the settings that
       make it true. */
    lead: "Customers book, reschedule or cancel using your configured calendars and availability - your working hours, buffers and notice - with a confirmation and reminders before they come.",
    groups: [
      {
        id: "calendars",
        label: "Your calendars",
        items: [
          {
            id: "per-person",
            name: "A calendar per person",
            line: "Each member of your team has their own calendar.",
          },
          {
            id: "per-service",
            name: "A calendar per service",
            line: "Services book into their own calendars, at their own length.",
          },
          {
            id: "hours",
            name: "Working hours",
            line: "Only the hours you are open can be booked.",
          },
          {
            id: "timezone",
            name: "Host timezone",
            line: "Times are kept in the host's own timezone.",
          },
        ],
      },
      {
        id: "rules",
        label: "Booking rules",
        items: [
          {
            id: "buffers",
            name: "Buffers",
            line: "Time kept free between one booking and the next.",
          },
          {
            id: "notice",
            name: "Minimum notice",
            line: "How soon before a slot it can still be booked.",
          },
          {
            id: "horizon",
            name: "Booking horizon",
            line: "How far ahead customers can book.",
          },
        ],
      },
      {
        id: "messages",
        label: "Confirmations and reminders",
        items: [
          {
            id: "confirmation",
            name: "Booking confirmation",
            line: "Sent as soon as the booking is made.",
          },
          {
            id: "remind-24",
            name: "24-hour reminder",
            line: "A reminder the day before.",
          },
          {
            id: "remind-1",
            name: "1-hour reminder",
            line: "A reminder shortly before they are due.",
          },
          {
            id: "thanks",
            name: "Thank-you message",
            line: "A message after the visit.",
          },
          {
            id: "missed",
            name: "Missed booking message",
            line: "A message to a customer whose booking was missed.",
          },
        ],
      },
      {
        id: "changes",
        label: "Changes and no-shows",
        items: [
          {
            id: "reschedule",
            name: "Reschedule link",
            line: "Customers move their own booking from a link.",
          },
          {
            id: "cancel",
            name: "Cancellation link",
            line: "Or cancel it, the same way.",
          },
          {
            id: "no-show",
            name: "No-shows marked by your team",
            line: "A team member marks a booking as a no-show.",
          },
          {
            id: "no-show-rate",
            name: "No-show rate per host",
            line: "How often each host's bookings are missed.",
          },
        ],
      },
    ],
    limits: [
      /* §9 - "Do not claim automatic no-show detection." */
      "No-shows are marked by a person. There is no automatic no-show detection.",
      /* §21 and §23, in the words of the home page's FAQ answer. */
      "Bookings go into iSuite AI's own calendars. It does not sync with Google Calendar or Outlook.",
    ],
  },

  /* ---- Meta Ads - requirements §15 --------------------------------------
     The home page's Meta ads section is ONE thing this feature does - the
     AI building a campaign from a poster, with the owner's approval. This
     is all of it, and none of that story is told again here. */
  "meta-ads": {
    /* The landing page requirements' own heading for it (§15). */
    title: "Connect your ads to the enquiries they generate.",
    lead: "Campaigns, ad sets, ads and lead forms are built in iSuite AI and go live only when the owner approves them. Each lead is traced to the campaign and ad it came from, and each ad shows what it brought in, down to the deals it won.",
    groups: [
      {
        id: "build",
        label: "Built in iSuite AI",
        items: [
          { id: "campaigns", name: "Campaigns" },
          { id: "ad-sets", name: "Ad sets" },
          { id: "ads", name: "Ads" },
          { id: "lead-forms", name: "Lead forms" },
        ],
      },
      {
        id: "control",
        label: "Your say before it runs",
        items: [
          {
            id: "approval",
            name: "Owner approval",
            line: "Nothing goes live until the owner approves it.",
          },
          {
            id: "cap",
            name: "Daily budget cap",
            line: "The most an ad can spend in a day, set before it runs.",
          },
        ],
      },
      {
        id: "results",
        label: "What each ad brought in",
        /* §15's list, in its order: the first four from Meta, the last
           three from the pipeline. */
        items: [
          { id: "spend", name: "Spend" },
          { id: "impressions", name: "Impressions" },
          { id: "clicks", name: "Clicks" },
          { id: "leads", name: "Leads" },
          { id: "won", name: "Won deals" },
          { id: "value", name: "Deal value" },
          { id: "cash", name: "Cash collected" },
        ],
      },
      {
        id: "tracking",
        label: "Tracked both ways",
        /* §15's lead source tracking, and its Conversions API feedback -
           which is the same link run the other way. */
        items: [
          { id: "lead-ad-source", name: "Lead ad source" },
          { id: "campaign", name: "Campaign" },
          { id: "ad", name: "Ad" },
          { id: "ctwa-source", name: "Click-to-WhatsApp source" },
          { id: "linked", name: "Linked to the contact and deal" },
          {
            id: "capi",
            name: "Qualified leads sent back to Meta",
            line: "Through Meta's Conversions API.",
          },
        ],
      },
    ],
    limits: [
      /* §22's approval for the customer's own ad account, then the §15
         disclaimer - verbatim, and mandatory. */
      "Ads run on your own Meta ad account, which Meta has to approve for these features. Meta advertising charges and Meta approval requirements are separate from MnT Future charges and timelines.",
      /* §15's "do not promise" list, turned round into what is true. */
      "The figures show what your ads did, where the data is available. They are not a promise of leads, sales or lower ad costs.",
    ],
  },

  /* ---- Broadcasts and Templates - requirements §14 ----------------------- */
  broadcasts: {
    title: "Approved templates, sent to the customers you choose.",
    lead: "Write a WhatsApp template, submit it to Meta and follow its approval. Once approved it goes to a segment, a tag, a group or a list, straight away or on a schedule, and you can see it delivered, read and replied to. Anyone who has opted out is skipped.",
    groups: [
      {
        id: "templates",
        label: "Templates",
        items: [
          { id: "create", name: "Create WhatsApp templates" },
          { id: "submit", name: "Submit to Meta" },
          { id: "approval", name: "Track approval" },
        ],
      },
      {
        id: "audience",
        label: "Who it goes to",
        items: [
          { id: "segments", name: "Segments" },
          { id: "tags", name: "Tags" },
          { id: "filters", name: "Groups or filters" },
          { id: "lists", name: "Uploaded lists, where supported" },
        ],
      },
      {
        id: "timing",
        label: "When it goes",
        items: [
          { id: "now", name: "Send immediately" },
          { id: "schedule", name: "Schedule a broadcast" },
        ],
      },
      {
        id: "results",
        label: "What happened",
        items: [
          { id: "delivered", name: "Delivery" },
          { id: "read", name: "Reads" },
          { id: "replied", name: "Replies" },
          { id: "opt-outs", name: "Opt-outs skipped automatically" },
        ],
      },
    ],
    limits: [
      /* §14's first two rules, kept apart as §14 keeps them: opt-in
         always, templates outside the window - the same 24-hour rule
         Follow-ups states. Run together they read as if opt-in only
         mattered after 24 hours. */
      "Customers must have opted in, and outside the 24 hours after their last message only approved templates can be sent.",
      /* §14's last two, in the words of the home page's FAQ answer. */
      "Meta bills you for WhatsApp messaging on its own terms, separately from anything MnT Future charges. Messaging is not unlimited or free.",
    ],
  },

  /* ---- Lead Capture - requirements §8 ------------------------------------ */
  "lead-capture": {
    title: "Every way a lead arrives, kept on one record.",
    lead: "Leads from Meta ads and forms, click-to-WhatsApp ads, your own forms and booking pages, Instagram comments and website chat each become a contact with a deal, tags and the ad they came from. A customer who writes again another way is matched to the record they already have.",
    groups: [
      {
        id: "sources",
        label: "Where leads come in",
        /* §8's eight, in its order. */
        items: [
          { id: "lead-ads", name: "Meta lead ads" },
          { id: "instant-forms", name: "Meta instant forms" },
          { id: "ctwa", name: "Click-to-WhatsApp ads" },
          { id: "hosted-forms", name: "Hosted forms" },
          { id: "site-forms", name: "Forms on your website" },
          { id: "booking-pages", name: "Booking pages" },
          { id: "comment-keywords", name: "Instagram comment keywords" },
          { id: "site-chat", name: "Website chat" },
        ],
      },
      {
        id: "handling",
        label: "What happens to each lead",
        items: [
          { id: "contact", name: "Contact created" },
          { id: "deal", name: "Deal opened" },
          { id: "tags", name: "Tags applied" },
          { id: "ad-info", name: "Ad information saved" },
        ],
      },
      {
        id: "one-record",
        label: "One customer, one record",
        items: [
          { id: "duplicates", name: "Duplicate contacts matched" },
          { id: "cross-channel", name: "One record across channels" },
          { id: "missed", name: "Missed Meta leads pulled in later" },
        ],
      },
    ],
    limits: [
      /* §8: "where supported". */
      "Missed Meta leads can be pulled in later only where Meta supports it.",
      /* §22: the customer's own number and ad account. */
      "Meta lead ads, instant forms and click-to-WhatsApp ads come in through your own Meta ad account and WhatsApp Business number, once they are connected.",
    ],
  },

  /* ---- Automations - requirements §13 ------------------------------------
     Ten triggers and fourteen actions, all of them, and the log every run
     leaves. The actions are grouped by where they land. */
  automations: {
    title: "When this happens, do that. No code.",
    lead: "Choose what starts an automation - a message, a keyword, a new lead, a booking, a customer gone quiet - and what it does next: reply, send a template, wait, branch, assign, tag, move a deal, email or call a webhook. Every run is logged, step by step.",
    groups: [
      {
        id: "triggers",
        label: "When",
        items: [
          { id: "new-message", name: "New message" },
          { id: "keyword", name: "Keyword" },
          { id: "new-contact", name: "New contact" },
          { id: "tag-added", name: "Tag added" },
          { id: "form-submitted", name: "Form submitted" },
          { id: "meta-ad-lead", name: "Meta ad lead" },
          { id: "booking-made", name: "Booking made" },
          { id: "booking-missed", name: "Booking missed" },
          { id: "stage-movement", name: "Stage movement" },
          { id: "quiet", name: "Customer becomes quiet" },
        ],
      },
      {
        id: "to-customer",
        label: "Then, to the customer",
        items: [
          { id: "send-message", name: "Send message" },
          { id: "send-template", name: "Send approved template" },
          { id: "send-image", name: "Send image" },
          { id: "send-file", name: "Send file" },
          { id: "ask-wait", name: "Ask and wait" },
        ],
      },
      {
        id: "flow",
        label: "Then, in the flow",
        items: [
          { id: "wait", name: "Wait for a period" },
          { id: "branch", name: "Branch by condition" },
        ],
      },
      {
        id: "for-team",
        label: "Then, for your team",
        items: [
          { id: "assign", name: "Assign conversation" },
          { id: "add-tag", name: "Add tag" },
          { id: "update-field", name: "Update field" },
          { id: "move-deal", name: "Move deal" },
          { id: "notify", name: "Notify colleague" },
        ],
      },
      {
        id: "elsewhere",
        label: "Then, elsewhere",
        items: [
          { id: "email", name: "Send email" },
          { id: "webhook", name: "Trigger webhook" },
        ],
      },
      {
        id: "logs",
        label: "Every run, logged",
        items: [
          { id: "log-trigger", name: "Trigger" },
          { id: "log-steps", name: "Steps" },
          { id: "log-result", name: "Action result" },
          { id: "log-success", name: "Success or failure" },
          { id: "log-error", name: "Error details" },
        ],
      },
    ],
    limits: [
      /* §14's window rule, which binds an automation's messages too. */
      "Outside the 24 hours after a customer's last message, an automation can send them only an approved template.",
    ],
  },

  /* ---- Reports and Dashboard - requirements §16 --------------------------
     All fifteen of §16's figures, by what they measure. None of them is
     shown as a number anywhere on this page: the home page's hero carries
     the one real dashboard screenshot. */
  reports: {
    /* Not "on one dashboard": the chapter's card for this feature ends
       with those words, a screen above. */
    title: "How the business is doing, at a glance.",
    lead: "Active and waiting conversations, new contacts, open deals and pipeline value, today's bookings, first-response times, and how many leads the assistant handled beside your team - with contacts and form submissions exported whenever you want them.",
    groups: [
      {
        id: "conversations",
        label: "Conversations",
        items: [
          { id: "active", name: "Active conversations" },
          { id: "waiting", name: "Waiting conversations" },
          { id: "age", name: "Conversation age" },
          { id: "sent", name: "Messages sent" },
          { id: "first-response", name: "Average first-response time" },
          { id: "response-performance", name: "Response-time performance" },
        ],
      },
      {
        id: "leads",
        label: "Leads",
        items: [
          { id: "new-contacts", name: "New contacts" },
          { id: "ai-handled", name: "AI-handled leads" },
          { id: "human-handled", name: "Human-handled leads" },
        ],
      },
      {
        id: "sales",
        label: "Deals and bookings",
        items: [
          { id: "open-deals", name: "Open deals" },
          { id: "pipeline-value", name: "Pipeline value" },
          { id: "deals", name: "Deals" },
          { id: "wins", name: "Wins" },
          { id: "deal-value", name: "Deal value" },
          { id: "bookings-today", name: "Today's bookings" },
        ],
      },
      {
        id: "exports",
        label: "Exports",
        items: [
          { id: "contacts-csv", name: "Contacts CSV" },
          { id: "forms-csv", name: "Form submissions CSV" },
        ],
      },
    ],
    limits: [
      /* §23: no complete end-to-end funnel report in a single view. */
      "There is no single report that follows a lead from the first ad to the final sale in one view.",
      /* §16's data ownership. */
      "The data behind the dashboard belongs to your business.",
    ],
  },

  /* ---- Team and Permissions - requirements §17 ---------------------------
     THE VERIFIED MANAGER IS NAMED, AND ITS ACTIONS ARE NOT. §17 lists them
     ("read numbers, set follow-ups, look up customers...") and then says to
     publish the exact actions only after product confirmation. Until that
     comes, the capability is here with §17's own words for it -
     "supported actions" - and nothing more. */
  "team-permissions": {
    title: "Everyone sees what they should, and nothing else.",
    lead: "Give each person a role - owner, admin, employee, viewer or one you define - and set exactly what they can do and whose records they can see. Every action, the assistant's included, is on record.",
    groups: [
      {
        id: "roles",
        label: "Roles",
        items: [
          { id: "owner", name: "Owner" },
          { id: "admin", name: "Admin" },
          { id: "employee", name: "Employee" },
          { id: "viewer", name: "Viewer" },
          { id: "custom", name: "Custom roles" },
        ],
      },
      {
        id: "scope",
        label: "What each can do",
        items: [
          { id: "exact", name: "Exact permissions" },
          { id: "own", name: "Own records only" },
          { id: "assigned", name: "Assigned records only" },
        ],
      },
      {
        id: "together",
        label: "Working together",
        items: [
          { id: "assignment", name: "Conversation assignment" },
          { id: "notes", name: "Internal notes" },
          {
            id: "manager",
            name: "Verified manager on WhatsApp",
            line: "A verified manager can take supported actions from WhatsApp.",
          },
        ],
      },
      {
        id: "record",
        label: "On record",
        items: [
          { id: "audit", name: "Audit trail" },
          { id: "ai-history", name: "AI action history" },
          { id: "refused", name: "Refused-action history" },
        ],
      },
    ],
    limits: [],
  },

  /* ---- Chat Commerce in India - requirements §18 ------------------------- */
  "chat-commerce": {
    title: "Sell inside the chat, from your own catalogue.",
    lead: "Your Meta catalogue syncs into iSuite AI, products go to the customer as cards in the chat, a WhatsApp cart becomes an order in your CRM, and payment is requested and recorded in the same conversation.",
    groups: [
      {
        id: "catalogue",
        label: "Catalogue and cart",
        items: [
          { id: "sync", name: "Meta catalogue sync" },
          { id: "cards", name: "Product cards in chat" },
          { id: "cart-order", name: "WhatsApp cart to CRM order" },
        ],
      },
      {
        id: "payment",
        label: "Payment",
        items: [
          { id: "request", name: "Payment request in chat" },
          { id: "recorded", name: "Payment confirmation recorded" },
        ],
      },
    ],
    limits: [
      /* §18's "do not claim" list, said as what is true. */
      "It records orders and payments. It is not accounting software: no quotes, invoices, e-signatures or the rest of an ERP.",
    ],
  },
};
