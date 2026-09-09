import type { Metadata } from "next";
import HourlyBillingCalculator from "../../../calculators/finance/HourlyBillingCalculator";
import tool from "../../../data/tools/finance-hourly-billing-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HourlyBillingCalculator />
    </>
  );
}
