import type { Metadata } from "next";
import RegexTester from "../../../calculators/RegexTester";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Regex Tester - Online Regular Expression Evaluator",
  description: "Test, evaluate, and debug regular expressions online. Real-time regex matching and highlighting tool for developers.",
  keywords: ["regex tester", "regex evaluator", "regular expression online", "regex match", "regex debugger"],
  alternates: { canonical: "/tools/regex-tester" },
  openGraph: {
    title: "Regex Tester - Online Regular Expression Evaluator | ToolZoneX",
    description: "Test, evaluate, and debug regular expressions online.",
    url: `${SITE_URL}/tools/regex-tester`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Regex Tester",
  "description": "Test, evaluate, and debug regular expressions online.",
  "url": `${SITE_URL}/tools/regex-tester`,
  "applicationCategory": "DeveloperApplication",
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
      <RegexTester />
    </>
  );
}
