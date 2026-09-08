import type { Metadata } from "next";
import AddTimestampToPdf from "../../../calculators/pdf/AddTimestampToPdf";
import tool from "../../../data/tools/tools-add-timestamp-to-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddTimestampToPdf />
    </>
  );
}
