import type { Metadata } from "next";
import PpsrCheckCostCalculator from "../../../calculators/finance/PpsrCheckCostCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/ppsr-check-cost-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PpsrCheckCostCalculator />
    </>
  );
}
