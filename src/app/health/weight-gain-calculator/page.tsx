import type { Metadata } from "next";
import WeightGainCalculator from "../../../calculators/health/WeightGainCalculator";
import tool from "../../../data/tools/health-weight-gain-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WeightGainCalculator />
    </>
  );
}
