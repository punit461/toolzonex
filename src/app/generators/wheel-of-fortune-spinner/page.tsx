import type { Metadata } from "next";
import WheelOfFortuneSpinner from "../../../calculators/WheelOfFortuneSpinner";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Wheel of Fortune Spinner - Random Decision Maker Online",
  description: "Create a custom spinning wheel to randomly pick names, prizes, or make decisions. Free online random wheel spinner.",
  keywords: ["wheel of fortune", "spinning wheel generator", "random decision maker", "picker wheel", "random name picker", "wheel of fortune wheel generator", "wheel of fortune picker", "spin the wheel generator", "random wheel picker", "custom spinning wheel maker"],
  alternates: { canonical: "/generators/wheel-of-fortune-spinner" },
  openGraph: {
    title: "Wheel of Fortune Spinner - Random Decision Maker Online | ToolZoneX",
    description: "Create a custom spinning wheel to randomly pick names, prizes, or make decisions.",
    url: `${SITE_URL}/generators/wheel-of-fortune-spinner`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Wheel of Fortune Spinner",
  "description": "Create a custom spinning wheel to randomly pick names, prizes, or make decisions.",
  "url": `${SITE_URL}/generators/wheel-of-fortune-spinner`,
  "applicationCategory": "EntertainmentApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the spin result truly random?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the wheel lands on a random segment each spin, giving every option an equal chance proportional to its slice size." }
    },
    {
      "@type": "Question",
      "name": "Is this a wheel of fortune generator or a picker wheel?",
      "acceptedAnswer": { "@type": "Answer", "text": "Both — you generate a custom wheel from your own list of options, and each spin acts as a random picker that selects one entry from that wheel. Use it to build a wheel for names, prizes, decisions, or anything else you need to pick at random." }
    },
    {
      "@type": "Question",
      "name": "How many options can I add to the wheel?",
      "acceptedAnswer": { "@type": "Answer", "text": "Up to 24 items, with a minimum of 2 needed to spin. Each item becomes an equally-sized slice unless you add more or fewer entries, which resizes the slices automatically." }
    },
    {
      "@type": "Question",
      "name": "Can I save or share my wheel?",
      "acceptedAnswer": { "@type": "Answer", "text": "The wheel is built entirely in your browser for the current session — add your list, spin as many times as you like, and remove or edit entries between spins." }
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
      <WheelOfFortuneSpinner />
    </>
  );
}
