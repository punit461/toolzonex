import type { Metadata } from "next";
import AddPdfBorder from "../../../calculators/pdf/AddPdfBorder";
import tool from "../../../data/tools/tools-add-pdf-border";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddPdfBorder />
    </>
  );
}
