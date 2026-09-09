import type { Metadata } from "next";
import WarehouseSpaceCalculator from "../../../calculators/utilities/WarehouseSpaceCalculator";
import tool from "../../../data/tools/utilities-warehouse-space-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WarehouseSpaceCalculator />
    </>
  );
}
