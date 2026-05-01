import type { Metadata } from "next";
import FAQ from "../../pages/FAQ";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Frequently Asked Questions - ToolZoneX",
  description: "Answers to common questions about ToolZoneX calculators, privacy policy, terms of service, and how to use our free online tools.",
  keywords: ["FAQ", "frequently asked questions", "calculator help", "ToolZoneX FAQ", "how to use calculators", "common questions"],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions - ToolZoneX",
    description: "Answers to common questions about ToolZoneX calculators.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are these calculators free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all calculators on ToolZoneX are completely free to use. No registration or payment is required."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate are the calculations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our calculators use standard formulas and are designed to provide accurate results. However, for critical financial decisions, we recommend consulting a financial advisor."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we don't store any personal data. All calculations are performed locally in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use these calculators on mobile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all our calculators are fully responsive and work on mobile devices, tablets, and desktops."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQ />
    </>
  );
}
