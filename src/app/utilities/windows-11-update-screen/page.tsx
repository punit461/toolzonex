import type { Metadata } from "next";
import { Windows11UpdateScreen } from "../../../calculators/screens/windowsScreens";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Windows 11 Update Screen Prank",
  description: "A fake Windows 11 'Working on updates' screen prank. Go fullscreen for the full effect.",
  keywords: ["windows 11 update screen","fake windows 11 update","windows update prank","windows 11 update screen prank","fake windows update prank"],
  alternates: { canonical: "/utilities/windows-11-update-screen" },
  openGraph: {
    title: "Windows 11 Update Screen Prank | ToolZoneX",
    description: "A fake Windows 11 'Working on updates' screen prank. Go fullscreen for the full effect.",
    url: `${SITE_URL}/utilities/windows-11-update-screen`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Windows11UpdateScreen",
  "description": "A fake Windows 11 'Working on updates' screen prank. Go fullscreen for the full effect.",
  "url": `${SITE_URL}/utilities/windows-11-update-screen`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does this actually affect the computer?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — it's just a fullscreen webpage that looks like a Windows update screen. Closing the tab or pressing Esc returns everything to normal instantly." }
    },
    {
      "@type": "Question",
      "name": "Will this trigger a real restart or update?",
      "acceptedAnswer": { "@type": "Answer", "text": "No, nothing on the device is touched." }
    },
    {
      "@type": "Question",
      "name": "How do I set up this windows 11 update screen prank on a coworker's PC?",
      "acceptedAnswer": { "@type": "Answer", "text": "Open this page on their screen while they're away, click \"Click to Fullscreen\" (or press F), and leave it running — the spinning \"Working on updates\" percentage looks convincing at a glance. Press Esc together to reveal the prank when they get back." }
    },
    {
      "@type": "Question",
      "name": "Does the update percentage actually progress?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — for visual realism, the percentage counter animates up and loops, just like a real Windows update screen, even though nothing is actually being installed." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Windows11UpdateScreen />
    </>
  );
}
