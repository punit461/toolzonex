import type { Metadata } from "next";
import SleepTimeCalculator from "../../../calculators/health/SleepTimeCalculator";
import tool from "../../../data/tools/health-sleep-time-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SleepTimeCalculator />
    </>
  );
}
