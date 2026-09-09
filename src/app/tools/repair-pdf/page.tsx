import type { Metadata } from "next";
import RepairPdf from "../../../calculators/pdf/RepairPdf";
import tool from "../../../data/tools/tools-repair-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RepairPdf />
    </>
  );
}
