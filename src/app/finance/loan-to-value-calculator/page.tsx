import type { Metadata } from "next";
import LoanToValueCalculator from "../../../calculators/finance/LoanToValueCalculator";
import tool from "../../../data/tools/finance-loan-to-value-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LoanToValueCalculator />
    </>
  );
}
