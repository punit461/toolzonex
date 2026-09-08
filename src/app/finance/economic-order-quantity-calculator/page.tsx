import type { Metadata } from "next";
import EconomicOrderQuantityCalculator from "../../../calculators/finance/EconomicOrderQuantityCalculator";
import tool from "../../../data/tools/finance-economic-order-quantity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EconomicOrderQuantityCalculator />
    </>
  );
}
