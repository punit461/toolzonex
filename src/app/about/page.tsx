import type { Metadata } from "next";
import About from "../../views/About";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "About ToolZoneX - Free Online Calculators for India",
  description: "Learn about ToolZoneX — a free calculator site for finance, health, and utility tools, built for accuracy and ease of use.",
  keywords: ["about ToolZoneX", "calculator site India", "free online calculators", "our mission", "financial calculators", "health calculators"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ToolZoneX - Free Online Calculators for India",
    description: "Learn about ToolZoneX - India's free calculator site for finance, health, and utility tools.",
    url: `${SITE_URL}/about`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

export default function Page() {
  return <About />;
}
