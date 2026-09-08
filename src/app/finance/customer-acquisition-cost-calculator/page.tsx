import type { Metadata } from "next";
import CustomerAcquisitionCostCalculator from "../../../calculators/finance/CustomerAcquisitionCostCalculator";
import tool from "../../../data/tools/finance-customer-acquisition-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CustomerAcquisitionCostCalculator />
    </>
  );
}
