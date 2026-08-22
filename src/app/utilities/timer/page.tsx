import type { Metadata } from "next";
import Timer from "../../../calculators/utilities/Timer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Online Countdown Timer - Free Simple Timer",
  description: "A simple, fast, and free online countdown timer. Perfect for studying, workouts, cooking, and productivity.",
  keywords: ["online timer", "countdown timer", "free timer", "study timer", "workout timer"],
  alternates: { canonical: "/utilities/timer" },
  openGraph: {
    title: "Online Countdown Timer - Free Simple Timer | ToolZoneX",
    description: "A simple, fast, and free online countdown timer. Perfect for studying, workouts, cooking, and productivity.",
    url: `${SITE_URL}/utilities/timer`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Online Countdown Timer",
  "description": "A simple, fast, and free online countdown timer. Perfect for studying, workouts, cooking, and productivity.",
  "url": `${SITE_URL}/utilities/timer`,
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
      <Timer />
    </>
  );
}
