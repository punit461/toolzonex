import type { Metadata } from "next";
import InventoryShrinkageCalculator from "../../../calculators/finance/InventoryShrinkageCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/inventory-shrinkage-calculator");

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
