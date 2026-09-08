import type { Metadata } from "next";
import PdfColorDetector from "../../../calculators/pdf/PdfColorDetector";
import tool from "../../../data/tools/tools-pdf-color-detector";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfColorDetector />
    </>
  );
}
