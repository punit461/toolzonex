import type { Metadata } from "next";
import PdfAttachmentRemover from "../../../calculators/pdf/PdfAttachmentRemover";
import tool from "../../../data/tools/tools-pdf-attachment-remover";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfAttachmentRemover />
    </>
  );
}
