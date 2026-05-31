import type { Metadata } from "next";
import PrimeNumberChecker from "../../../calculators/PrimeNumberChecker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Prime Number Checker - Check Primes Online",
  description: "Check if a number is a prime number instantly online. Free math utility to find out if a number is prime or composite.",
  keywords: ["prime number checker", "is it prime", "prime calculator", "prime or composite"],
  alternates: { canonical: "/utilities/prime-number-checker" },
  openGraph: {
    title: "Prime Number Checker - Check Primes Online | ToolZoneX",
    description: "Check if a number is a prime number instantly online.",
    url: `${SITE_URL}/utilities/prime-number-checker`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Prime Number Checker",
  "description": "Check if a number is a prime number instantly online.",
  "url": `${SITE_URL}/utilities/prime-number-checker`,
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
      <PrimeNumberChecker />
    </>
  );
}
