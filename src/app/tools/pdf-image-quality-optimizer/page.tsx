import type { Metadata } from "next";
import PdfImageQualityOptimizer from "../../../calculators/pdf/PdfImageQualityOptimizer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/pdf-image-quality-optimizer");

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
