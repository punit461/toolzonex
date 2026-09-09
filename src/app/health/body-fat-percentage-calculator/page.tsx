import type { Metadata } from "next";
import BodyFatPercentageCalculator from "../../../calculators/health/BodyFatPercentageCalculator";
import tool from "../../../data/tools/health-body-fat-percentage-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BodyFatPercentageCalculator />
    </>
  );
}
