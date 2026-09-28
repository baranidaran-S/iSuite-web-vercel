"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { featureMarks } from "@/components/ui/featureIcons";
import { DownGlyph } from "@/components/features/kit/glyphs";
import { features } from "@/lib/content/features";
import { featureBar } from "@/lib/content/featuresPage";

/* ==========================================================================
   /features - THE FEATURE BAR
   --------------------------------------------------------------------------
   A second frosted bar under the header, there only while the chapters are
   on screen. It answers the two questions a page this long raises: where
   am I, and how do I get to the one I came for.

     left    the chapter's numeral and name, and the feature being read.
             It is also the button that opens the full list.
     right   thirteen ticks in four runs - one per feature, coloured by
             chapter. Behind you they are filled, the one you are in is
             long, and ahead of you they are grey. Each is a link, and
             says which feature it is when pointed at.

   ONE BAR, NOT A SIDEBAR. A column of thirteen links down the side takes
   a fifth of the width from every section for the whole page, and the
   feature sections are the widest things on it. A bar costs one line.

   ON A PHONE THE TICKS GO, and a hairline along the foot of the pill keeps
   the one thing they said that the label does not - how far down the
   thirteen you are. The whole pill is then the button.

   IT FOLLOWS THE READER, NOT THE MOUSE. The feature it names is the one
   whose section has crossed the upper part of the screen, measured on
   scroll - one pass over thirteen elements a frame, and only a change
   re-renders. In a chapter shown as one compact section (data-compact,
   Sales' showcase) it is the feature open there, which the section's
   tour can change with no scroll at all, so the section announces it
   with a "features:turn" event.

   It appears when the first chapter reaches the header and goes again
   once the last feature has scrolled away, so the hero and the closing
   ask are never under it.

   THE HEADER STAYS ON TOP. This sits at z-40 and the header at z-50, so
   the phone menu, which hangs off the header, opens over it.
   ========================================================================== */

type Group = (typeof features)["groups"][number];

const GROUPS = features.groups;
const FLAT = GROUPS.flatMap((g, gi) =>
  g.items.map((item) => ({ item, group: g, gi })),
);

type Where = { show: boolean; g: number; f: number | null };

/* `built` lists the features whose sections are on the page. Those still
   to come are shown - the thirteen are the thirteen - but not linked: a
   tick or a menu entry that scrolls nowhere reads as broken. Left out,
   every feature is linked. */
export function FeatureBar({ built }: { built?: readonly string[] }) {
  const ready = (slug: string) => !built || built.includes(slug);
  const [where, setWhere] = useState<Where>({ show: false, g: 0, f: null });
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  /* ---- where the reader is ---- */
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.42;
      const first = document.getElementById(GROUPS[0].slug);
      let g = 0;
      let f: number | null = null;
      let last = -Infinity;
      let started = false;

      GROUPS.forEach((group, gi) => {
        const opener = document.getElementById(group.slug);
        if (opener) {
          const r = opener.getBoundingClientRect();
          if (r.top <= line) {
            g = gi;
            f = null;
            started = true;
          }
          last = Math.max(last, r.bottom);
        }
        group.items.forEach((item, fi) => {
          const el = document.getElementById(item.slug);
          if (!el) return;
          /* A chapter shown in one compact section, one feature open at a
             time, counts as a single section: once it reaches the line,
             the feature named is the one open in it. By position alone the
             bar said "Contacts and Custom Fields" over an open
             Appointments, because Contacts' tab was highest. */
          const box = el.closest<HTMLElement>("[data-compact]");
          const r = (box ?? el).getBoundingClientRect();
          if (r.top <= line && (!box || el.hasAttribute("data-open"))) {
            g = gi;
            f = fi;
            started = true;
          }
          last = Math.max(last, r.bottom);
        });
      });

      const show =
        !!first &&
        started &&
        first.getBoundingClientRect().top < 140 &&
        last > line * 0.5;

      setWhere((w) =>
        w.show === show && w.g === g && w.f === f ? w : { show, g, f },
      );
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    /* A compact section's tour opens its features without a scroll, so it
       says when it does. */
    window.addEventListener("features:turn", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("features:turn", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  /* The list closes on Escape, on a click anywhere else, and when the bar
     itself goes away. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const shown = where.show;
  useEffect(() => {
    if (!shown) setOpen(false);
  }, [shown]);

  const group = GROUPS[where.g];
  const item = where.f === null ? null : group.items[where.f];
  const at = item ? FLAT.findIndex((x) => x.item.slug === item.slug) : -1;
  /* How far down the thirteen, for the phone's hairline. The chapter
     opener counts as the start of its chapter. */
  const progress =
    at >= 0
      ? (at + 1) / FLAT.length
      : FLAT.findIndex((x) => x.gi === where.g) / FLAT.length;

  return (
    /* NOT ON A SHORT SCREEN. On a phone turned on its side the header and
       this bar together covered about 40% of a 390px-tall screen; below
       500px the header is left to itself. */
    <div
      ref={barRef}
      inert={!shown}
      className={`fixed inset-x-0 top-[4.9rem] z-40 px-3 transition-[opacity,transform] duration-300 ease-out md:top-[6.1rem] md:px-5 [@media(max-height:499px)]:hidden ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0"
      }`}
    >
      <nav
        aria-label={featureBar.label}
        /* No overflow-hidden: each tick's name hangs below the bar when it
           is pointed at, and a clipped bar cut it off at the edge. */
        className="relative mx-auto flex max-w-[46rem] items-center gap-3 rounded-full border border-white/70 bg-white/80 p-1.5 shadow-[0_10px_30px_-12px_rgba(10,16,32,0.35)] backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="feature-menu"
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full py-0.5 pr-3 pl-0.5 text-left transition-colors hover:bg-ink/5 md:flex-none"
        >
          <span
            className="grid size-8 shrink-0 place-items-center rounded-full text-[12px] font-extrabold text-white transition-colors duration-300"
            style={{ backgroundColor: group.deep }}
          >
            {group.n}
          </span>
          <span className="relative flex min-w-0 flex-1 items-center overflow-hidden md:w-[17.5rem] md:flex-none">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`${where.g}-${where.f}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-w-0 items-center gap-1.5 truncate text-[14px] leading-tight"
              >
                <span
                  className={`shrink-0 font-bold ${item ? "hidden text-muted sm:inline" : "text-ink"}`}
                >
                  {group.name}
                </span>
                {item && (
                  <>
                    <span aria-hidden className="hidden text-line-strong sm:inline">
                      /
                    </span>
                    <span className="truncate font-extrabold">{item.name}</span>
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="sr-only">{featureBar.jump}</span>
          <DownGlyph
            className={`size-4 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* ---- THE THIRTEEN ---- */}
        <ol className="ml-auto hidden items-center gap-2.5 pr-3 md:flex">
          {GROUPS.map((g, gi) => (
            <li key={g.slug}>
              <ol className="flex items-center gap-[3px]">
                {g.items.map((it) => {
                  const k = FLAT.findIndex((x) => x.item.slug === it.slug);
                  const current = k === at;
                  const past = at >= 0 ? k < at : gi < where.g;
                  const linked = ready(it.slug);
                  const Tick = linked ? "a" : "span";
                  return (
                    <li key={it.slug}>
                      <Tick
                        {...(linked
                          ? {
                              href: `#${it.slug}`,
                              "aria-label": it.name,
                              "aria-current": current
                                ? ("location" as const)
                                : undefined,
                            }
                          : { "aria-hidden": true })}
                        className={`group/t relative block py-2.5 ${linked ? "" : "cursor-default opacity-60"}`}
                      >
                        <span
                          className="block h-[5px] rounded-full transition-all duration-300 group-hover/t:scale-y-150"
                          style={{
                            width: current ? 22 : 11,
                            backgroundColor: current
                              ? g.deep
                              : past
                                ? g.accent
                                : "#d5dbe7",
                          }}
                        />
                        <span className="pointer-events-none absolute top-full left-1/2 mt-1.5 -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-[11.5px] font-bold whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/t:opacity-100 group-focus-visible/t:opacity-100">
                          {it.name}
                          {!linked && (
                            <span className="ml-1.5 font-semibold text-white/60">
                              soon
                            </span>
                          )}
                        </span>
                      </Tick>
                    </li>
                  );
                })}
              </ol>
            </li>
          ))}
        </ol>

        {/* The phone's version of the ticks. */}
        <span
          aria-hidden
          className="absolute bottom-0 left-5 h-[2px] rounded-full transition-[width,background-color] duration-500 md:hidden"
          style={{
            width: `calc((100% - 2.5rem) * ${progress})`,
            backgroundColor: group.accent,
          }}
        />
      </nav>

      {/* ---- THE FULL LIST ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="feature-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-h-[calc(100svh-9rem)] max-w-[46rem] overflow-y-auto rounded-[1.6rem] border border-white/70 bg-white/92 p-2 shadow-[0_24px_60px_-24px_rgba(10,16,32,0.5)] backdrop-blur-xl"
          >
            <div className="grid gap-1 sm:grid-cols-2">
              {GROUPS.map((g) => (
                <MenuGroup
                  key={g.slug}
                  group={g}
                  current={item?.slug ?? null}
                  ready={ready}
                  onPick={() => setOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuGroup({
  group,
  current,
  ready,
  onPick,
}: {
  group: Group;
  current: string | null;
  ready: (slug: string) => boolean;
  onPick: () => void;
}) {
  const chapterReady = group.items.some((it) => ready(it.slug));
  const Head = chapterReady ? "a" : "span";
  return (
    <div className="rounded-2xl p-2">
      <Head
        {...(chapterReady ? { href: `#${group.slug}`, onClick: onPick } : {})}
        className={`flex items-center gap-2 rounded-xl px-2 py-1.5 text-[12.5px] font-extrabold tracking-[0.1em] uppercase transition-colors ${
          chapterReady ? "hover:bg-ink/5" : "opacity-55"
        }`}
        style={{ color: group.deep }}
      >
        <span
          className="grid size-6 place-items-center rounded-md text-[11px] tracking-normal text-white"
          style={{ backgroundColor: group.deep }}
        >
          {group.n}
        </span>
        {group.name}
      </Head>
      <ul className="mt-1">
        {group.items.map((it) => {
          const Mark = featureMarks[it.mark];
          const on = it.slug === current;
          if (!ready(it.slug)) {
            return (
              <li key={it.slug}>
                <span className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-[14.5px] font-bold text-ink/40">
                  <Mark
                    className="size-[18px] shrink-0 opacity-60"
                    style={{ color: group.deep }}
                  />
                  {it.name}
                  <span className="ml-auto rounded-full bg-ink/5 px-2 py-0.5 text-[10.5px] font-extrabold tracking-[0.08em] text-ink/45 uppercase">
                    Soon
                  </span>
                </span>
              </li>
            );
          }
          return (
            <li key={it.slug}>
              <a
                href={`#${it.slug}`}
                onClick={onPick}
                aria-current={on ? "location" : undefined}
                className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-[14.5px] font-bold text-ink transition-colors hover:bg-brand-tint aria-[current=location]:bg-brand-tint aria-[current=location]:text-brand"
              >
                <Mark className="size-[18px] shrink-0" style={{ color: group.deep }} />
                {it.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
