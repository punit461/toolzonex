import type { Metadata } from "next";
import RestingHeartRateCalculator from "../../../calculators/health/RestingHeartRateCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/health/resting-heart-rate-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RestingHeartRateCalculator />
    </>
  );
}
