import type { Metadata } from "next";
import CreditCardPayoffCalculator from "../../../calculators/utilities/CreditCardPayoffCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/credit-card-payoff-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CreditCardPayoffCalculator />
    </>
  );
}
