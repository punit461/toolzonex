import type { Metadata } from "next";
import BarcodeGenerator from "../../../calculators/BarcodeGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Barcode Generator - Create Free 1D Barcodes",
  description: "Create custom 1D barcodes online instantly. Supports CODE128, UPC, EAN and more. Download high-quality PNGs for free.",
  keywords: ["barcode generator", "create barcode", "upc generator", "ean generator", "code128 generator"],
  alternates: { canonical: "/utilities/barcode-generator" },
  openGraph: {
    title: "Barcode Generator - Create Free 1D Barcodes | ToolZoneX",
    description: "Create custom 1D barcodes online instantly. Supports CODE128, UPC, EAN and more. Download high-quality PNGs for free.",
    url: `${SITE_URL}/utilities/barcode-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Barcode Generator",
  "description": "Create custom 1D barcodes online instantly. Supports CODE128, UPC, EAN and more. Download high-quality PNGs for free.",
  "url": `${SITE_URL}/utilities/barcode-generator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <BarcodeGenerator />
    </>
  );
}
