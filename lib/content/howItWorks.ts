import type { FeatureSlug } from "@/lib/content/featureDetails";

/* ==========================================================================
   /how-it-works - THE WORDS
   --------------------------------------------------------------------------
   Requirements §19: the complete journey of one enquiry, thirteen steps,
   from the ad a customer clicks to the won deal sent back to Meta.
   /features tells it feature by feature, and the six-step version the home
   page once had (journey.ts) is shown nowhere; this page follows ONE
   enquiry the whole way, and says who does each step.

   THE CUSTOMER IS ANAND R., the site's own - the WhatsApp customer on the
   home page, who came in through the Dental check-up click-to-WhatsApp ad
   on /features. The team is Sara and Ravi, who work that inbox on both.
   No pronoun is used for anyone in the journey.

   CLAIM DISCIPLINE, AS EVERYWHERE: "AI sales assistant", never a promise
   that it replaces anyone; "can be booked", "can be assigned", "where
   configured" kept wherever §19 says them; no figures.

   EVERY STEP AND EVERY RULE LINKS TO ITS FEATURE: `feature` is the slug
   of the /features section that explains it (§27, internal linking), so
   /features#appointments. Each is the one section whose own words cover
   the step - the hand-over to Sara is the assistant's, whose hand-off
   rules name payments; the 24-hour rule is Follow-ups', which states it
   for exactly the step it is pinned to.
   ========================================================================== */

export const howItWorksHero = {
  eyebrow: "One enquiry, start to finish",

  /* The two-part shape every sky hero on this site has, with its own
     italic word. The space after "every" is non-breaking so a phone never
     sets "enquiry." alone under a bare "every" - see featuresHero. */
  headline: [
    { text: "What happens to" },
    { text: "every ", accent: "enquiry." },
  ],

  lead: "Follow one enquiry from the ad a customer clicks to a deal won or lost: what the AI sales assistant does, where your team takes over, and what iSuite AI keeps on record.",
} as const;

/* ---- THE CAST ---------------------------------------------------------------
   Everyone the journey passes through, in the order it first reaches them.
   `passes` is what the enquiry has become by the time it leaves them - the
   hero's picture carries it from one to the next. */

export type CastId = "customer" | "assistant" | "team" | "system" | "meta";

export const cast: readonly {
  id: CastId;
  role: string;
  title: string;
  line: string;
  passes: string;
}[] = [
  {
    id: "customer",
    role: "The customer",
    title: "Anand R.",
    line: "Clicks your Dental check-up ad and writes to you on WhatsApp.",
    passes: "Saturday check-up ku slot irukka?",
  },
  {
    id: "assistant",
    role: "AI sales assistant",
    title: "Replies first",
    line: "Answers in the customer's language from your prices and rules, asks your questions, and can book the visit.",
    passes: "Replied in Tanglish",
  },
  {
    id: "team",
    role: "Your team",
    title: "Sara and Ravi",
    line: "Pick up the conversation when it is handed over, and take the deal through your stages to won or lost.",
    passes: "Handed to Sara",
  },
  {
    id: "system",
    role: "iSuite AI",
    title: "Keeps the record",
    line: "The contact and the deal, every answer, booking and follow-up - and your reports.",
    passes: "Contact and deal saved",
  },
  {
    id: "meta",
    role: "Meta",
    title: "Where the ad ran",
    line: "Sends the lead in, and can hear back which leads were qualified and which were won, where configured.",
    passes: "Qualified lead sent back",
  },
];

/* ---- THE JOURNEY --------------------------------------------------------------
   §19's thirteen steps, in its order, as they happen to Anand's enquiry
   over one week. Each carries what the journey is drawn from:

     actor   who does it - one of the cast
     when    the day and time, and they only ever move forward: Monday
             morning for the first eight, Thursday's follow-up, Saturday's
             visit and what follows it
     chat    what Anand sees on WhatsApp, if anything - most of the
             journey happens where the customer never looks
     record  what the team sees change in iSuite AI

   THE DETAILS ARE THE SITE'S OWN. The ad is the Dental check-up
   click-to-WhatsApp ad /features traces; the answers are the two its
   Sales chapter shows saved, "First visit" and "Anna Nagar"; Saturday at
   11:00 is the slot the home page's assistant offers Anand; the stages
   are §11's own examples. No figure, no price, no promised outcome.

   HANDING OVER IS WRITTEN INTO THE JOURNEY rather than said beside it:
   a question about paying goes to Sara (§7 lists payments among what the
   assistant hands off), and Sara and Ravi carry the deal from there. */

export type PhaseId = "arrive" | "answer" | "book" | "close" | "learn";

export const phases: readonly { id: PhaseId; label: string }[] = [
  { id: "arrive", label: "Arrive" },
  { id: "answer", label: "Answer" },
  { id: "book", label: "Book and hand over" },
  { id: "close", label: "Manage and close" },
  { id: "learn", label: "Learn" },
];

export type DayId = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const days: readonly DayId[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type Bubble = { from: "customer" | "business"; text: string };

export type Step = {
  n: number;
  phase: PhaseId;
  actor: CastId;
  title: string;
  line: string;
  day: DayId;
  time: string;
  chat: readonly Bubble[];
  record: readonly string[];
  /* Where the enquiry changes hands in a way worth naming. */
  handover?: string;
  /* The /features section the step's explaining line links to. */
  feature: FeatureSlug;
};

export const steps: readonly Step[] = [
  {
    n: 1,
    phase: "arrive",
    actor: "customer",
    title: "Anand taps your ad",
    line: "The Dental check-up ad carries a WhatsApp button, and one tap opens a chat with your business. A customer can just as well message you, or fill in your form.",
    day: "Mon",
    time: "09:26",
    chat: [{ from: "customer", text: "Saturday check-up ku slot irukka?" }],
    record: ["New conversation · WhatsApp"],
    feature: "lead-capture",
  },
  {
    n: 2,
    phase: "arrive",
    actor: "system",
    title: "It lands in your inbox",
    line: "In the one inbox, with the ad it came from saved against it. A contact and a deal can open at the same moment.",
    day: "Mon",
    time: "09:26",
    chat: [],
    record: ["Contact created", "Deal · New Enquiry", "Source: Dental check-up ad"],
    feature: "one-inbox",
  },
  {
    n: 3,
    phase: "answer",
    actor: "assistant",
    title: "The assistant replies in Tanglish",
    line: "In the language Anand wrote in, from the prices, timings and rules you gave it - so the customer has an answer instead of a wait.",
    day: "Mon",
    time: "09:26",
    chat: [{ from: "business", text: "Vanakkam Anand! Saturday-la slots irukku." }],
    record: ["Replied by the AI sales assistant"],
    feature: "ai-sales-assistant",
  },
  {
    n: 4,
    phase: "answer",
    actor: "assistant",
    title: "It asks your questions",
    line: "The ones you set it to ask, one at a time in the chat - here, whether it is a first visit and which branch suits.",
    day: "Mon",
    time: "09:27",
    chat: [
      { from: "business", text: "First visit-aa? Anna Nagar-aa, T. Nagar-aa?" },
      { from: "customer", text: "Aamaa, first visit. Anna Nagar." },
    ],
    record: ["Asked: first visit, branch"],
    feature: "ai-sales-assistant",
  },
  {
    n: 5,
    phase: "answer",
    actor: "system",
    title: "The answers are saved",
    line: "Onto Anand's contact and deal, in the fields you set up. Nobody copies anything out of the chat.",
    day: "Mon",
    time: "09:28",
    chat: [],
    record: ["First visit", "Branch: Anna Nagar", "Deal → Qualified"],
    feature: "contacts",
  },
  {
    n: 6,
    phase: "book",
    actor: "assistant",
    title: "A visit is booked",
    line: "The assistant checks your calendar and can book the time that suits - Saturday at 11:00 - with a reminder before it.",
    day: "Mon",
    time: "09:30",
    chat: [{ from: "business", text: "Booked: Saturday, 11:00 at Anna Nagar. We'll send a reminder." }],
    record: ["Calendar · Sat 11:00 · Anna Nagar", "Deal → Appointment Booked"],
    feature: "appointments",
  },
  {
    n: 7,
    phase: "book",
    actor: "team",
    title: "Sara takes over",
    line: "Anand asks about paying in instalments - one of the questions your rules hand to a person. The conversation goes to Sara, with everything already in it.",
    day: "Mon",
    time: "09:34",
    chat: [
      { from: "customer", text: "EMI option irukka?" },
      { from: "business", text: "Sara from our team will help you with that." },
    ],
    record: ["Assigned to Sara · payment question"],
    handover: "Handed to Sara",
    feature: "ai-sales-assistant",
  },
  {
    n: 8,
    phase: "close",
    actor: "team",
    title: "Sara works the record",
    line: "The ad, the answers, the booking and the chat are all on one contact and deal. Sara replies, and leaves Ravi an internal note.",
    day: "Mon",
    time: "11:20",
    chat: [{ from: "business", text: "Hi Anand, Sara here - yes, we can go through EMI at your visit." }],
    record: ["Note for Ravi: asked about EMI"],
    feature: "contacts",
  },
  {
    n: 9,
    phase: "close",
    actor: "team",
    title: "The follow-up comes due",
    /* Anand last wrote on Monday, so by Thursday WhatsApp's 24 hours are
       long gone: the follow-up can only be an approved template - the
       rule Good to know pins to this step. WhatsApp shows a template as
       an ordinary message, so it is the team's side that says so. */
    line: "Sara set it on Monday, and on Thursday it is on Sara's due list. Anand last wrote on Monday, so the follow-up goes as an approved template. If a customer goes quiet, the assistant can follow up the same way.",
    day: "Thu",
    time: "10:00",
    chat: [
      { from: "business", text: "Just checking - Saturday 11:00 still good?" },
      { from: "customer", text: "Yes, varen!" },
    ],
    record: ["Follow-up · Thu 10:00 · Sara · done", "Sent as an approved template"],
    feature: "follow-ups",
  },
  {
    n: 10,
    phase: "close",
    actor: "team",
    title: "The deal moves",
    line: "Through the stages you set - it went from New Enquiry to Appointment Booked on Monday, and after the visit Ravi moves it to Discussion.",
    day: "Sat",
    time: "11:45",
    chat: [],
    record: ["Deal → Discussion · Ravi"],
    feature: "sales-pipeline",
  },
  {
    n: 11,
    phase: "close",
    actor: "team",
    title: "Won, and why",
    line: "When the deal closes, the reason is recorded with it - won, and what decided it; or lost, and what for.",
    day: "Sat",
    time: "12:10",
    chat: [],
    record: ["Won · went ahead with the treatment plan"],
    feature: "sales-pipeline",
  },
  {
    n: 12,
    phase: "learn",
    actor: "system",
    title: "It shows in your reports",
    /* Each report counts its own part - Good to know's rule at this step
       is that none follows the enquiry end to end. */
    line: "The dashboard counts the new contact, the booking and the win, and the Dental check-up ad's own report counts its lead and its won deal.",
    day: "Sat",
    time: "12:10",
    chat: [],
    record: ["Dashboard: new contacts, bookings, wins", "Ad: lead and won deal"],
    feature: "reports",
  },
  {
    n: 13,
    phase: "learn",
    actor: "meta",
    title: "Meta hears back",
    line: "Where it is set up, the qualified lead and the won deal are sent back to Meta through its Conversions API.",
    day: "Sat",
    time: "12:11",
    chat: [],
    record: ["Sent to Meta: qualified lead, won deal"],
    handover: "Back to Meta",
    feature: "meta-ads",
  },
];

/* ---- GOOD TO KNOW -------------------------------------------------------------
   The rules and limits the journey above depends on, each pinned to the
   step it applies to. Every line is the requirements' own: §22 and §15
   (the ad account, charges separate), §9 and §23 (no calendar sync, no
   automatic no-show detection, no single end-to-end report) and §14 (the
   24-hour window).

   THE SAME TRUTHS /features STATES FEATURE BY FEATURE, told here by where
   in one enquiry's journey they bite - which is what this page is for. A
   limit is said wherever it applies (§23, §31), so these repeat /features
   on purpose; what they must not repeat is this page.

   There were six. Meta approving the number moved to Getting started,
   which is where §22 puts it. "It answers from what you give it" was
   dropped: the hero, steps 3 and 7 and Getting started already say it.
   And the reports rule no longer says the Conversions API is only where
   set up - step 13 says that itself.

   THE LINES ARE SHORT so the scene above each leads - it shows the rule
   happening, and the words only have to say it once. */

export const goodToKnow: {
  eyebrow: string;
  heading: string;
  lead: string;
  notes: readonly {
    id: "ad" | "booking" | "window" | "reports";
    label: string;
    steps: readonly number[];
    title: string;
    line: string;
    /* The /features section that states the same rule - see the top. */
    feature: FeatureSlug;
  }[];
} = {
  eyebrow: "Good to know",
  /* "What each step depends on" promised a rule for every step, and there
     are four, for four of the thirteen. */
  heading: "What the journey depends on.",
  lead: "The rules and limits that apply along the way, each pinned to the step it affects.",
  notes: [
    {
      id: "ad",
      label: "Step 1",
      steps: [1],
      title: "The ad runs on your own ad account",
      line: "Ads run on your own Meta ad account, which Meta must approve for these features. Meta's ad charges are separate from MnT Future's.",
      feature: "meta-ads",
    },
    {
      id: "booking",
      label: "Step 6",
      steps: [6],
      title: "Bookings stay in iSuite AI",
      line: "Visits go into iSuite AI's own calendars - there is no Google Calendar or Outlook sync. Your team marks a no-show; it is not detected automatically.",
      feature: "appointments",
    },
    {
      id: "window",
      label: "Step 9",
      steps: [9],
      title: "After 24 hours, only templates",
      line: "Once 24 hours pass after a customer's last message, WhatsApp allows only an approved template. Meta bills the messaging separately.",
      feature: "follow-ups",
    },
    {
      id: "reports",
      label: "Step 12",
      steps: [12],
      title: "Counted in parts, not end to end",
      line: "The dashboard, the pipeline and each ad have their own reports, but none follows an enquiry from first ad to final sale in one view.",
      feature: "reports",
    },
  ],
};

export type KnowNote = (typeof goodToKnow.notes)[number];

/* ---- GETTING STARTED ------------------------------------------------------------
   Requirements §22: what a business needs before its first enquiry, and
   the notes that go with it - Meta's approval usually takes one to two
   weeks, the timing is Meta's, and neither the approval nor a go-live date
   is promised.

   NOTHING HERE SAYS HOW ONBOARDING RUNS, or who does what in it: §32
   lists the onboarding process as information still to come. This is only
   what to have ready.

   EACH THING POINTS TO THE STEPS OF THE JOURNEY IT MAKES POSSIBLE, which
   is what this page adds to §22's list: the number is the one Anand writes
   to, the business information is what the assistant is set up with, the
   calendar is what the visit is booked into, and so on. No steps means
   before the first one.

   META'S APPROVAL IS SAID HERE: the number's, which was Good to know's
   first rule, "before step 1", until this section was built, and the ad
   account's (§22's notes). The lead once said the number was the only
   thing waiting on Meta, and the ad account waits on it too. Meta's
   charges being separate is not repeated: Good to know says it where it
   applies, at the ad and at the 24-hour window.

   NO CLINIC AND NO NAMES. The journey follows one enquiry, so it needs one
   business and one customer - the dental clinic, Anand, Sara and Ravi are
   the site's own example, which the requirements never ask for (§20 lists
   clinics as one example among six). This section speaks to the reader
   about their own business, so it is "your business" throughout, and it
   names the journey's steps without the example's people (`stepNames`). */

export type StartId = "number" | "papers" | "business" | "calendar" | "team" | "ads";

export const gettingStarted: {
  eyebrow: string;
  heading: string;
  lead: string;
  review: { title: string; line: string };
  items: readonly { id: StartId; title: string; line: string; steps: readonly number[] }[];
  stepNames: Readonly<Record<number, string>>;
} = {
  eyebrow: "Getting started",
  heading: "What you need before the first enquiry.",
  lead: "Six things to have ready, and the steps of the journey each one makes possible. Two of them also need Meta's approval: your number, and your ad account if you run ads.",
  review: {
    title: "Meta reviews your number",
    line: "It usually takes one to two weeks, but the timing is Meta's, so neither the approval nor a go-live date is promised.",
  },
  items: [
    {
      id: "number",
      title: "A WhatsApp number of your own",
      line: "A WhatsApp Business number on your own business, not already in use - and Meta's approval for it.",
      steps: [1, 2],
    },
    {
      id: "papers",
      title: "Your registration and website",
      line: "Your GST or company registration, and your business website.",
      steps: [],
    },
    {
      id: "business",
      title: "What the assistant should know",
      line: "Your business information for setting up the AI sales assistant: your services, packages, prices and policies.",
      steps: [3, 4],
    },
    {
      id: "calendar",
      title: "Your calendar",
      line: "Your calendars and the times you are available, so a visit is booked into a time you are free.",
      steps: [6],
    },
    {
      id: "team",
      title: "Your team",
      line: "Your team members, and what each of them is allowed to see and do.",
      steps: [7, 8],
    },
    {
      id: "ads",
      title: "Your ad account, if you run ads",
      line: "Access to your Meta ad account, and Meta's approval of it - needed only where you use the ads features.",
      steps: [1, 12],
    },
  ],
  /* The steps the six make possible, as the journey's titles say them
     without its example. */
  stepNames: {
    1: "A customer taps your ad",
    2: "It lands in your inbox",
    3: "The assistant replies",
    4: "It asks your questions",
    6: "A visit is booked",
    7: "Your team takes over",
    8: "Your team works the record",
    12: "It shows in your reports",
  },
};

export type StartItem = (typeof gettingStarted.items)[number];
