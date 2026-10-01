import { AdsMark } from "@/components/ui/featureIcons";
import { DocGlyph } from "@/components/features/kit/glyphs";
import { ARRIVALS, CAMPAIGNS, CAMPAIGN_STEPS, DEPARTURES, OUTBOX } from "@/components/features/marketing/shared";

/* ==========================================================================
   03 MARKETING - A FEATURE WORKING, IN TWO ROWS  (on each card of the deck)
   --------------------------------------------------------------------------
   Each feature's own moment, the way a station's board shows it: broadcasts
   on their way, campaigns going out, answers arriving - the rows turning
   over like a split-flap display. Invented examples in the app's own
   states, and no figures in any of them.

   A PICTURE, aria-hidden: the words on the card say what the feature does.
   It moves only while `live`; still, it is its finished state.
   ========================================================================== */

const TONES = {
  good: "bg-[linear-gradient(to_bottom,rgba(18,167,232,0.34)_50%,rgba(18,167,232,0.24)_50%)] text-[#c8edff]",
  wait: "bg-[linear-gradient(to_bottom,rgba(245,181,68,0.28)_50%,rgba(245,181,68,0.18)_50%)] text-[#ffdc9c]",
  plain: "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.07)_50%)] text-white/90",
} as const;

function Flap({ tone, flip, delay = 0, children }: { tone: keyof typeof TONES; flip: string | null; delay?: number; children: React.ReactNode }) {
  return (
    <span key={flip ?? "rest"} className={flip ? "anim-flap" : ""} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] leading-none font-bold whitespace-nowrap ${TONES[tone]}`}>
        {children}
      </span>
    </span>
  );
}

function Row({ title, sub, children }: { title: React.ReactNode; sub: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 border-t border-white/[0.08] py-2 first:border-t-0 first:pt-0 last:pb-0">
      <span className="min-w-0">
        <span className="block truncate text-[13px] leading-tight font-bold">{title}</span>
        <span className="mt-0.5 flex items-center gap-1.5 truncate text-[11.5px] text-white/60">{sub}</span>
      </span>
      {children}
    </li>
  );
}

export function LiveStrip({
  slug,
  live,
  tick,
  className = "",
}: {
  slug: string;
  live: boolean;
  tick: number;
  className?: string;
}) {
  const flip = (k: number) => (live && tick > 0 ? `${tick}-${k}` : null);
  let label: string;
  let body: React.ReactNode;

  if (slug === "whatsapp-marketing") {
    label = "Departures";
    const at = live ? tick % DEPARTURES.length : 0;
    body = [0, 1].map((k) => {
      const d = DEPARTURES[(at + k) % DEPARTURES.length];
      const step = d.steps[live ? tick % d.steps.length : d.steps.length - 1];
      return (
        <Row key={k} title={d.name} sub={<>{d.kind} · {d.to}</>}>
          <Flap tone={step === "Sending" ? "wait" : "good"} flip={flip(k)} delay={k * 90}>
            {step}
          </Flap>
        </Row>
      );
    });
  } else if (slug === "email-marketing") {
    label = "Outbox";
    const at = live ? tick % OUTBOX.length : 0;
    body = [0, 1].map((k) => {
      const m = OUTBOX[(at + k) % OUTBOX.length];
      const step = m.steps[live ? tick % m.steps.length : m.steps.length - 1];
      return (
        <Row key={k} title={m.subject} sub={m.to}>
          <Flap tone={step === "Sent" ? "good" : "plain"} flip={flip(k)} delay={k * 90}>
            {step}
          </Flap>
        </Row>
      );
    });
  } else if (slug === "forms") {
    label = "Arrivals";
    const n = ARRIVALS.length;
    const newest = live ? tick % n : 0;
    body = [0, 1].map((k) => {
      const r = ARRIVALS[(newest - k + n) % n];
      return (
        <Row
          key={k}
          title={r.who}
          sub={
            <>
              {r.src === "ads" ? <AdsMark className="size-3.5 text-[#8ec5ff]" /> : <DocGlyph className="size-3.5 text-white/80" />}
              {r.from}
            </>
          }
        >
          <Flap tone={r.status === "Deal opened" ? "good" : "plain"} flip={flip(k)} delay={k * 90}>
            {r.status}
          </Flap>
        </Row>
      );
    });
  } else if (slug === "marketing-ai-agent") {
    /* A step apart, so the two rows never flip to the same word; still,
       both are where the agent leaves them - paused, for you to start. */
    label = "Campaigns";
    const at = live ? tick % CAMPAIGNS.length : 0;
    const last = CAMPAIGN_STEPS.length - 1;
    body = [0, 1].map((k) => {
      const c = CAMPAIGNS[(at + k) % CAMPAIGNS.length];
      const step = CAMPAIGN_STEPS[live ? (tick + k) % CAMPAIGN_STEPS.length : last];
      return (
        <Row key={k} title={c.name} sub={<><AdsMark className="size-3.5 text-[#8ec5ff]" />{c.ad} · {c.where}</>}>
          <Flap tone={step === "Building" ? "wait" : step === "Paused" ? "plain" : "good"} flip={flip(k)} delay={k * 90}>
            {step}
          </Flap>
        </Row>
      );
    });
  } else {
    return null;
  }

  return (
    <div
      aria-hidden
      className={`rounded-xl bg-[#06102a]/95 px-3.5 py-3 text-white shadow-[0_18px_40px_-22px_rgba(6,16,42,0.9)] ring-1 ring-white/10 ${className}`}
    >
      <p className="mb-2 flex items-center gap-2 text-[10.5px] font-extrabold tracking-[0.14em] text-white/70 uppercase">
        <span className="relative flex size-1.5">
          {live && <span className="absolute inset-0 animate-ping rounded-full bg-[#34d399] opacity-60" />}
          <span className="relative size-1.5 rounded-full bg-[#34d399]" />
        </span>
        {label}
      </p>
      <ol>{body}</ol>
    </div>
  );
}
