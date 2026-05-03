import type { Metadata } from "next";
import OnlineImageEditor from "../../../calculators/OnlineImageEditor";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Online Image Editor - Edit Photos in Browser",
  description: "Edit images online with filters, brightness, contrast, rotation, and more. Free browser-based image editor with no installation required.",
  keywords: ["online image editor", "edit photos online", "image filters", "photo editor", "brightness contrast", "image rotation", "crop images", "photo editing tools"],
  alternates: { canonical: "/tools/online-image-editor" },
  openGraph: {
    title: "Online Image Editor - Edit Photos in Browser | ToolZoneX",
    description: "Edit images online with filters, brightness, contrast, rotation, and more. Free browser-based image editor with no installation required.",
    url: `${SITE_URL}/tools/online-image-editor`,
    type: "article",
  },
};

const onlineImageEditorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Online Image Editor",
  "description": "Edit images online with filters, brightness, contrast, rotation, and more. Free browser-based image editor with no installation required.",
  "url": `${SITE_URL}/tools/online-image-editor`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(onlineImageEditorSchema) }}
      />
      <OnlineImageEditor />
    </>
  );
}