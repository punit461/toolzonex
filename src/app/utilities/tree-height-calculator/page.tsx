import type { Metadata } from "next";
import TreeHeightCalculator from "../../../calculators/utilities/TreeHeightCalculator";
import tool from "../../../data/tools/utilities-tree-height-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TreeHeightCalculator />
    </>
  );
}
