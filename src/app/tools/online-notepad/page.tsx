import type { Metadata } from "next";
import OnlineNotepad from "../../../calculators/tools/OnlineNotepad";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Online Notepad - Simple Text Editor",
  description: "Free online notepad for quick text editing and note-taking. Simple browser-based text editor with save and download functionality.",
  keywords: ["online notepad", "text editor", "note taking", "online text editor", "simple notepad", "web notepad", "text editor online", "quick notes"],
  alternates: { canonical: "/tools/online-notepad" },
  openGraph: {
    title: "Online Notepad - Simple Text Editor | ToolZoneX",
    description: "Free online notepad for quick text editing and note-taking. Simple browser-based text editor with save and download functionality.",
    url: `${SITE_URL}/tools/online-notepad`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const onlineNotepadSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Online Notepad",
  "description": "Free online notepad for quick text editing and note-taking. Simple browser-based text editor with save and download functionality.",
  "url": `${SITE_URL}/tools/online-notepad`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(onlineNotepadSchema) }}
      />
      <OnlineNotepad />
    </>
  );
}
