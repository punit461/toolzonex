import type { Metadata } from "next";
import CapitalGainsTaxCalculator from "../../../calculators/finance/CapitalGainsTaxCalculator";
import tool from "../../../data/tools/finance-capital-gains-tax-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CapitalGainsTaxCalculator />
    </>
  );
}
