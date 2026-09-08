import type { Metadata } from "next";
import WeddingBudgetCalculator from "../../../calculators/finance/WeddingBudgetCalculator";
import tool from "../../../data/tools/finance-wedding-budget-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WeddingBudgetCalculator />
    </>
  );
}
