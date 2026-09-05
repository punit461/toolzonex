import type { Metadata } from "next";
import ApplianceRunningCostCalculator from "../../../calculators/utilities/ApplianceRunningCostCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/appliance-running-cost-calculator");

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
