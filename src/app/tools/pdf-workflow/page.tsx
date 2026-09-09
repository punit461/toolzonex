import type { Metadata } from "next";
import PdfWorkflow from "../../../calculators/pdf/PdfWorkflow";
import tool from "../../../data/tools/tools-pdf-workflow";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfWorkflow />
    </>
  );
}
