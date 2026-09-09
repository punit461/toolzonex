import type { Metadata } from "next";
import PdfAttachmentExtractor from "../../../calculators/pdf/PdfAttachmentExtractor";
import tool from "../../../data/tools/tools-pdf-attachment-extractor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfAttachmentExtractor />
    </>
  );
}
