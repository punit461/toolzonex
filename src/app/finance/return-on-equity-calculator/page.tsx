import type { Metadata } from "next";
import ReturnOnEquityCalculator from "../../../calculators/finance/ReturnOnEquityCalculator";
import tool from "../../../data/tools/finance-return-on-equity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ReturnOnEquityCalculator />
    </>
  );
}
