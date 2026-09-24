/* ==========================================================================
   SECTION 6 COPY - WHO IT'S FOR
   --------------------------------------------------------------------------
   The requirements ask for the eight business types "as simple cards or
   icons" and say to keep the section short. The icons are the part that was
   dropped, and only the icons. Every one of the eight is still named, in
   full, and the section is still short.

   WHY NOT AN ICON ROW. A row of eight grey glyphs labelled Showroom, Clinic,
   Salon is the single most skipped block on a B2B site, because it asks a
   visitor to recognise a CATEGORY. Nobody thinks of themselves as a
   category. They think about the messages sitting unanswered on their phone.

   So each of the eight is shown as the first message that business actually
   receives, under its own name. A showroom owner reads "Showroom" and then
   "Is this model available in white?" and is already in.

   IT ALSO PROVES THE HEADING INSTEAD OF ASSERTING IT. The approved heading
   is "Built for businesses that sell through conversations" (requirements
   §16, used verbatim). Eight conversations, printed, is the evidence for
   that sentence. Eight icons are not.

   AND IT WIDENS THE PAGE OUT. Sections 2 to 5 all use the same clinic -
   Priya, Anand, the ₹500 consultation - which is deliberate, because one
   running example teaches a product better than eight shallow ones. But by
   section 5 a visitor who does not run a clinic has seen four sections of
   somebody else's business. This is where the page says: and seven other
   kinds of business, with their own questions.

   THERE IS NO CHANNEL ANYWHERE IN THIS SECTION, AND THAT IS TWO REMOVALS.
   Each enquiry carried a WhatsApp or Instagram mark at first, two per
   channel, on the theory that it made the grid read as an inbox. It did not
   earn the space: the four marks are taught three times before a visitor
   reaches this section - under the hero, on the four walls in section 2,
   and through the whole merge in section 3 - so a fourth telling was
   repetition, sitting in the slot the business name should own.

   A three-line strip under the grid then named the four in words, alongside
   the behavioural qualifier from §3 - who answers, and a team of two to
   thirty. That came off too. It was the section explaining itself after the
   section had already worked, and nine tiles that say who this is for do
   not need a paragraph underneath confirming it.

   What this section is about is WHO, not WHERE. The channel was the one
   thing on these tiles already established elsewhere, and the team size is
   the one thing a visitor can answer for themselves.

   The §3 qualifier is therefore not stated anywhere on the home page. That
   is deliberate and it is a real trade: a visitor whose business is not one
   of the eight has eight examples and no rule. If that turns out to cost
   enquiries, the place to put it back is the FAQ page, as a question -
   "Is iSuite AI for my kind of business?" - which is where someone who is
   unsure actually goes.

   NOTHING HERE IS A CLAIM, and that is structural rather than careful.
   Every quote is a QUESTION A CUSTOMER ASKS. A question cannot promise a
   lead, a sale, a response time or Meta approval, so the block of the page
   that would normally carry eight vague benefit lines carries none at all
   and does not feel emptier for it.

   WHAT THIS SECTION REFUSED TO COPY. The layout came from a reference the
   client liked: a bento of tiles with a mark at the centre. Three of that
   reference's tiles were "40+ Customers Worldwide", "200% Lead Growth for a
   SaaS Startup" and a chart reading "+18.75%". All three are blocked - §17
   forbids unapproved customer proof and §15 forbids promising leads, ROAS
   or sales - and all three would also have read as a template nobody
   changed, on a page selling to a showroom in Coimbatore. The arrangement
   was worth taking. The numbers were not, and there is no version of them
   that becomes publishable by being softened.

   THE EIGHT TYPES ARE THE REQUIREMENTS' OWN LIST, in the requirements' own
   order: showrooms, clinics, salons, studios, schools, agencies,
   consultants, service businesses. If that list changes, it changes here.
   ========================================================================== */

import type { BusinessMark } from "@/components/ui/businessIcons";

export type Enquiry = {
  /* Singular, because it names the business the message went TO, not a
     market segment. "Showroom", not "Showrooms". It is the biggest thing on
     its tile - the visitor is scanning for themselves, and they are
     scanning for a word. */
  business: string;
  /* The requirements' own vocabulary for what kind of enquiry this is
     (§20 Use Cases), so the section carries the language the rest of the
     site uses rather than inventing a second one. */
  kind: string;
  /* The first message, in the customer's words. Short on purpose - a real
     first enquiry is rarely a paragraph, and these are set large. */
  quote: string;

  /* THE WATERMARK, one per tile, drawn at ~96px and 6% opacity in the
     top-right corner. It is not an icon and is never read as one - it is
     there to give a tile a silhouette, because nine tiles of pure type is a
     spreadsheet with rounded corners. See components/ui/businessIcons.tsx
     for why these are not the channel marks returning. */
  mark: BusinessMark;

  /* WHEN THE MESSAGE CAME IN. It sits in the corner of the bubble and its
     only job is to make the quote read as a message rather than as a pull
     quote - one small piece of chrome is the difference.

     THE HOURS ARE CHOSEN, NOT RANDOM. Six of the eight land in the evening,
     at lunch, or before a shop opens, because that is when a customer with
     a question actually writes and it is precisely when nobody is free to
     answer. It restates section 2's problem without a word of copy and
     without claiming anything - a timestamp cannot promise a response
     time. */
  time: string;

  /* SET ON THREE OF THE EIGHT, and it makes that tile a DARK tile.
     A bento of nine identical white cards is a table with rounded corners;
     what gives the reference its texture is that some tiles are photographs
     and read heavy while the rest read light. Three dark tiles at
     top-left, top-right and bottom-left put that weight in a triangle
     around the centre mark.

     `src` IS NULL AND THE TILE STILL WORKS. There is no photography in this
     project - public/ holds three logo cuts and the funnel artwork and
     nothing else. So a photo tile renders its navy ground with or without
     an image on it: null today is a deliberate dark tile, and a supplied
     photograph slots in behind the same scrim with nothing else changing.
     It is never an empty grey box, and it is never a stock photo of an
     open-plan office in San Francisco, which would undercut this section
     more than having no photograph at all.

     `alt` DOUBLES AS THE SHOOTING BRIEF. It describes the picture that
     belongs there, so whoever sources the three images is reading the
     requirement rather than guessing from a filename. */
  photo?: { src: string | null; alt: string };
};

export const audience = {
  eyebrow: "Who it's for",

  /* Requirements §16, verbatim. */
  heading: "Built for businesses that sell through conversations.",

  lead: "Eight businesses, eight first messages. The business changes and the question changes, and what has to happen next never does - somebody answers, finds out what the person actually wants, books them in and remembers to follow up.",

  /* THE ORDER IS THE LAYOUT. These nine cells - eight enquiries with the
     mark spliced in at index 4 - fall into a 3x3 with the mark dead centre,
     so the array order IS the grid position. Moving a photo tile means
     moving an entry here, not touching the component. */
  enquiries: [
    {
      business: "Showroom",
      mark: "storefront",
      time: "8:14 pm",
      kind: "Product enquiry",
      quote: "Is this model available in white?",
      photo: {
        src: null,
        alt: "A showroom floor in India, a salesperson showing a product to a customer.",
      },
    },
    {
      business: "Clinic",
      mark: "clinic",
      time: "9:26 pm",
      kind: "Service enquiry",
      quote: "Doctor available on Sunday morning?",
    },
    {
      business: "Salon",
      mark: "scissors",
      time: "10:03 pm",
      kind: "Appointment request",
      quote: "Any slot free tomorrow around 5?",
      photo: {
        src: null,
        alt: "A salon chair, a stylist mid-appointment with a client.",
      },
    },
    {
      business: "Studio",
      mark: "camera",
      time: "1:47 pm",
      kind: "Booking enquiry",
      quote: "What do you charge for a pre-wedding shoot?",
    },
    /* The one Tanglish line, and it is in the same register as the Tanglish
       turn in section 5 ("First consultation ku charge evlo?") because it is
       the same customer writing the same way. Latin script on purpose -
       Tamil script here would fall back to the OS font until the Noto
       webfonts land (see lib/site.ts). */
    {
      business: "School",
      mark: "school",
      time: "7:52 pm",
      kind: "Course enquiry",
      quote: "Course fees ku EMI option irukka?",
    },
    {
      business: "Agency",
      mark: "megaphone",
      time: "11:38 am",
      kind: "Meta ad lead",
      quote: "Saw your ad. What do you charge per month?",
      photo: {
        src: null,
        alt: "A small agency team of three or four at a desk, one laptop open between them.",
      },
    },
    {
      business: "Consultant",
      mark: "briefcase",
      time: "8:41 am",
      kind: "Website form",
      quote: "Do you handle GST filing also?",
    },
    {
      business: "Service business",
      mark: "van",
      time: "2:09 pm",
      kind: "Service request",
      quote: "AC not cooling. Can someone come today?",
    },
  ] as readonly Enquiry[],

  /* THE CENTRE TILE. A mark alone in a cell is a logo parked in a hole, so
     it carries one line - and the line has to earn the most prominent cell
     in the section. This one states the only thing all eight share, which
     is also the thing the whole grid is arranged to say. */
  centreLine: "One system behind every one of them.",
} as const;
