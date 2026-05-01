import type { Metadata } from "next";
import PrivacyPolicy from "../../pages/PrivacyPolicy";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Privacy Policy - ToolZoneX",
  description: "Learn how ToolZoneX collects, uses, and protects your personal information. Our privacy policy outlines data handling practices for our free calculator services.",
  keywords: ["privacy policy", "data protection", "ToolZoneX privacy", "data safety", "personal information", "cookie policy"],
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy - ToolZoneX",
    description: "Learn how ToolZoneX collects, uses, and protects your personal information.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
