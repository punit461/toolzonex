import type { Metadata } from "next";
import HouseAffordabilityCalculator from "../../../calculators/finance/HouseAffordabilityCalculator";
import tool from "../../../data/tools/finance-house-affordability-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HouseAffordabilityCalculator />
    </>
  );
}
