import type { Metadata } from "next";
import RefinanceCalculator from "../../../calculators/finance/RefinanceCalculator";
import tool from "../../../data/tools/finance-refinance-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RefinanceCalculator />
    </>
  );
}
