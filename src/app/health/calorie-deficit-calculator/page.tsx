import type { Metadata } from "next";
import CalorieDeficitCalculator from "../../../calculators/health/CalorieDeficitCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/health/calorie-deficit-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CalorieDeficitCalculator />
    </>
  );
}
