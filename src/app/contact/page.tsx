import type { Metadata } from "next";
import Contact from "../../components/pages/Contact";
import Breadcrumbs from "../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Contact ToolZoneX - Get in Touch",
  description: "Get in touch with the ToolZoneX team for queries, feedback, or partnership opportunities. We're here to help with our free online calculators.",
  keywords: ["contact ToolZoneX", "reach us", "feedback", "support", "partnership", "calculator help"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ToolZoneX - Get in Touch",
    description: "Get in touch with the ToolZoneX team for queries, feedback, or partnership.",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ToolZoneX - Get in Touch",
    description: "Get in touch with the ToolZoneX team for queries, feedback, or partnership.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <Contact />
    </>
  );
}
