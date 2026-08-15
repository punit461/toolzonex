import type { Metadata } from "next";
import DvdScreensaver from "../../../calculators/screens/DvdScreensaver";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "DVD Screensaver - The Classic Bouncing Logo Online",
  description: "The classic bouncing DVD logo screensaver, recreated online. Customize the text and go fullscreen.",
  keywords: ["dvd screensaver","bouncing dvd logo","dvd logo bounce","online screensaver"],
  alternates: { canonical: "/utilities/dvd-screensaver" },
  openGraph: {
    title: "DVD Screensaver - The Classic Bouncing Logo Online | ToolZoneX",
    description: "The classic bouncing DVD logo screensaver, recreated online. Customize the text and go fullscreen.",
    url: `${SITE_URL}/utilities/dvd-screensaver`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "DvdScreensaver",
  "description": "The classic bouncing DVD logo screensaver, recreated online. Customize the text and go fullscreen.",
  "url": `${SITE_URL}/utilities/dvd-screensaver`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <DvdScreensaver />
    </>
  );
}
