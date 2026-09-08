import type { Metadata } from "next";
import PdfImageQualityOptimizer from "../../../calculators/pdf/PdfImageQualityOptimizer";
import tool from "../../../data/tools/tools-pdf-image-quality-optimizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfImageQualityOptimizer />
    </>
  );
}
