import type { Metadata } from "next";
import SemesterPercentageCalculator from "../../../calculators/utilities/SemesterPercentageCalculator";
import tool from "../../../data/tools/utilities-semester-percentage-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SemesterPercentageCalculator />
    </>
  );
}
