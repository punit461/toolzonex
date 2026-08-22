import type { Metadata } from "next";
import { BlueScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Blue Screen - Free Fullscreen Blue Display",
  description: "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun. Looking for a Blue Screen of Death prank instead? See our dedicated BSOD tool.",
  keywords: ["blue screen","blue screen test","fullscreen blue","plain blue screen","custom blue screen of death","fake blue screen prank"],
  alternates: { canonical: "/utilities/blue-screen" },
  openGraph: {
    title: "Blue Screen - Free Fullscreen Blue Display | ToolZoneX",
    description: "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun.",
    url: `${SITE_URL}/utilities/blue-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BlueScreen",
  "description": "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun.",
  "url": `${SITE_URL}/utilities/blue-screen`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does this work on mobile?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, tap the fullscreen button on any phone or tablet browser." }
    },
    {
      "@type": "Question",
      "name": "Will the color look exactly the same on every screen?",
      "acceptedAnswer": { "@type": "Answer", "text": "Not necessarily — color rendering varies by display, brightness settings, and color profile." }
    },
    {
      "@type": "Question",
      "name": "Is this a Blue Screen of Death (BSOD) prank simulator?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — this page is a plain, solid blue fullscreen display, not a fake Windows error message. If you're looking for a custom blue screen of death or a fake blue screen prank with actual Windows-style error text, use our dedicated Windows Blue Screen prank tool instead, which mimics the real \"Your PC ran into a problem\" screen." }
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
      <BlueScreen />
    </>
  );
}
