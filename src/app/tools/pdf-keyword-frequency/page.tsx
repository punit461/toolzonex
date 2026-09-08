import type { Metadata } from "next";
import PdfKeywordFrequency from "../../../calculators/pdf/PdfKeywordFrequency";
import tool from "../../../data/tools/tools-pdf-keyword-frequency";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfKeywordFrequency />
    </>
  );
}
