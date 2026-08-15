import type { Metadata } from "next";
import BrokenScreen from "../../../calculators/screens/BrokenScreen";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Broken Screen Prank - Fake Cracked Screen Online",
  description: "A fake cracked screen prank overlay. Go fullscreen to prank friends and coworkers -- no real damage.",
  keywords: ["broken screen prank","cracked screen prank","fake broken screen","screen crack prank"],
  alternates: { canonical: "/utilities/broken-screen" },
  openGraph: {
    title: "Broken Screen Prank - Fake Cracked Screen Online | ToolZoneX",
    description: "A fake cracked screen prank overlay. Go fullscreen to prank friends and coworkers -- no real damage.",
    url: `${SITE_URL}/utilities/broken-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BrokenScreen",
  "description": "A fake cracked screen prank overlay. Go fullscreen to prank friends and coworkers -- no real damage.",
  "url": `${SITE_URL}/utilities/broken-screen`,
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
      <BrokenScreen />
    </>
  );
}
