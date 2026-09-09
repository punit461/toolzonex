import type { Metadata } from "next";
import NetProfitCalculator from "../../../calculators/finance/NetProfitCalculator";
import tool from "../../../data/tools/finance-net-profit-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <NetProfitCalculator />
    </>
  );
}
