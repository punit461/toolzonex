import type { Metadata } from "next";
import FuelSplitCalculator from "../../../calculators/utilities/FuelSplitCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/fuel-split-calculator");

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
