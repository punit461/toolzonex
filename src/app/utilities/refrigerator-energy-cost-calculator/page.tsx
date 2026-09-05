import type { Metadata } from "next";
import RefrigeratorEnergyCostCalculator from "../../../calculators/utilities/RefrigeratorEnergyCostCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/refrigerator-energy-cost-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RefrigeratorEnergyCostCalculator />
    </>
  );
}
