import type { Metadata } from "next";
import PdfFileSizeViewer from "../../../calculators/pdf/PdfFileSizeViewer";
import tool from "../../../data/tools/tools-pdf-file-size-viewer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfFileSizeViewer />
    </>
  );
}
