import type { Metadata } from "next";
import DoubleTimePayCalculator from "../../../calculators/finance/DoubleTimePayCalculator";
import tool from "../../../data/tools/finance-double-time-pay-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DoubleTimePayCalculator />
    </>
  );
}
