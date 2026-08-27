import type { Metadata } from "next";
import HraExemption from "../../../components/pages/blogs/HraExemption";
import Breadcrumbs from "../../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "HRA Exemption Calculation - Complete Guide",
  description: "Step-by-step guide to calculating House Rent Allowance (HRA) exemption under Section 10(13A) and claiming the maximum tax benefit.",
  keywords: ["HRA exemption", "House Rent Allowance", "HRA calculation", "Section 10(13A)", "rent relief", "salary tax benefit", "HRA claim rules"],
  alternates: { canonical: "/blog/hra-exemption-calculation" },
  openGraph: {
    title: "HRA Exemption Calculation - Complete Guide | ToolZoneX",
    description: "Step-by-step guide to calculating House Rent Allowance exemption.",
    url: `${SITE_URL}/blog/hra-exemption-calculation`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HRA Exemption Calculation - Complete Guide | ToolZoneX",
    description: "Step-by-step guide to calculating House Rent Allowance exemption.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
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
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` }
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hraExemptionSchema) }}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "HRA Exemption Calculation" }]} />
      <HraExemption />
    </>
  );
}
