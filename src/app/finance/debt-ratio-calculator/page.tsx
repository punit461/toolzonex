import type { Metadata } from "next";
import DebtRatioCalculator from "../../../calculators/finance/DebtRatioCalculator";
import tool from "../../../data/tools/finance-debt-ratio-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DebtRatioCalculator />
    </>
  );
}
