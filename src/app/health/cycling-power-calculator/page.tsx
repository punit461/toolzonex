import type { Metadata } from "next";
import CyclingPowerCalculator from "../../../calculators/health/CyclingPowerCalculator";
import tool from "../../../data/tools/health-cycling-power-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CyclingPowerCalculator />
    </>
  );
}
