import { preload } from "react-dom";
import { HeroVideo } from "@/components/features/HeroVideo";
import { SkyBackdrop } from "@/components/home/SkyBackdrop";
import { PlayIcon } from "@/components/ui/icons";
import { RevealHeadline } from "@/components/ui/RevealHeadline";
import { featuresHero, heroVideo } from "@/lib/content/featuresPage";

/* ==========================================================================
   /features - THE HERO
   --------------------------------------------------------------------------
   The home hero's sky and the home hero's headline, with a video where the
   home page puts its screenshot. A visitor who pressed "Open the full
   feature list" should feel they have gone further into the same site,
   not arrived on a different one - so the ground, the pill, the type ramp
   and the entrance are all the home page's own, and what changes is the
   picture.

   THE VIDEO IS STILL BEING MADE. Until its file is named in heroVideo
   (lib/content/featuresPage.ts, with the notes for whoever makes it), its
   frame stands where it will go - dashed, at the video's own size, with a
   play mark and "Video coming soon" - so the hero keeps its shape and
   nothing below it moves when the file arrives. With the words alone the
   hero read as if something had been taken away and nothing put back.
   The exploded stack that stood here - four
   sheets, one per group, with a callout linking every feature - was taken
   out on 2026-09-30 to make way for the video; it is in the git history
   (be265ee: ExplodedStack.tsx and components/features/minis). The feature
   bar still links every feature once the chapters begin.

   THE VIDEO IS THE ONLY CLIENT CODE IN HERE. The sky, the pill, the
   headline and the lead are a Server Component with CSS entrances, so they
   are real HTML in the first response and nothing above the fold waits on
   React. This renders HeroVideo, never the other way round: anything
   imported into a client module becomes client code itself, headline and
   all.

   THE SKY HOLDS ITS BLUE FURTHER DOWN than the home page's - see the low
   horizon in SkyBackdrop - as /how-it-works' does, so a light picture
   under the words still has something to stand out against.

   NO BUTTONS. The home hero has two and this has none. The header carries
   "Book a Demo" on every screen, and the page closes on it.
   ========================================================================== */

/* Where the video goes, until it does: its frame at its own size. A
   picture of a frame, not a control - the play mark starts nothing.

   THE PLAY MARK IS AT THE FRAME'S VERY MIDDLE, where a video's own play
   button sits. Centred together with its label as one group, it stood
   21px above the middle and read as off-centre; now the label hangs under
   it without moving it. The triangle is drawn already set right of its
   box's middle, which is what makes it look centred - a margin pushing it
   further read as off to the right. */
function VideoSlot() {
  return (
    <div
      aria-hidden
      className="anim-rise mx-auto mt-12 grid w-full max-w-[64rem] place-items-center rounded-2xl border-2 border-dashed border-brand/40 bg-white/40 shadow-[0_30px_60px_-30px_rgba(10,16,32,0.35)] backdrop-blur-sm md:mt-14 md:rounded-[1.5rem]"
      style={{ aspectRatio: `${heroVideo.width} / ${heroVideo.height}`, "--d": "0.45s" } as React.CSSProperties}
    >
      {/* A size smaller under 360px, where the frame is about 158px tall
          and the label ran to within 6px of its foot. */}
      <span className="relative grid size-12 place-items-center rounded-full bg-white text-brand shadow-[0_12px_28px_-12px_rgba(10,91,245,0.55)] min-[360px]:size-14 md:size-20">
        <PlayIcon className="size-5 min-[360px]:size-6 md:size-8" />
        <span className="absolute top-full left-1/2 mt-2.5 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[11.5px] font-bold whitespace-nowrap text-ink/70 min-[360px]:mt-3.5 min-[360px]:px-3.5 min-[360px]:py-1.5 min-[360px]:text-[12.5px] md:mt-4">
          Video coming soon
        </span>
      </span>
    </div>
  );
}

export function FeaturesHero() {
  const video = heroVideo.src ? { ...heroVideo, src: heroVideo.src } : null;
  /* Its first frame is the first thing the hero shows, so it is fetched
     with the page rather than when the video gets round to asking. */
  if (video?.poster) preload(video.poster, { as: "image", fetchPriority: "high" });

  return (
    <section className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
        <SkyBackdrop horizon="low" />

        <div className="relative px-3 pt-24 pb-12 sm:px-5 md:pt-32 md:pb-16 lg:px-10">
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

          {video ? <HeroVideo clip={video} /> : <VideoSlot />}
        </div>
      </div>
    </section>
  );
}
