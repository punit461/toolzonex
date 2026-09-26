import type { Metadata } from "next";
import PrivacyPolicy from "../../components/pages/PrivacyPolicy";
import Breadcrumbs from "../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What personal data ToolZoneX collects, why, who receives it, how long it's kept, and how to exercise your rights under India's DPDP Act and the GDPR.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | ToolZoneX",
    description: "What personal data ToolZoneX collects, why, who receives it, how long it's kept, and how to exercise your rights under India's DPDP Act and the GDPR.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <PrivacyPolicy />
    </>
  );
}
