import type { Metadata } from "next";
import HraExemption from "../../../pages/blogs/HraExemption";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "HRA Exemption Calculation - Complete Guide to House Rent Allowance",
  description: "Step-by-step guide to calculating House Rent Allowance (HRA) exemption under Section 10(13A). Learn how to claim maximum HRA tax benefit with our detailed guide.",
  keywords: ["HRA exemption", "House Rent Allowance", "HRA calculation", "Section 10(13A)", "rent relief", "salary tax benefit", "HRA claim rules"],
  alternates: { canonical: "/blog/hra-exemption-calculation" },
  openGraph: {
    title: "HRA Exemption Calculation - Complete Guide | ToolZoneX",
    description: "Step-by-step guide to calculating House Rent Allowance exemption.",
    url: `${SITE_URL}/blog/hra-exemption-calculation`,
    type: "article",
  },
};

const hraExemptionSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "HRA Exemption Calculation - Complete Guide to House Rent Allowance",
  "description": "Step-by-step guide to calculating House Rent Allowance exemption.",
  "url": `${SITE_URL}/blog/hra-exemption-calculation`,
  "datePublished": "2025-01-20",
  "dateModified": "2025-01-20",
  "author": { "@type": "Organization", "name": "ToolZoneX" },
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/toolzonex/logo.png` }
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hraExemptionSchema) }}
      />
      <HraExemption />
    </>
  );
}
