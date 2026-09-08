import type { Metadata } from "next";
import PdfToPng from "../../../calculators/pdf/PdfToPng";
import tool from "../../../data/tools/tools-pdf-to-png";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToPng />
    </>
  );
}
