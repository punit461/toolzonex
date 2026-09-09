import type { Metadata } from "next";
import EmergencyFundCalculator from "../../../calculators/finance/EmergencyFundCalculator";
import tool from "../../../data/tools/finance-emergency-fund-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EmergencyFundCalculator />
    </>
  );
}
