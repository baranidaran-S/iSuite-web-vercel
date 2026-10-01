import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "@/lib/content/home";

/* ==========================================================================
   THE SHARE CARD
   --------------------------------------------------------------------------
   The layout asks for a large card (twitter: summary_large_image) and there
   was no image for it, so a link to the site shared as a bare title. This
   draws one at build time for every page: the hero's sky, the header's
   lockup, and the hero's own headline - imported, so the two cannot drift
   apart - with its accent word in the brand blue, as the serif is only on
   the page.

   MANROPE, THE SITE'S FACE, AS TRUETYPE. next/og cannot read the woff2
   next/font serves, so the two weights are fetched from Google Fonts for
   only the letters drawn. The build already needs Google Fonts; if the
   fetch fails anyway, the card is still drawn, in next/og's own face.
   ========================================================================== */

export const alt = "iSuite AI - Turn every enquiry into a clear sales journey.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SUB = "WhatsApp, Instagram, Facebook and website enquiries in one inbox.";

async function manrope(weight: 600 | 800, text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    const font = url ? await fetch(url) : null;
    if (font?.ok) return { name: "Manrope", data: await font.arrayBuffer(), weight, style: "normal" as const };
  } catch {}
  console.warn(`opengraph-image: Manrope ${weight} could not be fetched; drawn in next/og's own face.`);
  return null;
}

export default async function Image() {
  const lines = hero.headline.map((p) => p.text + ("accent" in p ? p.accent : ""));
  const [lockup, bold, semi] = await Promise.all([
    readFile(join(process.cwd(), "public", "logo-lockup.png")),
    manrope(800, lines.join("")),
    manrope(600, SUB),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          fontFamily: "Manrope",
          color: "#041c3d",
          backgroundImage: "linear-gradient(180deg, #7fb6e8 0%, #b9daf4 36%, #e4f0fb 68%, #ffffff 100%)",
        }}
      >
        {/* 806 x 255, drawn 70px tall. */}
        <img src={`data:image/png;base64,${lockup.toString("base64")}`} width={221} height={70} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {hero.headline.map((p) => (
            <div key={p.text} style={{ display: "flex", fontSize: 78, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em" }}>
              <span style={{ whiteSpace: "pre" }}>{p.text}</span>
              {"accent" in p && <span style={{ color: "#0a5bf5" }}>{p.accent}</span>}
            </div>
          ))}
          <div style={{ marginTop: 30, fontSize: 30, fontWeight: 600, color: "#3d4a63" }}>{SUB}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [bold, semi].filter((f) => f !== null) },
  );
}
