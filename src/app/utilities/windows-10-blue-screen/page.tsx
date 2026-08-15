import type { Metadata } from "next";
import { Windows10BsodScreen } from "../../../calculators/screens/windowsScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Windows 10 Blue Screen Prank",
  description: "A fake Windows 10 blue screen of death (BSOD) prank. Go fullscreen for the full effect -- nothing is actually wrong.",
  keywords: ["windows 10 blue screen","windows 10 bsod prank","fake blue screen","windows error screen prank"],
  alternates: { canonical: "/utilities/windows-10-blue-screen" },
  openGraph: {
    title: "Windows 10 Blue Screen Prank | ToolZoneX",
    description: "A fake Windows 10 blue screen of death (BSOD) prank. Go fullscreen for the full effect -- nothing is actually wrong.",
    url: `${SITE_URL}/utilities/windows-10-blue-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Windows10BsodScreen",
  "description": "A fake Windows 10 blue screen of death (BSOD) prank. Go fullscreen for the full effect -- nothing is actually wrong.",
  "url": `${SITE_URL}/utilities/windows-10-blue-screen`,
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
      <Windows10BsodScreen />
    </>
  );
}
