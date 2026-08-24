import type { Metadata } from "next";
import BodyFatPercentageCalculator from "../../../calculators/health/BodyFatPercentageCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/health/body-fat-percentage-calculator");

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
