import type { Metadata } from "next";
import CalorieDeficitCalculator from "../../../calculators/health/CalorieDeficitCalculator";
import tool from "../../../data/tools/health-calorie-deficit-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CalorieDeficitCalculator />
    </>
  );
}
