import type { Metadata } from "next";
import DividendPayoutRatioCalculator from "../../../calculators/finance/DividendPayoutRatioCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/dividend-payout-ratio-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DividendPayoutRatioCalculator />
    </>
  );
}
