import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/* ==========================================================================
   /sitemap.xml - requirements §27
   --------------------------------------------------------------------------
   The pages that are built, and only those: /faq, /privacy and /terms join
   when they exist, the same day their links are uncommented (see
   PLACEHOLDERS in lib/site.ts).

   Every address resolves against site.siteUrl, which is still example.com.
   Set the real domain there and this, robots.txt and every canonical
   follow.
   ========================================================================== */

const PAGES = ["/", "/features", "/how-it-works"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: new URL(path, site.siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
