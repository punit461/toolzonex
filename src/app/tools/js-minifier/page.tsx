import type { Metadata } from "next";
import JsMinifier from "../../../calculators/JsMinifier";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "JavaScript Minifier - Compress JS Code Online",
  description: "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size and improve website performance.",
  keywords: ["js minifier", "javascript minifier", "compress js", "minify javascript online"],
  alternates: { canonical: "/tools/js-minifier" },
  openGraph: {
    title: "JavaScript Minifier - Compress JS Code Online | ToolZoneX",
    description: "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size.",
    url: `${SITE_URL}/tools/js-minifier`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JavaScript Minifier",
  "description": "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size and improve website performance.",
  "url": `${SITE_URL}/tools/js-minifier`,
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
      <JsMinifier />
    </>
  );
}
