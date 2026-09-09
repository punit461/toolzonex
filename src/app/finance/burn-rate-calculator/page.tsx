import type { Metadata } from "next";
import BurnRateCalculator from "../../../calculators/finance/BurnRateCalculator";
import tool from "../../../data/tools/finance-burn-rate-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BurnRateCalculator />
    </>
  );
}
