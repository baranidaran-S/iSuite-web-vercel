import Image from "next/image";

/* ==========================================================================
   THE REAL SCREEN, IN A WINDOW OF ITS OWN HEIGHT OR LESS
   --------------------------------------------------------------------------
   A capture of the app at a phone's width (lib/content/shots.ts), drawn
   at about its real size. Taller than `max`, it is cut there - faded at
   the foot - and while `live` it pans slowly down to its foot and back,
   so the rest of it is seen (anim-pan, globals.css). The file is twice
   the screen's pixels, so it stays sharp.

   A LONG WAY TO PAN TAKES LONGER: 16 seconds a round up to about 480px
   of it, then a second for every 30px more - Studio's thread, 634px
   down, at 16 seconds ran past faster than its words could be read.
   ========================================================================== */

export function ScreenWindow({
  src,
  w,
  h,
  label,
  max,
  live,
  className = "",
}: {
  src: string;
  w: number;
  h: number;
  /* Its alt text - empty where the words beside it already say it all. */
  label: string;
  max: number;
  live: boolean;
  className?: string;
}) {
  const view = Math.min(h, max);
  const pan = h - view;
  const moving = live && pan > 8;
  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ maxWidth: w, aspectRatio: `${w} / ${view}` }}>
      <Image
        src={src}
        alt={label}
        width={w * 2}
        height={h * 2}
        sizes={`${w}px`}
        draggable={false}
        className={`block h-auto w-full select-none ${moving ? "anim-pan" : ""}`}
        style={{ "--pan": `${(-(pan / h) * 100).toFixed(2)}%`, "--dur": `${Math.max(16, Math.round(pan / 30))}s` } as React.CSSProperties}
      />
      {pan > 0 && (
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/95 to-transparent" />
      )}
    </div>
  );
}
