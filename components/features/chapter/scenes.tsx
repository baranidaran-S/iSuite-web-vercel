import { channelIcons } from "@/components/ui/icons";
import { InboxMark } from "@/components/ui/featureIcons";
import { AVATAR_TINTS } from "@/components/features/minis/parts";
import { DocGlyph, SparkGlyph } from "@/components/features/kit/glyphs";
import { features } from "@/lib/content/features";
import type { FeatureSlug } from "@/lib/content/featureDetails";
import { unanswered } from "@/lib/content/queues";

/* ==========================================================================
   WHAT EACH CHAPTER'S LAYER CARRIES
   --------------------------------------------------------------------------
   Every chapter opens on its own layer of the hero's stack, lying in 3D
   with the other three faint around it. This file draws what is ON each
   layer - one part per feature in the chapter - and says where the marks
   that float over it stand.

   A PART IS A FEATURE. The layer is split into one region per feature,
   and pointing at a feature's card in the chapter heading lifts its
   region off the layer. So a part's rectangle is the feature's place in
   the picture, the same way a zone is a capability group's place in the
   feature screens.

   DRAWN LARGE AND KEPT SIMPLE. The layer is 780 by 450, leaning back and
   turned, and it reaches the screen at about two thirds of that. Type is
   set at 15 to 22px so it still reads as type rather than as texture, and
   each part carries only the few things that say what its feature is.

   THE MARKS ARE PLACED BY NUMBER, not measured, and the numbers come from
   the same constants that lay the parts out - ROW below - so a row that
   moves takes its mark with it.

   The same people and words as everywhere else on the site, read from
   queues.ts and features.ts rather than retyped.

   Filled in chapter by chapter, like the feature screens.
   ========================================================================== */

export type Mark = "wa" | "ig" | "fb" | "web" | "ai";

export type ScenePart = {
  feature: FeatureSlug;
  /* Where the part sits on the 780x450 layer. */
  x: number;
  y: number;
  w: number;
  h: number;
  Content: () => React.JSX.Element;
  /* Marks that float over this part, in the part's own coordinates.
     `down` is a message arriving on the layer; `up` is one leaving it.
     `rise` is how high the mark floats - see the channels below for why
     it varies. */
  pins: {
    x: number;
    y: number;
    rise: number;
    mark: Mark;
    flow: "down" | "up";
  }[];
};

export type ChapterSceneDef = { parts: ScenePart[] };

/* ---- 01 CONVERSATIONS ------------------------------------------------------ */

/* The inbox's rows, placed rather than flowed, so the mark over each
   row's channel can be placed from the same numbers. */
const ROW = { top: 72, h: 68, gap: 10, icon: 26 } as const;
const INBOX = { w: 408, h: 410 } as const;

function InboxPart() {
  return (
    <div className="relative h-full rounded-[22px] border border-[#e3e7f0] bg-[#f6f8fc]">
      <div className="absolute inset-x-4 top-4 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-brand text-white">
          <InboxMark className="size-5" />
        </span>
        <span className="text-[22px] font-extrabold text-ink">Inbox</span>
        <span className="ml-auto rounded-full bg-ink px-3 py-1 text-[14px] font-bold text-white">
          All
        </span>
        <span className="rounded-full border border-[#e3e7f0] bg-white px-3 py-1 text-[14px] font-bold text-[#5b6880]">
          Unread
        </span>
      </div>

      {unanswered.map((e, i) => {
        const Icon = channelIcons[e.channel];
        return (
          <div
            key={e.id}
            className="absolute inset-x-4 flex items-center gap-3 rounded-2xl bg-white px-3 shadow-[0_8px_18px_-12px_rgba(10,16,32,0.45)]"
            style={{ top: ROW.top + i * (ROW.h + ROW.gap), height: ROW.h }}
          >
            <span
              className={`grid size-11 shrink-0 place-items-center rounded-full text-[17px] font-bold ${AVATAR_TINTS[i]}`}
            >
              {e.name.charAt(0)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[18px] leading-tight font-extrabold text-ink">
                {e.name}
              </span>
              <span className="mt-0.5 block truncate text-[15px] text-[#5b6880]">
                {e.text}
              </span>
            </span>
            <span
              className="grid shrink-0 place-items-center rounded-full"
              style={{
                width: ROW.icon + 10,
                height: ROW.icon + 10,
                color: `var(--color-${e.channel})`,
                backgroundColor: `color-mix(in oklab, var(--color-${e.channel}) 15%, white)`,
              }}
            >
              <Icon className="size-[18px]" />
            </span>
          </div>
        );
      })}
    </div>
  );
}

const TURNS = features.language.turns;
const TANGLISH = TURNS.find((t) => t.id === "tg") ?? TURNS[0];

function AssistantPart() {
  return (
    <div className="relative h-full rounded-[22px] border border-[#dfe7ff] bg-[linear-gradient(180deg,#f3f6ff,#ffffff)]">
      <div className="absolute inset-x-4 top-4 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#0a5bf5,#00c8f8)] text-white">
          <SparkGlyph className="size-5" />
        </span>
        <span className="text-[20px] font-extrabold text-ink">AI assistant</span>
      </div>

      <div className="absolute inset-x-4 top-[66px] flex gap-1.5">
        {TURNS.map((t) => (
          <span
            key={t.id}
            className={`rounded-full px-2.5 py-1 text-[13px] font-bold ${
              t.id === TANGLISH.id
                ? "bg-brand text-white"
                : "bg-[#eef1f7] text-ink/55"
            }`}
          >
            {t.label}
          </span>
        ))}
      </div>

      <span className="absolute top-[116px] left-4 max-w-[78%] rounded-2xl rounded-tl-md border border-[#e3e7f0] bg-white px-3.5 py-2.5 text-[16px] leading-snug text-ink shadow-sm">
        {TANGLISH.ask}
      </span>

      <span className="absolute top-[196px] right-4 max-w-[86%] rounded-2xl rounded-br-md bg-brand px-3.5 py-2.5 text-[16px] leading-snug text-white shadow-[0_10px_24px_-12px_rgba(10,91,245,0.8)]">
        {TANGLISH.reply}
        <span className="mt-1.5 flex justify-end">
          <span className="rounded bg-white/20 px-1.5 py-0.5 text-[12px] font-bold">
            &#10022; AI
          </span>
        </span>
      </span>

      <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-[#eef3ff] px-3 py-1.5 text-[13px] font-bold text-brand">
        <DocGlyph className="size-4" />
        Answered from your price list
      </span>
    </div>
  );
}

/* Where each channel's mark stands: over the channel badge at the end of
   its row. Worked out from ROW, the part's padding and the badge's size.

   THE FURTHER ROW'S MARK FLOATS HIGHER. The four badges run in a line
   down the end of the rows, and at one height their marks came out 44px
   apart on screen at 49px across - four circles in a heap. Raised from the
   front row to the back one, 65 to 200, each clears the next by about 25px
   and the four fan out up the layer, the furthest highest, which is also
   how things further away look taller in a picture of a stack. */
const RISES = [200, 155, 110, 65];
const badge = (i: number) => ({
  x: INBOX.w - 16 - 12 - (ROW.icon + 10) / 2,
  y: ROW.top + i * (ROW.h + ROW.gap) + ROW.h / 2,
  rise: RISES[i],
});

export const chapterScenes: Partial<Record<string, ChapterSceneDef>> = {
  conversations: {
    parts: [
      {
        feature: "one-inbox",
        x: 20,
        y: 20,
        w: INBOX.w,
        h: INBOX.h,
        Content: InboxPart,
        pins: unanswered.map((e, i) => ({
          ...badge(i),
          mark: e.channel,
          flow: "down" as const,
        })),
      },
      {
        feature: "ai-sales-assistant",
        x: 20 + INBOX.w + 16,
        y: 20,
        w: 780 - 40 - INBOX.w - 16,
        h: INBOX.h,
        Content: AssistantPart,
        /* Over the "✦ AI" badge on the reply - the reply leaving. */
        pins: [{ x: 262, y: 262, rise: 120, mark: "ai", flow: "up" }],
      },
    ],
  },
};
