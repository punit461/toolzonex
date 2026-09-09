import type { Metadata } from "next";
import RestingHeartRateCalculator from "../../../calculators/health/RestingHeartRateCalculator";
import tool from "../../../data/tools/health-resting-heart-rate-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RestingHeartRateCalculator />
    </>
  );
}
