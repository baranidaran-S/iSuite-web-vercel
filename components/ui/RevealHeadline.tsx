/* ==========================================================================
   THE REVEAL HEADLINE
   --------------------------------------------------------------------------
   The h1 of every page that opens on a sky hero - the home page and
   /features. Each line slides up from behind its own clipped box, and one
   line may end on a word set in the serif italic.

   ONE COMPONENT, NOT A COPY PER PAGE. This lived inline in HeroCopy until
   a second page needed it. Two copies of a size ramp is how a site ends up
   with two headlines a few pixels apart, and the .h1-hero rules in
   globals.css - which take the hand-set lines apart on a phone - only work
   on markup shaped exactly like this.

   THE SIZES LIVE HERE FOR THE SAME REASON. A page passes a margin, never a
   size. Each page's own copy still has to be measured against a phone -
   see HeroCopy for how, and why the widest WORD is the number that
   matters.

   A Server Component. The motion is the anim-reveal utility, so the
   headline is real HTML in the first response and the largest paint does
   not wait for React.
   ========================================================================== */

type Line = { readonly text: string; readonly accent?: string };

export function RevealHeadline({
  lines,
  className = "",
}: {
  lines: readonly Line[];
  className?: string;
}) {
  return (
    <h1
      className={`h1-hero text-[3rem] leading-[1.05] font-extrabold sm:text-[3.6rem] lg:text-[4.5rem] xl:text-[5rem] ${className}`}
    >
      {lines.map((line, i) => (
        <span key={line.text} className="reveal-mask">
          <span
            className="anim-reveal"
            style={{ "--d": `${0.08 + i * 0.1}s` } as React.CSSProperties}
          >
            {line.text}
            {line.accent ? (
              <span className="font-serif font-normal text-brand italic">
                {line.accent}{" "}
              </span>
            ) : null}
            {/* Below sm these spans are inline and reflow into each
                other, and JSX puts no whitespace between siblings - so
                without this the phone reads "enquiryinto". It collapses
                to nothing when they are blocks again. */}
            {" "}
          </span>
        </span>
      ))}
    </h1>
  );
}
