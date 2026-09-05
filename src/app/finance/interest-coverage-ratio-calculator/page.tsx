import type { Metadata } from "next";
import InterestCoverageRatioCalculator from "../../../calculators/finance/InterestCoverageRatioCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/interest-coverage-ratio-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <InterestCoverageRatioCalculator />
    </>
  );
}
