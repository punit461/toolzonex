import type { Metadata } from "next";
import WaterHeatingCostCalculator from "../../../calculators/utilities/WaterHeatingCostCalculator";
import tool from "../../../data/tools/utilities-water-heating-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WaterHeatingCostCalculator />
    </>
  );
}
