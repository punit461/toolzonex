import type { Metadata } from "next";
import ProbabilityCalculator from "../../../calculators/utilities/ProbabilityCalculator";
import tool from "../../../data/tools/utilities-probability-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ProbabilityCalculator />
    </>
  );
}
