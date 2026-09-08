import type { Metadata } from "next";
import LoanInterestRateCalculator from "../../../calculators/finance/LoanInterestRateCalculator";
import tool from "../../../data/tools/finance-loan-interest-rate-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LoanInterestRateCalculator />
    </>
  );
}