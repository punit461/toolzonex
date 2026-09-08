import type { Metadata } from "next";
import PdfRotationDetector from "../../../calculators/pdf/PdfRotationDetector";
import tool from "../../../data/tools/tools-pdf-rotation-detector";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfRotationDetector />
    </>
  );
}
