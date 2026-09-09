import type { Metadata } from "next";
import YouTubeRevenueCalculator from "../../../calculators/utilities/YouTubeRevenueCalculator";
import tool from "../../../data/tools/utilities-youtube-revenue-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <YouTubeRevenueCalculator />
    </>
  );
}
