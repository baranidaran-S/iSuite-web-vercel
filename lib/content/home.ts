/* ==========================================================================
   HOME PAGE CONTENT
   --------------------------------------------------------------------------
   Copy lives here, not inside components, so it can be reviewed against
   Product Guide v1.0 (requirements §31) by reading one file.

   CLAIM DISCIPLINE. Nothing here promises leads, sales, ROAS, Meta approval
   or a go-live date, and nothing says the assistant replaces a sales team.
   Every verb is "can" or a plain statement of what the software does.
   ========================================================================== */

export const hero = {
  eyebrow: "AI sales system",

  /* Split so the headline animates and wraps line by line rather than as one
     block. `accent` sets that word in the serif italic - one word, one place
     on the page. Used twice it stops being an accent. */
  headline: [
    { text: "Turn every enquiry" },
    { text: "into a ", accent: "clear" },
    { text: "sales journey." },
  ],

  /* BOTH HALVES OF THE PRODUCT, BEFORE ANYONE SCROLLS. The sub used to run
     "...into one inbox - where an AI sales assistant replies, qualifies,
     books and follows up" and stopped there. Read straight through, the top
     of the page described a shared inbox with something answering in it,
     which is the chatbot positioning the requirements forbid outright - and
     no amount of correcting it in section 3 undoes a first impression made
     in the hero.

     So the board is here now, beside the inbox, not three sections later. The inbox is where the message lands. The deal is what
     the business is actually buying.

     THE ORIGINAL SENTENCE IS BACK, UNCHANGED, WITH ONE ADDED AFTER IT. The
     fix for a missing idea was briefly to rewrite the sentence around it -
     "Every message ... lands in one place and becomes a deal on your sales
     board" - which crammed two ideas into one clause, dropped iSuite AI as
     the subject and lost "follows up" on the way. It said more and read
     worse.

     The sentence was not the problem. What was missing was a sentence.

     CUT FOR THE PHONE, AND BY DELETION ONLY. At 47 words this ran seven
     lines on a 390px screen, immediately under a headline that had just
     got bigger - a block of grey type between the promise and the button.
     Four things came out and no new phrasing went in:

       "in your customer's language"   section 3 is built around this and
                                       demonstrates it live
       "the lead"                      qualifies what, obviously
       "and follows up"                the fourth verb in a list of four
       "with an owner and a next step" detail, and the board already says it

     47 words to 32. The only word ADDED is the "and" that keeps "replies,
     qualifies and books appointments" grammatical after the cut.

     WHAT COULD NOT COME OUT is either half - the inbox AND the board. The
     note above is the whole reason the second sentence exists, and it is
     still the easiest twelve words on this page to delete by accident. */
  sub: "iSuite AI brings WhatsApp, Instagram, Facebook and website enquiries into one inbox - where an AI sales assistant replies, qualifies and books appointments. And every one becomes a deal on your sales board.",

  primaryCta: "Book a Demo",
  secondaryCta: "See how it works",

} as const;

/* The channel marks under the hero, and the same four that feed the chips on
   the product frame. One list so a channel can never appear in one place and
   not the other. */
export const channels = [
  { id: "wa", name: "WhatsApp Business", short: "WhatsApp", color: "var(--color-wa)" },
  { id: "ig", name: "Instagram", short: "Instagram", color: "var(--color-ig)" },
  { id: "fb", name: "Facebook Messenger", short: "Facebook", color: "var(--color-fb)" },
  { id: "web", name: "Website chat", short: "Website", color: "var(--color-web)" },
] as const;

/* Every component that draws a channel keys off this, so a channel added
   above fails at the type level everywhere it is missing rather than
   rendering a blank square somewhere nobody looks. */
export type ChannelId = (typeof channels)[number]["id"];
