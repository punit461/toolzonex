import type { Metadata } from "next";
import TermsOfService from "../../pages/TermsOfService";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Terms of Service - ToolZoneX",
  description: "Read the terms and conditions governing your use of ToolZoneX calculators and services. Understand your rights and responsibilities when using our free tools.",
  keywords: ["terms of service", "terms and conditions", "ToolZoneX terms", "usage terms", "disclaimer", "liability"],
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: "Terms of Service - ToolZoneX",
    description: "Terms and conditions for using ToolZoneX tools and calculators.",
    url: `${SITE_URL}/terms-of-service`,
    type: "website",
  },
};

export default function Page() {
  return <TermsOfService />;
}
