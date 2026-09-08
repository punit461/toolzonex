import type { Metadata } from "next";
import RecurringDepositCalculator from "../../../calculators/finance/RecurringDepositCalculator";
import tool from "../../../data/tools/finance-recurring-deposit-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RecurringDepositCalculator />
    </>
  );
}
