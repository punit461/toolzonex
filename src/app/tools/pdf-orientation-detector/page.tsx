import type { Metadata } from "next";
import PdfOrientationDetector from "../../../calculators/pdf/PdfOrientationDetector";
import tool from "../../../data/tools/tools-pdf-orientation-detector";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfOrientationDetector />
    </>
  );
}
