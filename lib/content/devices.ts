/* ==========================================================================
   HERO IMAGERY
   --------------------------------------------------------------------------
   The hero shows the product screenshot on its own now. The laptop and phone
   frames it used to sit inside are parked in public/devices/unused/ rather
   than deleted, along with their measurements below, because the work that
   is expensive to redo is not the files - it is knowing exactly where each
   blank screen sits inside its own PNG.

   Those numbers were MEASURED, not estimated: each file was scanned for the
   longest run of opaque near-white pixels across its middle row and column,
   which is exactly the blank screen area. If either frame is ever brought
   back, they are correct as written. If the FILES are ever replaced, they
   are not - re-measure, because eyeballing it puts the overlay a few pixels
   off the bezel, which reads as a rendering bug rather than a design choice.

       laptop.png   1536 x 1024   screen at 14.91% / 13.87%, 70.05 x 63.77
       phone.png    1024 x 1536   screen at 20.02% /  6.25%, 59.96 x 86.65

   Screen centres, for anything that has to scale from them:
       laptop  49.94% / 45.76%      phone  50.00% / 49.58%
   ========================================================================== */

/* THE DASHBOARD - a real iSuite AI screenshot, not a mock.

   IMPORTED, NOT REFERENCED BY PATH, and that is not a style preference. A
   string path like "/devices/dashboard.png" is a fixed URL, so replacing the
   file with a new screenshot of the same name changes nothing anyone can
   see: the browser has the old bytes cached against that URL, and so does
   Next's image optimiser, which keys its cache on the URL too. The old
   picture keeps being served until both caches are cleared by hand.

   A static import is read at build time and emitted under a CONTENT-HASHED
   url. Different file, different hash, different url - so a replacement can
   never be served stale, by anything. It also carries its own width and
   height, which is what lets next/image reserve the right box and keeps the
   page from shifting as it loads.

   1626 x 967, so roughly 5:3 and wider than the previous capture. Displayed
   at about 1100px, so it is never upscaled on a standard display and only
   mildly so at 2x.

   ITS FIGURES ARE LEGIBLE AT FULL SIZE - open deals, pipeline value, average
   first response, and the percentage deltas beside each one. See PLACEHOLDERS
   in lib/site.ts: they have to be real and approved, because they are the
   most prominent claim on the page. */
export { default as dashboardImage } from "@/public/devices/dashboard-2.png";
