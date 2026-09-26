import type { Metadata } from "next";
import RefundPolicy from "../../components/pages/RefundPolicy";
import Breadcrumbs from "../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "ToolZoneX is free and takes no payments, so there is nothing to refund. What to do about ad purchases or unexpected charges.",
  alternates: { canonical: "/refund-policy" },
  openGraph: {
    title: "Refund Policy | ToolZoneX",
    description: "ToolZoneX is free and takes no payments, so there is nothing to refund. What to do about ad purchases or unexpected charges.",
    url: `${SITE_URL}/refund-policy`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Refund Policy" }]} />
      <RefundPolicy />
    </>
  );
}
