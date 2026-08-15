import type { Metadata } from "next";
import { BlueScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Blue Screen - Free Fullscreen Blue Display",
  description: "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun.",
  keywords: ["blue screen","blue screen test","fullscreen blue","plain blue screen"],
  alternates: { canonical: "/utilities/blue-screen" },
  openGraph: {
    title: "Blue Screen - Free Fullscreen Blue Display | ToolZoneX",
    description: "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun.",
    url: `${SITE_URL}/utilities/blue-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BlueScreen",
  "description": "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun.",
  "url": `${SITE_URL}/utilities/blue-screen`,
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
      <BlueScreen />
    </>
  );
}
