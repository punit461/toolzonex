import type { Metadata } from "next";
import MortgageAffordabilityCalculator from "../../../calculators/finance/MortgageAffordabilityCalculator";
import tool from "../../../data/tools/finance-mortgage-affordability-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MortgageAffordabilityCalculator />
    </>
  );
}
