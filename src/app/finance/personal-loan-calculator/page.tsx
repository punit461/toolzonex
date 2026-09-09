import type { Metadata } from "next";
import PersonalLoanCalculator from "../../../calculators/finance/PersonalLoanCalculator";
import tool from "../../../data/tools/finance-personal-loan-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PersonalLoanCalculator />
    </>
  );
}
