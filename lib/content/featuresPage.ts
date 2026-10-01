/* ==========================================================================
   /features - PAGE COPY
   --------------------------------------------------------------------------
   The home page NAMES the fifteen features and this page EXPLAINS them.
   Section 5 of the home page is the glimpse - a name and three to five
   words each - and its button, "Open the full feature list", lands here.

   THE FEATURES THEMSELVES ARE NOT RETYPED HERE. Their names, groups,
   marks, colours, slugs and one-line summaries all live in
   lib/content/features.ts, which the home page already reads. This file
   carries only what is new on this page. Two lists of fifteen names is
   one list that gets renamed and one that does not.

   WHERE THE DETAIL COMES FROM. The real app (crm.mntfuture.com): every
   capability in featureDetails.ts was read off its own screens, in its own
   words where they were plain - not the home page's copy, and not
   invention. §31's rules apply to every word added here, the same as on
   the home page: no figures, no promised outcome, the AI named as the
   client's list names it ("Sales AI Agent") and never "chatbot", nothing
   suggesting it replaces a team, and a limit stated plainly wherever the
   product has one.
   ========================================================================== */

export const featuresHero = {
  /* THE COUNT LIVES IN THE PILL, AND IT IS LOAD-BEARING. It says fifteen
     because features.ts lists fifteen. Add a sixteenth there and this
     changes with it - see the same warning on the home page's heading. */
  eyebrow: "All fifteen features",

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

  /* The four groups by name, because they are the page's four chapters -
     and the promise the rest of the page has to keep. "Where its limits
     are" is not modesty: a page this detailed that never mentions a limit
     would be the first thing a careful buyer stopped believing. */
  lead: "In four groups: conversations, sales, marketing, and automation and insights. For each one: what it does, what you can set up, and where its limits are.",
} as const;

/* ---- THE HERO'S VIDEO ------------------------------------------------------
   The hero's picture is a video, still being made. Until its file is in
   public/, `src` stays null and the hero shows the video's frame where it
   will go - dashed, at the size below, with "Video coming soon". The
   exploded stack that stood there was taken out on 2026-09-30.

   TO SWITCH IT ON, put the files in public/ and fill in their names:

     src      "/features-hero.mp4"
     webm     "/features-hero.webm"   optional - often the smaller file
     poster   "/features-hero.jpg"    its first frame: shown while it loads,
                                      and instead of it for a visitor who
                                      asked for less motion
     width, height   the video's own size, so its box is drawn before a
                     byte of it arrives and nothing on the page jumps
     label    what it shows, in a sentence or two - read to screen readers
              in its place

   THE NOTES FOR WHOEVER MAKES IT:
     - MP4, H.264, with no audio track: a hero plays muted, and sound is
       weight nobody hears
     - 1920x1080 (16:9); another shape is fine - set width and height to it
     - 10 to 20 seconds, looping seamlessly: the last frame leads into the
       first
     - under about 4 MB; a WebM as well, if it comes out smaller
     - its first frame as a JPG or WebP at the same size, for the poster
     - any words in it large enough to read at about 350px wide, its width
       on a phone
     - no figures, prices or promised results - the rules of every word on
       this site (§31) hold for a word in a video too */
export type HeroVideo = {
  src: string | null;
  webm: string | null;
  poster: string | null;
  width: number;
  height: number;
  label: string;
};

export const heroVideo: HeroVideo = {
  src: null,
  webm: null,
  poster: null,
  width: 1920,
  height: 1080,
  label: "A short video of iSuite AI at work.",
};

/* ---- THE CHAPTERS ----------------------------------------------------------
   One per group, in features.ts's order, top to bottom. The
   name, numeral, colour and tagline are features.ts's; this carries only
   the sentence under them, which says what the group is FOR before the
   features in it say what they do.

   A chapter with no entry here has not been written yet, not forgotten. */
export const chapters: Partial<Record<string, { lead: string }>> = {
  conversations: {
    lead: "Every enquiry lands in one shared inbox, whichever channel it came from - your own website included - and the Sales AI Agent can answer it from what you have told it.",
  },
  sales: {
    lead: "From a business you found to an invoice paid: leads, contacts, pipelines, follow-ups, bookings and quotations, in one place your whole team shares.",
  },
  marketing: {
    lead: "Approved WhatsApp templates sent in bulk, email campaigns through your own key, and forms that bring every answer into your contacts.",
  },
  "automation-insights": {
    lead: "Automations run the routine steps on their own, and the Analytics AI Agent answers questions about your CRM in plain words.",
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
