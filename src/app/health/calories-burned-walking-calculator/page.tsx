import type { Metadata } from "next";
import CaloriesBurnedWalkingCalculator from "../../../calculators/health/CaloriesBurnedWalkingCalculator";
import tool from "../../../data/tools/health-calories-burned-walking-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CaloriesBurnedWalkingCalculator />
    </>
  );
}
