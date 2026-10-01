"use client";

import { useEffect, useRef, useState } from "react";
import { ContactsMark } from "@/components/ui/featureIcons";
import { useStill } from "@/components/ui/useStill";
import { CAST_TONE, JourneySection, num, roleOf } from "@/components/how/journey/shared";
import {
  ClinicFace,
  DayChip,
  Messages,
  QuietNote,
  chatPlan,
  fx,
  type Mode,
} from "@/components/how/journey/sides/Chat";
import { RecordCard } from "@/components/how/journey/sides/Cards";
import { FeatureLink } from "@/components/how/FeatureLink";
import { steps, type DayId } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - THE JOURNEY, FROM BOTH SIDES
   --------------------------------------------------------------------------
   Chosen from three - see journey/shared.tsx for the other two.

   The thirteen steps from both sides of the glass: down the left, Anand's
   WhatsApp - what the customer actually sees - and down the right, what
   the team sees change in iSuite AI. The step between them.

   THE LEFT SIDE IS ONE CHAT, WITH NO GAPS IN IT. It first went quiet on
   the six steps the customer never sees, and the empty stretches read as
   gaps rather than as the point. Now each step that never reaches the
   phone says so beside it, in the pale yellow WhatsApp uses for its own
   notices in a chat (sides/Chat.tsx).

   THE LAST FOUR STEPS ARE TOLD THE SAME WAY, one notice each. They were
   one lock screen down the rest of the column for a while, and it was
   dropped: WhatsApp has no lock screen, so it broke the column's one rule,
   that everything in it is something WhatsApp shows. One notice for all
   four would leave a long empty stretch - the gap again.

   THE RIGHT SIDE IS THE PRODUCT, a card for each step drawn as the part of
   iSuite AI that step changes - the inbox, the contact and deal, the
   fields, the calendar, the owner, the note, the due list, the stage, the
   reports, Meta (sides/Cards.tsx). The words are the step's own `record`
   lines.

   EACH STEP PLAYS ONCE AS IT SCROLLS IN: the customer's message lands, the
   business's is typed first, and then the team's card comes in and its
   parts are stamped in - so a reply is seen to be sent before it is
   logged. The step being read - the one at the middle of the window - is
   lit in the colour of whoever does it, with a bridge out to each side,
   dashed on the customer's side where nothing reaches them.

   TWO THINGS TO PRESS. The heads stay on screen while the steps pass
   under them, and each side's head shows that side alone - the customer
   sees seven of the thirteen steps, the team all thirteen. Below 1024px
   the same choice is a switch pinned under the header, and there it hides
   the other side outright, which also makes the journey shorter on a
   phone. And pressing a step's title opens the line that explains it -
   a button of its own under every title made each row 30px taller - and,
   under the line, the way to the feature it uses on /features.

   Before any script runs, and if none does, it is the finished picture:
   every message and card in place - and that is also all a visitor who
   asked for less motion ever sees.

   Below 1024px each step sits over its two sides - side by side from
   768, what the customer sees and then what the team sees on a phone.
   ========================================================================== */

const COLS = "lg:grid-cols-[minmax(0,1fr)_15rem_minmax(0,1.1fr)] lg:gap-x-6";

/* Where a step's title and link stop when the keyboard brings them into
   view: clear of the header and of whatever is pinned under it - the
   switch below 1024 (its foot at about 133px, 146 from 768), the heads
   from 1024 (157px). Tabbing back up the steps left some wholly under
   the heads (WCAG 2.4.11). */
const CLEAR = "scroll-mt-36 md:scroll-mt-40 lg:scroll-mt-44";

/* How many of the steps reach the customer's phone at all. */
const SEEN = steps.filter((s) => s.chat.length > 0).length;

const DAY_NAME: Record<DayId, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

/* WhatsApp's wallpaper, faintly, under the customer's side. */
const WALLPAPER: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 20% 30%, rgba(4,28,61,0.05) 1.2px, transparent 1.7px), radial-gradient(circle at 70% 75%, rgba(4,28,61,0.04) 1.2px, transparent 1.7px)",
  backgroundSize: "26px 26px, 34px 34px",
};

/* The first step with messages on a day wears that day's chip. */
const opensDay = (i: number) =>
  steps[i].chat.length > 0 && !steps.slice(0, i).some((p) => p.day === steps[i].day && p.chat.length > 0);

type Focus = "both" | "customer" | "team";

function Eye({ off = false, className }: { off?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {off ? (
        <path d="M4 12h16M12 4v16" strokeLinecap="round" />
      ) : (
        <>
          <path d="M2.5 12C3.8 8.6 7.4 5 12 5s8.2 3.6 9.5 7c-1.3 3.4-4.9 7-9.5 7s-8.2-3.6-9.5-7Z" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

/* A side's head, and the button that shows that side alone. */
function SideHead({
  side,
  focus,
  onFocus,
  className,
  face,
  title,
  sub,
}: {
  side: Exclude<Focus, "both">;
  focus: Focus;
  onFocus: (f: Focus) => void;
  className: string;
  face: React.ReactNode;
  title: string;
  sub: string;
}) {
  const on = focus === side;
  return (
    <div className={`flex items-center gap-3 rounded-t-[1.4rem] py-3 pr-3 pl-4 text-white ${className}`}>
      {face}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] leading-tight font-bold">{title}</span>
        <span className="block truncate text-[12px] text-white/70">{sub}</span>
      </span>
      {/* Only the icon from 1024 to 1279, so pointing at it says what it
          does. Its name starts with the words it shows from 1280, so a
          voice-control user can say what they read (Lighthouse:
          label-content-name-mismatch).

          A toggle: pressed or not is its state, and its name stays the
          same - it used to become "Show both sides" when pressed, and a
          screen reader said "Show both sides, pressed" while one side
          showed. The words stay the same with it. Its focus ring is
          white: the site's blue ring measured 1.4:1 on WhatsApp's green. */}
      <button
        type="button"
        aria-pressed={on}
        aria-label={`Only this side: ${title.toLowerCase()}`}
        title={on ? "Show both sides again" : "Show only this side"}
        onClick={() => onFocus(on ? "both" : side)}
        className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12px] font-bold transition-colors focus-visible:outline-white ${
          on ? "bg-white text-ink" : "bg-white/15 text-white hover:bg-white/25"
        }`}
      >
        <Eye off={on} className={`size-4 ${on ? "rotate-45" : ""}`} />
        <span className="hidden xl:inline">Only this side</span>
      </button>
    </div>
  );
}

export function BothSides() {
  /* Whether the script is running - until it is, everything is simply
     there. */
  const [ready, setReady] = useState(false);
  /* How far down the steps have scrolled in and played. Every step above
     the furthest one counts as played, so a step scrolled past too fast
     to be seen arriving is never left empty. */
  const [upTo, setUpTo] = useState(-1);
  /* How far down the steps have finished playing, and are simply there
     from then on. A step that is still playing would play again, blank
     for up to three seconds, whenever it came back from display: none -
     which is what the switch below 1024px does to a side. */
  const [settled, setSettled] = useState(-1);
  /* The step at the middle of the window. */
  const [active, setActive] = useState(-1);
  const [focus, setFocus] = useState<Focus>("both");
  /* The steps opened to their explaining line. */
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set());
  const marks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    /* Every step already on screen, or above it, when the script starts
       stays as the server drew it. Reloaded halfway down, or arrived by a
       link to the section, the steps in view vanished for most of a
       second and played in again. Only the steps scrolled to afterwards
       play. */
    let arrived = -1;
    marks.current.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top < window.innerHeight) arrived = i;
    });
    setSettled(arrived);
    setUpTo((prev) => Math.max(prev, arrived));
    setReady(true);

    const io = new IntersectionObserver(
      (entries) => {
        let far = -1;
        entries.forEach((e) => {
          if (e.isIntersecting) far = Math.max(far, Number((e.target as HTMLElement).dataset.step));
        });
        if (far < 0) return;
        setUpTo((prev) => Math.max(prev, far));
        marks.current.slice(0, far + 1).forEach((el) => el && io.unobserve(el));
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    marks.current.forEach((el) => el && io.observe(el));

    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.5;
      let a = -1;
      marks.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) a = i;
      });
      setActive(a);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  /* Once the steps that have played are done - the longest, Meta's three
     pulses, takes about six seconds - they stop being animations. */
  useEffect(() => {
    if (upTo < 0) return;
    const t = window.setTimeout(() => setSettled(upTo), 6000);
    return () => window.clearTimeout(t);
  }, [upTo]);

  /* Choosing a side settles every step that has played at once, so none
     of them replays as it comes back. */
  const choose = (f: Focus) => {
    setSettled((prev) => Math.max(prev, upTo));
    setFocus(f);
  };

  /* Under reduced motion nothing waits to arrive: the stamps' delays run
     to three seconds, and the global rule only shortens the animations
     themselves. */
  const still = useStill();
  const modeOf = (i: number): Mode =>
    !ready || still || i <= settled ? "rest" : i <= upTo ? "play" : "wait";
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const now = active >= 0 ? steps[active] : null;

  return (
    <JourneySection>
      <div data-focus={focus} className="group/j relative">
        {/* ---- below 1024: which side to show ----
            Pinned under the header, except on a window under 500px tall -
            a phone on its side - where the header and the switch together
            took over a third of the screen. */}
        <div className="sticky top-[4.6rem] z-20 -mx-4 bg-surface/95 px-4 py-2 backdrop-blur md:top-[5.4rem] md:-mx-10 md:px-10 lg:hidden [@media(max-height:499px)]:static">
          <div role="group" aria-label="Which side to show" className="grid grid-cols-3 gap-1 rounded-full bg-[#eef1f6] p-1">
            {(
              [
                ["both", "Both sides"],
                ["customer", "Anand"],
                ["team", "Your team"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={focus === id}
                onClick={() => choose(id)}
                className={`rounded-full px-2 py-2 text-[13px] font-bold transition-colors ${
                  focus === id ? "bg-white text-ink shadow-[0_1px_3px_rgba(4,28,61,0.15)]" : "text-ink/65 hover:text-ink"
                }`}
              >
                {/* "Both sides" set on two lines in a third of a 320px
                    screen. */}
                {id === "both" ? (
                  <>
                    <span className="min-[360px]:hidden">Both</span>
                    <span className="hidden min-[360px]:inline">{label}</span>
                  </>
                ) : (
                  label
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ---- from 1024: the two sides' heads, and the step being read ---- */}
        <div className="sticky top-[5.5rem] z-20 hidden bg-surface pt-2 lg:block [@media(max-height:499px)]:static">
          <div className={`grid ${COLS}`}>
            <SideHead
              side="customer"
              focus={focus}
              onFocus={choose}
              className="bg-[#075e54]"
              face={<ClinicFace className="size-9 ring-2 ring-white/25" />}
              title="What Anand sees"
              sub={`On WhatsApp · ${SEEN} of ${steps.length} steps`}
            />
            <div className="flex flex-col items-center justify-end pb-2.5 text-center" aria-live="off">
              {now ? (
                <>
                  <span className="text-[11px] font-extrabold tracking-[0.14em] text-ink/65 uppercase">
                    Step {num(now.n)} of {steps.length}
                  </span>
                  <span
                    key={now.n}
                    className="anim-swap mt-0.5 text-[16px] font-extrabold tabular-nums"
                    style={{ color: CAST_TONE[now.actor].deep }}
                  >
                    {now.day} {now.time}
                  </span>
                </>
              ) : (
                <span className="text-[11px] font-extrabold tracking-[0.14em] text-ink/65 uppercase">The step</span>
              )}
            </div>
            <SideHead
              side="team"
              focus={focus}
              onFocus={choose}
              className="bg-ink"
              face={
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15">
                  <ContactsMark className="size-5" />
                </span>
              }
              title="What your team sees"
              sub={`In iSuite AI · all ${steps.length} steps`}
            />
          </div>
        </div>

        <ol className={`lg:grid ${COLS}`}>
          {steps.map((s, i) => {
            const tone = CAST_TONE[s.actor];
            const m = modeOf(i);
            const on = active === i;
            const quiet = s.chat.length === 0;
            const last = i === steps.length - 1;
            const opened = open.has(i);
            return (
              <li
                key={s.n}
                style={{ "--r": i + 1 } as React.CSSProperties}
                className={`md:grid md:grid-cols-2 md:gap-x-3 lg:contents ${i === 0 ? "max-lg:mt-4" : "max-lg:mt-8"}`}
              >
                {/* ---- the step ----
                    From 1024 every cell is placed on the journey's own grid
                    by its row (--r); from 768 each step is a grid of its own,
                    the step across the top and the two sides under it. */}
                <div
                  ref={(el) => {
                    marks.current[i] = el;
                  }}
                  data-step={i}
                  className="relative flex items-start gap-3.5 md:col-span-2 lg:col-span-1 lg:col-start-2 lg:[grid-row:var(--r)] lg:flex-col lg:items-center lg:justify-center lg:gap-0 lg:border-b lg:border-line lg:px-3 lg:py-3.5 lg:text-center"
                >
                  {/* The bridges out to each side, lit while this is the
                      step being read. */}
                  <span
                    aria-hidden
                    className="absolute top-1/2 right-full hidden w-6 border-t-2 transition-colors duration-500 lg:block"
                    style={{
                      borderStyle: quiet ? "dashed" : "solid",
                      borderColor: on ? (quiet ? "var(--color-line-strong)" : tone.light) : "var(--color-line)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-full hidden w-6 border-t-2 transition-colors duration-500 lg:block"
                    style={{ borderColor: on ? tone.light : "var(--color-line)" }}
                  />

                  {/* The list already says which step this is, so the
                      number is not read out as well. */}
                  <span
                    aria-hidden
                    className={`grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-extrabold text-white tabular-nums transition-[box-shadow,scale] duration-500 ${fx(m, "anim-pop")}`}
                    style={{
                      /* The deep shade: white on the bright ones measured
                         2:1 on WhatsApp's green and the team's amber. The
                         glow keeps the bright shade. */
                      backgroundColor: tone.deep,
                      boxShadow: on ? `0 0 0 6px ${tone.light}2e, 0 10px 22px -8px ${tone.light}` : undefined,
                      scale: on ? "1.08" : undefined,
                    }}
                  >
                    {num(s.n)}
                  </span>

                  <div className="min-w-0 pt-0.5 lg:w-full lg:pt-0">
                    {/* The title opens the line that explains the step. Its
                        padding and the equal negative margin make it a
                        41px target for a thumb instead of a 25px line of
                        text, without moving anything. */}
                    <h3 className="text-[18px] leading-snug font-extrabold lg:mt-2.5 lg:text-[16px]">
                      <button
                        type="button"
                        aria-expanded={opened}
                        aria-controls={`step-${s.n}-line`}
                        onClick={() => toggle(i)}
                        className={`group/t -my-2 cursor-pointer py-2 text-left transition-colors hover:text-brand lg:text-center ${CLEAR}`}
                      >
                        {s.title}
                        <span
                          aria-hidden
                          className={`ml-1.5 inline-grid size-5 translate-y-[-1px] place-items-center rounded-full align-middle transition-[background-color,color,rotate] duration-300 ${
                            opened ? "rotate-180 bg-ink text-white" : "bg-[#eef1f6] text-ink/55 group-hover/t:bg-brand-tint group-hover/t:text-brand"
                          }`}
                        >
                          <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <p className="mt-0.5 text-[11px] font-extrabold tracking-[0.08em] uppercase" style={{ color: tone.deep }}>
                      {roleOf(s.actor)}
                      <span className="font-bold tracking-normal text-ink/65 normal-case"> &middot; {s.day} {s.time}</span>
                    </p>
                    {/* Closed, it is inert as well as folded away: a screen
                        reader read every line out while its button said
                        it was closed - and its link is not a tab stop.

                        The fold clips, so the link is kept clear of its
                        edges by the width of its focus ring. */}
                    <div
                      id={`step-${s.n}-line`}
                      inert={!opened}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${opened ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="-mx-1.5 min-h-0 overflow-hidden px-1.5">
                        <p className={`pt-2 text-[14px] leading-relaxed text-muted lg:text-[13.5px] ${s.feature ? "" : "pb-1.5"}`}>{s.line}</p>
                        {/* Not every step has a feature on the list - the
                            ad click, the reports, Meta hearing back. */}
                        {s.feature && (
                          <div className="flex pt-3 pb-1.5 lg:justify-center">
                            <FeatureLink slug={s.feature} className={CLEAR} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---- what Anand sees ---- */}
                <div
                  style={WALLPAPER}
                  className={`mt-3 rounded-2xl bg-[#efeae2] px-3.5 py-3 transition-opacity duration-500 max-lg:group-data-[focus=customer]/j:col-span-2 max-lg:group-data-[focus=team]/j:hidden lg:col-start-1 lg:[grid-row:var(--r)] lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:rounded-none lg:px-5 lg:py-3 lg:group-data-[focus=team]/j:opacity-20 ${
                    last ? "lg:rounded-b-[1.4rem]" : ""
                  }`}
                >
                  {/* Named on screen once - on the first step, below 1024 -
                      and to a screen reader on every step. */}
                  <p
                    className={
                      i === 0
                        ? "mb-2 text-[10.5px] font-extrabold tracking-[0.12em] text-[#075e54] uppercase lg:sr-only"
                        : "sr-only"
                    }
                  >
                    What Anand sees
                  </p>
                  <div className="flex flex-col gap-2">
                    {opensDay(i) && <DayChip label={DAY_NAME[s.day]} mode={m} />}
                    {quiet ? <QuietNote mode={m} /> : <Messages step={s} mode={m} />}
                  </div>
                </div>

                {/* ---- what the team sees ---- */}
                <div
                  className={`mt-2 rounded-2xl bg-[#f3f5f9] p-2.5 transition-opacity duration-500 max-lg:group-data-[focus=team]/j:col-span-2 max-lg:group-data-[focus=customer]/j:hidden md:mt-3 lg:col-start-3 lg:[grid-row:var(--r)] lg:mt-0 lg:flex lg:items-center lg:justify-center lg:rounded-none lg:px-5 lg:py-3 lg:group-data-[focus=customer]/j:opacity-20 ${
                    last ? "lg:rounded-b-[1.4rem]" : ""
                  }`}
                >
                  <div className="w-full lg:flex lg:justify-center">
                    <p
                      className={
                        i === 0
                          ? "mb-2 text-[10.5px] font-extrabold tracking-[0.12em] text-ink/65 uppercase lg:sr-only"
                          : "sr-only"
                      }
                    >
                      What your team sees
                    </p>
                    <RecordCard step={s} mode={m} at={chatPlan(s).end} lit={on} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </JourneySection>
  );
}
