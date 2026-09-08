import type { Metadata } from "next";
import USMortgageCalculator from "../../../calculators/finance/USMortgageCalculator";
import tool from "../../../data/tools/finance-mortgage-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <USMortgageCalculator />
    </>
  );
}
