import type { Metadata } from "next";
import PdfSafePrintOptimizer from "../../../calculators/pdf/PdfSafePrintOptimizer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/pdf-safe-print-optimizer");

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
