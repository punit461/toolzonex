import type { Metadata } from "next";
import SalesTargetCalculator from "../../../calculators/finance/SalesTargetCalculator";
import tool from "../../../data/tools/finance-sales-target-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SalesTargetCalculator />
    </>
  );
}
