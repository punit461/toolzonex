import type { Metadata } from "next";
import PdfMarginAdjuster from "../../../calculators/pdf/PdfMarginAdjuster";
import tool from "../../../data/tools/tools-pdf-margin-adjuster";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfMarginAdjuster />
    </>
  );
}
