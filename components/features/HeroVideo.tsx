"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/ui/icons";
import { useStill } from "@/components/ui/useStill";
import type { HeroVideo as Clip } from "@/lib/content/featuresPage";

/* ==========================================================================
   /features - THE HERO'S VIDEO
   --------------------------------------------------------------------------
   Plays under the headline once its file exists. heroVideo in
   lib/content/featuresPage.ts is where it is switched on, and where the
   notes for whoever makes it are. FeaturesHero renders this only when
   there is a file named, so nothing here copes with there being none.

   IT PLAYS BY ITSELF, silent and looping, and inline on a phone rather
   than jumping to full screen. It is started from here once the page is
   running, not by the autoplay attribute, so a visitor who asked for less
   motion never sees it move: they get its first frame, the poster, and a
   Play button if they want it.

   IT CAN BE PAUSED (WCAG 2.2.2): anything that moves by itself for more
   than five seconds beside other content needs a way to stop it. The
   button sits on its corner and says what it will do.

   IT STOPS OFF SCREEN, and carries on when it comes back - a loop nobody
   is watching is battery spent for nothing.

   ITS BOX IS DRAWN FROM ITS SIZE before a byte of it arrives, so nothing
   on the page jumps when it loads. A file that will not load takes the
   box with it, and the hero is its words alone.

   THE PICTURE IS aria-hidden, and what it shows is read out in its place
   from the content file's `label`.
   ========================================================================== */

export function HeroVideo({ clip }: { clip: Clip & { src: string } }) {
  const ref = useRef<HTMLVideoElement>(null);
  const still = useStill();
  /* The visitor's own choice, once they have made one. Until then it plays,
     unless they asked for less motion. */
  const [choice, setChoice] = useState<"play" | "pause" | null>(null);
  const [seen, setSeen] = useState(false);
  const [broken, setBroken] = useState(false);
  const wants = choice ? choice === "play" : !still;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* A missing file can fail before the page is running, when there was
       nothing yet to hear it. */
    if (el.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) setBroken(true);
    const io = new IntersectionObserver((entries) => setSeen(entries[entries.length - 1].isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (wants && seen) {
      /* Muted as a property too: it is what a browser checks before it
         lets a video play by itself. A play() refused anyway - a phone
         saving power - leaves the poster, and the button can still start
         it. */
      el.muted = true;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [wants, seen]);

  if (broken) return null;

  return (
    <div className="relative mx-auto mt-12 w-full max-w-[64rem] md:mt-14">
      <video
        ref={ref}
        aria-hidden
        muted
        loop
        playsInline
        preload="metadata"
        poster={clip.poster ?? undefined}
        width={clip.width}
        height={clip.height}
        style={{ aspectRatio: `${clip.width} / ${clip.height}` }}
        className="block h-auto w-full rounded-2xl bg-white/40 object-cover shadow-[0_30px_60px_-30px_rgba(10,16,32,0.5)] ring-1 ring-white/70 md:rounded-[1.5rem]"
      >
        {clip.webm && <source src={clip.webm} type="video/webm" />}
        {/* The last source: if it fails, there is nothing left to try. */}
        <source src={clip.src} type="video/mp4" onError={() => setBroken(true)} />
      </video>
      <p className="sr-only">{clip.label}</p>

      <button
        type="button"
        onClick={() => setChoice(wants ? "pause" : "play")}
        aria-label={wants ? "Pause the video" : "Play the video"}
        className="absolute right-3 bottom-3 inline-flex h-9 items-center gap-1.5 rounded-full bg-white/85 px-3.5 text-[12.5px] font-bold text-ink/80 shadow-[0_6px_16px_-10px_rgba(10,16,32,0.5)] ring-1 ring-white backdrop-blur transition-colors hover:bg-white hover:text-ink md:right-4 md:bottom-4"
      >
        {wants ? (
          <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1.2" />
            <rect x="14" y="5" width="4" height="14" rx="1.2" />
          </svg>
        ) : (
          <PlayIcon className="size-3.5" />
        )}
        {wants ? "Pause" : "Play"}
      </button>
    </div>
  );
}
