import type { Metadata } from "next";
import WaterFlowRateCalculator from "../../../calculators/utilities/WaterFlowRateCalculator";
import tool from "../../../data/tools/utilities-water-flow-rate-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WaterFlowRateCalculator />
    </>
  );
}
