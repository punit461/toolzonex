import type { Metadata } from "next";
import { BlackScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Black Screen - Free Fullscreen Black Display",
  description: "A simple fullscreen black screen. Free online black screen for testing, backgrounds, or fun.",
  keywords: ["black screen","black screen test","fullscreen black","plain black screen"],
  alternates: { canonical: "/utilities/black-screen" },
  openGraph: {
    title: "Black Screen - Free Fullscreen Black Display | ToolZoneX",
    description: "A simple fullscreen black screen. Free online black screen for testing, backgrounds, or fun.",
    url: `${SITE_URL}/utilities/black-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BlackScreen",
  "description": "A simple fullscreen black screen. Free online black screen for testing, backgrounds, or fun.",
  "url": `${SITE_URL}/utilities/black-screen`,
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
      <BlackScreen />
    </>
  );
}
