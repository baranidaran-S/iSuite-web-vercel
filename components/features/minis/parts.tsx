/* ==========================================================================
   FEATURE MINIS - THE SHARED PARTS
   --------------------------------------------------------------------------
   A mini is the smallest piece of real interface that says what one
   feature is: the inbox as four conversations, the pipeline as three
   stages, follow-ups as a due list. Thirteen of them, one per feature,
   drawn in the same components the home page's product frames use - white
   surfaces, hairline borders, the channel marks, the AI badge - so they
   read as views of one product rather than as thirteen illustrations.

   THEY ARE PICTURES. Every mini is aria-hidden where it is used: the
   feature's name and summary sit beside it as real text, and a screen
   reader reading "Anand R., 2h, What do you charge for a consultation" in
   the middle of a link to "One Inbox" would be noise.

   THE SAME PEOPLE AS THE HOME PAGE. Anand, Nisha, Prakash and Farah are
   read from lib/content/queues.ts, never retyped, and each one is shown in
   the state the home page already put them in - Anand qualified with a
   charges list to send, Prakash booked for Saturday at 11, Farah's two
   forms merged into one. A mini that contradicted the home page's board
   would tell a careful visitor the pictures are made up.

   NO FIGURES. Times of day and prices a customer was quoted are content;
   counts, values and rates are statistics, and none appear.
   ========================================================================== */

/* Every mini takes the same props, so thirteen of them can sit in one map
   and any picture can ask for any of them. `rich` asks for the fuller
   version - the extra rows a mini shows when it has room: the inbox and
   the assistant, which have the hero's Conversations sheet to themselves,
   and the ad, which has a column of the Marketing sheet. Most minis have
   only one version and ignore it. */
export type MiniProps = { rich?: boolean };

/* The inbox's own avatar tints, in the same order InboxMock uses them, so
   Anand is blue and Nisha is pink in every picture on the site. */
export const AVATAR_TINTS = [
  "bg-[#e8f0ff] text-[#2f5fd0]",
  "bg-[#ffeaf2] text-[#c2367a]",
  "bg-[#e6f7ee] text-[#1b7a4b]",
  "bg-[#fff1e0] text-[#a5651c]",
] as const;

export function MiniCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-surface shadow-[0_12px_28px_-18px_rgba(10,16,32,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

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

/* The owner's initials, in the blue the board uses for them. */
export function Owner({ initials }: { initials: string | undefined }) {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#e8f0ff] text-[9px] font-bold text-[#2f5fd0]">
      {initials}
    </span>
  );
}

/* The product marks every assistant message with this. It is the one
   detail that separates the assistant from somebody typing fast. */
export function AiBadge({ onBrand = true }: { onBrand?: boolean }) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
        onBrand ? "bg-white/20 text-white" : "bg-brand-tint text-brand"
      }`}
    >
      &#10022; AI
    </span>
  );
}

const TONES = {
  brand: "bg-brand-tint text-brand",
  green: "bg-[#e6f7ee] text-[#1b7a4b]",
  amber: "bg-[#fff6ea] text-[#a16326]",
  grey: "bg-[#f2f4f9] text-ink/75",
} as const;

export type Tone = keyof typeof TONES;

export function Chip({
  tone = "grey",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] leading-tight font-bold whitespace-nowrap ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Dot({ className = "bg-brand" }: { className?: string }) {
  return <span className={`size-1.5 shrink-0 rounded-full ${className}`} />;
}

/* Two ticks, read. */
export function ReadTicks({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m2 13 3.5 3.5L13 9M10 13l3.5 3.5L21 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchGlyph({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronGlyph({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9.4 5.4 16 12l-6.6 6.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
