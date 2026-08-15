import type { Metadata } from "next";
import { RedScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Red Screen - Free Fullscreen Red Display",
  description: "A simple fullscreen red screen. Free online red screen for testing, backgrounds, or fun.",
  keywords: ["red screen","red screen test","fullscreen red","plain red screen"],
  alternates: { canonical: "/utilities/red-screen" },
  openGraph: {
    title: "Red Screen - Free Fullscreen Red Display | ToolZoneX",
    description: "A simple fullscreen red screen. Free online red screen for testing, backgrounds, or fun.",
    url: `${SITE_URL}/utilities/red-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "RedScreen",
  "description": "A simple fullscreen red screen. Free online red screen for testing, backgrounds, or fun.",
  "url": `${SITE_URL}/utilities/red-screen`,
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
      <RedScreen />
    </>
  );
}
