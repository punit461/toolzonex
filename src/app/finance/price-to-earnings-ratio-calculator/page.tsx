import type { Metadata } from "next";
import PriceToEarningsRatioCalculator from "../../../calculators/finance/PriceToEarningsRatioCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/price-to-earnings-ratio-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PriceToEarningsRatioCalculator />
    </>
  );
}
