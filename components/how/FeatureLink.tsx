import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";
import { featureMarks } from "@/components/ui/featureIcons";
import { features } from "@/lib/content/features";
import type { FeatureSlug } from "@/lib/content/featureDetails";

/* ==========================================================================
   /how-it-works - SEE THE FEATURE
   --------------------------------------------------------------------------
   The way from a step of the journey, or a rule in Good to know, to the
   /features section that explains it: /features#slug, the same address
   the home page's feature rows use, so the Sales chapter opens the right
   tab on arrival. Which feature is `feature` in lib/content/howItWorks.ts.

   THE FEATURE WEARS ITS OWN MARK, in its chapter's colours - the pair it
   has on the home page and on /features - so it is recognised before it
   is read.

   "SEE THE FEATURE" IS PART OF THE LINK'S NAME, not a word beside it, and
   the feature's name follows it: a screen reader's list of links says
   where each one goes, rather than the same three words nineteen times.
   ========================================================================== */

function find(slug: FeatureSlug) {
  for (const group of features.groups) {
    for (const item of group.items) {
      if (item.slug === slug) return { group, item };
    }
  }
  return null;
}

export function FeatureLink({ slug, className = "" }: { slug: FeatureSlug; className?: string }) {
  const found = find(slug);
  if (!found) return null;
  const { group, item } = found;
  const Mark = featureMarks[item.mark];
  return (
    <Link
      href={`/features#${slug}`}
      style={{ "--acc": group.deep } as React.CSSProperties}
      className={`group/fl inline-flex max-w-full items-center gap-2.5 rounded-xl border border-line bg-white py-1.5 pr-3 pl-1.5 text-left text-ink transition-[border-color,box-shadow] duration-300 hover:border-[var(--acc)] hover:shadow-[0_10px_22px_-16px_var(--acc)] ${className}`}
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: `${group.accent}1f`, color: group.deep }}
      >
        <Mark className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] leading-tight font-extrabold tracking-[0.12em] text-ink/65 uppercase">
          See the feature
        </span>
        <span className="block text-[13px] leading-snug font-extrabold">{item.name}</span>
      </span>
      <ArrowIcon className="size-3.5 shrink-0 text-[var(--acc)] transition-transform duration-300 group-hover/fl:translate-x-0.5" />
    </Link>
  );
}
