import type { Metadata } from "next";
import HtmlMinifier from "../../../calculators/HtmlMinifier";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "HTML Minifier - Compress HTML Code Online",
  description: "Compress and minify HTML code online instantly. Free tool to reduce HTML file size and improve website performance.",
  keywords: ["html minifier", "compress html", "html compressor", "minify html online"],
  alternates: { canonical: "/tools/html-minifier" },
  openGraph: {
    title: "HTML Minifier - Compress HTML Code Online | ToolZoneX",
    description: "Compress and minify HTML code online instantly. Free tool to reduce HTML file size.",
    url: `${SITE_URL}/tools/html-minifier`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HTML Minifier",
  "description": "Compress and minify HTML code online instantly. Free tool to reduce HTML file size and improve website performance.",
  "url": `${SITE_URL}/tools/html-minifier`,
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
      <HtmlMinifier />
    </>
  );
}
