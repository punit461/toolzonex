import type { Metadata } from "next";
import { YellowScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Yellow Screen - Free Fullscreen Yellow Display",
  description: "A simple fullscreen yellow screen. Free online yellow screen for testing, backgrounds, or fun.",
  keywords: ["yellow screen","fullscreen yellow","plain yellow screen"],
  alternates: { canonical: "/utilities/yellow-screen" },
  openGraph: {
    title: "Yellow Screen - Free Fullscreen Yellow Display | ToolZoneX",
    description: "A simple fullscreen yellow screen. Free online yellow screen for testing, backgrounds, or fun.",
    url: `${SITE_URL}/utilities/yellow-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "YellowScreen",
  "description": "A simple fullscreen yellow screen. Free online yellow screen for testing, backgrounds, or fun.",
  "url": `${SITE_URL}/utilities/yellow-screen`,
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
      <YellowScreen />
    </>
  );
}
