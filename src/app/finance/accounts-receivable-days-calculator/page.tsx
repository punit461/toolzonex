import type { Metadata } from "next";
import AccountsReceivableDaysCalculator from "../../../calculators/finance/AccountsReceivableDaysCalculator";
import tool from "../../../data/tools/finance-accounts-receivable-days-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AccountsReceivableDaysCalculator />
    </>
  );
}
