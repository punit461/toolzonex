import type { Metadata } from "next";
import DeadPixelTest from "../../../calculators/screens/DeadPixelTest";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Dead Pixel Test - Check Your Monitor for Stuck Pixels",
  description: "Test your monitor for dead or stuck pixels with fullscreen white, black, red, green, and blue screens.",
  keywords: ["dead pixel test","stuck pixel test","monitor test","screen test tool"],
  alternates: { canonical: "/utilities/dead-pixel-test" },
  openGraph: {
    title: "Dead Pixel Test - Check Your Monitor for Stuck Pixels | ToolZoneX",
    description: "Test your monitor for dead or stuck pixels with fullscreen white, black, red, green, and blue screens.",
    url: `${SITE_URL}/utilities/dead-pixel-test`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "DeadPixelTest",
  "description": "Test your monitor for dead or stuck pixels with fullscreen white, black, red, green, and blue screens.",
  "url": `${SITE_URL}/utilities/dead-pixel-test`,
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
      <DeadPixelTest />
    </>
  );
}
