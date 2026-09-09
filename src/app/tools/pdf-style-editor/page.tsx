import type { Metadata } from "next";
import PdfStyleEditor from "../../../calculators/pdf/PdfStyleEditor";
import tool from "../../../data/tools/tools-pdf-style-editor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfStyleEditor />
    </>
  );
}
