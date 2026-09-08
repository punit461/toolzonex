import type { Metadata } from "next";
import PriceToEarningsRatioCalculator from "../../../calculators/finance/PriceToEarningsRatioCalculator";
import tool from "../../../data/tools/finance-price-to-earnings-ratio-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PriceToEarningsRatioCalculator />
    </>
  );
}
