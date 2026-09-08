import type { Metadata } from "next";
import SalesForecastCalculator from "../../../calculators/finance/SalesForecastCalculator";
import tool from "../../../data/tools/finance-sales-forecast-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SalesForecastCalculator />
    </>
  );
}
