import type { Metadata } from "next";
import StockAverageCalculator from "../../../calculators/finance/StockAverageCalculator";
import tool from "../../../data/tools/finance-stock-average-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <StockAverageCalculator />
    </>
  );
}
