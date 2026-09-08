import type { Metadata } from "next";
import InventoryDaysCalculator from "../../../calculators/finance/InventoryDaysCalculator";
import tool from "../../../data/tools/finance-inventory-days-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <InventoryDaysCalculator />
    </>
  );
}
