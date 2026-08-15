import type { Metadata } from "next";
import ScreensHub from "../../../calculators/screens/ScreensHub";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Fullscreen Test Screens - Color Screens, Pixel Test & Pranks",
  description: "Solid color screens, monitor test tools, and fun fullscreen pranks. Black, red, blue, green screens, dead pixel test, DVD screensaver, and more.",
  keywords: ["fullscreen screens", "color screen test", "screen test tools", "dead pixel test", "screen pranks"],
  alternates: { canonical: "/utilities/screen-test" },
  openGraph: {
    title: "Fullscreen Test Screens | ToolZoneX",
    description: "Solid color screens, monitor test tools, and fun fullscreen pranks.",
    url: `${SITE_URL}/utilities/screen-test`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

export default function Page() {
  return <ScreensHub />;
}
