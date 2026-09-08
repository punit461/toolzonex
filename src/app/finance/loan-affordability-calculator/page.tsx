import type { Metadata } from "next";
import LoanAffordabilityCalculator from "../../../calculators/finance/LoanAffordabilityCalculator";
import tool from "../../../data/tools/finance-loan-affordability-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LoanAffordabilityCalculator />
    </>
  );
}
