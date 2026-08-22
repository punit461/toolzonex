import type { Metadata } from "next";
import RegexTester from "../../../calculators/RegexTester";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Regex Tester - Online Regular Expression Evaluator",
  description: "Free regular expression tester online. Check, debug, and analyze regex patterns with real-time match highlighting — a regex tester tool for JavaScript-flavored expressions, close to Java, PCRE, and most other regex engines.",
  keywords: ["regex tester", "regex evaluator", "regular expression online", "regex match", "regex debugger", "regular expression tester online", "regular expression checker", "regex analyzer", "check java regex online", "regular expression finder", "regex online", "regex tester tool", "regular expression tester"],
  alternates: { canonical: "/developer-tools/regex-tester" },
  openGraph: {
    title: "Regex Tester - Online Regular Expression Evaluator | ToolZoneX",
    description: "Test, evaluate, and debug regular expressions online.",
    url: `${SITE_URL}/developer-tools/regex-tester`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Regex Tester",
  "description": "Test, evaluate, and debug regular expressions online.",
  "url": `${SITE_URL}/developer-tools/regex-tester`,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which regex flavor does this use?",
      "acceptedAnswer": { "@type": "Answer", "text": "It uses standard JavaScript (ECMAScript) regular expression syntax, the same engine used natively in browsers and Node.js." }
    },
    {
      "@type": "Question",
      "name": "Can I check Java regex online with this tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "This tool evaluates patterns using JavaScript's regex engine, not Java's java.util.regex. The two flavors are very close — most character classes, quantifiers, and groups behave the same — but they aren't 100% identical: named capture groups, lookbehind support, and some Unicode property escapes differ by engine and JavaScript runtime version. For patterns that must run exactly as they will in a Java application, verify edge cases (especially lookbehind and named groups) in a JVM before relying on results here." }
    },
    {
      "@type": "Question",
      "name": "Is this a regular expression checker or just a tester?",
      "acceptedAnswer": { "@type": "Answer", "text": "Both — it checks whether your pattern is valid (showing a syntax error if not) and tests it live against your sample text, highlighting every match as you type." }
    },
    {
      "@type": "Question",
      "name": "How do I find all matches, not just the first one?",
      "acceptedAnswer": { "@type": "Answer", "text": "Keep the \"g\" (Global) flag checked, which is on by default — the tool then acts as a regular expression finder that highlights every match in the test string, not only the first." }
    },
    {
      "@type": "Question",
      "name": "Does this work as an online regex analyzer for debugging patterns?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — paste your pattern and sample text, toggle the g/i/m flags, and matches highlight live so you can see exactly what a regex does and does not capture before using it in code." }
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
      <RegexTester />
    </>
  );
}
