import type { Metadata } from "next";
import TargetHeartRateCalculator from "../../../calculators/health/TargetHeartRateCalculator";
import tool from "../../../data/tools/health-target-heart-rate-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TargetHeartRateCalculator />
    </>
  );
}
