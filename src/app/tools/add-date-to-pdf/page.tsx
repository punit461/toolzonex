import type { Metadata } from "next";
import AddDateToPdf from "../../../calculators/pdf/AddDateToPdf";
import tool from "../../../data/tools/tools-add-date-to-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddDateToPdf />
    </>
  );
}
