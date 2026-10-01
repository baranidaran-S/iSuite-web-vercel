import type { FeatureSlug } from "@/lib/content/featureDetails";

/* ==========================================================================
   /features CHAPTER 01 - EACH GROUP, UP CLOSE
   --------------------------------------------------------------------------
   The story layout (components/features/StoryFeature.tsx) shows, for each
   group of a feature's capabilities, the parts of the real app that group
   is about - at about their real size, not the whole screen at 40% with
   its type at 5px. This file is what it shows.

   CAPTURES are the app's own screens and cards, 2026-09-30. Most were
   taken at twice screen resolution, and the settings cards in a window
   1060px wide, so they come out at the width of the picture's column and
   read at their real size. Customers' names, photos, previews and numbers
   are blurred, and so is the business's own AI prompt; the signed-in
   email and every key are left out.

     density  file pixels per CSS pixel, 1 or 2 - how far a picture can be
              drawn past its size and stay sharp
     where    where in the app it is, said above the picture
     files    the files covering it, each at its place (`at`); a picture is
              drawn from the ones its view names
     map      the file that shows the whole screen - the small map under
              the picture marks the part on it

   A GROUP'S VIEWS are one to three parts of the app, shown one above
   another: a capability can live on a different screen from its
   neighbours (the widget's code in Settings, its answers on a website).

   A PIN IS A CAPABILITY THE CAPTURE REALLY SHOWS - numbered by its place
   in the group's list, which carries the same numbers - with `box`, the
   thing itself, ringed while the capability is pointed at. A capability no
   capture shows has no pin; nothing is drawn onto the product for it.

   Coordinates are the capture's CSS pixels.
   ========================================================================== */

export type Rect = { x: number; y: number; w: number; h: number };

export type Capture = {
  w: number;
  h: number;
  density: 1 | 2;
  where: string;
  files: Readonly<Record<string, { src: string; at: Rect }>>;
  map?: string;
};

export type View = { capture: string; rect: Rect; files: readonly string[] };

export type Pin = { view: number; x: number; y: number; box?: Rect };

export type GroupShot = { views: readonly View[]; pins: Readonly<Record<string, Pin>> };

export type Closeup = {
  /* The screen shown whole until the first group is reached. */
  overview: { capture: string; file: string };
  captures: Readonly<Record<string, Capture>>;
  groups: Readonly<Record<string, GroupShot>>;
};

const whole = (w: number, h: number): Rect => ({ x: 0, y: 0, w, h });

export const closeups: Partial<Record<FeatureSlug, Closeup>> = {
  /* ==== UNIFIED INBOX ====================================================
     The inbox with one conversation open, and the same screen with the
     list's filter open - the filter is what names the four channels. */
  "unified-inbox": {
    overview: { capture: "inbox", file: "whole" },
    captures: {
      inbox: {
        w: 1790,
        h: 879,
        density: 2,
        where: "Inbox",
        map: "whole",
        files: {
          whole: { src: "/features/inbox/inbox.webp", at: whole(1790, 879) },
          list: { src: "/features/inbox/list.webp", at: { x: 256, y: 64, w: 320, h: 815 } },
          filter: { src: "/features/inbox/filter.webp", at: { x: 264, y: 116, w: 136, h: 358 } },
          thread: { src: "/features/inbox/thread.webp", at: { x: 576, y: 64, w: 924, h: 694 } },
          control: { src: "/features/inbox/control.webp", at: { x: 576, y: 758, w: 924, h: 121 } },
          panel: { src: "/features/inbox/panel.webp", at: { x: 1500, y: 64, w: 290, h: 436 } },
        },
      },
    },
    groups: {
      channels: {
        views: [{ capture: "inbox", rect: { x: 256, y: 64, w: 320, h: 520 }, files: ["list", "filter"] }],
        pins: {
          whatsapp: { view: 0, x: 374, y: 368, box: { x: 274, y: 357, w: 86, h: 22 } },
          instagram: { view: 0, x: 374, y: 396, box: { x: 274, y: 385, w: 86, h: 22 } },
          messenger: { view: 0, x: 374, y: 452, box: { x: 274, y: 441, w: 92, h: 22 } },
          webchat: { view: 0, x: 374, y: 424, box: { x: 274, y: 413, w: 86, h: 22 } },
          filters: { view: 0, x: 482, y: 133, box: { x: 268, y: 76, w: 296, h: 70 } },
        },
      },
      thread: {
        views: [{ capture: "inbox", rect: { x: 576, y: 64, w: 924, h: 520 }, files: ["thread"] }],
        pins: {
          history: { view: 0, x: 1164, y: 284, box: { x: 594, y: 266, w: 558, h: 44 } },
          "ai-badge": { view: 0, x: 1364, y: 504, box: { x: 1378, y: 496, w: 34, h: 16 } },
          status: { view: 0, x: 1358, y: 114, box: { x: 1329, y: 83, w: 58, h: 22 } },
          assign: { view: 0, x: 1441, y: 114, box: { x: 1401, y: 83, w: 80, h: 22 } },
        },
      },
      control: {
        views: [{ capture: "inbox", rect: { x: 576, y: 590, w: 924, h: 289 }, files: ["thread", "control"] }],
        pins: {
          auto: { view: 0, x: 1036, y: 778, box: { x: 588, y: 767, w: 238, h: 22 } },
          takeover: { view: 0, x: 1377, y: 778, box: { x: 1390, y: 764, w: 96, h: 28 } },
          draft: { view: 0, x: 1006, y: 867, box: { x: 673, y: 858, w: 322, h: 18 } },
          attach: { view: 0, x: 606, y: 866, box: { x: 593, y: 825, w: 27, h: 27 } },
        },
      },
      customer: {
        views: [{ capture: "inbox", rect: { x: 1500, y: 64, w: 290, h: 436 }, files: ["panel"] }],
        pins: {
          contact: { view: 0, x: 1519, y: 210, box: { x: 1528, y: 196, w: 232, h: 28 } },
          tags: { view: 0, x: 1594, y: 268, box: { x: 1516, y: 257, w: 250, h: 48 } },
          deals: { view: 0, x: 1602, y: 342, box: { x: 1516, y: 331, w: 250, h: 48 } },
          notes: { view: 0, x: 1604, y: 416, box: { x: 1516, y: 405, w: 250, h: 82 } },
        },
      },
    },
  },

  /* ==== WEBSITE AI CHAT WIDGET ===========================================
     The widget's settings in the app - its switch, name, colour, greeting,
     phone rule, and the one line that installs it - and the widget open on
     the business's own website, answering. */
  "website-ai-chat-widget": {
    overview: { capture: "site", file: "whole" },
    captures: {
      site: {
        w: 1787,
        h: 880,
        density: 1,
        where: "Your website",
        map: "whole",
        files: { whole: { src: "/features/website-chat-widget.webp", at: whole(1787, 880) } },
      },
      settings: {
        w: 756,
        h: 524,
        density: 2,
        where: "Settings · Website Live Chat",
        files: { card: { src: "/features/widget/settings.webp", at: whole(756, 524) } },
      },
      install: {
        w: 756,
        h: 257,
        density: 2,
        where: "Settings · Website Live Chat",
        files: { card: { src: "/features/widget/install.webp", at: whole(756, 257) } },
      },
    },
    groups: {
      /* The line to paste, "Works on any website", and the switch. */
      install: {
        views: [
          { capture: "install", rect: whole(756, 257), files: ["card"] },
          { capture: "settings", rect: { x: 13, y: 106, w: 730, h: 80 }, files: ["card"] },
        ],
        pins: {
          snippet: { view: 0, x: 742, y: 132, box: { x: 25, y: 107, w: 705, h: 50 } },
          anysite: { view: 0, x: 698, y: 223, box: { x: 25, y: 214, w: 660, h: 18 } },
          switch: { view: 1, x: 660, y: 146, box: { x: 676, y: 134, w: 48, h: 24 } },
        },
      },
      /* The fields that set them, and the widget wearing them. */
      look: {
        views: [
          { capture: "settings", rect: { x: 13, y: 184, w: 730, h: 186 }, files: ["card"] },
          { capture: "site", rect: { x: 1294, y: 130, w: 472, h: 152 }, files: ["whole"] },
        ],
        pins: {
          title: { view: 0, x: 110, y: 200, box: { x: 25, y: 214, w: 345, h: 34 } },
          color: { view: 0, x: 472, y: 200, box: { x: 387, y: 214, w: 343, h: 34 } },
          greeting: { view: 0, x: 94, y: 272, box: { x: 25, y: 286, w: 705, h: 62 } },
        },
      },
      /* The AI's answer to a visitor, and the buttons its next question
         offers. A teammate taking over is not in any capture. */
      answers: {
        views: [{ capture: "site", rect: { x: 1294, y: 212, w: 472, h: 552 }, files: ["whole"] }],
        pins: {
          ai: { view: 0, x: 1630, y: 412, box: { x: 1362, y: 390, w: 252, h: 248 } },
          buttons: { view: 0, x: 1334, y: 738, box: { x: 1350, y: 722, w: 384, h: 34 } },
        },
      },
      /* The settings say where chats land and require a number; the
         widget's own attach button. */
      inbox: {
        views: [
          { capture: "settings", rect: { x: 0, y: 0, w: 756, h: 460 }, files: ["card"] },
          { capture: "site", rect: { x: 1294, y: 764, w: 472, h: 102 }, files: ["whole"] },
        ],
        pins: {
          phone: { view: 0, x: 660, y: 416, box: { x: 676, y: 404, w: 48, h: 24 } },
          landed: { view: 0, x: 460, y: 81, box: { x: 25, y: 52, w: 700, h: 40 } },
          files: { view: 1, x: 1326, y: 778, box: { x: 1314, y: 790, w: 24, h: 26 } },
        },
      },
    },
  },

  /* ==== SALES AI AGENT ===================================================
     A WhatsApp conversation in Tamil the agent answered and booked, and
     the agent's own pages in the app: Setup, Handoffs, the Playground. The
     provider-and-key card is left out, and the business's instructions are
     blurred but for their first line. */
  "sales-ai-agent": {
    overview: { capture: "chat", file: "whole" },
    captures: {
      chat: {
        w: 1373,
        h: 1145,
        density: 1,
        where: "Inbox",
        map: "whole",
        files: { whole: { src: "/features/sales-ai-agent.webp", at: whole(1373, 1145) } },
      },
      context: { w: 756, h: 510, density: 2, where: "AI Agents · Setup", files: { card: { src: "/features/agent/context.webp", at: whole(756, 510) } } },
      followup: { w: 756, h: 250, density: 2, where: "AI Agents · Setup", files: { card: { src: "/features/agent/followup.webp", at: whole(756, 250) } } },
      actions: { w: 756, h: 178, density: 2, where: "AI Agents · Setup", files: { card: { src: "/features/agent/actions.webp", at: whole(756, 178) } } },
      limits: { w: 756, h: 105, density: 2, where: "AI Agents · Setup", files: { card: { src: "/features/agent/limits.webp", at: whole(756, 105) } } },
      reasons: { w: 756, h: 185, density: 2, where: "AI Agents · Handoffs", files: { card: { src: "/features/agent/reasons.webp", at: whole(756, 185) } } },
      who: { w: 756, h: 320, density: 2, where: "AI Agents · Handoffs", files: { card: { src: "/features/agent/who.webp", at: whole(756, 320) } } },
      nobody: { w: 756, h: 94, density: 2, where: "AI Agents · Handoffs", files: { card: { src: "/features/agent/nobody.webp", at: whole(756, 94) } } },
      playground: { w: 756, h: 300, density: 2, where: "AI Agents · Playground", files: { card: { src: "/features/agent/playground.webp", at: whole(756, 300) } } },
      /* The same Tamil question and reply, captured again at a phone's
         width (2026-10-01): from the desktop chat they had to be drawn at
         half size, their type 7-8px on a laptop. */
      tamil: { w: 424, h: 235, density: 2, where: "Inbox", files: { chat: { src: "/features/agent/tamil.webp", at: whole(424, 235) } } },
      /* The bar every conversation the agent answers carries, from the
         sharper inbox capture - the chat above is plain resolution. */
      bar: {
        w: 1790,
        h: 879,
        density: 2,
        where: "Inbox",
        files: { control: { src: "/features/inbox/control.webp", at: { x: 576, y: 758, w: 924, h: 121 } } },
      },
    },
    groups: {
      /* The Tamil question and reply; what it is told - its first line,
         the rest blurred - and its goal. Ad briefs are not in any capture. */
      language: {
        views: [
          { capture: "tamil", rect: { x: 0, y: 0, w: 424, h: 235 }, files: ["chat"] },
          { capture: "context", rect: { x: 13, y: 0, w: 730, h: 118 }, files: ["card"] },
          { capture: "context", rect: { x: 13, y: 360, w: 730, h: 150 }, files: ["card"] },
        ],
        pins: {
          languages: { view: 0, x: 296, y: 16, box: { x: 16, y: 10, w: 269, h: 55 } },
          knowledge: { view: 1, x: 252, y: 14, box: { x: 25, y: 30, w: 706, h: 80 } },
          goal: { view: 2, x: 218, y: 372, box: { x: 25, y: 387, w: 706, h: 80 } },
        },
      },
      /* Allowed to check the calendar and book; the confirmation it sent. */
      booking: {
        views: [
          { capture: "actions", rect: { x: 13, y: 0, w: 730, h: 178 }, files: ["card"] },
          { capture: "chat", rect: { x: 686, y: 470, w: 642, h: 382 }, files: ["whole"] },
        ],
        pins: {
          slots: { view: 0, x: 196, y: 101, box: { x: 38, y: 88, w: 520, h: 44 } },
          books: { view: 0, x: 314, y: 145, box: { x: 38, y: 132, w: 690, h: 44 } },
          confirm: { view: 1, x: 1258, y: 645, box: { x: 700, y: 578, w: 540, h: 112 } },
        },
      },
      /* A reason of the business's own, a rule for who gets the handoff,
         the ladder when nobody answers - and Take over, in the inbox. */
      handoff: {
        views: [
          { capture: "reasons", rect: { x: 13, y: 16, w: 730, h: 169 }, files: ["card"] },
          { capture: "who", rect: { x: 13, y: 194, w: 730, h: 126 }, files: ["card"] },
          { capture: "nobody", rect: { x: 13, y: 0, w: 730, h: 94 }, files: ["card"] },
          { capture: "bar", rect: { x: 576, y: 758, w: 924, h: 40 }, files: ["control"] },
        ],
        pins: {
          reasons: { view: 0, x: 258, y: 137, box: { x: 25, y: 115, w: 706, h: 63 } },
          routing: { view: 1, x: 178, y: 224, box: { x: 25, y: 202, w: 706, h: 113 } },
          escalation: { view: 2, x: 326, y: 18, box: { x: 25, y: 5, w: 290, h: 26 } },
          takeover: { view: 3, x: 1377, y: 778, box: { x: 1390, y: 764, w: 96, h: 28 } },
        },
      },
      /* Follow-ups inside WhatsApp's 24 hours, Draft with AI, the reply
         limit, and the Playground's own line. */
      rules: {
        views: [
          { capture: "followup", rect: { x: 13, y: 0, w: 730, h: 250 }, files: ["card"] },
          { capture: "limits", rect: { x: 13, y: 0, w: 730, h: 105 }, files: ["card"] },
          { capture: "playground", rect: { x: 0, y: 0, w: 756, h: 58 }, files: ["card"] },
        ],
        pins: {
          window: { view: 0, x: 335, y: 23, box: { x: 25, y: 0, w: 706, h: 162 } },
          drafts: { view: 0, x: 180, y: 202, box: { x: 25, y: 182, w: 706, h: 60 } },
          replylimit: { view: 1, x: 271, y: 11, box: { x: 25, y: 0, w: 706, h: 28 } },
          playground: { view: 2, x: 368, y: 28, box: { x: 0, y: 0, w: 756, h: 58 } },
        },
      },
    },
  },
};
