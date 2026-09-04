import type { Metadata } from "next";
import LoanInterestComparisonCalculator from "../../../calculators/finance/LoanInterestComparisonCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/loan-interest-comparison-calculator");

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
