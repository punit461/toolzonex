import type { Metadata } from "next";
import CPCCalculator from "../../../calculators/finance/CPCCalculator";
import tool from "../../../data/tools/finance-cpc-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CPCCalculator />
    </>
  );
}
