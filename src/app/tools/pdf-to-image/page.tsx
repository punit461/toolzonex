import type { Metadata } from "next";
import PdfToImage from "../../../calculators/pdf/PdfToImage";
import tool from "../../../data/tools/tools-pdf-to-image";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToImage />
    </>
  );
}
