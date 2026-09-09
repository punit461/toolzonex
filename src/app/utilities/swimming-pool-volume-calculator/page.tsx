import type { Metadata } from "next";
import SwimmingPoolVolumeCalculator from "../../../calculators/utilities/SwimmingPoolVolumeCalculator";
import tool from "../../../data/tools/utilities-swimming-pool-volume-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SwimmingPoolVolumeCalculator />
    </>
  );
}
