import type { Metadata } from "next";
import AddStampToPdf from "../../../calculators/pdf/AddStampToPdf";
import tool from "../../../data/tools/tools-add-stamp-to-pdf-page";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddStampToPdf />
    </>
  );
}
