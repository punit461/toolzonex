import type { Metadata } from "next";
import TypingSpeedTest from "../../../calculators/generators/TypingSpeedTest";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Typing Speed Test (WPM) - Check Your Words Per Minute Online",
  description: "Check your typing speed and accuracy in Words Per Minute (WPM). Free online 60-second typing test to improve keyboard speed.",
  keywords: ["typing speed test", "wpm test", "words per minute", "keyboard test", "type fast online", "typing accuracy", "measure my typing speed", "find wpm", "check wpm", "measure wpm", "wpm checker"],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's a good typing speed?",
      "acceptedAnswer": { "@type": "Answer", "text": "The average typist reaches 40 WPM; professional typists often exceed 65-75 WPM." }
    },
    {
      "@type": "Question",
      "name": "How do I check my WPM?",
      "acceptedAnswer": { "@type": "Answer", "text": "Just start typing the highlighted passage above — the 60-second timer starts on your first keystroke, and your WPM and accuracy update live as you type, so you can check your WPM without clicking anything extra." }
    },
    {
      "@type": "Question",
      "name": "How can I measure my typing speed accurately?",
      "acceptedAnswer": { "@type": "Answer", "text": "Type naturally for the full 60 seconds rather than stopping early — WPM is measured over the whole test window using the standard 5-keystrokes-per-word convention, so a longer, uninterrupted run gives a more accurate reading than a few quick words. Run it a few times and take the average, since typing speed naturally varies test to test." }
    },
    {
      "@type": "Question",
      "name": "Is there a quick WPM checker I can use right now?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this page is a free, instant WPM checker. No sign-up, no download: click into the text box and start typing to find your WPM in under a minute." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TypingSpeedTest />
    </>
  );
}
