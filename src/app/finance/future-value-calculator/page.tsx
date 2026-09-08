import type { Metadata } from "next";
import FutureValueCalculator from "../../../calculators/finance/FutureValueCalculator";
import tool from "../../../data/tools/finance-future-value-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FutureValueCalculator />
    </>
  );
}
