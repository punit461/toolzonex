import type { Metadata } from "next";
import PdfToolsHub from "../../../calculators/pdf/PdfToolsHub";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "PDF Tools - Merge, Split, Rotate & Convert PDFs Free",
  description: "Free PDF tools that run entirely in your browser. Merge, split, rotate, watermark, and convert PDFs -- no upload, no signup.",
  keywords: ["pdf tools", "merge pdf", "split pdf", "convert pdf", "free pdf editor online"],
  alternates: { canonical: "/tools/pdf-tools" },
  openGraph: {
    title: "PDF Tools | ToolZoneX",
    description: "Free PDF tools that run entirely in your browser. Merge, split, rotate, watermark, and convert PDFs.",
    url: `${SITE_URL}/tools/pdf-tools`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

export default function Page() {
  return <PdfToolsHub />;
}
