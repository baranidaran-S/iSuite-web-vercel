import { SkyBackdrop } from "@/components/home/SkyBackdrop";
import { RevealHeadline } from "@/components/ui/RevealHeadline";
import { Cast } from "@/components/how/Cast";
import { howItWorksHero } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - THE HERO
   --------------------------------------------------------------------------
   The sky, the pill, the headline and the lead every page on this site
   opens with, so a visitor who pressed "See How It Works" on the home page
   knows they are on the same site - and under them the cast of the
   journey, where the home page puts its screenshot and /features its
   exploded stack. No picture on the site is drawn twice.

   THE SKY HOLDS ITS BLUE LOW, as /features' does, because the cast's cards
   are white and need something to stand out against.

   NO BUTTONS. The header carries "Book a Demo" on every screen and the page
   closes on it; the hero's job is to set up who the journey is about.
   ========================================================================== */
export function HowHero() {
  return (
    <section className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
        <SkyBackdrop horizon="low" />

        <div className="relative px-3 pt-24 pb-12 sm:px-5 md:pt-32 md:pb-16 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="anim-rise inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-[13px] font-semibold tracking-[0.04em] text-ink/70 shadow-[0_2px_10px_-4px_rgba(10,16,32,0.2)] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-brand" />
              {howItWorksHero.eyebrow}
            </p>

            <RevealHeadline lines={howItWorksHero.headline} className="mt-5" />

            <p
              className="anim-rise mx-auto mt-7 max-w-[54ch] text-[17px] leading-relaxed text-ink/65 md:text-[19.5px]"
              style={{ "--d": "0.32s" } as React.CSSProperties}
            >
              {howItWorksHero.lead}
            </p>
          </div>

          <Cast />
        </div>
      </div>
    </section>
  );
}
