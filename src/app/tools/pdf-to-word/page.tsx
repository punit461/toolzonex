import type { Metadata } from "next";
import PdfToWord from "../../../calculators/pdf/PdfToWord";
import tool from "../../../data/tools/tools-pdf-to-word";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToWord />
    </>
  );
}
