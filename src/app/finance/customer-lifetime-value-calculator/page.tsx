import type { Metadata } from "next";
import CustomerLifetimeValueCalculator from "../../../calculators/finance/CustomerLifetimeValueCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/customer-lifetime-value-calculator");

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
