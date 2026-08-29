import type { Metadata } from "next";
import CaloriesBurnedCyclingCalculator from "../../../calculators/health/CaloriesBurnedCyclingCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/health/calories-burned-cycling-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CaloriesBurnedCyclingCalculator />
    </>
  );
}
