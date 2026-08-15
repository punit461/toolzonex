import type { Metadata } from "next";
import RandomNumberGenerator from "../../../calculators/RandomNumberGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Random Number Generator - Pick Numbers Online for Free",
  description: "Generate random numbers instantly between any range. Free online RNG tool for raffles, giveaways, games, and statistics.",
  keywords: ["random number generator", "rng", "pick random number", "raffle number generator", "random digit generator"],
  alternates: { canonical: "/generators/random-number-generator" },
  openGraph: {
    title: "Random Number Generator - Pick Numbers Online for Free | ToolZoneX",
    description: "Generate random numbers instantly between any range. Free online RNG tool.",
    url: `${SITE_URL}/generators/random-number-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Random Number Generator",
  "description": "Generate random numbers instantly between any range.",
  "url": `${SITE_URL}/generators/random-number-generator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <RandomNumberGenerator />
    </>
  );
}
