import type { Metadata } from "next";
import GoldRateCalculator from "../../../calculators/GoldRateCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Gold Rate Calculator - Gold Price with Making Charges & GST",
  description: "Free gold rate calculator to calculate gold jewellery price including making charges and GST in India. Calculate gold price per gram for 24K, 22K, and 18K gold.",
  keywords: [
    "gold rate calculator", "gold price", "gold making charges", "24K gold", "22K gold", "18K gold",
    "gold jewelry price", "gold GST", "gold jewellery calculator india", "gold calculator with gst",
    "calculate gold rate per gram", "how to calculate gold price by weight", "how to calculate gold price in grams",
    "gold making charge calculator", "gold sell price calculator", "gold cost per gram calculator",
    "how to calculate 18kt gold price", "how to calculate the gold price per gram", "how to calculate price of gold per gram",
  ],
  alternates: { canonical: "/finance/gold-calculator" },
  openGraph: {
    title: "Gold Rate Calculator - Gold Price with Making Charges & GST | ToolZoneX",
    description: "Calculate gold price including making charges and GST.",
    url: `${SITE_URL}/finance/gold-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const goldCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Gold Rate Calculator",
  "description": "Calculate gold price with making charges and GST.",
  "url": `${SITE_URL}/finance/gold-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do making charges work on gold jewellery in India?",
      "acceptedAnswer": { "@type": "Answer", "text": "Making charges are what the jeweller charges for turning raw gold into a finished piece of jewellery, usually quoted as a percentage of the gold value (commonly 5-20% depending on the design's complexity) or occasionally as a flat rate per gram. Enter your jeweller's quoted making charge percentage in the calculator to see it added on top of the gold value." }
    },
    {
      "@type": "Question",
      "name": "How does GST apply to gold jewellery purchases?",
      "acceptedAnswer": { "@type": "Answer", "text": "In India, 3% GST is charged on the total of the gold value plus making charges, not on the gold value alone — that's the default when you select the India region above, though you can edit the percentage if your invoice differs." }
    },
    {
      "@type": "Question",
      "name": "What's the difference between 18K, 22K, and 24K gold pricing?",
      "acceptedAnswer": { "@type": "Answer", "text": "Karat measures gold purity: 24K is 99.9% pure gold, 22K is about 91.6% pure, and 18K is about 75% pure. Since purity drives price, each karat trades at a different rate per gram — this calculator doesn't look up karat-specific rates for you, so enter the per-gram (or per-10-gram) rate your jeweller quotes for the specific karat you're buying." }
    },
    {
      "@type": "Question",
      "name": "Does the buy price differ from the sell-back price for gold?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. When buying, you pay the gold value plus making charges plus GST. When selling gold jewellery back, most jewellers only pay for the gold's weight and purity — making charges and GST are typically not refunded, and some deduct a further amount for wastage or old-jewellery testing. To estimate a sell price, set making charges and tax to 0 and enter the buyback rate your jeweller quotes." }
    },
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(goldCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GoldRateCalculator />
    </>
  );
}
