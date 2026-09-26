import type { Metadata } from "next";
import Contact from "../../components/pages/Contact";
import Breadcrumbs from "../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Contact ToolZoneX - Get in Touch",
  description: "Contact ToolZoneX for questions, bug reports, feedback, privacy requests or grievances. Email punit@toolzonex.com or use the contact form.",
  keywords: ["contact ToolZoneX", "reach us", "feedback", "support", "partnership", "calculator help"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ToolZoneX - Get in Touch",
    description: "Contact ToolZoneX for questions, feedback, privacy requests or grievances.",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ToolZoneX - Get in Touch",
    description: "Contact ToolZoneX for questions, feedback, privacy requests or grievances.",
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
