import type { Metadata } from "next";
import MortgageRecastCalculator from "../../../calculators/finance/MortgageRecastCalculator";
import tool from "../../../data/tools/finance-mortgage-recast-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MortgageRecastCalculator />
    </>
  );
}
