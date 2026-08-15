import type { Metadata } from "next";
import { PinkScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Pink Screen - Free Fullscreen Pink Display",
  description: "A simple fullscreen pink screen. Free online pink screen for testing, backgrounds, or fun.",
  keywords: ["pink screen","fullscreen pink","plain pink screen"],
  alternates: { canonical: "/utilities/pink-screen" },
  openGraph: {
    title: "Pink Screen - Free Fullscreen Pink Display | ToolZoneX",
    description: "A simple fullscreen pink screen. Free online pink screen for testing, backgrounds, or fun.",
    url: `${SITE_URL}/utilities/pink-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PinkScreen",
  "description": "A simple fullscreen pink screen. Free online pink screen for testing, backgrounds, or fun.",
  "url": `${SITE_URL}/utilities/pink-screen`,
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
      <PinkScreen />
    </>
  );
}
