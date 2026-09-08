import type { Metadata } from "next";
import PdfEditor from "../../../calculators/pdf/PdfEditor";
import tool from "../../../data/tools/tools-pdf-editor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfEditor />
    </>
  );
}
