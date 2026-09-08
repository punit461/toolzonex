import type { Metadata } from "next";
import MortgageDownPaymentCalculator from "../../../calculators/finance/MortgageDownPaymentCalculator";
import tool from "../../../data/tools/finance-mortgage-down-payment-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MortgageDownPaymentCalculator />
    </>
  );
}
