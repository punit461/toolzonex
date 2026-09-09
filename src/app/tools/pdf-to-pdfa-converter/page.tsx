import type { Metadata } from "next";
import PdfToPdfaConverter from "../../../calculators/pdf/PdfToPdfaConverter";
import tool from "../../../data/tools/tools-pdf-to-pdfa-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToPdfaConverter />
    </>
  );
}
