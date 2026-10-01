"use client";

import { useRef } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { move, useReveal, type Reveal } from "@/components/how/know/useReveal";
import { StartShell, StepChips } from "@/components/how/start/shared";
import { gettingStarted, type StartId, type StartItem } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - GETTING STARTED: WHAT YOU BRING
   --------------------------------------------------------------------------
   Chosen from three - see start/shared.tsx for the other two.

   The six things laid out on a desk, seen from above, as the business
   would actually have them: the SIM with its own number, tagged with
   Meta's review; the registration certificate beside the website; the
   price list; the calendar; two team badges; and the key to the ad
   account, tagged "only if you run ads". Under each, what it is and the
   steps of the journey it makes possible.

   THINGS, NOT SCREENS. Nothing here draws iSuite AI - the journey and
   Good to know above already show the product, and this section is about
   what the business brings to it. No figures: the prices are dots.

   THE READER'S DESK, NOT THE CLINIC'S. It first carried the journey's
   example - "Your clinic" and the tooth poster, dental services, the Anna
   Nagar branch, Sara's and Ravi's badges - and read as the clinic again,
   and as if iSuite AI were for clinics. Now the website and the price list
   are "your business", with a place for the logo; the price list's lines
   are left for the reader's own services; the calendar is the week; and
   the badges carry the roles §17 names, not people.

   EACH THING IS SET DOWN AS IT SCROLLS IN - dropped a little from above,
   turning to its angle as it lands - and then its tags.
   ========================================================================== */

/* Where the business's own logo goes. */
function LogoSpot({ className }: { className: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center border border-dashed font-extrabold tracking-[0.06em] uppercase ${className}`}
    >
      Logo
    </span>
  );
}

/* Something set down on the desk: it drops in from a little above,
   turning to its angle as it lands. */
function Drop({
  mode,
  at = 0,
  turn = 0,
  className = "",
  children,
}: {
  mode: Reveal;
  at?: number;
  turn?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const on = mode !== "wait";
  return (
    <div
      className={className}
      style={{
        opacity: on ? 1 : 0,
        translate: on ? "0 0" : "0 -28px",
        rotate: `${on ? turn : turn + 8}deg`,
        scale: on ? "1" : "1.06",
        ...move(mode, at, 0.75),
      }}
    >
      {children}
    </div>
  );
}

const SHADOW = "shadow-[0_22px_30px_-20px_rgba(4,28,61,0.55),0_2px_5px_rgba(4,28,61,0.12)]";
const DROP_SHADOW: React.CSSProperties = { filter: "drop-shadow(0 14px 14px rgba(4,28,61,0.22)) drop-shadow(0 1px 2px rgba(4,28,61,0.18))" };

/* A paper tag on a string. */
function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="block" style={DROP_SHADOW}>
      <span
        className={`relative block bg-[#fff6dc] py-2 pr-3 pl-6 text-left ${className}`}
        style={{ clipPath: "polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)" }}
      >
        <span className="absolute top-1/2 left-2.5 size-2 -translate-y-1/2 rounded-full bg-[#efe8dc] ring-1 ring-black/15" />
        {children}
      </span>
    </span>
  );
}

/* ---- the six things ---------------------------------------------------------- */

function Sim({ mode }: { mode: Reveal }) {
  return (
    <div className="relative">
      <Drop mode={mode} turn={-6}>
        <div style={DROP_SHADOW}>
          <div
            className="relative h-[7.4rem] w-[11.8rem] bg-gradient-to-br from-white via-[#f6f7fa] to-[#e2e7f0]"
            style={{ clipPath: "polygon(0 12px, 12px 0, 80% 0, 100% 26%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))" }}
          >
            <svg viewBox="0 0 46 36" className="absolute top-1/2 left-4 h-9 w-11 -translate-y-1/2" aria-hidden>
              <defs>
                <linearGradient id="sim-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f3d98b" />
                  <stop offset="1" stopColor="#c99a3a" />
                </linearGradient>
              </defs>
              <rect x="1" y="1" width="44" height="34" rx="7" fill="url(#sim-gold)" />
              <path d="M1 12h14M1 24h14M31 12h14M31 24h14M15 1v34M31 1v34M15 18h16" stroke="#a87b22" strokeWidth="1.3" fill="none" />
            </svg>
            <WhatsAppIcon className="absolute top-3 right-[22%] size-4 text-[#1b9e5a]" />
            <span className="absolute right-3.5 bottom-3 text-right">
              <span className="block text-[13.5px] leading-tight font-extrabold tracking-tight text-ink tabular-nums">
                +91 ••••• •••18
              </span>
              <span className="block text-[9.5px] font-bold text-ink/60">Not in use on WhatsApp</span>
            </span>
          </div>
        </div>
      </Drop>
      {/* Hung further out from 640, where the desk has room for it. */}
      <Drop mode={mode} at={0.35} turn={9} className="absolute -top-9 -right-3 sm:-top-7 sm:-right-16">
        <Tag>
          <span className="block text-[9px] font-extrabold tracking-[0.12em] text-[#4b3fd1] uppercase">Meta&apos;s review</span>
          <span className="block text-[11px] leading-tight font-bold text-ink">Usually 1-2 weeks</span>
        </Tag>
      </Drop>
    </div>
  );
}

function Papers({ mode }: { mode: Reveal }) {
  return (
    <div className="relative h-[11rem] w-[14.5rem]">
      <Drop mode={mode} turn={-5} className="absolute top-0 left-1">
        <div className={`relative h-[10.4rem] w-[8rem] rounded-[3px] bg-white px-3 pt-3 ${SHADOW}`}>
          <span className="block text-center text-[7px] leading-tight font-extrabold tracking-[0.14em] text-ink/60 uppercase">
            Certificate of registration
          </span>
          <span className="mx-auto mt-1 block text-center text-[12px] font-extrabold text-ink">GST</span>
          {[88, 70, 80, 60, 74].map((w, k) => (
            <span key={k} className="mt-1.5 block h-1 rounded-full bg-ink/10" style={{ width: `${w}%` }} />
          ))}
          <span className="absolute right-2.5 bottom-2.5 grid size-9 place-items-center rounded-full border-2 border-[#c0283f]/50 bg-[#fdecee]">
            <span className="size-4 rounded-full border border-[#c0283f]/60" />
          </span>
        </div>
      </Drop>
      <Drop mode={mode} at={0.15} turn={5} className="absolute right-0 bottom-0">
        <div className={`w-[9.6rem] overflow-hidden rounded-lg bg-white ring-1 ring-black/10 ${SHADOW}`}>
          <span className="flex items-center gap-1 bg-[#eef1f6] px-2 py-1.5">
            {["#f87171", "#fbbf24", "#34d399"].map((c) => (
              <span key={c} className="size-1.5 rounded-full" style={{ backgroundColor: c }} />
            ))}
            <span className="ml-1.5 h-2.5 flex-1 rounded-full bg-white" />
          </span>
          <span className="flex items-center gap-2 bg-gradient-to-br from-ink via-[#0a2f7a] to-brand-dark px-2.5 py-2.5">
            <LogoSpot className="size-7 rounded-md border-white/50 text-[6.5px] text-white/80" />
            <span className="min-w-0">
              <span className="block text-[10px] leading-tight font-extrabold text-white">Your business</span>
              <span className="mt-1 block h-1 w-12 rounded-full bg-white/40" />
            </span>
          </span>
          <span className="block space-y-1 px-2.5 py-2">
            <span className="block h-1 w-[85%] rounded-full bg-ink/10" />
            <span className="block h-1 w-[65%] rounded-full bg-ink/10" />
          </span>
        </div>
      </Drop>
    </div>
  );
}

function PriceList({ mode }: { mode: Reveal }) {
  /* Its small type is set solid (leading-none): at the page's own line
     height the list stood about 230px tall in the 200px picture box and
     touched the title under it, where every other thing on the desk
     leaves 21px or more. */
  /* A line left for one of the reader's own services, its price in dots. */
  const row = (w: number) => (
    <span key={w} className="flex items-center gap-1.5 text-[10px] leading-none">
      <span className="h-1.5 shrink-0 rounded-full bg-ink/20" style={{ width: `${w}%` }} />
      <span className="flex-1 border-b border-dotted border-ink/30" />
      <span className="font-bold text-ink/60 tabular-nums">&#8377; &bull;&bull;&bull;</span>
    </span>
  );
  const head = (t: string) => (
    <span className="mt-2 mb-1.5 block text-[7.5px] leading-none font-extrabold tracking-[0.14em] text-ink/55 uppercase">{t}</span>
  );
  return (
    <Drop mode={mode} turn={3}>
      <div className={`w-[12rem] rounded-md bg-[#fffdf7] px-3.5 pt-3 pb-3.5 text-left ring-1 ring-black/5 ${SHADOW}`}>
        <span className="flex items-center gap-2">
          <LogoSpot className="size-6 rounded-full border-ink/30 text-[6px] text-ink/50" />
          <span className="text-[11px] font-extrabold text-ink">Your business</span>
        </span>
        {head("Services and prices")}
        <span className="block space-y-1.5">
          {row(46)}
          {row(34)}
          {row(52)}
        </span>
        {head("Packages")}
        {row(40)}
        {head("Policies")}
        <span className="block space-y-1">
          <span className="block h-1 w-[90%] rounded-full bg-ink/10" />
          <span className="block h-1 w-[70%] rounded-full bg-ink/10" />
        </span>
      </div>
    </Drop>
  );
}

function Calendar({ mode }: { mode: Reveal }) {
  /* Open hours through the week - a few booked, Sunday shut. */
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const booked = new Set(["1-2", "3-0", "5-1"]);
  return (
    <Drop mode={mode} turn={-3}>
      <div className={`relative w-[12.5rem] rounded-lg bg-white ring-1 ring-black/5 ${SHADOW}`}>
        <span className="absolute -top-1.5 right-6 left-6 flex justify-between">
          {[0, 1, 2, 3, 4].map((k) => (
            <span key={k} className="h-3 w-1.5 rounded-full bg-ink/70" />
          ))}
        </span>
        <span className="flex items-center justify-between rounded-t-lg bg-brand px-3 pt-2.5 pb-2 text-white">
          <span className="text-[10.5px] font-extrabold">When you&apos;re free</span>
          <span className="text-[9px] font-bold text-white/80">This week</span>
        </span>
        <span className="grid grid-cols-7 gap-1 px-2.5 pt-2 pb-2.5">
          {days.map((d, i) => (
            <span key={i} className="flex flex-col items-center gap-1">
              <span className="text-[8.5px] font-extrabold text-ink/55">{d}</span>
              {[0, 1, 2, 3].map((k) =>
                i === 6 ? (
                  <span
                    key={k}
                    className="h-3.5 w-full rounded-[3px] bg-[repeating-linear-gradient(135deg,#e8ecf4_0_3px,#fff_3px_6px)]"
                  />
                ) : (
                  <span
                    key={k}
                    className={`h-3.5 w-full rounded-[3px] ${booked.has(`${i}-${k}`) ? "bg-brand" : "bg-brand-tint"}`}
                  />
                ),
              )}
            </span>
          ))}
        </span>
      </div>
    </Drop>
  );
}

/* A team badge by role - one of §17's - with a line for whoever wears it. */
function Badge({ role, tint }: { role: string; tint: string }) {
  return (
    <span className="relative block pt-9">
      <span className="absolute top-0 left-1/2 h-10 w-3 -translate-x-1/2 rounded-sm" style={{ backgroundColor: tint }} />
      <span className={`relative flex h-[7.8rem] w-[5.9rem] flex-col items-center rounded-xl bg-white px-2 pt-2 ring-1 ring-black/5 ${SHADOW}`}>
        <span className="h-1.5 w-7 rounded-full bg-ink/15" />
        <span
          className="mt-2.5 grid size-10 place-items-center overflow-hidden rounded-full"
          style={{ backgroundColor: `${tint}1f`, color: tint }}
        >
          <svg viewBox="0 0 24 24" className="size-7 translate-y-1" fill="currentColor" aria-hidden>
            <circle cx="12" cy="8.5" r="4.2" />
            <path d="M3.5 22c.9-5 4.3-7.8 8.5-7.8s7.6 2.8 8.5 7.8Z" />
          </svg>
        </span>
        <span className="mt-2.5 h-1.5 w-12 rounded-full bg-ink/15" />
        <span className="mt-2 rounded-full bg-[#f2f4f9] px-2 py-0.5 text-[9.5px] font-bold text-ink/75">{role}</span>
      </span>
    </span>
  );
}

function Team({ mode }: { mode: Reveal }) {
  return (
    <div className="flex items-start gap-4">
      <Drop mode={mode} turn={-7}>
        <Badge role="Admin" tint="#0847d6" />
      </Drop>
      <Drop mode={mode} at={0.14} turn={6} className="mt-3">
        <Badge role="Employee" tint="#a15c07" />
      </Drop>
    </div>
  );
}

function Key({ mode }: { mode: Reveal }) {
  return (
    <div className="relative h-[9rem] w-[14rem]">
      <Drop mode={mode} turn={-16} className="absolute top-8 left-0">
        <svg viewBox="0 0 170 64" className="h-[4.4rem] w-[11.5rem]" style={DROP_SHADOW} aria-hidden>
          <defs>
            <linearGradient id="key-brass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f1d27a" />
              <stop offset="1" stopColor="#bf8d2e" />
            </linearGradient>
          </defs>
          <path
            fillRule="evenodd"
            fill="url(#key-brass)"
            d="M32 4a28 28 0 1 1 0 56 28 28 0 0 1 0-56Zm-12 28a12 12 0 1 0 24 0 12 12 0 0 0-24 0ZM58 26h104a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-6v12h-10V38h-8v8h-10v-8H58Z"
          />
        </svg>
      </Drop>
      <Drop mode={mode} at={0.3} turn={7} className="absolute top-0 right-0">
        <Tag>
          <span className="block text-[9px] font-extrabold tracking-[0.12em] text-[#4b3fd1] uppercase">Meta ad account</span>
          <span className="block text-[11px] leading-tight font-bold text-ink">Only if you run ads</span>
        </Tag>
      </Drop>
    </div>
  );
}

const THINGS: Record<StartId, (p: { mode: Reveal }) => React.ReactNode> = {
  number: Sim,
  papers: Papers,
  business: PriceList,
  calendar: Calendar,
  team: Team,
  ads: Key,
};

/* ---- a thing, and what it is for --------------------------------------------- */

function Thing({ item }: { item: StartItem }) {
  const ref = useRef<HTMLLIElement>(null);
  const mode = useReveal(ref, "0px 0px -12% 0px");
  const Picture = THINGS[item.id];
  const on = mode !== "wait";
  return (
    /* The steps at the foot, level across a row whose lines run to
       different lengths. */
    <li ref={ref} className="flex flex-col items-center text-center">
      <div aria-hidden className="grid h-[12.5rem] w-full place-items-center">
        <Picture mode={mode} />
      </div>
      <h3 className="mt-4 text-[18px] leading-snug font-extrabold text-ink">{item.title}</h3>
      <p className="mt-1.5 max-w-[32ch] text-[14.5px] leading-relaxed text-ink/70">{item.line}</p>
      <div className="mt-auto pt-3.5" style={{ opacity: on ? 1 : 0, ...move(mode, 0.6, 0.4) }}>
        <StepChips steps={item.steps} surface="light" className="justify-center" />
      </div>
    </li>
  );
}

/* Meta's clock, said once across the foot of the desk. It sat under the
   number, and made that one thing 100 to 175px taller than the two beside
   it - a blank under each of them, the width of the row. */
function Review() {
  return (
    <p className="mx-auto mt-12 flex max-w-[52rem] items-start gap-3 rounded-2xl bg-[#efedff] px-4 py-3.5 text-left text-[14.5px] leading-relaxed text-[#3a2fb8] md:mt-14 md:items-center md:px-5">
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#4b3fd1]">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>
        <strong className="font-extrabold">{gettingStarted.review.title}.</strong> {gettingStarted.review.line}
      </span>
    </p>
  );
}

export function FlatLay() {
  return (
    <StartShell>
      {/* The desk. */}
      <div
        className="rounded-[1.75rem] bg-[#efe8dc] px-4 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.75), transparent 55%), radial-gradient(rgba(4,28,61,0.05) 1px, transparent 1.2px)",
          backgroundSize: "auto, 14px 14px",
        }}
      >
        <ol className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {gettingStarted.items.map((item) => (
            <Thing key={item.id} item={item} />
          ))}
        </ol>
        <Review />
      </div>
    </StartShell>
  );
}
