import type { Metadata } from "next";
import TermsOfService from "../../components/pages/TermsOfService";
import Breadcrumbs from "../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms for using ToolZoneX's free tools: results are estimates, not professional advice; acceptable use; our liability; and governing law.",
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: "Terms and Conditions | ToolZoneX",
    description: "The terms for using ToolZoneX's free tools: results are estimates, not professional advice; acceptable use; our liability; and governing law.",
    url: `${SITE_URL}/terms-of-service`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms and Conditions" }]} />
      <TermsOfService />
    </>
  );
}
