import type { Metadata } from "next";
import CookiePolicy from "../../components/pages/CookiePolicy";
import Breadcrumbs from "../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies and browser storage ToolZoneX and Google AdSense use, what each is for, and how to change or withdraw your consent.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: "Cookie Policy | ToolZoneX",
    description: "The cookies and browser storage ToolZoneX and Google AdSense use, what each is for, and how to change or withdraw your consent.",
    url: `${SITE_URL}/cookie-policy`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />
      <CookiePolicy />
    </>
  );
}
