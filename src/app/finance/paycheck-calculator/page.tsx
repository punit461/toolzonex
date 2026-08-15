import type { Metadata } from "next";
import PaycheckHub from "../../../calculators/paycheck/PaycheckHub";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "US Paycheck Calculator by State - Take-Home Pay",
  description: "Free paycheck calculators for US states. Estimate your take-home pay after federal tax, Social Security, Medicare, and state income tax.",
  keywords: ["paycheck calculator by state", "us salary calculator", "take home pay calculator", "state paycheck calculator"],
  alternates: { canonical: "/finance/paycheck-calculator" },
  openGraph: {
    title: "US Paycheck Calculator by State | ToolZoneX",
    description: "Free paycheck calculators for US states. Estimate your take-home pay after taxes.",
    url: `${SITE_URL}/finance/paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

export default function Page() {
  return <PaycheckHub />;
}
