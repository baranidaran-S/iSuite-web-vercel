/* ==========================================================================
   THE SKY
   --------------------------------------------------------------------------
   Drawn in CSS rather than served as a photograph, and that is a decision
   worth stating because a real sky photo would look better in isolation.

   It would also be a 300-800KB image sitting directly behind the largest
   paint on the page, on a site whose audience is largely on Indian mobile
   data. This costs nothing, scales to any viewport without a second file,
   and shifts with the palette instead of fighting it.

   IF A PHOTOGRAPH IS WANTED LATER it drops in here and nowhere else - one
   <Image fill> in place of these layers, with the same four tokens kept for
   the fade at the bottom so the dashboard still lands on near-white.

   THE CLOUDS ARE NOT SYMMETRICAL AND NOT EVENLY SPACED. Six blurred
   ellipses at different sizes, heights and opacities, none of them centred.
   Three evenly spaced puffs is the tell of a CSS sky; irregularity is the
   entire trick.
   ========================================================================== */

/* `dx`/`dy` are how far each cloud travels, `dur` how long it takes. The
   durations are deliberately not multiples of one another - six clouds on
   related periods drift back into formation every so often, and the moment a
   viewer catches a pattern the sky stops being a sky. The nearer, more
   opaque clouds move furthest, which is the whole of the parallax. */
const clouds = [
  { l: "-6%", t: "4%", w: "46%", h: "22%", o: 0.75, blur: 44, dx: "5%", dy: "-1.5%", dur: "74s" },
  { l: "34%", t: "-3%", w: "38%", h: "17%", o: 0.55, blur: 52, dx: "-4%", dy: "1.2%", dur: "97s" },
  { l: "68%", t: "8%", w: "44%", h: "19%", o: 0.68, blur: 40, dx: "4.5%", dy: "1.8%", dur: "83s" },
  { l: "14%", t: "18%", w: "32%", h: "14%", o: 0.42, blur: 58, dx: "-3%", dy: "-1%", dur: "119s" },
  { l: "52%", t: "23%", w: "54%", h: "17%", o: 0.5, blur: 62, dx: "3.5%", dy: "-1.4%", dur: "106s" },
  { l: "-10%", t: "31%", w: "40%", h: "13%", o: 0.34, blur: 70, dx: "2.5%", dy: "0.9%", dur: "131s" },
] as const;

export function SkyBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-sky-top) 0%, var(--color-sky-mid) 17%, var(--color-sky-low) 36%, var(--color-sky-base) 60%)",
        }}
      />

      {clouds.map((c, i) => (
        <div
          key={i}
          className="anim-cloud absolute rounded-[50%] bg-white"
          style={
            {
              left: c.l,
              top: c.t,
              width: c.w,
              height: c.h,
              opacity: c.o,
              filter: `blur(${c.blur}px)`,
              "--dx": c.dx,
              "--dy": c.dy,
              "--dur": c.dur,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Holds the bottom third near-white so the dashboard lands on a
          neutral ground rather than on blue, where its own white chrome
          would have nothing to sit against. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--color-sky-base) 48%)",
        }}
      />
    </div>
  );
}
