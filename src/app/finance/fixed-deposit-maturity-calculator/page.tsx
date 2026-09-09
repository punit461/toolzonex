import type { Metadata } from "next";
import FixedDepositMaturityCalculator from "../../../calculators/finance/FixedDepositMaturityCalculator";
import tool from "../../../data/tools/finance-fixed-deposit-maturity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FixedDepositMaturityCalculator />
    </>
  );
}
