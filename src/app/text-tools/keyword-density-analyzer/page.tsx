import type { Metadata } from "next";
import KeywordDensityAnalyzer from "../../../calculators/KeywordDensityAnalyzer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Keyword Density Analyzer - Free SEO Checker Online",
  description: "Check the keyword density of your text for SEO optimization. Free online tool to analyze keyword frequency and avoid keyword stuffing.",
  keywords: ["keyword density analyzer", "keyword density checker", "seo keyword frequency", "word density counter", "avoid keyword stuffing"],
  alternates: { canonical: "/text-tools/keyword-density-analyzer" },
  openGraph: {
    title: "Keyword Density Analyzer - Free SEO Checker Online | ToolZoneX",
    description: "Check the keyword density of your text for SEO optimization. Free online tool to analyze keyword frequency.",
    url: `${SITE_URL}/text-tools/keyword-density-analyzer`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Keyword Density Analyzer",
  "description": "Check the keyword density of your text for SEO optimization.",
  "url": `${SITE_URL}/text-tools/keyword-density-analyzer`,
  "applicationCategory": "UtilityApplication",
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
      <KeywordDensityAnalyzer />
    </>
  );
}
