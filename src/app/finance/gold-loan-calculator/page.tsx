import type { Metadata } from "next";
import GoldLoanCalculator from "../../../calculators/finance/GoldLoanCalculator";
import tool from "../../../data/tools/finance-gold-loan-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GoldLoanCalculator />
    </>
  );
}
