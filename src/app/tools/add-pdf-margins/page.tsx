import type { Metadata } from "next";
import AddPdfMargins from "../../../calculators/pdf/AddPdfMargins";
import tool from "../../../data/tools/tools-add-pdf-margins";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddPdfMargins />
    </>
  );
}
