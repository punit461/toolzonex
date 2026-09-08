import type { Metadata } from "next";
import HeightComparison from "../../../calculators/heightcompare/HeightComparison";
import tool from "../../../data/tools/tools-height-comparison";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HeightComparison />
    </>
  );
}
