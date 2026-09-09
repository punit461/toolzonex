import type { Metadata } from "next";
import CPACalculator from "../../../calculators/finance/CPACalculator";
import tool from "../../../data/tools/finance-cpa-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CPACalculator />
    </>
  );
}
