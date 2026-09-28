"use client";

import { createContext, useContext } from "react";

/* ==========================================================================
   THE DRAWING KIT - ZONES AND CAPABILITIES
   --------------------------------------------------------------------------
   Every product drawing on /features is built out of two wrappers, and they
   are what let one drawing be read more than one way.

     Zone   one part of the screen - the channel rail, the conversation
            list, the thread, the side panel. A capability GROUP in
            featureDetails.ts names its zone by id.
     Cap    one element inside a zone - the unread chip, the voice note.
            A CAPABILITY names its element by id.

   What they do depends on the picture they are in, and the picture says
   so through the context below:

     plain  nothing. The drawing is just a drawing.
     spot   one zone is lit and the rest step back - a section that walks
            through the groups one at a time.

   In every mode a Cap that is `hot` - the capability a visitor is pointing
   at in the list beside the picture - gets a ring, so the words and the
   element they describe light up together.

   THE DRAWINGS ARE PICTURES. Whatever renders them marks them aria-hidden:
   every capability is real text beside the picture, which is where a
   screen reader reads it.
   ========================================================================== */

export type SpotMode = "plain" | "spot";

type Ctx = {
  mode: SpotMode;
  /* The zone that is lit. */
  focus: string | null;
  /* The capability being pointed at. */
  hot: string | null;
  /* The chapter's colour, for rings. */
  accent: string;
};

const SpotContext = createContext<Ctx>({
  mode: "plain",
  focus: null,
  hot: null,
  accent: "#1e5bff",
});

export function SpotProvider({
  children,
  ...value
}: Ctx & { children: React.ReactNode }) {
  return <SpotContext.Provider value={value}>{children}</SpotContext.Provider>;
}

export function useSpot() {
  return useContext(SpotContext);
}

/* ---- ZONE ------------------------------------------------------------------
   In "spot", a zone that is not lit fades back - opacity, never removal, so
   the picture keeps its shape and the lit part is seen in its place. */
export function Zone({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { mode, focus, accent } = useSpot();
  const lit = focus === id;
  const dim = mode === "spot" && focus !== null && !lit;

  return (
    <div
      data-zone={id}
      className={`relative transition-[opacity,filter] duration-500 ${
        dim ? "opacity-25 saturate-[0.35]" : ""
      } ${className}`}
    >
      {children}

      {mode === "spot" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1 z-10 rounded-xl transition-opacity duration-500"
          style={{
            opacity: lit ? 1 : 0,
            boxShadow: `0 0 0 2px ${accent}, 0 0 0 7px color-mix(in oklab, ${accent} 16%, transparent)`,
          }}
        />
      )}

    </div>
  );
}

/* ---- CAP -------------------------------------------------------------------
   The element itself, not a box around it - it takes the classes the
   element would have had, so wrapping a chip in a Cap changes nothing about
   how the chip is drawn until somebody points at it. */
export function Cap({
  id,
  as: Tag = "span",
  className = "",
  style,
  children,
}: {
  id: string;
  as?: "span" | "div" | "li";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const { hot, accent } = useSpot();
  const on = hot === id;
  return (
    <Tag
      data-cap={id}
      className={`transition-[box-shadow,transform] duration-300 ${className}`}
      style={{
        ...style,
        boxShadow: on
          ? `0 0 0 2px #fff, 0 0 0 4px ${accent}, 0 10px 24px -8px color-mix(in oklab, ${accent} 60%, transparent)`
          : style?.boxShadow,
        position: style?.position ?? "relative",
        zIndex: on ? 30 : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
