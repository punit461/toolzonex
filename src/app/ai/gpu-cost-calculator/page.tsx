import type { Metadata } from "next";
import GPUCostCalculator from "../../../calculators/GPUCostCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "GPU Cloud Cost Calculator - A100, H100 & RTX Pricing",
  description: "Free calculator to estimate cloud GPU rental costs for AI training and inference. Compare A100, H100, RTX 4090, and more across providers.",
  keywords: ["GPU cost calculator", "cloud GPU pricing", "A100 pricing", "H100 pricing", "GPU rental calculator", "AI training cost calculator", "GPU cloud comparison"],
  alternates: { canonical: "/ai/gpu-cost-calculator" },
  openGraph: {
    title: "GPU Cloud Cost Calculator - A100, H100 & RTX Pricing | ToolZoneX",
    description: "Estimate cloud GPU rental costs for AI training and inference. Compare A100, H100, RTX 4090, and more.",
    url: `${SITE_URL}/ai/gpu-cost-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const gpuCostCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "GPU Cloud Cost Calculator",
  "description": "Estimate the cost of renting cloud GPUs like A100, H100, and RTX 4090 for AI training and inference.",
  "url": `${SITE_URL}/ai/gpu-cost-calculator`,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gpuCostCalculatorSchema) }}
      />
      <GPUCostCalculator />
    </>
  );
}
