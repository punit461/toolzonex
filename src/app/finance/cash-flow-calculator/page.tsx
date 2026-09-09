import type { Metadata } from "next";
import CashFlowCalculator from "../../../calculators/finance/CashFlowCalculator";
import tool from "../../../data/tools/finance-cash-flow-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CashFlowCalculator />
    </>
  );
}
