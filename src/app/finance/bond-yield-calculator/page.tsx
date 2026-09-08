import type { Metadata } from "next";
import BondYieldCalculator from "../../../calculators/finance/BondYieldCalculator";
import tool from "../../../data/tools/finance-bond-yield-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BondYieldCalculator />
    </>
  );
}
