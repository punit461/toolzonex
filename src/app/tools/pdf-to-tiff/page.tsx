import type { Metadata } from "next";
import PdfToTiff from "../../../calculators/pdf/PdfToTiff";
import tool from "../../../data/tools/tools-pdf-to-tiff";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToTiff />
    </>
  );
}
