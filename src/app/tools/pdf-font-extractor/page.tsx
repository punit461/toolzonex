import type { Metadata } from "next";
import PdfFontExtractor from "../../../calculators/pdf/PdfFontExtractor";
import tool from "../../../data/tools/tools-pdf-font-extractor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfFontExtractor />
    </>
  );
}
