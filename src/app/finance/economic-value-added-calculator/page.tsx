import type { Metadata } from "next";
import EconomicValueAddedCalculator from "../../../calculators/finance/EconomicValueAddedCalculator";
import tool from "../../../data/tools/finance-economic-value-added-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <EconomicValueAddedCalculator />
    </>
  );
}
