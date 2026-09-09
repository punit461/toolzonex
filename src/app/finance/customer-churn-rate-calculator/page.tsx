import type { Metadata } from "next";
import CustomerChurnRateCalculator from "../../../calculators/finance/CustomerChurnRateCalculator";
import tool from "../../../data/tools/finance-customer-churn-rate-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CustomerChurnRateCalculator />
    </>
  );
}
