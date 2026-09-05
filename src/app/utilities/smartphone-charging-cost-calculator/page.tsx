import type { Metadata } from "next";
import SmartphoneChargingCostCalculator from "../../../calculators/utilities/SmartphoneChargingCostCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/smartphone-charging-cost-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SmartphoneChargingCostCalculator />
    </>
  );
}
