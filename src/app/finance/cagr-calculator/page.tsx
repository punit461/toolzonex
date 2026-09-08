import type { Metadata } from "next";
import CAGRCalculator from "../../../calculators/finance/CAGRCalculator";
import tool from "../../../data/tools/finance-cagr-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CAGRCalculator />
    </>
  );
}
