/* ==========================================================================
   A DRAWING AT ITS OWN SIZE, FITTED TO ITS COLUMN
   --------------------------------------------------------------------------
   The full product screens on /features are laid out at a fixed size - the
   inbox is 800 by 500 - because a real interface has a real width, and a
   screen that reflowed to fit its column would stop looking like one. This
   scales the whole drawing to whatever width it is given, the way the
   hero's stack is scaled.

   THE SCALE IS CSS, NOT JAVASCRIPT, so it is right in the first HTML the
   server sends and nothing moves at hydration. The box is a size container
   and its height comes from aspect-ratio; the drawing inside divides the
   container's width by its own with tan(atan2(a, b)), which is a/b as a
   plain number - the one way CSS can divide one length by another today.
   Measured in a script instead, the drawing would paint at full size and
   then jump once the script ran.

   `max` is the box's largest width. A number lets a drawing grow past its
   own size where the column is wider than it; a CSS length can hold it to
   something else as well - the story layout holds its pinned screen to
   the window's height. Without it the box stops at the drawing's width.
   ========================================================================== */
export function ScaledScreen({
  w,
  h,
  max = w,
  className = "",
  children,
}: {
  w: number;
  h: number;
  max?: number | string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`@container relative w-full ${className}`}
      style={{ aspectRatio: `${w} / ${h}`, maxWidth: max }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={
          {
            width: w,
            height: h,
            "--s": `tan(atan2(100cqw, ${w}px))`,
            transform: "scale(var(--s))",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
