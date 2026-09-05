import type { Metadata } from "next";
import IdealSleepDurationCalculator from "../../../calculators/health/IdealSleepDurationCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/health/ideal-sleep-duration-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <IdealSleepDurationCalculator />
    </>
  );
}
