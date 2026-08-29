import type { Metadata } from "next";
import MortgageDownPaymentCalculator from "../../../calculators/finance/MortgageDownPaymentCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/mortgage-down-payment-calculator");

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
