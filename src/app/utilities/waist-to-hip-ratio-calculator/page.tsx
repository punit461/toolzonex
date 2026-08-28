import type { Metadata } from "next";
import WaistToHipRatioCalculator from "../../../calculators/utilities/WaistToHipRatioCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/waist-to-hip-ratio-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WaistToHipRatioCalculator />
    </>
  );
}
