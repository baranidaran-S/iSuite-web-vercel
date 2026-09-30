import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/* ==========================================================================
   /robots.txt - requirements §27
   --------------------------------------------------------------------------
   Everything may be crawled, and the sitemap is named. Its address, like
   the sitemap's own entries, resolves against site.siteUrl - still
   example.com until the real domain is set (PLACEHOLDERS, lib/site.ts).
   ========================================================================== */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.siteUrl).toString(),
  };
}
