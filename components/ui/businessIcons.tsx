/* ==========================================================================
   BUSINESS MARKS
   --------------------------------------------------------------------------
   One per business type in section 6, and they are used at about 96px as a
   WATERMARK rather than at 20px as an icon - bled off the top-right corner
   of a tile at 6% ink or 10% white.

   THAT IS WHY THEY ARE NOT THE CHANNEL MARKS COMING BACK. A channel mark
   sat at 18px in a chip and repeated four times across the grid, which was
   repetition of something the page had already taught three times over. A
   business mark is unique to its tile, is never read as an icon, and exists
   to give a tile a silhouette. Nine tiles carrying nothing but type is a
   spreadsheet with rounded corners, and that is exactly how it looked.

   DRAWN FOR SCALE, NOT FOR DETAIL. At 96px and 6% opacity the eye reads the
   OUTLINE and nothing else, so each of these has to be identifiable purely
   by its silhouette against its seven neighbours: an awning, a cross, a
   pair of blades, a lens, a mortarboard, a cone, a case, a van. Fine
   interior detail would be invisible at that opacity and is left out.

   SAME FAMILY AS THE FEATURE MARKS - 24px box, round caps and joins, no
   fills - but a heavier 1.5 stroke, because a hairline scaled to 96px and
   dropped to 6% opacity disappears entirely.
   ========================================================================== */

type P = { className?: string; style?: React.CSSProperties };

const S = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* Showroom - an awning over a shopfront with its door. */
export function StorefrontMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M4.5 9.4 6.2 4.2h11.6l1.7 5.2z" />
      <path d="M3 9.4h18" />
      <path d="M5.4 9.4v11h13.2v-11" />
      <path d="M9.7 20.4v-6.2h4.6v6.2" />
    </svg>
  );
}

/* Clinic - a cross in a rounded square. A stethoscope was tried and its
   tubing is a thin curve that vanishes at 6%; a cross is a silhouette. */
export function ClinicMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.4" />
      <path d="M12 8.2v7.6M8.2 12h7.6" />
    </svg>
  );
}

/* Salon - scissors. */
export function ScissorsMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <circle cx="6.2" cy="6.2" r="2.6" />
      <circle cx="6.2" cy="17.8" r="2.6" />
      <path d="M8.4 7.8 20 18.6M8.4 16.2 20 5.4" />
    </svg>
  );
}

/* Studio - a camera. */
export function CameraMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M3 8.8a2.2 2.2 0 0 1 2.2-2.2h2.2L8.8 4.2h6.4l1.4 2.4h2.2A2.2 2.2 0 0 1 21 8.8v8.6a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 17.4z" />
      <circle cx="12" cy="12.8" r="3.6" />
    </svg>
  );
}

/* School - a mortarboard. */
export function SchoolMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M2.4 9.2 12 4.6l9.6 4.6L12 13.8z" />
      <path d="M6.6 11.4v4.4c0 1.6 2.4 2.9 5.4 2.9s5.4-1.3 5.4-2.9v-4.4" />
      <path d="M21.6 9.2v5.4" />
    </svg>
  );
}

/* Agency - a megaphone, for the ad that brought the lead in. */
export function MegaphoneMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M4 9.8v4.4a1.6 1.6 0 0 0 1.6 1.6h2.2l7.4 4.4V3.8L7.8 8.2H5.6A1.6 1.6 0 0 0 4 9.8z" />
      <path d="M18.4 9a4.4 4.4 0 0 1 0 6" />
      <path d="M7.8 15.8v3.8" />
    </svg>
  );
}

/* Consultant - a case. */
export function BriefcaseMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <rect x="2.8" y="7.2" width="18.4" height="12.6" rx="2.6" />
      <path d="M8.6 7.2V5.6a2 2 0 0 1 2-2h2.8a2 2 0 0 1 2 2v1.6" />
      <path d="M2.8 12.6h18.4" />
      <path d="M10.2 12.6v1.8h3.6v-1.8" />
    </svg>
  );
}

/* Service business - a van, because the enquiry ends with somebody coming
   out to you. */
export function VanMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M2.6 16.4V8.8a1.6 1.6 0 0 1 1.6-1.6h8v9.2" />
      <path d="M12.2 10.6h3.4l3.8 3.8v2h-7.2" />
      <circle cx="7.4" cy="17.4" r="1.9" />
      <circle cx="16.8" cy="17.4" r="1.9" />
      <path d="M2.6 16.4h2.9M9.3 16.4h5.6M18.7 16.4h2.7" />
    </svg>
  );
}

export const businessMarks = {
  storefront: StorefrontMark,
  clinic: ClinicMark,
  scissors: ScissorsMark,
  camera: CameraMark,
  school: SchoolMark,
  megaphone: MegaphoneMark,
  briefcase: BriefcaseMark,
  van: VanMark,
} as const;

export type BusinessMark = keyof typeof businessMarks;
