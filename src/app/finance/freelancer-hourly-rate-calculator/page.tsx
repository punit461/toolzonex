import type { Metadata } from "next";
import FreelancerHourlyRateCalculator from "../../../calculators/finance/FreelancerHourlyRateCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/freelancer-hourly-rate-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FreelancerHourlyRateCalculator />
    </>
  );
}
