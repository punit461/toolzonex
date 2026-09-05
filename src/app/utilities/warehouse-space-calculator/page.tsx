import type { Metadata } from "next";
import WarehouseSpaceCalculator from "../../../calculators/utilities/WarehouseSpaceCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/warehouse-space-calculator");

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
