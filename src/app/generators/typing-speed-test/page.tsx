import type { Metadata } from "next";
import TypingSpeedTest from "../../../calculators/TypingSpeedTest";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Typing Speed Test (WPM) - Check Your Words Per Minute Online",
  description: "Check your typing speed and accuracy in Words Per Minute (WPM). Free online 60-second typing test to improve keyboard speed.",
  keywords: ["typing speed test", "wpm test", "words per minute", "keyboard test", "type fast online", "typing accuracy"],
  alternates: { canonical: "/generators/typing-speed-test" },
  openGraph: {
    title: "Typing Speed Test (WPM) - Check Your Words Per Minute Online | ToolZoneX",
    description: "Check your typing speed and accuracy in Words Per Minute (WPM).",
    url: `${SITE_URL}/generators/typing-speed-test`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Typing Speed Test",
  "description": "Check your typing speed and accuracy in Words Per Minute (WPM).",
  "url": `${SITE_URL}/generators/typing-speed-test`,
  "applicationCategory": "EducationalApplication",
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
      <TypingSpeedTest />
    </>
  );
}
