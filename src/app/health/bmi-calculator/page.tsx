import type { Metadata } from "next";
import BMICalculator from "../../../calculators/health/BMICalculator";
import tool from "../../../data/tools/health-bmi-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BMICalculator />
    </>
  );
}
