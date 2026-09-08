import type { Metadata } from "next";
import BreakEvenPointCalculator from "../../../calculators/finance/BreakEvenPointCalculator";
import tool from "../../../data/tools/finance-break-even-point-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BreakEvenPointCalculator />
    </>
  );
}
