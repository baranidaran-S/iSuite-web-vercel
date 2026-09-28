import { Fragment } from "react";
import { ChapterOpener } from "@/components/features/ChapterOpener";
import { FeatureBar } from "@/components/features/FeatureBar";
import { FeaturesHero } from "@/components/features/FeaturesHero";
import { featureScreens } from "@/components/features/screens";
import { StoryFeature } from "@/components/features/StoryFeature";
import { FinalCta } from "@/components/home/FinalCta";
import { features } from "@/lib/content/features";
import { featureDetails } from "@/lib/content/featureDetails";

/* ==========================================================================
   /features - THE PAGE ITSELF
   --------------------------------------------------------------------------
   Everything app/features/page.tsx draws, given which chapters are laid
   out as one compact section each - see that file for what the page is
   and why. Its own component so that a chapter can be seen in more than
   one layout before one is chosen: a preview page passes its own
   `compact` (Chapters 03 and 04 were each chosen from three at
   /features/v1 to v3), and the page passes the chosen ones.
   ========================================================================== */

export type Compact = Partial<Record<string, () => React.JSX.Element>>;

export function FeaturesBody({ compact }: { compact: Compact }) {
  /* A chapter is ready when all of its features are: their words, and
     their screens where the chapter is told feature by feature. */
  const chapters = features.groups.filter((group) =>
    group.items.every(
      (item) =>
        featureDetails[item.slug] &&
        (compact[group.slug] || featureScreens[item.slug]),
    ),
  );

  /* The features whose sections are on the page. The hero's callouts and
     the feature bar link only these, and show the rest as still to come. */
  const built = chapters.flatMap((group) => group.items.map((item) => item.slug));

  return (
    <>
      <FeaturesHero built={built} />
      <FeatureBar built={built} />

      {chapters.map((group) => {
        const Compact = compact[group.slug];
        return (
          <Fragment key={group.slug}>
            <ChapterOpener group={group} />
            {/* WHITE, THEN NIGHT, IN TURN. The home page's two grounds, so
                a chapter reads as a run of separate sections rather than
                one long white one - and each chapter opens on white,
                straight after its heading on the page ground. */}
            {Compact ? (
              <Compact />
            ) : (
              group.items.map((item, i) => (
                <StoryFeature
                  key={item.slug}
                  slug={item.slug}
                  tone={i % 2 === 0 ? "light" : "dark"}
                />
              ))
            )}
          </Fragment>
        );
      })}

      <FinalCta />
    </>
  );
}
