import type { Metadata } from "next";
import PdfMetadataEditor from "../../../calculators/pdf/PdfMetadataEditor";
import tool from "../../../data/tools/tools-pdf-metadata-editor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfMetadataEditor />
    </>
  );
}
