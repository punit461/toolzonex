import type { Metadata } from "next";
import Contact from "../../pages/Contact";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

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
  },
};

export default function Page() {
  return <Contact />;
}
