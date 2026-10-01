"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
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
import { ScreenMap, Scroller, ViewPicture, Where, least, most } from "@/components/features/closeup/View";
import { closeups, type Capture, type View } from "@/lib/content/closeups";
import { featureDetails, type FeatureSlug } from "@/lib/content/featureDetails";

/* ==========================================================================
   /features - THE FEATURE LAYOUT: THE STORY, UP CLOSE
   --------------------------------------------------------------------------
   Chapter 01's features are laid out by this. The groups scroll past on
   the left, and the picture pinned on the right is the part of the real
   app each group is about - at about its real size, with a numbered pin on
   each thing the group's list names; the list carries the same numbers.
   What it shows is lib/content/closeups.ts.

   CHOSEN TWICE. The story itself was chosen from three layouts with the
   first Chapter 01 (a board of tiles and an annotated screen were the
   others). Its picture was then the whole screen, lit where the group is,
   pinned beside the groups - and at 40% of the screen's size its type was
   5 or 6px. On 2026-09-30 Unified Inbox's picture was rebuilt three ways
   (its parts up close in the story, its parts all laid out at once, a tour
   zooming to each capability); the client chose this one, and the other
   two features followed.

   A GROUP CAN SHOW MORE THAN ONE PART OF THE APP, one above another, each
   saying where in the app it is: the widget's code is in Settings and its
   answers are on a website. The whole screen stays in view as a small map
   under the picture, with the part marked on it, wherever a part is from a
   screen that has one.

   POINTING AT A CAPABILITY rings the thing itself, and brings its group's
   picture in if a different one was showing.

   PINNED FROM 1280px ONLY. Below, the main screen is shown once, above the
   groups, and each group's parts above its list - as wide as the column,
   never smaller than their type stays readable at, and scrolled sideways
   on a phone too narrow for them.

   THE PINNED PICTURE FITS THE WINDOW'S HEIGHT. Its box is as tall as the
   window allows, within reason, and the parts in it share that height; the
   block sits under the bar on a short window and mid-height on a tall one.
   ========================================================================== */

const STAGE = "clamp(340px, calc(100svh - 18rem), 560px)";
const PIN_TOP = "max(10.5rem, calc(50svh - var(--stage) / 2 - 1rem))";

/* The height a "where" line takes with the space under it, and the gap
   between two views - what the pinned stage spends besides pictures. */
const LABEL = 24;
const GAP = 12;

/* The pinned column's widest, at the page's 84rem - the most a view in it
   is drawn at. */
const COLUMN = 760;

/* A view says where in the app it is, unless the one above it just did:
   two parts of the same page read as one, under one line. */
function labelled(views: readonly View[], captures: Readonly<Record<string, Capture>>) {
  return views.map((v, i) => i === 0 || captures[v.capture].where !== captures[views[i - 1].capture].where);
}

export function StoryFeature({ slug, tone }: { slug: FeatureSlug; tone: Tone }) {
  const { group, detail } = featureOf(slug);
  const shot = closeups[slug]!;
  const dark = tone === "dark";
  const enter = useEnter();
  const accent = group.accent;
  const deep = group.deep;

  /* A capability's number: its place in its group's list. */
  const numbers = Object.fromEntries(
    (featureDetails[slug]?.groups ?? []).flatMap((g) => g.items.map((c, i) => [c.id, i + 1] as const)),
  );

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
  const hotGroup = hot ? detail.groups.find((g) => g.items.some((c) => c.id === hot))?.id : undefined;
  const focus = hotGroup ?? (active >= 0 ? detail.groups[active].id : null);
  const fill = active < 0 ? 0 : (active + 0.5) / detail.groups.length;
  const goTo = (i: number) => steps.current[i]?.scrollIntoView({ block: "center" });

  const over = shot.captures[shot.overview.capture];

  /* The map under the picture: the first of the group's views from a
     screen that has one. */
  const mapped = (focus ? shot.groups[focus]?.views : undefined)?.find((v) => shot.captures[v.capture].map);
  const mapCapture = mapped ? shot.captures[mapped.capture] : focus ? null : over;

  return (
    <FeatureShell slug={slug} tone={tone}>
      <div className="xl:grid xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] xl:gap-16">
        {/* ---------------- THE WORDS ---------------- */}
        <div>
          <FeaturePill slug={slug} tone={tone} />
          <FeatureTitle slug={slug} tone={tone} size="3.7em" className="mt-6 max-w-[15ch] md:max-w-[18ch] xl:max-w-[15ch]" />
          <FeatureLead slug={slug} tone={tone} className="mt-6 max-w-[54ch]" />

          {/* Below 1280px: the main screen once, where the parts sit. */}
          <motion.div {...enter(0, 0.2)} aria-hidden className="mt-10 xl:hidden">
            <ScreenMap
              capture={over}
              file={shot.overview.file}
              accent={accent}
              sizes="(min-width: 768px) 720px, 100vw"
              className="mx-auto max-w-[45rem] rounded-2xl shadow-[0_30px_70px_-36px_rgba(10,16,32,0.5)] ring-1 ring-black/10"
            />
          </motion.div>

          <ol className="relative mt-14 md:mt-16">
            <span
              aria-hidden
              className={`absolute top-4 bottom-10 left-[15px] w-px ${dark ? "bg-white/12" : "bg-line"}`}
            />
            <span
              aria-hidden
              className="absolute top-4 bottom-10 left-[15px] hidden w-px origin-top transition-transform duration-700 ease-out xl:block"
              style={{ transform: `scaleY(${fill})`, backgroundColor: dark ? "#ffffff" : deep }}
            />

            {detail.groups.map((g, i) => {
              const on = active === i;
              const reached = active >= i;
              const views = shot.groups[g.id]?.views ?? [];
              const says = labelled(views, shot.captures);
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
                        ? { backgroundColor: dark ? "#fff" : deep, borderColor: dark ? "#fff" : deep, color: dark ? deep : "#fff" }
                        : dark
                          ? { backgroundColor: "#0b1220", borderColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.7)" }
                          : { backgroundColor: "#fff", borderColor: "var(--color-line-strong)", color: "var(--color-muted)" }
                    }
                  >
                    {i + 1}
                  </span>

                  <h4 className="pt-0.5 text-[22px] leading-tight font-extrabold md:text-[26px]">{g.label}</h4>

                  <div className="mt-5 md:mt-6">
                    {/* Below 1280px: the group's parts, above its list and
                        across the full width - the timeline's indent would
                        cost a picture 48 to 56px it needs. The pictures
                        cover the timeline's line; the words over them do
                        not, so those keep the indent - the line ran
                        through them ("SE|TTINGS"). */}
                    {views.length > 0 && (
                      <motion.div {...enter(0, 0.25)} className="relative mb-7 -ml-12 md:-ml-14 xl:hidden">
                        <Scroller
                          lo={Math.max(...views.map((v) => Math.round(v.rect.w * least(shot.captures[v.capture]))))}
                          hi={Math.max(...views.map((v) => Math.round(v.rect.w * most(shot.captures[v.capture]))))}
                          label={`${g.label}, up close`}
                        >
                          <div className="flex flex-col gap-3 pb-1">
                            {views.map((v, vi) => {
                              const cap = shot.captures[v.capture];
                              const hi = Math.round(v.rect.w * most(cap));
                              return (
                                <div key={vi} className={says[vi] && vi > 0 ? "mt-2" : ""} style={{ maxWidth: hi }}>
                                  {says[vi] && (
                                    <Where dark={dark} className="pl-12 md:pl-14">
                                      {cap.where}
                                    </Where>
                                  )}
                                  <ViewPicture
                                    closeup={shot}
                                    group={g.id}
                                    index={vi}
                                    numbers={numbers}
                                    hot={hot}
                                    accent={accent}
                                    deep={deep}
                                    drawn={hi}
                                    className="rounded-xl"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </Scroller>
                      </motion.div>
                    )}
                    <CapabilityItems group={g} tone={tone} accent={accent} deep={deep} hot={hot} onHot={setHot} numbered />
                  </div>
                </li>
              );
            })}
          </ol>

          <GoodToKnow slug={slug} tone={tone} columns={2} className="md:ml-14 xl:[&_ul]:grid-cols-1" />
        </div>

        {/* ---------------- THE PICTURE ---------------- */}
        <div className="hidden xl:block">
          <div className="sticky" style={{ "--stage": STAGE, top: PIN_TOP } as React.CSSProperties}>
            <motion.div {...enter(1, 0.15)} aria-hidden className="relative" style={{ height: "var(--stage)" }}>
              {/* The main screen, until a group is reached. One picture
                  leaves quickly and the next arrives after it: crossed at
                  the same speed, two showed through each other. */}
              <div
                className={`absolute inset-0 grid place-items-center transition-[opacity,translate] ease-out ${
                  focus ? "pointer-events-none translate-y-3 opacity-0 duration-200" : "opacity-100 delay-150 duration-500"
                }`}
              >
                <div style={{ width: `min(100%, calc(var(--stage) * ${(over.w / over.h).toFixed(4)}))` }}>
                  <ScreenMap
                    capture={over}
                    file={shot.overview.file}
                    accent={accent}
                    sizes="(min-width: 1280px) 50vw, 100vw"
                    className="rounded-[18px] shadow-[0_50px_100px_-50px_rgba(10,16,32,0.6)] ring-1 ring-black/10"
                  />
                </div>
              </div>

              {/* Each group's parts, one group at a time, sharing the
                  height: the column is as wide as all of them together
                  allow, and each is no wider than it stays sharp at. */}
              {detail.groups.map((g) => {
                const views = shot.groups[g.id]?.views ?? [];
                if (views.length === 0) return null;
                const shown = focus === g.id;
                const says = labelled(views, shot.captures);
                const tall = views.reduce((s, v) => s + v.rect.h / v.rect.w, 0);
                const spent = says.filter(Boolean).length * LABEL + (views.length - 1) * GAP;
                return (
                  <div
                    key={g.id}
                    className={`absolute inset-0 grid place-items-center transition-[opacity,translate] ease-out ${
                      shown ? "opacity-100 delay-150 duration-500" : "pointer-events-none translate-y-3 opacity-0 duration-200"
                    }`}
                  >
                    <div
                      className="flex flex-col items-center gap-3"
                      style={{
                        width: `min(100%, calc((var(--stage) - ${spent}px) / ${tall.toFixed(4)}))`,
                      }}
                    >
                      {views.map((v, vi) => {
                        const cap = shot.captures[v.capture];
                        return (
                          <div key={vi} className="w-full" style={{ maxWidth: Math.round(v.rect.w * most(cap)) }}>
                            {says[vi] && <Where dark={dark}>{cap.where}</Where>}
                            <ViewPicture
                              closeup={shot}
                              group={g.id}
                              index={vi}
                              numbers={numbers}
                              hot={hot}
                              accent={accent}
                              deep={deep}
                              drawn={Math.min(COLUMN, Math.round(v.rect.w * most(cap)))}
                              pinDelay={0.2}
                              className="rounded-[16px] shadow-[0_40px_90px_-45px_rgba(10,16,32,0.6)]"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* WHERE THE PART IS, AND A WAY TO ANY GROUP. The whole screen,
                small, with the part marked - then a number per group, the
                one shown with its name. */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {/* The map's place is kept when a group has no screen to map
                  - settings cards - and is the same size for every screen:
                  coming and going, or changing height, it moved the row. */}
              <div className="grid h-[4.75rem] w-[8.5rem] shrink-0 place-items-center">
                {mapCapture?.map && (
                  <div style={{ width: Math.min(136, Math.round((76 * mapCapture.w) / mapCapture.h)) }}>
                    <ScreenMap
                      capture={mapCapture}
                      file={mapCapture.map}
                      mark={mapped?.rect ?? null}
                      accent={accent}
                      sizes="140px"
                      className="rounded-md shadow-[0_8px_20px_-10px_rgba(10,16,32,0.5)] ring-1 ring-black/10"
                    />
                  </div>
                )}
              </div>
              <ol className="flex items-center gap-1.5">
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
                          dark ? "border-white/15 text-white/70 hover:text-white" : "border-line bg-surface text-ink/65 hover:text-ink"
                        }`}
                        style={
                          on
                            ? { backgroundColor: dark ? "#fff" : deep, borderColor: dark ? "#fff" : deep, color: dark ? deep : "#fff" }
                            : undefined
                        }
                      >
                        <span className={on ? "opacity-70" : ""}>{String(i + 1).padStart(2, "0")}</span>
                        {on && <span>{g.label}</span>}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}
