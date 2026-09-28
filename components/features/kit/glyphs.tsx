/* ==========================================================================
   SMALL GLYPHS FOR THE PRODUCT DRAWINGS
   --------------------------------------------------------------------------
   The handful of interface marks the /features screens need that neither
   components/ui/icons nor the minis already draw. Same family as those:
   a 24px box, round caps, currentColor. All aria-hidden - they only ever
   appear inside pictures.
   ========================================================================== */

type G = { className?: string; style?: React.CSSProperties };

const S = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/* Four squares - "everything", on the channel rail. */
export function AllGlyph({ className, style }: G) {
  return (
    <svg {...S} className={className} style={style}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" />
    </svg>
  );
}

export function MicGlyph({ className, style }: G) {
  return (
    <svg {...S} className={className} style={style}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
    </svg>
  );
}

export function ImageGlyph({ className, style }: G) {
  return (
    <svg {...S} className={className} style={style}>
      <rect x="3" y="4.5" width="18" height="15" rx="3" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 17.5 5-4.5 4 3.5 3-2.5 4.5 3.5" />
    </svg>
  );
}

export function BoltGlyph({ className, style }: G) {
  return (
    <svg {...S} className={className} style={style}>
      <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3z" />
    </svg>
  );
}

export function SendGlyph({ className, style }: G) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M2.5 21 23 12 2.5 3v7l14 2-14 2v7z" />
    </svg>
  );
}

export function ClipGlyph({ className, style }: G) {
  return (
    <svg {...S} strokeWidth={1.8} className={className} style={style}>
      <path d="M17 8.5 9.5 16a3 3 0 1 1-4.2-4.3l8-8a4.5 4.5 0 0 1 6.4 6.4l-8 8" />
    </svg>
  );
}

export function DownGlyph({ className, style }: G) {
  return (
    <svg {...S} className={className} style={style}>
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
    </svg>
  );
}

export function DocGlyph({ className, style }: G) {
  return (
    <svg {...S} strokeWidth={1.8} className={className} style={style}>
      <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8l-5-5z" />
      <path d="M14 3v5h5M9 13h6M9 16.5h4" />
    </svg>
  );
}

export function HandGlyph({ className, style }: G) {
  return (
    <svg {...S} strokeWidth={1.8} className={className} style={style}>
      <path d="M4 13.5h3.5l3.2 2.3c.9.6 2 .6 2.8-.1l5.3-4.4a1.6 1.6 0 0 0-2-2.5l-3.3 2.4" />
      <path d="M4 18.5h9.2c.8 0 1.6-.3 2.2-.8l4.6-3.8M9.5 11.5l1.4-1.2a3 3 0 0 1 3.8 0" />
    </svg>
  );
}

export function RepeatGlyph({ className, style }: G) {
  return (
    <svg {...S} strokeWidth={1.8} className={className} style={style}>
      <path d="M4 12a7 7 0 0 1 12.2-4.7L18.5 9.5M20 12a7 7 0 0 1-12.2 4.7L5.5 14.5" />
      <path d="M18.5 4.5v5h-5M5.5 19.5v-5h5" />
    </svg>
  );
}

export function SparkGlyph({ className, style }: G) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M12 2.5c.5 4.6 2.9 7 7.5 7.5v.9c-4.6.5-7 2.9-7.5 7.6h-.9c-.5-4.7-2.9-7.1-7.6-7.6V10c4.7-.5 7.1-2.9 7.6-7.5h.9z" />
    </svg>
  );
}

export function BellGlyph({ className, style }: G) {
  return (
    <svg {...S} strokeWidth={1.8} className={className} style={style}>
      <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15L6 16.5zM10 20.5a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function InfoGlyph({ className, style }: G) {
  return (
    <svg {...S} strokeWidth={1.9} className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.6v.1" />
    </svg>
  );
}
