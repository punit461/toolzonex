import type { Metadata } from "next";
import RentAffordabilityCalculator from "../../../calculators/finance/RentAffordabilityCalculator";
import tool from "../../../data/tools/finance-rent-affordability-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RentAffordabilityCalculator />
    </>
  );
}
