import type { Metadata } from "next";
import SortingAlgorithmVisualizer from "../../../calculators/utilities/SortingAlgorithmVisualizer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Sorting Algorithm Visualizer - Learn Sorting Online",
  description: "Visualize how popular sorting algorithms like Bubble Sort and Selection Sort work in real-time. Interactive educational tool.",
  keywords: ["sorting algorithm visualizer", "bubble sort visualization", "selection sort", "learn sorting online", "algorithm visualizer", "online sort algorithm", "sorting algorithm visualiser", "algorithm visualizer online", "sort visualizer online", "visualise sorting algorithm"],
  alternates: { canonical: "/utilities/algorithm-visualizer" },
  openGraph: {
    title: "Sorting Algorithm Visualizer - Learn Sorting Online | ToolZoneX",
    description: "Visualize how popular sorting algorithms like Bubble Sort and Selection Sort work in real-time. Interactive educational tool.",
    url: `${SITE_URL}/utilities/algorithm-visualizer`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which sorting algorithm is fastest?",
      "acceptedAnswer": { "@type": "Answer", "text": "It depends on the input size and data — for large datasets, algorithms like Merge Sort or Quick Sort generally outperform simpler ones like Bubble Sort, which this visualizer helps make visible." }
    },
    {
      "@type": "Question",
      "name": "Is this an online sort algorithm tool, or do I need to install anything?",
      "acceptedAnswer": { "@type": "Answer", "text": "It's fully online — this algorithm visualizer runs entirely in your browser, with nothing to download or install. Just pick an algorithm and press play." }
    },
    {
      "@type": "Question",
      "name": "Is there a sorting algorithm visualiser with adjustable speed?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — use the Animation Speed slider to slow the visualiser down and study each comparison and swap step by step, or speed it up to see the full sort complete in a couple of seconds." }
    },
    {
      "@type": "Question",
      "name": "Is this algorithm visualizer online free to use?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, it's completely free with no sign-up — generate a new random array and run Bubble Sort, Selection Sort, or Insertion Sort as many times as you like." }
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
      <SortingAlgorithmVisualizer />
    </>
  );
}
