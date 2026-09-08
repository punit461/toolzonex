import type { Metadata } from "next";
import FinancialIndependenceCalculator from "../../../calculators/finance/FinancialIndependenceCalculator";
import tool from "../../../data/tools/finance-financial-independence-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FinancialIndependenceCalculator />
    </>
  );
}
