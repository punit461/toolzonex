import type { Metadata } from "next";
import OperatingCashFlowCalculator from "../../../calculators/finance/OperatingCashFlowCalculator";
import tool from "../../../data/tools/finance-operating-cash-flow-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <OperatingCashFlowCalculator />
    </>
  );
}
