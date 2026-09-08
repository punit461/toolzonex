import type { Metadata } from "next";
import RetirementSIPCalculator from "../../../calculators/finance/RetirementSIPCalculator";
import tool from "../../../data/tools/finance-retirement-sip-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RetirementSIPCalculator />
    </>
  );
}
