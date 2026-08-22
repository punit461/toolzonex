import type { Metadata } from "next";
import HeightComparison from "../../../calculators/heightcompare/HeightComparison";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Height Comparison Tool - Compare Heights Online Free",
  description: "Compare heights side by side with proportional scaled bars. Free online height comparer for people, animals, vehicles, and objects.",
  keywords: ["height comparison","height comparison chart","compare heights online","height comparison tool","height comparer","compare height","height comparison website","size proportions","comparing size","size comparison maker online","female and male height comparison","height comperison","high comparison"],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I add more than two people?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, add as many as you like with the Add Person button — there's no limit on entries." }
    },
    {
      "@type": "Question",
      "name": "Where do the preset reference heights come from?",
      "acceptedAnswer": { "@type": "Answer", "text": "They're commonly cited average/reference figures, included for quick comparisons — not exact measurements of any specific individual." }
    },
    {
      "@type": "Question",
      "name": "Can I see centimeters and feet/inches at the same time?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the chart always shows both a cm axis and a ft/in axis together, regardless of which unit you're typing values in." }
    },
    {
      "@type": "Question",
      "name": "Can I compare average female and male height side by side?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — search the preset library for \"Average Adult Female\" and \"Average Adult Male\" (US and World averages are both included), add them both to the chart, and the tool renders a female and male height comparison with proportionally scaled bars." }
    },
    {
      "@type": "Question",
      "name": "Is this the same as a general size comparison maker?",
      "acceptedAnswer": { "@type": "Answer", "text": "This tool focuses specifically on height (vertical size), not full 2D/3D size or scale comparisons — it works as a height comparison website for people, animals, vehicles, and objects, using proportionally scaled bars rather than silhouette overlays." }
    },
    {
      "@type": "Question",
      "name": "Do I need to create an account?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. The tool is free and works entirely in your browser — nothing is saved or uploaded unless you choose to download the PNG." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeightComparison />
    </>
  );
}
