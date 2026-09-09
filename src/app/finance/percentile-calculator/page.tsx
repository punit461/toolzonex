import type { Metadata } from "next";
import PercentileCalculator from "../../../calculators/finance/PercentileCalculator";
import tool from "../../../data/tools/finance-percentile-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PercentileCalculator />
    </>
  );
}
