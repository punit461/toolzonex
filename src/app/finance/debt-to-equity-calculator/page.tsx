import type { Metadata } from "next";
import DebtToEquityCalculator from "../../../calculators/finance/DebtToEquityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/debt-to-equity-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DebtToEquityCalculator />
    </>
  );
}
