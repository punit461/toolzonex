import type { Metadata } from "next";
import AirConditionerRunningCostCalculator from "../../../calculators/finance/AirConditionerRunningCostCalculator";
import tool from "../../../data/tools/finance-air-conditioner-running-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
