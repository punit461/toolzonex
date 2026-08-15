import type { Metadata } from "next";
import { PurpleScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Purple Screen - Free Fullscreen Purple Display",
  description: "A simple fullscreen purple screen. Free online purple screen for testing, backgrounds, or fun.",
  keywords: ["purple screen","fullscreen purple","plain purple screen"],
  alternates: { canonical: "/utilities/purple-screen" },
  openGraph: {
    title: "Purple Screen - Free Fullscreen Purple Display | ToolZoneX",
    description: "A simple fullscreen purple screen. Free online purple screen for testing, backgrounds, or fun.",
    url: `${SITE_URL}/utilities/purple-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PurpleScreen",
  "description": "A simple fullscreen purple screen. Free online purple screen for testing, backgrounds, or fun.",
  "url": `${SITE_URL}/utilities/purple-screen`,
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
      <PurpleScreen />
    </>
  );
}
