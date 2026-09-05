import type { Metadata } from "next";
import HealthyWeightRangeCalculator from "../../../calculators/health/HealthyWeightRangeCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/health/healthy-weight-range-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HealthyWeightRangeCalculator />
    </>
  );
}
