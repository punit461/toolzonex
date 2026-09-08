import type { Metadata } from "next";
import AddBarcodeToPdf from "../../../calculators/pdf/AddBarcodeToPdf";
import tool from "../../../data/tools/tools-add-barcode-to-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddBarcodeToPdf />
    </>
  );
}
