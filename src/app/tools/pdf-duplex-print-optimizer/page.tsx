import type { Metadata } from "next";
import PdfDuplexPrintOptimizer from "../../../calculators/pdf/PdfDuplexPrintOptimizer";
import tool from "../../../data/tools/tools-pdf-duplex-print-optimizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfDuplexPrintOptimizer />
    </>
  );
}
