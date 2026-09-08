import type { Metadata } from "next";
import PdfPageDimensionViewer from "../../../calculators/pdf/PdfPageDimensionViewer";
import tool from "../../../data/tools/tools-pdf-page-dimension-viewer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfPageDimensionViewer />
    </>
  );
}
