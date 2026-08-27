import type { Metadata } from "next";
import CompareTwoPdfs from "../../../calculators/pdf/CompareTwoPdfs";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/compare-two-pdfs");

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
