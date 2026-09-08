import type { Metadata } from "next";
import PdfOutlineViewer from "../../../calculators/pdf/PdfOutlineViewer";
import tool from "../../../data/tools/tools-pdf-outline-viewer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfOutlineViewer />
    </>
  );
}
