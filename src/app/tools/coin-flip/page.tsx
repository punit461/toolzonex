import type { Metadata } from "next";
import CoinFlip from "../../../calculators/CoinFlip";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Flip a Coin - Heads or Tails Online",
  description: "Flip a virtual coin instantly online. Free heads or tails random coin flipper for making quick decisions.",
  keywords: ["flip a coin", "heads or tails", "virtual coin flip", "random coin flipper", "online coin toss"],
  alternates: { canonical: "/tools/coin-flip" },
  openGraph: {
    title: "Flip a Coin - Heads or Tails Online | ToolZoneX",
    description: "Flip a virtual coin instantly online.",
    url: `${SITE_URL}/tools/coin-flip`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Flip a Coin",
  "description": "Flip a virtual coin instantly online.",
  "url": `${SITE_URL}/tools/coin-flip`,
  "applicationCategory": "EntertainmentApplication",
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
      <CoinFlip />
    </>
  );
}
