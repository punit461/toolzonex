import type { Metadata } from "next";
import PdfSplitByPageRange from "../../../calculators/pdf/PdfSplitByPageRange";
import tool from "../../../data/tools/tools-pdf-split-by-page-range";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
