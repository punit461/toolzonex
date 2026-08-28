import type { Metadata } from "next";
import PdfSplitByPageRange from "../../../calculators/pdf/PdfSplitByPageRange";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/pdf-split-by-page-range");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfSplitByPageRange />
    </>
  );
}
