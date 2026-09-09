import type { Metadata } from "next";
import PdfFontCounter from "../../../calculators/pdf/PdfFontCounter";
import tool from "../../../data/tools/tools-pdf-font-counter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfFontCounter />
    </>
  );
}
