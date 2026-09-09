import type { Metadata } from "next";
import WaistToHipRatioCalculator from "../../../calculators/utilities/WaistToHipRatioCalculator";
import tool from "../../../data/tools/utilities-waist-to-hip-ratio-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
