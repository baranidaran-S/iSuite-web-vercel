import type { ChannelId } from "@/lib/content/home";

/* ==========================================================================
   THE FOUR QUEUES
   --------------------------------------------------------------------------
   One enquiry list per channel, and it lives here rather than inside the
   section that draws it because SECTION 3 REUSES IT. Section 2 stands these
   four queues in four walled columns; section 3 collapses the same cards -
   the same names, the same words, the same order - into a single inbox and
   turns the unanswered ones live.

   That only lands if a visitor recognises the cards. If the two sections
   invent their own data, the collapse is just one picture replaced by
   another and the argument evaporates. So: one array, two sections, and
   nothing here may be edited for one of them alone.

   EVERY NAME AND MESSAGE IS INVENTED, which is fine - a UI mock makes no
   claim. What it must never carry is a FIGURE: no counts, no values, no
   response times presented as performance. `waited` below is the age of an
   unanswered message inside an illustration, not a statistic about anyone.

   FOUR GHOSTS, NOT FORTY. One unanswered enquiry per channel. Four small
   failures read as a Tuesday and are believable; a wall of them reads as
   invented outrage and the visitor stops trusting the picture.
   ========================================================================== */

export type Enquiry = {
  id: string;
  name: string;
  text: string;
  /* Set on exactly one card per channel. Section 2 draws these as ghosts;
     section 3 brings them back answered. All three fields below belong to
     the same four cards and are meaningless without `waited`. */
  waited?: string;
  /* What the assistant said. Every one of these demonstrates a DIFFERENT
     documented capability, because four generic "thanks for your message"
     replies prove nothing a canned autoresponder could not do. */
  reply?: string;
  /* The capability, named. This is the label a visitor reads when they want
     to know what actually happened - keep it to something the product guide
     supports, never an outcome. */
  did?: string;
  /* Where the enquiry lands on the sales board once it has been answered,
     and what the team has to do next. NO DEAL VALUE, deliberately: a rupee
     figure on a mock deal card is a fabricated statistic, and the stage plus
     the next step say everything the picture needs to say without one. */
  stage?: string;
  next?: string;
  owner?: string;
  time?: string;
};

export type Queue = {
  channel: ChannelId;
  label: string;
  enquiries: Enquiry[];
};

/* FOUR PER CHANNEL, AND THE GHOST IS ON A DIAGONAL. It was six per channel
   with the unanswered one fourth in every column, which put all four ghosts
   on a single horizontal line. That band was defended here as the point of
   the picture, and it was the wrong point: a row of identical failures at
   identical heights reads as a designed pattern, which is to say as
   something arranged rather than something that happened.

   Staggered - second, first, third, fourth - it reads as four separate
   Tuesdays in four separate apps, which is what it is. Six cards became
   four for the same reason the ghosts are four and not forty: the column
   only has to look like it does not end, and the fade at its foot does
   that without needing two more cards nobody reads. */
export const queues: Queue[] = [
  {
    channel: "wa",
    label: "WhatsApp",
    enquiries: [
      { id: "wa-1", name: "Priya M.", text: "Is the doctor available today?" },
      {
        id: "wa-4",
        name: "Anand R.",
        text: "What do you charge for a consultation?",
        waited: "3h",
        /* ENGLISH, NOT TANGLISH, AND THAT IS A DECISION NOT AN OVERSIGHT.
           This card carried a Tanglish question and reply, to prove the
           language support the requirements list. It was pulled: the
           language claim deserves its own moment in the features section,
           and making the very first conversation a visitor reads bilingual
           costs a beat of comprehension right where the product is being
           explained for the first time. Put it back where it can be the
           point, not here where it is a detail inside a different point. */
        reply:
          "A first consultation is 500 rupees and includes a full assessment. Shall I send the full charges list?",
        did: "Answered from your price list",
        stage: "Qualified",
        next: "Send charges list",
        owner: "SA",
        time: "2h",
      },
      { id: "wa-2", name: "Rahul K.", text: "Do you accept insurance?" },
      { id: "wa-3", name: "Divya S.", text: "Can I come this evening?" },
    ],
  },
  {
    channel: "ig",
    label: "Instagram",
    enquiries: [
      {
        id: "ig-4",
        name: "Nisha B.",
        text: "Are you open on Saturday?",
        waited: "5h",
        reply:
          "Yes, Saturday 9am to 2pm. Is this for a first visit or a follow-up?",
        did: "Asked a qualifying question",
        stage: "Qualified",
        next: "Waiting on first visit / follow-up",
        owner: "RM",
        time: "5h",
      },
      { id: "ig-1", name: "Karthik R.", text: "Do you do teeth whitening?" },
      { id: "ig-2", name: "Meera N.", text: "Any branch in Coimbatore?" },
      { id: "ig-3", name: "Ajay T.", text: "Price list please" },
    ],
  },
  {
    channel: "fb",
    label: "Facebook",
    enquiries: [
      { id: "fb-1", name: "Meena S.", text: "Can I book a check-up?" },
      { id: "fb-2", name: "Suresh V.", text: "What are your timings?" },
      {
        id: "fb-4",
        name: "Prakash M.",
        text: "Called, nobody picked up",
        waited: "1d",
        reply:
          "Sorry we missed you! I can book you in - does Saturday 11am or Monday 5pm suit?",
        did: "Offered a booking time",
        stage: "Appointment Booked",
        next: "Saturday 11am",
        owner: "SA",
        time: "1d",
      },
      { id: "fb-3", name: "Lakshmi A.", text: "Need an appointment" },
    ],
  },
  {
    channel: "web",
    label: "Website",
    enquiries: [
      { id: "web-1", name: "Arun V.", text: "Requested a callback" },
      { id: "web-2", name: "Sandhya P.", text: "Booked but need to change" },
      { id: "web-3", name: "Naveen L.", text: "Enquiry from contact form" },
      {
        id: "web-4",
        name: "Farah Q.",
        text: "Submitted the form twice",
        waited: "2h",
        reply:
          "Got both - I have merged them into one enquiry. The team will call you today.",
        did: "Matched a duplicate contact",
        stage: "New Enquiry",
        next: "Callback today",
        owner: "RM",
        time: "2h",
      },
    ],
  },
];

/* ==========================================================================
   SECTION 2 COPY
   --------------------------------------------------------------------------
   ONE SENTENCE IN THE HEADING. It carried two - "Your enquiries arrive in
   four different places." then "So some of them never get answered." - and
   at display size that came to four lines of identical type with no break
   between them. Which is not a heading. It is a paragraph set in 70px, and
   it was read as one.

   A heading is one thought, one or two lines. The second sentence was doing
   supporting work, so it moved to where supporting work goes: the paragraph
   underneath, where it also sets up the four columns that follow.

   WHICH SENTENCE SURVIVED MATTERS. The cost line stayed, not the setup - a
   visitor already knows their enquiries arrive in four places, they live it
   daily. What stops them is being told that some of those enquiries are
   simply gone. State the consequence and let the picture explain the cause.

   PLAIN, NOT CLEVER. An earlier version ran "The problem isn't that
   enquiries are messy. It's that they sit in four separate boxes." That was
   rejected for the right reason - the "not X, it's Y" shape makes a reader
   hold a wrong idea before being handed the right one, and "boxes" is a
   metaphor for an audience who have WhatsApp on one phone and Instagram on
   another. Name the actual thing.

   Nothing here promises a result. It describes the reader's own situation,
   which is the only kind of problem statement that does not need a
   statistic propping it up.
   ========================================================================== */
export const fourWalls = {
  /* TWO PROBLEMS, NOT ONE, AND THE SECOND ONE IS WHY THE PIPELINE EXISTS.
     The heading was "Some enquiries never get answered." - true, and it
     sets up an inbox and nothing else. A visitor who reads only that has
     been shown a problem whose whole solution is a shared inbox, so when
     the sales board turns up later it reads as an extra rather than as the
     answer to something.

     The second sentence is the one the business feels the day AFTER: the
     enquiries they did answer are sitting in chat threads with no list, no
     owner and no next step. Name that here and the board is already
     justified before it is drawn. */
  /* EVERY OTHER SECTION HAS ONE AND THESE TWO DID NOT. Sections 4 to 9
     all open on a small pill naming what the section is about, and 2 and 3
     opened straight on a 4em heading - which on a page that has taught a
     reader to expect the pill reads as a heading that lost something
     rather than as one that needs nothing. */
  eyebrow: "The problem",

  heading: "Enquiries get missed. Deals get forgotten.",

  /* BOTH HALVES OF THE HEADING GET EXPLAINED HERE. The second sentence was
     briefly its own block, floated up into the fade below the columns -
     where it sat alone on a field of empty night with nothing around it and
     read as a stray caption rather than as part of the argument. It belongs
     under the heading it explains, in the paragraph people actually read. */
  lead: "They arrive on WhatsApp, Instagram, Facebook and your website. Four inboxes, four sets of notifications, and nobody seeing all four at once - so when one gets missed, nothing tells you. And the ones you do answer stay in a chat thread, with no list of who is still interested or what to do next.",

  ghostLabel: "no reply",
} as const;

/* The four that section 3 answers, derived rather than retyped. Retyping them
   is how the two sections end up showing different people. */
export const unanswered = queues
  .map((q) => {
    const hit = q.enquiries.find((e) => e.waited);
    return hit ? { ...hit, channel: q.channel, label: q.label } : null;
  })
  .filter((e): e is NonNullable<typeof e> => e !== null);

/* ==========================================================================
   SECTION 3 COPY
   --------------------------------------------------------------------------
   THIS SECTION IS NOT ABOUT THE INBOX. It was, and that was the mistake: the
   hero already says enquiries land in one inbox, section 2 says they arrive
   in four places, and section 3 headed "Every enquiry lands in one inbox"
   made three sections in a row about one feature out of thirteen. A reader
   reasonably asked what the section was even for.

   The picture was never the problem - four dead enquiries coming back to
   life shows the ASSISTANT working, not an inbox existing. Only the label
   was wrong.

   So the inbox is named once, as the mechanism, and everything after it is
   what the assistant does with what arrives. `capabilities` exists for the
   same reason: five words that say plainly this is not a shared inbox with
   a chatbot bolted on.

   TERMINOLOGY IS FIXED BY THE REQUIREMENTS: "AI sales assistant", never
   "chatbot", and never any wording suggesting it replaces the team - which
   is why "hands over" is on the list and is not an afterthought.
   ========================================================================== */
export const oneInbox = {
  eyebrow: "What iSuite AI is",

  heading: "Every enquiry ends up on your sales board.",
  lead: "iSuite AI is an AI sales system. Every channel feeds one shared inbox, the assistant replies, qualifies and books while your team is busy, and every enquiry becomes a contact and a deal with an owner and a next step.",

  inboxLabel: "One shared inbox",
  boardLabel: "Your sales board",

  /* Each is documented in the product guide. Nothing here is an outcome -
     they are things the software does, not results it promises. */
  capabilities: [
    "Opens a contact and a deal",
    "Replies",
    "Qualifies",
    "Books appointments",
    "Follows up",
    "Hands over to your team",
  ],

  /* Example stages only. The requirements are explicit that businesses
     configure their own - these three are the ones the four cards need. */
  stages: ["New Enquiry", "Qualified", "Appointment Booked"],

  /* THE THREE BEATS, NAMED. A visitor arriving at this section sees four
     dead cards under a heading about deals, and the two do not obviously
     belong together until they scroll. This says up front what the section
     is about to do, so the first frame is comprehensible on its own rather
     than only in hindsight - which is the exact complaint the section drew
     the first time it was built. */
  steps: ["Four separate places", "One shared inbox", "A deal on your board"],
} as const;
