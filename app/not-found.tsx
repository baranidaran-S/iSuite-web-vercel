import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";
import { nav } from "@/lib/site";

/* ==========================================================================
   A PAGE THAT IS NOT THERE
   --------------------------------------------------------------------------
   It was Next's own: "404 | This page could not be found." in the system
   face between the site's header and footer - and the footer's Privacy
   Policy and Terms links land here until those pages are written (see
   PLACEHOLDERS in lib/site.ts). Now it says so in the site's own voice
   and offers the way back: home, and the pages there are. Next marks it
   noindex itself.
   ========================================================================== */

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="px-5 pt-40 pb-28 md:pt-48 md:pb-36 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-[13px] font-bold text-ink/70">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          404
        </p>
        <h1 className="mt-6 text-[34px] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink md:text-[48px]">
          This page isn&apos;t here.
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink/65">
          It may have moved, or it is still being written. Everything else is a step away.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-ink/90"
          >
            Back to the home page
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-full border border-line bg-white px-6 py-3.5 text-[16px] font-bold text-ink transition-colors hover:border-line-strong"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
