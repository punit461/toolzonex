import type { Metadata } from "next";
import PdfThumbnailSheet from "../../../calculators/pdf/PdfThumbnailSheet";
import tool from "../../../data/tools/tools-pdf-thumbnail-sheet";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfThumbnailSheet />
    </>
  );
}
