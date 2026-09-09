import type { Metadata } from "next";
import PdfBuilder from "../../../calculators/pdf/PdfBuilder";
import tool from "../../../data/tools/tools-pdf-builder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfBuilder />
    </>
  );
}
