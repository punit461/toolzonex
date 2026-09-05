import type { Metadata } from "next";
import WashingMachineRunningCostCalculator from "../../../calculators/utilities/WashingMachineRunningCostCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/washing-machine-running-cost-calculator");

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
