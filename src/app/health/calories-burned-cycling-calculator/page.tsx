import type { Metadata } from "next";
import CaloriesBurnedCyclingCalculator from "../../../calculators/health/CaloriesBurnedCyclingCalculator";
import tool from "../../../data/tools/health-calories-burned-cycling-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CaloriesBurnedCyclingCalculator />
    </>
  );
}
