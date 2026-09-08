import type { Metadata } from "next";
import TravelBudgetCalculator from "../../../calculators/finance/TravelBudgetCalculator";
import tool from "../../../data/tools/finance-travel-budget-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TravelBudgetCalculator />
    </>
  );
}
