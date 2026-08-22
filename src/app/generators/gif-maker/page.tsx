import type { Metadata } from "next";
import GifMaker from "../../../calculators/GifMaker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "GIF Maker - Create Animated GIFs from Images",
  description: "Turn images and frames into smooth, shareable GIFs. Free browser-based GIF maker — no upload, no watermark.",
  keywords: ["gif maker", "create animated gif", "image to gif", "gif generator", "make a gif online"],
  alternates: { canonical: "/generators/gif-maker" },
  openGraph: {
    title: "GIF Maker - Create Animated GIFs from Images | ToolZoneX",
    description: "Turn images and frames into smooth, shareable GIFs.",
    url: `${SITE_URL}/generators/gif-maker`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "GIF Maker",
  "description": "Turn a sequence of images into an animated GIF entirely in the browser.",
  "url": `${SITE_URL}/generators/gif-maker`,
  "applicationCategory": "DesignApplication",
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
      <GifMaker />
    </>
  );
}
