import type { Metadata } from "next";
import FocusTimer from "../../../calculators/FocusTimer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Pomodoro Focus Timer - Boost Productivity Online",
  description: "Boost productivity with this free online Pomodoro timer. Alternate between focused work sessions and short breaks to stay fresh.",
  keywords: ["pomodoro timer", "focus timer", "productivity timer", "pomodoro technique", "study timer online"],
  alternates: { canonical: "/utilities/focus-timer" },
  openGraph: {
    title: "Pomodoro Focus Timer - Boost Productivity Online | ToolZoneX",
    description: "Boost productivity with this free online Pomodoro timer. Alternate between focused work sessions and short breaks.",
    url: `${SITE_URL}/utilities/focus-timer`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pomodoro Focus Timer",
  "description": "Boost productivity with this free online Pomodoro timer. Alternate between focused work sessions and short breaks to stay fresh.",
  "url": `${SITE_URL}/utilities/focus-timer`,
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
      <FocusTimer />
    </>
  );
}
