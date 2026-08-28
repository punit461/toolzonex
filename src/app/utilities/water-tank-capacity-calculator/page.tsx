import type { Metadata } from "next";
import WaterTankCapacityCalculator from "../../../calculators/utilities/WaterTankCapacityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/water-tank-capacity-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WaterTankCapacityCalculator />
    </>
  );
}
