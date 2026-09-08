import type { Metadata } from "next";
import LoanInterestComparisonCalculator from "../../../calculators/finance/LoanInterestComparisonCalculator";
import tool from "../../../data/tools/finance-loan-interest-comparison-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LoanInterestComparisonCalculator />
    </>
  );
}
