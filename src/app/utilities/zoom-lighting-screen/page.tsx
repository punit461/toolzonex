import type { Metadata } from "next";
import { ZoomLightingScreen } from "../../../calculators/screens/colorScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Zoom Lighting Screen - Turn Your Screen Into a Ring Light",
  description: "A bright, warm fullscreen light for video calls. Turn your screen into a ring light for better video lighting.",
  keywords: ["zoom lighting screen","ring light screen","video call lighting","screen light for zoom"],
  alternates: { canonical: "/utilities/zoom-lighting-screen" },
  openGraph: {
    title: "Zoom Lighting Screen - Turn Your Screen Into a Ring Light | ToolZoneX",
    description: "A bright, warm fullscreen light for video calls. Turn your screen into a ring light for better video lighting.",
    url: `${SITE_URL}/utilities/zoom-lighting-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ZoomLightingScreen",
  "description": "A bright, warm fullscreen light for video calls. Turn your screen into a ring light for better video lighting.",
  "url": `${SITE_URL}/utilities/zoom-lighting-screen`,
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
      <ZoomLightingScreen />
    </>
  );
}
