import type { Metadata } from "next";
import PercentageIncreaseCalculator from "../../../calculators/utilities/PercentageIncreaseCalculator";
import tool from "../../../data/tools/utilities-percentage-increase-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PercentageIncreaseCalculator />
    </>
  );
}
