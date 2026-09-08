import type { Metadata } from "next";
import PropertyAppreciationCalculator from "../../../calculators/finance/PropertyAppreciationCalculator";
import tool from "../../../data/tools/finance-property-appreciation-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PropertyAppreciationCalculator />
    </>
  );
}
