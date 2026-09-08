import type { Metadata } from "next";
import OvertimePayCalculator from "../../../calculators/finance/OvertimePayCalculator";
import tool from "../../../data/tools/finance-overtime-pay-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <OvertimePayCalculator />
    </>
  );
}
