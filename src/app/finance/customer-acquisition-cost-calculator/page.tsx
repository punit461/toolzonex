import type { Metadata } from "next";
import CustomerAcquisitionCostCalculator from "../../../calculators/finance/CustomerAcquisitionCostCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/customer-acquisition-cost-calculator");

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
