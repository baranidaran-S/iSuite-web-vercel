import { WhatsAppIcon } from "@/components/ui/icons";
import { AdsMark, AssistantMark, ContactsMark } from "@/components/ui/featureIcons";
import { CastPause } from "@/components/how/CastPause";
import { cast, type CastId } from "@/lib/content/howItWorks";

/* ==========================================================================
   /how-it-works - THE CAST
   --------------------------------------------------------------------------
   Everyone one enquiry passes through, in the order it reaches them: the
   customer, the Sales AI Agent, the team, iSuite AI itself, and Meta,
   where the ad ran and where the loop closes. The journey below says what
   each of them does, step by step; this is who they are.

   THE ENQUIRY IS CARRIED ALONG THEM. From 1024px a bubble travels the row,
   stopping over each in turn and saying what the enquiry has become there -
   the customer's question, answered, handed to Sara, saved as a contact and
   a deal, sent back to Meta - while that card lights. One eight-second
   loop, a fifth at each (anim-baton and anim-baton-turn in globals.css).
   Below 1024 the cards stack and only the light moves down them.

   ALL CSS, SO A SERVER COMPONENT: the cast is real HTML in the first
   response, and nothing here can disagree with it. Under reduced motion
   the bubble's row is not drawn and the cards stand unlit - the row is
   shown only where motion is welcome (lg:motion-safe:block): a
   motion-reduce:hidden beside lg:block lost to it, Tailwind writing the
   breakpoint later, and left an empty dashed line over the cards.

   IT CAN BE PAUSED. The loop never ends, and motion that starts by itself
   and lasts more than five seconds needs a way to stop it (WCAG 2.2.2) -
   the small Pause under the row (CastPause.tsx, the one part that runs in
   the browser) holds it where it stands. It also keeps the bubble in step
   with the lit card when the window crosses 1024px - see there.

   EACH HAS A COLOUR the journey below keeps for them: the customer
   WhatsApp's green, the assistant the brand's blue, the team amber, iSuite
   AI the page's ink, Meta a violet. Each deep value holds 5:1 or better on
   the card's white.
   ========================================================================== */

export const CAST_TONE: Record<CastId, { light: string; deep: string }> = {
  customer: { light: "#25d366", deep: "#0f7a40" },
  assistant: { light: "#0a5bf5", deep: "#0847d6" },
  team: { light: "#f59e0b", deep: "#a15c07" },
  system: { light: "#041c3d", deep: "#041c3d" },
  meta: { light: "#6d5cff", deep: "#4b3fd1" },
};

/* A fifth of the loop each - the delays below and the keyframes in
   globals.css are written for this. */
const TURN = 1.6;

function Face({ letter, className }: { letter: string; className: string }) {
  return (
    <span
      className={`grid size-12 place-items-center rounded-full text-[19px] font-extrabold ring-4 ring-white ${className}`}
    >
      {letter}
    </span>
  );
}

function Portrait({ id }: { id: CastId }) {
  const round =
    "relative grid size-16 shrink-0 place-items-center rounded-full shadow-[0_10px_24px_-10px_rgba(10,16,32,0.45)] ring-4 ring-white";
  switch (id) {
    case "customer":
      return (
        <span aria-hidden className={`${round} bg-[#dff5e8] text-[26px] font-extrabold text-[#0f7a40]`}>
          A
          <span className="absolute -right-1.5 -bottom-1.5 grid size-7 place-items-center rounded-full bg-white shadow-[0_2px_6px_rgba(10,16,32,0.2)]">
            <WhatsAppIcon className="size-4 text-wa" />
          </span>
        </span>
      );
    case "assistant":
      return (
        <span aria-hidden className={`${round} bg-[linear-gradient(135deg,#0a5bf5,#00c8f8)] text-white`}>
          <AssistantMark className="size-7" />
        </span>
      );
    case "team":
      return (
        <span aria-hidden className="flex h-16 shrink-0 items-center -space-x-3.5">
          <Face letter="S" className="bg-[#eef3ff] text-brand" />
          <Face letter="R" className="bg-[#fff1e0] text-[#a5651c]" />
        </span>
      );
    case "system":
      return (
        <span aria-hidden className={`${round} bg-ink text-white`}>
          <ContactsMark className="size-7" />
        </span>
      );
    case "meta":
      return (
        <span aria-hidden className={`${round} bg-[#6d5cff] text-white`}>
          <AdsMark className="size-7" />
        </span>
      );
  }
}

export function Cast() {
  return (
    <div className="anim-rise relative mx-auto mt-14 max-w-[76rem] md:mt-16" style={{ "--d": "0.45s" } as React.CSSProperties}>
      <h2
        id="cast-title"
        className="text-center text-[12.5px] font-extrabold tracking-[0.14em] text-ink/65 uppercase"
      >
        Everyone the enquiry passes through
      </h2>

      <div id="cast-show" className="relative mt-5 lg:mt-3">
        {/* THE ROUTE AND WHAT TRAVELS IT, from 1024. A dashed line over
            the row from the first card's centre to the last's, and the
            bubble moving along it - the same five labels, each shown while
            the bubble stands over its card. */}
        <div aria-hidden className="relative hidden h-14 lg:motion-safe:block">
          <span className="absolute inset-x-[10%] top-[27px] border-t-2 border-dashed border-white/85" />
          <span className="anim-baton absolute top-0 left-[10%] w-0">
            {cast.map((c, i) => (
              <span
                key={c.id}
                className="anim-baton-turn absolute top-0 left-0 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-bold whitespace-nowrap text-ink opacity-0 shadow-[0_10px_24px_-10px_rgba(10,16,32,0.4)]"
                style={{ "--d": `${i * TURN}s` } as React.CSSProperties}
              >
                <span className="size-2 rounded-full" style={{ backgroundColor: CAST_TONE[c.id].light }} />
                {c.passes}
              </span>
            ))}
          </span>
        </div>

        <ol aria-labelledby="cast-title" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {cast.map((c, i) => {
            const tone = CAST_TONE[c.id];
            return (
              <li
                key={c.id}
                className={`relative rounded-[1.4rem] bg-white/85 p-4 shadow-[0_18px_40px_-26px_rgba(10,16,32,0.45)] ring-1 ring-white backdrop-blur-md md:p-5 lg:text-center ${
                  i === cast.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Its turn: the card lit in its own colour while the
                    enquiry is with it. */}
                <span
                  aria-hidden
                  className="anim-baton-turn pointer-events-none absolute -inset-px rounded-[inherit] opacity-0"
                  style={
                    {
                      boxShadow: `0 0 0 2px ${tone.light}, 0 24px 44px -22px ${tone.light}`,
                      "--d": `${i * TURN}s`,
                    } as React.CSSProperties
                  }
                />
                <div className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:gap-0">
                  <Portrait id={c.id} />
                  <div className="min-w-0 lg:mt-4">
                    <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase" style={{ color: tone.deep }}>
                      {c.role}
                    </p>
                    <h3 className="mt-1 text-[17.5px] leading-tight font-extrabold text-ink">{c.title}</h3>
                    <p className="mt-2 text-[14px] leading-snug text-ink/70">{c.line}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-3 flex justify-end">
          <CastPause target="cast-show" />
        </div>
      </div>
    </div>
  );
}
