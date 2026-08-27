import type { Metadata } from "next";
import About from "../../components/pages/About";
import Breadcrumbs from "../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "About ToolZoneX - 200+ Free Online Calculators & Tools",
  description: "Learn about ToolZoneX — a free platform of 200+ calculators and utilities for finance, health, and everyday decisions, built India-first for a global audience.",
  keywords: ["about ToolZoneX", "calculator site India", "free online calculators", "our mission", "financial calculators", "health calculators"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ToolZoneX - 200+ Free Online Calculators & Tools",
    description: "Learn about ToolZoneX — a free platform of 200+ calculators and utilities for finance, health, and everyday decisions, built India-first for a global audience.",
    url: `${SITE_URL}/about`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ToolZoneX - 200+ Free Online Calculators & Tools",
    description: "Learn about ToolZoneX — a free platform of 200+ calculators and utilities.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <About />
    </>
  );
}
