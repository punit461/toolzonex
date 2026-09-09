import type { Metadata } from "next";
import PdfToWebp from "../../../calculators/pdf/PdfToWebp";
import tool from "../../../data/tools/tools-pdf-to-webp";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToWebp />
    </>
  );
}
