import type { Metadata } from "next";
import AlphabetLearningTool from "../../../calculators/utilities/AlphabetLearningTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Alphabet Learning Tool - ABC Flashcards Online",
  description: "Interactive ABC alphabet flashcards for kids. Learn letters with emojis and sound pronunciation.",
  keywords: ["alphabet learning tool", "abc flashcards", "learn english alphabet", "kids learning tool online", "alphabet pronunciation"],
  alternates: { canonical: "/utilities/alphabet-learning-tool" },
  openGraph: {
    title: "Alphabet Learning Tool - ABC Flashcards Online | ToolZoneX",
    description: "Interactive ABC alphabet flashcards for kids. Learn letters with emojis and sound pronunciation.",
    url: `${SITE_URL}/utilities/alphabet-learning-tool`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Alphabet Learning Tool",
  "description": "Interactive ABC alphabet flashcards for kids.",
  "url": `${SITE_URL}/utilities/alphabet-learning-tool`,
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
      <AlphabetLearningTool />
    </>
  );
}
