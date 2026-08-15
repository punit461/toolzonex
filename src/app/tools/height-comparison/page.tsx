import type { Metadata } from "next";
import HeightComparison from "../../../calculators/heightcompare/HeightComparison";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Height Comparison Tool - Compare Heights Online Free",
  description: "Compare heights side by side with proportional scaled bars. Free online height comparison tool.",
  keywords: ["height comparison","height comparison chart","compare heights online","height comparison tool"],
  alternates: { canonical: "/tools/height-comparison" },
  openGraph: {
    title: "Height Comparison Tool - Compare Heights Online Free | ToolZoneX",
    description: "Compare heights side by side with proportional scaled bars. Free online height comparison tool.",
    url: `${SITE_URL}/tools/height-comparison`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HeightComparison",
  "description": "Compare heights side by side with proportional scaled bars. Free online height comparison tool.",
  "url": `${SITE_URL}/tools/height-comparison`,
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
      <HeightComparison />
    </>
  );
}
