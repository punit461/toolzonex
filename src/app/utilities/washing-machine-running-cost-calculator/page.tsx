import type { Metadata } from "next";
import WashingMachineRunningCostCalculator from "../../../calculators/utilities/WashingMachineRunningCostCalculator";
import tool from "../../../data/tools/utilities-washing-machine-running-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WashingMachineRunningCostCalculator />
    </>
  );
}
