import type { Metadata } from "next";
import SalesTaxCalculator from "../../../calculators/utilities/SalesTaxCalculator";
import tool from "../../../data/tools/utilities-sales-tax-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SalesTaxCalculator />
    </>
  );
}
