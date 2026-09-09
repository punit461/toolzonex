import type { Metadata } from "next";
import PdfSafePrintOptimizer from "../../../calculators/pdf/PdfSafePrintOptimizer";
import tool from "../../../data/tools/tools-pdf-safe-print-optimizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfSafePrintOptimizer />
    </>
  );
}
