import type { Metadata } from "next";
import PdfToBmp from "../../../calculators/pdf/PdfToBmp";
import tool from "../../../data/tools/tools-pdf-to-bmp";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToBmp />
    </>
  );
}
