import type { FeatureSlug } from "@/lib/content/featureDetails";

/* ==========================================================================
   /features - THE APP'S SCREENS FOR MARKETING AND AUTOMATION & INSIGHTS
   --------------------------------------------------------------------------
   Each feature's picture on Marketing's deck and Automation & Insights'
   recipe is the real product: the app at a phone's width - 390 or 430 CSS
   pixels, captured at twice that on 2026-09-30 - cut to the part the
   feature is about, and converted to WebP in public/features/app. At a
   phone's width the app lays itself out for the space, so the picture is
   drawn at about its real size in a column that narrow; the desktop
   screenshots these replaced came out at a fifth.

   `w` and `h` are the picture's CSS pixels, the file twice that. They size
   its box before a byte of it arrives, so nothing on the page jumps.
   `where` is where in the app it is, said above it; `label` is what it
   shows, as a visitor would say it - its alt text.

   The business's own ad spend and clicks, in the agent's answer, and the
   daily budget in the Marketing AI Agent's thread, are blurred.

   CHAPTER 01 IS NOT HERE: its features show each group's parts of the app
   up close (lib/content/closeups.ts). Nor is Sales: its phone holds the
   app's own phone screens (components/features/sales/phone.tsx).
   ========================================================================== */

export type Shot = {
  src: string;
  w: number;
  h: number;
  where: string;
  label: string;
};

export const featureShots: Partial<Record<FeatureSlug, readonly Shot[]>> = {
  "whatsapp-marketing": [
    {
      src: "/features/app/templates.webp",
      w: 430,
      h: 530,
      where: "Settings · Message templates",
      label: "WhatsApp message templates in iSuite AI, each approved by Meta and marked Utility or Marketing.",
    },
  ],
  "email-marketing": [
    {
      src: "/features/app/email.webp",
      w: 390,
      h: 520,
      where: "Broadcasts · Email campaigns",
      label: "Email campaigns sent through your own Resend key, each a draft with its subject line, and its list built or not yet built.",
    },
  ],
  forms: [
    {
      src: "/features/app/forms.webp",
      w: 390,
      h: 650,
      where: "CRM · Forms",
      label: "Web forms and ad forms: each web form published or a draft, with its submissions, its fields, and a link to copy.",
    },
  ],
  /* The Marketing AI Agent IS Studio (the client, 2026-10-01), so the
     picture is Studio's own screen: its header, as the Analytics AI
     Agent's has, then one Studio thread in order - the request, asked in
     Tanglish, every tool the agent ran, and its next turn, campaign and ad
     set "Created (Paused)".

     THE POSTER ATTACHED TO THE REQUEST IS LEFT OUT, and the bubble closes
     round the words alone. With it the first thing seen was the poster,
     and the user asked for Studio's screen, not a poster. Also left out:
     the agent's questions between the tools and its next turn. The daily
     budget is blurred. A new file name, so no browser keeps the old one. */
  "marketing-ai-agent": [
    {
      src: "/features/app/studio-ads.webp",
      w: 430,
      h: 871,
      where: "Automation · Studio",
      label: "The Marketing AI Agent in Studio, asked in Tanglish for a WhatsApp campaign: the tools it used, then the campaign and ad set it created, both paused.",
    },
  ],
  /* Four of the six automations on the page: the two between the first and
     the fourth carry names misspelt in the app ("Quation Accepted",
     "Quatation sent"), so they are left out rather than shown. */
  automation: [
    {
      src: "/features/app/automation-runs.webp",
      w: 430,
      h: 476,
      where: "Automation · Automations",
      label: "Automations, each started by a trigger - quotation declined, deal won, deal stage changed - with how many times it has run and an on switch.",
    },
  ],
  "analytics-ai-agent": [
    {
      src: "/features/app/studio.webp",
      w: 430,
      h: 736,
      where: "Automation · Studio",
      label: "The Analytics AI Agent, asked whether any ads are running: the tool it used, then its answer, naming each ad.",
    },
  ],
};
