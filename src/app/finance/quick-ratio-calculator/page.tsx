import type { Metadata } from "next";
import QuickRatioCalculator from "../../../calculators/finance/QuickRatioCalculator";
import tool from "../../../data/tools/finance-quick-ratio-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <QuickRatioCalculator />
    </>
  );
}
