import type { Metadata } from "next";
import InventoryShrinkageCalculator from "../../../calculators/finance/InventoryShrinkageCalculator";
import tool from "../../../data/tools/finance-inventory-shrinkage-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <InventoryShrinkageCalculator />
    </>
  );
}
