import type { Metadata } from "next";
import TextDiffTool from "../../../calculators/TextDiffTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Diff Tool - Compare Text Online",
  description: "Compare two text documents online to see exact differences. Highlights added and removed words instantly.",
  keywords: ["text diff", "compare text", "diff checker", "text difference finder", "diff tool online"],
  alternates: { canonical: "/tools/text-diff-tool" },
  openGraph: {
    title: "Text Diff Tool - Compare Text Online | ToolZoneX",
    description: "Compare two text documents online to see exact differences. Highlights added and removed words instantly.",
    url: `${SITE_URL}/tools/text-diff-tool`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Diff Tool",
  "description": "Compare two text documents online to see exact differences.",
  "url": `${SITE_URL}/tools/text-diff-tool`,
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
      <TextDiffTool />
    </>
  );
}
