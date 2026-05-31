import type { Metadata } from "next";
import RandomLinePicker from "../../../calculators/RandomLinePicker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Random Line Picker - Pick a Random Winner from List",
  description: "Fairly pick a random name, winner, or item from a list. Free online random line picker.",
  keywords: ["random line picker", "random winner generator", "pick name from list", "randomizer wheel alternative"],
  alternates: { canonical: "/tools/random-line-picker" },
  openGraph: {
    title: "Random Line Picker - Pick a Random Winner from List | ToolZoneX",
    description: "Fairly pick a random name, winner, or item from a list. Free online random line picker.",
    url: `${SITE_URL}/tools/random-line-picker`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Random Line Picker",
  "description": "Fairly pick a random name, winner, or item from a list.",
  "url": `${SITE_URL}/tools/random-line-picker`,
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
      <RandomLinePicker />
    </>
  );
}
