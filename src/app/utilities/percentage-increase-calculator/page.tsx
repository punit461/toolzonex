import type { Metadata } from "next";
import PercentageIncreaseCalculator from "../../../calculators/utilities/PercentageIncreaseCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/percentage-increase-calculator");

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
