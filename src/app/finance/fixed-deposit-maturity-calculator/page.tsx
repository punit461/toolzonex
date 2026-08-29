import type { Metadata } from "next";
import FixedDepositMaturityCalculator from "../../../calculators/finance/FixedDepositMaturityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/fixed-deposit-maturity-calculator");

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
