import type { Metadata } from "next";
import CompareTwoPdfs from "../../../calculators/pdf/CompareTwoPdfs";
import tool from "../../../data/tools/tools-compare-two-pdfs";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CompareTwoPdfs />
    </>
  );
}
