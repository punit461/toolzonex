import type { Metadata } from "next";
import CssMinifier from "../../../calculators/CssMinifier";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "CSS Minifier - Compress CSS Code Online",
  description: "Compress and minify CSS code online instantly. Free tool to reduce CSS file size and improve website performance.",
  keywords: ["css minifier", "compress css", "css compressor", "minify css online"],
  alternates: { canonical: "/tools/css-minifier" },
  openGraph: {
    title: "CSS Minifier - Compress CSS Code Online | ToolZoneX",
    description: "Compress and minify CSS code online instantly. Free tool to reduce CSS file size.",
    url: `${SITE_URL}/tools/css-minifier`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CSS Minifier",
  "description": "Compress and minify CSS code online instantly. Free tool to reduce CSS file size and improve website performance.",
  "url": `${SITE_URL}/tools/css-minifier`,
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
