import type { Metadata } from "next";
import OccupancyLoadCalculator from "../../../calculators/utilities/OccupancyLoadCalculator";
import tool from "../../../data/tools/utilities-occupancy-load-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <OccupancyLoadCalculator />
    </>
  );
}
