import type { Metadata } from "next";
import CompressPdf from "../../../calculators/pdf/CompressPdf";
import tool from "../../../data/tools/tools-compress-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CompressPdf />
    </>
  );
}
