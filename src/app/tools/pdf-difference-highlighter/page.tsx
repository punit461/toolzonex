import type { Metadata } from "next";
import PdfDifferenceHighlighter from "../../../calculators/pdf/PdfDifferenceHighlighter";
import tool from "../../../data/tools/tools-pdf-difference-highlighter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfDifferenceHighlighter />
    </>
  );
}
