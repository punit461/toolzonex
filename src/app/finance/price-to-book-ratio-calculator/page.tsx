import type { Metadata } from "next";
import PriceToBookRatioCalculator from "../../../calculators/finance/PriceToBookRatioCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/price-to-book-ratio-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PriceToBookRatioCalculator />
    </>
  );
}
