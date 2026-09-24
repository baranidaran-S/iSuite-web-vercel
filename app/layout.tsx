import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { site } from "@/lib/site";
import "./globals.css";

/* PLACEHOLDER FONTS. Requirements 32 lists the real brand fonts as an input
   that has not arrived. Both below are stand-ins chosen to hold the premium
   B2B register the design section asks for, and both swap out here in one
   place - nothing else in the codebase names a typeface.

   Manrope carries everything - body, UI, and headings up to 800. One family,
   hierarchy from weight and size, which is what stops a page looking like a
   ransom note.

   Instrument Serif appears on exactly one word in the hero headline, in
   italic. A single serif accent inside an otherwise geometric sans is the
   cheapest way to make a page look designed rather than generated. Used more
   than once it stops reading as deliberate.

   THIS WAS BRIEFLY SWAPPED FOR INSTRUMENT SANS and put straight back. The
   swap was made on a misread: the objection was to the HEADING being split
   into a dim half and a bright half, not to the typeface. Manrope is the
   approved face until the real brand fonts arrive - do not change it to fix
   something that is not a typography problem. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-instrument",
});

/* The title says what the product is to someone with no other context - it
   is not the hero headline, which only works above a subhead explaining it.

   metadataBase is a placeholder domain. It has to be a real absolute URL
   before launch or every share card and canonical resolves to nothing. */
export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default:
      "iSuite AI - One Inbox for WhatsApp, Instagram and Facebook Enquiries",
    template: "%s | iSuite AI",
  },
  description:
    "iSuite AI brings WhatsApp, Instagram, Facebook and website enquiries into one inbox, with an AI sales assistant that replies, qualifies, books appointments and follows up. Book a demo.",
  openGraph: {
    type: "website",
    siteName: "iSuite AI",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximum-scale: pinch-zoom has to stay available.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrument.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
