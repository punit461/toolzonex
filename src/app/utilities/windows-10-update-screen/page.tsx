import type { Metadata } from "next";
import { Windows10UpdateScreen } from "../../../calculators/screens/windowsScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Windows 10 Update Screen Prank",
  description: "A fake Windows 10 'Working on updates' screen prank. Go fullscreen for the full effect.",
  keywords: ["windows 10 update screen","fake windows update","windows update prank"],
  alternates: { canonical: "/utilities/windows-10-update-screen" },
  openGraph: {
    title: "Windows 10 Update Screen Prank | ToolZoneX",
    description: "A fake Windows 10 'Working on updates' screen prank. Go fullscreen for the full effect.",
    url: `${SITE_URL}/utilities/windows-10-update-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Windows10UpdateScreen",
  "description": "A fake Windows 10 'Working on updates' screen prank. Go fullscreen for the full effect.",
  "url": `${SITE_URL}/utilities/windows-10-update-screen`,
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
      <Windows10UpdateScreen />
    </>
  );
}
