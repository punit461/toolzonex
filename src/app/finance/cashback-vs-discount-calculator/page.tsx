import type { Metadata } from "next";
import CashbackVsDiscountCalculator from "../../../calculators/finance/CashbackVsDiscountCalculator";
import tool from "../../../data/tools/finance-cashback-vs-discount-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CashbackVsDiscountCalculator />
    </>
  );
}
