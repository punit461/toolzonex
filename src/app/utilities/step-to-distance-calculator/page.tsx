import type { Metadata } from "next";
import StepToDistanceCalculator from "../../../calculators/utilities/StepToDistanceCalculator";
import tool from "../../../data/tools/utilities-step-to-distance-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <StepToDistanceCalculator />
    </>
  );
}
