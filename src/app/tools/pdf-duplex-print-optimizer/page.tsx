import type { Metadata } from "next";
import PdfDuplexPrintOptimizer from "../../../calculators/pdf/PdfDuplexPrintOptimizer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/pdf-duplex-print-optimizer");
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
