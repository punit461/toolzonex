import type { Metadata } from "next";
import WarehouseCapacityCalculator from "../../../calculators/utilities/WarehouseCapacityCalculator";
import tool from "../../../data/tools/utilities-warehouse-capacity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WarehouseCapacityCalculator />
    </>
  );
}
