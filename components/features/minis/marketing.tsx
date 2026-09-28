import Image from "next/image";
import { MegaphoneMark } from "@/components/ui/businessIcons";
import {
  ArrowIcon,
  CheckIcon,
  GlobeIcon,
  PlayIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { ads } from "@/lib/content/ads";
import { unanswered } from "@/lib/content/queues";
import {
  Avatar,
  Chip,
  MiniCard,
  ReadTicks,
  type MiniProps,
} from "@/components/features/minis/parts";

/* ==========================================================================
   MINIS - MARKETING
   ========================================================================== */

const [anand, , , farah] = unanswered;

/* The clinic's own poster, the one the owner sent to AI Studio on the home
   page. Read from ads.ts, so the two can never show different ads. */
const POSTER = ads.studio.turns[0].attachment;

/* ---- Meta Ads ------------------------------------------------------------
   The poster, the four things built from it, the approval the owner gives
   before anything runs - and the reason anyone wants this feature: the
   enquiry arrives with the ad written on it. Anand is on WhatsApp because
   the ad's button opened a WhatsApp chat, which is how he reached the
   inbox in the first place.

   THE RICH VERSION NAMES WHAT SYNCS BACK - §15's list - as names, never as
   numbers, and the one thing that goes the other way: the leads that
   qualified, sent back to Meta. It is what fills the Marketing sheet's tall
   left column in the hero. */
export function MetaAdsMini({ rich = false }: MiniProps) {
  return (
    <MiniCard className="w-full p-2.5">
      {POSTER && (
        <div className="relative flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-ink via-[#0a2f7a] to-brand-dark py-2.5 pr-2 pl-3">
          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-tight font-extrabold text-white">
              {POSTER.title}
            </p>
            <p className="mt-0.5 text-[10.5px] font-semibold text-white/70">
              {POSTER.sub}
            </p>
          </div>
          {POSTER.image.src && (
            <Image
              src={POSTER.image.src}
              alt=""
              width={96}
              height={96}
              sizes="56px"
              className="h-12 w-auto shrink-0"
            />
          )}
        </div>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-1">
        {["Campaign", "Ad set", "Two ads", "Enquiry form"].map((part) => (
          <Chip key={part}>{part}</Chip>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[10.5px] font-bold text-white">
          <PlayIcon className="size-2.5" />
          Approve and run
        </span>
        <span className="truncate text-[10px] font-semibold text-muted">
          You set the daily cap.
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-bg px-2 py-1.5">
        <WhatsAppIcon className="size-3.5 shrink-0 text-[var(--color-wa)]" />
        <span className="truncate text-[11px]">
          <span className="font-bold">{anand.name}</span>
          <span className="text-muted"> came from this ad</span>
        </span>
      </div>

      {rich && (
        <div className="mt-2.5 border-t border-line-soft pt-2.5">
          {/* "Tracked for this ad", not "Synced from your ad account": won
              deals come from the pipeline, and are nowhere in Meta. */}
          <p className="text-[10px] font-bold text-muted">
            Tracked for this ad
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {["Spend", "Impressions", "Clicks", "Leads", "Won deals"].map(
              (m) => (
                <Chip key={m}>{m}</Chip>
              ),
            )}
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[10.5px] font-bold text-[#1b7a4b]">
            <CheckIcon className="size-3" />
            Qualified leads sent back to Meta
          </p>
        </div>
      )}
    </MiniCard>
  );
}

/* ---- Broadcasts and Templates -------------------------------------------
   A template Meta has approved, sent to a tag rather than to everyone, and
   read. Nisha's own answer on the home page was "Saturday 9am to 2pm", so
   that is what the clinic's camp announcement says. */
export function BroadcastMini() {
  return (
    <MiniCard className="w-full p-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[11.5px] font-bold">Saturday check-up camp</p>
        <Chip tone="green">
          <CheckIcon className="size-2.5" />
          Approved
        </Chip>
      </div>

      <p className="mt-1.5 rounded-lg rounded-tl-sm bg-[#eaf8ee] px-2 py-1.5 text-[11px] leading-snug text-ink">
        Hi Anand, Saturday check-ups run 9am to 2pm. Reply YES and we will
        hold a slot for you.
      </p>

      <div className="mt-2 flex items-center justify-between gap-2">
        <Chip tone="brand">Tag: First visit</Chip>
        <span className="flex items-center gap-1 text-[10.5px] font-semibold text-muted">
          Read
          <ReadTicks className="size-3.5 text-[#34b7f1]" />
        </span>
      </div>
    </MiniCard>
  );
}

/* ---- Lead Capture --------------------------------------------------------
   Three ways in, one record out. It is Farah because her story on the home
   page is exactly this feature: she filled the form twice and ended up as
   one enquiry, not two. */
const SOURCES = [
  { label: "Lead form", Glyph: MegaphoneMark, ink: "text-brand" },
  { label: "WhatsApp ad", Glyph: WhatsAppIcon, ink: "text-[var(--color-wa)]" },
  { label: "Website", Glyph: GlobeIcon, ink: "text-[var(--color-web)]" },
] as const;

export function LeadCaptureMini() {
  return (
    <div className="flex w-full flex-col items-center gap-1.5">
      <div className="flex flex-wrap justify-center gap-1">
        {SOURCES.map(({ label, Glyph, ink }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-1 text-[10.5px] font-bold shadow-[0_1px_3px_rgba(10,16,32,0.06)]"
          >
            <Glyph className={`size-3 ${ink}`} />
            {label}
          </span>
        ))}
      </div>

      <ArrowIcon className="size-3.5 rotate-90 text-muted" />

      <MiniCard className="w-full p-2">
        <div className="flex items-center gap-2">
          <Avatar name={farah.name} tint={3} className="size-6 text-[10.5px]" />
          <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold">
            {farah.name}
          </span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1">
          <Chip tone="green">
            <CheckIcon className="size-2.5" />
            Contact created
          </Chip>
          <Chip tone="brand">Duplicate matched</Chip>
        </div>
      </MiniCard>
    </div>
  );
}
