import type { Metadata } from "next";
import SplitPdf from "../../../calculators/pdf/SplitPdf";
import tool from "../../../data/tools/tools-split-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SplitPdf />
    </>
  );
}
