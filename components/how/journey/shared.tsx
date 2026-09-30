import { CAST_TONE } from "@/components/how/Cast";
import { cast, type CastId } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - THE JOURNEY'S SECTION
   --------------------------------------------------------------------------
   The section the journey sits in, its heading, and the small helpers it
   is written with - each of the cast in the colour the hero gives them, so
   a reader who met them there knows them here.

   CHOSEN FROM THREE, the same thirteen steps told three ways: a relay, the
   enquiry passed from lane to lane between the cast; both sides, what the
   customer sees beside what the team sees (BothSides.tsx); and one week, a
   planner with each step on its day. Both sides was kept, and the other
   two deleted.
   ========================================================================== */

export { CAST_TONE };

export const roleOf = (id: CastId) => cast.find((c) => c.id === id)!.role;

/* A step's number, two digits, the way every numbered thing on the site
   is written. */
export const num = (n: number) => String(n).padStart(2, "0");

/* THE SECTION. White, on the page ground, like every section after a
   hero - a heading that names the journey, and the journey inside it. */
export function JourneySection({ children }: { children: React.ReactNode }) {
  return (
    <section aria-labelledby="journey-title" className="p-2 md:p-3">
      <div className="relative rounded-[1.5rem] bg-surface px-4 pt-20 pb-14 md:rounded-[2rem] md:px-10 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-ink/70">
            <span className="size-1.5 rounded-full bg-brand" />
            The journey
          </p>
          <h2
            id="journey-title"
            className="h2-section mx-auto mt-6 max-w-[20ch] scroll-mt-32 font-extrabold"
            style={{ "--h2": "4em" } as React.CSSProperties}
          >
            From the first tap to a won deal.
          </h2>
          <p className="lead-section mx-auto mt-6 max-w-[56ch] text-muted">
            Anand&apos;s enquiry, over one week, in the thirteen steps every enquiry can go through - and who does
            each of them.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-[76rem] md:mt-16">{children}</div>
      </div>
    </section>
  );
}
