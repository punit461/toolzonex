import type { Metadata } from "next";
import MergePdf from "../../../calculators/pdf/MergePdf";
import tool from "../../../data/tools/tools-merge-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MergePdf />
    </>
  );
}
