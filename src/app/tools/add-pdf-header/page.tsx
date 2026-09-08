import type { Metadata } from "next";
import AddPdfHeader from "../../../calculators/pdf/AddPdfHeader";
import tool from "../../../data/tools/tools-add-pdf-header";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddPdfHeader />
    </>
  );
}
