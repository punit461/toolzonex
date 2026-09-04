import type { Metadata } from "next";
import ShiftDifferentialPayCalculator from "../../../calculators/finance/ShiftDifferentialPayCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/shift-differential-pay-calculator");

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
