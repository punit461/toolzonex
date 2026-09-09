import type { Metadata } from "next";
import ShiftDifferentialPayCalculator from "../../../calculators/finance/ShiftDifferentialPayCalculator";
import tool from "../../../data/tools/finance-shift-differential-pay-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ShiftDifferentialPayCalculator />
    </>
  );
}
