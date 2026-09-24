import Image from "next/image";
import { HeroCopy } from "@/components/home/HeroCopy";
import { SkyBackdrop } from "@/components/home/SkyBackdrop";
import { dashboardImage } from "@/lib/content/devices";

/* ==========================================================================
   HERO - section 1 of 9
   --------------------------------------------------------------------------
   A rounded card of sky, inset from the page edges: centred copy above, the
   product screenshot below it in full.

   NO SCROLL ANIMATION, AND NO CLIENT JAVASCRIPT AT ALL. This used to pin
   itself for two and a half viewports while the dashboard lifted out of a
   laptop, crossed to the centre and grew. It was the most expensive thing on
   the page - a Client Component, a motion library, a ResizeObserver and a
   measured scroll timeline - and every bit of that is gone. The whole hero
   is Server Components and CSS now, which means the headline and the
   screenshot are in the first HTML response and the largest paint does not
   wait for React to hydrate.

   THE SCREENSHOT IS WHOLE AND IT IS NOT CROPPED. Every card, the sidebar
   and both charts are on screen. It runs past the fold, so scrolling reveals
   the rest of it by simply scrolling - which is what a screenshot is for.

   The laptop and phone frames are parked in public/devices/unused/. See
   lib/content/devices.ts for their measurements if either comes back.
   ========================================================================== */
export function Hero() {
  return (
    <section className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
        <SkyBackdrop />

        <div className="relative px-5 pt-24 pb-16 md:pt-28 md:pb-24 lg:px-10">
          <HeroCopy />

          {/* The ring and the shadow are doing one job between them: giving
              a white screenshot an edge against a background that fades to
              white behind it. Without them it dissolves into the sky. */}
          <div
            className="anim-lift mx-auto mt-16 max-w-6xl md:mt-20"
            style={{ "--d": "0.72s" } as React.CSSProperties}
          >
            <Image
              src={dashboardImage}
              alt="The iSuite AI dashboard, showing active conversations, contacts, open deals, pipeline value, today's bookings, average first response time and message volume over the past week."
              priority
              sizes="(max-width: 1023px) 94vw, 1280px"
              className="h-auto w-full rounded-xl shadow-[0_30px_70px_-24px_rgba(10,16,32,0.4),0_8px_20px_-12px_rgba(10,16,32,0.2)] ring-1 ring-black/5 md:rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
