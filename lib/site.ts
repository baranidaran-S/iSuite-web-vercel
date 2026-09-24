/* ==========================================================================
   SITE-WIDE DETAILS
   --------------------------------------------------------------------------
   Requirements §32 lists what has to be real before launch. Until then every
   value below is a stand-in, and PLACEHOLDERS is the single list to walk at
   launch rather than grepping the whole site.

   There are no contact details here. An email and a phone number sat in this
   file waiting for a footer to render them, and nothing ever did - so they
   were deleted. A placeholder nobody reads is how a placeholder reaches
   production. When a footer exists, add the value AND the element that shows
   it in the same change, and make any stand-in an UNMISTAKABLE fake: a
   plausible-looking fake number survives review because nobody notices it,
   and then a customer dials it.
   ========================================================================== */

export const site = {
  company: "MnT Future",
  product: "iSuite AI",
  siteUrl: "https://example.com",

  /* THE REAL BOOKING PAGE, on MnT Future's own CRM. It is external, so
     the three buttons that use it - the header, the hero and the final CTA
     - now leave the site. next/link renders a plain anchor for an absolute
     URL, so nothing else had to change.

     ONE STRING, THREE BUTTONS. §2 requires a single primary CTA across the
     page; that is enforced by every one of them reading this value and by
     the final CTA importing its LABEL from hero.primaryCta. Changing the
     destination is changing this line and nothing else.

     IT REPLACES A PAGE THAT NO LONGER NEEDS BUILDING. /book-a-demo was one
     of the four routes still outstanding. It is not needed now - but see
     the PLACEHOLDERS row below, because the form on the other end has to
     collect what §20 asks for or that qualification is simply lost. */
  bookingUrl: "https://crm.mntfuture.com/b/abb8c76365cd45a4a5c495f33013adea",
} as const;

/* THE PAGES, IN ONE PLACE. The header carried its own copy of this and the
   footer was about to carry a second. Three routes written out twice drift
   the moment a page is renamed, and the way you find out is a visitor
   following a link from the footer that the header no longer has.

   All five 404 today. That is recorded below rather than hidden by not
   linking to them: a named route in the markup is a job anyone can see,
   where a missing legal column is one nobody trips over until a lawyer
   asks. */
export const nav = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
] as const;

export const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
] as const;

/* Walk this list before launch. Add a row whenever a stand-in goes onto the
   site — the cost of an extra row is nothing, the cost of a missed one is a
   placeholder in production. */
export const PLACEHOLDERS = [
  {
    where: "app/globals.css — @theme",
    what: "The brand blue and the ink are now sampled from public/logo.jpg and are real. Everything else — the sky, the night section, the neutrals — is still a chosen palette rather than a supplied one.",
  },
  {
    where: "public/logo.jpg — source quality",
    what: "The logo arrived as a JPEG on white. Keying the white out leaves a faint halo from the compression noise, visible when the mark sits on a mid-tone. A transparent PNG or an SVG master would remove it. logo-mark.png, logo-full.png and app/icon.png are all cut from this one file, so replacing it means recutting all three.",
  },
  {
    where: "app/layout.tsx — fonts",
    what: "Manrope + Instrument Serif, chosen as stand-ins. §32 needs the real brand fonts.",
  },
  {
    where: "lib/site.ts — siteUrl",
    what: "example.com. Must be the real domain before launch or every canonical and share card resolves to nothing. The fake email and phone that sat beside it were deleted rather than left waiting for a footer - they go back when something renders them.",
  },
  {
    where: "public/devices/dashboard-2.png — the figures inside it",
    what: "A real iSuite AI screenshot shown at full size in the hero, so its figures are the most prominent claim on the site — open deals, pipeline value, average first response, and the percentage deltas beside each. They must be real and approved for publication. If the capture came from a demo or test workspace then it is a fabricated statistic on a live page, and the fix is a new capture, never editing the numbers.",
  },
  {
    where: "app/layout.tsx — Tamil and Devanagari glyphs",
    what: "Section 5 shows the assistant replying in Tamil and Hindi, and Manrope has neither script. Those two turns fall back to whatever the OS provides - Nirmala UI on Windows, Noto on Android - so they are legible everywhere and match nothing. Loading Noto Sans Tamil and Noto Sans Devanagari fixes it. Worth doing before launch on a site sold to Tamil-speaking businesses: the one place the product PROVES it speaks Tamil should not be the one place the typography looks borrowed.",
  },
  {
    where: "lib/content/audience.ts — the three photo tiles",
    what: "Section 6 has three dark tiles - Showroom, Salon and Agency - whose `photo.src` is null. They are designed to work empty, so the section is finished and shippable as it stands; a photograph simply slots in behind the existing scrim. What they need is REAL images: the client's own customers or premises, or Indian showroom, salon and small-agency interiors. Stock photography of a Western open-plan office would undercut this section harder than having no photograph at all, which is the one outcome worse than the current state. Each tile's `alt` is written as the shooting brief for the picture that belongs there.",
  },
  {
    where: "components/home/Trust.tsx — the full-FAQ link",
    what: "Section 8 links to /faq because §18 requires a link to the full FAQ, and /faq does not exist. It 404s, the same as /features, /how-it-works and /book-a-demo — which the hero button, the header and the final CTA all point at. Every one of those is a dead route until those four pages are built.",
  },
  {
    where: "lib/site.ts \u2014 what the booking form collects",
    what: "bookingUrl now points at MnT Future's own CRM booking page, so /book-a-demo does not need building. But \u00a720 specifies the fields the lead form should capture \u2014 full name, business name, work email, WhatsApp number, city, business type, team size, whether they run Meta ads, their main enquiry channels and their main business challenge. If the CRM booking form does not ask for those, that qualification is lost at the one point every visitor passes through. Worth opening the link once and checking against \u00a720 before launch.",
  },
  {
    where: "app/privacy and app/terms — not built",
    what: "The footer links to /privacy and /terms and both 404. §31's launch checklist requires a published Privacy Policy and published Terms; they are not drafting jobs for this repo but the routes have to exist and be filled before launch. /features, /how-it-works and /faq are the same - linked from the header and the footer, not yet built.",
  },
  {
    where: "components/site/Footer.tsx — no contact block",
    what: "§32 asks for a company address, a contact email, a phone number and social links before launch and none were supplied, so the footer has none. They were deliberately not invented: a made-up address in a footer is the single most likely thing on a marketing site to be copied into a contract. Send them and the block goes in.",
  },
  {
    where: "components/site/Footer.tsx — trademark line",
    what: "The page names Meta, WhatsApp, Instagram and Facebook throughout. A trademark attribution in the footer is standard for that and is NOT written, because unreviewed legal text is not something to publish on a guess. Worth asking whoever signs off §31 whether they want one.",
  },
  {
    where: "public/logo-full.png — now unused",
    what: "It is the lockup WITH the 'Product of MnT Future' tagline, and it was cut for the footer. The footer sets that tagline as text instead: the tagline is 10.6% of the file's height, so at a legible ~15px the whole lockup is 395px wide and will not fit a 390px phone. The file is kept in case a wide surface wants it.",
  },
] as const;
