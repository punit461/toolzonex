import type { Metadata } from "next";
import HealthyWeightRangeCalculator from "../../../calculators/health/HealthyWeightRangeCalculator";
import tool from "../../../data/tools/health-healthy-weight-range-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HealthyWeightRangeCalculator />
    </>
  );
}
