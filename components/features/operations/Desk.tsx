"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { featureMarks } from "@/components/ui/featureIcons";
import {
  LAND,
  Limits,
  OPERATIONS,
  OPERATIONS_PARTS,
  TINTS,
  useTick,
  type OperationsPart,
} from "@/components/features/operations/shared";

/* ==========================================================================
   04 OPERATIONS - THE CONTROL DESK
   --------------------------------------------------------------------------
   The chapter as the desk a business is run from: one light aluminium
   console with a module screwed in for each feature, and every capability
   a control on it, its name printed beside it the way hardware is
   labelled - a socket, a lamp, a knob position, a switch, a step.

   AUTOMATIONS IS A PATCH BAY. What starts an automation down one side,
   what it does down the other, and a cable patched between them: a
   customer goes quiet, a cable to Wait, on to an approved template, on to
   a colleague told. The desk re-patches itself every few seconds - six
   programs, which between them use every action - and the display beside
   the bay shows each run the way its log keeps it, all five things a log
   records. One run fails, so Error details has something to say.

   REPORTS IS A PANEL OF LAMPS, one per figure on the dashboard, with a
   refresh running across them, and a key for each export. No numbers: the
   home page's hero carries the one real dashboard.

   TEAM AND PERMISSIONS IS A ROLE KNOB, SWITCHES AND A KEY. The knob turns
   through the roles and the permission switches are set for each - drawn
   unlabelled, so no role's defaults are claimed. The key is the verified
   manager on WhatsApp, and the recording lamps are the three records kept.

   CHAT COMMERCE IS A STEP SEQUENCER, a sale's five steps lighting in turn.

   FOUR THINGS MOVE, EACH ONE SHOWING A FEATURE AT WORK: the cables, the
   dashboard's lamps, the role knob and the sale's steps, the last two at
   an unhurried pace. The recording lamps once blinked, the manager's key
   turned and the export keys pressed themselves, nine things moving at
   once where the requirements (§29) ask for few animations - those three
   moved only for show, and now simply stand lit.

   Live only while the desk is on screen, never under reduced motion,
   where it is the desk set up: the first program patched, every lamp on,
   the knob at Owner, the sale's last step reached.
   ========================================================================== */

type Pt = { x: number; y: number };
type Tint = { light: string; deep: string };

const [AUTO, REPORTS, TEAM, COMMERCE] = OPERATIONS_PARTS;

const groupOf = (part: OperationsPart, id: string) =>
  part.detail.groups.find((g) => g.id === id)!;

/* A capability's name by its id - the ids are unique across the chapter. */
const NAME = new Map(
  OPERATIONS_PARTS.flatMap((p) =>
    p.detail.groups.flatMap((g) => g.items.map((c) => [c.id, c.name] as const)),
  ),
);
const nameOf = (id: string) => NAME.get(id) ?? id;

/* ---- the programs the patch bay runs --------------------------------------- */

/* Each a trigger and its actions in order, and the run as its log keeps
   it. Between them they use all fourteen actions, and every message they
   send keeps the window rule: a customer gone quiet, or one who booked on
   a page and never wrote, is sent an approved template; free text goes
   only to someone who has just written in. The customers are the site's
   cast, as they arrived in Chapter 03; Sara and Ravi are the team. */
type Program = {
  when: string;
  /* What the trigger caught, where it says more than its name. */
  on?: string;
  then: readonly string[];
  who: string;
  result: string;
  /* A run that failed says why. */
  error?: string;
};

const PROGRAMS: readonly Program[] = [
  {
    when: "quiet",
    then: ["wait", "send-template", "notify"],
    who: "Lakshmi A.",
    result: "Template sent after the wait. Sara notified.",
  },
  {
    when: "keyword",
    on: "“PRICE”",
    then: ["send-message", "ask-wait", "update-field"],
    who: "Ajay T.",
    result: "Prices sent. The answer saved to a field.",
  },
  {
    when: "meta-ad-lead",
    then: ["add-tag", "assign", "move-deal"],
    who: "Meera N.",
    result: "Tagged, assigned to Ravi, deal moved on.",
  },
  {
    when: "form-submitted",
    then: ["email", "branch", "notify"],
    who: "Arun V.",
    result: "Email sent. Callback branch taken. Ravi notified.",
  },
  {
    when: "booking-missed",
    then: ["send-template", "assign"],
    who: "Meena S.",
    result: "Rebooking template sent. Assigned to Sara.",
  },
  {
    when: "new-message",
    then: ["send-image", "send-file", "webhook"],
    who: "Anand R.",
    result: "Image and file sent. Webhook not delivered.",
    error: "Your server did not reply in time.",
  },
];

/* How long each program stays patched. */
const RUN = 6000;

const TRIGGERS = groupOf(AUTO, "triggers");
const ACTIONS = AUTO.detail.groups.filter((g) => g.id !== "triggers" && g.id !== "logs");
const LOGS = groupOf(AUTO, "logs");

/* A cable from one socket to the next. Across the bay, from a trigger to
   its first action, it sags between the two columns; from one action to
   the next, both sockets in the same column, it loops out into the gap
   between them - deeper the further apart they are, and never as far as
   the triggers' sockets. */
function cable(a: Pt, b: Pt, i: number, gap: number) {
  const f = (n: number) => n.toFixed(1);
  if (Math.abs(b.x - a.x) > 6) {
    const pull = (b.x - a.x) * 0.55;
    const sag = 12 + Math.abs(b.y - a.y) * 0.08;
    return `M${f(a.x)} ${f(a.y)}C${f(a.x + pull)} ${f(a.y + sag)} ${f(b.x - pull)} ${f(b.y + sag)} ${f(b.x)} ${f(b.y)}`;
  }
  const depth = gap * (0.3 + 0.45 * Math.min(Math.abs(b.y - a.y) / 320, 1));
  return `M${f(a.x)} ${f(a.y)}C${f(a.x - depth)} ${f(a.y + 5)} ${f(b.x - depth)} ${f(b.y + 5)} ${f(b.x)} ${f(b.y)}`;
}

/* ---- the parts of the desk --------------------------------------------------- */

/* A panel's small print: a group's name, as hardware labels a row of its
   controls, with a rule running on from it. */
function Silk({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`flex items-center gap-2 text-[10.5px] leading-tight font-extrabold tracking-[0.14em] text-ink/65 uppercase ${className}`}
    >
      <span className="min-w-0">{children}</span>
      <span aria-hidden className="h-px min-w-3 flex-1 bg-ink/12" />
    </p>
  );
}

/* GOOD TO KNOW, stuck on the module like a label - nothing, for a feature
   with no limits. */
function Sticker({ part, className = "" }: { part: OperationsPart; className?: string }) {
  return (
    <Limits
      part={part}
      className={`rounded-lg bg-[#fff6dc] px-3 py-2.5 shadow-[0_1px_2px_rgba(4,28,61,0.12)] ring-1 ring-[#e8c56a]/45 ${className}`}
    />
  );
}

function Screws() {
  const at = ["top-[5px] left-[5px]", "top-[5px] right-[5px]", "bottom-[5px] left-[5px]", "right-[5px] bottom-[5px]"];
  return (
    <>
      {at.map((p, i) => (
        <span
          key={p}
          aria-hidden
          className={`absolute ${p} grid size-[7px] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#b3bcc8)] shadow-[inset_0_0_0_0.5px_rgba(4,28,61,0.35)]`}
        >
          <span className="h-px w-[5px] bg-ink/40" style={{ rotate: `${[25, 70, 115, 160][i]}deg` }} />
        </span>
      ))}
    </>
  );
}

/* A feature's module: its name plate, the sentence it stands for, and its
   controls. It is a query container, so what is inside lays itself out by
   the module's width, which the desk's layout decides, not the screen's.

   `spread` shares out the height of a module drawn taller than its
   controls - beside a taller neighbour - between its groups, rather than
   leaving it empty at the foot. */
function Module({
  part,
  className = "",
  spread = false,
  moduleRef,
  children,
}: {
  part: OperationsPart;
  className?: string;
  spread?: boolean;
  moduleRef: (el: HTMLElement | null) => void;
  children: React.ReactNode;
}) {
  const Mark = featureMarks[part.item.mark];
  const t = TINTS[part.slug];
  return (
    <section
      ref={moduleRef}
      id={part.slug}
      data-feature={part.slug}
      aria-labelledby={`${part.slug}-name`}
      className={`${LAND} @container relative flex flex-col rounded-[1.1rem] bg-[linear-gradient(180deg,#ffffff,#f3f5f8)] px-3.5 py-4 shadow-[inset_0_1px_0_#fff,inset_0_0_0_1px_rgba(4,28,61,0.08),0_1px_2px_rgba(4,28,61,0.1),0_12px_24px_-18px_rgba(4,28,61,0.5)] sm:p-5 ${className}`}
    >
      <Screws />
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white" style={{ backgroundColor: t.deep }}>
          <Mark className="size-[18px]" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-extrabold tracking-[0.1em] text-ink/60">{part.n}</span>
          <h3 id={`${part.slug}-name`} className="text-[17.5px] leading-tight font-extrabold">
            {part.item.name}
          </h3>
        </span>
      </div>
      <p className="mt-2.5 text-[14px] leading-snug font-semibold text-ink/70">{part.detail.title}</p>
      <div className={`mt-4 flex flex-1 flex-col gap-4 ${spread ? "justify-between" : ""}`}>{children}</div>
    </section>
  );
}

/* A socket on the patch bay. */
function Jack({ socketRef }: { socketRef: (el: HTMLSpanElement | null) => void }) {
  return (
    <span
      ref={socketRef}
      aria-hidden
      className="grid size-[18px] shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#b9c2ce_72%)] shadow-[0_1px_1.5px_rgba(4,28,61,0.35),inset_0_0_0_1px_rgba(4,28,61,0.16)]"
    >
      <span className="size-2 rounded-full bg-[#1a2433] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
    </span>
  );
}

/* ---- Automations: the patch bay and its run log ----------------------------- */

function PatchBay({ p, live, runKey }: { p: Program; live: boolean; runKey: string }) {
  const t = TINTS[AUTO.slug];
  const bay = useRef<HTMLDivElement>(null);
  const sockets = useRef(new Map<string, HTMLSpanElement>());
  const [at, setAt] = useState<Record<string, Pt> | null>(null);

  /* WHERE EACH SOCKET IS, measured - the labels wrap differently at every
     width, so the sockets are never twice in the same place. Measured
     against the bay's own box and unscaled, so a transform on the page
     around it cannot throw a cable off its socket. */
  useEffect(() => {
    const el = bay.current;
    if (!el) return;
    let gone = false;
    const measure = () => {
      if (gone) return;
      const box = el.getBoundingClientRect();
      const s = box.width / el.offsetWidth || 1;
      const next: Record<string, Pt> = {};
      sockets.current.forEach((j, id) => {
        const r = j.getBoundingClientRect();
        next[id] = { x: (r.left + r.width / 2 - box.left) / s, y: (r.top + r.height / 2 - box.top) / s };
      });
      setAt(next);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => {
      gone = true;
      ro.disconnect();
    };
  }, []);

  const socket = (id: string) => (el: HTMLSpanElement | null) => {
    if (el) sockets.current.set(id, el);
    else sockets.current.delete(id);
  };

  const chain = [p.when, ...p.then];
  const pts = chain.map((id) => at?.[id]).filter((q): q is Pt => !!q);
  const ready = pts.length === chain.length;
  const gap = ready ? pts[1].x - pts[0].x : 0;
  const segs = ready ? pts.slice(1).map((b, i) => cable(pts[i], b, i, gap)) : [];
  const patched = new Set(chain);

  const label = (id: string) => ({
    className: "text-[12px] leading-[1.25] font-semibold transition-colors duration-300 @md:text-[12.5px]",
    style: { color: patched.has(id) ? t.deep : "rgba(4,28,61,0.8)" },
  });
  const draw = live ? "anim-cable" : "";
  const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

  return (
    <div ref={bay} className="relative grid grid-cols-[minmax(0,1fr)_clamp(3rem,20cqw,8rem)_minmax(0,1.2fr)]">
      {/* What starts it: sockets on the right edge of their column,
          spread down the bay's height. */}
      <div className="flex flex-col">
        <Silk>{TRIGGERS.label}</Silk>
        <ul className="mt-2 flex flex-1 flex-col justify-around gap-1.5">
          {TRIGGERS.items.map((c) => (
            <li key={c.id} className="flex items-center justify-end gap-2.5 text-right">
              <span {...label(c.id)}>{c.name}</span>
              <Jack socketRef={socket(c.id)} />
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden />
      {/* What it does, by where it lands: sockets on the left edge. */}
      <div className="grid content-between gap-3.5">
        {ACTIONS.map((g) => (
          <div key={g.id}>
            <Silk>{g.label}</Silk>
            <ul className="mt-1.5 grid gap-1.5">
              {g.items.map((c) => (
                <li key={c.id} className="flex items-center gap-2.5">
                  <Jack socketRef={socket(c.id)} />
                  <span {...label(c.id)}>{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* The cables, and a plug in every socket they use. */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
        {segs.map((path, i) => (
          <g key={`${runKey}-${i}`} fill="none" strokeLinecap="round">
            <path d={path} pathLength={1} transform="translate(0 3)" stroke="rgba(4,28,61,0.14)" strokeWidth={7} className={draw} style={d(i * 0.55)} />
            <path d={path} pathLength={1} stroke={t.deep} strokeWidth={5.5} className={draw} style={d(i * 0.55)} />
            <path d={path} pathLength={1} stroke={t.light} strokeWidth={3} className={draw} style={d(i * 0.55)} />
          </g>
        ))}
        {ready &&
          pts.map((q, j) => (
            <g key={`${runKey}-plug-${chain[j]}`} className={live ? "anim-plug" : ""} style={d(j === 0 ? 0 : (j - 1) * 0.55 + 0.5)}>
              <circle cx={q.x} cy={q.y + 1.5} r={8} fill="rgba(4,28,61,0.18)" />
              <circle cx={q.x} cy={q.y} r={7.5} fill="#1c2635" />
              <circle cx={q.x} cy={q.y} r={3.6} fill={t.light} />
              <circle cx={q.x - 2.4} cy={q.y - 2.6} r={1.5} fill="rgba(255,255,255,0.55)" />
            </g>
          ))}
      </svg>

      {/* The signal, running the length of the program once it is
          patched: trigger to first action, and on down the chain. */}
      {live &&
        segs.map((path, i) => (
          <span
            key={`${runKey}-pulse-${i}`}
            aria-hidden
            className="anim-flow-quick pointer-events-none absolute top-0 left-0 size-2.5 rounded-full bg-white opacity-0"
            style={
              {
                offsetPath: `path("${path}")`,
                offsetRotate: "0deg",
                boxShadow: `0 0 0 2px ${t.light}, 0 0 10px 2px ${t.light}`,
                "--d": `${segs.length * 0.55 + 0.2 + i * 0.8}s`,
                "--dur": "3.2s",
              } as React.CSSProperties
            }
          />
        ))}
    </div>
  );
}

function RunLog({ p, run, live, runKey }: { p: Program; run: number; live: boolean; runKey: string }) {
  const value: Record<string, string> = {
    "log-trigger": `${nameOf(p.when)}${p.on ? ` ${p.on}` : ""} · ${p.who}`,
    "log-steps": p.then.map(nameOf).join(" › "),
    "log-result": p.result,
    "log-success": p.error ? "Failure" : "Success",
    "log-error": p.error ?? "None",
  };
  return (
    <div>
      <Silk>{LOGS.label}</Silk>
      {/* The display: a reflective LCD in its bezel. */}
      <div className="mt-2 rounded-xl bg-[#b3bea8] p-[5px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.9)]">
        <div className="rounded-[9px] bg-[linear-gradient(180deg,#d8e3cc,#c6d3b9)] px-3.5 py-3 font-mono text-[#172515] shadow-[inset_0_2px_8px_rgba(0,0,0,0.16)]">
          <p aria-hidden className="flex items-center justify-between gap-3 text-[10px] font-bold tracking-[0.12em] uppercase">
            <span className="opacity-75">Latest run</span>
            <span className="flex gap-1">
              {PROGRAMS.map((q, i) => (
                <span key={q.when} className={`size-1.5 rounded-[1px] ${i === run ? "bg-[#172515]" : "bg-[#172515]/20"}`} />
              ))}
            </span>
          </p>
          <dl className="mt-2.5 grid gap-y-0.5 text-[11.5px] leading-snug @md:grid-cols-[auto_minmax(0,1fr)] @md:gap-x-4 @md:gap-y-1.5 @md:text-[12px]">
            {LOGS.items.map((c, j) => (
              <Fragment key={c.id}>
                <dt className="font-bold opacity-70">{c.name}</dt>
                <dd
                  key={`${runKey}-${c.id}`}
                  className={`mb-1.5 flex items-baseline gap-1.5 @md:mb-0 ${live ? "anim-type" : ""}`}
                  style={{ "--d": `${0.25 + j * 0.25}s` } as React.CSSProperties}
                >
                  {c.id === "log-success" && (
                    <span
                      aria-hidden
                      className="size-2 shrink-0 translate-y-[0.5px] rounded-full"
                      style={{ backgroundColor: p.error ? "#c9372c" : "#1f8a4c" }}
                    />
                  )}
                  {value[c.id]}
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function AutomationsModule({ live, moduleRef }: { live: boolean; moduleRef: (el: HTMLElement | null) => void }) {
  const tick = useTick(live, RUN);
  const run = live ? tick % PROGRAMS.length : 0;
  const runKey = `${live}-${tick}`;
  return (
    <Module part={AUTO} moduleRef={moduleRef} className="md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-span-2 xl:row-start-1">
      {/* Where the module is wide - the desk's whole width, from 1024 to
          1279 - the display stands beside the bay; elsewhere under it. */}
      <div className="grid flex-1 grid-rows-[1fr_auto] gap-5 @3xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] @3xl:grid-rows-none @3xl:gap-8">
        <PatchBay p={PROGRAMS[run]} live={live} runKey={runKey} />
        <div className="flex flex-col gap-4">
          <RunLog p={PROGRAMS[run]} run={run} live={live} runKey={runKey} />
          <Sticker part={AUTO} className="mt-auto" />
        </div>
      </div>
    </Module>
  );
}

/* ---- Reports and Dashboard: a panel of lamps --------------------------------- */

const LAMP_GROUPS = REPORTS.detail.groups.filter((g) => g.id !== "exports");
const EXPORTS = groupOf(REPORTS, "exports");
const LAMP_AT = new Map(LAMP_GROUPS.flatMap((g) => g.items).map((c, i) => [c.id, i]));

function SaveGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 19.5h14" />
    </svg>
  );
}

function ReportsModule({ live, moduleRef }: { live: boolean; moduleRef: (el: HTMLElement | null) => void }) {
  const t = TINTS[REPORTS.slug];
  return (
    <Module part={REPORTS} moduleRef={moduleRef} className="xl:col-start-2 xl:row-start-1">
      {LAMP_GROUPS.map((g) => (
        <div key={g.id}>
          <Silk>{g.label}</Silk>
          <ul className="mt-2 grid grid-cols-2 gap-1.5 @[18.5rem]:grid-cols-3">
            {g.items.map((c) => (
              <li
                key={c.id}
                className="relative flex min-h-[2.75rem] items-center rounded-md px-2.5 py-1.5 text-[11.5px] leading-[1.25] font-bold"
                style={{
                  color: t.deep,
                  backgroundColor: `color-mix(in oklab, ${t.light} 13%, white)`,
                  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${t.light} 38%, transparent), inset 0 1px 0 rgba(255,255,255,0.9)`,
                }}
              >
                {/* The refresh passing: the lamp brightening for a moment. */}
                <span
                  aria-hidden
                  className={`absolute inset-0 rounded-[inherit] opacity-0 ${live ? "anim-lamp" : ""}`}
                  style={
                    {
                      backgroundColor: `color-mix(in oklab, ${t.light} 24%, transparent)`,
                      boxShadow: `0 0 16px 1px color-mix(in oklab, ${t.light} 60%, transparent)`,
                      "--d": `${(LAMP_AT.get(c.id) ?? 0) * 0.1}s`,
                    } as React.CSSProperties
                  }
                />
                <span className="relative">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* THE EXPORTS ARE THE DESK'S KEYS, with their names printed beside
          them like every other control. They were drawn as a web page's
          buttons, a download arrow on each, and looked like they would
          download something when tapped. */}
      <div>
        <Silk>{EXPORTS.label}</Silk>
        <ul className="mt-2.5 flex flex-wrap gap-x-6 gap-y-2.5">
          {EXPORTS.items.map((c) => (
            <li key={c.id} className="flex items-center gap-2.5">
              <Cap tint={t}>
                <SaveGlyph className="size-3.5" />
              </Cap>
              <span className="text-[12.5px] leading-snug font-semibold text-ink/80">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <Sticker part={REPORTS} className="mt-auto" />
    </Module>
  );
}

/* ---- Team and Permissions: a knob, switches and a key ------------------------ */

const ROLES = groupOf(TEAM, "roles");
const SCOPE = groupOf(TEAM, "scope");
const TOGETHER = groupOf(TEAM, "together");
const RECORD = groupOf(TEAM, "record");

/* The knob's five positions, each pointing at its role's line beside it. */
const ANGLES = [-34, -18, 0, 18, 34];

/* Exact permissions, set differently for each role - the switches carry
   no labels, so the pattern claims nothing about what any role may do. */
const DIP = ["111111", "111110", "110100", "100000", "101101"];

function Knob({ at, tint }: { at: number; tint: Tint }) {
  const rad = (a: number) => (a * Math.PI) / 180;
  return (
    <span aria-hidden className="relative grid size-[84px] shrink-0 place-items-center">
      <svg viewBox="-42 -42 84 84" className="absolute inset-0 size-full">
        {ANGLES.map((a, j) => (
          <line
            key={a}
            x1={(Math.cos(rad(a)) * 35).toFixed(2)}
            y1={(Math.sin(rad(a)) * 35).toFixed(2)}
            x2={(Math.cos(rad(a)) * 41).toFixed(2)}
            y2={(Math.sin(rad(a)) * 41).toFixed(2)}
            stroke={j === at ? tint.deep : "rgba(4,28,61,0.28)"}
            strokeWidth={2}
            strokeLinecap="round"
            className="transition-[stroke] duration-300"
          />
        ))}
      </svg>
      {/* The knurled skirt, and the cap that turns with its pointer. */}
      <span className="grid size-16 place-items-center rounded-full bg-[repeating-conic-gradient(#c9d0da_0deg_6deg,#eef1f5_6deg_12deg)] shadow-[0_8px_16px_-6px_rgba(4,28,61,0.45),inset_0_0_0_1px_rgba(4,28,61,0.12)]">
        <span
          className="relative size-[50px] rounded-full bg-[radial-gradient(circle_at_35%_28%,#ffffff,#e3e8ee_60%,#cdd4dd)] shadow-[inset_0_1px_1px_#fff,0_1px_3px_rgba(4,28,61,0.3)] transition-[rotate] duration-700 ease-[cubic-bezier(0.34,1.4,0.5,1)]"
          style={{ rotate: `${ANGLES[at]}deg` }}
        >
          <span className="absolute top-1/2 right-[4px] h-[3px] w-[17px] -translate-y-1/2 rounded-full" style={{ backgroundColor: tint.deep }} />
        </span>
      </span>
    </span>
  );
}

function Dip({ bits, tint }: { bits: string; tint: Tint }) {
  return (
    <span className="inline-flex gap-[2px] rounded-[5px] px-1 py-[4px] shadow-[inset_0_-1px_0_rgba(0,0,0,0.25)]" style={{ backgroundColor: tint.deep }}>
      {bits.split("").map((b, j) => (
        <span key={j} className="relative h-4 w-[7px] rounded-[2px] bg-black/30">
          <span
            className="absolute inset-x-0 top-px h-[7px] rounded-[2px] bg-white transition-[translate] duration-300"
            style={{ translate: b === "1" ? "0 0" : "0 7px" }}
          />
        </span>
      ))}
    </span>
  );
}

function Bezel({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-7 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#d5dbe3)] text-ink/65 shadow-[0_1px_2px_rgba(4,28,61,0.3),inset_0_0_0_1px_rgba(4,28,61,0.12)]">
      {children}
    </span>
  );
}

/* A key on the desk, its lamp lit. */
function Cap({ children, tint }: { children: React.ReactNode; tint: Tint }) {
  return (
    <span
      aria-hidden
      className="relative grid size-7 shrink-0 place-items-center rounded-md bg-[linear-gradient(180deg,#ffffff,#e8ecf1)] text-ink/65 shadow-[0_2px_0_#c3cad4,0_3px_6px_-2px_rgba(4,28,61,0.3),inset_0_0_0_1px_rgba(4,28,61,0.1)]"
    >
      {children}
      <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full" style={{ backgroundColor: tint.light, boxShadow: `0 0 5px ${tint.light}` }} />
    </span>
  );
}

const glyph = "size-3.5";
function LockGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={glyph}>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </svg>
  );
}
function PersonGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={glyph}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  );
}
function NoteGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={glyph}>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M9 9h6M9 13h6M9 17h3" />
    </svg>
  );
}

/* The verified manager's key: turned, with its lamp lit. */
function KeySwitch({ tint }: { tint: Tint }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="grid size-8 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#c4ccd6)] shadow-[0_2px_4px_rgba(4,28,61,0.3),inset_0_0_0_1px_rgba(4,28,61,0.16)]">
        <span
          className="h-5 w-[7px] rounded-[3px] bg-[linear-gradient(90deg,#7f8b9b,#e2e6ec,#7f8b9b)] shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
          style={{ rotate: "90deg" }}
        />
      </span>
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: tint.light, boxShadow: `0 0 5px ${tint.light}` }}
      />
      <WhatsAppIcon className="size-4 text-wa" />
    </span>
  );
}

function TeamModule({ live, moduleRef }: { live: boolean; moduleRef: (el: HTMLElement | null) => void }) {
  const tick = useTick(live, 3400);
  const at = live ? tick % ROLES.items.length : 0;
  const t = TINTS[TEAM.slug];
  const row = "grid grid-cols-[4.25rem_minmax(0,1fr)] items-center gap-x-3";
  const text = "text-[12.5px] leading-snug font-semibold text-ink/80";
  const control: Record<string, React.ReactNode> = {
    exact: <Dip bits={DIP[at]} tint={t} />,
    own: <Bezel><LockGlyph /></Bezel>,
    assigned: <Bezel><LockGlyph /></Bezel>,
    assignment: <Cap tint={t}><PersonGlyph /></Cap>,
    notes: <Cap tint={t}><NoteGlyph /></Cap>,
    manager: <KeySwitch tint={t} />,
  };
  return (
    /* SPREAD, because beside Reports from 768 to 1023 it stood 170px
       shorter, and the gap sat empty at its foot. */
    <Module part={TEAM} moduleRef={moduleRef} spread className="xl:col-start-3 xl:row-start-1">
      <div>
        <Silk>{ROLES.label}</Silk>
        <div className="mt-2.5 flex items-center gap-3">
          <Knob at={at} tint={t} />
          <ul className="grid gap-[3px]">
            {ROLES.items.map((c, j) => (
              <li
                key={c.id}
                className="flex items-center gap-2 text-[12.5px] leading-[19px] font-semibold transition-colors duration-300"
                style={{ color: j === at ? t.deep : "rgba(4,28,61,0.78)" }}
              >
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full transition-[background-color,box-shadow] duration-300"
                  style={{
                    backgroundColor: j === at ? t.light : "rgba(4,28,61,0.16)",
                    boxShadow: j === at ? `0 0 7px ${t.light}` : "none",
                  }}
                />
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {[SCOPE, TOGETHER].map((g) => (
        <div key={g.id}>
          <Silk>{g.label}</Silk>
          <ul className="mt-2.5 grid gap-2">
            {g.items.map((c) => (
              <li key={c.id} className={row}>
                <span aria-hidden className="flex justify-center">
                  {control[c.id]}
                </span>
                <span className={text}>
                  {c.name}
                  {c.line && <span className="mt-0.5 block text-[12px] leading-snug font-medium text-ink/65">{c.line}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <Silk>{RECORD.label}</Silk>
        <ul className="mt-2.5 grid gap-1.5">
          {RECORD.items.map((c) => (
            <li key={c.id} className={row}>
              <span aria-hidden className="flex items-center justify-center gap-1.5 text-[9.5px] font-extrabold tracking-[0.12em] text-[#c9372c]">
                <span className="size-2 rounded-full bg-[#e5484d] shadow-[0_0_6px_rgba(229,72,77,0.7)]" />
                REC
              </span>
              <span className={text}>{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Module>
  );
}

/* ---- Chat Commerce in India: a step sequencer -------------------------------- */

const SALE = COMMERCE.detail.groups;
const STEP_AT = new Map(SALE.flatMap((g) => g.items).map((c, i) => [c.id, i]));
const STEPS = STEP_AT.size;

function CommerceModule({ live, moduleRef }: { live: boolean; moduleRef: (el: HTMLElement | null) => void }) {
  /* A step a beat, the sale held once it is done, then again. */
  const tick = useTick(live, 1200);
  const at = live ? tick % (STEPS + 3) : STEPS + 2;
  const lit = Math.min(at + 1, STEPS);
  const t = TINTS[COMMERCE.slug];
  return (
    <Module part={COMMERCE} moduleRef={moduleRef} className="md:col-span-2 xl:col-start-2 xl:row-start-2">
      {/* Across, where the module is wide enough for five steps side by
          side, each group's name over its steps; down, below that. */}
      <div className="grid gap-y-2 @xl:grid-cols-5 @xl:gap-x-3">
        {SALE.map((g, gi) => (
          <Fragment key={g.id}>
            <Silk className={gi === 0 ? "@xl:col-span-3 @xl:row-start-1" : "mt-2 @xl:col-span-2 @xl:col-start-4 @xl:row-start-1 @xl:mt-0"}>
              {g.label}
            </Silk>
            <ol
              className={`grid gap-2 @xl:row-start-2 @xl:grid-cols-subgrid @xl:gap-x-3 ${
                gi === 0 ? "@xl:col-span-3" : "@xl:col-span-2 @xl:col-start-4"
              }`}
            >
              {g.items.map((c) => {
                const i = STEP_AT.get(c.id) ?? 0;
                const on = i < lit;
                const now = live && i === at;
                return (
                  <li key={c.id} className="flex items-center gap-3 @xl:flex-col @xl:items-stretch @xl:gap-2">
                    <span
                      aria-hidden
                      className="grid h-10 w-12 shrink-0 place-items-center rounded-lg text-[12px] font-extrabold tabular-nums transition-[background-color,box-shadow,color] duration-300 @xl:w-full"
                      style={{
                        color: on ? t.deep : "rgba(4,28,61,0.4)",
                        backgroundColor: on ? `color-mix(in oklab, ${t.light} ${now ? 50 : 30}%, white)` : "#e7ebf0",
                        boxShadow: on
                          ? `inset 0 0 0 1px ${t.light}, 0 0 ${now ? 22 : 12}px -2px color-mix(in oklab, ${t.light} 75%, transparent)`
                          : "inset 0 2px 3px rgba(4,28,61,0.14)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[12.5px] leading-snug font-semibold text-ink/80">{c.name}</span>
                  </li>
                );
              })}
            </ol>
          </Fragment>
        ))}
      </div>
      <Sticker part={COMMERCE} className="mt-auto" />
    </Module>
  );
}

/* ---- the desk ------------------------------------------------------------------ */

export function Desk() {
  const [inView, setInView] = useState(false);
  /* 768px and up, where modules stand side by side. It starts true, as the
     server draws it, and decides only how the feature bar reads the desk
     (see below), never the layout. */
  const [wide, setWide] = useState(true);
  const still = useReducedMotion() === true;
  const live = inView && !still;
  const modules = useRef<(HTMLElement | null)[]>([]);
  const hold = (i: number) => (el: HTMLElement | null) => {
    modules.current[i] = el;
  };

  /* LIVE WHILE A MODULE IS ON SCREEN - any of them, since on a phone the
     desk is several screens tall. */
  useEffect(() => {
    const els = modules.current.filter((el): el is HTMLElement => el !== null);
    const showing = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) showing.add(e.target);
          else showing.delete(e.target);
        }
        setInView(showing.size > 0);
      },
      { threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    /* SIDE BY SIDE, THE FEATURE BAR NAMES THE CHAPTER. Modules level with
       each other cross the bar's line together, and by position it named
       whichever came last; data-compact with no feature open makes it say
       "Operations" there. On a phone, one module after another, it names
       each as it is read. */
    <section aria-label="Operations features" data-compact={wide ? "" : undefined} className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-surface px-4 py-12 text-ink md:rounded-[2rem] md:px-10 md:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute top-[10%] left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[#00c8f8]/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-[84rem]">
          <p className="text-[12.5px] font-extrabold tracking-[0.14em] text-ink/65 uppercase">
            {OPERATIONS.name}, at the desk
          </p>

          {/* The console: brushed aluminium, a rail along the top with its
              power lamp, and the four modules in it. From 1280 Automations
              stands tall on the left, Reports and Team beside it, Chat
              Commerce under those two; from 768 Automations takes the
              width, Reports and Team share a row, Commerce takes the width
              again; on a phone, one after another. */}
          <div className="relative mt-5 rounded-[1.5rem] bg-[linear-gradient(180deg,#e9edf2,#dce2e9)] p-1.5 shadow-[0_40px_80px_-44px_rgba(4,28,61,0.55),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_0_0_1px_rgba(4,28,61,0.08)] sm:p-3">
            <div
              aria-hidden
              className="flex items-center justify-between gap-3 px-2 pt-1 pb-2.5 text-[10px] font-extrabold tracking-[0.2em] text-ink/55 uppercase sm:px-2.5 sm:pt-0.5 sm:pb-3"
            >
              <span>iSuite AI</span>
              <span className="flex items-center gap-1.5">
                <span
                  className={`size-1.5 rounded-full bg-[#22c55e] transition-shadow duration-500 ${
                    live ? "shadow-[0_0_0_3px_rgba(34,197,94,0.2),0_0_8px_#22c55e]" : ""
                  }`}
                />
                Running
              </span>
            </div>
            <div className="grid gap-1.5 sm:gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.95fr)]">
              <AutomationsModule live={live} moduleRef={hold(0)} />
              <ReportsModule live={live} moduleRef={hold(1)} />
              <TeamModule live={live} moduleRef={hold(2)} />
              <CommerceModule live={live} moduleRef={hold(3)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
