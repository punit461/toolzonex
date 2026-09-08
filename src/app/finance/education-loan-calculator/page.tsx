import type { Metadata } from "next";
import EducationLoanCalculator from "../../../calculators/finance/EducationLoanCalculator";
import tool from "../../../data/tools/finance-education-loan-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EducationLoanCalculator />
    </>
  );
}
