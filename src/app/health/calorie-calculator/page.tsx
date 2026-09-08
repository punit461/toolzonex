import type { Metadata } from "next";
import CalorieCalculator from "../../../calculators/health/CalorieCalculator";
import tool from "../../../data/tools/health-calorie-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CalorieCalculator />
    </>
  );
}
