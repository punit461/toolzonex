import type { Metadata } from "next";
import EffectiveInterestRateCalculator from "../../../calculators/finance/EffectiveInterestRateCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/effective-interest-rate-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EffectiveInterestRateCalculator />
    </>
  );
}
