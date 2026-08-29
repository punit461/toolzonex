import type { Metadata } from "next";
import EconomicOrderQuantityCalculator from "../../../calculators/finance/EconomicOrderQuantityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/economic-order-quantity-calculator");

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
