import type { Metadata } from "next";
import ComputerElectricityCostCalculator from "../../../calculators/utilities/ComputerElectricityCostCalculator";
import tool from "../../../data/tools/utilities-computer-electricity-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ComputerElectricityCostCalculator />
    </>
  );
}
