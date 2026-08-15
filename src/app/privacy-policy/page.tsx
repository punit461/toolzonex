import type { Metadata } from "next";
import PrivacyPolicy from "../../views/PrivacyPolicy";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Privacy Policy - ToolZoneX",
  description: "Learn how ToolZoneX collects, uses, and protects your personal information across our free calculator services.",
  keywords: ["privacy policy", "data protection", "ToolZoneX privacy", "data safety", "personal information", "cookie policy"],
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy - ToolZoneX",
    description: "Learn how ToolZoneX collects, uses, and protects your personal information.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
