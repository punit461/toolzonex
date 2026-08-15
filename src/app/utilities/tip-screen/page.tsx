import type { Metadata } from "next";
import TipScreen from "../../../calculators/screens/TipScreen";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Tip Screen - Fullscreen Tipping Display for Restaurants",
  description: "A fullscreen tipping display for restaurants and point-of-sale systems. Enter a subtotal and show customers exact tip amounts.",
  keywords: ["tip screen","tipping display","pos tip screen","restaurant tip screen","digital tip jar"],
  alternates: { canonical: "/utilities/tip-screen" },
  openGraph: {
    title: "Tip Screen - Fullscreen Tipping Display for Restaurants | ToolZoneX",
    description: "A fullscreen tipping display for restaurants and point-of-sale systems. Enter a subtotal and show customers exact tip amounts.",
    url: `${SITE_URL}/utilities/tip-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TipScreen",
  "description": "A fullscreen tipping display for restaurants and point-of-sale systems. Enter a subtotal and show customers exact tip amounts.",
  "url": `${SITE_URL}/utilities/tip-screen`,
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
      <TipScreen />
    </>
  );
}
