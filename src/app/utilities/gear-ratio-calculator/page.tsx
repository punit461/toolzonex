import type { Metadata } from "next";
import GearRatioCalculator from "../../../calculators/utilities/GearRatioCalculator";
import tool from "../../../data/tools/utilities-gear-ratio-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GearRatioCalculator />
    </>
  );
}
