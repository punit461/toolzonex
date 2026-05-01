import type { Metadata } from "next";
import About from "../../pages/About";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "About ToolZoneX - Free Online Calculators for India",
  description: "Learn about ToolZoneX - India's free calculator site for finance, health, and utility tools. Our mission is to provide accurate, easy-to-use calculators for everyone.",
  keywords: ["about ToolZoneX", "calculator site India", "free online calculators", "our mission", "financial calculators", "health calculators"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ToolZoneX - Free Online Calculators for India",
    description: "Learn about ToolZoneX - India's free calculator site for finance, health, and utility tools.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function Page() {
  return <About />;
}
