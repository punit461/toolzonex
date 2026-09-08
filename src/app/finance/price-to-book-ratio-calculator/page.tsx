import type { Metadata } from "next";
import PriceToBookRatioCalculator from "../../../calculators/finance/PriceToBookRatioCalculator";
import tool from "../../../data/tools/finance-price-to-book-ratio-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PriceToBookRatioCalculator />
    </>
  );
}
