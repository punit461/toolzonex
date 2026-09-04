import type { Metadata } from "next";
import ProfitPerUnitCalculator from "../../../calculators/finance/ProfitPerUnitCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/profit-per-unit-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ProfitPerUnitCalculator />
    </>
  );
}
