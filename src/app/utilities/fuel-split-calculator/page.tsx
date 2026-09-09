import type { Metadata } from "next";
import FuelSplitCalculator from "../../../calculators/utilities/FuelSplitCalculator";
import tool from "../../../data/tools/utilities-fuel-split-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FuelSplitCalculator />
    </>
  );
}
