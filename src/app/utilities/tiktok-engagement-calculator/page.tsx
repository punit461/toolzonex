import type { Metadata } from "next";
import TiktokEngagementCalculator from "../../../calculators/utilities/TiktokEngagementCalculator";
import tool from "../../../data/tools/utilities-tiktok-engagement-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TiktokEngagementCalculator />
    </>
  );
}
