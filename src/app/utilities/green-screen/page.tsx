import type { Metadata } from "next";
import { GreenScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Green Screen - Free Fullscreen Chroma Key Display",
  description: "A simple fullscreen chroma-key green screen. Free online green screen for backgrounds, testing, or streaming.",
  keywords: ["green screen","chroma key screen","fullscreen green","green screen background"],
  alternates: { canonical: "/utilities/green-screen" },
  openGraph: {
    title: "Green Screen - Free Fullscreen Chroma Key Display | ToolZoneX",
    description: "A simple fullscreen chroma-key green screen. Free online green screen for backgrounds, testing, or streaming.",
    url: `${SITE_URL}/utilities/green-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "GreenScreen",
  "description": "A simple fullscreen chroma-key green screen. Free online green screen for backgrounds, testing, or streaming.",
  "url": `${SITE_URL}/utilities/green-screen`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <GreenScreen />
    </>
  );
}
