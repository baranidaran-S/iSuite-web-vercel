import { ExplodedStack } from "@/components/features/ExplodedStack";
import { SkyBackdrop } from "@/components/home/SkyBackdrop";
import { RevealHeadline } from "@/components/ui/RevealHeadline";
import { featuresHero } from "@/lib/content/featuresPage";

/* ==========================================================================
   /features - THE HERO
   --------------------------------------------------------------------------
   The home hero's sky and the home hero's headline, with the product taken
   apart where the home page puts its screenshot. A visitor who pressed
   "Open the full feature list" should feel they have gone further into the
   same site, not arrived on a different one - so the ground, the pill, the
   type ramp and the entrance are all the home page's own, and what changes
   is the picture.

   THE PICTURE IS THE ONLY CLIENT CODE IN HERE. The sky, the pill, the
   headline and the lead are a Server Component with CSS entrances, so they
   are real HTML in the first response and nothing above the fold waits on
   React. This renders ExplodedStack, never the other way round, and that
   is what keeps it that way: anything imported into a client module
   becomes client code itself, headline and all. It was briefly the other
   way round while three versions were compared.

   THE SKY HOLDS ITS BLUE FURTHER DOWN than the home page's - see the low
   horizon in SkyBackdrop - because the stack's sheets are white, and white
   sheets on a sky that had already turned white would have nothing to
   stand out against.

   NO BUTTONS. The home hero has two and this has none: the callouts beside
   the stack are the action here, thirteen links into the page. The header
   carries "Book a Demo" on every screen, and the page closes on it.
   ========================================================================== */
export function FeaturesHero({ built }: { built?: readonly string[] }) {
  return (
    <section className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
        <SkyBackdrop horizon="low" />

        {/* LESS PADDING UNDER THE STACK FROM 1280px. There the callouts sit
            beside the stack rather than under it, so the last thing in the
            card is the scene - and the scene keeps room for the tallest
            state a sheet can be read in, which at rest is already empty sky
            below the stack. 64px more of it read as a gap. */}
        <div className="relative px-3 pt-24 pb-12 sm:px-5 md:pt-32 md:pb-16 lg:px-10 xl:px-6 xl:pb-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="anim-rise inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-[13px] font-semibold tracking-[0.04em] text-ink/70 shadow-[0_2px_10px_-4px_rgba(10,16,32,0.2)] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-brand" />
              {featuresHero.eyebrow}
            </p>

            <RevealHeadline lines={featuresHero.headline} className="mt-5" />

            <p
              className="anim-rise mx-auto mt-7 max-w-[52ch] text-[17px] leading-relaxed text-ink/65 md:text-[19.5px]"
              style={{ "--d": "0.32s" } as React.CSSProperties}
            >
              {featuresHero.lead}
            </p>
          </div>

          <ExplodedStack built={built} />
        </div>
      </div>
    </section>
  );
}
