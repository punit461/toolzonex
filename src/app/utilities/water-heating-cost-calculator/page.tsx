import type { Metadata } from "next";
import WaterHeatingCostCalculator from "../../../calculators/utilities/WaterHeatingCostCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/water-heating-cost-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WaterHeatingCostCalculator />
    </>
  );
}
