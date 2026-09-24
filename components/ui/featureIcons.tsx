/* ==========================================================================
   FEATURE MARKS
   --------------------------------------------------------------------------
   One per feature in section 5. Inline rather than from an icon package -
   thirteen glyphs do not justify a dependency, and inline SVG costs no
   request.

   ALL ONE FAMILY, ON PURPOSE: 24px box, 1.7 stroke, round caps and joins,
   no fills. Thirteen icons drawn in thirteen styles is worse than no icons
   at all, because the eye reads the inconsistency before it reads any of
   them. Everything inherits currentColor so the group's accent sets it.

   THEY ARE MARKS, NOT ILLUSTRATIONS. Each one only has to be distinguishable
   from its twelve neighbours at 20px - not to explain its feature, which is
   what the name and the line beside it are for.
   ========================================================================== */

type P = { className?: string; style?: React.CSSProperties };

const S = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function InboxMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M3 13.5 5.6 5.2A2 2 0 0 1 7.5 3.8h9a2 2 0 0 1 1.9 1.4L21 13.5v4.2a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.7z" />
      <path d="M3 13.5h4.7l1.4 2.6h5.8l1.4-2.6H21" />
    </svg>
  );
}

export function AssistantMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M12.5 2.8 14.3 8l5.2 1.8-5.2 1.8-1.8 5.2-1.8-5.2L5.5 9.8 10.7 8z" />
      <path d="M18.6 15.4l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </svg>
  );
}

export function ContactsMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <rect x="2.8" y="4.5" width="18.4" height="15" rx="2.6" />
      <circle cx="9" cy="10.4" r="2.3" />
      <path d="M5.4 16.2a3.9 3.9 0 0 1 7.2 0M15.2 9.6h3.6M15.2 13.4h3.6" />
    </svg>
  );
}

export function PipelineMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <rect x="3" y="4.4" width="4.6" height="15.2" rx="1.6" />
      <rect x="9.7" y="4.4" width="4.6" height="10.4" rx="1.6" />
      <rect x="16.4" y="4.4" width="4.6" height="6.4" rx="1.6" />
    </svg>
  );
}

export function FollowUpMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M20.6 12a8.6 8.6 0 1 1-2.6-6.1" />
      <path d="M20.8 4.2v4.4h-4.4M12 7.6V12l3 1.9" />
    </svg>
  );
}

export function CalendarMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2.6" />
      <path d="M3 9.8h18M8 3v4M16 3v4" />
      <path d="M8.6 14.6l1.9 2 4-4.2" />
    </svg>
  );
}

export function AdsMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M4 9.4v5.2a1.6 1.6 0 0 0 1.6 1.6h2L14 20.4V3.6L7.6 7.8h-2A1.6 1.6 0 0 0 4 9.4z" />
      <path d="M17.4 8.6a4.6 4.6 0 0 1 0 6.8M7.6 16.2v3.1" />
    </svg>
  );
}

export function BroadcastMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <circle cx="12" cy="12" r="2.4" />
      <path d="M8.1 8.1a5.5 5.5 0 0 0 0 7.8M15.9 15.9a5.5 5.5 0 0 0 0-7.8M5.2 5.2a9.6 9.6 0 0 0 0 13.6M18.8 18.8a9.6 9.6 0 0 0 0-13.6" />
    </svg>
  );
}

export function CaptureMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M12 3v9.6M12 12.6 8.4 9M12 12.6 15.6 9" />
      <path d="M3.6 14.4v3.6a2.4 2.4 0 0 0 2.4 2.4h12a2.4 2.4 0 0 0 2.4-2.4v-3.6" />
    </svg>
  );
}

export function AutomationMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M13.4 2.6 4.8 13.2h5.6l-1.2 8.2 8.6-10.6h-5.6z" />
    </svg>
  );
}

export function ReportsMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M3.4 20.4h17.2" />
      <path d="M6.6 20.4v-6.2M11.4 20.4V7.6M16.2 20.4v-9.4" />
      <path d="M4.8 9.4 10 4.6l3.4 3.2 5.8-5" />
    </svg>
  );
}

export function TeamMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <circle cx="8.6" cy="8.4" r="3.2" />
      <path d="M2.8 19.6a5.8 5.8 0 0 1 11.6 0" />
      <path d="M16.4 5.6a3 3 0 0 1 0 5.8" />
      <path d="M21.2 13.6v2.6c0 2.2-1.6 3.6-3 4.2-1.4-.6-3-2-3-4.2v-2.6l3-1.2z" />
    </svg>
  );
}

export function CommerceMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M20.6 11.6a8.2 8.2 0 0 1-11.9 7.3L3.4 20.6l1.7-5.3A8.2 8.2 0 1 1 20.6 11.6z" />
      <path d="M9.6 7.6h4.8M9.6 10.4h4.8M13.4 7.6a2.8 2.8 0 0 1 0 5.6H9.6l4.4 3.6" />
    </svg>
  );
}

/* ---- THE FOUR GROUP MARKS -------------------------------------------------
   Bigger than the feature marks and set in a larger tile, so a panel opens
   on a picture rather than on a heading. Same family, same stroke. */

export function ConversationsMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M16.2 13.4a2.4 2.4 0 0 1-2.4 2.4H8.4L4.8 18.8v-3H4.2a2.4 2.4 0 0 1-2.4-2.4V6.2a2.4 2.4 0 0 1 2.4-2.4h9.6a2.4 2.4 0 0 1 2.4 2.4z" />
      <path d="M19.2 8.6h.6a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4h-.6v2.4l-3-2.4h-4.4" />
    </svg>
  );
}

export function SalesMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M3.2 20.6h17.6" />
      <rect x="4.4" y="12.6" width="4" height="8" rx="1.4" />
      <rect x="10" y="8.4" width="4" height="12.2" rx="1.4" />
      <rect x="15.6" y="4.2" width="4" height="16.4" rx="1.4" />
    </svg>
  );
}

export function MarketingMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M21.4 2.8 2.9 10.1a.6.6 0 0 0 0 1.1l7.2 2.8 2.8 7.2a.6.6 0 0 0 1.1 0z" />
      <path d="M21.4 2.8 10.1 14.1" />
    </svg>
  );
}

export function OperationsMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M19.2 14.8a1.5 1.5 0 0 0 .3 1.7l.1.1a1.9 1.9 0 1 1-2.7 2.7l-.1-.1a1.5 1.5 0 0 0-2.6 1.1v.2a1.9 1.9 0 0 1-3.8 0v-.1a1.5 1.5 0 0 0-2.6-1.1l-.1.1a1.9 1.9 0 1 1-2.7-2.7l.1-.1a1.5 1.5 0 0 0-1.1-2.6h-.2a1.9 1.9 0 0 1 0-3.8h.1a1.5 1.5 0 0 0 1.1-2.6l-.1-.1a1.9 1.9 0 1 1 2.7-2.7l.1.1a1.5 1.5 0 0 0 1.7.3h.1a1.5 1.5 0 0 0 .9-1.4v-.2a1.9 1.9 0 0 1 3.8 0v.1a1.5 1.5 0 0 0 2.6 1.1l.1-.1a1.9 1.9 0 1 1 2.7 2.7l-.1.1a1.5 1.5 0 0 0 1.1 2.6h.2a1.9 1.9 0 0 1 0 3.8h-.1a1.5 1.5 0 0 0-1.4.9z" />
    </svg>
  );
}

export function ChevronMark({ className, style }: P) {
  return (
    <svg {...S} className={className} style={style} aria-hidden>
      <path d="M9.4 5.4 16 12l-6.6 6.6" />
    </svg>
  );
}

export const groupMarks = {
  conversations: ConversationsMark,
  sales: SalesMark,
  marketing: MarketingMark,
  operations: OperationsMark,
} as const;

export type GroupMark = keyof typeof groupMarks;

export const featureMarks = {
  inbox: InboxMark,
  assistant: AssistantMark,
  contacts: ContactsMark,
  pipeline: PipelineMark,
  followups: FollowUpMark,
  appointments: CalendarMark,
  ads: AdsMark,
  broadcasts: BroadcastMark,
  capture: CaptureMark,
  automations: AutomationMark,
  reports: ReportsMark,
  team: TeamMark,
  commerce: CommerceMark,
} as const;

export type FeatureMark = keyof typeof featureMarks;
