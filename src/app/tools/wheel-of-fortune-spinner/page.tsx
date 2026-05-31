import type { Metadata } from "next";
import WheelOfFortuneSpinner from "../../../calculators/WheelOfFortuneSpinner";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Wheel of Fortune Spinner - Random Decision Maker Online",
  description: "Create a custom spinning wheel to randomly pick names, prizes, or make decisions. Free online random wheel spinner.",
  keywords: ["wheel of fortune", "spinning wheel generator", "random decision maker", "picker wheel", "random name picker"],
  alternates: { canonical: "/tools/wheel-of-fortune-spinner" },
  openGraph: {
    title: "Wheel of Fortune Spinner - Random Decision Maker Online | ToolZoneX",
    description: "Create a custom spinning wheel to randomly pick names, prizes, or make decisions.",
    url: `${SITE_URL}/tools/wheel-of-fortune-spinner`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Wheel of Fortune Spinner",
  "description": "Create a custom spinning wheel to randomly pick names, prizes, or make decisions.",
  "url": `${SITE_URL}/tools/wheel-of-fortune-spinner`,
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
      <WheelOfFortuneSpinner />
    </>
  );
}
