import type { Metadata } from "next";
import PdfThumbnailSheet from "../../../calculators/pdf/PdfThumbnailSheet";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/pdf-thumbnail-sheet");
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
