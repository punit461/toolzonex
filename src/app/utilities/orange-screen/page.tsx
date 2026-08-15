import type { Metadata } from "next";
import { OrangeScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Orange Screen - Free Fullscreen Orange Display",
  description: "A simple fullscreen orange screen. Free online orange screen for testing, backgrounds, or fun.",
  keywords: ["orange screen","fullscreen orange","plain orange screen"],
  alternates: { canonical: "/utilities/orange-screen" },
  openGraph: {
    title: "Orange Screen - Free Fullscreen Orange Display | ToolZoneX",
    description: "A simple fullscreen orange screen. Free online orange screen for testing, backgrounds, or fun.",
    url: `${SITE_URL}/utilities/orange-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "OrangeScreen",
  "description": "A simple fullscreen orange screen. Free online orange screen for testing, backgrounds, or fun.",
  "url": `${SITE_URL}/utilities/orange-screen`,
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
      <OrangeScreen />
    </>
  );
}
