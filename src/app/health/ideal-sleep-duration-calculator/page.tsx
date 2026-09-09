import type { Metadata } from "next";
import IdealSleepDurationCalculator from "../../../calculators/health/IdealSleepDurationCalculator";
import tool from "../../../data/tools/health-ideal-sleep-duration-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <IdealSleepDurationCalculator />
    </>
  );
}
