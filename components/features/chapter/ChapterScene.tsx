import { channelIcons } from "@/components/ui/icons";
import { SparkGlyph } from "@/components/features/kit/glyphs";
import type {
  ChapterSceneDef,
  Mark,
} from "@/components/features/chapter/scenes";
import { features } from "@/lib/content/features";

/* ==========================================================================
   A CHAPTER'S LAYER, LIT - KEPT, NOT RENDERED
   --------------------------------------------------------------------------
   The chapter openings use FlowScene.tsx. This was their first picture,
   liked but set aside because it drew the hero's stack a second time,
   directly under the hero. It is complete and type-checked, with its
   layer drawings in scenes.tsx, and ChapterBody.tsx says how to switch
   back to it.

   The hero's stack again, from further round: four layers leaning back,
   turned a little towards the reader, with this chapter's layer lit - its
   interface drawn on it - and the other three as faint outlines in their
   own colours, above or below it where the hero puts them. The page
   opened on the product taken apart; each chapter opens on the part of it
   the chapter is about.

   THE MARKS STAND ON THE LAYER. Each is raised on a thin beam over the
   thing it belongs to - a channel over the conversation it brought in,
   the assistant over its reply - and turned to face the reader whatever
   the layer's angle, which is what makes them read as floating over the
   picture rather than printed on it. Down each channel's beam a message
   drops into the inbox; up the assistant's, its reply leaves. That is the
   chapter in two movements, and it loops.

   POINTING AT A FEATURE LIFTS ITS PART. The chapter heading's feature
   cards say which feature is being pointed at, and that part rises off
   the layer with the chapter's colour round it while the rest dims - the
   same gesture as the hero's callouts turning a sheet up.

   THE GEOMETRY IS THE HERO'S KIND: a fixed-size scene, scaled whole to
   its column with the same CSS as the feature screens (see ScaledScreen),
   so it is right in the first HTML and nothing moves at hydration. The
   box was sized by projecting the scene the way the browser does - the
   lit layer, the outlines below it and the marks above it together come
   to 900 by 645 at these angles, and the box leaves about 25px round that.

   ALL OF IT IS A PICTURE and whatever renders it marks it aria-hidden -
   the chapter's name, sentence and feature links are real text beside it.
   ========================================================================== */

const LAYER = { w: 780, h: 450 };
const TILT = 56; // the lean back, degrees
const TURN = -30; // the turn towards the reader, degrees
const DEPTH = 2200; // perspective
const GAP = 56; // between layers
const LIFT = 28; // how far a pointed-at part rises
const BOX = { w: 940, h: 695 };
const CENTRE = { x: 470, y: 271 };

/* The stage's own turn, undone - so a mark, however the layer lies,
   faces the reader. */
const FACE = `rotateZ(${-TURN}deg) rotateX(${-TILT}deg)`;

export function ChapterScene({
  index,
  def,
  lit,
}: {
  index: number;
  def: ChapterSceneDef;
  lit: string | null;
}) {
  const group = features.groups[index];
  let pin = 0;

  return (
    <div
      className="@container relative mx-auto w-full"
      style={{ aspectRatio: `${BOX.w} / ${BOX.h}`, maxWidth: BOX.w }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: BOX.w,
          height: BOX.h,
          transform: `scale(tan(atan2(100cqw, ${BOX.w}px)))`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            perspective: DEPTH,
            perspectiveOrigin: `${CENTRE.x}px ${CENTRE.y}px`,
          }}
        >
          <div
            className="absolute [transform-style:preserve-3d]"
            style={{
              left: CENTRE.x - LAYER.w / 2,
              top: CENTRE.y - LAYER.h / 2,
              width: LAYER.w,
              height: LAYER.h,
              transform: `rotateX(${TILT}deg) rotateZ(${TURN}deg)`,
            }}
          >
            {/* The shadow the whole stack throws, under the lowest layer. */}
            <div
              className="absolute inset-[8%] rounded-[48px] bg-[#020818]/55 blur-2xl"
              style={{
                transform: `translateZ(${-(features.groups.length - index) * GAP - 30}px)`,
              }}
            />

            {/* ---- THE OTHER LAYERS ---- */}
            {features.groups.map((g, j) =>
              j === index ? null : (
                <div
                  key={g.slug}
                  className="absolute inset-0 rounded-[30px] border-2"
                  style={{
                    transform: `translateZ(${(index - j) * GAP}px)`,
                    borderColor: `color-mix(in oklab, ${g.accent} 50%, white)`,
                    backgroundColor: `color-mix(in oklab, ${g.accent} 16%, transparent)`,
                    opacity: 1 - (Math.abs(index - j) - 1) * 0.25,
                  }}
                />
              ),
            )}

            {/* ---- THIS CHAPTER'S LAYER ---- */}
            <div
              className="absolute inset-0 rounded-[30px] [transform-style:preserve-3d]"
              style={{
                background: "linear-gradient(160deg, #ffffff 0%, #f3f6fd 100%)",
                boxShadow: `0 0 0 2px rgba(255,255,255,0.95), 0 0 70px -6px color-mix(in oklab, ${group.accent} 80%, transparent)`,
              }}
            >
              {def.parts.map((part) => {
                const up = lit === part.feature;
                const quiet = lit !== null && !up;
                return (
                  <div
                    key={part.feature}
                    className="absolute transition-transform duration-500 ease-out [transform-style:preserve-3d]"
                    style={{
                      left: part.x,
                      top: part.y,
                      width: part.w,
                      height: part.h,
                      transform: `translateZ(${up ? LIFT : 0}px)`,
                    }}
                  >
                    <div
                      className="h-full rounded-[22px] transition-[opacity,box-shadow] duration-500"
                      style={{
                        opacity: quiet ? 0.5 : 1,
                        boxShadow: up
                          ? `0 0 0 3px ${group.accent}, 0 34px 50px -22px rgba(2,8,24,0.65)`
                          : "0 0 0 0 transparent",
                      }}
                    >
                      <part.Content />
                    </div>

                    {part.pins.map((p) => (
                      <Pin
                        key={`${p.x}-${p.y}`}
                        x={p.x}
                        y={p.y}
                        rise={p.rise}
                        mark={p.mark}
                        flow={p.flow}
                        order={pin++}
                        quiet={quiet}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- A MARK ON ITS BEAM ------------------------------------------------------
   Four pieces at one point on the layer: a ring pulsing where the beam
   meets it, the beam standing up out of it, a dot travelling the beam, and
   the mark itself at the top. `order` staggers them, so the channels take
   turns rather than pulsing as one. */
function Pin({
  x,
  y,
  rise,
  mark,
  flow,
  order,
  quiet,
}: {
  x: number;
  y: number;
  rise: number;
  mark: Mark;
  flow: "down" | "up";
  order: number;
  quiet: boolean;
}) {
  const ai = mark === "ai";
  const Icon = ai ? null : channelIcons[mark];
  const colour = ai ? "#0a5bf5" : `var(--color-${mark})`;
  const d = order * 0.7;
  /* Dimmed piece by piece, never as a group: opacity below 1 on a box
     that holds 3D children flattens them into it, and the beam and the
     mark would drop flat onto the layer the moment a card was pointed at. */
  const fade = {
    opacity: quiet ? 0.3 : 1,
    transition: "opacity 0.5s",
  };

  return (
    <div
      className="absolute [transform-style:preserve-3d]"
      style={{ left: x, top: y }}
    >
      <span
        className="anim-pin-ping absolute -top-8 -left-8 size-16 rounded-full border-[3px] opacity-0"
        style={
          { borderColor: colour, "--d": `${d}s` } as React.CSSProperties
        }
      />

      <span
        className="absolute left-[-2px] w-1 origin-bottom rounded-full"
        style={{
          ...fade,
          top: -rise,
          height: rise,
          transform: "rotateX(-90deg)",
          background:
            "linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.12))",
        }}
      />

      <span
        className="anim-pin-travel absolute [transform-style:preserve-3d]"
        style={
          {
            "--from": flow === "down" ? `${rise}px` : "0px",
            "--to": flow === "down" ? "0px" : `${rise}px`,
            "--d": `${d + 0.5}s`,
          } as React.CSSProperties
        }
      >
        <span
          className="anim-pin-fade absolute -top-2 -left-2 block size-4 rounded-full bg-white opacity-0 shadow-[0_0_16px_5px_rgba(255,255,255,0.9)]"
          style={
            { transform: FACE, "--d": `${d + 0.5}s` } as React.CSSProperties
          }
        />
      </span>

      <span
        className="anim-pin-bob absolute [transform-style:preserve-3d]"
        style={
          {
            "--z0": `${rise}px`,
            "--z1": `${rise + 14}px`,
            "--d": `${d}s`,
            transform: `translateZ(${rise}px)`,
          } as React.CSSProperties
        }
      >
        <span
          className={`absolute -top-[30px] -left-[30px] grid size-[60px] place-items-center rounded-full shadow-[0_18px_30px_-12px_rgba(2,8,24,0.7)] ring-[5px] ring-white/35 ${
            ai
              ? "bg-[linear-gradient(135deg,#0a5bf5,#00c8f8)] text-white"
              : "bg-white"
          }`}
          style={{ ...fade, transform: FACE }}
        >
          {Icon ? (
            <Icon className="size-8" style={{ color: colour }} />
          ) : (
            <SparkGlyph className="size-8" />
          )}
        </span>
      </span>
    </div>
  );
}
