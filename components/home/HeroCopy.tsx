import Link from "next/link";
import { ArrowIcon, PlayIcon, channelIcons } from "@/components/ui/icons";
import { channels, hero } from "@/lib/content/home";
import { site } from "@/lib/site";

/* ==========================================================================
   HERO COPY
   --------------------------------------------------------------------------
   A Server Component on purpose, and it stays one even though the stage that
   positions it is a Client Component. It is passed in as a prop rather than
   imported there, so the headline is real server-rendered HTML rather than
   something React has to hydrate before the largest paint can land.

   CENTRED, AND THE BUTTONS ARE BLACK. On a blue sky the brand blue loses
   most of its force - it is closer to its own background than to anything
   else on screen, which is exactly backwards for the one element the page
   exists to get clicked. Ink reads as the darkest thing in the frame from
   any distance. The blue is not gone: it is held back for the one italic
   word in the headline, where being the only saturated mark on a pale
   ground is the whole job.

   ONE ACCENT WORD, set in the serif italic. Used twice it stops reading as
   deliberate, so lib/content/home.ts carries exactly one.
   ========================================================================== */
export function HeroCopy() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {/* Eyebrow, in a frosted pill so it has something to sit on. */}
      <p className="anim-rise inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-[13px] font-semibold tracking-[0.04em] text-ink/70 shadow-[0_2px_10px_-4px_rgba(10,16,32,0.2)] backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-brand" />
        {hero.eyebrow}
      </p>

      {/* The only h1 on this route. */}
      <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-extrabold sm:text-[3.6rem] lg:text-[4.5rem] xl:text-[5rem]">
        {hero.headline.map((line, i) => (
          <span key={line.text} className="reveal-mask">
            <span
              className="anim-reveal"
              style={{ "--d": `${0.08 + i * 0.1}s` } as React.CSSProperties}
            >
              {line.text}
              {"accent" in line && line.accent ? (
                <span className="font-serif font-normal text-brand italic">
                  {line.accent}{" "}
                </span>
              ) : null}
            </span>
          </span>
        ))}
      </h1>

      <p
        className="anim-rise mx-auto mt-7 max-w-[56ch] text-[17px] leading-relaxed text-ink/65 md:text-[19.5px]"
        style={{ "--d": "0.38s" } as React.CSSProperties}
      >
        {hero.sub}
      </p>

      <div
        className="anim-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        style={{ "--d": "0.48s" } as React.CSSProperties}
      >
        <Link
          href={site.bookingUrl}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-[16.5px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(10,16,32,0.7)] transition-all hover:bg-ink/90 sm:w-auto"
        >
          {hero.primaryCta}
          <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link
          href="/how-it-works"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-white/55 px-8 py-4 text-[16.5px] font-bold text-ink shadow-[0_2px_12px_-6px_rgba(10,16,32,0.25)] backdrop-blur-md transition-colors hover:bg-white/80 sm:w-auto"
        >
          <PlayIcon className="size-3 text-brand" />
          {hero.secondaryCta}
        </Link>
      </div>

      {/* Channel marks. Named, not just coloured glyphs - an unlabelled logo
          row is a guessing game for anyone who does not already know the
          marks, and silence to a screen reader. */}
      <ul
        className="anim-fade mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        style={{ "--d": "0.64s" } as React.CSSProperties}
      >
        {channels.map((channel) => {
          const Icon = channelIcons[channel.id];
          return (
            <li
              key={channel.id}
              className="flex items-center gap-2.5 text-[15px] font-semibold text-ink/70"
            >
              <Icon className="size-[20px]" style={{ color: channel.color }} />
              {channel.short}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
