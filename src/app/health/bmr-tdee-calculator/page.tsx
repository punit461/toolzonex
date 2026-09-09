import type { Metadata } from "next";
import BMRTDEECalculator from "../../../calculators/health/BMRTDEECalculator";
import tool from "../../../data/tools/health-bmr-tdee-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BMRTDEECalculator />
    </>
  );
}
