import type { Metadata } from "next";
import DividendYieldCalculator from "../../../calculators/finance/DividendYieldCalculator";
import tool from "../../../data/tools/finance-dividend-yield-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DividendYieldCalculator />
    </>
  );
}
