import { CAST_TONE } from "@/components/how/Cast";
import { goodToKnow, steps, type KnowNote } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - GOOD TO KNOW: THE SECTION
   --------------------------------------------------------------------------
   The section and its heading, and the colour a rule's step wears - the
   colour of whoever does that step, the same colours the cast wears in the
   hero and the journey's numbered stops. The words are in
   lib/content/howItWorks.ts.

   CHOSEN FROM THREE: the rules shown happening in the product
   (InAction.tsx); the journey as a road with a traffic sign at each rule,
   the enquiry driving it as the page scrolled; and the enquiry as a
   boarding pass, stamped at each rule, its conditions on the stub. The
   rules in action was kept, because its pictures say each rule
   themselves. The road's signs misread - a no-entry calendar at the very
   step where a visit is booked, a warning diamond over the reports - and
   the pass said every rule three times. Both were deleted.

   A SOFT BLUE WASH ACROSS THE TOP, as the home page's FAQ has, so it does
   not read as more of the white journey straight above it.
   ========================================================================== */

export const toneOf = (note: KnowNote) => {
  const first = steps.find((s) => s.n === note.steps[0]);
  return first ? CAST_TONE[first.actor] : CAST_TONE.system;
};

export function KnowShell({ children }: { children: React.ReactNode }) {
  return (
    <section aria-labelledby="know-title" className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-surface px-4 pt-20 pb-14 md:rounded-[2rem] md:px-10 md:pt-24 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-brand-tint to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-ink/70">
            <span className="size-1.5 rounded-full bg-brand" />
            {goodToKnow.eyebrow}
          </p>
          <h2
            id="know-title"
            className="h2-section mx-auto mt-6 max-w-[18ch] scroll-mt-32 font-extrabold"
            style={{ "--h2": "3.6em" } as React.CSSProperties}
          >
            {goodToKnow.heading}
          </h2>
          <p className="lead-section mx-auto mt-6 max-w-[52ch] text-muted">{goodToKnow.lead}</p>
        </div>
        <div className="relative mx-auto mt-12 max-w-[76rem] md:mt-16">{children}</div>
      </div>
    </section>
  );
}

/* A rule's step, in the colour of whoever does it. */
export function StepLabel({ note, className = "" }: { note: KnowNote; className?: string }) {
  return (
    <p
      className={`text-[11.5px] font-extrabold tracking-[0.12em] uppercase ${className}`}
      style={{ color: toneOf(note).deep }}
    >
      {note.label}
    </p>
  );
}
