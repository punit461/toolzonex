import type { Metadata } from "next";
import CaloriesBurnedRunningCalculator from "../../../calculators/health/CaloriesBurnedRunningCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/health/calories-burned-running-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CaloriesBurnedRunningCalculator />
    </>
  );
}
