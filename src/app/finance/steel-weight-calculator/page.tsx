import type { Metadata } from "next";
import SteelWeightCalculator from "../../../calculators/finance/SteelWeightCalculator";
import tool from "../../../data/tools/finance-steel-weight-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SteelWeightCalculator />
    </>
  );
}
