import { CAST_TONE, num } from "@/components/how/journey/shared";
import { gettingStarted, steps } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - GETTING STARTED: THE SECTION
   --------------------------------------------------------------------------
   What a business needs before its first enquiry (§22), and the steps of
   the journey each thing makes possible - the words are `gettingStarted`
   in lib/content/howItWorks.ts, the picture FlatLay.tsx.

   CHOSEN FROM THREE: the things laid out on a desk (FlatLay.tsx); the six
   split into Meta's part - a dial stopped at Meta's review - and yours, a
   list ticking itself off; and the six as frames of film, in the order
   the enquiry meets them. The desk was kept and the other two deleted.

   DARK, BETWEEN TWO LIGHT ONES: Good to know above is light, and so is the
   closer below.

   EACH THING CARRIES ITS STEPS BY NAME - "06 A visit is booked", not "step
   6" - in the colour of whoever does that step, as the journey has them,
   so the link back up the page is made without drawing the journey again.
   The names are said without the journey's example: "Your team takes
   over", not "Sara takes over". This section is about the reader's own
   business.
   ========================================================================== */

export function StartShell({ children }: { children: React.ReactNode }) {
  return (
    <section aria-labelledby="start-title" className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-night px-4 pt-20 pb-14 text-white md:rounded-[2rem] md:px-10 md:pt-24 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1.3px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-white/75">
            <span className="size-1.5 rounded-full bg-[#25d366]" />
            {gettingStarted.eyebrow}
          </p>
          <h2
            id="start-title"
            className="h2-section mx-auto mt-6 max-w-[18ch] scroll-mt-32 font-extrabold"
            style={{ "--h2": "3.6em" } as React.CSSProperties}
          >
            {gettingStarted.heading}
          </h2>
          <p className="lead-section mx-auto mt-6 max-w-[56ch] text-night-muted">{gettingStarted.lead}</p>
        </div>
        <div className="relative mx-auto mt-12 max-w-[76rem] md:mt-16">{children}</div>
      </div>
    </section>
  );
}

/* The steps a thing makes possible, each by its number and its name, the
   number in the colour of whoever does the step. None is before step 1. */
export function StepChips({
  steps: nums,
  surface = "dark",
  className = "",
}: {
  steps: readonly number[];
  surface?: "dark" | "light";
  className?: string;
}) {
  const chip = `inline-flex items-center gap-1.5 rounded-full py-0.5 pr-2.5 pl-0.5 text-[12px] leading-5 font-bold ${
    surface === "dark" ? "bg-white/[0.08] text-white/85" : "bg-white text-ink/80 ring-1 ring-ink/10"
  }`;
  return (
    <span className={`flex flex-wrap gap-1.5 ${className}`}>
      {nums.length === 0 ? (
        <span className={`${chip} pl-2.5`}>Before step 1</span>
      ) : (
        nums.map((n) => {
          const s = steps[n - 1];
          return (
            <span key={n} className={chip}>
              <span
                className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-extrabold text-white tabular-nums ring-1 ring-white/20"
                style={{ backgroundColor: CAST_TONE[s.actor].deep }}
              >
                {num(n)}
              </span>
              {gettingStarted.stepNames[n] ?? s.title}
            </span>
          );
        })
      )}
    </span>
  );
}
