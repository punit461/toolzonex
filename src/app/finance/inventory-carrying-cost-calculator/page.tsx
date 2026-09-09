import type { Metadata } from "next";
import InventoryCarryingCostCalculator from "../../../calculators/finance/InventoryCarryingCostCalculator";
import tool from "../../../data/tools/finance-inventory-carrying-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <InventoryCarryingCostCalculator />
    </>
  );
}
