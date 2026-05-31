import type { Metadata } from "next";
import RandomNumberGenerator from "../../../calculators/RandomNumberGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Random Number Generator - Pick Numbers Online for Free",
  description: "Generate random numbers instantly between any range. Free online RNG tool for raffles, giveaways, games, and statistics.",
  keywords: ["random number generator", "rng", "pick random number", "raffle number generator", "random digit generator"],
  alternates: { canonical: "/tools/random-number-generator" },
  openGraph: {
    title: "Random Number Generator - Pick Numbers Online for Free | ToolZoneX",
    description: "Generate random numbers instantly between any range. Free online RNG tool.",
    url: `${SITE_URL}/tools/random-number-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Random Number Generator",
  "description": "Generate random numbers instantly between any range.",
  "url": `${SITE_URL}/tools/random-number-generator`,
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
