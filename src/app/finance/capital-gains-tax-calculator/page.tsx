import type { Metadata } from "next";
import CapitalGainsTaxCalculator from "../../../calculators/finance/CapitalGainsTaxCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/capital-gains-tax-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CapitalGainsTaxCalculator />
    </>
  );
}
