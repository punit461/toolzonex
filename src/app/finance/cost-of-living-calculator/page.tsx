import type { Metadata } from "next";
import CostOfLivingCalculator from "../../../calculators/finance/CostOfLivingCalculator";
import tool from "../../../data/tools/finance-cost-of-living-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CostOfLivingCalculator />
    </>
  );
}
