import type { Metadata } from "next";
import IncomeTaxCalculator from "../../../calculators/finance/IncomeTaxCalculator";
import tool from "../../../data/tools/finance-income-tax-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <IncomeTaxCalculator />
    </>
  );
}
