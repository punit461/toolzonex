import type { Metadata } from "next";
import ApplianceRunningCostCalculator from "../../../calculators/utilities/ApplianceRunningCostCalculator";
import tool from "../../../data/tools/utilities-appliance-running-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ApplianceRunningCostCalculator />
    </>
  );
}
