import type { Metadata } from "next";
import InventoryTurnoverCalculator from "../../../calculators/finance/InventoryTurnoverCalculator";
import tool from "../../../data/tools/finance-inventory-turnover-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <InventoryTurnoverCalculator />
    </>
  );
}
