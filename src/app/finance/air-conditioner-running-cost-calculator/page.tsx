import type { Metadata } from "next";
import AirConditionerRunningCostCalculator from "../../../calculators/finance/AirConditionerRunningCostCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/air-conditioner-running-cost-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AirConditionerRunningCostCalculator />
    </>
  );
}
