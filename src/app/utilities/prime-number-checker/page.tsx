import type { Metadata } from "next";
import PrimeNumberChecker from "../../../calculators/utilities/PrimeNumberChecker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Prime Number Checker - Check Primes Online",
  description: "Check if a number is a prime number instantly online. Free math utility to find out if a number is prime or composite.",
  keywords: ["prime number checker", "is it prime", "prime calculator", "prime or composite", "prime counter", "prime number counter", "check if number is prime online", "is this number prime"],
  alternates: { canonical: "/utilities/prime-number-checker" },
  openGraph: {
    title: "Prime Number Checker - Check Primes Online | ToolZoneX",
    description: "Check if a number is a prime number instantly online.",
    url: `${SITE_URL}/utilities/prime-number-checker`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is 1 a prime number?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — by definition, prime numbers must be greater than 1, so 1 is neither prime nor composite." }
    },
    {
      "@type": "Question",
      "name": "Is this a prime counter that lists all primes in a range?",
      "acceptedAnswer": { "@type": "Answer", "text": "This tool checks one number at a time rather than counting or listing every prime within a range — enter each number you want checked and it instantly reports whether it's prime, plus a factor if it isn't." }
    },
    {
      "@type": "Question",
      "name": "Is 2 a prime number, since it's even?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — 2 is prime and is the only even prime number. Every other even number is divisible by 2, which disqualifies it, but 2 itself only has the divisors 1 and 2." }
    },
    {
      "@type": "Question",
      "name": "What's the largest number this checker can handle?",
      "acceptedAnswer": { "@type": "Answer", "text": "It works reliably up to Number.MAX_SAFE_INTEGER (about 9 quadrillion) in the browser. Beyond that, floating-point precision limits make the result unreliable, so the tool shows a warning instead of a potentially wrong answer." }
    },
    {
      "@type": "Question",
      "name": "Why isn't 0 a prime number?",
      "acceptedAnswer": { "@type": "Answer", "text": "0 has infinitely many divisors (every whole number divides evenly into 0), which contradicts the definition of a prime having exactly two divisors — 1 and itself. So 0 is neither prime nor composite." }
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
      <PrimeNumberChecker />
    </>
  );
}
