import type { Metadata } from "next";
import InterquartileRangeCalculator from "../../../calculators/utilities/InterquartileRangeCalculator";
import tool from "../../../data/tools/utilities-interquartile-range-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <InterquartileRangeCalculator />
    </>
  );
}
