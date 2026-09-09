import type { Metadata } from "next";
import AverageCalculator from "../../../calculators/utilities/AverageCalculator";
import tool from "../../../data/tools/utilities-average-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AverageCalculator />
    </>
  );
}
