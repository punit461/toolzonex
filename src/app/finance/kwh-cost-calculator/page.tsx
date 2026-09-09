import type { Metadata } from "next";
import KwhCostCalculator from "../../../calculators/finance/KwhCostCalculator";
import tool from "../../../data/tools/finance-kwh-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <KwhCostCalculator />
    </>
  );
}
