import { CheckIcon, channelIcons } from "@/components/ui/icons";
import {
  AdsMark,
  AutomationMark,
  BroadcastMark,
  CalendarMark,
  CaptureMark,
  CommerceMark,
  ContactsMark,
  FollowUpMark,
  InboxMark,
  OperationsMark,
  PipelineMark,
  ReportsMark,
  TeamMark,
} from "@/components/ui/featureIcons";
import { AVATAR_TINTS } from "@/components/features/minis/parts";
import { HandGlyph, RepeatGlyph, SparkGlyph } from "@/components/features/kit/glyphs";
import { features } from "@/lib/content/features";
import type { FeatureSlug } from "@/lib/content/featureDetails";
import { unanswered } from "@/lib/content/queues";

/* ==========================================================================
   A CHAPTER'S FLOW
   --------------------------------------------------------------------------
   Each chapter opens on how its part of the system MOVES - what comes in,
   where it goes, what comes out - drawn as a few nodes and the wires
   between them, with the traffic travelling the wires.

   ONE PICTURE PER KIND OF THING, AND THIS IS THE THIRD KIND. The hero
   shows the product's STRUCTURE, four layers taken apart. Each feature
   shows its SCREEN. This shows the MOVEMENT. The chapter openings were
   first the hero's stack again with one layer lit, and that was the same
   picture twice in a row - the hero ends on a stack and the next thing on
   the page was another one - four more times down the page, with an inbox
   drawn on it directly above the section that draws the inbox in full.

   NO INTERFACE IN IT. Nodes carry a mark and a name, never a screen, so
   nothing here repeats the feature sections underneath.

   THE TRAFFIC IS PEOPLE AND LANGUAGES, NOT DOTS. What travels in is a
   customer - Anand on WhatsApp, Nisha on Instagram, Prakash on Messenger,
   Farah from the website, the four the whole site follows - and what
   travels out of the assistant is a reply tagged with the language it was
   written in. The picture then says the chapter's two sentences by itself:
   everyone arrives in one place, and each is answered in their own words.

   POINTING AT A FEATURE LIGHTS ITS PART OF THE FLOW. The chapter heading's
   feature cards say which feature is being pointed at; its nodes, wires
   and traffic stay lit and the rest steps back.

   TWO DRAWINGS OF EACH FLOW: wide, read left to right, and tall, read top
   to bottom for a phone - where a wide one scaled down to fit would set
   its labels at six pixels - and beside the chapter's words from 1024 to
   1279 (WIDE_SHOWN, below). Both are a fixed size, scaled whole to their
   column in CSS, like the feature screens.

   The traffic and the ring round the inbox are the only moving parts.
   Under reduced motion the traffic is not drawn and the ring stands still.
   ========================================================================== */

type Lit = string | null;

/* ---- THE PIECES -------------------------------------------------------------- */

/* WHICH DRAWING SHOWS WHERE. The tall one on a phone, and beside the
   chapter's words from 1024 to 1279, where the column is about 385-500px
   - the wide one would be drawn at 46-60% there, its labels too small to
   read, where the tall one is drawn at 92% and up.
   The wide one from 768 to 1023, where the flow has the card's width to
   itself, and from 1280. */
const WIDE_SHOWN = "hidden md:block lg:max-xl:hidden";
const TALL_SHOWN = "md:hidden lg:max-xl:block";

function Box({
  w,
  h,
  className = "",
  children,
}: {
  w: number;
  h: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`@container relative mx-auto w-full ${className}`}
      style={{ aspectRatio: `${w} / ${h}`, maxWidth: w }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: w,
          height: h,
          transform: `scale(tan(atan2(100cqw, ${w}px)))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Whether a piece belonging to `parts` is lit, given what is pointed at. */
const lights = (parts: readonly FeatureSlug[], lit: Lit) =>
  lit === null || parts.includes(lit as FeatureSlug);

type Wire = {
  id: string;
  d: string;
  /* The wire runs from the colour of where it starts to the chapter's
     light, so every channel's traffic arrives in its own colour. */
  from: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  parts: readonly FeatureSlug[];
};

function Wires({
  w,
  h,
  wires,
  lit,
  glow,
}: {
  w: number;
  h: number;
  wires: readonly Wire[];
  lit: Lit;
  glow: string;
}) {
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="absolute inset-0 overflow-visible"
      fill="none"
    >
      <defs>
        {wires.map((wire) => (
          <linearGradient
            key={wire.id}
            id={wire.id}
            gradientUnits="userSpaceOnUse"
            x1={wire.x1}
            y1={wire.y1}
            x2={wire.x2}
            y2={wire.y2}
          >
            <stop offset="0" stopColor={wire.from} />
            <stop offset="1" stopColor={glow} />
          </linearGradient>
        ))}
      </defs>
      {wires.map((wire) => (
        <g
          key={wire.id}
          className="transition-opacity duration-500"
          style={{ opacity: lights(wire.parts, lit) ? 1 : 0.18 }}
        >
          <path
            d={wire.d}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth={8}
            strokeLinecap="round"
          />
          <path
            d={wire.d}
            stroke={`url(#${wire.id})`}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

/* One thing on its way along a wire. Placed at the box's origin, so the
   wire's own coordinates are the path it follows. */
function Traveller({
  d,
  delay,
  dur = 2.8,
  quick = false,
  lit,
  parts,
  children,
}: {
  d: string;
  delay: number;
  dur?: number;
  /* Travels in the first quarter of its loop - for several sharing one
     wire. See anim-flow-quick in globals.css. */
  quick?: boolean;
  lit: Lit;
  parts: readonly FeatureSlug[];
  children: React.ReactNode;
}) {
  return (
    <span
      className={`${quick ? "anim-flow-quick" : "anim-flow"} absolute top-0 left-0 opacity-0`}
      style={
        {
          offsetPath: `path("${d}")`,
          offsetRotate: "0deg",
          "--d": `${delay}s`,
          "--dur": `${dur}s`,
          visibility: lights(parts, lit) ? "visible" : "hidden",
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}

/* A node's frame: frosted glass on the chapter's colour. */
function Node({
  x,
  y,
  w,
  h,
  on,
  className = "",
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  on: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-2xl border border-white/20 bg-white/[0.1] shadow-[0_24px_50px_-28px_rgba(2,8,24,0.9)] backdrop-blur-md transition-opacity duration-500 ${className}`}
      style={{ left: x, top: y, width: w, height: h, opacity: on ? 1 : 0.28 }}
    >
      {children}
    </div>
  );
}

/* The hub every flow runs through: a disc of glass with a ring of light
   turning slowly round it - the one place in the chapter everything
   passes, drawn as the brightest thing in the picture. */
function Hub({
  cx,
  cy,
  r,
  on,
  children,
}: {
  cx: number;
  cy: number;
  r: number;
  on: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute transition-opacity duration-500"
      style={{
        left: cx - r,
        top: cy - r,
        width: r * 2,
        height: r * 2,
        opacity: on ? 1 : 0.28,
      }}
    >
      <span className="absolute -inset-10 rounded-full bg-white/20 blur-3xl" />
      {/* Masked to its outer 3px, so the light runs round the rim and
          does not show through the glass as a wedge. */}
      <span className="anim-ring absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_200deg,rgba(255,255,255,0.95)_300deg,transparent_360deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2.5px))]" />
      <span className="anim-pin-ping absolute inset-0 rounded-full border-2 border-white/50 opacity-0" />
      <div className="absolute inset-0 rounded-full border border-white/35 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.32),rgba(255,255,255,0.08)_70%)] shadow-[0_0_90px_-10px_rgba(140,180,255,0.95)] backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

/* ==========================================================================
   01 CONVERSATIONS
   --------------------------------------------------------------------------
   Four channels in, one inbox, and two ways out: the assistant's reply,
   and what it hands to the team. The first half is One Inbox and the
   second is the AI Sales Assistant, which is how the two feature cards
   beside it split the picture when they are pointed at.

   The labels are claims and are held to the page's rules: "your own
   number" is §6's, and "takes what it hands over" is §7's handoff - the
   team is not drawn as a fallback for an assistant that failed.
   ========================================================================== */

const INBOX: readonly FeatureSlug[] = ["one-inbox"];
const ASSISTANT: readonly FeatureSlug[] = ["ai-sales-assistant"];
const BOTH: readonly FeatureSlug[] = ["one-inbox", "ai-sales-assistant"];

/* In the order of `unanswered`, so channel i is the channel person i wrote
   on - WhatsApp, Instagram, Messenger, website. */
const CHANNELS = [
  { id: "wa", name: "WhatsApp", short: "WhatsApp", whose: "Your own number" },
  { id: "ig", name: "Instagram", short: "Instagram", whose: "Direct messages" },
  { id: "fb", name: "Messenger", short: "Messenger", whose: "Your Facebook page" },
  { id: "web", name: "Website chat", short: "Website", whose: "Your website" },
] as const;

/* The colour each channel's wire starts in. The website's own grey is too
   dark to read on the chapter's blue, so it starts white. */
const WIRE_FROM: Record<(typeof CHANNELS)[number]["id"], string> = {
  wa: "#25d366",
  ig: "#ff5c93",
  fb: "#4c95ff",
  web: "#ffffff",
};

const LANGS = features.language.turns;

function ChannelTile({
  id,
  size,
}: {
  id: (typeof CHANNELS)[number]["id"];
  size: number;
}) {
  const Icon = channelIcons[id];
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl bg-white shadow-[0_8px_18px_-8px_rgba(2,8,24,0.8)]"
      style={{ width: size, height: size }}
    >
      <Icon className="size-1/2" style={{ color: `var(--color-${id})` }} />
    </span>
  );
}

/* A customer on the way in: their initial, in the tint the inbox gives
   them everywhere else, ringed in their channel's colour. */
function Sender({ i }: { i: number }) {
  const person = unanswered[i];
  return (
    <span
      className={`grid size-[30px] place-items-center rounded-full text-[13px] font-extrabold ring-[3px] ${AVATAR_TINTS[i]}`}
      style={
        {
          "--tw-ring-color": WIRE_FROM[CHANNELS[i].id],
          boxShadow: `0 0 18px 2px color-mix(in oklab, ${WIRE_FROM[CHANNELS[i].id]} 60%, transparent)`,
        } as React.CSSProperties
      }
    >
      {person.name.charAt(0)}
    </span>
  );
}

/* A reply on the way out, tagged with the language it is in. */
function Reply({ label }: { label: string }) {
  return (
    <span className="flex h-[26px] items-center gap-1 rounded-full bg-[linear-gradient(135deg,#0a5bf5,#00c8f8)] px-2.5 text-[12px] font-bold whitespace-nowrap text-white shadow-[0_0_20px_3px_rgba(0,200,248,0.55)]">
      <SparkGlyph className="size-3" />
      {label}
    </span>
  );
}

function Handed() {
  return (
    <span className="flex h-[26px] items-center gap-1 rounded-full bg-[#fff6ea] px-2.5 text-[12px] font-bold whitespace-nowrap text-[#a16326] shadow-[0_0_18px_2px_rgba(255,236,210,0.5)]">
      <HandGlyph className="size-3.5" />
      Payment
    </span>
  );
}

function HubLabel({ deep, small = false }: { deep: string; small?: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <span
        className={`grid place-items-center rounded-2xl bg-white shadow-[0_14px_30px_-12px_rgba(2,8,24,0.9)] ${
          small ? "size-12" : "size-16"
        }`}
        style={{ color: deep }}
      >
        <InboxMark className={small ? "size-6" : "size-8"} />
      </span>
      <span
        className={`mt-2.5 leading-tight font-extrabold text-white ${small ? "text-[16px]" : "text-[19px]"}`}
      >
        One inbox
      </span>
      <span className="mt-0.5 text-[12.5px] text-white/70">
        Shared with your team
      </span>
    </div>
  );
}

function AiLabel({ stacked = false }: { stacked?: boolean }) {
  return (
    <div
      className={`flex h-full items-center gap-3 px-4 ${
        stacked ? "flex-col justify-center gap-2 text-center" : ""
      }`}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#0a5bf5,#00c8f8)] text-white shadow-[0_10px_24px_-10px_rgba(0,200,248,0.9)]">
        <SparkGlyph className="size-5" />
      </span>
      <span>
        <span className="block text-[16px] leading-tight font-extrabold text-white">
          AI sales assistant
        </span>
        <span className="mt-1 block text-[12.5px] leading-snug text-white/70">
          Replies in their language
        </span>
      </span>
    </div>
  );
}

function TeamLabel({ stacked = false }: { stacked?: boolean }) {
  return (
    <div
      className={`flex h-full items-center gap-3 px-4 ${
        stacked ? "flex-col justify-center gap-2 text-center" : ""
      }`}
    >
      <span className="flex shrink-0 -space-x-2">
        {["S", "R"].map((n, i) => (
          <span
            key={n}
            className={`grid size-9 place-items-center rounded-full text-[13px] font-bold ring-2 ring-white/30 ${
              i === 0
                ? "bg-[#e8f0ff] text-[#2f5fd0]"
                : "bg-[#e6f7ee] text-[#1b7a4b]"
            }`}
          >
            {n}
          </span>
        ))}
      </span>
      <span>
        <span className="block text-[16px] leading-tight font-extrabold text-white">
          Your team
        </span>
        <span className="mt-1 block text-[12.5px] leading-snug text-white/70">
          Takes what it hands over
        </span>
      </span>
    </div>
  );
}

/* ---- wide: left to right ------------------------------------------------------ */
const WIDE = { w: 840, h: 520 } as const;
const SRC = { x: 0, w: 232, h: 70, ys: [96, 206, 316, 426] } as const;
const HUB = { cx: 432, cy: 261, r: 96 } as const;
const OUT = { x: 606, w: 234, h: 88, ys: [158, 364] } as const;

const wideIn: Wire[] = SRC.ys.map((y, i) => {
  const x1 = SRC.x + SRC.w;
  const x2 = HUB.cx - HUB.r;
  return {
    id: `flow-conv-wide-in-${i}`,
    d: `M ${x1} ${y} C ${x1 + 62} ${y}, ${x2 - 58} ${HUB.cy}, ${x2} ${HUB.cy}`,
    from: WIRE_FROM[CHANNELS[i].id],
    x1,
    y1: y,
    x2,
    y2: HUB.cy,
    parts: INBOX,
  };
});

const wideOut: Wire[] = OUT.ys.map((y, i) => {
  const x1 = HUB.cx + HUB.r;
  const x2 = OUT.x;
  return {
    id: `flow-conv-wide-out-${i}`,
    d: `M ${x1} ${HUB.cy} C ${x1 + 44} ${HUB.cy}, ${x2 - 40} ${y}, ${x2} ${y}`,
    from: "#ffffff",
    x1,
    y1: HUB.cy,
    x2,
    y2: y,
    parts: ASSISTANT,
  };
});

function ConversationsWide({
  lit,
  deep,
  glow,
}: {
  lit: Lit;
  deep: string;
  glow: string;
}) {
  const inboxOn = lights(INBOX, lit);
  const aiOn = lights(ASSISTANT, lit);
  return (
    <Box w={WIDE.w} h={WIDE.h} className={WIDE_SHOWN}>
      <Wires w={WIDE.w} h={WIDE.h} glow={glow} lit={lit} wires={[...wideIn, ...wideOut]} />

      {CHANNELS.map((c, i) => (
        <Node
          key={c.id}
          x={SRC.x}
          y={SRC.ys[i] - SRC.h / 2}
          w={SRC.w}
          h={SRC.h}
          on={inboxOn}
        >
          <div className="flex h-full items-center gap-3 px-3.5">
            <ChannelTile id={c.id} size={42} />
            <span>
              <span className="block text-[17px] leading-tight font-bold text-white">
                {c.name}
              </span>
              <span className="mt-0.5 block text-[13px] text-white/65">
                {c.whose}
              </span>
            </span>
          </div>
        </Node>
      ))}

      <Hub cx={HUB.cx} cy={HUB.cy} r={HUB.r} on={lights(BOTH, lit)}>
        <HubLabel deep={deep} />
      </Hub>

      <Node x={OUT.x} y={OUT.ys[0] - OUT.h / 2} w={OUT.w} h={OUT.h} on={aiOn}>
        <AiLabel />
      </Node>
      <Node x={OUT.x} y={OUT.ys[1] - OUT.h / 2} w={OUT.w} h={OUT.h} on={aiOn}>
        <TeamLabel />
      </Node>

      {wideIn.map((wire, i) => (
        <Traveller key={wire.id} d={wire.d} delay={i * 0.7} lit={lit} parts={INBOX}>
          <Sender i={i} />
        </Traveller>
      ))}
      {LANGS.map((t, i) => (
        <Traveller
          key={t.id}
          d={wideOut[0].d}
          delay={1.5 + i * 1.4}
          dur={5.6}
          quick
          lit={lit}
          parts={ASSISTANT}
        >
          <Reply label={t.label} />
        </Traveller>
      ))}
      <Traveller d={wideOut[1].d} delay={2.2} dur={5.6} lit={lit} parts={ASSISTANT}>
        <Handed />
      </Traveller>
    </Box>
  );
}

/* ---- tall: top to bottom, for a phone ------------------------------------------ */
const TALL = { w: 420, h: 640 } as const;
const TSRC = { y: 58, size: 62, xs: [57, 161, 265, 369] } as const;
const THUB = { cx: 210, cy: 318, r: 84 } as const;
const TOUT = { top: 488, h: 136, w: 194, xs: [11, 215] } as const;

const tallIn: Wire[] = TSRC.xs.map((x, i) => {
  const y1 = TSRC.y + TSRC.size / 2 + 34;
  const y2 = THUB.cy - THUB.r;
  return {
    id: `flow-conv-tall-in-${i}`,
    d: `M ${x} ${y1} C ${x} ${y1 + 60}, ${THUB.cx} ${y2 - 64}, ${THUB.cx} ${y2}`,
    from: WIRE_FROM[CHANNELS[i].id],
    x1: x,
    y1,
    x2: THUB.cx,
    y2,
    parts: INBOX,
  };
});

const tallOut: Wire[] = TOUT.xs.map((x, i) => {
  const y1 = THUB.cy + THUB.r;
  const x2 = x + TOUT.w / 2;
  return {
    id: `flow-conv-tall-out-${i}`,
    d: `M ${THUB.cx} ${y1} C ${THUB.cx} ${y1 + 40}, ${x2} ${TOUT.top - 40}, ${x2} ${TOUT.top}`,
    from: "#ffffff",
    x1: THUB.cx,
    y1,
    x2,
    y2: TOUT.top,
    parts: ASSISTANT,
  };
});

function ConversationsTall({
  lit,
  deep,
  glow,
}: {
  lit: Lit;
  deep: string;
  glow: string;
}) {
  const inboxOn = lights(INBOX, lit);
  const aiOn = lights(ASSISTANT, lit);
  return (
    <Box w={TALL.w} h={TALL.h} className={TALL_SHOWN}>
      <Wires w={TALL.w} h={TALL.h} glow={glow} lit={lit} wires={[...tallIn, ...tallOut]} />

      {CHANNELS.map((c, i) => (
        <div
          key={c.id}
          className="absolute flex flex-col items-center transition-opacity duration-500"
          style={{
            left: TSRC.xs[i] - 50,
            top: TSRC.y - TSRC.size / 2,
            width: 100,
            opacity: inboxOn ? 1 : 0.28,
          }}
        >
          <span
            className="grid place-items-center rounded-2xl border border-white/20 bg-white/[0.1] backdrop-blur-md"
            style={{ width: TSRC.size, height: TSRC.size }}
          >
            <ChannelTile id={c.id} size={44} />
          </span>
          <span className="mt-2 text-[15px] font-bold text-white">{c.short}</span>
        </div>
      ))}

      <Hub cx={THUB.cx} cy={THUB.cy} r={THUB.r} on={lights(BOTH, lit)}>
        <HubLabel deep={deep} small />
      </Hub>

      {TOUT.xs.map((x, i) => (
        <Node key={x} x={x} y={TOUT.top} w={TOUT.w} h={TOUT.h} on={aiOn}>
          {i === 0 ? <AiLabel stacked /> : <TeamLabel stacked />}
        </Node>
      ))}

      {tallIn.map((wire, i) => (
        <Traveller key={wire.id} d={wire.d} delay={i * 0.7} lit={lit} parts={INBOX}>
          <Sender i={i} />
        </Traveller>
      ))}
      {LANGS.map((t, i) => (
        <Traveller
          key={t.id}
          d={tallOut[0].d}
          delay={1.5 + i * 1.4}
          dur={5.6}
          quick
          lit={lit}
          parts={ASSISTANT}
        >
          <Reply label={t.label} />
        </Traveller>
      ))}
      <Traveller d={tallOut[1].d} delay={2.2} dur={5.6} lit={lit} parts={ASSISTANT}>
        <Handed />
      </Traveller>
    </Box>
  );
}

function ConversationsFlow({ lit, accent, deep }: FlowProps) {
  const glow = `color-mix(in oklab, ${accent} 30%, white)`;
  return (
    <>
      <ConversationsWide lit={lit} deep={deep} glow={glow} />
      <ConversationsTall lit={lit} deep={deep} glow={glow} />
    </>
  );
}

/* ==========================================================================
   THE PIECES THE LATER CHAPTERS SHARE
   --------------------------------------------------------------------------
   A mark on a white tile, a name and a line - side by side where a node
   is wide, stacked where it is narrow - and a hub with a mark, a name and
   a line. What travels is a customer's initial or a small round mark,
   never a labelled chip: these wires are a node's width long, and a label
   would cover the wire it is meant to be moving along.
   ========================================================================== */

function Tile({
  color,
  size = 40,
  children,
}: {
  color: string;
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl bg-white shadow-[0_8px_18px_-8px_rgba(2,8,24,0.8)]"
      style={{ width: size, height: size, color }}
    >
      {children}
    </span>
  );
}

function NodeText({
  tile,
  title,
  line,
  stacked = false,
}: {
  tile: React.ReactNode;
  title: string;
  line: string;
  stacked?: boolean;
}) {
  return (
    <div
      className={`flex h-full items-center gap-3 px-3.5 ${
        stacked ? "flex-col justify-center gap-2 text-center" : ""
      }`}
    >
      {tile}
      <span className="min-w-0">
        <span className="block text-[16px] leading-tight font-extrabold text-white">
          {title}
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-white/70">
          {line}
        </span>
      </span>
    </div>
  );
}

function HubText({
  mark,
  title,
  line,
  deep,
  small = false,
  children,
}: {
  mark: React.ReactNode;
  title: string;
  line: string;
  deep: string;
  small?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
      <span
        className={`grid place-items-center rounded-2xl bg-white shadow-[0_14px_30px_-12px_rgba(2,8,24,0.9)] ${
          small ? "size-11" : "size-14"
        }`}
        style={{ color: deep }}
      >
        {mark}
      </span>
      <span
        className={`mt-2 leading-tight font-extrabold text-white ${small ? "text-[15px]" : "text-[17px]"}`}
      >
        {title}
      </span>
      <span className="mt-0.5 text-[12px] leading-snug text-white/70">
        {line}
      </span>
      {children}
    </div>
  );
}

/* A small round mark on its way along a wire. */
function Pip({
  color,
  brand = false,
  children,
}: {
  color: string;
  brand?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`grid size-[28px] place-items-center rounded-full shadow-[0_0_18px_3px_rgba(255,255,255,0.45)] ${
        brand ? "bg-[linear-gradient(135deg,#0a5bf5,#00c8f8)] text-white" : "bg-white"
      }`}
      style={brand ? undefined : { color }}
    >
      {children}
    </span>
  );
}

/* Wires from the foot of a hub out to a row of nodes - the tall
   drawing's way out. */
function tallOuts(
  prefix: string,
  centres: readonly number[],
  top: number,
  hub: { cx: number; cy: number; r: number },
  parts: readonly (readonly FeatureSlug[])[],
): Wire[] {
  const y1 = hub.cy + hub.r;
  return centres.map((x2, i) => ({
    id: `${prefix}-out-${i}`,
    d: `M ${hub.cx} ${y1} C ${hub.cx} ${y1 + 40}, ${x2} ${top - 40}, ${x2} ${top}`,
    from: "#ffffff",
    x1: hub.cx,
    y1,
    x2,
    y2: top,
    parts: parts[i],
  }));
}

/* ==========================================================================
   02 SALES
   --------------------------------------------------------------------------
   An enquiry becomes a contact, the contact becomes a deal on the board,
   and the deal sends out the two things that move it along - a follow-up
   with a date, and an appointment in the calendar. Four features, four
   nodes, in the order a lead meets them.

   What travels is Anand's own progress: his initial arrives, his contact
   card moves on to the board, and the board sends a reminder and a
   booking.
   ========================================================================== */

const CONTACTS: readonly FeatureSlug[] = ["contacts"];
const PIPELINE: readonly FeatureSlug[] = ["sales-pipeline"];
const FOLLOWS: readonly FeatureSlug[] = ["follow-ups"];
const BOOKINGS: readonly FeatureSlug[] = ["appointments"];

function EnquiryNode({ stacked = false }: { stacked?: boolean }) {
  return (
    <div
      className={`flex h-full items-center gap-3 px-3.5 ${
        stacked ? "flex-col justify-center gap-2 text-center" : ""
      }`}
    >
      <span className={`grid shrink-0 gap-1 ${stacked ? "grid-cols-4" : "grid-cols-2"}`}>
        {(["wa", "ig", "fb", "web"] as const).map((c) => {
          const Icon = channelIcons[c];
          return (
            <span
              key={c}
              className={`grid place-items-center rounded-md bg-white shadow-[0_6px_14px_-6px_rgba(2,8,24,0.8)] ${stacked ? "size-[24px]" : "size-[18px]"}`}
            >
              <Icon className={stacked ? "size-3.5" : "size-3"} style={{ color: `var(--color-${c})` }} />
            </span>
          );
        })}
      </span>
      <span className="min-w-0">
        <span className="block text-[16px] leading-tight font-extrabold text-white">
          New enquiry
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-white/70">
          From any channel
        </span>
      </span>
    </div>
  );
}

/* The board, drawn as its stages - four steps with a deal on the second.
   The words are the pipeline's own heading cut to fit a circle: "A deal
   on your board" ran to the rim at 17px. */
function StageDots() {
  return (
    <span className="mt-2 flex items-center gap-1">
      {[0, 1, 2, 3].map((s) => (
        <span
          key={s}
          className={`h-1.5 rounded-full ${s === 1 ? "w-5 bg-white" : "w-2.5 bg-white/35"}`}
        />
      ))}
    </span>
  );
}

/* ---- wide: every node stacked, the way the two on the right always were.
   Side by side, "New enquiry" had 84px beside its four channel marks and
   broke into four lines. */
const SW = { w: 840, h: 520 } as const;
const S_ENQ = { x: 0, w: 158, h: 132, cy: 260 } as const;
const S_CON = { x: 222, w: 158, h: 132, cy: 260 } as const;
const S_HUB = { cx: 538, cy: 260, r: 96 } as const;
const S_OUT = { x: 690, w: 150, h: 116, ys: [128, 392] } as const;

const salesWide: Wire[] = [
  {
    id: "flow-sales-wide-enq",
    d: `M ${S_ENQ.x + S_ENQ.w} ${S_ENQ.cy} H ${S_CON.x}`,
    from: "#ffffff",
    x1: S_ENQ.x + S_ENQ.w,
    y1: S_ENQ.cy,
    x2: S_CON.x,
    y2: S_CON.cy,
    parts: CONTACTS,
  },
  {
    id: "flow-sales-wide-con",
    d: `M ${S_CON.x + S_CON.w} ${S_CON.cy} H ${S_HUB.cx - S_HUB.r}`,
    from: "#ffffff",
    x1: S_CON.x + S_CON.w,
    y1: S_CON.cy,
    x2: S_HUB.cx - S_HUB.r,
    y2: S_HUB.cy,
    parts: PIPELINE,
  },
  ...S_OUT.ys.map((y, i) => {
    const x1 = S_HUB.cx + S_HUB.r * 0.7;
    const y1 = S_HUB.cy + (i === 0 ? -1 : 1) * S_HUB.r * 0.7;
    return {
      id: `flow-sales-wide-out-${i}`,
      d: `M ${x1} ${y1} C ${x1 + 40} ${y1 + (i === 0 ? -40 : 40)}, ${S_OUT.x - 40} ${y}, ${S_OUT.x} ${y}`,
      from: "#ffffff",
      x1,
      y1,
      x2: S_OUT.x,
      y2: y,
      parts: i === 0 ? FOLLOWS : BOOKINGS,
    };
  }),
];

function SalesWide({ lit, deep, glow }: { lit: Lit; deep: string; glow: string }) {
  return (
    <Box w={SW.w} h={SW.h} className={WIDE_SHOWN}>
      <Wires w={SW.w} h={SW.h} glow={glow} lit={lit} wires={salesWide} />

      <Node x={S_ENQ.x} y={S_ENQ.cy - S_ENQ.h / 2} w={S_ENQ.w} h={S_ENQ.h} on={lights(CONTACTS, lit)}>
        <EnquiryNode stacked />
      </Node>
      <Node x={S_CON.x} y={S_CON.cy - S_CON.h / 2} w={S_CON.w} h={S_CON.h} on={lights(CONTACTS, lit)}>
        <NodeText stacked tile={<Tile color={deep}><ContactsMark className="size-5" /></Tile>} title="Contact" line="One record, your fields" />
      </Node>
      <Hub cx={S_HUB.cx} cy={S_HUB.cy} r={S_HUB.r} on={lights(PIPELINE, lit)}>
        <HubText deep={deep} mark={<PipelineMark className="size-7" />} title="Your pipeline" line="A place for every lead">
          <StageDots />
        </HubText>
      </Hub>
      <Node x={S_OUT.x} y={S_OUT.ys[0] - S_OUT.h / 2} w={S_OUT.w} h={S_OUT.h} on={lights(FOLLOWS, lit)}>
        <NodeText stacked tile={<Tile color={deep}><FollowUpMark className="size-5" /></Tile>} title="Follow-up" line="A date and an owner" />
      </Node>
      <Node x={S_OUT.x} y={S_OUT.ys[1] - S_OUT.h / 2} w={S_OUT.w} h={S_OUT.h} on={lights(BOOKINGS, lit)}>
        <NodeText stacked tile={<Tile color={deep}><CalendarMark className="size-5" /></Tile>} title="Appointment" line="In your calendar" />
      </Node>

      <Traveller d={salesWide[0].d} delay={0} dur={3.2} quick lit={lit} parts={CONTACTS}>
        <Sender i={0} />
      </Traveller>
      <Traveller d={salesWide[1].d} delay={0.8} dur={3.2} quick lit={lit} parts={PIPELINE}>
        <Pip color={deep}><ContactsMark className="size-3.5" /></Pip>
      </Traveller>
      <Traveller d={salesWide[2].d} delay={1.6} dur={3.2} quick lit={lit} parts={FOLLOWS}>
        <Pip color={deep}><FollowUpMark className="size-3.5" /></Pip>
      </Traveller>
      <Traveller d={salesWide[3].d} delay={2.4} dur={3.2} quick lit={lit} parts={BOOKINGS}>
        <Pip color={deep} brand><CalendarMark className="size-3.5" /></Pip>
      </Traveller>
    </Box>
  );
}

/* ---- tall, for a phone ---- */
const ST = { w: 420, h: 640 } as const;
const ST_ENQ = { x: 90, y: 16, w: 240, h: 76 } as const;
const ST_CON = { x: 90, y: 150, w: 240, h: 76 } as const;
const ST_HUB = { cx: 210, cy: 344, r: 78 } as const;
const ST_OUT = { top: 494, h: 128, w: 194, xs: [11, 215] } as const;

const salesTall: Wire[] = [
  {
    id: "flow-sales-tall-enq",
    d: `M 210 ${ST_ENQ.y + ST_ENQ.h} V ${ST_CON.y}`,
    from: "#ffffff",
    x1: 210,
    y1: ST_ENQ.y + ST_ENQ.h,
    x2: 210,
    y2: ST_CON.y,
    parts: CONTACTS,
  },
  {
    id: "flow-sales-tall-con",
    d: `M 210 ${ST_CON.y + ST_CON.h} V ${ST_HUB.cy - ST_HUB.r}`,
    from: "#ffffff",
    x1: 210,
    y1: ST_CON.y + ST_CON.h,
    x2: 210,
    y2: ST_HUB.cy - ST_HUB.r,
    parts: PIPELINE,
  },
  ...tallOuts(
    "flow-sales-tall",
    ST_OUT.xs.map((x) => x + ST_OUT.w / 2),
    ST_OUT.top,
    ST_HUB,
    [FOLLOWS, BOOKINGS],
  ),
];

function SalesTall({ lit, deep, glow }: { lit: Lit; deep: string; glow: string }) {
  return (
    <Box w={ST.w} h={ST.h} className={TALL_SHOWN}>
      <Wires w={ST.w} h={ST.h} glow={glow} lit={lit} wires={salesTall} />

      <Node x={ST_ENQ.x} y={ST_ENQ.y} w={ST_ENQ.w} h={ST_ENQ.h} on={lights(CONTACTS, lit)}>
        <EnquiryNode />
      </Node>
      <Node x={ST_CON.x} y={ST_CON.y} w={ST_CON.w} h={ST_CON.h} on={lights(CONTACTS, lit)}>
        <NodeText tile={<Tile color={deep}><ContactsMark className="size-5" /></Tile>} title="Contact" line="One record, your fields" />
      </Node>
      <Hub cx={ST_HUB.cx} cy={ST_HUB.cy} r={ST_HUB.r} on={lights(PIPELINE, lit)}>
        <HubText small deep={deep} mark={<PipelineMark className="size-6" />} title="Your pipeline" line="A place for every lead">
          <StageDots />
        </HubText>
      </Hub>
      {ST_OUT.xs.map((x, i) => (
        <Node key={x} x={x} y={ST_OUT.top} w={ST_OUT.w} h={ST_OUT.h} on={lights(i === 0 ? FOLLOWS : BOOKINGS, lit)}>
          {i === 0 ? (
            <NodeText stacked tile={<Tile color={deep}><FollowUpMark className="size-5" /></Tile>} title="Follow-up" line="A date and an owner" />
          ) : (
            <NodeText stacked tile={<Tile color={deep}><CalendarMark className="size-5" /></Tile>} title="Appointment" line="In your calendar" />
          )}
        </Node>
      ))}

      <Traveller d={salesTall[0].d} delay={0} dur={3.2} quick lit={lit} parts={CONTACTS}>
        <Sender i={0} />
      </Traveller>
      <Traveller d={salesTall[1].d} delay={0.8} dur={3.2} quick lit={lit} parts={PIPELINE}>
        <Pip color={deep}><ContactsMark className="size-3.5" /></Pip>
      </Traveller>
      <Traveller d={salesTall[2].d} delay={1.6} dur={3.2} quick lit={lit} parts={FOLLOWS}>
        <Pip color={deep}><FollowUpMark className="size-3.5" /></Pip>
      </Traveller>
      <Traveller d={salesTall[3].d} delay={2.4} dur={3.2} quick lit={lit} parts={BOOKINGS}>
        <Pip color={deep} brand><CalendarMark className="size-3.5" /></Pip>
      </Traveller>
    </Box>
  );
}

function SalesFlow({ lit, accent, deep }: FlowProps) {
  const glow = `color-mix(in oklab, ${accent} 30%, white)`;
  return (
    <>
      <SalesWide lit={lit} deep={deep} glow={glow} />
      <SalesTall lit={lit} deep={deep} glow={glow} />
    </>
  );
}


/* ==========================================================================
   03 MARKETING AND 04 OPERATIONS - TWO IN, ONE MIDDLE, TWO OUT
   --------------------------------------------------------------------------
   Both chapters move the same way - two ways in, one place everything
   passes through, two ways out - so they share one drawing, each with its
   own nodes, marks and traffic. The four nodes come in the order in, in,
   out, out.
   ========================================================================== */

type CrossNode = {
  parts: readonly FeatureSlug[];
  mark: React.ReactNode;
  title: string;
  line: string;
};

type Cross = {
  id: string;
  nodes: readonly [CrossNode, CrossNode, CrossNode, CrossNode];
  hub: {
    parts: readonly FeatureSlug[];
    Mark: (p: { className?: string }) => React.JSX.Element;
    title: string;
    line: string;
  };
  /* What travels each wire, in the nodes' order. */
  traffic: (deep: string) => readonly React.ReactNode[];
};

/* ---- wide ---- */
const CW = { w: 840, h: 520 } as const;
const C_IN = { x: 0, w: 168, h: 124, ys: [138, 382] } as const;
const C_HUB = { cx: 420, cy: 260, r: 98 } as const;
const C_OUT = { x: 672, w: 168, h: 124, ys: [138, 382] } as const;

function crossWide(c: Cross): Wire[] {
  return [
    ...C_IN.ys.map((y, i) => {
      const x1 = C_IN.x + C_IN.w;
      const x2 = C_HUB.cx - C_HUB.r * 0.72;
      const y2 = C_HUB.cy + (i === 0 ? -1 : 1) * C_HUB.r * 0.7;
      return {
        id: `flow-${c.id}-wide-in-${i}`,
        d: `M ${x1} ${y} C ${x1 + 60} ${y}, ${x2 - 50} ${y2}, ${x2} ${y2}`,
        from: "#ffffff",
        x1,
        y1: y,
        x2,
        y2,
        parts: c.nodes[i].parts,
      };
    }),
    ...C_OUT.ys.map((y, i) => {
      const x1 = C_HUB.cx + C_HUB.r * 0.72;
      const y1 = C_HUB.cy + (i === 0 ? -1 : 1) * C_HUB.r * 0.7;
      return {
        id: `flow-${c.id}-wide-out-${i}`,
        d: `M ${x1} ${y1} C ${x1 + 50} ${y1}, ${C_OUT.x - 60} ${y}, ${C_OUT.x} ${y}`,
        from: "#ffffff",
        x1,
        y1,
        x2: C_OUT.x,
        y2: y,
        parts: c.nodes[2 + i].parts,
      };
    }),
  ];
}

const WIDE_PLACE = [
  ...C_IN.ys.map((y) => ({ x: C_IN.x, y: y - C_IN.h / 2, w: C_IN.w, h: C_IN.h })),
  ...C_OUT.ys.map((y) => ({ x: C_OUT.x, y: y - C_OUT.h / 2, w: C_OUT.w, h: C_OUT.h })),
];

/* ---- tall, for a phone ----
   548 high rather than the story chapters' 640: two nodes to a row
   instead of one, so the same picture needs less height - and every
   pixel of these chapters on a phone was counted. */
const CT = { w: 420, h: 548 } as const;
const CT_IN = { top: 12, h: 112, w: 194, xs: [11, 215] } as const;
const CT_HUB = { cx: 210, cy: 272, r: 78 } as const;
const CT_OUT = { top: 424, h: 112, w: 194, xs: [11, 215] } as const;

function crossTall(c: Cross): Wire[] {
  return [
    ...CT_IN.xs.map((x, i) => {
      const x1 = x + CT_IN.w / 2;
      const y1 = CT_IN.top + CT_IN.h;
      const x2 = CT_HUB.cx + (i === 0 ? -1 : 1) * CT_HUB.r * 0.6;
      const y2 = CT_HUB.cy - CT_HUB.r * 0.8;
      return {
        id: `flow-${c.id}-tall-in-${i}`,
        d: `M ${x1} ${y1} C ${x1} ${y1 + 50}, ${x2} ${y2 - 50}, ${x2} ${y2}`,
        from: "#ffffff",
        x1,
        y1,
        x2,
        y2,
        parts: c.nodes[i].parts,
      };
    }),
    ...tallOuts(
      `flow-${c.id}-tall`,
      CT_OUT.xs.map((x) => x + CT_OUT.w / 2),
      CT_OUT.top,
      CT_HUB,
      [c.nodes[2].parts, c.nodes[3].parts],
    ),
  ];
}

const TALL_PLACE = [
  ...CT_IN.xs.map((x) => ({ x, y: CT_IN.top, w: CT_IN.w, h: CT_IN.h })),
  ...CT_OUT.xs.map((x) => ({ x, y: CT_OUT.top, w: CT_OUT.w, h: CT_OUT.h })),
];

function CrossDrawing({
  c,
  wires,
  place,
  size,
  hub,
  small,
  className,
  lit,
  deep,
  glow,
}: {
  c: Cross;
  wires: readonly Wire[];
  place: readonly { x: number; y: number; w: number; h: number }[];
  size: { w: number; h: number };
  hub: { cx: number; cy: number; r: number };
  small: boolean;
  className: string;
  lit: Lit;
  deep: string;
  glow: string;
}) {
  const traffic = c.traffic(deep);
  return (
    <Box w={size.w} h={size.h} className={className}>
      <Wires w={size.w} h={size.h} glow={glow} lit={lit} wires={wires} />
      {c.nodes.map((n, i) => (
        <Node key={n.title} {...place[i]} on={lights(n.parts, lit)}>
          <NodeText stacked tile={<Tile color={deep}>{n.mark}</Tile>} title={n.title} line={n.line} />
        </Node>
      ))}
      <Hub cx={hub.cx} cy={hub.cy} r={hub.r} on={lights(c.hub.parts, lit)}>
        <HubText
          small={small}
          deep={deep}
          mark={<c.hub.Mark className={small ? "size-6" : "size-7"} />}
          title={c.hub.title}
          line={c.hub.line}
        />
      </Hub>
      {c.nodes.map((n, i) => (
        <Traveller key={n.title} d={wires[i].d} delay={i * 0.8} dur={3.2} quick lit={lit} parts={n.parts}>
          {traffic[i]}
        </Traveller>
      ))}
    </Box>
  );
}

function crossFlow(c: Cross) {
  const wide = crossWide(c);
  const tall = crossTall(c);
  return function CrossFlow({ lit, accent, deep }: FlowProps) {
    const glow = `color-mix(in oklab, ${accent} 30%, white)`;
    return (
      <>
        <CrossDrawing c={c} wires={wide} place={WIDE_PLACE} size={CW} hub={C_HUB} small={false} className={WIDE_SHOWN} lit={lit} deep={deep} glow={glow} />
        <CrossDrawing c={c} wires={tall} place={TALL_PLACE} size={CT} hub={CT_HUB} small className={TALL_SHOWN} lit={lit} deep={deep} glow={glow} />
      </>
    );
  };
}

/* ---- 03 MARKETING ------------------------------------------------------------
   Your ads and your own forms bring leads in; every lead is kept with where
   it came from; and out go the two things that record makes possible - a
   broadcast to the right customers, and the qualified leads handed back to
   Meta.

   Lead Capture is both inputs and the record they arrive at; Meta Ads is
   the ads in and the qualified leads back; Broadcasts is the way out to
   customers. The record lights for all three, because all three pass
   through it.

   What travels: an ad's mark, Farah from the website - who submitted the
   form twice and is still one contact (§8) - a broadcast, and a tick for a
   lead that qualified. */
const ADS: readonly FeatureSlug[] = ["meta-ads"];
const CAPTURE: readonly FeatureSlug[] = ["lead-capture"];
const SENDS: readonly FeatureSlug[] = ["broadcasts"];
const ADS_IN: readonly FeatureSlug[] = ["meta-ads", "lead-capture"];

const MarketingFlow = crossFlow({
  id: "marketing",
  nodes: [
    { parts: ADS_IN, mark: <AdsMark className="size-5" />, title: "Your ads", line: "Built and approved here" },
    { parts: CAPTURE, mark: <CaptureMark className="size-5" />, title: "Your forms", line: "Pages, comments, chat" },
    /* One line each: "Approved templates out" and "Qualified leads
       returned" broke with a word left alone on a second line. */
    { parts: SENDS, mark: <BroadcastMark className="size-5" />, title: "Broadcast", line: "Approved templates" },
    { parts: ADS, mark: <RepeatGlyph className="size-5" />, title: "Back to Meta", line: "Qualified leads" },
  ],
  hub: {
    parts: ["meta-ads", "lead-capture", "broadcasts"],
    Mark: CaptureMark,
    title: "Every lead",
    line: "And where it came from",
  },
  traffic: (deep) => [
    <Pip key="ad" color={deep}><AdsMark className="size-3.5" /></Pip>,
    <Sender key="farah" i={3} />,
    <Pip key="send" color={deep} brand><BroadcastMark className="size-3.5" /></Pip>,
    <Pip key="back" color={deep}><CheckIcon className="size-3.5" /></Pip>,
  ],
});

/* ---- 04 OPERATIONS -----------------------------------------------------------
   What happens and what is bought come in; the workspace runs them by the
   business's own rules, roles and records; and out to the team, each with
   their role, and to the dashboard, which says how it is going.

   Automations are the events in; Chat Commerce the orders in; Team and
   Permissions the way out to people, Reports the way out to the figures.
   The workspace lights for all four. */
const AUTOMATIONS: readonly FeatureSlug[] = ["automations"];
const COMMERCE: readonly FeatureSlug[] = ["chat-commerce"];
const TEAM: readonly FeatureSlug[] = ["team-permissions"];
const REPORTS: readonly FeatureSlug[] = ["reports"];

const OperationsFlow = crossFlow({
  id: "operations",
  nodes: [
    { parts: AUTOMATIONS, mark: <AutomationMark className="size-5" />, title: "Every event", line: "Message, lead, booking" },
    { parts: COMMERCE, mark: <CommerceMark className="size-5" />, title: "Every order", line: "Cart, payment, recorded" },
    { parts: TEAM, mark: <TeamMark className="size-5" />, title: "Your team", line: "Each with their role" },
    { parts: REPORTS, mark: <ReportsMark className="size-5" />, title: "Your dashboard", line: "How it is going" },
  ],
  hub: {
    parts: ["automations", "chat-commerce", "team-permissions", "reports"],
    Mark: OperationsMark,
    title: "Your workspace",
    line: "Rules, roles and records",
  },
  traffic: (deep) => [
    <Pip key="event" color={deep}><AutomationMark className="size-3.5" /></Pip>,
    <Pip key="order" color={deep}><CommerceMark className="size-3.5" /></Pip>,
    <Pip key="team" color={deep}><TeamMark className="size-3.5" /></Pip>,
    <Pip key="report" color={deep} brand><ReportsMark className="size-3.5" /></Pip>,
  ],
});

/* ---- BY CHAPTER --------------------------------------------------------------- */
export type FlowProps = { lit: Lit; accent: string; deep: string };

export const chapterFlows: Partial<
  Record<string, (props: FlowProps) => React.JSX.Element>
> = {
  conversations: ConversationsFlow,
  sales: SalesFlow,
  marketing: MarketingFlow,
  operations: OperationsFlow,
};
