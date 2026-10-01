/* ==========================================================================
   SHARED PARTS - THE PEOPLE
   --------------------------------------------------------------------------
   A person's avatar, in the inbox's own tints. Used by /features' chapter
   flows and /how-it-works' journey cards.

   WHY "minis". These were the shared parts of the minis - thirteen small
   pieces of interface, one per feature, drawn on the sheets of the
   /features hero's exploded stack. The stack was taken out on 2026-09-30
   to make way for a video, and the minis with it (they are in the git
   history at be265ee, components/features/minis). What else used these
   parts kept them, and the path stayed so nothing that imports them moved.

   THE SAME PEOPLE AS THE HOME PAGE. Anand is blue and Nisha is pink in
   every picture on the site, in the order InboxMock uses the tints, and a
   picture that contradicted the home page would tell a careful visitor
   the pictures are made up.
   ========================================================================== */

/* The inbox's own avatar tints, in the same order InboxMock uses them, so
   Anand is blue and Nisha is pink in every picture on the site. */
export const AVATAR_TINTS = [
  "bg-[#e8f0ff] text-[#2f5fd0]",
  "bg-[#ffeaf2] text-[#c2367a]",
  "bg-[#e6f7ee] text-[#1b7a4b]",
  "bg-[#fff1e0] text-[#a5651c]",
] as const;

export function Avatar({
  name,
  tint,
  className = "size-7 text-[11.5px]",
}: {
  name: string;
  tint: number;
  className?: string;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-bold ${AVATAR_TINTS[tint % AVATAR_TINTS.length]} ${className}`}
    >
      {name.charAt(0)}
    </span>
  );
}
