import Image from "next/image";
import Link from "next/link";
import logoLockup from "@/public/logo-lockup.png";
import { ArrowIcon } from "@/components/ui/icons";
import { ads } from "@/lib/content/ads";
import { footer } from "@/lib/content/footer";
import { hero } from "@/lib/content/home";
import { legal, nav, site } from "@/lib/site";

/* ==========================================================================
   FOOTER
   --------------------------------------------------------------------------
   A Server Component. Nothing in here reacts to anything, so none of it
   needs to reach the browser as JavaScript.

   IT IS LIGHT, AND THAT IS THE ASSET'S DECISION RATHER THAN A TASTE. A dark
   footer would close the page harder and cannot be built from what exists:
   the wordmark is deep navy on transparent and there is no knocked-out
   version of it. Inverting it with a CSS filter would destroy the gradient
   on the "AI", which is the one part of the mark that carries the brand's
   second colour.

   IT USES SECTION 4'S GROUND, not the page's grey. White with a brand wash
   falling from the top and the page grey rising at the foot - the same two
   layers the sales pipeline sits on. The grey version read as a slab
   dropped under the page; this reads as the page running out. It still
   takes a hairline at the top, because the final CTA is a full-bleed sky
   that resolves to white and white meeting white needs an edge.

   MARK ON THE LEFT, ROUTES ON THE RIGHT, CLOSER TOGETHER. The hole in the
   middle was never the arrangement, it was the width: a 1280px bar with the
   brand pinned left and the columns pinned right leaves about 600px of
   nothing between them. The bar is 896px now and the gap is about 180px,
   which reads as two groups rather than as two things that have drifted
   apart. Both stack and centre below 640px, where there is no room for two
   columns of anything.

   THE SMALL PRINT STAYS CENTRED under both of them. It belongs to the page
   rather than to either column.

   NO CONTACT BLOCK, AND THAT IS DELIBERATE RATHER THAN FORGOTTEN.
   Requirements section 32 asks for a company address, a contact email, a
   phone number and social links before launch, and none of them have been
   supplied. An invented address in a footer is worse than an absent one -
   it is the single most likely thing on a marketing site to be copied into
   a contract. The gap is recorded in PLACEHOLDERS; the block goes in when
   the details arrive.

   WHY THE LEGAL COLUMN LINKS TO TWO PAGES THAT 404. Section 31 requires a
   published Privacy Policy and published Terms before launch. Linking to
   them now means the routes are named, findable in the markup and in
   PLACEHOLDERS - whereas a footer with no legal column at all is a gap
   nobody trips over until a lawyer asks.
   ========================================================================== */

export function Footer() {
  /* Evaluated when the page is built, not when it is viewed. The page is
     statically prerendered, so this is the build year and it will go stale
     on 1 January unless the site is rebuilt - which is the normal trade for
     not shipping a client component to render four characters. */
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      {/* Section 4's two layers, in the same order. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-brand-tint to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent to-bg/70" />
      </div>

      {/* 58rem, arrived at by arithmetic rather than by eye: the bar is
          928px less 80px of padding, the mark's column is 384 and the two
          route columns with their gap are 355, which leaves 109px between
          the groups. 4xl gives 77 and reads cramped; 5xl gives 205 and the
          hole starts coming back. */}
      <div className="relative mx-auto max-w-[58rem] px-5 py-14 md:px-10 md:py-16">
        <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-12 sm:text-left">
          {/* ---- THE MARK ---- */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex">
              <Image
                src={logoLockup}
                alt={site.product}
                className="h-9 w-auto select-none md:h-10"
              />
            </Link>

            {/* The tagline the lockup artwork leaves out. See footer.ts for
                why it is text rather than the taller logo file. */}
            <p className="mt-3.5 text-[14px] font-bold tracking-[0.02em] text-muted">
              {footer.tagline}{" "}
              <span className="text-ink">{site.company}</span>
            </p>

            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              {footer.blurb}
            </p>

            {/* The same destination and the same words as the other three.
                §2 allows the page one primary call to action, so this reads
                its label from the hero rather than restating it. */}
            <Link
              href={site.bookingUrl}
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15.5px] font-bold text-white shadow-[0_12px_30px_-14px_rgba(4,28,61,0.7)] transition-all hover:-translate-y-0.5 hover:bg-ink/90"
            >
              {hero.primaryCta}
              <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* ---- THE ROUTES ---- */}
          <div className="flex shrink-0 gap-12 sm:gap-16 md:gap-20">
            <FooterNav label={footer.productLabel} items={nav} />
            <FooterNav label={footer.legalLabel} items={legal} />
          </div>
        </div>

        {/* ---- THE SMALL PRINT ---- */}
        <div className="mt-14 border-t border-line pt-8 text-center">
          <p className="mx-auto max-w-[68ch] text-[14px] leading-relaxed text-muted">
            {ads.disclaimer}
          </p>
          <p className="mt-4 text-[14px] font-semibold text-ink/70">
            &copy; {year} {site.company}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterNav({
  label,
  items,
}: {
  label: string;
  items: readonly { readonly label: string; readonly href: string }[];
}) {
  return (
    /* Two navs in one footer, each named, because "navigation" announced
       twice with no distinction is a landmark that helps nobody. */
    <nav aria-label={label}>
      {/* ink/65, and 55 was measured and rejected. The foot of the footer
          is white with the page grey washed over it at 70%, which lands on
          #F2F3F7 - and ink at 55% on that is 3.77:1, under the 4.5 a 12.5px
          label needs. 65% is 5.19:1. */}
      <p className="text-[13px] font-bold tracking-[0.08em] text-ink/65 uppercase">
        {label}
      </p>

      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[16.5px] font-bold text-ink transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
