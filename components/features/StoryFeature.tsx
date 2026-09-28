"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ScaledScreen } from "@/components/features/kit/ScaledScreen";
import { SpotProvider } from "@/components/features/kit/spot";
import {
  CapabilityItems,
  FeatureLead,
  FeaturePill,
  FeatureShell,
  FeatureTitle,
  GoodToKnow,
  featureOf,
  useEnter,
  type Tone,
} from "@/components/features/section";
import type { FeatureSlug } from "@/lib/content/featureDetails";

/* ==========================================================================
   /features - THE FEATURE LAYOUT: THE STORY
   --------------------------------------------------------------------------
   Every feature on the page is laid out by this. The whole product screen
   stays pinned on the right while the groups scroll past on the left, and
   the screen lights the part each one is about - the channel rail, then
   the list, then the thread, then the panel. Everything else steps back
   without leaving, so each part is seen where it lives in the product.

   CHOSEN FROM THREE. A board of tiles and an annotated screen - the whole
   screen with every group outlined and numbered, labelled from below -
   were built beside it for Chapter 01 and dropped.

   A visitor reads one group at a time and never loses the whole: the
   screen they are looking at is the same screen throughout, and only the
   light moves. The line of numbered stops beside the text fills as they
   go, and the numbers under the screen jump straight to a group.

   POINTING AT A CAPABILITY LIGHTS THE ELEMENT - the unread chip, the voice
   note - with a ring, and lights its group with it if a different group
   was lit.

   PINNED FROM 1280px ONLY, AND THAT IS MEASURED. At 1024 the screen's
   column is 497px, which draws the inbox at 62% and its type at about
   8px - a picture of software rather than software. Below 1280 each group
   gets its own part of the product instead, at full size: beside its list
   from 768px, above it on a phone.

   THE PINNED SCREEN FITS THE WINDOW'S HEIGHT, NOT ONLY ITS WIDTH. Sized by
   width alone, it came to 657px tall with its labels on a 1366x657 laptop
   - the most common laptop window there is - and on 1280x609 hung 48px
   past the bottom of the screen, where a pinned thing can never be
   scrolled to. It is now the smaller of its column and what the window's
   height leaves, and on a tall window it sits in the middle of the height
   rather than under the bar with empty space beneath it.
   ========================================================================== */

/* Height the pinned column needs besides the screen: the bar above it,
   the row of numbers under it, and a little air. */
const FURNITURE = "16rem";

/* Where the pinned column sits: under the bar on a short window, and on a
   tall one about midway between the bar and the foot of the window - half
   the window, less half the tallest pinned block and less half the bar. */
const PIN_TOP = "max(10.5rem, calc(50svh - 11rem))";

export function StoryFeature({
  slug,
  tone,
}: {
  slug: FeatureSlug;
  tone: Tone;
}) {
  const { group, detail, screen } = featureOf(slug);
  const { Screen, size, crops } = screen;
  const dark = tone === "dark";
  const enter = useEnter();

  /* ---- which group is being read ---- */
  const [active, setActive] = useState(-1);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.55;
      let a = -1;
      steps.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) a = i;
      });
      setActive(a);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  /* ---- what is being pointed at ---- */
  const [hot, setHot] = useState<string | null>(null);
  const hotGroup = hot
    ? detail.groups.find((g) => g.items.some((c) => c.id === hot))?.id
    : undefined;
  const focus =
    hotGroup ?? (active >= 0 ? detail.groups[active].id : null);

  const accent = group.accent;
  const deep = group.deep;
  const fill = active < 0 ? 0 : (active + 0.5) / detail.groups.length;

  const goTo = (i: number) =>
    steps.current[i]?.scrollIntoView({ block: "center" });

  return (
    <FeatureShell slug={slug} tone={tone}>
      <div className="xl:grid xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] xl:gap-16">
        {/* ---------------- THE WORDS ---------------- */}
        <div>
          <FeaturePill slug={slug} tone={tone} />
          <FeatureTitle
            slug={slug}
            tone={tone}
            size="3.7em"
            className="mt-6 max-w-[15ch] md:max-w-[18ch] xl:max-w-[15ch]"
          />
          <FeatureLead slug={slug} tone={tone} className="mt-6 max-w-[54ch]" />

          <SpotProvider mode="plain" focus={null} hot={hot} accent={accent}>
            <ol className="relative mt-14 md:mt-16">
              {/* The line of stops. The fill reaches the middle of the
                  group being read. */}
              <span
                aria-hidden
                className={`absolute top-4 bottom-10 left-[15px] w-px ${dark ? "bg-white/12" : "bg-line"}`}
              />
              <span
                aria-hidden
                className="absolute top-4 bottom-10 left-[15px] hidden w-px origin-top transition-transform duration-700 ease-out xl:block"
                style={{
                  transform: `scaleY(${fill})`,
                  backgroundColor: dark ? "#ffffff" : deep,
                }}
              />

              {detail.groups.map((g, i) => {
                const Crop = crops[g.id];
                const on = active === i;
                const reached = active >= i;
                return (
                  <li
                    key={g.id}
                    ref={(el) => {
                      steps.current[i] = el;
                    }}
                    className={`relative pb-16 pl-12 transition-opacity duration-500 last:pb-12 md:pl-14 xl:min-h-[50vh] ${
                      active < 0 || on ? "" : "xl:opacity-40"
                    }`}
                  >
                    <span
                      className="absolute top-0 left-0 grid size-[31px] place-items-center rounded-full border-2 text-[12.5px] font-extrabold transition-colors duration-500"
                      style={
                        reached
                          ? {
                              backgroundColor: dark ? "#fff" : deep,
                              borderColor: dark ? "#fff" : deep,
                              color: dark ? deep : "#fff",
                            }
                          : dark
                            ? { backgroundColor: "#0b1220", borderColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.7)" }
                            : { backgroundColor: "#fff", borderColor: "var(--color-line-strong)", color: "var(--color-muted)" }
                      }
                    >
                      {i + 1}
                    </span>

                    <h4 className="pt-0.5 text-[22px] leading-tight font-extrabold md:text-[26px]">
                      {g.label}
                    </h4>

                    {/* BELOW 1280px, THE GROUP'S OWN PART OF THE PRODUCT.
                        Beside its list from 768px; above it on a phone,
                        and there it takes the full width - the timeline's
                        48px indent left a 249px card on a 360px phone, and
                        the line simply runs behind it. */}
                    <div className="mt-5 md:mt-6 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-8 xl:block">
                      {Crop && (
                        <motion.div
                          {...enter(0, 0.25)}
                          aria-hidden
                          className="relative mb-6 -ml-12 flex justify-center md:mb-0 md:ml-0 xl:hidden"
                        >
                          <Crop />
                        </motion.div>
                      )}

                      <CapabilityItems
                        group={g}
                        tone={tone}
                        accent={accent}
                        deep={deep}
                        hot={hot}
                        onHot={setHot}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
          </SpotProvider>

          <GoodToKnow
            slug={slug}
            tone={tone}
            columns={2}
            className="md:ml-14 xl:[&_ul]:grid-cols-1"
          />
        </div>

        {/* ---------------- THE SCREEN ---------------- */}
        <div className="hidden xl:block">
          <div
            className="sticky"
            style={{ top: PIN_TOP }}
          >
            <SpotProvider mode="spot" focus={focus} hot={hot} accent={accent}>
              <motion.div {...enter(1, 0.15)} aria-hidden>
                <ScaledScreen
                  w={size.w}
                  h={size.h}
                  max={`min(${size.w}px, calc((100svh - ${FURNITURE}) * ${(size.w / size.h).toFixed(4)}))`}
                  className="mx-auto"
                >
                  <Screen />
                </ScaledScreen>
              </motion.div>
            </SpotProvider>

            {/* WHERE THE LIGHT IS, AND A WAY TO ANY GROUP. A number each,
                and the lit group's name beside its number. With all four
                names spelled out the row came to 700px against a 686px
                column on a 1366 laptop and broke onto two lines. */}
            <ol className="mt-5 flex items-center justify-center gap-1.5">
              {detail.groups.map((g, i) => {
                const on = focus === g.id;
                return (
                  <li key={g.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`${String(i + 1).padStart(2, "0")} ${g.label}`}
                      title={g.label}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12.5px] font-bold whitespace-nowrap transition-[background-color,border-color,color] duration-300 ${
                        dark
                          ? "border-white/15 text-white/70 hover:text-white"
                          : "border-line bg-surface text-ink/65 hover:text-ink"
                      }`}
                      style={
                        on
                          ? {
                              backgroundColor: dark ? "#fff" : deep,
                              borderColor: dark ? "#fff" : deep,
                              color: dark ? deep : "#fff",
                            }
                          : undefined
                      }
                    >
                      <span className={on ? "opacity-70" : ""}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {on && <span>{g.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}
