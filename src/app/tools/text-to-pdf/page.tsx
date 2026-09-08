import type { Metadata } from "next";
import TxtToPdf from "../../../calculators/pdf/TxtToPdf";
import tool from "../../../data/tools/tools-text-to-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TxtToPdf />
    </>
  );
}
