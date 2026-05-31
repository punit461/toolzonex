import type { Metadata } from "next";
import SortingAlgorithmVisualizer from "../../../calculators/SortingAlgorithmVisualizer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Sorting Algorithm Visualizer - Learn Sorting Online",
  description: "Visualize how popular sorting algorithms like Bubble Sort and Selection Sort work in real-time. Interactive educational tool.",
  keywords: ["sorting algorithm visualizer", "bubble sort visualization", "selection sort", "learn sorting online", "algorithm visualizer"],
  alternates: { canonical: "/utilities/algorithm-visualizer" },
  openGraph: {
    title: "Sorting Algorithm Visualizer - Learn Sorting Online | ToolZoneX",
    description: "Visualize how popular sorting algorithms like Bubble Sort and Selection Sort work in real-time. Interactive educational tool.",
    url: `${SITE_URL}/utilities/algorithm-visualizer`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sorting Algorithm Visualizer",
  "description": "Visualize how popular sorting algorithms work in real-time.",
  "url": `${SITE_URL}/utilities/algorithm-visualizer`,
  "applicationCategory": "EducationalApplication",
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
      <SortingAlgorithmVisualizer />
    </>
  );
}
