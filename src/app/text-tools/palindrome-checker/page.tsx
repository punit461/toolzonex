import type { Metadata } from "next";
import PalindromeChecker from "../../../calculators/text-tools/PalindromeChecker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Palindrome Checker - Check Text Online for Free",
  description: "Check if a word or phrase is a palindrome. Free online text analysis tool to test if text reads the same forward and backward.",
  keywords: ["palindrome checker", "is it a palindrome", "palindrome word", "palindrome phrase", "reverse text checker"],
  alternates: { canonical: "/text-tools/palindrome-checker" },
  openGraph: {
    title: "Palindrome Checker - Check Text Online for Free | ToolZoneX",
    description: "Check if a word or phrase is a palindrome. Free online text analysis tool.",
    url: `${SITE_URL}/text-tools/palindrome-checker`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Palindrome Checker",
  "description": "Check if a word or phrase is a palindrome.",
  "url": `${SITE_URL}/text-tools/palindrome-checker`,
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
      <PalindromeChecker />
    </>
  );
}
