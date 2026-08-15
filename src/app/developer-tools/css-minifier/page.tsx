import type { Metadata } from "next";
import CssMinifier from "../../../calculators/CssMinifier";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "CSS Minifier - Compress CSS Code Online",
  description: "Compress and minify CSS code online instantly. Free tool to reduce CSS file size and improve website performance.",
  keywords: ["css minifier", "compress css", "css compressor", "minify css online"],
  alternates: { canonical: "/developer-tools/css-minifier" },
  openGraph: {
    title: "CSS Minifier - Compress CSS Code Online | ToolZoneX",
    description: "Compress and minify CSS code online instantly. Free tool to reduce CSS file size.",
    url: `${SITE_URL}/developer-tools/css-minifier`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CSS Minifier",
  "description": "Compress and minify CSS code online instantly. Free tool to reduce CSS file size and improve website performance.",
  "url": `${SITE_URL}/developer-tools/css-minifier`,
  "applicationCategory": "DeveloperApplication",
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
      <CssMinifier />
    </>
  );
}
