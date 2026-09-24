/* ==========================================================================
   SECTION 7 COPY - META ADS
   --------------------------------------------------------------------------
   FIVE TREATMENTS CAME BEFORE THIS ONE and the useful part is why each
   failed, because they failed for three different reasons.

   1  A DASHBOARD ASSEMBLING ON SCROLL - the agreed plan, and unbuildable.
      §6 bans fake dashboard numbers, and a dashboard has to assemble into
      something. Empty it looks broken; filled it is a fabricated figure.

   2  THE SEVERED ROW - Meta holds spend and clicks, the business holds won
      deals, iSuite AI joins them. True, and an architectural fact. A
      clinic owner does not think about where data lives.

   3  A RECORD CARD WITH THREE POINTS BESIDE IT - right content, and the
      most common B2B layout in existence.

   4  THE TAG SPANNING FOUR MOMENTS - a better picture, still about
      ATTRIBUTION, which is what happens after the ads run rather than the
      reason anyone buys.

   5  THE HAND-OFF, TWO PANELS - what you give, what gets built. The
      closest yet and still unreadable, for a reason worth keeping: there
      was nothing BETWEEN the two panels. The whole claim is that one
      becomes the other, and the picture showed two boxes side by side
      with a gap. A reader had to infer the transformation, which is the
      one thing a picture is supposed to do for them.

   WHAT WAS ACTUALLY MISSING WAS THE MECHANIC, and the client had to say it
   three times before it landed: there is an AI STUDIO in the product. The
   owner hands the poster to the AI there, the AI ASKS THE CAMPAIGN
   QUESTIONS ITSELF and works the rest out, the owner approves, and it
   runs. Nobody opens Facebook.

   So the section is that conversation, drawn as it happens. It is the only
   honest picture of the product and it needs no diagram: a visitor
   understands a chat without being taught how to read it.

   "YOU NEVER OPEN FACEBOOK OR ADS MANAGER" IS THE POINT OF THE SECTION and
   it was not on the page at all until now. Every earlier cut described
   what iSuite AI builds without saying what the owner is spared, and a
   person who has never opened Ads Manager has no idea that "campaign, ad
   set, lead form" is a difficult afternoon. Naming the thing they do not
   have to do is what makes the rest mean anything.

   THE SECTION IS ALSO MUCH SHORTER NOW. It had a hand-off, two control
   cards, a tag strip, a caption and a disclaimer - six blocks, and the
   density was part of why nothing read. One picture, one line, three
   notes, the disclaimer.

   NOTHING PROMISES A RESULT. Not more leads, not cheaper leads, not
   approval, not a launch date. Note 1 keeps owner approval, note 2 keeps
   whose money it is, and the §15 disclaimer is verbatim.

   AI STUDIO IS NOT IN PRODUCT GUIDE v1.0. Neither requirements document
   mentions it - the only "Studio" in either is the business type in the
   use-case list. It is named here on the client's word. It belongs in the
   guide, and if it becomes a feature in its own right then features.ts and
   the "Thirteen features" heading both have to change with it.
   ========================================================================== */

export type Turn = {
  from: "you" | "ai";
  text?: string;
  /* Set on the first turn only - the poster arrives as an attachment, with
     a filename, because a gradient rectangle labelled "your poster" reads
     as an empty box and the same rectangle inside a message bubble with a
     filename under it reads as a file somebody sent. */
  attachment?: {
    title: string;
    sub: string;
    file: string;
    /* THE EXAMPLE CREATIVE, and it is the CLINIC's artwork rather than
       iSuite AI's - which is the whole point of the turn. null until the
       file lands in public/; the card is composed so that it still reads
       as a poster without it, just left-weighted instead of balanced. */
    image: { src: string | null; alt: string };
  };
  /* Set on the last turn only. Three chips, each with its own mark -
     NOT three cards with a second line each, which is what this briefly
     became and was wrong: it turned one bubble into a panel and made the
     assistant's answer heavier than everything the owner had said. */
  built?: readonly { name: string; mark: "ads" | "form" | "wa" }[];
  approve?: string;
  approveNote?: string;
};

export const ads = {
  eyebrow: "Meta ads",

  /* The §15 heading - "Connect your ads to the enquiries they generate" -
     describes the attribution half and none of this. The client's own
     framing is the heading now, and it is the one part of this section
     that has never needed explaining. */
  heading: "Hand over the poster. iSuite AI runs the campaign.",

  lead: "Upload your poster in AI Studio. It asks what you are offering and who should see it, builds the campaign, and waits for your approval before anything goes live.",

  studio: {
    title: "AI Studio",
    subtitle: "New campaign",

    turns: [
      {
        from: "you",
        attachment: {
          title: "Dental check-up",
          sub: "Chennai",
          file: "clinic-poster.jpg",
          /* 1254x1254 RGBA, genuinely transparent - corners measure alpha
             0 and the body 254, so it composites cleanly on the card's
             gradient with no keyed halo. Renamed from "tooth pic.png":
             a space in a filename survives as %20 in the URL and is a
             trap the first time somebody types the path by hand. */
          image: {
            src: "/tooth.png",
            alt: "A tooth, illustrated - the clinic's own poster artwork.",
          },
        },
        text: "Run this one for us.",
      },
      {
        from: "ai",
        text: "What are you offering, and who should see it?",
      },
      {
        from: "you",
        text: "Consultation and check-up. Adults near the clinic.",
      },
      {
        from: "ai",
        text: "Campaign ready.",
        built: [
          { name: "Two ads", mark: "ads" },
          /* "Lead form" is what Meta calls it and what a marketer
             calls it. A clinic owner does not, and it was the only one
             of the three that needed translating - "two ads" and
             "WhatsApp button" are already plain English. */
          { name: "Enquiry form", mark: "form" },
          /* "WhatsApp button" on its own never said WHERE the button
             is, which is the entire point of it - it sits on the ad, and
             tapping it opens WhatsApp with a chat to the business already
             started. Meta calls this a click-to-WhatsApp ad; three words
             say it without the term.

             It is also the difference between the two things above it: the
             form hands you a name and number you still have to chase, the
             button hands you somebody already talking to you. */
          { name: "WhatsApp button on the ad", mark: "wa" },
        ],
        approve: "Approve and run",
        approveNote: "You set the daily cap.",
      },
    ] as readonly Turn[],
  },

  /* THE LINE THE SECTION EXISTS FOR. Set large, on its own, under the
     picture - because it is the sentence a clinic owner repeats to
     somebody else. */
  punchline: "You never open Facebook or Ads Manager.",

  /* THE HANDLES WERE ADDED, THE LINES WERE NOT TOUCHED. Three grey
     paragraphs of equal weight under a bright panel read as the section
     trailing off, and a short bold handle over each is the cheapest
     hierarchy there is: the eye gets three things to land on instead of a
     wall. Nothing in the sentences changed. */
  notesLabel: "What stays with you",

  notes: [
    {
      label: "You approve it",
      line: "Nothing goes live until you approve it, and you set the daily cap before it runs.",
    },
    {
      label: "Your ad account",
      line: "It runs on your own Meta ad account. You fund it and the spend is yours.",
    },
    {
      label: "What comes back",
      /* §15's SUGGESTED copy sat here verbatim for several rounds and was
         unreadable: "supports Meta lead ads and click-to-WhatsApp
         workflows, helping businesses connect relevant ad information with
         contacts, enquiries and sales progress" is three abstractions
         stacked on each other, and under a heading reading "What comes
         back" it answered nothing.

         IT WAS NEVER MANDATORY. §15 puts that sentence under "### Copy"
         and the Meta-charges sentence under "### Disclaimer" - one is a
         suggestion, the other is a requirement. Only the second is
         reproduced word for word on this page, and it still is.

         This says the same thing in the order it happens to a person. */
      line: "When someone answers your ad, the enquiry arrives in your inbox with the campaign and the ad written on it - so you can see which ad brought which customer, and what happened next.",
    },
  ],

  /* Additive - it marks the box below as the legal note rather than as a
     fourth point in the row above it. */
  disclaimerLabel: "Please note",

  /* Requirements §15, verbatim and mandatory. */
  disclaimer:
    "Meta advertising charges and Meta approval requirements are separate from MnT Future charges and timelines.",
} as const;

/* ==========================================================================
   THE OPENING CLIP
   --------------------------------------------------------------------------
   A short animation that wires up and settles on the Meta mark, after which
   the rest of the section fades in.

   IT IS A VIDEO, NOT A GIF, and that is not a preference. A GIF cannot tell
   the page when it has finished - there is no ended event, no frame
   callback, nothing - so sequencing anything after it would mean a
   hardcoded timer that silently desyncs the first time the file is
   re-exported at a different length. A video fires `onEnded`. It is also
   roughly ten to thirty times smaller: a logo animation as a GIF runs 2-5MB,
   the same thing as an MP4 is around 150KB, and the heaviest asset on this
   site today is a 1.4MB PNG.

   NOTHING IS EVER GATED BEHIND IT. The section's content is in the DOM from
   first paint and only its OPACITY waits on the clip. Conditionally
   rendering it would mean Google sees an empty band, a screen reader gets
   nothing until a timer fires, and anyone scrolling fast hits a hole.

   THREE WAYS IT CAN FAIL AND ALL THREE REVEAL THE SECTION:
     - the file errors or is missing      -> onError
     - autoplay is refused (iOS low power -> play() rejects
       mode refuses it even when muted)
     - onEnded never arrives at all       -> fallbackMs

   The fallback is the important one. Without it a refused autoplay leaves
   the section permanently invisible on exactly the devices least able to
   tell anyone.

   REDUCED MOTION SKIPS THE CLIP ENTIRELY. It is decoration, it carries no
   information, and the section reads identically without it.

   EXPORT NOTES FOR WHOEVER SUPPLIES THE FILE:
     - MP4 (H.264) and, if you can, a WebM beside it
     - BACKGROUND WHITE. Not #0b1220, and not transparent. The section
       begins on a white ground precisely so the clip's own white
       background disappears into it, and only turns to night once the
       clip has finished. A dark or transparent export is now the thing
       that would look wrong. This started as a workaround for a file that
       arrived with a white background and ended up better than the export
       it was working around
     - no audio track at all (autoplay requires muted regardless)
     - keep the whole thing under about 2.5s - nobody scrolling waits longer
     - roughly 704x704 for a 352px slot on a 2x screen

   BRAND NOTE. Small channel marks identifying which services you connect to
   are ordinary referential use and are already all over this site. A Meta
   logo as the climax of an animation is closer to a brand stamp, in the one
   section whose mandated disclaimer exists to say MnT Future and Meta are
   separate companies. It was raised and the client decided; at one second,
   in a section headed "Meta ads", it is defensible. If MnT Future ever
   becomes a listed Meta Business Partner, the badge is the better thing to
   show here because it is an actual credential.
   ========================================================================== */

export type Clip = {
  /* null until the file lands in public/. The section renders completely
     normally while it is null - no gap, no placeholder. */
  src: string | null;
  /* Belt and braces: reveal anyway after this long, whatever the video
     did or did not do. MUST be comfortably longer than the clip - set to
     3200ms while the file was still 2.5s of guesswork, which would have
     revealed the section a second before the supplied 4.1s clip ended,
     every single time. Re-check this whenever the file is re-exported. */
  fallbackMs: number;
  /* Optional. With a number here the section reveals at that point instead
     of waiting for the end, which is the knob to reach for if the clip
     feels like a wait - the reveal overlaps the last beat of the animation
     and the two read as one movement. null waits for `onEnded`. */
  revealAtMs: number | null;
  /* Rendered width of the slot. */
  width: string;
};

/* meta-wire-up.mp4 - H.264, 1500x1500, no audio track, 4.10s, 167KB.
   Everything the export notes asked for. */
export const clip: Clip = {
  src: "/meta-wire-up.mp4",
  fallbackMs: 5400,
  revealAtMs: null,
  width: "22rem",
};
