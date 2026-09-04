import type { Metadata } from "next";
import CustomerRetentionRateCalculator from "../../../calculators/finance/CustomerRetentionRateCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/customer-retention-rate-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CustomerRetentionRateCalculator />
    </>
  );
}
