import type { Metadata } from "next";
import CustomerLifetimeValueCalculator from "../../../calculators/finance/CustomerLifetimeValueCalculator";
import tool from "../../../data/tools/finance-customer-lifetime-value-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CustomerLifetimeValueCalculator />
    </>
  );
}
