"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logoLockup from "@/public/logo-lockup.png";
import { ArrowIcon } from "@/components/ui/icons";
import { nav, site } from "@/lib/site";

/* ==========================================================================
   HEADER
   --------------------------------------------------------------------------
   ONE FROSTED BAR, AND THAT IS A BUG FIX, NOT A RESTYLE. The first version
   floated three separate elements over a transparent background: a dark
   wordmark, a glass nav pill, and an ink button. Over the sky that reads
   perfectly. Over the night section beneath it, the wordmark and the button
   were dark-on-dark and effectively vanished - on a fixed header, over a
   page that deliberately alternates light and dark sections.

   Anything transparent and fixed has to survive EVERY background it will
   ever cross, and this page has three dark ones. A single translucent bar
   carries its own ground, so the contents are measured against the bar and
   never against whatever is passing underneath.

   It stays fixed rather than scrolling away: this site has one job, and the
   button that does it may never leave the screen.

   THE NAV EXISTED ONLY ON DESKTOP UNTIL NOW, which meant a phone got a
   logo and a button and no way to reach Features, How It Works or the FAQ
   at all - on a site of four pages, three of them unreachable. The menu
   below is the fix.

   IT IS A PANEL, NOT A FULL-SCREEN OVERLAY. Three links do not justify
   taking over the viewport, and a sheet that covers the page has to solve
   scroll locking, focus trapping and a close affordance that a small panel
   hanging off the bar does not. Escape closes it, tapping a link closes it,
   and the button reports its own state.

   Four items, per requirements section 5 - "keep the header clean". At five
   pages there is nothing to group, so no dropdown and no mega-menu.
   ========================================================================== */

export function Header() {
  const [open, setOpen] = useState(false);

  /* A menu that cannot be dismissed from the keyboard is a trap for anyone
     not using a pointer. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/70 bg-white/75 py-2.5 pr-2.5 pl-4 shadow-[0_6px_28px_-10px_rgba(10,16,32,0.3)] backdrop-blur-xl md:gap-4 md:py-3 md:pr-3 md:pl-6">
        {/* THE REAL LOCKUP, MARK AND WORDMARK TOGETHER.

            This was briefly the mark as an image beside the wordmark set in
            Manrope, and it did not hold up. Two faults: the mark alone is a
            tall narrow shape, so at 36px it renders about 20px wide and reads
            as a sliver rather than a logo; and the logo's own wordmark is a
            rounded geometric face that Manrope ExtraBold does not resemble,
            which is obvious the moment the two sit side by side.

            So the wordmark is the real one. The tagline is still absent, but
            it is ERASED from the artwork rather than cropped off - cropping
            above it would have taken 16px off the bottom of the mark's stem
            and flattened its rounded end. See the note where the asset is
            cut. The tagline belongs in the footer, at a size where "Product
            of MnT Future" can actually be read. */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={logoLockup}
            alt="iSuite AI"
            priority
            className="h-8 w-auto select-none md:h-10"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              /* THE SAME WEIGHT, SIZE AND COLOUR AS THE PHONE MENU.
                 They had drifted: the panel set its links at 16.5px bold in
                 full ink and the bar set the same three at 15px semibold at
                 70% ink, which on a frosted white bar reads as disabled
                 rather than as quiet. One nav, one treatment. */
              className="rounded-full px-4 py-2 text-[16.5px] font-bold text-ink transition-colors hover:bg-ink/6 hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href={site.bookingUrl}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[14px] font-bold text-white transition-all hover:bg-ink/90 md:px-6 md:py-3 md:text-[15px]"
          >
            Book a Demo
            <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-ink/6 md:hidden"
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </div>

      {/* ---- THE PHONE MENU ---- */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-2 shadow-[0_18px_44px_-18px_rgba(10,16,32,0.45)] backdrop-blur-xl md:hidden"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16.5px] font-bold text-ink transition-colors hover:bg-brand-tint"
              >
                {item.label}
                <ArrowIcon className="size-4 text-brand" />
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* Two bars into a cross. Animating the same two elements rather than
   swapping one glyph for another means the button never jumps by a pixel
   between states. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-4 w-5">
      <span
        className={`absolute left-0 h-[2.5px] w-full rounded-full bg-current transition-all duration-300 ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[3px]"
        }`}
      />
      <span
        className={`absolute left-0 h-[2.5px] w-full rounded-full bg-current transition-all duration-300 ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[11px]"
        }`}
      />
    </span>
  );
}
