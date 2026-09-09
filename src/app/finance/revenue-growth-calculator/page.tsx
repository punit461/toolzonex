import type { Metadata } from "next";
import RevenueGrowthCalculator from "../../../calculators/finance/RevenueGrowthCalculator";
import tool from "../../../data/tools/finance-revenue-growth-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RevenueGrowthCalculator />
    </>
  );
}
